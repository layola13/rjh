import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';
import { ResourceManager } from './ResourceManager';

export class CmdMovePoint extends HSApp.ExtraordinarySketch2d.Cmd.CmdMovePoint {
    protected _createRequest(data: unknown): unknown {
        return this.context.transManager.createRequest(
            HSFPConstants.RequestType.OutdoorDrawing.MovePoint,
            data
        );
    }

    public getDescription(): string {
        return "外部区域绘制-移动点";
    }

    protected _getToposInvalidTip(): string {
        return ResourceManager.getString("plugin_outdoor_drawing_topos_invalid");
    }

    public getCategory(): string {
        return HSFPConstants.LogGroupTypes.OutdoorDrawing;
    }
}