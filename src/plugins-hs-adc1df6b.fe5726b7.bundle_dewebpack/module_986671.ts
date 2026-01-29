import { HSCore, HSApp, HSFPConstants, HSConstants, ResourceManager, LiveHint, MiniImagePreviewCtrl } from './dependencies';

interface Dependencies {
  [HSFPConstants.PluginType.LeftMenu]: LeftMenuPlugin;
}

interface LeftMenuPlugin {
  signalPopulateCustomizedItems: HSCore.Util.Signal;
  hideLeftMenu(): void;
}

interface Handler {
  clearSuckedMoldingData(): void;
  getSuckedMoldingData(): MoldingData | undefined;
  setSuckedMoldingData(data: MoldingData): void;
}

interface MoldingData {
  entity: HSCore.Model.CustomizedModelMolding | HSCore.Model.NCustomizedModelMolding;
  profileData?: {
    iconImg?: string;
    iconSmallURI?: string;
    thumbnail?: string;
  };
  iconSmall?: string;
}

interface EventData {
  entity?: unknown;
  event: MouseEvent | KeyboardEvent;
  mouseOver?: Array<{ viewObject?: unknown }>;
  keyCode?: number;
}

interface Position {
  x: number;
  y: number;
}

interface IconData {
  icon: string;
}

interface LeftMenuItemData {
  customizedItems: Array<{
    label: string;
    src: string;
    id: string;
    showHotKey: boolean;
    onClick: () => void;
  }>;
}

interface PopulateEvent {
  data: LeftMenuItemData;
}

interface Strategy {
  ClassName?: string;
  isSuckable(viewObject: unknown): boolean;
  isAppliable(entity: EventData, moldingData?: MoldingData): boolean;
  suck(entity: EventData): MoldingData | false;
  stopPreview?(): void;
}

enum StateEnum {
  Suck = "Suck",
  Brush = "Brush"
}

const SUCK_AGAIN_NOT_SHOW_LIVEHINT = "moldingbrush.suckagain.notshowlivehint";

class MoldingBrushCommand extends HSApp.Cmd.Command {
  private static _firstTime: boolean = true;
  public static readonly StateEnum = StateEnum;
  public static readonly SUCK_AGAIN_NOT_SHOW_LIVEHINT = SUCK_AGAIN_NOT_SHOW_LIVEHINT;

  private readonly _dependencies: Dependencies;
  private readonly _handler: Handler;
  private readonly _leftMenuPlugin: LeftMenuPlugin;
  private readonly _signalHook: HSCore.Util.SignalHook;
  private readonly _cursors: Record<string, string>;
  private readonly _localStorage: HSApp.Util.Storage;

  public readonly signalSuckedMoldingChanged: HSCore.Util.Signal;

  private _cmdState: StateEnum | undefined;
  private _strategies: Strategy[];
  private _cursorEnabled: boolean;
  private _keyCodeData: EventData | null;
  private miniImagePreviewCtrl: MiniImagePreviewCtrl | null;

  constructor(dependencies: Dependencies, handler: Handler) {
    super();
    
    this._dependencies = dependencies;
    this._handler = handler;
    this._cmdState = undefined;
    this._strategies = [];
    this._leftMenuPlugin = this._dependencies[HSFPConstants.PluginType.LeftMenu];
    this._signalHook = new HSCore.Util.SignalHook(this);
    this.signalSuckedMoldingChanged = new HSCore.Util.Signal(this);
    
    this._cursors = {
      suck_cursor: `cursor: url(${HSConstants.Resources.svgs.mat_suck_cursor}) 0 24, auto;`,
      suck_disable_cursor: `cursor: url(${HSConstants.Resources.svgs.mat_suck_disable_cursor}) 0 24, auto;`,
      brush_cursor: `cursor: url(${HSConstants.Resources.svgs.mat_brush_cursor}) 0 0, auto;`,
      brush_disable_cursor: `cursor: url(${HSConstants.Resources.svgs.mat_brush_disable_cursor}) 0 0, auto;`
    };
    
    this._cursorEnabled = true;
    this.miniImagePreviewCtrl = null;
    this._localStorage = new HSApp.Util.Storage("hsw.plugin.moldingbrush");
    this._keyCodeData = null;
  }

  public onExecute(): void {
    this.context.app.selectionManager.unselectAll();
    
    const leftMenuPlugin = this._leftMenuPlugin;
    if (leftMenuPlugin) {
      this._signalHook.listen(leftMenuPlugin.signalPopulateCustomizedItems, this._onPopulateLeftMenuItems);
    }
    
    this._initStrategies();
    this._switchToNextState(StateEnum.Suck);
  }

