import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

export enum ENAddRoofStatus {
  Beginning = "beginning",
  Preview = "preview",
  Generated = "generated"
}

const NOT_TIP_CREATE_ROOF_SUCCESS = "NOT_TIP_CREATE_ROOF_SUCCESS";
const NOT_TIP_VIEW_HIDE_AFTER_ROOF_CREATED = "NOT_TIP_VIEW_HIDE_AFTER_ROOF_CREATED";

class RoofStatusManager {
  private _status: ENAddRoofStatus = ENAddRoofStatus.Beginning;
  private _roof?: any;

  getStatus(): ENAddRoofStatus {
    return this._status;
  }

  setStatus(status: ENAddRoofStatus): void {
    this._status = status;
  }

  getRoof(): any | undefined {
    return this._roof;
  }

  setRoof(roof?: any): void {
    this._roof = roof;
  }

  clear(): void {
    this._status = ENAddRoofStatus.Beginning;
    this._roof = undefined;
  }
}

interface AddRoofEnvConfig {
  app: any;
  handler: any;
  dependencies: Record<string, any>;
}

interface PickResult {
  viewObject?: any;
}

interface MouseEventData {
  pickResults?: PickResult[];
  event?: MouseEvent & { button?: number; clientX: number; clientY: number };
}

export class AddRoofEnv extends HSApp.Environment.CommonEnvironment {
  handler: any;
  status: RoofStatusManager = new RoofStatusManager();
  private _transMgr: any;
  private _signalHook: HSCore.Util.SignalHook;
  private _plugins: Record<string, any> = {};
  private _hiddenEntities: any[] = [];
  private _session?: any;
  private _isAutoSaveOn?: boolean;

  constructor(config: AddRoofEnvConfig) {
    super(config.app);
    
    this.handler = config.handler;
    this._signalHook = new HSCore.Util.SignalHook(this);
    this._initPlugins(config.dependencies);
    this._transMgr = this._app.transManager;
  }

  private _bindHooks(): void {
    this._signalHook
      .listen(this._transMgr.signalUndone, this._onUndone)
      .listen(this._transMgr.signalRedone, this._onRedone);
  }

  private _unbindHooks(): void {
    this._signalHook.unlistenAll();
  }

  private _registerHotkey(): void {
    this._app.hotkey.registerHotkey("esc", this._cancel);
  }

  private _unregisterHotkey(): void {
    this._app.hotkey.registerHotkey("esc", this._cancel);
  }

  private _onUndone = (event: any): void => {
    const requestType = event?.data?.request?.type;
    
    if (requestType === HSFPConstants.RequestType.AddRoof) {
      this.status.setStatus(ENAddRoofStatus.Beginning);
      this.status.setRoof();
      this.handler.getViewController().showGizmo();
    } else if (requestType === HSFPConstants.RequestType.ReplaceRoof) {
      const oldRoof = event.data.request.oldRoof;
      this.status.setRoof(oldRoof);
    }
  };

  private _onRedone = (event: any): void => {
    const requestType = event?.data?.request?.type;
    
    if (requestType === HSFPConstants.RequestType.AddRoof) {
      this.status.setStatus(ENAddRoofStatus.Preview);
      const roof = event.data.request.roof;
      this.status.setRoof(roof);
      this.handler.getViewController().hideGizmo();
    } else if (requestType === HSFPConstants.RequestType.ReplaceRoof) {
      const roof = event.data.request.roof;
      this.status.setRoof(roof);
    }
  };

  onActivate(params: any): void {
    this._app.selectionManager.unselectAll();
    this._session = this._transMgr.startSession();
    this._registerHotkey();
    this._bindHooks();
    this._handleRelativePlugins();
    this._hideEntities();
    this.handler.showGenerativeLoops(params);
  }

