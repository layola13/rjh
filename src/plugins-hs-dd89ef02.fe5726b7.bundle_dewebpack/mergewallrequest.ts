import { HSCore } from './HSCore';

export class MergeWallRequest extends HSCore.Transaction.Common.StateRequest {
    private readonly _srcWall: HSCore.Model.Wall;
    private readonly _dstWall: HSCore.Model.Wall;

    constructor(srcWall: HSCore.Model.Wall, dstWall: HSCore.Model.Wall) {
        super();
        this._srcWall = srcWall;
        this._dstWall = dstWall;

        const layer = HSCore.Util.Layer.getEntityLayer(srcWall);
        HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(layer);
    }

    onCommit(): void {
        const dstContents = Object.values(this._dstWall.contents);
        this._srcWall.merge(this._dstWall);

        const uniqueParent = this._srcWall.getUniqueParent();
        const walls = Object.values(uniqueParent.walls);

        HSCore.Util.TgWall.updateLayerByWalls(walls, uniqueParent, {
            preHoleBuild: () => {
                for (const content of dstContents) {
                    if (content instanceof HSCore.Model.Opening) {
                        content.assignTo(this._srcWall);
                    } else if (content instanceof HSCore.Model.ParametricOpening) {
                        new HSCore.Util.OpeningSnapHelper(content, undefined).snapToWall();
                    }
                }
            }
        });

        HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();
        super.onCommit([]);
    }

    canTransactField(): boolean {
        return true;
    }

    getDescription(): string {
        return "合并墙体操作";
    }

    getCategory(): string {
        return HSFPConstants.LogGroupTypes.WallOperation;
    }
}