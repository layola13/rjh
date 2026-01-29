import { SaveSignal, SaveStageEnum } from './SaveSignal';
import { SaveHasTaskStage } from './SaveHasTaskStage';
import { SaveGetDataStage } from './SaveGetDataStage';
import { SaveStage } from './SaveStage';
import API from './API';
import globalAPI from './globalAPI';
import LiveHintType from './LiveHintType';
import { HSApp } from './HSApp';

interface SaveParams {
  showLiveHint?: boolean;
  needUnderlay?: boolean;
  [key: string]: unknown;
}

interface SaveReturnData {
  status: 'success' | 'error' | 'cancel';
  data?: unknown;
  info?: string;
  error?: Error;
  time?: number;
  stage?: SaveStageEnum;
}

interface SaveStageExecutor {
  execute: (params: SaveParams, previousData?: unknown) => Promise<SaveReturnData>;
}

interface SaveServiceConfig {
  getDumpServices: () => Map<string, unknown>;
  app: FloorplanApp;
  signalSaveStart?: SaveSignal;
  signalSaveSucceeded?: SaveSignal;
  signalSaveCancel?: SaveSignal;
  signalSaveFailed?: SaveSignal;
  signalSaveProcess?: SaveSignal;
}

interface FloorplanApp {
  designMetadata: DesignMetadata;
  floorplan: Floorplan;
  Logger: {
    userTrackLogger: {
      push: (eventName: string, data?: unknown, options?: unknown) => void;
    };
  };
}

interface DesignMetadata {
  get: (key: string) => unknown;
  set: (key: string, value: unknown) => void;
}

interface Floorplan {
  designMetadata: DesignMetadata;
  [key: string]: unknown;
}

interface TaskService {
  signal?: {
    listen: (callback: TaskSignalListener, context: unknown) => void;
    unlisten: (callback: TaskSignalListener, context: unknown) => void;
  };
  [key: string]: unknown;
}

type TaskSignalListener = (event: { data: { saveParams: SaveParams; [key: string]: unknown } }) => void;

interface SaveRequestData {
  ext?: string;
  [key: string]: unknown;
}

interface SaveExtension {
  ext?: Record<string, unknown>;
}

export class BaseSaveService {
  public signalSaveStart: SaveSignal;
  public signalSaveSucceeded: SaveSignal;
  public signalSaveCancel: SaveSignal;
  public signalSaveFailed: SaveSignal;
  public signalSaveProcess: SaveSignal;

  private saving: boolean = false;
  private currentSaveParams?: SaveParams;
  private saveCheckStage: SaveHasTaskStage;
  private saveGetDataStage: SaveGetDataStage;
  private savePostDataStage: SaveStage;
  private saveSubsequentStage: SaveHasTaskStage;
  private stageMap: Map<SaveStageEnum, SaveStageExecutor>;
  private API = API;
  private globalAPI = globalAPI;
  private app: FloorplanApp;
  private taskSignalMap: Map<TaskService, TaskSignalListener> = new Map();
  private getDumpServices: () => Map<string, unknown>;

  constructor(config: SaveServiceConfig) {
    this.getDumpServices = config.getDumpServices;
    this.app = config.app;

    this.signalSaveStart = config.signalSaveStart ?? new SaveSignal(this);
    this.signalSaveSucceeded = config.signalSaveSucceeded ?? new SaveSignal(this);
    this.signalSaveCancel = config.signalSaveCancel ?? new SaveSignal(this);
    this.signalSaveFailed = config.signalSaveFailed ?? new SaveSignal(this);
    this.signalSaveProcess = config.signalSaveProcess ?? new SaveSignal(this);

    this.stageMap = new Map();
    this.stageMap.set(SaveStageEnum.Check, {
      execute: this.saveCheck.bind(this)
    });
    this.stageMap.set(SaveStageEnum.GetData, {
      execute: this.saveGetData.bind(this)
    });
    this.stageMap.set(SaveStageEnum.PostDate, {
      execute: this.savePostDate.bind(this)
    });
    this.stageMap.set(SaveStageEnum.Subsequent, {
      execute: this.saveSubsequent.bind(this)
    });

    this.saveCheckStage = new SaveHasTaskStage({ saveService: this });
    this.saveGetDataStage = new SaveGetDataStage({ saveService: this });
    this.savePostDataStage = new SaveStage({ saveService: this });
    this.saveSubsequentStage = new SaveHasTaskStage({ saveService: this });
  }

