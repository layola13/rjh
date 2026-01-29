import { HSCore } from './HSCore';
import { HSConstants } from './HSConstants';
import { HSFPConstants } from './HSFPConstants';

interface WallTypeChangeData {
  wallType?: string;
  isLoadBearing?: boolean;
  heightEditable?: boolean;
}

interface Wall {
  wallType: string;
  isLoadBearing: boolean;
  height3d: number;
  height: number;
  getUniqueParent(): Layer | null;
  setFlagOn(flag: HSCore.Model.WallFlagEnum): void;
  setFlagOff(flag: HSCore.Model.WallFlagEnum): void;
}

interface Layer {
  height: number;
  walls: Record<string, Wall>;
}

export class ChangeTGWallTypeRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _wall: Wall;
  private readonly _data: WallTypeChangeData;

  constructor(wall: Wall, data: WallTypeChangeData) {
    super();
    this._wall = wall;
    this._data = data;

    const layer = HSCore.Util.Layer.getEntityLayer(wall);
    HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(layer);
  }

  private _getLayerHeight(): number {
    const parentLayer = this._wall.getUniqueParent();
    return parentLayer ? parentLayer.height : HSConstants.Constants.LAYER_HEIGHT;
  }

  onCommit(): void {
    const wall = this._wall;
    const data = this._data;

    if (data.wallType !== undefined) {
      wall.wallType = data.wallType;
    }

    if (data.isLoadBearing !== undefined) {
      wall.isLoadBearing = data.isLoadBearing;
    }

    if (data.heightEditable !== undefined) {
      const layerHeight = this._getLayerHeight();
      
      if (data.heightEditable) {
        wall.setFlagOn(HSCore.Model.WallFlagEnum.heightEditable);
        wall.isLoadBearing = false;
        
        const heightDifference = Math.abs(
          wall.height3d - HSConstants.Constants.DEFAULT_PARTIAL_WALL_3D_HEIGHT
        );
        if (heightDifference > 1e-6) {
          wall.height3d = HSConstants.Constants.DEFAULT_PARTIAL_WALL_3D_HEIGHT;
        }
      } else {
        wall.setFlagOff(HSCore.Model.WallFlagEnum.heightEditable);
        wall.height3d = layerHeight;
      }
    }

    const parentLayer = this._wall.getUniqueParent();
    if (parentLayer) {
      const walls = Object.values(parentLayer.walls);
      HSCore.Util.TgWall.updateLayerByWalls(walls, parentLayer);
    }

    HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();
    
    super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "修改墙体类型";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}