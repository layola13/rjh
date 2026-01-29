import { HSApp } from './HSApp';
import { HSCore } from './HSCore';
import { HSFPConstants } from './HSFPConstants';

interface LockStateParams {
  designId: string;
  lock: boolean;
}

interface LockStateResponse {
  designId: string;
  state: string;
  operator?: string;
  management?: string;
}

interface CollaborateEditDesignResponse {
  designId: string;
  collaborate: boolean;
}

interface StateChangeData {
  designId: string;
  operator?: string;
  management?: string;
  from: string;
  to: string;
}

interface StateChangeResult {
  state: 'change' | 'close' | 'keep' | 'newDesign';
}

interface InitResult {
  cancel?: boolean;
  pageHeaderText?: string;
}

interface PageHeaderOptions {
  text?: string;
  onPageHeaderClick?: () => void;
}

interface ConfigItem {
  ignoreHeartbeat?: boolean;
  lock?: boolean;
  isHeartbeat?: boolean;
  init?: (data: any, handlers: DesignHandlers) => Promise<InitResult | undefined>;
  changeTo?: (data: StateChangeData) => Promise<StateChangeResult | undefined>;
  onUserChange?: (params: { designId: string }) => void;
}

interface Config {
  [key: string]: ConfigItem;
}

interface DesignHandlers {
  reloadDesign: () => void;
  closeDesign: () => void;
}

interface PreLoadDesignParams {
  designId: string;
  isFpcollection: boolean;
  isLoad?: boolean;
}

interface SaveEventData {
  data?: {
    saveParams?: {
      saveType?: string;
    };
  };
}

interface Persistence {
  registerOpenPreTask(name: string, task: (params: PreLoadDesignParams) => Promise<void>): void;
  signalSaveSucceeded: {
    listen(callback: (event: SaveEventData) => void, context: any): void;
    unlisten(callback: (event: SaveEventData) => void, context: any): void;
  };
  setBeforeunloadIgnoreFloorplanDirty(ignore: boolean): void;
}

const HEARTBEAT_INTERVAL = 30000;

export class CollaborateEditHandle {
  private timeInterval: number = HEARTBEAT_INTERVAL;
  private timer: number | undefined = undefined;
  private isCollaborate: boolean = false;
  private designCanModel: string | undefined = undefined;
  private persistence: Persistence | undefined = undefined;
  private currentDesignId: string | undefined = undefined;
  private isInHeartbeat: boolean = false;
  private config: Config;

  constructor() {
    this.preLoadDesign = this.preLoadDesign.bind(this);
    this.heartbeat = this.heartbeat.bind(this);
    this.reloadDesign = this.reloadDesign.bind(this);
    this.onDesignClose = this.onDesignClose.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
  }

  private get designModel(): string | undefined {
    return HSApp.EditStatus.EditStatusManager.getInstance().status;
  }

  public init(persistence: Persistence): void {
    this.persistence = persistence;
    this.persistence.registerOpenPreTask('CollaborateEdit', this.preLoadDesign);
    this.persistence.signalSaveSucceeded.listen(this.onDesignSaved, this);
    HSApp.App.getApp().signalDocumentClosed.listen(this.onDesignClose);
  }

  public uninit(): void {
    HSApp.App.getApp().signalDocumentClosed.unlisten(this.onDesignClose);
    this.persistence?.signalSaveSucceeded.unlisten(this.onDesignSaved, this);
  }

  private async doHeartbeat(): Promise<void> {
    if (!this.currentDesignId || !this.designModel || !this.designCanModel) {
      return;
    }

    const configItem = this.config[this.designModel];
    if (configItem?.ignoreHeartbeat) {
      return;
    }

    const lockStateResponse = await this.lockState({
      designId: this.currentDesignId,
      lock: configItem?.lock ?? false
    }).catch((error) => {
      HSApp.App.getApp().userTrackLogger.push(
        'collaborate.edit.heartbeat.error',
        {
          description: '协同方案权限心跳出错',
          params: error
        },
        {}
      );
      return undefined;
    });

    if (!lockStateResponse) {
      return;
    }

    if (
      lockStateResponse.designId !== this.currentDesignId ||
      [this.designCanModel, this.designModel].includes(lockStateResponse.state)
    ) {
      return;
    }

    const stateChangeData: StateChangeData = {
      designId: lockStateResponse.designId,
      operator: lockStateResponse.operator,
      management: lockStateResponse.management,
      from: this.designCanModel,
      to: lockStateResponse.state
    };

    HSApp.App.getApp().userTrackLogger.push(
      'collaborate.edit.state.need.change',
      {
        description: '协同方案权限需要变更',
        params: { data: stateChangeData }
      },
      {}
    );

    const changeResult = await configItem?.changeTo?.(stateChangeData).catch(() => undefined);

    HSApp.App.getApp().userTrackLogger.push(
      'collaborate.edit.state.changed',
      {
        description: '协同方案权限变更',
        params: {
          data: stateChangeData,
          useSelect: changeResult
        }
      },
      {}
    );

    if (changeResult?.state === 'change') {
      this.designCanModel = lockStateResponse.state;
      this.reloadDesign();
    } else if (changeResult?.state === 'close') {
      this.closeDesign();
    } else if (changeResult?.state === 'keep') {
      this.designCanModel = lockStateResponse.state;
    } else if (changeResult?.state === 'newDesign') {
      this.newDesign();
    }
  }

