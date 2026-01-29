import { HSCore } from './HSCore';
import { HSFPConstants } from './HSFPConstants';

/**
 * Request to delete a TG wall entity
 */
export class DeleteTGWallRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _wall: any;

  constructor(wall: any) {
    super();
    this._wall = wall;
    
    const entityLayer = HSCore.Util.Layer.getEntityLayer(wall);
    HSCore.Util.FaceMoldingFitHelper.getInstance().startListening(entityLayer);
  }

  onCommit(): any[] {
    const uniqueParent = this._wall.getUniqueParent();
    const connectedWalls = HSCore.Util.TgWall.getWallConnectedWalls(this._wall);
    
    const linkedJoints = HSCore.Util.Joint.getPointLinkedJoints([this._wall]);
    linkedJoints.forEach((joint) => joint.destroy());
    
    this._wall.remove();
    
    connectedWalls.forEach((wall) => {
      HSCore.Util.TgWall.createWallJoints(wall);
      HSCore.Util.TgWall.processWallsJoints([wall]);
    });
    
    HSCore.Util.TgWall.updateLayerByWalls(Object.values(uniqueParent.walls), uniqueParent);
    HSCore.Util.FaceMoldingFitHelper.getInstance().autoFit();
    
    return super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "删除墙体";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}