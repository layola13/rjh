/**
 * Module: SlabProfile
 * Provides profile geometry computation for slab entities with support for holes and interior walls.
 */

import { BaseObject } from './BaseObject';
import { SlabDataProvider } from './SlabDataProvider';
import { EntityEventType } from './EntityEventType';
import { Logger } from './Logger';

/**
 * Represents a 3D point with optional arc information for curved edges.
 */
interface Point3D {
  x: number;
  y: number;
  z: number;
  /** Optional arc information for curved segments */
  arcInfo?: ArcInfo;
}

/**
 * Defines arc properties for curved edge segments.
 */
interface ArcInfo {
  center: Point3D;
  radius: number;
  startAngle: number;
  endAngle: number;
  clockwise?: boolean;
}

/**
 * Represents face geometry with outer boundary and optional holes.
 */
interface FaceGeometry {
  /** Outer boundary points defining the face perimeter */
  outer: Point3D[];
  /** Optional array of hole polygons within the face */
  holes?: Point3D[][];
}

/**
 * Entity event data containing event type and additional metadata.
 */
interface EntityEvent {
  data: {
    type: EntityEventType;
    [key: string]: unknown;
  };
}

/**
 * Entity interface representing geometric objects in the scene.
 */
interface Entity {
  /** Validates the entity's geometry */
  validateGeometry(): boolean;
  /** Gets the unique parent entity */
  getUniqueParent(): Entity | null;
  /** Gets the outer loop polygon vertices */
  getOuterLoopPolygon(): Point3D[] | undefined;
  /** Gets vertices defining the outer loop */
  getOuterLoopVertices(): Vertex[];
  /** Entity identifier/tag */
  tag: string;
  /** Start vertex for wall entities */
  from?: Vertex;
  /** End vertex for wall entities */
  to?: Vertex;
}

/**
 * Represents a vertex in the geometric model.
 */
interface Vertex {
  id: string;
  position: Point3D;
}

/**
 * Geometry wrapper containing computed geometry data.
 */
interface GeometryWrapper {
  geometry: Point3D[];
}

/**
 * Geometry manager interface for retrieving entity geometries.
 */
interface GeometryManager {
  getGeometry(entity: Entity): GeometryWrapper | undefined;
}

/**
 * Polygon clipping operation types.
 */
declare enum ClipType {
  union = 'union',
  diff = 'diff',
  intersect = 'intersect',
  xor = 'xor'
}

/**
 * Options for polygon clipping operations.
 */
interface ClipOptions {
  operation: ClipType;
}

/**
 * SlabProfile computes and caches the 2D profile geometry of slab entities,
 * accounting for interior walls and holes. Geometry is lazily computed and
 * cached until the entity changes.
 */
export class SlabProfile extends BaseObject {
  /** Indicates whether cached profile needs recomputation */
  private _dirty: boolean;
  
  /** Cached profile geometry */
  private _profile?: FaceGeometry;
  
  /** Data provider for slab geometry computations */
  private _provider?: SlabDataProvider;

  /**
   * Creates a new SlabProfile instance.
   * @param entity - The slab entity to compute profile for
   * @param geometryManager - Manager for accessing entity geometries
   */
  constructor(entity: Entity, geometryManager: GeometryManager) {
    super(entity, geometryManager);
    this._dirty = true;
    this._profile = undefined;
    this._provider = new SlabDataProvider(this.entity.getUniqueParent());
  }

  /**
   * Gets the computed profile geometry, computing it if necessary.
   * @returns The profile geometry with outer boundary and holes
   */
  get geometry(): FaceGeometry | undefined {
    if (this._dirty) {
      this._compute();
    }
    return this._profile;
  }

  /**
   * Computes and caches the profile geometry.
   */
  private _compute(): void {
    this._profile = this._computeProfileImpl();
    this._dirty = false;
  }

  /**
   * Validates that the entity has valid face geometry.
   * @returns True if the entity and provider have valid face geometry
   */
  isValidFaceGeometry(): boolean {
    return (
      !!this.entity.validateGeometry() &&
      !!this._provider &&
      this._provider.isValidFaceGeometry(this.entity)
    );
  }

  /**
   * Handles entity dirty events by clearing cached data when geometry changes.
   * @param event - The entity event containing change information
   */
  onEntityDirty(event: EntityEvent): void {
    super.onEntityDirty(event);
    
    if (this._provider?.clearCacheGeometryData) {
      this._provider.clearCacheGeometryData(this.entity);
    }
    
    const eventType = event.data.type;
    if (
      eventType === EntityEventType.Geometry ||
      eventType === EntityEventType.Position
    ) {
      this.clearCachedData();
    }
  }

  /**
   * Handles entity removal by clearing all cached data.
   */
  onEntityRemoved(): void {
    super.onEntityRemoved();
    this.clearCachedData();
  }

  /**
   * Clears all data and releases resources.
   */
  clear(): void {
    super.clear();
    this.clearCachedData();
    this._provider = undefined;
  }