  private async heartbeat(): Promise<void> {
    if (this.isInHeartbeat) {
      return;
    }

    this.isInHeartbeat = true;
    await this.doHeartbeat().catch(() => {});
    this.isInHeartbeat = false;
  }

  private reloadDesign(): void {
    this.persistence?.setBeforeunloadIgnoreFloorplanDirty(true);
    window.location.reload();
  }

  private closeDesign(): void {
    this.persistence?.setBeforeunloadIgnoreFloorplanDirty(true);
    window.location.replace('about:blank');
  }

  private newDesign(): void {
    this.persistence?.setBeforeunloadIgnoreFloorplanDirty(true);
    const queryStrings = HSApp.Util.Url.getQueryStrings();
    queryStrings.assetId = undefined;
    const newUrl = HSApp.Util.Url.replaceParamsInUrl(queryStrings);
    window.location.replace(newUrl);
  }

  private setDesignModel(model: string, options?: PageHeaderOptions): void {
    const readonlyFn = options?.onPageHeaderClick ?? (() => {});
    HSApp.App.getApp().pluginManager.getPlugin(HSFPConstants.PluginType.EditStatus).setModelStatus(model, {
      pageHeaderOptions: {
        readonlyFn,
        text: options?.text
      }
    });
  }

  private startTimer(): void {
    if (!this.timer) {
      this.timer = window.setInterval(this.heartbeat, this.timeInterval);
    }
  }

  private clearTimer(): void {
    if (this.timer) {
      window.clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  private async preLoadDesign(params: PreLoadDesignParams): Promise<void> {
    this.clearTimer();

    if (params.isFpcollection) {
      return;
    }

    this.currentDesignId = params.designId;

    const collaborateResponse = await this.isCollaborateEditDesign(params.designId);
    this.isCollaborate = collaborateResponse.collaborate;

    if (this.currentDesignId !== params.designId) {
      return;
    }

    if (!this.isCollaborate) {
      this.setDesignModel(HSApp.EditStatus.ENUM_EDIT_MODEL.EDIT, {});
      return;
    }

    const lockStateResponse = await this.lockState({
      designId: params.designId,
      lock: true
    });

    const configItem = this.config[lockStateResponse.state];

    HSApp.App.getApp().userTrackLogger.push(
      'collaborate.edit.init',
      {
        description: '协同方案权限获取',
        params: lockStateResponse
      },
      {}
    );

    if (!configItem) {
      return;
    }

    const initResult = await configItem.init?.(
      {
        ...lockStateResponse,
        designId: params.designId
      },
      {
        reloadDesign: this.reloadDesign,
        closeDesign: this.closeDesign
      }
    );

    if (initResult?.cancel) {
      return Promise.reject({ cancel: true });
    }

    this.setDesignModel(lockStateResponse.state, {
      text: initResult?.pageHeaderText,
      onPageHeaderClick: this.onUserChange
    });

    this.designCanModel = lockStateResponse.state;

    if (configItem.isHeartbeat) {
      if (params.isLoad) {
        this.startTimer();
      } else {
        const signalHook = new HSCore.Util.SignalHook();
        const startTimerCallback = (): void => {
          this.startTimer();
          signalHook.unlistenAll();
        };
        signalHook.listen(HSApp.App.getApp().signalDocumentOpened, startTimerCallback);
      }
    }
  }

  private onUserChange(): void {
    if (!this.currentDesignId || !this.designModel) {
      return;
    }

    const configItem = this.config[this.designModel];
    configItem?.onUserChange?.({
      designId: this.currentDesignId
    });
  }

  private onDesignSaved(event: SaveEventData): void {
    const saveType = event.data?.saveParams?.saveType;
    if (saveType && ['save', 'saveas'].includes(saveType)) {
      this.preLoadDesign({
        designId: this.getDesignId(),
        isFpcollection: false,
        isLoad: true
      });
    }
  }

  private getDesignId(): string {
    return HSApp.App.getApp().designMetadata.get('designId');
  }

  private onDesignClose(): void {
    this.clearTimer();
  }

  private async lockState(params: LockStateParams): Promise<LockStateResponse> {
    // Implementation depends on external API
    throw new Error('lockState method must be implemented');
  }

  private async isCollaborateEditDesign(designId: string): Promise<CollaborateEditDesignResponse> {
    // Implementation depends on external API
    throw new Error('isCollaborateEditDesign method must be implemented');
  }
}