import { HSApp } from './HSApp';
import { ISketch2dBuilder } from './types';

interface ITransactionManager {
  createRequest(requestType: string, params: unknown[]): unknown;
}

interface IContext {
  transManager: ITransactionManager;
}

export class CmdAddSplitPoints extends HSApp.ExtraordinarySketch2d.Cmd.CmdAddSplitPoints {
  protected context!: IContext;
  protected sketch2dBuilder!: ISketch2dBuilder;

  /**
   * Creates a request for adding split points to slab editing
   * @param splitPointData - The split point data to be added
   * @returns The created request object
   */
  protected _createRequest(splitPointData: unknown): unknown {
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.SlabEdit.AddSplitPoint,
      [this.sketch2dBuilder, splitPointData]
    );
  }

  /**
   * Returns the description of this command
   * @returns Command description in Chinese
   */
  public getDescription(): string {
    return "楼板编辑添加打断点";
  }

  /**
   * Returns the category/group type for logging purposes
   * @returns The log group type for slab editing
   */
  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.SlabEdit;
  }
}