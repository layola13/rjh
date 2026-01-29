import { DrawFilletGizmo } from './DrawFilletGizmo';
import { HSApp } from './HSApp';

/**
 * Command for drawing fillets in outdoor areas
 */
export class CmdDrawFillet extends HSApp.ExtraordinarySketch2d.Cmd.CmdDrawFillet {
  /**
   * Creates a 2D gizmo for fillet drawing
   * @param options - Configuration options containing context, display layers, and sketch builder
   * @returns A new DrawFilletGizmo instance
   */
  protected _create2DGizmo(options: {
    context: unknown;
    displayLayers: { temp: unknown };
  }): DrawFilletGizmo {
    return new DrawFilletGizmo(
      options.context,
      options.displayLayers.temp,
      this,
      this._sketchBuilder
    );
  }

  /**
   * Creates a transaction request for drawing a fillet
   * @param param1 - First parameter for the fillet operation
   * @param param2 - Second parameter for the fillet operation
   * @returns A transaction request for the draw fillet operation
   */
  protected _createRequest(param1: unknown, param2: unknown): unknown {
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.OutdoorDrawing.DrawFillet,
      [this._sketchBuilder, param1, param2]
    );
  }

  /**
   * Gets the description of this command
   * @returns The command description in Chinese
   */
  public getDescription(): string {
    return "外部区域绘制-倒角";
  }

  /**
   * Gets the category/log group type for this command
   * @returns The outdoor drawing log group type
   */
  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.OutdoorDrawing;
  }
}