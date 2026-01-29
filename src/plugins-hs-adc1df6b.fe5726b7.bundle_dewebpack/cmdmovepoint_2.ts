import { HSApp } from './HSApp';
import { IContext } from './IContext';
import { HSFPConstants } from './HSFPConstants';
import { ResourceManager } from './ResourceManager';

export class CmdMovePoint extends HSApp.ExtraordinarySketch2d.Cmd.CmdMovePoint {
  protected _createRequest(data: unknown): unknown {
    return this.context.transManager.createRequest(
      HSFPConstants.RequestType.RoofsDrawing.MovePoint,
      data
    );
  }

  public getDescription(): string {
    return '屋顶编辑移动点';
  }

  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.RoofsDrawing;
  }

  protected _getToposInvalidTip(): string {
    return ResourceManager.getString('plugin_roofsdrawing_topos_invalid');
  }
}