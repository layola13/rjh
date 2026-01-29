import { HSCore } from './HSCore';

interface SaveParams {
  saveTraceId: string;
  isSaveas?: boolean;
}

interface SaveReturnData {
  status?: number;
  time?: number;
  error?: {
    name: string;
    message: string;
    stack: string;
  };
}

interface SaveEventData {
  saveParams: SaveParams;
  saveReturnData?: SaveReturnData;
  data?: any;
  stageName?: string;
  processType?: string;
}

interface SaveEvent {
  data: SaveEventData;
}

interface SaveInfo {
  begin: number;
}

interface Logger {
  info(message: string, category?: string, isPublic?: boolean): void;
  debug(message: string): void;
}

interface SaveHandler {
  signalSaveStart: Signal;
  signalSaveProcess: Signal;
  signalSaveSucceeded: Signal;
  signalSaveFailed: Signal;
  signalAutoSaveStart: Signal;
  signalAutoSaveSucceeded: Signal;
  signalAutoSaveFailed: Signal;
}

interface Signal {
  listen(callback: Function, context: any): void;
}

interface SaveProcessPluginOptions {
  saveHandler: SaveHandler;
}

interface App {
  activeEnvironmentId?: string;
}

interface ErrorTest {
  name: string;
  test: (error: any) => boolean;
  getInfo: (error: any) => ErrorInfo;
}

interface ErrorInfo {
  id: string;
  info: {
    success: boolean;
    code: string;
    message: any;
    unique: boolean;
    time?: number;
  };
}

const ERROR_HANDLERS: ErrorTest[] = [
  {
    name: "/network/SaveDesign",
    test: (error: any): boolean => {
      const ErrorStatusEnum = NWTK.mtop.ErrorStatusEnum;
      const originalResult = error.originalResult || {};
      return [
        ErrorStatusEnum.FAIL_SYS_HSF_INVOKE_ERROR,
        ErrorStatusEnum.FAIL_SYS_HSF_TIMEOUT,
        ErrorStatusEnum.NETWORK_ERR_FAILED,
        ErrorStatusEnum.ABORT
      ].includes(error.errorType) || 
      (originalResult.status === 0 && originalResult.readyState !== undefined && originalResult.readyState < 4);
    },
    getInfo: (error: any): ErrorInfo => ({
      id: "/network/SaveDesign",
      info: {
        success: false,
        code: "ERROR",
        message: error,
        unique: true
      }
    })
  },
  {
    name: "/action/SaveDesign/exclusionStatistics",
    test: (error: any): boolean => {
      const ErrorStatusEnum = NWTK.mtop.ErrorStatusEnum;
      const originalResult = error.originalResult || {};
      return [
        ErrorStatusEnum.TIMEOUT,
        ErrorStatusEnum.FAIL_SYS_SESSION_EXPIRED,
        ErrorStatusEnum.FAIL_SYS_TOKEN_EXOIRED,
        ErrorStatusEnum.FAIL_SYS_ILLEGAL_ACCESS
      ].includes(error.errorType) || originalResult.isTrusted;
    },
    getInfo: (error: any): ErrorInfo => ({
      id: "/action/SaveDesign/exclusionStatistics",
      info: {
        success: false,
        code: "ERROR",
        message: error,
        unique: true
      }
    })
  },
  {
    name: "/action/SaveDesign-envid",
    test: (error: any): boolean => {
      const ErrorStatusEnum = NWTK.mtop.ErrorStatusEnum;
      return ![
        ErrorStatusEnum.FAIL_BIZ_RESOURCE_NOT_FOUND,
        ErrorStatusEnum.FAIL_BIZ_HIGH_FREQUENCY,
        ErrorStatusEnum.FAIL_BIZ_PERMISSION_DENIED
      ].includes(error.errorType);
    },
    getInfo: (error: any): ErrorInfo => {
      const app = HSApp.App.getApp();
      const environmentId = app.activeEnvironmentId;
      return {
        id: `/action/SaveDesign/${environmentId}`,
        info: {
          success: false,
          code: "ERROR",
          message: error,
          unique: true
        }
      };
    }
  }
];

