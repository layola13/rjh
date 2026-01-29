import { DrawCircleGizmo } from './DrawCircleGizmo';
import { HSApp } from './HSApp';

/**
 * Command for drawing circular holes in slab editing mode
 */
export class CmdDrawCircle extends HSApp.ExtraordinarySketch2d.Cmd.CmdDrawExCircle {
    /**
     * Creates a 2D gizmo for drawing circles
     * @param params - Parameters containing context, display layers, and command reference
     * @returns A new DrawCircleGizmo instance
     */
    protected _create2DGizmo(params: {
        context: unknown;
        displayLayers: { temp: unknown };
    }): DrawCircleGizmo {
        return new DrawCircleGizmo(params.context, params.displayLayers.temp, this);
    }

    /**
     * Creates a request for drawing a circle in slab edit mode
     * @param data - The circle data to be drawn
     * @returns A transaction request for drawing the circle
     */
    protected _createRequest(data: unknown): unknown {
        return this.context.transManager.createRequest(
            HSFPConstants.RequestType.SlabEdit.DrawCircle,
            [this.sketch2dBuilder, data]
        );
    }

    /**
     * Gets the description of this command
     * @returns The localized description string
     */
    public getDescription(): string {
        return "楼板编辑添加圆形洞";
    }

    /**
     * Gets the category for logging purposes
     * @returns The log group type for slab editing
     */
    public getCategory(): string {
        return HSFPConstants.LogGroupTypes.SlabEdit;
    }
}