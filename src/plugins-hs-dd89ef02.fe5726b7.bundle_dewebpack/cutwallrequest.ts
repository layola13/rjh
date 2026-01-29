import { HSCore } from './path/to/HSCore';
import { HSFPConstants } from './path/to/HSFPConstants';

export class CutWallRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _wall: HSCore.Model.Wall;
  private readonly _position: HSCore.Math.Vector3;

  constructor(wall: HSCore.Model.Wall, position: HSCore.Math.Vector3) {
    super();
    this._wall = wall;
    this._position = position;
  }

  onCommit(): HSCore.Model.Wall | undefined {
    const layer = HSCore.Util.Layer.getEntityLayer(this._wall);
    HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(layer);

    const contentValues = Object.values(this._wall.contents);
    const openings = contentValues.filter(
      (content): content is HSCore.Model.Opening => 
        content instanceof HSCore.Model.Opening
    );
    const parametricOpenings = contentValues.filter(
      (content): content is HSCore.Model.ParametricOpening =>
        content instanceof HSCore.Model.ParametricOpening
    );

    const splitResult = this._wall.splitByPoint(this._position);

    if (splitResult) {
      const layerWalls = Object.values(layer.walls);

      HSCore.Util.TgWall.updateLayerByWalls(layerWalls, layer, {
        preHoleBuild: () => {
          const wallCurve = this._wall.curve;
          
          openings.forEach((opening) => {
            const projectedPoint = wallCurve.getProjectedPtBy(opening);
            if (!wallCurve.containsPoint(projectedPoint)) {
              opening.assignTo(splitResult);
            }
          });

          parametricOpenings.forEach((parametricOpening) => {
            new HSCore.Util.OpeningSnapHelper(parametricOpening, undefined).snapToWall();
          });
        },
        cutWallOption: {
          wallId: this._wall.id
        }
      });

      HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();
      super.onCommit();

      return splitResult;
    }

    return undefined;
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "拆分墙体操作";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}