  public setAttribute(attributes: unknown): void {}

  public isSaving(): boolean {
    return this.saving;
  }

  public save(params: SaveParams): Promise<SaveReturnData> {
    this.saving = true;
    this.currentSaveParams = params;

    return new Promise((resolve, reject) => {
      this.forEachStage(this.stageMap, params)
        .catch((error: SaveReturnData) => {
          HSApp.Logger.userTrackLogger.push('save.process.error', { originData: error }, {});
          return error
            ? { ...error, status: error.status ?? 'error' }
            : { status: 'error' };
        })
        .then((result: SaveReturnData) => {
          if (result?.status === 'cancel') {
            this.signalSaveCancel.dispatch({
              saveReturnData: result,
              saveParams: params
            });
          } else {
            this.onSaveEnd(params, result);
            if (result?.status === 'success') {
              HSApp.Logger.userTrackLogger.push('save.process.success', {}, {});
              return resolve(result);
            }
            reject(result);
          }
        })
        .finally(() => {
          this.currentSaveParams = undefined;
          this.saving = false;
        });
    });
  }

  private async forEachStage(
    stages: Map<SaveStageEnum, SaveStageExecutor>,
    params: SaveParams
  ): Promise<SaveReturnData> {
    const stageResults: Record<string, unknown> = {};
    let previousData: unknown;
    let currentStageName: SaveStageEnum | undefined;

    for (const [stageName, stageExecutor] of stages) {
      try {
        currentStageName = stageName;
        this.startStage(stageName, params);

        const startTime = performance.now();
        const executeFunction = stageExecutor.execute.bind(this);
        let stageResult = await executeFunction(params, previousData);

        stageResult = {
          ...stageResult,
          time: performance.now() - startTime,
          stage: stageName
        };

        this.endStage(stageName, params, stageResult);

        if (stageResult.status !== 'success') {
          return Promise.reject(stageResult);
        }

        previousData = stageResult.data;
        stageResults[currentStageName] = previousData;
      } catch (error) {
        const transformedError = this.API.transformError(error);
        this.endStage(stageName, params, transformedError);
        return Promise.reject({
          ...transformedError,
          stage: currentStageName
        });
      }
    }

    return { status: 'success', data: stageResults };
  }

  public showSaveDialog(params: SaveParams): Promise<SaveReturnData> {
    return Promise.resolve({ status: 'success' });
  }

  public getData(params: SaveParams): Record<string, unknown> {
    return {};
  }

  public getSignalData(params: SaveParams, result?: SaveReturnData): Record<string, unknown> {
    return {};
  }

  private startStage(stageName: SaveStageEnum, params: SaveParams): void {
    const signalData = this.getSignalData(params);

    if (stageName === SaveStageEnum.GetData) {
      this.signalSaveStart.dispatch({
        ...signalData,
        saveParams: params
      });
    }

    this.signalSaveProcess.dispatch({
      ...signalData,
      saveParams: params,
      stageName,
      processType: 'start'
    });
  }

  private endStage(stageName: SaveStageEnum, params: SaveParams, result: SaveReturnData): void {
    const signalData = this.getSignalData(params, result);

    this.signalSaveProcess.dispatch({
      ...signalData,
      saveParams: params,
      saveReturnData: result,
      stageName,
      processType: 'end'
    });
  }

  public registerService(taskName: string, stage: SaveStageEnum, service: TaskService): void {
    if (stage === SaveStageEnum.Check) {
      this.saveCheckStage.registerTaskService(taskName, service);
    }

    if (stage === SaveStageEnum.Subsequent) {
      this.saveSubsequentStage.registerTaskService(taskName, service);
    }

    if (service.signal) {
      const listener = this.getTaskSignalListener(taskName, stage);
      this.taskSignalMap.set(service, listener);
      service.signal.listen(listener, this);
    }
  }

  private getTaskSignalListener(taskName: string, stage: SaveStageEnum): TaskSignalListener {
    return (event: { data: { saveParams: SaveParams; [key: string]: unknown } }) => {
      const eventData = event.data;
      this.signalSaveProcess.dispatch({
        stageName: stage,
        saveParams: eventData.saveParams,
        taskName,
        ...eventData
      });
    };
  }

