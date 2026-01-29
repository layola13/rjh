import { HSCore } from './HSCore';
import { ValidAreaBar } from './ValidAreaBar';
import { PreviewValidArea } from './PreviewValidArea';
import { showSmartLayoutDialog, SmartLayoutState } from './SmartLayoutDialog';

interface DesignInfo {
  designId: string;
  designVersion: string;
}

interface TaskResult {
  taskStatus?: SmartLayoutState;
}

interface ValidAreaResult {
  area: number;
  [key: string]: unknown;
}

interface SaveResult {
  error?: unknown;
  errType?: string;
  errMsg?: {
    msg: string;
  };
}

interface MTOPResponse<T = unknown> {
  ret: string[];
  data: T;
}

interface ValidAreaData {
  area: number;
  [key: string]: unknown;
}

interface ToolbarItem {
  name: string;
  order: number;
  type: string;
  label: string;
  icon: string;
  onclick: () => void;
}

interface ToolbarItemReference {
  hide(): void;
}

interface Plugin {
  getItem(itemId: string): ToolbarItemReference | undefined;
  addItem(item: ToolbarItem | ValidAreaBar, position: string, id?: string): void;
  removeItem(itemId: string): void;
  updateItems(itemIds: string[], options: { hasDot: boolean }, scope: string): void;
  ToolbarIdEnum?: {
    DEFAULT_TOOLBAR_ID: string;
  };
}

interface PluginManager {
  getPlugin(pluginType: string): Plugin & {
    signalCheckPermissionsCompleted?: unknown;
    ensureSaved?: (a: null, b: null, c: boolean) => Promise<boolean>;
    save?: (force: boolean) => Promise<unknown>;
    exportFloorplanModificationData?: (enterpriseId: string) => Promise<unknown>;
  };
}

interface App {
  pluginManager: PluginManager;
  signalDocumentOpened: unknown;
  signalEnvironmentActivated: unknown;
  isFloorplanDirty?: boolean;
  designMetadata: Map<string, string>;
  floorplan: {
    scene: {
      activeLayer: {
        openings: Record<string, unknown>;
        parametricOpenings: Record<string, unknown>;
      };
      outdoorLayer: unknown;
    };
  };
}

interface EnvironmentData {
  data: {
    newEnvironmentId: string;
  };
}

export class Handler {
  private readonly MAX_TIME = 192000; // 192 seconds
  private readonly POLLING_INTERVAL = 30000; // 30 seconds
  
  private signalHook?: HSCore.Util.SignalHook;
  private _app: App;
  private _validAreaResult?: ValidAreaResult;
  private toolbarPlugin?: Plugin;
  private intervalId: number | null = null;
  private retryNum = 0;

  constructor(app: App) {
    this._app = app;
  }

