import { HSCore } from './HSCore';
import { SnapHelper } from './SnapHelper';

interface Point2D {
  x: number;
  y: number;
}

interface Point3D extends Point2D {
  z: number;
}

interface Position {
  x?: number;
  y?: number;
  z?: number;
  ZRotation?: number;
  XRotation?: number;
  YRotation?: number;
}

interface MoveToEvent {
  position: Position;
}

interface DragStartEvent {
  viewType?: string;
  position?: number[];
}

interface DragMoveEvent {
  position?: number[];
  pickedLayer: any;
}

interface MouseMoveEvent {
  position?: number[];
  pickedLayer: any;
}

type RequestEvent = MoveToEvent | DragStartEvent | DragMoveEvent | MouseMoveEvent;

interface SnapResult {
  dx?: number;
  dy?: number;
  center?: Point2D;
  drotation?: number;
}

interface HostChangedPayload {
  oldHost: any;
  newHost: any;
}

interface SnapHelperOptions {
  layer: any;
  snapMaster: any;
}

interface MoveOffset {
  delta: Vector2;
  newMousePos: Vector2;
}

class Vector2 {
  x: number;
  y: number;

  constructor(point: Point2D) {
    this.x = point.x;
    this.y = point.y;
  }
}

export class MoveStructureRequest extends HSCore.Transaction.Common.StateRequest {
  structure: any;
  layer: any;
  snaphelper: SnapHelper;
  basePoint: Point2D;
  mouseBeginPoint: Point2D;
  signalHostChanged: HSCore.Util.Signal<HostChangedPayload>;
  dragged: boolean;
  selectionMgr: any;

  constructor(structure: any, mouseBeginPoint: Point2D) {
    super();

    this.structure = structure;
    this.layer = this.structure.getUniqueParent();
    this.signalHostChanged = new HSCore.Util.Signal<HostChangedPayload>();
    this.dragged = false;
    this.basePoint = {
      x: this.structure.x,
      y: this.structure.y
    };
    this.mouseBeginPoint = mouseBeginPoint;
    this.selectionMgr = HSApp.App.getApp().selectionManager;

    if (!HSApp.Util.Selection.hasOnlySelected(this.structure)) {
      this.selectionMgr.unselectAll();
      this.selectionMgr.select(this.structure);
    }

    const snapHelperOptions: SnapHelperOptions = {
      layer: this.layer,
      snapMaster: this.structure
    };

    this.snaphelper = new SnapHelper(snapHelperOptions);
    HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(this.layer);
  }

  onCommit(): any {
    this.snaphelper.hideAuxiliaries();
    this.structure.rebuild();
    HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();
    super.onCommit([]);
    return this.structure;
  }

  onReceive(eventType: string, eventData: RequestEvent): boolean {
    switch (eventType) {
      case 'moveto':
        this._moveTo((eventData as MoveToEvent).position);
        break;

      case 'dragstart':
        const dragStartData = eventData as DragStartEvent;
        const initialPosition = dragStartData.viewType && dragStartData.viewType === '2d'
          ? dragStartData.position ?? []
          : [
              this.structure.x,
              this.structure.y,
              this.structure.z + HSCore.Util.Content.getAltitude(this.structure)
            ];

        this.mouseBeginPoint = {
          x: initialPosition[0],
          y: initialPosition[1]
        };
        this.dragged = true;
        return true;

      case 'mousemove':
        if (this.dragged) {
          return false;
        }
        break;

      case 'dragmove':
        const dragMoveData = eventData as DragMoveEvent;
        if (!dragMoveData.position) {
          return false;
        }

        const moveOffset = this._calcMoveOffset(dragMoveData);
        const { delta, newMousePos } = moveOffset;

        this.move(delta, newMousePos);
        this._changeCursorStatus();

        const floorContent = HSCore.Util.Content.getFloorContentIn(
          this.structure,
          dragMoveData.pickedLayer
        );

        if (!this.structure.isWallPart()) {
          this._addToHost(floorContent);
        }

        return true;
    }

    return true;
  }

  private _calcMoveOffset(eventData: DragMoveEvent): MoveOffset {
    const currentPosition = new Vector2({
      x: eventData.position![0],
      y: eventData.position![1]
    });

    const delta = new Vector2({
      x: currentPosition.x - this.mouseBeginPoint.x,
      y: currentPosition.y - this.mouseBeginPoint.y
    });

    this.structure.replaceParent(eventData.pickedLayer);

    return {
      delta,
      newMousePos: currentPosition
    };
  }

  move(delta: Vector2, newMousePos: Vector2): void {
    this._updateStructurePosition(delta);

    const snapResult = this.snaphelper?.doSnap();

    if (snapResult) {
      const deltaX = snapResult.dx ?? 0;
      const deltaY = snapResult.dy ?? 0;

      this.structure.x += deltaX;
      this.structure.y += deltaY;

      if (snapResult.center && snapResult.drotation) {
        this.structure.rotateAround(snapResult.center, snapResult.drotation);
        this.basePoint = {
          x: this.structure.x,
          y: this.structure.y
        };
        this.mouseBeginPoint = newMousePos;
      }

      this.structure.dirtyPosition();
    }
  }

  private _updateStructurePosition(delta: Vector2): void {
    const base = this.basePoint;
    this.structure.x = base.x + delta.x;
    this.structure.y = base.y + delta.y;
    this.structure.dirtyPosition();
  }

  private _changeCursorStatus(): void {
    HSApp.App.getApp().getActive2DView().context.cursorStatus.releaseStatus();
  }

  private _addToHost(host: any): void {
    const currentHost = this.structure.getHost();

    if (currentHost !== host) {
      this.structure.assignTo(host);
      this.signalHostChanged.dispatch({
        oldHost: currentHost,
        newHost: host
      });
    }
  }

  private _moveTo(position: Position): void {
    if (!this.structure.parent || !position || !this.structure) {
      return;
    }

    if (position.x !== undefined) {
      this.structure.x = position.x;
    }

    if (position.y !== undefined) {
      this.structure.y = position.y;
    }

    if (position.z !== undefined) {
      this.structure.z = position.z;
    }

    if (position.ZRotation !== undefined) {
      this.structure.rotation = position.ZRotation;
    }

    if (position.XRotation !== undefined) {
      this.structure.XRotation = position.XRotation;
    }

    if (position.YRotation !== undefined) {
      this.structure.YRotation = position.YRotation;
    }
  }

  canTransactField(): boolean {
    return true;
  }

  hideAllSnapAuxilaries(): void {
    this.snaphelper.hideAuxiliaries();
  }
}