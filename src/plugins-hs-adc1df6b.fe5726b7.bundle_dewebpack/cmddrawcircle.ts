import { DrawCircleGizmo } from './DrawCircleGizmo';
import { HSApp } from './HSApp';

/**
 * Command for drawing circles in outdoor areas
 */
export class CmdDrawCircle extends HSApp.ExtraordinarySketch2d.Cmd.CmdDrawExCircle {
  /**
   * Creates a 2D gizmo for circle drawing visualization
   * @param options - Configuration options for gizmo creation
   * @returns A new DrawCircleGizmo instance
   */
  protected _create2DGizmo(options: {
    context: unknown;
    displayLayers: {
      temp: unknown;
    };
  }): DrawCircleGizmo {
    return new DrawCircleGizmo(options.context, options.displayLayers.temp, this);
  }

  /**
   * Creates a transaction request for drawing a circle
   * @param data - Request data payload
   * @returns Transaction request object
   */
  protected _createRequest(data: unknown): unknown {
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.OutdoorDrawing.DrawCircle,
      [this.sketch2dBuilder, data]
    );
  }

  /**
   * Gets the human-readable description of this command
   * @returns Command description string
   */
  public getDescription(): string {
    return '外部区域绘制-添加圆形洞';
  }

  /**
   * Gets the log category for this command
   * @returns Log group type identifier
   */
  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.OutdoorDrawing;
  }
}