  public onReceive(eventType: string, eventData: EventData): boolean {
    switch (eventType) {
      case "mousemove":
        this._renderMiniImagePreview(eventData);
        this._makeCanvasFocused();
        this._onEntityHovered(eventData);
        this._keyCodeData = eventData;
        return true;

      case "click":
        if (!eventData?.entity) {
          return false;
        }
        
        if ((eventData.event as MouseEvent).which === 3) {
          this.mgr.cancel();
        }
        
        if ((eventData.event as MouseEvent).button === 0) {
          this._onEntitySelected(eventData);
        }
        
        this._keyCodeData = null;
        return false;

      case "keydown":
        if (eventData?.keyCode === HSApp.Util.Keyboard.KeyCodes.ALT) {
          this._dependencies[HSFPConstants.PluginType.LeftMenu].hideLeftMenu();
          this._switchToNextState(StateEnum.Suck);
          eventData.event.preventDefault();
        }
        return true;

      case "keyup":
        return true;

      case "mouseup":
        if ((eventData.event as MouseEvent).which === 3) {
          this.mgr.cancel();
        }
        this._keyCodeData = null;
        return false;

      default:
        return super.onReceive?.(eventType, eventData) ?? false;
    }
  }

  public onCleanup(): void {
    this._leftMenuPlugin.hideLeftMenu();
    this._handler.clearSuckedMoldingData();
    this._signalHook.unlistenAll();
    this._updateViewCursor(HSApp.View.CursorEnum.default);
    this._destroyMiniImagePreview();
  }

  public onResume(): void {
    this._updateCursor();
    this._updateHint();
  }

  public complete(): void {
    this.onCleanup();
  }

  public cancel(): void {
    this.onCleanup();
  }

  public isSuckState(): boolean {
    return this._cmdState === StateEnum.Suck;
  }

  public isBrushState(): boolean {
    return this._cmdState === StateEnum.Brush;
  }

  public switchToSuckState(): void {
    this._switchToNextState(StateEnum.Suck);
  }

  public switchToBrushState(): void {
    this._switchToNextState(StateEnum.Brush);
  }

  public getMode(): string {
    return HSApp.App.getApp().activeEnvironmentId;
  }

  private _destroyMiniImagePreview = (): void => {
    if (this.miniImagePreviewCtrl) {
      this.miniImagePreviewCtrl.destroy();
      this.miniImagePreviewCtrl = null;
    }
  };

  private _createMiniImagePreview = (data: { entity: unknown; moldingData: MoldingData }): void => {
    const { entity, moldingData } = data;
    const iconData = this._extractIconData(entity, moldingData);
    
    this._destroyMiniImagePreview();
    this.miniImagePreviewCtrl = new MiniImagePreviewCtrl(iconData);
    this.miniImagePreviewCtrl.init();
  };

  private _extractIconData(entity: unknown, moldingData: MoldingData): IconData | undefined {
    const { entity: moldingEntity } = moldingData;

    if (moldingEntity instanceof HSCore.Model.CustomizedModelMolding) {
      const { profileData } = moldingData;
      const iconImg = profileData?.iconImg;
      const iconSmallURI = profileData?.iconSmallURI;
      const thumbnail = profileData?.thumbnail;

      if (iconImg) return { icon: iconImg };
      if (iconSmallURI) return { icon: iconSmallURI };
      if (thumbnail) return { icon: thumbnail };
    }

    if (moldingEntity instanceof HSCore.Model.NCustomizedModelMolding) {
      const iconSmall = moldingData.iconSmall;
      if (iconSmall) return { icon: iconSmall };
    }

    return undefined;
  }

  private _renderMiniImagePreview = (eventData: EventData): void => {
    if (this.miniImagePreviewCtrl && eventData?.event) {
      const mouseEvent = eventData.event as MouseEvent;
      const position: Position = {
        x: mouseEvent.clientX,
        y: mouseEvent.clientY
      };
      this.miniImagePreviewCtrl.render(position);
    }
  };

  private _updateCursor(): void {
    let cursorStyle: string;

    if (this._cmdState === StateEnum.Brush) {
      cursorStyle = this._cursorEnabled ? this._cursors.brush_cursor : this._cursors.brush_disable_cursor;
    } else {
      cursorStyle = this._cursorEnabled ? this._cursors.suck_cursor : this._cursors.suck_disable_cursor;
    }

    this._updateViewCursor(cursorStyle);
  }

  private _updateViewCursor(cursor: string): void {
    const activeView = this.context.app.getActive3DView();
    if (activeView) {
      activeView.context.cursorStatus.setCurrentStatus(cursor);
    }
  }

