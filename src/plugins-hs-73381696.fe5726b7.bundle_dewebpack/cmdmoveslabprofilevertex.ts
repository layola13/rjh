import { MoveSlabProfileVertex } from './MoveSlabProfileVertex';

interface Point2D {
  x: number;
  y: number;
}

interface Vertex {
  x: number;
  y: number;
  getUniqueParent(): unknown;
}

interface ModelLayer {
  // Define model layer properties as needed
}

interface Slab {
  getBaseLayer(): ModelLayer;
}

interface TransactionRequest {
  receive(action: string, payload: unknown): void;
}

interface TransactionManager {
  createRequest(requestType: string, params: unknown[]): TransactionRequest;
  commit(request: TransactionRequest): void;
}

interface SelectionManager {
  unselectAll(): void;
  select(target: Vertex): void;
}

interface CursorStatus {
  holdingStatus(cursorType: string): void;
  releaseStatus(): void;
}

interface DisplayLayers {
  temp: unknown;
}

interface View2DContext {
  cursorStatus: CursorStatus;
}

interface GizmoManager {
  addGizmo(gizmo: MoveSlabProfileVertex): void;
  removeGizmo(gizmo: MoveSlabProfileVertex): void;
}

interface View2D {
  context: View2DContext;
  gizmoManager: GizmoManager;
  displayLayers: DisplayLayers;
}

interface App {
  selectionManager: SelectionManager;
  getActive2DView(): View2D;
}

interface CommandContext {
  app: App;
  transManager: TransactionManager;
}

interface CommandManager {
  cancel(): void;
  complete(): void;
}

interface MouseEvent {
  clientX: number;
  clientY: number;
}

interface DragMovePayload {
  event: MouseEvent;
}

interface MouseMovePayload {
  offset: Point2D;
}

type EventPayload = MouseMovePayload | DragMovePayload | unknown;

export class CmdMoveSlabProfileVertex extends HSApp.Cmd.Command {
  private readonly vertex: Vertex;
  private readonly moveBeginPosition: Point2D;
  private gizmo?: MoveSlabProfileVertex;
  private readonly slab: Slab;
  private readonly modelLayer: ModelLayer;
  private _request?: TransactionRequest;
  protected readonly mgr!: CommandManager;
  protected readonly context!: CommandContext;

  constructor(vertex: Vertex) {
    super();
    this.vertex = vertex;
    this.moveBeginPosition = {
      x: this.vertex.x,
      y: this.vertex.y
    };
    this.gizmo = undefined;
    this.slab = HSCore.Util.Slab.isSlabProfileVertex(vertex);
    this.modelLayer = this.slab.getBaseLayer();
  }

  onExecute(): void {
    const app = this.context.app;
    this._request = this.context.transManager.createRequest(
      HSFPConstants.RequestType.MoveSlabProfileVertex,
      [this.vertex, this.modelLayer]
    );
    const selectionManager = app.selectionManager;
    if (HSApp.Util.Selection.hasOnlySelected(this.vertex)) {
      selectionManager.unselectAll();
    }
    this._createGizmo();
    this._setCursor();
  }

  onCleanup(): void {
    if (this.vertex?.getUniqueParent()) {
      this.context.app.selectionManager.select(this.vertex);
    }
    this._releaseCursor();
    this._destroyGizmo();
  }

  onReceive(eventType: string, payload: EventPayload): boolean | void {
    switch (eventType) {
      case "gizmo.mousedown":
      case "move":
        return;

      case "gizmo.mousemove":
        this._request?.receive("move", {
          offset: (payload as MouseMovePayload).offset
        });
        return true;

      case "dragmove":
        if (this.gizmo) {
          const dragPayload = payload as DragMovePayload;
          this.gizmo.onMouseMove(
            dragPayload.event,
            dragPayload.event.clientX,
            dragPayload.event.clientY
          );
        }
        return true;

      case "gizmo.mouseup":
      case "dragend":
        this._onDragEnd();
        return true;

      default:
        log("move profile vertex command: " + eventType);
        return super.onReceive?.(eventType, payload);
    }
  }

  private _onDragEnd(): void {
    if (HSCore.Util.Math.isSamePoint(this.vertex, this.moveBeginPosition)) {
      this._onCancel();
    } else {
      this._onComplete();
    }
  }

  private _onCancel(): void {
    this.mgr.cancel();
    this._request = undefined;
  }

  private _onComplete(): void {
    this.mgr.complete();
    if (this._request) {
      this.context.transManager.commit(this._request);
    }
    this._request = undefined;
  }

  private _setCursor(): void {
    const cursorStatus = this.context.app.getActive2DView().context.cursorStatus;
    const cursorType = HSApp.View.CursorEnum.move;
    cursorStatus.holdingStatus(cursorType);
  }

  private _releaseCursor(): void {
    this.context.app.getActive2DView().context.cursorStatus.releaseStatus();
  }

  private _createGizmo(): void {
    const view2D = this.context.app.getActive2DView();
    const gizmoManager = view2D.gizmoManager;
    this.gizmo = new MoveSlabProfileVertex(
      view2D.context,
      view2D.displayLayers.temp,
      this
    );
    gizmoManager.addGizmo(this.gizmo);
  }

  private _destroyGizmo(): void {
    if (this.gizmo) {
      this.context.app.getActive2DView().gizmoManager.removeGizmo(this.gizmo);
      this.gizmo.onCleanup();
      this.gizmo = undefined;
    }
  }

  getDescription(): string {
    return "移动楼板端点";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.SlabOperation;
  }

  getCurrentParams(): {
    activeSection: string;
    clicksRatio: { id: string; name: string };
  } {
    return {
      activeSection: HSFPConstants.LogGroupTypes.SlabOperation,
      clicksRatio: {
        id: "moveSlabProfileVertex",
        name: "移动楼板端点"
      }
    };
  }
}