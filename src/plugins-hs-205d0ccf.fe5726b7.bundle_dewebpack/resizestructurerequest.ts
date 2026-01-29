import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

interface ContentBase {
  x: number;
  y: number;
  z: number;
  XSize: number;
  YSize: number;
  ZSize: number;
}

interface DraggingGizmo {
  x: number;
  y: number;
}

interface Point2D {
  x: number;
  y: number;
}

interface SnappingOptions {
  snapOffset: number;
  autoFitEnable: boolean;
  ignoreSnapOffset: boolean;
  notZ: boolean;
  fixedZValue: number;
  draggingGizmo: Vector2;
}

interface SnappingResult {
  [key: string]: unknown;
}

class Vector2 {
  constructor(gizmo: DraggingGizmo) {
    // Vector2 initialization
  }

  transform(matrix: Matrix3): void {
    // Transform implementation
  }
}

class Matrix3 {
  static makeRotate(point: Point2D, angle: number): Matrix3 {
    return new Matrix3();
  }
}

interface Structure extends HSCore.Model.Entity {
  x: number;
  y: number;
  z: number;
  XSize: number;
  YSize: number;
  ZSize: number;
  XLength: number;
  YLength: number;
  XScale: number;
  YScale: number;
  rotation: number;
  faceList: Array<{ dirtyGeometry: () => void }>;
  rebuild?: () => void;
  build?: () => void;
}

type SnappingStrategyConstructor = new (
  structure: Structure,
  helper: HSApp.Snapping.Helper,
  callback: (offset: number[]) => void,
  options?: unknown
) => unknown;

const MIN_SIZE = 0.001;

export class ResizeStructureRequest extends HSCore.Transaction.Common.StateRequest {
  structure: Structure;
  signalResizeSnapped: HSCore.Util.Signal<SnappingResult>;
  snappingHelper: HSApp.Snapping.Helper;
  private _draggingGizmo: DraggingGizmo;
  private _contentBase: ContentBase;

  constructor(structure: Structure, draggingGizmo: DraggingGizmo) {
    super();

    this.structure = structure;
    this._draggingGizmo = draggingGizmo;
    this._contentBase = {
      x: structure.x,
      y: structure.y,
      z: structure.z,
      XSize: structure.XSize,
      YSize: structure.YSize,
      ZSize: structure.ZSize
    };

    this.signalResizeSnapped = new HSCore.Util.Signal<SnappingResult>();
    this.snappingHelper = new HSApp.Snapping.Helper(structure);

    const strategies = this._getSnappingStrategies(this.snappingHelper);
    this.snappingHelper.strategies = strategies;

    const entityLayer = HSCore.Util.Layer.getEntityLayer(structure);
    HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(entityLayer);
  }

  onCommit(): void {
    if (this.structure instanceof HSCore.Model.NCustomizedStructure) {
      this.structure.rebuild?.();
    } else if (this.structure instanceof HSCore.Model.Opening) {
      this.structure.build?.();
    }

    HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();
    super.onCommit();
  }

  onReceive(eventType: string, eventData: { offset: number[] }): boolean {
    if (eventType === 'dragmove') {
      this._resizeStructure(eventData.offset);
      this._doSnapping();
      return true;
    }
    return false;
  }

  onUndo(): void {
    super.onUndo();
    this._dirtyStructureFaces();
  }

  onRedo(): void {
    super.onRedo();
    this._dirtyStructureFaces();
  }

  private _doSnapping(): void {
    if (!this.snappingHelper) {
      return;
    }

    const gizmoVector = new Vector2(this._draggingGizmo);
    
    if (Math.abs(this.structure.rotation) > 1e-6) {
      const rotationMatrix = Matrix3.makeRotate(
        { x: 0, y: 0 },
        -this.structure.rotation * Math.PI / 180
      );
      gizmoVector.transform(rotationMatrix);
    }

    const snappingOptions: SnappingOptions = {
      snapOffset: 0.05,
      autoFitEnable: false,
      ignoreSnapOffset: true,
      notZ: true,
      fixedZValue: this.structure.z,
      draggingGizmo: gizmoVector
    };

    const snappingResult = this.snappingHelper.doSnapping(snappingOptions);
    this.signalResizeSnapped.dispatch(snappingResult);
  }

