import { LayerStructureEditRequest } from './LayerStructureEditRequest';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface Wall {
  id: string;
  from: Point3D;
  to: Point3D;
  getUniqueParent(): Layer | null;
  splitByLerpNumber(ratio: number, flag: boolean): SplitResult | null;
  splitByPoints(points: Point3D[]): Wall[] | null;
  dirtyGeometry(): void;
  forEachWall(callback: (wall: Wall) => void): void;
}

interface Layer {
  walls: Record<string, Wall>;
}

interface SplitResult {
  walls: Wall[];
  point: Point3D;
}

interface WallSegment {
  from: THREE.Vector3;
  to: THREE.Vector3;
}

export class SplitNGWallRequest extends LayerStructureEditRequest {
  wall: Wall;
  splitPoint?: Point3D;
  splitWalls?: Wall[];
  private _preLayerSlabInfo: unknown;

  constructor(wall: Wall) {
    const uniqueParent = wall.getUniqueParent() ?? HSCore.Util.Layer.getActiveLayer();
    super(uniqueParent);
    
    this.wall = wall;
    this.splitPoint = undefined;
    this.splitWalls = undefined;
    this._preLayerSlabInfo = HSCore.Util.Slab.getLayerSlabAutoRegions(uniqueParent);
  }

  private _findPointOnTheWall(layer: Layer, lineSegment: THREE.Line3): Point3D[] {
    const pointsOnWall: Point3D[] = [];
    
    layer.forEachWall((currentWall: Wall) => {
      if (currentWall.id === this.wall.id) {
        return;
      }

      const isSameStartOrEnd =
        HSCore.Util.Math.isSamePoint(this.wall.from, currentWall.from) ||
        HSCore.Util.Math.isSamePoint(this.wall.to, currentWall.from) ||
        HSCore.Util.Math.isSamePoint(this.wall.from, currentWall.to) ||
        HSCore.Util.Math.isSamePoint(this.wall.to, currentWall.to);

      if (isSameStartOrEnd) {
        return;
      }

      const fromVector = GeLib.VectorUtils.toTHREEVector3(currentWall.from);
      let isOnSegment = GeLib.LineUtils.isPointOnLineSegment(fromVector, lineSegment);

      if (isOnSegment) {
        pointsOnWall.push(currentWall.from);
      } else {
        const toVector = GeLib.VectorUtils.toTHREEVector3(currentWall.to);
        isOnSegment = GeLib.LineUtils.isPointOnLineSegment(toVector, lineSegment);
        
        if (isOnSegment) {
          pointsOnWall.push(currentWall.to);
        }
      }
    });

    return pointsOnWall;
  }

  doRequest(): void {
    const walls = Object.values(this._layer.walls);
    const wallSegmentMap = new Map<string, WallSegment>();

    walls.forEach((wall: Wall) => {
      if (!wallSegmentMap.get(wall.id)) {
        const from = wall.from;
        const to = wall.to;
        
        wallSegmentMap.set(wall.id, {
          from: new THREE.Vector3(from.x, from.y, from.z),
          to: new THREE.Vector3(to.x, to.y, to.z)
        });
      }
    });

    const wallLine = new THREE.Line3(
      GeLib.VectorUtils.toTHREEVector3(this.wall.from),
      GeLib.VectorUtils.toTHREEVector3(this.wall.to)
    );

    const intersectionPoints = this._findPointOnTheWall(this._layer, wallLine);

    if (intersectionPoints.length === 0) {
      const SPLIT_RATIO = 0.5;
      const splitResult = this.wall.splitByLerpNumber(SPLIT_RATIO, false);
      
      if (!splitResult) {
        return;
      }
      
      this.splitWalls = splitResult.walls;
      this.splitPoint = splitResult.point;
    } else {
      this.splitWalls = this.wall.splitByPoints(intersectionPoints);
      
      if (!this.splitWalls) {
        return;
      }
      
      this.splitPoint = intersectionPoints[0];
    }

    this._modifyBaseProfile(wallLine);
    HSCore.Util.Layer.dirtyLayerInfo(this._layer);

    let affectedWalls: Wall[] = [this.wall];
    affectedWalls = affectedWalls.concat(this.splitWalls);

    HSCore.Util.Opening.reassignOpeningHost(this._layer, affectedWalls, wallSegmentMap);

    super.doRequest([]);
  }

  private _modifyBaseProfile(lineSegment: THREE.Line3): void {
    const layer = this._layer;
    const connectedWalls = HSCore.Util.Wall.findConnectedWalls(this.splitWalls!, false);
    connectedWalls.push(this.wall);

    const allWalls = Object.values(layer.walls);
    HSCore.Util.Wall.cleanUpAssociations(connectedWalls, allWalls);

    connectedWalls.forEach((wall: Wall) => wall.dirtyGeometry());

    HSCore.Util.Wall.updateWallsFaces(connectedWalls);
    HSCore.Util.Slab.updateLayersSlabAfterWallChanged(layer, this._preLayerSlabInfo);
  }

  getDescription(): string {
    return "拆分墙体";
  }

  getCategory(): string {
    return HSFPConstants.LogGroupTypes.WallOperation;
  }
}