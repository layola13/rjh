import { HSCore } from './path-to-hscore';
import { HSFPConstants } from './path-to-constants';

export class ResizeTgWallsRequest extends HSCore.Transaction.Common.StateRequest {
  private _walls: HSCore.Model.Wall[];
  private _name: string;
  private _value: number;
  private _updatedFields: Set<string>;

  constructor(walls: HSCore.Model.Wall[] = []) {
    const uniqueParents = walls
      .map((wall) => wall.getUniqueParent())
      .filter((parent): parent is NonNullable<typeof parent> => !!parent);

    const dedupedParents = Array.from(new Set(uniqueParents));
    console.assert(
      dedupedParents.length === 1,
      "walls should be on the same layer"
    );

    super();

    this._walls = walls;
    this._name = "";
    this._value = -1;
    this._updatedFields = new Set<string>();

    HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(dedupedParents);
  }

  onCommit(): HSCore.Model.Wall[] {
    const propertyName = this._name;
    const propertyValue = this._value;

    switch (propertyName) {
      case "width":
        this._walls.forEach((wall) => {
          wall.width = propertyValue;
        });
        this._updatedFields.add("width");
        break;

      case "height":
        this._walls.forEach((wall) => {
          wall.height3d = propertyValue;
          if (wall.isLoadBearing && !wall.isFullHeight) {
            wall.isLoadBearing = false;
          }
          if (wall.isFullHeight) {
            wall.setFlagOff(HSCore.Model.WallFlagEnum.heightEditable);
          } else {
            wall.setFlagOn(HSCore.Model.WallFlagEnum.heightEditable);
          }
        });
        this._updatedFields.add("height");
        break;

      default:
        console.assert(false, "unsupported yet!");
    }

    if (this._walls.length > 0) {
      const layer = HSCore.Util.Layer.getEntityLayer(this._walls[0]);
      const allWalls = Object.values(layer.walls);
      HSCore.Util.TgWall.updateLayerByWalls(allWalls, layer);
    }

    HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();

    super.onCommit?.([]);

    return this._walls;
  }

  onReceive(eventName: string, data: { name: string; value: number }): boolean {
    if (eventName === "sliderdragmove") {
      this._name = data.name;
      this._value = data.value;
      return true;
    }
    return false;
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "修改墙体大小";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}