  init(): void {
    const loginPlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.Login);
    this.signalHook = new HSCore.Util.SignalHook(this);
    this.signalHook
      .listen(loginPlugin.signalCheckPermissionsCompleted, this._onPermissionsCompleted)
      .listen(this._app.signalDocumentOpened, this._onDesignOpened);
  }

  private _onPermissionsCompleted(): void {
    if (!adskUser.storeSmartLayout) {
      return;
    }

    this.signalHook?.listen(this._app.signalEnvironmentActivated, this._onEnvironmentActivated);
    this.toolbarPlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.Toolbar);
    
    this.toolbarPlugin.getItem('toolBar_file/toolBar_fpCollection')?.hide();

    const queryStrings = HSApp.Util.Url.getQueryStrings();
    
    if (!this.toolbarPlugin.getItem('toolbar_smart_layout') && queryStrings.storeSmartLayout) {
      this.toolbarPlugin.addItem(
        {
          name: 'toolbar_smart_layout',
          order: 540,
          type: 'button',
          label: ResourceManager.getString('store_smart_layout_title'),
          icon: 'hs_mian_zhinengbuju',
          onclick: this.smartLayout.bind(this),
        },
        '',
        this.toolbarPlugin.ToolbarIdEnum?.DEFAULT_TOOLBAR_ID ?? ''
      );
    }

    const pageHeaderPlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.PageHeader);
    pageHeaderPlugin.removeItem('ValidAreaBar');
    pageHeaderPlugin.addItem(new ValidAreaBar(), 'right', 'ValidAreaBar');
  }

  private _onDesignOpened(): void {
    if (adskUser.storeSmartLayout) {
      this.getPollingLayout();
    }
  }

  private _onEnvironmentActivated(event: EnvironmentData): void {
    const pageHeaderPlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.PageHeader);
    
    if (event.data.newEnvironmentId !== HSFPConstants.Environment.Default) {
      pageHeaderPlugin.removeItem('ValidAreaBar');
    } else {
      pageHeaderPlugin.addItem(new ValidAreaBar(), 'right', 'ValidAreaBar');
    }
  }

  private formatArea(area: number): number {
    const rounded = Math.round(100 * area) / 100;
    return parseFloat(rounded.toFixed(2));
  }

  async getValidArea(assetId: string): Promise<number> {
    const layerEditPlugin = this._app.pluginManager.getPlugin(HSFPConstants.PluginType.LayerEdit);
    const modificationData = await layerEditPlugin.exportFloorplanModificationData?.(adskUser.enterpriseId);

    return NWTK.mtop.StoreSmartLayout.getValidArea({
      data: {
        paramJson: JSON.stringify(modificationData),
        assetId,
      },
    })
      .then((response: MTOPResponse<ValidAreaData>) => {
        if (!response || !response.ret[0].includes('SUCCESS')) {
          return Promise.reject(response);
        }

        const formattedArea = this.formatArea(response.data.area);
        this._validAreaResult = { ...response.data, area: formattedArea };
        return formattedArea;
      })
      .catch((error: unknown) => {
        throw error;
      });
  }

  private checkSave = (): Promise<boolean | unknown> => {
    const app = HSApp.App.getApp();
    const persistencePlugin = app.pluginManager.getPlugin('hsw.plugin.persistence.Plugin');
    
    return persistencePlugin
      .ensureSaved?.(null, null, false)
      .then((result: boolean) => {
        if (!result) {
          return false;
        }
        return app.isFloorplanDirty ? persistencePlugin.save?.(false) : result;
      })
      .catch((error: unknown) => {
        throw {
          error,
          errType: 'SaveFailed',
          errMsg: {
            msg: 'Failed to save',
          },
        } as SaveResult;
      }) ?? Promise.resolve(false);
  };

  checkCondition(): boolean {
    const activeDocument = HSCore.Doc.getDocManager().activeDocument;
    
    const roomCount = Object.values(activeDocument.rooms).filter(
      (room: { parent: unknown }) => room.parent !== activeDocument.scene.outdoorLayer
    ).length;
    
    const entryDoorCount = this.getEntryDoors().length;
    
    return roomCount > 0 && entryDoorCount > 0;
  }

  private getEntryDoors(): unknown[] {
    const activeLayer = this._app.floorplan.scene.activeLayer;
    const allOpenings = [
      ...Object.values(activeLayer.openings),
      ...Object.values(activeLayer.parametricOpenings),
    ];

    return allOpenings
      .filter(
        (opening: unknown) =>
          opening instanceof HSCore.Model.Door ||
          opening instanceof HSCore.Model.ParametricDoor ||
          opening instanceof HSCore.Model.Hole
      )
      .filter((opening: { linkFaces: Array<{ spaceInfos: unknown[] }> }) =>
        opening.linkFaces.some((face) => face.spaceInfos.length === 0)
      );
  }

  previewValidArea(): void {
    if (this._validAreaResult) {
      PreviewValidArea(this._validAreaResult);
    }
  }

  smartLayout(): void {
    showSmartLayoutDialog({
      checkCondition: this.checkCondition.bind(this),
      MAX_TIME: this.MAX_TIME,
      getDesignInfo: this.getDesignInfo.bind(this),
      getTaskResult: this.getTaskResult.bind(this),
      submitCallback: this.getPollingLayout.bind(this),
    });
  }

  async getPollingLayout(): Promise<void> {
    clearInterval(this.intervalId ?? undefined);

    if (!this.toolbarPlugin?.getItem('toolbar_smart_layout')) {
      return;
    }

    this.toolbarPlugin.updateItems(['toolbar_smart_layout'], { hasDot: false }, 'default');

    const taskResult = await this.getTaskResult();

    if (taskResult.taskStatus === SmartLayoutState.Success) {
      this.toolbarPlugin.updateItems(['toolbar_smart_layout'], { hasDot: true }, 'default');
      return;
    }

    if (taskResult.taskStatus === SmartLayoutState.Error) {
      return;
    }

    this.intervalId = window.setInterval(async () => {
      try {
        const result = await this.getTaskResult();
        const taskStatus = result?.taskStatus;

        if (taskStatus === SmartLayoutState.Success) {
          this.toolbarPlugin?.updateItems(['toolbar_smart_layout'], { hasDot: true }, 'default');
          clearInterval(this.intervalId ?? undefined);
        } else if (taskStatus === SmartLayoutState.Error) {
          clearInterval(this.intervalId ?? undefined);
        }
      } catch (error) {
        console.error('后端请求失败:', error);
        clearInterval(this.intervalId ?? undefined);
      }
    }, this.POLLING_INTERVAL);
  }

  private getDesignInfo(): DesignInfo {
    const app = HSApp.App.getApp();
    return {
      designId: app.designMetadata.get('designId'),
      designVersion: app.designMetadata.get('designVersion'),
    };
  }

  async getTaskResult(): Promise<TaskResult> {
    try {
      const result = await this.fetchResult();
      return result;
    } catch (error) {
      console.error('获取taskStatus失败:', error);
      return {};
    }
  }

  private fetchResult(): Promise<TaskResult> {
    const { designId } = this.getDesignInfo();
    
    if (!designId) {
      return Promise.reject();
    }

    return NWTK.mtop.StoreSmartLayout.queryTask({
      data: {
        designId,
      },
    }).then((response: MTOPResponse<TaskResult>) => {
      if (response && response.ret[0].includes('SUCCESS')) {
        return response.data;
      }
      return Promise.reject(response.data);
    });
  }
}