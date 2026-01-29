import { LayerStructureEditRequest } from './LayerStructureEditRequest';

export class DeleteNGWallRequest extends LayerStructureEditRequest {
  private wall: HSCore.Wall;
  private _oldWallPolys: Array<unknown>;
  private _preLayerSlabInfo: unknown;

  constructor(wall: HSCore.Wall) {
    const parentLayer = wall.getUniqueParent() || HSCore.Util.Layer.getActiveLayer();
    super(parentLayer);
    
    this.wall = wall;
    this._oldWallPolys = [wall].map(HSCore.Util.Wall.unshelveredWallGeometry);
    this._preLayerSlabInfo = HSCore.Util.Slab.getLayerSlabAutoRegions(parentLayer);
  }

  private _removeFromParent(wall: HSCore.Wall): void {
    if (!wall) {
      return;
    }

    const parentLayer = wall.getUniqueParent();
    if (!parentLayer) {
      return;
    }

    const endpoints = [wall.from, wall.to];
    parentLayer.removeChild(wall);
    
    endpoints.forEach((point) => {
      HSCore.Util.Point.tryMergeWallOnPoint(point);
    });
  }

  doRequest(): void {
    const layer = this._layer;
    const removableTrivialWalls = HSCore.Util.Wall.getRemovableTrivialWalls([this.wall]);
    
    let wallsToRemove = [this.wall];
    if (removableTrivialWalls) {
      wallsToRemove = wallsToRemove.concat(removableTrivialWalls);
    }

    let connectedWalls = HSCore.Util.Wall.findConnectedWalls(wallsToRemove, true);
    
    wallsToRemove.forEach((wall) => {
      this._removeFromParent(wall);
    });

    connectedWalls = connectedWalls.filter((wall) => !!wall.getUniqueParent());

    const layerWalls = Object.values(layer.walls);
    HSCore.Util.Wall.cleanUpAssociations(connectedWalls, layerWalls);
    
    connectedWalls.forEach((wall) => {
      wall.dirtyGeometry();
    });

    HSCore.Util.Wall.updateWallsFaces(connectedWalls);
    HSCore.Util.Slab.updateLayersSlabAfterWallChanged(layer, this._preLayerSlabInfo);
    HSCore.Util.Layer.dirtyLayerSlabFaces(this._layer, this._oldWallPolys);
    HSCore.Util.Layer.dirtyLayerInfo(layer);
    
    super.doRequest([]);
  }

  onCommit(): void {
    const app = HSApp.App.getApp();
    if (app.activeView?.pixiContext) {
      app.activeView.pixiContext.dirty = true;
    }
    
    super.onCommit([]);
  }

  getDescription(): string {
    return "删除墙体";
  }

  getCategory(): HSFPConstants.LogGroupTypes {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}