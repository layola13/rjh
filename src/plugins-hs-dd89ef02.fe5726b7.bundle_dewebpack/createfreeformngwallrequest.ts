import { LayerStructureEditRequest } from './LayerStructureEditRequest';

interface ArcInfo {
  // Define arc information structure
  [key: string]: unknown;
}

interface PathPoint {
  x: number;
  y: number;
  z: number;
  arcInfo?: ArcInfo;
}

interface WallGeometry {
  from: THREE.Vector3;
  to: THREE.Vector3;
}

interface WallConfig {
  width: number;
  arcInfo?: ArcInfo;
  height: number;
}

interface PathSegment {
  path: PathPoint[];
  firstSegWidth?: number;
  lastSegWidth?: number;
  firstConnectWall?: Wall;
  lastConnectWall?: Wall;
}

interface ExtensionInfo {
  bearing?: boolean;
}

interface CreationData {
  wallPath: PathPoint[];
  firstWall?: Wall;
  lastWall?: Wall;
  wallWidth: number;
  extentionInfo?: ExtensionInfo;
}

interface Wall {
  id: string;
  from: { x: number; y: number; z: number };
  to: { x: number; y: number; z: number };
  __isLoadBearing?: boolean;
  dirtyGeometry(): void;
}

interface Layer {
  height: number;
  walls: Record<string, Wall>;
  children: Record<string, Wall>;
  addChild(wall: Wall): void;
}

interface SlabInfo {
  [key: string]: unknown;
}

export class CreateFreeformNGWallRequest extends LayerStructureEditRequest {
  private _fp: unknown;
  private _creationData: CreationData[];
  private _preLayerSlabInfo: SlabInfo;
  private _affectedWallIds?: string[];

  constructor(fp: unknown, layer: Layer, creationData: CreationData[]) {
    super(layer);
    this._fp = fp;
    this._creationData = creationData;
    this._preLayerSlabInfo = HSCore.Util.Slab.getLayerSlabAutoRegions(layer);
    this._affectedWallIds = undefined;
  }

  private _createWallsFromPath(
    path: PathPoint[],
    defaultWidth: number,
    firstSegWidth?: number,
    lastSegWidth?: number,
    firstConnectWall?: Wall,
    lastConnectWall?: Wall,
    extensionInfo?: ExtensionInfo
  ): Wall[] {
    const layerHeight = this._layer.height;
    const wallConfigs: WallConfig[] = [];

    for (let i = 0; i < path.length - 1; i++) {
      if (i === 0 && firstSegWidth) {
        wallConfigs.push({
          width: firstSegWidth,
          arcInfo: path[i].arcInfo,
          height: layerHeight
        });
      } else if (i === path.length - 2 && lastSegWidth) {
        wallConfigs.push({
          width: lastSegWidth,
          arcInfo: path[i].arcInfo,
          height: layerHeight
        });
      } else {
        wallConfigs.push({
          width: defaultWidth,
          arcInfo: path[i].arcInfo,
          height: layerHeight
        });
      }
    }

    const walls = HSCore.Util.Wall.insertWallsByPath(
      path,
      wallConfigs,
      firstConnectWall,
      lastConnectWall
    );

    walls.forEach((wall: Wall) => {
      if (extensionInfo) {
        wall.__isLoadBearing = extensionInfo.bearing;
      }
      this._layer.addChild(wall);
    });

    return walls;
  }

  createWalls(
    wallPath: PathPoint[],
    firstWall?: Wall,
    lastWall?: Wall,
    wallWidth: number,
    extensionInfo?: ExtensionInfo
  ): Wall[] {
    const layer = this._layer;
    const pathSegments = new HSCore.Util.WallPathResolver(
      firstWall,
      lastWall,
      wallPath,
      wallWidth,
      [],
      layer
    ).execute();

    let allWalls: Wall[] = [];

    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      const walls = this._createWallsFromPath(
        segment.path,
        wallWidth,
        segment.firstSegWidth,
        segment.lastSegWidth,
        segment.firstConnectWall,
        segment.lastConnectWall,
        extensionInfo
      );
      allWalls = allWalls.concat(walls);
    }

    return allWalls;
  }

  updateAffectedItems(walls: Wall[]): Wall[] {
    const layer = this._layer;
    HSCore.Util.Slab.updateLayersSlabAfterWallChanged(layer, this._preLayerSlabInfo);

    const wallGeometries = walls.map(HSCore.Util.Wall.unshelveredWallGeometry);
    HSCore.Util.Layer.dirtyLayerSlabFaces(this._layer, wallGeometries);

    const connectedWalls = HSCore.Util.Wall.findConnectedWalls(walls, true);
    HSCore.Util.Wall.updateWallsFaces(connectedWalls);

    return connectedWalls;
  }

  doRequest(): void {
    const existingWalls = Object.values(this._layer.walls);
    const wallGeometryMap = new Map<string, WallGeometry>();

    existingWalls.forEach((wall: Wall) => {
      if (!wallGeometryMap.get(wall.id)) {
        const from = wall.from;
        const to = wall.to;
        wallGeometryMap.set(wall.id, {
          from: new THREE.Vector3(from.x, from.y, from.z),
          to: new THREE.Vector3(to.x, to.y, to.z)
        });
      }
    });

    let createdWalls: Wall[] = [];

    this._creationData.forEach((data: CreationData) => {
      const walls = this.createWalls(
        data.wallPath,
        data.firstWall,
        data.lastWall,
        data.wallWidth,
        data.extentionInfo
      );
      createdWalls = createdWalls.concat(walls);
    });

    const affectedWalls = this.updateAffectedItems(createdWalls);

    HSCore.Util.Layer.dirtyLayerInfo(this._layer);
    HSCore.Util.Opening.reassignOpeningHost(this._layer, affectedWalls, wallGeometryMap);

    affectedWalls.forEach((wall: Wall) => {
      wall.dirtyGeometry();
    });

    this._affectedWallIds = affectedWalls.map((wall: Wall) => wall.id);

    super.doRequest();
  }

  onUndo(): void {
    super.onUndo();
    this._dirtyModifiedWalls();
  }

  onRedo(): void {
    super.onRedo();
    this._dirtyModifiedWalls();
  }

  private _dirtyModifiedWalls(): void {
    if (!this._affectedWallIds) {
      return;
    }

    const walls: Wall[] = [];
    this._affectedWallIds.forEach((wallId: string) => {
      const wall = this._layer.children[wallId];
      if (wall) {
        walls.push(wall);
      }
    });

    for (const wall of walls) {
      wall.dirtyGeometry();
    }
  }

  getDescription(): string {
    return "画墙操作";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}