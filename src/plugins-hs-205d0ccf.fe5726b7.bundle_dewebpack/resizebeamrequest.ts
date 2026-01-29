import { Vector2, Matrix3 } from './Vector';
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

interface SnappingOptions {
  snapOffset: number;
  autoFitEnable: boolean;
  ignoreSnapOffset: boolean;
  notZ: boolean;
  fixedZValue: number;
  draggingGizmo: Vector2;
}

interface Beam {
  x: number;
  y: number;
  z: number;
  XSize: number;
  YSize: number;
  ZSize: number;
  XScale: number;
  YScale: number;
  XLength: number;
  YLength: number;
  rotation: number;
  rebuild(): void;
  faceList: Array<{ dirtyGeometry(): void }>;
}

interface SnappingStrategy {
  new (
    beam: Beam,
    helper: HSApp.Snapping.Helper,
    callback: (offset: number[]) => void,
    arg4: undefined
  ): unknown;
}

const MIN_SIZE = 0.001;

export class ResizeBeamRequest extends HSCore.Transaction.Common.StateRequest {
  public beam: Beam;
  public signalResizeSnapped: HSCore.Util.Signal;
  public snappingHelper: HSApp.Snapping.Helper;
  private _draggingGizmo: DraggingGizmo;
  private _contentBase: ContentBase;

  constructor(beam: Beam, draggingGizmo: DraggingGizmo) {
    super();
    
    this.beam = beam;
    this._contentBase = {
      x: beam.x,
      y: beam.y,
      z: beam.z,
      XSize: beam.XSize,
      YSize: beam.YSize,
      ZSize: beam.ZSize
    };
    
    this._draggingGizmo = draggingGizmo;
    this.signalResizeSnapped = new HSCore.Util.Signal();
    this.snappingHelper = new HSApp.Snapping.Helper(beam);
    
    const strategies = this._getSnappingStrategies(this.snappingHelper);
    this.snappingHelper.strategies = strategies;
    
    const layer = HSCore.Util.Layer.getEntityLayer(beam);
    HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(layer);
  }

  public onCommit(): void {
    this.beam.rebuild();
    HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();
    super.onCommit([]);
  }

  public onReceive(event: string, data: { offset: number[] }): boolean {
    if (event === 'dragmove') {
      this._resizeBeam(data.offset);
      this._doSnapping();
      return true;
    }
    return false;
  }

  public onUndo(): void {
    super.onUndo([]);
    this._dirtyStructureFaces();
  }

  public onRedo(): void {
    super.onRedo([]);
    this._dirtyStructureFaces();
  }

  private _doSnapping(): void {
    if (!this.snappingHelper) {
      return;
    }

    const gizmoVector = new Vector2(this._draggingGizmo);
    
    if (Math.abs(this.beam.rotation) > 1e-6) {
      gizmoVector.transform(
        Matrix3.makeRotate(
          { x: 0, y: 0 },
          -this.beam.rotation * Math.PI / 180
        )
      );
    }

    const snappingResult = this.snappingHelper.doSnapping({
      snapOffset: 0.05,
      autoFitEnable: false,
      ignoreSnapOffset: true,
      notZ: true,
      fixedZValue: this.beam.z,
      draggingGizmo: gizmoVector
    });

    this.signalResizeSnapped.dispatch(snappingResult);
  }

  private _doSnappingCallback(offset: number[]): void {
    const origin = { x: 0, y: 0 };
    
    let rotatedOffset = HSCore.Util.Math.rotatePointCW(
      origin,
      { x: offset[0], y: offset[1] },
      -this.beam.rotation
    );

    rotatedOffset.x = this._draggingGizmo.x * (
      this.beam.XLength * this.beam.XScale - this._contentBase.XSize +
      this._draggingGizmo.x * rotatedOffset.x
    );
    
    rotatedOffset.y = this._draggingGizmo.y * (
      this.beam.YLength * this.beam.YScale - this._contentBase.YSize +
      this._draggingGizmo.y * rotatedOffset.y
    );

    rotatedOffset = HSCore.Util.Math.rotatePointCW(
      origin,
      { x: rotatedOffset.x, y: rotatedOffset.y },
      this.beam.rotation
    );

    offset[0] = rotatedOffset.x;
    offset[1] = rotatedOffset.y;
    
    this._resizeBeam(offset);
  }

  private _resizeBeam(offset: number[]): void {
    const rotatedOffset = HSCore.Util.Math.rotatePointCW(
      { x: 0, y: 0 },
      { x: offset[0], y: offset[1] },
      -this.beam.rotation
    );

    const newSize = { x: 0, y: 0 };
    const deltaX = this._draggingGizmo.x * rotatedOffset.x;
    const deltaY = this._draggingGizmo.y * rotatedOffset.y;

    if (this._draggingGizmo.x === 0) {
      newSize.y = this._contentBase.YSize + deltaY;
      if (newSize.y < MIN_SIZE) {
        newSize.y = MIN_SIZE;
      }
      newSize.x = this.beam.XSize;
    } else if (this._draggingGizmo.y === 0) {
      newSize.x = this._contentBase.XSize + deltaX;
      if (newSize.x < MIN_SIZE) {
        newSize.x = MIN_SIZE;
      }
      newSize.y = this.beam.YSize;
    } else if (deltaX / this._contentBase.XSize > deltaY / this._contentBase.YSize) {
      newSize.x = this._contentBase.XSize + deltaX;
      if (newSize.x < MIN_SIZE) {
        newSize.x = MIN_SIZE;
      }
      newSize.y = this._contentBase.YSize + deltaY;
    } else {
      newSize.y = this._contentBase.YSize + deltaY;
      if (newSize.y < MIN_SIZE) {
        newSize.y = MIN_SIZE;
      }
      newSize.x = this._contentBase.XSize + deltaX;
    }

    const positionDelta = {
      x: this._draggingGizmo.x * (newSize.x ? (newSize.x - this._contentBase.XSize) / 2 : 0),
      y: this._draggingGizmo.y * (newSize.y ? (newSize.y - this._contentBase.YSize) / 2 : 0)
    };

    const rotatedPositionDelta = HSCore.Util.Math.rotatePointCW(
      { x: 0, y: 0 },
      positionDelta,
      this.beam.rotation
    );

    this.beam.XScale = newSize.x / this.beam.XLength;
    this.beam.YScale = newSize.y / this.beam.YLength;
    this.beam.x = this._contentBase.x + rotatedPositionDelta.x;
    this.beam.y = this._contentBase.y + rotatedPositionDelta.y;
  }

  private _getSnappingStrategies(helper: HSApp.Snapping.Helper): unknown[] {
    const strategies: SnappingStrategy[] = [HSApp.Snapping.SnapToWall2D];
    
    return strategies.map((StrategyClass) => {
      const callback = this._doSnappingCallback.bind(this);
      return new StrategyClass(this.beam, helper, callback, undefined);
    });
  }

  public canTransactField(): boolean {
    return true;
  }

  private _dirtyStructureFaces(): void {
    this.beam.faceList.forEach((face) => face.dirtyGeometry());
  }
}