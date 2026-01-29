import { HSCore } from './HSCore';
import { CreateFreeformWall } from './CreateFreeformWall';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

export enum ModeEnum {
  CENTER = "centerMode",
  EDGE = "edgeMode"
}

interface DirectionObj {
  horizontal: string;
  vertical: string;
}

interface WallPathData {
  wallPath: any[];
  firstWall: any[];
  lastWall: any[];
}

interface TransactionSession {
  commit(options: { mergeRequest: boolean }): void;
}

interface TransactionRequest {
  // Define based on actual transaction request structure
}

interface GizmoManager {
  addGizmo(gizmo: any): void;
  removeGizmo(gizmo: any): void;
  getEntityGizmosById(id: string): any[];
}

interface View2D {
  context: any;
  displayLayers: {
    temp: any;
  };
  gizmoManager: GizmoManager;
  domElement: HTMLElement;
}

interface AppContext {
  app: any;
  transManager: {
    startSession(): TransactionSession;
    createRequest(type: string, data: any[]): TransactionRequest;
    commit(request: TransactionRequest): void;
  };
}

export class CmdCreateFreeformNGWall extends HSApp.Cmd.Command {
  public mode: ModeEnum;
  public gizmo?: CreateFreeformWall;
  
  private _direction?: string;
  private _directionObj: DirectionObj;
  private _signalHook: HSCore.Util.SignalHook;
  private _session?: TransactionSession;
  private _request?: TransactionRequest;
  private _domElement?: HTMLElement;
  private _catalogNode?: Element | null;
  private _editor3dContainerNode?: Element | null;
  private _rightpropertybarNode?: Element | null;
  private _toolbarcontainerNode?: Element | null;

  constructor(mode: ModeEnum) {
    super();
    this.mode = mode;
    this._direction = undefined;
    this._directionObj = {
      horizontal: "",
      vertical: ""
    };
    this._signalHook = new HSCore.Util.SignalHook(this);
  }

  /**
   * Creates and initializes the gizmo for freeform wall creation
   */
  public createGizmo(): void {
    if (this.showGizmo) {
      const view2D = (this.context as AppContext).app.getActive2DView() as View2D;
      const gizmoManager = view2D.gizmoManager;
      this.gizmo = new CreateFreeformWall(view2D.context, view2D.displayLayers.temp, this);
      gizmoManager.addGizmo(this.gizmo);
    }
  }

  /**
   * Destroys the gizmo and cleans up resources
   */
  public destroyGizmo(): void {
    if (this.gizmo) {
      const view2D = (this.context as AppContext).app.getActive2DView() as View2D;
      view2D.gizmoManager.removeGizmo(this.gizmo);
      this.gizmo.onCleanup();
      this.gizmo = undefined;
    }
  }

  /**
   * Marks wall length dimensions as dirty for walls within the same loop
   */
  public dirtyWallLengthDimensionInsideSameLoop(entity: any, targetWall: any): void {
    const gizmoManager = HSApp.App.getApp().activeView.gizmoManager;
    const loops = new Set<any>();

    entity.edges.forEach((edge: any) => {
      if (edge.wall === targetWall) {
        if (edge.halfEdge1.loop.area > 0) {
          loops.add(edge.halfEdge1.loop);
        }
        if (edge.halfEdge2.loop.area > 0) {
          loops.add(edge.halfEdge2.loop);
        }
      }
    });

    loops.forEach((loop: any) => {
      loop.boundEdgeIds.forEach((edgeId: string) => {
        const entityGizmos = gizmoManager.getEntityGizmosById(edgeId);
        const dimensionGizmo = entityGizmos.find((gizmo: any) => 
          gizmo.type === "hsw.view.svg.gizmo.WallLengthDimension"
        );
        if (dimensionGizmo) {
          dimensionGizmo.dirty = true;
        }
      });
    });
  }