  private _doSnappingCallback(offset: number[]): void {
    const origin: Point2D = { x: 0, y: 0 };
    
    let rotatedPoint = HSCore.Util.Math.rotatePointCW(
      origin,
      { x: offset[0], y: offset[1] },
      -this.structure.rotation
    );

    rotatedPoint.x = this._draggingGizmo.x * (
      this.structure.XLength * this.structure.XScale - 
      this._contentBase.XSize + 
      this._draggingGizmo.x * rotatedPoint.x
    );

    rotatedPoint.y = this._draggingGizmo.y * (
      this.structure.YLength * this.structure.YScale - 
      this._contentBase.YSize + 
      this._draggingGizmo.y * rotatedPoint.y
    );

    rotatedPoint = HSCore.Util.Math.rotatePointCW(
      origin,
      { x: rotatedPoint.x, y: rotatedPoint.y },
      this.structure.rotation
    );

    offset[0] = rotatedPoint.x;
    offset[1] = rotatedPoint.y;

    this._resizeStructure(offset);
  }

  private _resizeStructure(offset: number[]): void {
    const origin: Point2D = { x: 0, y: 0 };
    
    const rotatedOffset = HSCore.Util.Math.rotatePointCW(
      origin,
      { x: offset[0], y: offset[1] },
      -this.structure.rotation
    );

    const newSize: Point2D = { x: 0, y: 0 };
    const deltaX = this._draggingGizmo.x * rotatedOffset.x;
    const deltaY = this._draggingGizmo.y * rotatedOffset.y;

    if (this._draggingGizmo.x === 0) {
      newSize.y = this._contentBase.YSize + deltaY;
      if (newSize.y < MIN_SIZE) {
        newSize.y = MIN_SIZE;
      }
      newSize.x = this.structure.XSize;
    } else if (this._draggingGizmo.y === 0) {
      newSize.x = this._contentBase.XSize + deltaX;
      if (newSize.x < MIN_SIZE) {
        newSize.x = MIN_SIZE;
      }
      newSize.y = this.structure.YSize;
    } else {
      const xRatio = deltaX / this._contentBase.XSize;
      const yRatio = deltaY / this._contentBase.YSize;

      if (xRatio > yRatio) {
        newSize.x = this._contentBase.XSize + deltaX;
        if (newSize.x < MIN_SIZE) {
          newSize.x = MIN_SIZE;
        }
        newSize.y = this._contentBase.YSize + 
          deltaX * (this._contentBase.YSize / this._contentBase.XSize);
      } else {
        newSize.y = this._contentBase.YSize + deltaY;
        if (newSize.y < MIN_SIZE) {
          newSize.y = MIN_SIZE;
        }
        newSize.x = this._contentBase.XSize + 
          deltaY * (this._contentBase.XSize / this._contentBase.YSize);
      }
    }

    const positionOffset: Point2D = {
      x: this._draggingGizmo.x * (newSize.x ? (newSize.x - this._contentBase.XSize) / 2 : 0),
      y: this._draggingGizmo.y * (newSize.y ? (newSize.y - this._contentBase.YSize) / 2 : 0)
    };

    const rotatedPosition = HSCore.Util.Math.rotatePointCW(
      origin,
      positionOffset,
      this.structure.rotation
    );

    this.structure.XScale = newSize.x / this.structure.XLength;
    this.structure.YScale = newSize.y / this.structure.YLength;
    this.structure.x = this._contentBase.x + rotatedPosition.x;
    this.structure.y = this._contentBase.y + rotatedPosition.y;
  }

  private _getSnappingStrategies(helper: HSApp.Snapping.Helper): unknown[] {
    const strategyClasses: SnappingStrategyConstructor[] = [
      HSApp.Snapping.SnapToWall2D
    ];

    return strategyClasses.map((StrategyClass) => {
      const callback = this._doSnappingCallback.bind(this);
      return new StrategyClass(this.structure, helper, callback, undefined);
    });
  }

  canTransactField(): boolean {
    return true;
  }

  private _dirtyStructureFaces(): void {
    this.structure.faceList.forEach((face) => {
      face.dirtyGeometry();
    });
  }
}