  onDeactivate(): void {
    updateMouseTips("");
    this._app.selectionManager.unselectAll();
    
    if (this.status.getStatus() === ENAddRoofStatus.Generated) {
      this._session?.commit({ mergeRequest: true });
    } else {
      this._session?.abort();
    }
    
    this.status.clear();
    this._unregisterHotkey();
    this._unbindHooks();
    this._resetRelativePlugins();
    this._resetHiddenEntities();
    this.handler.hideGenerativeLoops();
  }

  private _initPlugins(dependencies: Record<string, any>): void {
    const pluginTypes = [
      HSFPConstants.PluginType.LayerEdit,
      HSFPConstants.PluginType.StatusBar,
      HSFPConstants.PluginType.ResizeWidget,
      HSFPConstants.PluginType.ViewSwitch,
      HSFPConstants.PluginType.Catalog,
      HSFPConstants.PluginType.PropertyBar,
      HSFPConstants.PluginType.ContextualTools,
      HSFPConstants.PluginType.Persistence,
      HSFPConstants.PluginType.Feedback,
      HSFPConstants.PluginType.Toolbar
    ];
    
    pluginTypes.forEach((pluginType) => {
      this._plugins[pluginType] = dependencies[pluginType];
    });
  }

  private _handleRelativePlugins(): void {
    const persistencePlugin = this._plugins[HSFPConstants.PluginType.Persistence];
    this._isAutoSaveOn = persistencePlugin?.getAutoSaveOn();
    
    if (this._isAutoSaveOn) {
      persistencePlugin?.setAutoSaveOn(false);
    }
  }

  private _resetRelativePlugins(): void {
    if (this._isAutoSaveOn) {
      this._plugins[HSFPConstants.PluginType.Persistence]?.setAutoSaveOn(true);
    }
  }

  private _hideEntities(): void {
    if (!this.handler.isShowAllLayer()) {
      return;
    }
    
    let allSlabs: Record<string, any> = {};
    
    HSCore.Util.Roof.getOvergroundLayers().forEach((layer: any) => {
      allSlabs = { ...allSlabs, ...layer.slabs };
    });
    
    Object.values(allSlabs).forEach((slab: any) => {
      slab.forEachFace((face: any) => {
        if (!(face instanceof HSCore.Model.Floor) && 
            !face.isFlagOn(HSCore.Model.EntityFlagEnum.hidden)) {
          face.setFlagOn(HSCore.Model.EntityFlagEnum.hidden);
          this._hiddenEntities.push(face);
        }
      });
    });
  }

  private _resetHiddenEntities(): void {
    this._hiddenEntities.forEach((entity) => 
      entity.setFlagOff(HSCore.Model.EntityFlagEnum.hidden)
    );
    this._hiddenEntities = [];
  }

  private _isOnTriangleGizmo(pickResults?: PickResult[]): boolean {
    return !!(pickResults?.[0]?.viewObject instanceof TriangleGizmo);
  }

  private _isOnLoopGizmo(pickResults?: PickResult[]): boolean {
    return !!(pickResults?.[0]?.viewObject instanceof LoopGizmo);
  }

  onReceive(eventType: string, data: MouseEventData): boolean {
    switch (eventType) {
      case "mousemove": {
        const pickResults = data.pickResults;
        
        if (this._isOnTriangleGizmo(pickResults)) {
          return false;
        }
        
        const currentStatus = this.status.getStatus();
        let tooltip = "";
        
        if (this._app.is3DViewActive()) {
          if (currentStatus === ENAddRoofStatus.Beginning) {
            tooltip = this._isOnLoopGizmo(pickResults)
              ? ResourceManager.getString("roof_created_to_preview_tip")
              : ResourceManager.getString("roof_created_to_choice_area");
          } else if (currentStatus === ENAddRoofStatus.Preview) {
            tooltip = ResourceManager.getString("roof_created_to_confirm");
          }
        }
        
        updateMouseTips(tooltip, {
          x: data.event!.clientX,
          y: data.event!.clientY
        });
        
        return false;
      }
      
      case "mouseout":
        updateMouseTips("", {
          x: data.event!.clientX,
          y: data.event!.clientY
        });
        return false;
      
      case "click": {
        if (data.event?.button === 2) {
          this._cancel();
        } else {
          const pickResults = data.pickResults;
          const viewObject = pickResults?.[0]?.viewObject;
          
          if (viewObject instanceof LoopGizmo) {
            this._createPreviewRoof(viewObject);
          } else if (!(viewObject instanceof TriangleGizmo)) {
            if (this.status.getStatus() === ENAddRoofStatus.Preview) {
              this._endPreview();
            }
          }
        }
        return true;
      }
      
      default:
        return super.onReceive(eventType, data);
    }
  }

