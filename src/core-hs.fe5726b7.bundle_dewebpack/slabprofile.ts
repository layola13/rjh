import { BaseObject } from './BaseObject';
import { SlabDataProvider } from './SlabDataProvider';
import { EntityEventType } from './EntityEventType';
import { Logger } from './Logger';

interface ArcInfo {
  [key: string]: unknown;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
  arcInfo?: ArcInfo;
}

interface FaceGeometry {
  outer: Point3D[];
  holes?: Point3D[][];
}

interface ProfileGeometry {
  outer: Point3D[];
  holes?: Point3D[][];
}

interface EntityEvent {
  data: {
    type: EntityEventType;
  };
}

interface Entity {
  getUniqueParent(): unknown;
  validateGeometry(): boolean;
  tag: string;
  getOuterLoopPolygon(): unknown;
  getOuterLoopVertices(): Vertex[];
  from?: Vertex;
  to?: Vertex;
}

interface Vertex {
  [key: string]: unknown;
}

interface GeometryManager {
  getGeometry(entity: Entity): { geometry: Point3D[] } | undefined;
}

interface ClipOptions {
  operation: ClipType;
}

enum ClipType {
  diff = 'diff',
  union = 'union'
}

export class SlabProfile extends BaseObject {
  private _dirty: boolean;
  private _profile?: ProfileGeometry;
  private _provider?: SlabDataProvider;

  constructor(entity: Entity, geomMgr: GeometryManager) {
    super(entity, geomMgr);
    this._dirty = true;
    this._profile = undefined;
    this._provider = new SlabDataProvider(this.entity.getUniqueParent());
  }

  get geometry(): ProfileGeometry | undefined {
    if (this._dirty) {
      this._compute();
    }
    return this._profile;
  }

  private _compute(): void {
    this._profile = this._computeProfileImpl();
    this._dirty = false;
  }

  isValidFaceGeometry(): boolean {
    return (
      !!this.entity.validateGeometry() &&
      !!this._provider &&
      this._provider.isValidFaceGeometry(this.entity)
    );
  }

  onEntityDirty(event: EntityEvent): void {
    super.onEntityDirty(event);

    if (this._provider?.clearCacheGeometryData) {
      this._provider.clearCacheGeometryData(this.entity);
    }

    if (
      event.data.type === EntityEventType.Geometry ||
      event.data.type === EntityEventType.Position
    ) {
      this.clearCachedData();
    }
  }

  onEntityRemoved(): void {
    super.onEntityRemoved();
    this.clearCachedData();
  }

  clear(): void {
    super.clear();
    this.clearCachedData();
    this._provider = undefined;
  }

  clearCachedData(): void {
    this._profile = undefined;
    this._dirty = true;
  }

  private _computeProfileImpl(): ProfileGeometry | undefined {
    const entity = this.entity;

    if (!entity || !entity.validateGeometry()) {
      return undefined;
    }

    if (!this._provider) {
      return undefined;
    }

    const faceGeometry = this._provider.getFaceGeometry(entity);

    Logger.console.assert(
      Boolean(faceGeometry),
      `failed to compute geometry for ${entity.tag}.`
    );

    if (!faceGeometry || !faceGeometry.outer || faceGeometry.outer.length < 2) {
      return undefined;
    }

    let outerLoop = faceGeometry.outer;

    if (outerLoop.length === 2 && outerLoop[1].arcInfo) {
      outerLoop.push(outerLoop[0]);
    }

    const interiorWallPolys = this._getInteriorWallPolygons();

    if (interiorWallPolys) {
      let clippedPolygons = HSCore.Util.Collision.ClipPolygon(
        [outerLoop],
        interiorWallPolys,
        { operation: HSCore.Util.Collision.ClipType.diff }
      );

      clippedPolygons = HSCore.Util.Collision.FixPolygon(clippedPolygons, 0.001);

      if (clippedPolygons.length !== 1) {
        return {
          outer: outerLoop,
          holes: faceGeometry.holes
        };
      }

      const clippedPoints = clippedPolygons[0].map((point: unknown) =>
        GeLib.VectorUtils.toTHREEVector3(point)
      );

      const arcPoints = outerLoop.filter(point => point.arcInfo !== undefined);

      const tolerance = 0.001;

      arcPoints.forEach(arcPoint => {
        const matchingPoint = clippedPoints.find((clippedPoint: Point3D) =>
          GeLib.VectorUtils.isPointEqual(arcPoint, clippedPoint, tolerance)
        );

        if (matchingPoint) {
          matchingPoint.arcInfo = arcPoint.arcInfo;
        }
      });

      outerLoop = clippedPoints;
    }

    return {
      outer: outerLoop,
      holes: faceGeometry.holes
    };
  }

  private _getInteriorWallPolygons(): Point3D[][] | undefined {
    if (!this.entity.getOuterLoopPolygon()) {
      return undefined;
    }

    const interiorWalls = HSCore.Util.Floor.findInteriorWallsInFloor(this.entity);

    if (interiorWalls.length === 0) {
      return undefined;
    }

    const getWallGeometry = (wall: Entity): Point3D[] | undefined => {
      const geometryData = this.geomMgr.getGeometry(wall);
      return geometryData?.geometry;
    };

    if (interiorWalls.length === 1) {
      const singleWallGeometry = getWallGeometry(interiorWalls[0]);
      return singleWallGeometry ? [singleWallGeometry] : undefined;
    }

    const outerVertices = new Set<Vertex>();
    this.entity.getOuterLoopVertices().forEach(vertex => {
      outerVertices.add(vertex);
    });

    const boundaryWalls: Point3D[][] = [];
    const internalWalls: Point3D[][] = [];

    interiorWalls.forEach(wall => {
      const wallGeometry = getWallGeometry(wall);

      if (wallGeometry) {
        if (outerVertices.has(wall.from!) || outerVertices.has(wall.to!)) {
          boundaryWalls.push(wallGeometry);
        } else {
          internalWalls.push(wallGeometry);
        }
      }
    });

    if (boundaryWalls.length === 0) {
      return undefined;
    }

    if (internalWalls.length === 0) {
      return boundaryWalls;
    }

    let mergedPolygons = HSCore.Util.Collision.ClipPolygon(
      boundaryWalls,
      internalWalls,
      { operation: HSCore.Util.Collision.ClipType.union }
    );

    if (mergedPolygons.length > 0) {
      mergedPolygons = HSCore.Util.Collision.FixPolygon(mergedPolygons, 0.001);
    }

    return mergedPolygons;
  }
}