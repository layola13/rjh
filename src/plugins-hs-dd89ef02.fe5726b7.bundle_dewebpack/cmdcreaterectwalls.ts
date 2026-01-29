import { CreateRectWalls } from './gizmos/CreateRectWalls';

interface Point {
  x: number;
  y: number;
}

interface CreateRectWallsOptions {
  // 根据实际需求定义选项
  [key: string]: unknown;
}

interface DirectionObject {
  horizontal: string;
  vertical: string;
}

interface CanvasBoundaryStatus {
  left: boolean;
  right: boolean;
  top: boolean;
  bottom: boolean;
}

interface GizmoCreateRoomData {
  wallWidth: number;
  roomTemplatePoints: Point[];
}

interface ClickEventData {
  event?: MouseEvent;
}

export class CmdCreateRectWalls extends HSApp.Cmd.Command {
  private _walls: unknown;
  private roomTemplatePoints: Point[] = [];
  private option: CreateRectWallsOptions;
  private _direction: string | undefined;
  private _directionObj: DirectionObject = {
    horizontal: "",
    vertical: ""
  };
  private _domElement: HTMLElement | undefined;
  private _catalogNode: HTMLElement | null | undefined;
  private _editor3dContainerNode: HTMLElement | null | undefined;
  private _rightpropertybarNode: HTMLElement | null | undefined;
  private _toolbarcontainerNode: HTMLElement | null | undefined;
  private _signalHook: HSCore.Util.SignalHook;
  private signalRequestCommitted: HSCore.Util.Signal;
  private _fp: unknown;
  private _wallWidth: number | undefined;
  private _request: unknown;
  private gizmo: CreateRectWalls | undefined;

  constructor(option: CreateRectWallsOptions) {
    super();
    this.option = option;
    this._signalHook = new HSCore.Util.SignalHook(this);
    this.signalRequestCommitted = new HSCore.Util.Signal(this);
  }

  createGizmo(): void {
    const view2D = this.context.app.getActive2DView();
    const gizmoManager = view2D.gizmoManager;
    this.gizmo = new CreateRectWalls(view2D.context, view2D.displayLayers.temp, this);
    gizmoManager.addGizmo(this.gizmo);
  }

  destroyGizmo(): void {
    if (this.gizmo) {
      this.context.app.getActive2DView().gizmoManager.removeGizmo(this.gizmo);
      this.gizmo.onCleanup();
      this.gizmo = undefined;
    }
  }

  onExecute(): void {
    const app = this.context.app;
    this._fp = app.floorplan;
    this._wallWidth = (this._fp as any).globalWallWidth;
    
    app.hotkey.disable("backspace");
    app.selectionManager.unselectAll();

    const view2D = app.getActive2DView();
    this._domElement = view2D.domElement;
    this._catalogNode = document.querySelector(".catalog_mainframe");
    this._editor3dContainerNode = document.querySelector(".editor3dContainer");
    this._rightpropertybarNode = document.querySelector(".rightpropertybar");
    this._toolbarcontainerNode = document.querySelector(".toolbarcontainer");

    this.setDirection = this.setDirection.bind(this);
    this.clearDirection = this.clearDirection.bind(this);

    HSApp.View.SVG.Util.addEvents(this._domElement, "mousemove", this.setDirection);
    HSApp.View.SVG.Util.addEvents(this._catalogNode, "mouseenter", this.clearDirection);
    HSApp.View.SVG.Util.addEvents(this._editor3dContainerNode, "mouseenter", this.clearDirection);
    HSApp.View.SVG.Util.addEvents(this._rightpropertybarNode, "mouseenter", this.clearDirection);
    HSApp.View.SVG.Util.addEvents(this._toolbarcontainerNode, "mouseenter", this.clearDirection);
    HSApp.View.SVG.Util.addEvents(document, "mouseleave", this.clearDirection);

    const leftMenuPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.LeftMenu);
    const contextualToolsPlugin = app.pluginManager.getPlugin(HSFPConstants.PluginType.ContextualTools);

    this.createGizmo();

    const gizmo = this.gizmo;

