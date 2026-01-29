import { HSApp } from './HSApp';
import { AddGuideLineGizmo } from './AddGuideLineGizmo';

interface Sketch2DContext {
  context: any;
  displayLayers: {
    temp: any;
  };
}

interface TransactionManager {
  createRequest(requestType: string, args: any[]): any;
}

interface Context {
  transManager: TransactionManager;
}

/**
 * Command for adding guide lines in roof drawing mode
 */
export class CmdAddGuideLines extends HSApp.ExtraordinarySketch2d.Cmd.CmdAddExGuideLines {
  protected context!: Context;
  protected sketch2dBuilder: any;

  /**
   * Creates a 2D gizmo for guide line manipulation
   * @param params - Sketch 2D context parameters
   * @returns A new AddGuideLineGizmo instance
   */
  protected _create2DGizmo(params: Sketch2DContext): AddGuideLineGizmo {
    return new AddGuideLineGizmo(params.context, params.displayLayers.temp, this);
  }

  /**
   * Creates a transaction request for adding a guide line
   * @param data - Guide line data
   * @returns Transaction request object
   */
  protected _createRequest(data: any): any {
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.RoofsDrawing.AddGuideLine,
      [this.sketch2dBuilder, data]
    );
  }

  /**
   * Gets the command description
   * @returns Command description string
   */
  getDescription(): string {
    return "楼板编辑添加辅助线";
  }

  /**
   * Gets the log category for this command
   * @returns Log group type constant
   */
  getCategory(): string {
    return HSFPConstants.LogGroupTypes.RoofsDrawing;
  }
}