  public unregisterService(taskName: string, stage: SaveStageEnum): void {
    let taskService: TaskService | undefined;

    if (stage === SaveStageEnum.Check) {
      taskService = this.saveCheckStage.getTask(taskName);
      this.saveCheckStage.unregisterTaskService(taskName);
    }

    if (stage === SaveStageEnum.Subsequent) {
      taskService = this.saveSubsequentStage.getTask(taskName);
      this.saveSubsequentStage.unregisterTaskService(taskName);
    }

    if (taskService?.signal) {
      const listener = this.taskSignalMap.get(taskService);
      if (listener) {
        taskService.signal.unlisten(listener, this);
      }
    }
  }

  private saveCheck(params: SaveParams, previousData?: unknown): Promise<SaveReturnData> {
    return this.saveCheckStage.execute(params, previousData);
  }

  private saveGetData(params: SaveParams, previousData?: unknown): Promise<SaveReturnData> {
    return this.saveGetDataStage.execute(params, previousData);
  }

  private savePostDate(params: SaveParams, previousData?: unknown): Promise<SaveReturnData> {
    return this.savePostDataStage.execute(params, previousData);
  }

  private saveSubsequent(params: SaveParams, previousData?: unknown): Promise<SaveReturnData> {
    return this.saveSubsequentStage.execute(params, previousData);
  }

  private onSaveSucceeded(params: SaveParams, result: SaveReturnData): Promise<SaveReturnData> {
    return Promise.resolve({ status: 'success' });
  }

  private onSaveFailed(params: SaveParams, result: SaveReturnData): Promise<SaveReturnData> {
    return Promise.resolve({ status: 'success' });
  }

  public transformRequest(data: unknown): unknown {
    return API.transformResultData(data);
  }

  private onSaveEnd(params: SaveParams, result?: SaveReturnData): void {
    const finalResult: SaveReturnData = result ?? { status: 'error' };
    if (!finalResult.status) {
      finalResult.status = 'error';
    }

    const signalData = this.getSignalData(params, finalResult);

    if (finalResult.status === 'success') {
      this.onSaveSucceeded(params, finalResult);
      this.signalSaveSucceeded.dispatch({
        ...signalData,
        saveParams: params,
        saveReturnData: finalResult
      });
    } else if (finalResult.status === 'error') {
      this.onSaveFailed(params, finalResult);
      this.signalSaveFailed.dispatch({
        ...signalData,
        saveParams: params,
        saveReturnData: finalResult,
        saveInfo: finalResult.info,
        error: finalResult.error
      });
    }
  }

  public updateDesignMeta(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const designId = this.app.designMetadata.get('designId') as string;
      if (!designId) {
        reject();
        return;
      }

      const requestData = this.API.getMetaRequestData(this.app.floorplan);
      this.API.populateSaveDesignData(this.app.floorplan, requestData);
      resolve(this.API.transformResult(this.API.updateDesignMeta(designId, requestData)));
    })
      .then(() => true)
      .catch(() => false);
  }

  public refreshDesignMeta(designId: string, forceRefresh: boolean = false): Promise<unknown> {
    return this.API.refreshDesignMeta(this.app, designId, forceRefresh).then((result: unknown) => {
      API.populateRefreshMetaResult(this.app, result);
      return result;
    });
  }

  public executeFloorplanSave(
    params: SaveParams,
    floorplan: Floorplan,
    extension?: SaveExtension
  ): Promise<unknown> {
    if (!floorplan) {
      return Promise.reject('floorplan null');
    }

    if (params.showLiveHint) {
      this.API.showLiveHint(LiveHintType.LOADING);
    }

    const designMetadata = floorplan.designMetadata;
    const attributes = designMetadata.get('attributes') as Record<string, unknown> | undefined;

    if (!attributes) {
      return Promise.reject('no attributes data');
    }

    if (!designMetadata.get('meta')) {
      designMetadata.set('meta', {});
    }

    const requestData: SaveRequestData = this.API.getSaveRequestData(floorplan, {
      needUnderlay: params.needUnderlay,
      isSaveas: false
    });

    this.API.populateSaveDesignData(floorplan, requestData, undefined);

    if (extension?.ext) {
      requestData.ext = JSON.stringify({ ...extension.ext });
    }

    const saveRequest = this.API.postSaveDesignRequest(requestData, false);

    return this.API.transformResult(saveRequest)
      .then((result: unknown) => {
        if (params.showLiveHint) {
          this.API.showLiveHint(LiveHintType.COMPLETE);
        }
        return Promise.resolve(result);
      })
      .catch((error: unknown) => {
        if (params.showLiveHint) {
          this.API.showLiveHint(LiveHintType.WARNING);
        }
        return Promise.reject(error);
      });
  }
}