import { HSApp } from './HSApp';

/**
 * Command for moving curves in roof drawing context
 */
export class CmdMoveCurve extends HSApp.ExtraordinarySketch2d.Cmd.CmdMoveCurve {
  /**
   * Creates a request for moving a curve in the roof drawing
   * @param data - The data needed to create the move curve request
   * @returns The created request object
   */
  protected _createRequest(data: unknown): unknown {
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.RoofsDrawing.MoveCurve,
      data
    );
  }

  /**
   * Gets the localized error message when topology is invalid
   * @returns The localized error message string
   */
  protected _getToposInvalidTip(): string {
    return ResourceManager.getString("plugin_roofsdrawing_topos_invalid");
  }

  /**
   * Gets the human-readable description of this command
   * @returns The command description
   */
  getDescription(): string {
    return "屋顶编辑移动边";
  }

  /**
   * Gets the log category for this command
   * @returns The log group type constant
   */
  getCategory(): string {
    return HSFPConstants.LogGroupTypes.RoofsDrawing;
  }
}