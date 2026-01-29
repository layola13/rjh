import { Command } from 'HSApp/Cmd/Command';
import { MoveSlabProfileEdge as MoveSlabProfileEdgeGizmo } from './gizmos/MoveSlabProfileEdge';

interface Position {
  x: number;
  y: number;
}

interface Edge {
  from: Position;
  to: Position;
  middle: Position;
  edge?: any;
  parents?: Record<string, any>;
}

interface ExecuteOptions {
  position?: Position | [number, number];
}

interface ConstraintInfo {
  constraintLine: Position[];
  isNeedInsertNewEdge: boolean;
}

interface TransactionRequest {
  receive(event: string, data: any): void;
}

interface TransactionManager {
  createRequest(type: string, params: any[]): TransactionRequest;
  abort(request: TransactionRequest): void;
  commit(request: TransactionRequest): void;
}

interface CursorStatus {
  calEdgeCursorStatus(entity: Edge): any;
  holdingStatus(status: any): void;
  releaseStatus(): void;
}

interface View2DContext {
  cursorStatus: CursorStatus;
}

interface DisplayLayers {
  temp: any;
}

interface GizmoManager {
  addGizmo(gizmo: MoveSlabProfileEdgeGizmo): void;
  removeGizmo(gizmo: MoveSlabProfileEdgeGizmo): void;
}

interface View2D {
  context: View2DContext;
  gizmoManager: GizmoManager;
  displayLayers: DisplayLayers;
}

interface App {
  getActive2DView(): View2D;
}

interface Context {
  transManager: TransactionManager;
  app: App;
}

interface CommandManager {
  cancel(): void;
  complete(): void;
}

interface MouseEventData {
  offset?: Position;
  event?: MouseEvent;
  position?: Position;
}

export class CmdMoveSlabProfileEdge extends Command {
  private entity: Edge;
  private slab: any;
  private modelLayer: any;
  private _request?: TransactionRequest;
  private moveBeginPosition?: Position;
  private dataFrom?: Position;
  private dataTo?: Position;
  private _fromPointConstraintInfo?: ConstraintInfo;
  private _toPointConstraintInfo?: ConstraintInfo;
  private gizmo?: MoveSlabProfileEdgeGizmo;
  protected context!: Context;
  protected mgr!: CommandManager;

  constructor(entity: Edge) {
    super();
    this.entity = entity;
    this.slab = HSCore.Util.Slab.isSlabProfileCoEdge(this.entity);
    this.modelLayer = HSCore.Util.Layer.getEntityLayer(this.slab);
  }

  onExecute(options?: ExecuteOptions): void {
    if (!this.entity || !this.slab) {
      return;
    }

    const transManager = this.context.transManager;
    this._request = transManager.createRequest(
      HSFPConstants.RequestType.MoveSlabProfileEdge,
      [this.entity, this.modelLayer]
    );

    if (options?.position) {
      this.moveBeginPosition = {
        x: Array.isArray(options.position) ? options.position[0] : options.position.x,
        y: Array.isArray(options.position) ? options.position[1] : options.position.y
      };
    } else {
      this.moveBeginPosition = this.entity.middle;
    }

    this.dataFrom = {
      x: this.entity.from.x,
      y: this.entity.from.y
    };

    this.dataTo = {
      x: this.entity.to.x,
      y: this.entity.to.y
    };

    this._computeConstraintDirection();
    this.createGizmo();
    this.setCursor();
  }

  onCleanup(): void {
    this.releaseCursor();
    this.destroyGizmo();
  }

  private _onCancel(): void {
    if (this._request) {
      this.context.transManager.abort(this._request);
      this._request = undefined;
    }
    this.mgr.cancel();
  }

  private _onComplete(): void {
    if (this._request) {
      this.context.transManager.commit(this._request);
      this._request = undefined;
    }
    this.mgr.complete();
  }

  onDragEnd(position?: Position): void {
    if (this.moveBeginPosition == null || position == null) {
      return;
    }

    if (HSCore.Util.Math.isSamePoint(this.moveBeginPosition, position)) {
      this._onCancel();
    } else {
      this._onComplete();
    }
  }

