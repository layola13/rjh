import { HSApp } from './HSApp';
import { AddGuideLineGizmo } from './AddGuideLineGizmo';

/**
 * Command for adding guide lines in slab editing mode
 */
export class CmdAddGuideLines extends HSApp.ExtraordinarySketch2d.Cmd.CmdAddExGuideLines {
  /**
   * Creates a 2D gizmo for adding guide lines
   * @param options - Options containing context and display layers
   * @returns A new AddGuideLineGizmo instance
   */
  protected _create2DGizmo(options: {
    context: unknown;
    displayLayers: { temp: unknown };
  }): AddGuideLineGizmo {
    return new AddGuideLineGizmo(options.context, options.displayLayers.temp, this);
  }

  /**
   * Creates a request for adding a guide line
   * @param data - Data for the guide line request
   * @returns A transaction request
   */
  protected _createRequest(data: unknown): unknown {
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.SlabEdit.AddGuideLine,
      [this.sketch2dBuilder, data]
    );
  }

  /**
   * Gets the description of this command
   * @returns Command description in Chinese
   */
  public getDescription(): string {
    return '楼板编辑添加辅助线';
  }

  /**
   * Gets the log category for this command
   * @returns The log group type for slab editing
   */
  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.SlabEdit;
  }
}