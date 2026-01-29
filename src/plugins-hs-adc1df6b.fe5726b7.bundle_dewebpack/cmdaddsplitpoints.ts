import { HSApp } from './HSApp';

export class CmdAddSplitPoints extends HSApp.ExtraordinarySketch2d.Cmd.CmdAddSplitPoints {
  protected _createRequest(splitPoint: unknown): unknown {
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.OutdoorDrawing.AddSplitPoint,
      [this.sketch2dBuilder, splitPoint]
    );
  }

  public getDescription(): string {
    return "外部区域绘制-添加打断点";
  }

  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.OutdoorDrawing;
  }
}