interface Point {
  getUniqueParent(): any;
  contents: Record<string, any>;
}

interface Wall {
  getUniqueParent(): any;
  dirtyGeometry(): void;
}

interface Layer {
  walls: Record<string, Wall>;
}

interface LayerSlabInfo {
  [key: string]: any;
}

declare namespace HSCore {
  namespace Util {
    namespace Point {
      function getParentWalls(point: Point): Wall[];
      function tryMergeWallOnPoint(point: Point, flag: boolean): Wall | null;
    }
    namespace Wall {
      function findConnectedWalls(walls: Wall[], flag: boolean): Wall[];
      function cleanUpAssociations(walls1: Wall[], walls2: Wall[]): void;
      function updateWallsFaces(walls: Wall[]): void;
    }
    namespace Slab {
      function getLayerSlabAutoRegions(layer: Layer): LayerSlabInfo;
      function updateLayersSlabAfterWallChanged(layer: Layer, preInfo: LayerSlabInfo): void;
    }
    namespace Layer {
      function dirtyLayerInfo(layer: Layer): void;
    }
  }
}

declare namespace HSConstants {
  enum ModelClass {
    NgCornerWindow = 'NgCornerWindow'
  }
}

declare namespace HSFPConstants {
  enum LogGroupTypes {
    WallOperation = 'WallOperation'
  }
}

declare namespace HSApp {
  namespace Request {
    class LayerStructureEditRequest {
      constructor(layer: Layer);
      doRequest(): void;
      getDescription(): string;
      getCategory(): string;
    }
  }
}

export class MergeWallOnPointRequest extends HSApp.Request.LayerStructureEditRequest {
  public readonly point: Point;
  private readonly _layer: Layer;
  private readonly _preLayerSlabInfo: LayerSlabInfo;

  constructor(point: Point, layer: Layer) {
    super(layer);
    this.point = point;
    this._layer = layer;
    this._preLayerSlabInfo = HSCore.Util.Slab.getLayerSlabAutoRegions(layer);
  }

  doRequest(): void {
    let walls = HSCore.Util.Point.getParentWalls(this.point);
    walls = HSCore.Util.Wall.findConnectedWalls(walls, true);
    
    const mergedWall = HSCore.Util.Point.tryMergeWallOnPoint(this.point, true);
    
    if (!mergedWall) {
      return;
    }

    const layer = this._layer;
    
    if (layer) {
      walls = walls.filter((wall: Wall) => !!wall.getUniqueParent());
      
      const layerWalls = Object.values(layer.walls);
      HSCore.Util.Wall.cleanUpAssociations(walls, layerWalls);
      
      walls.forEach((wall: Wall) => wall.dirtyGeometry());
      
      HSCore.Util.Wall.updateWallsFaces([mergedWall]);
      HSCore.Util.Slab.updateLayersSlabAfterWallChanged(layer, this._preLayerSlabInfo);
      HSCore.Util.Layer.dirtyLayerInfo(layer);
    }

    const contents = Object.values(mergedWall.contents);
    for (const content of contents) {
      if (content.instanceOf(HSConstants.ModelClass.NgCornerWindow)) {
        content.assignTo(mergedWall);
      }
    }

    super.doRequest();
  }

  getDescription(): string {
    return "连接墙体";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}