  /**
   * Executes the command and sets up event listeners
   */
  public onExecute(): void {
    const context = this.context as AppContext;
    const transManager = context.transManager;
    this._session = transManager.startSession();

    const app = context.app;
    app.hotkey.disable("backspace");
    app.selectionManager.unselectAll();
    this.createGizmo();

    const view2D = app.getActive2DView() as View2D;
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

    app.pluginManager.getPlugin(HSFPConstants.PluginType.LeftMenu);
    const contextualTools = app.pluginManager.getPlugin(HSFPConstants.PluginType.ContextualTools);
    const gizmo = this.gizmo;

    this._signalHook
      .listen(app.signalNewAnimationFrame, () => {
        if (!gizmo || (!gizmo._movingCanvas && gizmo.isPreview)) {
          const boundaryStatus = HSApp.View.SVG.Util.getCanvasBoundaryStatus();

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
      })
      .listen(contextualTools.signalCanvasChanging, this.clearDirection);
  }

  /**
   * Checks if the command is in center mode
   */
  public isCenterMode(): boolean {
    return this.mode === ModeEnum.CENTER;
  }

  /**
   * Sets the direction based on mouse movement
   */
  public setDirection(event: MouseEvent): void {
    (this.context as AppContext).app.getActive2DView();
  }

  /**
   * Clears the current direction
   */
  public clearDirection(event?: Event): void {
    this._directionObj.horizontal = "";
    this._directionObj.vertical = "";
  }

  /**
   * Cleanup handler when command finishes
   */
  public onCleanup(event?: any): void {
    this._session?.commit({ mergeRequest: false });
    this._session = undefined;
    this.destroyGizmo();
    (this.context as AppContext).app.hotkey.enable("backspace");
    this._signalHook.dispose();

    HSApp.View.SVG.Util.removeEvents(this._domElement, "mousemove", this.setDirection);
    HSApp.View.SVG.Util.removeEvents(this._catalogNode, "mouseenter", this.clearDirection);
    HSApp.View.SVG.Util.removeEvents(this._editor3dContainerNode, "mouseenter", this.clearDirection);
    HSApp.View.SVG.Util.removeEvents(this._rightpropertybarNode, "mouseenter", this.clearDirection);
    HSApp.View.SVG.Util.removeEvents(this._toolbarcontainerNode, "mouseenter", this.clearDirection);
    HSApp.View.SVG.Util.removeEvents(document, "mouseleave", this.clearDirection);
  }

  /**
   * Handles ESC key press
   */
  public onESC(): void {
    if (this.gizmo && this.gizmo.path.length > 0) {
      this.gizmo.onESC();
    } else {
      HSApp.App.getApp().cmdManager.cancel();
    }
  }

  /**
   * Receives and processes messages from the gizmo
   */
  public onReceive(messageType: string, data: any): boolean {
    if (messageType === "gizmo.createwall") {
      const wallPath = data.wallPath;
      
      if (!wallPath || wallPath.length < 2) {
        this.mgr.cancel();
      } else {
        const createWall = (): void => {
          const context = this.context as AppContext;
          const floorplan = context.app.floorplan;
          const requestData = [floorplan, floorplan.scene.activeLayer, [data]];
          
          this._request = context.transManager.createRequest(
            HSFPConstants.RequestType.CreateFreeformNGWall,
            requestData
          );
          context.transManager.commit(this._request);
          
          if (this.gizmo) {
            this.gizmo.reset();
          }
        };

        const mixPaintUtil = HSApp.PaintPluginHelper?.Util?.MixPaintUtil;
        const affectedWalls = [...(data.firstWall ?? []), ...(data.lastWall ?? [])];
        
        if (mixPaintUtil && 
            !mixPaintUtil.disconnectFaceGroupWithPrompt(affectedWalls, undefined, createWall.bind(this))) {
          createWall();
        } else if (!mixPaintUtil) {
          createWall();
        }
      }
      return true;
    }

    if (messageType === "click" && data.event && data.event.which === 3) {
      this.onESC();
    }

    return super.onReceive?.(messageType, data) ?? false;
  }

  /**
   * Indicates whether this command is interactive
   */
  public isInteractive(): boolean {
    return true;
  }

  /**
   * Returns a description of the command
   */
  public getDescription(): string {
    const modeText = this.mode === ModeEnum.CENTER ? "中线" : "内线";
    return `${modeText}画墙`;
  }

  /**
   * Returns the command category for logging
   */
  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}