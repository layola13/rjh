import { HSApp } from './HSApp';

export class CmdMoveCurve extends HSApp.ExtraordinarySketch2d.Cmd.CmdMoveCurve {
  protected _createRequest(data: unknown): unknown {
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.OutdoorDrawing.MoveCurve,
      data
    );
  }

  public getDescription(): string {
    return "外部区域绘制-移动边";
  }

  protected _getToposInvalidTip(): string {
    return ResourceManager.getString("plugin_outdoor_drawing_topos_invalid");
  }

  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.OutdoorDrawing;
  }
}