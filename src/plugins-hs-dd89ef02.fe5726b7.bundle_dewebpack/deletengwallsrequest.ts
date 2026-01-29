import { LayerStructureEditRequest } from './LayerStructureEditRequest';
import type { Wall } from './Wall';
import type { Layer } from './Layer';
import type { Point } from './Point';

interface SlabAutoRegionInfo {
  // Define based on HSCore.Util.Slab.getLayerSlabAutoRegions return type
  [key: string]: unknown;
}

interface WallGeometry {
  // Define based on HSCore.Util.Wall.unshelveredWallGeometry return type
  [key: string]: unknown;
}

export class DeleteNGWallsRequest extends LayerStructureEditRequest {
  public walls: Wall[];
  private _oldWallPolys: WallGeometry[];
  private _preLayerSlabInfo: SlabAutoRegionInfo;

  constructor(walls: Wall[]) {
    let parentLayer: Layer | undefined;

    walls.forEach((wall: Wall) => {
      parentLayer = wall.getUniqueParent();
    });

    if (!parentLayer) {
      parentLayer = HSCore.Util.Layer.getActiveLayer();
    }

    super(parentLayer);

    this.walls = walls;
    this._oldWallPolys = walls.map(HSCore.Util.Wall.unshelveredWallGeometry);
    this._preLayerSlabInfo = HSCore.Util.Slab.getLayerSlabAutoRegions(parentLayer);
  }

  private _removeFromParent(wall: Wall): void {
    if (!wall) {
      return;
    }

    const parent = wall.getUniqueParent();
    if (!parent) {
      return;
    }

    const endpoints: Point[] = [wall.from, wall.to];
    parent.removeChild(wall);

    endpoints.forEach((point: Point) => {
      HSCore.Util.Point.tryMergeWallOnPoint(point);
    });
  }

  public doRequest(): void {
    const layer = this._layer;
    const removableTrivialWalls = HSCore.Util.Wall.getRemovableTrivialWalls(this.walls);
    
    let wallsToRemove = this.walls;
    if (removableTrivialWalls) {
      wallsToRemove = wallsToRemove.concat(removableTrivialWalls);
    }

    let connectedWalls = HSCore.Util.Wall.findConnectedWalls(wallsToRemove, true);

    wallsToRemove.forEach((wall: Wall) => {
      this._removeFromParent(wall);
    });

    connectedWalls = connectedWalls.filter((wall: Wall) => {
      return !!wall.getUniqueParent();
    });

    const allLayerWalls = Object.values(layer.walls);
    HSCore.Util.Wall.cleanUpAssociations(connectedWalls, allLayerWalls);

    connectedWalls.forEach((wall: Wall) => {
      wall.dirtyGeometry();
    });

    HSCore.Util.Wall.updateWallsFaces(connectedWalls);
    HSCore.Util.Slab.updateLayersSlabAfterWallChanged(layer, this._preLayerSlabInfo);
    HSCore.Util.Layer.dirtyLayerSlabFaces(this._layer, this._oldWallPolys);
    HSCore.Util.Layer.dirtyLayerInfo(this._layer);

    super.doRequest([]);
  }

  public getDescription(): string {
    return "删除多处墙体";
  }

  public getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}