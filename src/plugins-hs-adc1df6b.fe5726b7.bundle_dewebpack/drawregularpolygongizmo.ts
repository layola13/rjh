import { Vector2 } from './Vector2';
import { Styles } from './Styles';
import { Util } from './Util';
import { DrawExRegularPolygonGizmo } from './DrawExRegularPolygonGizmo';

export class DrawRegularPolygonGizmo extends DrawExRegularPolygonGizmo {
    private _lastPos?: Vector2;
    private _isPosValid?: boolean;

    protected _getNormalTipKey(): string {
        return "slab_edit_sketch_draw_regular_polygon_tip";
    }

    public updatePreview(): void {
        super.updatePreview();
        
        if (this._isCurrentPosValid()) {
            this.previewElement?.attr(Styles.previewPathStyle);
        } else {
            this.previewElement?.attr(Styles.invalidPreviewPathStyle);
        }
    }

    public getPenIndicatorStyle(): unknown {
        return this._isCurrentPosValid() 
            ? super.getPenIndicatorStyle() 
            : Styles.intersectIndicatorStyle;
    }

    private _isCurrentPosValid(): boolean {
        if (!this._lastPos || !new Vector2(this.pos).equals(this._lastPos)) {
            this._lastPos = this.pos;
            this._isPosValid = !Util.isPointInSideRootSlab(this.pos);
        }
        return this._isPosValid;
    }

    public updateInference(): void {
        super.updateInference();
        
        const sketch = this.cmd.sketch2dBuilder.getSketch();
        if (sketch) {
            const referencePoints = HSCore.Util.ExtraordinarySketch2d.getReferencePoints(sketch);
            referencePoints.push(...Util.getRootSlabReferencePoints());
            this.inference.setCornerPoints(referencePoints);
        }
    }
}