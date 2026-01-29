import { DrawRegularPolygonGizmo } from './DrawRegularPolygonGizmo';
import { HSApp } from './HSApp';

export class CmdDrawRegularPolygon extends HSApp.ExtraordinarySketch2d.Cmd.CmdDrawExRegularPolygon {
    protected _create2DGizmo(e: {
        context: unknown;
        displayLayers: { temp: unknown };
    }): DrawRegularPolygonGizmo {
        return new DrawRegularPolygonGizmo(e.context, e.displayLayers.temp, this);
    }

    protected _createRequest(e: unknown): unknown {
        return this.context.transManager.createRequest(
            HSFPConstants.RequestType.SlabEdit.DrawRegularPolygon,
            [this.sketch2dBuilder, e]
        );
    }

    public getDescription(): string {
        return "楼板编辑添加多边形洞";
    }

    public getCategory(): unknown {
        return HSFPConstants.LogGroupTypes.SlabEdit;
    }
}