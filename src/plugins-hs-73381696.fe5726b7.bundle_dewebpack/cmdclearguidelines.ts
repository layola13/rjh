import { HSApp } from './HSApp';
import HSFPConstants from './HSFPConstants';

export class CmdClearGuideLines extends HSApp.ExtraordinarySketch2d.Cmd.CmdClearExGuideLines {
  protected _createRequest(guideLine: unknown): unknown {
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.SlabEdit.DeleteGuideLine,
      [this.sketch2dBuilder, guideLine]
    );
  }

  public getDescription(): string {
    return "楼板编辑清空辅助线";
  }

  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.SlabEdit;
  }
}