export default class SaveProcessMonitor extends SaveProcessPlugin {
  private saveInfo: Record<string, SaveInfo>;
  private logger: Logger;

  constructor(options: SaveProcessPluginOptions) {
    super(options);
    
    this.saveInfo = {};
    this.logger = d.default;

    const { saveHandler } = options;
    saveHandler.signalSaveStart.listen(this.startSave, this);
    saveHandler.signalSaveProcess.listen(this.saveProcess, this);
    saveHandler.signalSaveSucceeded.listen(this.saveSucceeded, this);
    saveHandler.signalSaveFailed.listen(this.saveFailed, this);
    saveHandler.signalAutoSaveStart.listen(this.startAutoSave, this);
    saveHandler.signalAutoSaveSucceeded.listen(this.autoSaveSucceeded, this);
    saveHandler.signalAutoSaveFailed.listen(this.autoSaveFailed, this);
  }

  private startSave(event: SaveEvent): void {
    const { saveParams } = event.data || {};
    const { saveTraceId = "" } = saveParams;

    this.saveInfo[saveTraceId] = {
      begin: Date.now()
    };

    const saveType = saveParams.isSaveas ? "save as" : "save";
    log.info(`${saveParams.saveTraceId}#Start to ${saveType} design`, "HSApp.Io.Save", true);

    const app = HSApp.App.getApp();
    const designId = p.default.getDesignId(app);
    const userId = p.default.getLoginUserId();
    let shareUrl = HSApp.Config.SHARE_DESIGN_SITE;
    shareUrl = shareUrl.replace("#", designId);

    HSApp.Util.EventTrack.instance().track(HSApp.Util.EventGroupEnum.Toolbar, "toolbar_design_save_event", {
      userID: userId,
      designID: designId,
      designUrl: shareUrl
    });
  }

  private saveProcess(event: SaveEvent): void {
    const { data } = event;
    const app = HSApp.App.getApp();
    const designId = p.default.getDesignId(app);
    const version = p.default.getDesignVersion(app);
    const status = data.saveReturnData?.status || data.data;

    const statusText = status ? `-${status}` : "";
    const timeText = data.saveReturnData?.time ? `-${data.saveReturnData.time}` : "";

    this.logger.info(
      `save process - id:${designId}, version:${version}, stage:${data.stageName}-${data.processType}${statusText}${timeText}`
    );
  }

  private saveSucceeded(event: SaveEvent): void {
    const { saveParams } = event.data || {};
    const { saveTraceId } = saveParams;
    const { begin = Date.now() } = this.saveInfo[saveTraceId] || {};

    this.logger.debug("save succeed");

    const app = HSApp.App.getApp();
    let environmentId = app.activeEnvironmentId;
    if (environmentId) {
      environmentId = `/${environmentId}`;
    }

    const designId = p.default.getDesignId(app);
    const version = p.default.getDesignVersion(app);

    this.logger.info(
      `save floorplan - dump id:${designId}, version:${version}, time:${HSCore.Stat.FloorplanStat.instance().dumpTime}`,
      true
    );
    this.logger.info(
      `save floorplan - dumpStringify id:${designId}, version:${version}, time:${HSCore.Stat.FloorplanStat.instance().dumpStringifyTime}`,
      true
    );

    const userId = p.default.getLoginUserId();
    const eventTracker = HSApp.Util.EventTrack.instance();
    eventTracker.track(HSApp.Util.EventGroupEnum.Toolbar, "design_save_successfully_event", {
      userID: userId,
      designID: designId
    });

    log.info(`${saveTraceId}#Save result code Success`, "HSApp.Io.Save", true);

    const duration = Date.now() - begin;
    eventTracker.api(`/action/SaveDesign${environmentId}`, {
      success: true,
      time: duration,
      code: "SUCCESS"
    });
    eventTracker.api("/network/SaveDesign", {
      success: true,
      time: duration,
      code: "SUCCESS"
    });

    log.info("Success", "HSApp.Io.SaveDesign.Success", true);
    delete this.saveInfo[saveTraceId];
  }