  onReceive(event: string, data: MouseEventData): boolean | void {
    switch (event) {
      case 'gizmo.mousedown':
        return;

      case 'gizmo.mousemove':
      case 'move':
        this._request?.receive('move', { offset: data.offset });
        return true;

      case 'dragmove':
        if (this.gizmo && data.event) {
          this.gizmo.onMouseMove(data.event, data.event.clientX, data.event.clientY);
        }
        return true;

      case 'gizmo.mouseup':
      case 'dragend':
        this.onDragEnd(data.position);
        return true;

      default:
        console.log('move profile edge command: ' + event);
        return super.onReceive?.(event, data);
    }
  }

  setCursor(): void {
    const view = this.context.app.getActive2DView();
    const cursorStatus = view.context.cursorStatus;
    const status = cursorStatus.calEdgeCursorStatus(this.entity);
    cursorStatus.holdingStatus(status);
  }

  releaseCursor(): void {
    this.context.app.getActive2DView().context.cursorStatus.releaseStatus();
  }

  createGizmo(): void {
    const view = this.context.app.getActive2DView();
    const gizmoManager = view.gizmoManager;
    this.gizmo = new MoveSlabProfileEdgeGizmo(view.context, view.displayLayers.temp, this);
    gizmoManager.addGizmo(this.gizmo);
  }

  destroyGizmo(): void {
    const gizmoManager = this.context.app.getActive2DView().gizmoManager;
    if (this.gizmo) {
      gizmoManager.removeGizmo(this.gizmo);
      this.gizmo.onCleanup();
      this.gizmo = undefined;
    }
  }

  canUndoRedo(): boolean {
    return false;
  }

  private _getConstraintInfo(point: Position & { parents?: Record<string, any> }): ConstraintInfo {
    const parentEdges: any[] = [];
    
    if (point.parents) {
      for (const key in point.parents) {
        const parent = point.parents[key];
        if (parent !== this.entity.edge) {
          parentEdges.push(parent);
        }
      }
    }

    let constraintLine: Position[];
    let isNeedInsertNewEdge = false;
    let direction: HSCore.Util.Math.Vec2;

    if (parentEdges.length === 2) {
      if (HSCore.Util.Math.isParallel(
        parentEdges[0].from,
        parentEdges[0].to,
        parentEdges[1].from,
        parentEdges[1].to
      )) {
        constraintLine = [
          { x: parentEdges[0].from.x, y: parentEdges[0].from.y },
          { x: parentEdges[0].to.x, y: parentEdges[0].to.y }
        ];
        isNeedInsertNewEdge = true;
      } else {
        direction = new HSCore.Util.Math.Vec2(
          this.entity.from.x - this.entity.to.x,
          this.entity.from.y - this.entity.to.y
        ).rotate(HSCore.Util.Math.toRadians(90));
        constraintLine = [
          { x: point.x, y: point.y },
          { x: direction.x + point.x, y: direction.y + point.y }
        ];
        isNeedInsertNewEdge = true;
      }
    } else if (parentEdges.length === 1) {
      const angle = HSCore.Util.Math.lineLineAngle(
        parentEdges[0].from,
        parentEdges[0].to,
        this.entity.from,
        this.entity.to
      );
      
      if (angle < 20) {
        direction = new HSCore.Util.Math.Vec2(
          this.entity.from.x - this.entity.to.x,
          this.entity.from.y - this.entity.to.y
        ).rotate(HSCore.Util.Math.toRadians(90));
        constraintLine = [
          { x: point.x, y: point.y },
          { x: direction.x + point.x, y: direction.y + point.y }
        ];
        isNeedInsertNewEdge = true;
      } else {
        constraintLine = [
          { x: parentEdges[0].from.x, y: parentEdges[0].from.y },
          { x: parentEdges[0].to.x, y: parentEdges[0].to.y }
        ];
      }
    } else {
      if (parentEdges.length > 2) {
        isNeedInsertNewEdge = true;
      }
      direction = new HSCore.Util.Math.Vec2(
        this.entity.from.x - this.entity.to.x,
        this.entity.from.y - this.entity.to.y
      ).rotate(HSCore.Util.Math.toRadians(90));
      constraintLine = [
        { x: point.x, y: point.y },
        { x: direction.x + point.x, y: direction.y + point.y }
      ];
    }

    return {
      constraintLine,
      isNeedInsertNewEdge
    };
  }

  private _computeConstraintDirection(): void {
    this._fromPointConstraintInfo = this._getConstraintInfo(this.entity.from);
    this._toPointConstraintInfo = this._getConstraintInfo(this.entity.to);
  }

  getDescription(): string {
    return '移动楼板边';
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
        id: 'moveSlabProfileEdge',
        name: '移动楼板边'
      }
    };
  }
}