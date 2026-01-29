import { DrawRectangleGizmo } from './DrawRectangleGizmo';
import { HSApp } from './HSApp';

/**
 * Command for drawing rectangles in outdoor areas
 */
export class CmdDrawRectangle extends HSApp.ExtraordinarySketch2d.Cmd.CmdDrawExRectangle {
    /**
     * Creates a 2D gizmo for rectangle drawing
     * @param options - Configuration options containing context, display layers, and other settings
     * @returns A new DrawRectangleGizmo instance
     */
    protected _create2DGizmo(options: {
        context: unknown;
        displayLayers: {
            temp: unknown;
        };
    }): DrawRectangleGizmo {
        return new DrawRectangleGizmo(options.context, options.displayLayers.temp, this);
    }

    /**
     * Creates a drawing request for rectangle creation
     * @param data - Request data parameter
     * @returns A transaction request for drawing rectangle
     */
    protected _createRequest(data: unknown): unknown {
        return this.context.transManager.createRequest(
            HSFPConstants.RequestType.OutdoorDrawing.DrawRectangle,
            [this.sketch2dBuilder, data]
        );
    }

    /**
     * Gets the description of this command
     * @returns Description string for outdoor area rectangle drawing
     */
    public getDescription(): string {
        return "外部区域绘制-添加矩形";
    }

    /**
     * Gets the log category for this command
     * @returns The log group type for outdoor drawing operations
     */
    public getCategory(): string {
        return HSFPConstants.LogGroupTypes.OutdoorDrawing;
    }
}