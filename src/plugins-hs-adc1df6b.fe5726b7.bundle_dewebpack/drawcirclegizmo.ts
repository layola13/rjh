import { Vector2 } from './Vector2';
import { Styles } from './Styles';
import { Util } from './Util';

interface CanvasPoint {
  x: number;
  y: number;
}

interface Canvas {
  modelPointToCanvas(point: Vector2): CanvasPoint;
}

interface PreviewElement {
  attr(style: Record<string, unknown>): void;
  center(x: number, y: number): void;
  radius(r: number): void;
  show(): void;
  hide(): void;
}

interface Sketch2D {
  // Define sketch properties as needed
}

interface Sketch2DBuilder {
  getSketch(): Sketch2D | null;
}

interface Command {
  sketch2dBuilder: Sketch2DBuilder;
}

interface Inference {
  setCornerPoints(points: Vector2[]): void;
}

declare namespace HSCore.Util.Math {
  class Vec2 {
    static distance(p1: CanvasPoint, p2: CanvasPoint): number;
  }
}

declare namespace HSCore.Util {
  class ExtraordinarySketch2d {
    static getReferencePoints(sketch: Sketch2D): Vector2[];
  }
}

declare namespace HSApp.ExtraordinarySketch2d.Gizmo {
  class DrawExCircleGizmo {
    isPreview: boolean;
    path: Vector2[];
    previewElement: PreviewElement;
    canvas: Canvas;
    pos: Vector2;
    cmd: Command;
    inference: Inference;
    
    getPenIndicatorStyle(args: unknown[]): unknown;
    updateInference(args: unknown[]): void;
  }
}

export class DrawCircleGizmo extends HSApp.ExtraordinarySketch2d.Gizmo.DrawExCircleGizmo {
  private _lastPos?: Vector2;
  private _isPosValid?: boolean;

  protected _getNormalTipKey(): string {
    return 'slab_edit_sketch_draw_circle_tip';
  }

  updatePreview(): void {
    if (this.isPreview) {
      if (this.path && this.path.length === 2) {
        const isValid = this._isCurrentPosValid();
        this.previewElement.attr(
          isValid ? Styles.previewPathStyle : Styles.invalidPreviewPathStyle
        );

        const centerPoint = this.canvas.modelPointToCanvas(this.path[0]);
        const edgePoint = this.canvas.modelPointToCanvas(this.path[1]);

        this.previewElement.center(centerPoint.x, centerPoint.y);
        this.previewElement.radius(
          HSCore.Util.Math.Vec2.distance(centerPoint, edgePoint)
        );
        this.previewElement.show();
      }
    } else {
      this.previewElement.hide();
    }
  }

  getPenIndicatorStyle(): unknown {
    return this._isCurrentPosValid()
      ? super.getPenIndicatorStyle([])
      : Styles.intersectIndicatorStyle;
  }

  private _isCurrentPosValid(): boolean {
    if (!this._lastPos || !new Vector2(this.pos).equals(this._lastPos)) {
      this._lastPos = this.pos;
      this._isPosValid = !Util.isPointInSideRootSlab(this.pos);
    }
    return this._isPosValid;
  }

  updateInference(): void {
    super.updateInference([]);

    const sketch = this.cmd.sketch2dBuilder.getSketch();
    if (sketch) {
      const referencePoints = HSCore.Util.ExtraordinarySketch2d.getReferencePoints(sketch);
      const rootSlabPoints = Util.getRootSlabReferencePoints();
      referencePoints.push(...rootSlabPoints);
      this.inference.setCornerPoints(referencePoints);
    }
  }
}