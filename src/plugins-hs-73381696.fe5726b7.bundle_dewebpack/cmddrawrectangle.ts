import { DrawRectangleGizmo } from './DrawRectangleGizmo';
import { HSApp } from './HSApp';

/**
 * Command for drawing rectangle holes in slab editing mode
 */
export class CmdDrawRectangle extends HSApp.ExtraordinarySketch2d.Cmd.CmdDrawExRectangle {
  /**
   * Creates a 2D gizmo for rectangle drawing
   * @param options - Configuration options containing context, display layers, and command reference
   * @returns A new DrawRectangleGizmo instance
   */
  protected _create2DGizmo(options: {
    context: unknown;
    displayLayers: { temp: unknown };
  }): DrawRectangleGizmo {
    return new DrawRectangleGizmo(options.context, options.displayLayers.temp, this);
  }

  /**
   * Creates a transaction request for drawing a rectangle
   * @param data - The rectangle data to be processed
   * @returns A transaction request for slab rectangle drawing
   */
  protected _createRequest(data: unknown): unknown {
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.SlabEdit.DrawRectangle,
      [this.sketch2dBuilder, data]
    );
  }

  /**
   * Gets the description of this command
   * @returns Command description in Chinese
   */
  getDescription(): string {
    return '楼板编辑添加矩形洞';
  }

  /**
   * Gets the category/group type for logging purposes
   * @returns The log group type for slab editing
   */
  getCategory(): string {
    return HSFPConstants.LogGroupTypes.SlabEdit;
  }
}