  private _cancel = (): void => {
    if (this.status.getStatus() === ENAddRoofStatus.Preview) {
      this.status.clear();
    }
    this._complete();
  };

  private _complete(): void {
    this.handler.closeAddEnv();
  }

  private _createPreviewRoof(loopGizmo: any): void {
    const defaultRoofMeta = this.handler.getResource().defaultRoofMeta;
    
    if (!defaultRoofMeta) {
      return;
    }
    
    const levelLayer = loopGizmo.getLevelLayer();
    const loopInfo = loopGizmo.getLoopInfo();
    const relativeHeight = loopGizmo.getRelativeHeight() * 1000;
    const linkWallIds = loopInfo.loop.linkWallIds;
    
    const cmdManager = this._app.cmdManager;
    const command = cmdManager.createCommand(
      HSFPConstants.CommandType.AddRoof,
      [defaultRoofMeta.meta, levelLayer, loopInfo, relativeHeight, linkWallIds]
    );
    
    const roof = cmdManager.execute(command);
    this.status.setRoof(roof);
    this.status.setStatus(ENAddRoofStatus.Preview);
    this.handler.getViewController().hideGizmo();
  }

  private _showSuccessTip(): void {
    const toolbarPlugin = this._plugins[HSFPConstants.PluginType.Toolbar];
    
    if (!localStorage.getItem(NOT_TIP_VIEW_HIDE_AFTER_ROOF_CREATED)) {
      toolbarPlugin?.toolTipSignalHook.dispatch({
        closeCallBack: () => {
          localStorage.setItem(NOT_TIP_VIEW_HIDE_AFTER_ROOF_CREATED, "true");
        },
        tips: ResourceManager.getString("roof_created_to_bubble_tip"),
        showTips: true
      });
    }
    
    if (!localStorage.getItem(NOT_TIP_CREATE_ROOF_SUCCESS)) {
      const feedbackText = ResourceManager.getString("toast_roof_created_feedback");
      
      LiveHint.show(
        ResourceManager.getString("toast_roof_created"),
        3000,
        () => {
          this._plugins[HSFPConstants.PluginType.Feedback].showFeedbackEntry();
        },
        {
          status: "completed",
          append: `<span class='action'>${feedbackText}</span>`,
          canclose: true,
          closeCallback: () => {
            localStorage.setItem(NOT_TIP_CREATE_ROOF_SUCCESS, "true");
          }
        }
      );
    }
  }

  private _endPreview(): void {
    const roof = this.status.getRoof();
    
    if (!roof) {
      return;
    }
    
    const cmdManager = this._app.cmdManager;
    const command = cmdManager.createCommand(
      HSFPConstants.CommandType.EndRoofPreview,
      [roof]
    );
    
    cmdManager.execute(command);
    this.status.setStatus(ENAddRoofStatus.Generated);
    this._complete();
    this._showSuccessTip();
  }

  getViewOptions(): any {
    if (!this.active) {
      return null;
    }
    
    return {
      viewOptions2D: this.get2DViewOptions(),
      viewOptions3D: this.get3DViewOptions(),
      secondaryViewOptions: this.getSecondaryViewOptions(),
      showTip: true,
      showPopOver: true
    };
  }

  get2DViewOptions(): any[] {
    const options = super.get2DViewOptions();
    
    options.forEach((option) => {
      option.type = "nottoplevel";
    });
    
    return options;
  }
}