    this._signalHook.listen(app.signalNewAnimationFrame, () => {
      if ((!gizmo || (!gizmo._movingCanvas && gizmo.isPreview)) && !leftMenuPlugin.isLeftMenuShowed()) {
        const boundaryStatus: CanvasBoundaryStatus = HSApp.View.SVG.Util.getCanvasBoundaryStatus();
        
        if ((boundaryStatus.left && this._directionObj.horizontal === "right") || 
            (boundaryStatus.right && this._directionObj.horizontal === "left")) {
          this._directionObj.horizontal = "";
        }
        
        if ((boundaryStatus.top && this._directionObj.vertical === "down") || 
            (boundaryStatus.bottom && this._directionObj.vertical === "up")) {
          this._directionObj.vertical = "";
        }
        
        this._direction = this._directionObj.horizontal || this._directionObj.vertical;
        HSApp.View.SVG.Util.moveCanvas(this._direction);
      }
    }).listen(contextualToolsPlugin.signalCanvasChanging, this.clearDirection);
  }

  canUndoRedo(): boolean {
    return false;
  }

  onReceive(eventType: string, data: GizmoCreateRoomData | ClickEventData | unknown): boolean {
    if (eventType === "gizmo.createroom") {
      const roomData = data as GizmoCreateRoomData;
      this._wallWidth = roomData.wallWidth;
      this.roomTemplatePoints = roomData.roomTemplatePoints;

      const floorplan = this.context.app.floorplan;
      this._request = this.context.transManager.createRequest(
        HSFPConstants.RequestType.CreateRectWalls,
        [floorplan, floorplan.scene.activeLayer, roomData.roomTemplatePoints, this._wallWidth, this.option]
      );
      this.context.transManager.commit(this._request);
      this.signalRequestCommitted.dispatch();
    } else if (eventType === "gizmo.cancel") {
      this.mgr.complete(this);
    } else if (eventType === "click") {
      const clickData = data as ClickEventData;
      if (clickData.event && clickData.event.which === 3) {
        this.onESC();
      }
    } else {
      return super.onReceive?.(eventType, data) ?? false;
    }

    return true;
  }

  onCleanup(data?: unknown): void {
    this._signalHook.dispose();
    this.context.app.hotkey.enable("backspace");

    HSApp.View.SVG.Util.removeEvents(this._domElement, "mousemove", this.setDirection);
    HSApp.View.SVG.Util.removeEvents(this._catalogNode, "mouseenter", this.clearDirection);
    HSApp.View.SVG.Util.removeEvents(this._editor3dContainerNode, "mouseenter", this.clearDirection);
    HSApp.View.SVG.Util.removeEvents(this._rightpropertybarNode, "mouseenter", this.clearDirection);
    HSApp.View.SVG.Util.removeEvents(this._toolbarcontainerNode, "mouseenter", this.clearDirection);
    HSApp.View.SVG.Util.removeEvents(document, "mouseleave", this.clearDirection);

    this.destroyGizmo();
  }

  onESC(): void {
    const gizmo = this.gizmo;
    if (gizmo && gizmo.path.length > 0) {
      gizmo.onESC();
    } else {
      HSApp.App.getApp().cmdManager.cancel();
    }
  }

  setDirection(event: MouseEvent): void {
    this.context.app.getActive2DView();
  }

  clearDirection(event?: Event): void {
    this._directionObj.horizontal = "";
    this._directionObj.vertical = "";
  }

  canSuspend(): boolean {
    return false;
  }

  getCurrentWallWidth(): number {
    let wallWidth = HSApp.App.getApp().floorplan.globalWallWidth;
    const gizmo = this.gizmo;
    if (gizmo) {
      wallWidth = gizmo.currentWallWidth;
    }
    return wallWidth;
  }

  setCurrentWallWidth(width: number): void {
    const gizmo = this.gizmo;
    if (gizmo) {
      gizmo.currentWallWidth = width;
      gizmo.draw();
    }
  }

  isPreview(): boolean {
    const gizmo = this.gizmo;
    return !!gizmo && gizmo.isPreview;
  }

  getDescription(): string {
    return "画房间";
  }

  isInteractive(): boolean {
    return true;
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}