import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

interface Wall extends HSCore.Model.IEntity {
  isFlagOn(flag: HSCore.Model.WallFlagEnum): boolean;
  setFlagOff(flag: HSCore.Model.WallFlagEnum): void;
  setFlagOn(flag: HSCore.Model.WallFlagEnum): void;
  getUniqueParent(): HSCore.Model.IEntity | null;
}

interface Layer extends HSCore.Model.Layer {
  walls: Record<string, Wall>;
}

interface WallJointManager {
  getWallJoints(wall: Wall): Array<{ destroy(): void }>;
}

interface FloorPlan {
  wallJointManager: WallJointManager;
}

interface App {
  floorplan: FloorPlan;
}

/**
 * Transaction for toggling wall auto-connection state
 */
export default class WallAutoConnectTransaction extends HSCore.Transaction.Common.StateRequest {
  private _walls: Wall[] = [];
  private _isAutoConnect: boolean = true;

  constructor(walls: Wall[], isAutoConnect: boolean) {
    super();
    
    this._walls = walls;
    this._isAutoConnect = isAutoConnect;

    if (walls.length > 0) {
      const entityLayer = HSCore.Util.Layer.getEntityLayer(walls[0]);
      HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(entityLayer);
    }
  }

  /**
   * Commit the wall auto-connection state change
   */
  onCommit(): void {
    const wallJointManager = HSApp.App.getApp().floorplan.wallJointManager;

    this._walls.forEach((wall) => {
      const disableAutoConnectFlag = HSCore.Model.WallFlagEnum.disableAutoConnect;

      if (this._isAutoConnect && wall.isFlagOn(disableAutoConnectFlag)) {
        wall.setFlagOff(disableAutoConnectFlag);
        HSCore.Util.TgWall.createWallJoints(wall);
        HSCore.Util.TgWall.processWallsJoints([wall]);
      } else if (!this._isAutoConnect && !wall.isFlagOn(disableAutoConnectFlag)) {
        wall.setFlagOn(disableAutoConnectFlag);
        const connectedWalls = HSCore.Util.TgWall.getWallConnectedWalls(wall);
        
        wallJointManager.getWallJoints(wall).forEach((joint) => joint.destroy());
        HSCore.Util.TgWall.processWallsJoints([wall, ...connectedWalls]);
      }
    });

    this._updateWalls();

    if (this._walls.length > 0) {
      HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();
    }

    super.onCommit?.([]);
  }

  /**
   * Update walls in their parent layer
   */
  private _updateWalls(): void {
    const firstWall = this._walls[0];
    
    if (!firstWall) {
      return;
    }

    const parent = firstWall.getUniqueParent();
    
    if (parent instanceof HSCore.Model.Layer) {
      const layer = parent as Layer;
      HSCore.Util.TgWall.updateLayerByWalls(Object.values(layer.walls), layer);
    }
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return this._isAutoConnect ? '开启墙体自动连接' : '关闭墙体自动连接';
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}