  /**
   * Clears cached profile data and marks as dirty.
   */
  clearCachedData(): void {
    this._profile = undefined;
    this._dirty = true;
  }

  /**
   * Computes the profile geometry by subtracting interior walls from the face.
   * @returns The computed profile with outer boundary and holes, or undefined if invalid
   */
  private _computeProfileImpl(): FaceGeometry | undefined {
    const entity = this.entity;
    
    if (!entity?.validateGeometry()) {
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
    
    if (!faceGeometry?.outer || faceGeometry.outer.length < 2) {
      return undefined;
    }

    let outerBoundary = faceGeometry.outer;
    
    // Handle arc segments: if there are exactly 2 points and the second has arc info,
    // duplicate the first point to complete the arc
    if (
      outerBoundary.length === 2 &&
      outerBoundary[1].arcInfo
    ) {
      outerBoundary.push(outerBoundary[0]);
    }

    const interiorWallPolygons = this._getInteriorWallPolys();
    
    if (interiorWallPolygons) {
      const TOLERANCE = 0.001;
      
      // Subtract interior walls from outer boundary
      let clippedPolygons = HSCore.Util.Collision.ClipPolygon(
        [outerBoundary],
        interiorWallPolygons,
        { operation: HSCore.Util.Collision.ClipType.diff }
      );
      
      clippedPolygons = HSCore.Util.Collision.FixPolygon(clippedPolygons, TOLERANCE);
      
      // Should result in a single polygon after clipping
      if (clippedPolygons.length !== 1) {
        return {
          outer: outerBoundary,
          holes: faceGeometry.holes
        };
      }
      
      // Convert clipped polygon back to THREE.Vector3 format
      const newOuterBoundary = clippedPolygons[0].map(point =>
        GeLib.VectorUtils.toTHREEVector3(point)
      );
      
      // Preserve arc information from original points
      const pointsWithArcInfo = outerBoundary.filter(point => point.arcInfo !== undefined);
      
      pointsWithArcInfo.forEach(arcPoint => {
        const matchingPoint = newOuterBoundary.find(newPoint =>
          GeLib.VectorUtils.isPointEqual(arcPoint, newPoint, TOLERANCE)
        );
        
        if (matchingPoint) {
          matchingPoint.arcInfo = arcPoint.arcInfo;
        }
      });
      
      outerBoundary = newOuterBoundary;
    }

    return {
      outer: outerBoundary,
      holes: faceGeometry.holes
    };
  }

  /**
   * Computes polygons representing interior walls within the slab.
   * @returns Array of wall polygons, or undefined if none exist
   */
  private _getInteriorWallPolys(): Point3D[][] | undefined {
    if (!this.entity.getOuterLoopPolygon()) {
      return undefined;
    }
    
    const interiorWalls = HSCore.Util.Floor.findInteriorWallsInFloor(this.entity);
    
    if (interiorWalls.length === 0) {
      return undefined;
    }

    /**
     * Retrieves geometry for a wall entity.
     * @param wall - The wall entity
     * @returns The wall's polygon geometry
     */
    const getWallGeometry = (wall: Entity): Point3D[] | undefined => {
      const geometryWrapper = this.geomMgr.getGeometry(wall);
      return geometryWrapper?.geometry;
    };

    // Single wall case: return immediately
    if (interiorWalls.length === 1) {
      const geometry = getWallGeometry(interiorWalls[0]);
      return geometry ? [geometry] : undefined;
    }

    // Build set of outer loop vertices for quick lookup
    const outerLoopVertexSet = new Set<Vertex>();
    this.entity.getOuterLoopVertices().forEach(vertex => {
      outerLoopVertexSet.add(vertex);
    });

    const boundaryWallPolygons: Point3D[][] = [];
    const internalWallPolygons: Point3D[][] = [];

    // Separate walls into boundary-touching and fully internal
    interiorWalls.forEach(wall => {
      const wallGeometry = getWallGeometry(wall);
      
      if (!wallGeometry) {
        return;
      }
      
      const touchesBoundary =
        outerLoopVertexSet.has(wall.from!) ||
        outerLoopVertexSet.has(wall.to!);
      
      if (touchesBoundary) {
        boundaryWallPolygons.push(wallGeometry);
      } else {
        internalWallPolygons.push(wallGeometry);
      }
    });

    if (boundaryWallPolygons.length === 0) {
      return undefined;
    }
    
    if (internalWallPolygons.length === 0) {
      return boundaryWallPolygons;
    }

    const TOLERANCE = 0.001;
    
    // Union boundary walls with internal walls to get complete wall footprint
    let unionedPolygons = HSCore.Util.Collision.ClipPolygon(
      boundaryWallPolygons,
      internalWallPolygons,
      { operation: HSCore.Util.Collision.ClipType.union }
    );

    if (unionedPolygons.length > 0) {
      unionedPolygons = HSCore.Util.Collision.FixPolygon(unionedPolygons, TOLERANCE);
    }

    return unionedPolygons;
  }
}