  private saveFailed(event: SaveEvent): void {
    const { data } = event;
    const app = HSApp.App.getApp();
    const { saveParams, saveReturnData } = data || {};

    if (HSApp.Config.ENV !== "prod" && saveReturnData) {
      console.error("save-error", saveReturnData);
    }

    let processedReturnData = saveReturnData;
    if (saveReturnData?.error) {
      if (HSApp.Config.ENV !== "prod") {
        console.error(saveReturnData.error);
      }
      const serializedError = {
        name: saveReturnData.error.name,
        message: saveReturnData.error.message,
        stack: saveReturnData.error.stack
      };
      processedReturnData = {
        ...saveReturnData,
        error: serializedError
      };
    }

    const { saveTraceId } = saveParams;
    const { begin = Date.now() } = this.saveInfo[saveTraceId] || {};
    const designId = p.default.getDesignId(app);
    const userId = p.default.getLoginUserId();
    const eventTracker = HSApp.Util.EventTrack.instance();

    eventTracker.track(HSApp.Util.EventGroupEnum.Toolbar, "design_save_failure_event", {
      userID: userId,
      designID: designId
    });

    this.logger.info(`${saveTraceId}#Save result code Failed, error msg: `, true);

    const duration = Date.now() - begin;
    for (let i = 0; i < ERROR_HANDLERS.length; i++) {
      const handler = ERROR_HANDLERS[i];
      if (processedReturnData && handler.test(processedReturnData)) {
        const { id, info } = handler.getInfo(processedReturnData);
        eventTracker.api(id, {
          ...info,
          time: duration
        });
        break;
      }
    }

    delete this.saveInfo[saveTraceId];
  }

  private startAutoSave(event: SaveEvent): void {
    const { saveTraceId } = event.data.saveParams;
    this.saveInfo[saveTraceId] = {
      begin: Date.now()
    };
    this.logger.info("Auto Save Start");
  }

  private autoSaveSucceeded(event: SaveEvent): void {
    const { saveParams } = event.data;
    const { saveTraceId } = saveParams;
    const { begin = Date.now() } = this.saveInfo[saveTraceId] || {};

    const app = HSApp.App.getApp();
    const environmentId = app.activeEnvironmentId;

    HSApp.Util.EventTrack.instance().api(`/action/AutoSaveDesign/${environmentId}`, {
      success: true,
      time: Date.now() - begin,
      code: "SUCCESS"
    });

    delete this.saveInfo[saveTraceId];
    this.logger.info("Auto Save Succeeded");
  }

  private autoSaveFailed(event: SaveEvent): void {
    const { saveParams, saveReturnData } = event.data;

    if (HSApp.Config.ENV !== "prod" && saveReturnData) {
      console.error("auto-save-error", saveReturnData);
    }

    let processedReturnData = saveReturnData;
    if (saveReturnData?.error) {
      if (HSApp.Config.ENV !== "prod") {
        console.error(saveReturnData.error);
      }
      const serializedError = {
        name: saveReturnData.error.name,
        message: saveReturnData.error.message,
        stack: saveReturnData.error.stack
      };
      processedReturnData = {
        ...saveReturnData,
        error: serializedError
      };
    }

    const { saveTraceId } = saveParams;
    const { begin = Date.now() } = this.saveInfo[saveTraceId] || {};
    const app = HSApp.App.getApp();
    const environmentId = app.activeEnvironmentId;

    HSApp.Util.EventTrack.instance().api(`/action/AutoSaveDesign/${environmentId}`, {
      success: false,
      time: Date.now() - begin,
      code: "ERROR",
      message: processedReturnData || {}
    });

    delete this.saveInfo[saveTraceId];
  }
}