import { HSApp } from './HSApp';
import { AddGuideLineGizmo } from './AddGuideLineGizmo';

interface Sketch2DBuilder {
  // Define specific properties based on your application
}

interface DisplayLayers {
  temp: unknown;
}

interface CommandContext {
  transManager: TransactionManager;
}

interface TransactionManager {
  createRequest(
    requestType: string,
    args: [Sketch2DBuilder, unknown]
  ): unknown;
}

interface CommandExecutionContext {
  context: CommandContext;
  displayLayers: DisplayLayers;
}

/**
 * Command for adding guide lines in outdoor drawing mode
 */
export class CmdAddGuideLines extends HSApp.ExtraordinarySketch2d.Cmd.CmdAddExGuideLines {
  protected sketch2dBuilder!: Sketch2DBuilder;
  protected context!: CommandContext;

  /**
   * Creates a 2D gizmo for guide line manipulation
   * @param executionContext - The command execution context
   * @returns A new AddGuideLineGizmo instance
   */
  protected _create2DGizmo(executionContext: CommandExecutionContext): AddGuideLineGizmo {
    return new AddGuideLineGizmo(
      executionContext.context,
      executionContext.displayLayers.temp,
      this
    );
  }

  /**
   * Creates a transaction request for adding guide lines
   * @param data - The guide line data
   * @returns The created transaction request
   */
  protected _createRequest(data: unknown): unknown {
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.OutdoorDrawing.AddGuideLine,
      [this.sketch2dBuilder, data]
    );
  }

  /**
   * Gets the description of this command
   * @returns Command description string
   */
  public getDescription(): string {
    return '外部区域绘制-添加辅助线';
  }

  /**
   * Gets the log category for this command
   * @returns The log group type
   */
  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.OutdoorDrawing;
  }
}