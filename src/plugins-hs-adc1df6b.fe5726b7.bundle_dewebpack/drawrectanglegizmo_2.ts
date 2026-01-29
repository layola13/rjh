import { Vector2 } from './Vector2';
import { Util } from './Util';
import { Styles } from './Styles';
import { HSApp } from './HSApp';
import { HSCore } from './HSCore';

interface Position {
  x: number;
  y: number;
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

interface PreviewElement {
  attr(style: Record<string, unknown>): void;
}

interface Inference {
  setCornerPoints(points: Position[]): void;
}

export class DrawRectangleGizmo extends HSApp.ExtraordinarySketch2d.Gizmo.DrawExRectangleGizmo {
  private _lastPos?: Vector2;
  private _isPosValid?: boolean;

  protected _getNormalTipKey(): string {
    return 'slab_edit_sketch_draw_rectangle_tip';
  }

  public updatePreview(): void {
    super.updatePreview();

    if (this._isCurrentPosValid()) {
      this.previewElement?.attr(Styles.previewPathStyle);
    } else {
      this.previewElement?.attr(Styles.invalidPreviewPathStyle);
    }
  }

  public getPenIndicatorStyle(): Record<string, unknown> {
    return this._isCurrentPosValid()
      ? super.getPenIndicatorStyle()
      : Styles.intersectIndicatorStyle;
  }

  private _isCurrentPosValid(): boolean {
    if (!this._lastPos || !new Vector2(this.pos).equals(this._lastPos)) {
      this._lastPos = this.pos;
      this._isPosValid = !Util.isPointInSideRootSlab(this.pos);
    }

    return this._isPosValid ?? false;
  }

  public updateInference(): void {
    super.updateInference();

    const sketch = this.cmd.sketch2dBuilder.getSketch();
    if (sketch) {
      const referencePoints = HSCore.Util.ExtraordinarySketch2d.getReferencePoints(sketch);
      const rootSlabPoints = Util.getRootSlabReferencePoints();
      referencePoints.push(...rootSlabPoints);
      this.inference.setCornerPoints(referencePoints);
    }
  }

  protected declare pos: Vector2;
  protected declare previewElement?: PreviewElement;
  protected declare cmd: Command;
  protected declare inference: Inference;
}