  private _updateHint(): void {
    if (this._cmdState === StateEnum.Brush) {
      const shouldShowHint = !this._localStorage.get(SUCK_AGAIN_NOT_SHOW_LIVEHINT) && MoldingBrushCommand._firstTime;
      
      if (shouldShowHint) {
        MoldingBrushCommand._firstTime = false;
        
        LiveHint.show(
          ResourceManager.getString("plugin_moldingbrush_brush_hint_live"),
          undefined,
          () => {
            this._localStorage.set(SUCK_AGAIN_NOT_SHOW_LIVEHINT, true);
            LiveHint.hide();
          },
          {
            append: ResourceManager.getString("plugin_moldingbrush_brush_hint_live_append"),
            canclose: true
          }
        );
      }
    }
  }

  private _makeCanvasFocused(): void {
    const activeView = this.context.app.getActive3DView();
    
    if (document.activeElement !== activeView.context.domElement) {
      activeView.context.domElement.focus();
      this._updateCursor();
    }
  }

  private _initStrategies(): void {
    this._strategies = [
      new HSApp.Strategy.CustomizedModelMoldingStrategy(),
      new HSApp.Strategy.NCustomizedModelMoldingStrategy(),
      new HSApp.Strategy.DefaultMoldingStrategy()
    ];
  }

  private _switchToNextState(state: StateEnum): void {
    if (this._cmdState !== state) {
      this._cmdState = state;
      this._updateCursor();
      this._updateHint();
      this._destroyMiniImagePreview();
      
      this._strategies.forEach((strategy) => {
        strategy.stopPreview?.();
      });
    }
  }

  private _switchToEnableState(enabled: boolean): void {
    if (this._cursorEnabled !== enabled) {
      this._cursorEnabled = enabled;
      this._updateCursor();
      this._updateHint();
    }
  }

  private _onEntityHovered(eventData: EventData): void {
    if (!eventData?.mouseOver || eventData.mouseOver.length <= 0) {
      this._switchToEnableState(false);
      return;
    }

    const hoveredObject = eventData.mouseOver[0];
    
    if (!hoveredObject.viewObject) {
      return;
    }

    let isEnabled: boolean;

    if (this._cmdState === StateEnum.Suck) {
      isEnabled = this._strategies.some((strategy) => strategy.isSuckable(hoveredObject.viewObject));
    } else {
      const suckedData = this._handler.getSuckedMoldingData();
      isEnabled = this._strategies.some((strategy) => strategy.isAppliable(hoveredObject.viewObject, suckedData));
    }

    this._switchToEnableState(isEnabled);
  }

  private _onEntitySelected(eventData: EventData): void {
    if (!eventData?.entity) {
      return;
    }

    if (this._cmdState === StateEnum.Suck) {
      const moldingData = this._suckMoldingData(eventData);
      
      if (moldingData) {
        this._handler.setSuckedMoldingData(moldingData);
        this.signalSuckedMoldingChanged.dispatch({ moldingData });
        this._switchToNextState(StateEnum.Brush);
        this._createMiniImagePreview({ moldingData, entity: eventData.entity });
      }
    } else {
      this._applyMoldingData(eventData);
    }
  }

  private _suckMoldingData(eventData: EventData): MoldingData | false {
    for (const strategy of this._strategies) {
      if (strategy.isSuckable(eventData)) {
        return strategy.suck(eventData);
      }
    }
    return false;
  }

  private _applyMoldingData(eventData: EventData): boolean {
    const suckedMoldingData = this._handler.getSuckedMoldingData();
    
    if (suckedMoldingData === undefined) {
      return false;
    }

    let applicableStrategy: Strategy | undefined;

    for (const strategy of this._strategies) {
      if (strategy.isAppliable(eventData, suckedMoldingData)) {
        applicableStrategy = strategy;
        break;
      }
    }

    if (!applicableStrategy) {
      return false;
    }

    const requestType = HSFPConstants.RequestType.MoldingBrush;
    const strategyClassName = applicableStrategy.ClassName;
    const request = this.context.transManager.createRequest(requestType, [strategyClassName, eventData, suckedMoldingData]);
    
    this.context.transManager.commit(request);
    return true;
  }

  private _onPopulateLeftMenuItems = (event: PopulateEvent): void => {
    const menuData = event.data;

    menuData.customizedItems.push({
      label: ResourceManager.getString("contextmenu_cancel"),
      src: "cancel",
      id: "cancel_molding_brush",
      showHotKey: true,
      onClick: () => {
        this.mgr.complete();
      }
    });

    if (this._cmdState === StateEnum.Brush) {
      menuData.customizedItems.push({
        label: ResourceManager.getString("plugin_moldingbrush_resuck"),
        src: "resuck_icon",
        id: "resuck_molding",
        showHotKey: true,
        onClick: () => {
          this._switchToNextState(StateEnum.Suck);
        }
      });
    }
  };
}

export default MoldingBrushCommand;