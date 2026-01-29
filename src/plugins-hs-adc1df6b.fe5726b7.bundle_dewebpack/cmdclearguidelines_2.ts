import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * Command for clearing guide lines in outdoor drawing mode
 */
export class CmdClearGuideLines extends HSApp.ExtraordinarySketch2d.Cmd.CmdClearExGuideLines {
  /**
   * Creates a request to delete guide lines
   * @param guideLineId - The identifier of the guide line to delete
   * @returns The transaction request for deleting the guide line
   */
  protected _createRequest(guideLineId: unknown): unknown {
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.OutdoorDrawing.DeleteGuideLine,
      [this.sketch2dBuilder, guideLineId]
    );
  }

  /**
   * Gets the description of this command
   * @returns The localized description string
   */
  public getDescription(): string {
    return "外部区域绘制-清空辅助线";
  }

  /**
   * Gets the log category for this command
   * @returns The log group type for outdoor drawing operations
   */
  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.OutdoorDrawing;
  }
}