import { HSApp } from './HSApp';

export class CmdMoveCurve extends HSApp.ExtraordinarySketch2d.Cmd.CmdMoveCurve {
  protected _createRequest(data: unknown): unknown {
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.SlabEdit.MoveCurve,
      data
    );
  }

  public getDescription(): string {
    return "楼板编辑移动边";
  }

  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.SlabEdit;
  }
}