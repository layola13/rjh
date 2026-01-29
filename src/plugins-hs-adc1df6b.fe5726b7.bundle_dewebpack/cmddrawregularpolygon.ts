import { DrawRegularPolygonGizmo } from './DrawRegularPolygonGizmo';
import { HSApp } from './HSApp';

/**
 * Command for drawing regular polygons in outdoor areas
 */
export class CmdDrawRegularPolygon extends HSApp.ExtraordinarySketch2d.Cmd.CmdDrawExRegularPolygon {
    /**
     * Creates a 2D gizmo for drawing regular polygons
     * @param config - Configuration object containing context and display layers
     * @returns A new DrawRegularPolygonGizmo instance
     */
    protected _create2DGizmo(config: {
        context: unknown;
        displayLayers: {
            temp: unknown;
        };
    }): DrawRegularPolygonGizmo {
        return new DrawRegularPolygonGizmo(config.context, config.displayLayers.temp, this);
    }

    /**
     * Creates a request for drawing a regular polygon
     * @param params - Parameters for the drawing request
     * @returns The created transaction request
     */
    protected _createRequest(params: unknown): unknown {
        return this.context.transManager.createRequest(
            HSFPConstants.RequestType.OutdoorDrawing.DrawRegularPolygon,
            [this.sketch2dBuilder, params]
        );
    }

    /**
     * Gets the description of this command
     * @returns Command description in Chinese
     */
    public getDescription(): string {
        return "外部区域绘制-添加多边形区域";
    }

    /**
     * Gets the log category for this command
     * @returns The log group type for outdoor drawing
     */
    public getCategory(): string {
        return HSFPConstants.LogGroupTypes.OutdoorDrawing;
    }
}