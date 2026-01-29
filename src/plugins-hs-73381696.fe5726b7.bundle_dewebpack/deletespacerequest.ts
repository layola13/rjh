import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * Request to delete a space from the floor plan
 */
export class DeleteSpaceRequest extends HSCore.Transaction.Common.StateRequest {
  private readonly _slab: any;
  private readonly _floor: any;

  constructor(slab: any, floor: any) {
    super();
    this._slab = slab;
    this._floor = floor;
  }

  /**
   * Executes the delete space operation
   */
  onCommit(): void {
    HSApp.App.getApp().selectionManager.unselectAll();

    const baseLayer = this._slab.getBaseLayer();
    
    if (baseLayer === HSApp.App.getApp().floorplan.scene.outdoorLayer) {
      HSCore.Util.Slab.deleteOutdoorRegion([this._floor]);
    } else {
      new HSCore.Model.Geom.SplitHelper(baseLayer).deleteRegion(this._floor);
    }

    super.onCommit([]);
  }

  canTransactField(): boolean {
    return true;
  }

  getDescription(): string {
    return "删除空间数据";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.SpaceOperation;
  }
}