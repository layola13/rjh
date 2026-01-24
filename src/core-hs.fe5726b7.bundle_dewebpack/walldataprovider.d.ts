import type { IDataProvider } from './IDataProvider';
import type { Wall } from './Wall';
import type { WallFaceType } from './WallFaceType';
import type { PlaneProjector } from './PlaneProjector';
import type * as THREE from 'three';

/**
 * Options for controlling face geometry generation
 */
export interface FaceGeometryOptions {
  /** Whether to prevent wall extension beyond floor boundaries */
  notExtendWall?: boolean;
  /** Maximum height to cut the geometry at */
  cutHeight3d?: number;
}

/**
 * Represents a segment of a wall face with both 3D and 2D plane projections
 */
export interface FaceSegment {
  /** 3D path points defining the segment */
  path: THREE.Vector3[];
  /** 2D projected plane path points */
  planePath: THREE.Vector3[];
}

/**
 * Surface geometry data including path, plane projection, and optional segments
 */
export interface SurfaceGeometry {
  /** Main 3D path points */
  path: THREE.Vector3[];
  /** 2D projected plane path points */
  planePath: THREE.Vector3[];
  /** Optional individual segments comprising the surface */
  segments?: FaceSegment[];
}

/**
 * Extended Vector3 with optional surface geometry metadata
 */
export interface Vector3WithSurface extends Array<THREE.Vector3> {
  /** Attached surface geometry information */
  surface?: SurfaceGeometry;
}

/**
 * Arc information for curved wall segments
 */
export interface ArcInfo {
  /** Center point of the arc */
  center: THREE.Vector3;
  /** X coordinate of arc center */
  x: number;
  /** Y coordinate of arc center */
  y: number;
  /** Radius of the arc */
  radius: number;
  /** Whether arc is drawn clockwise */
  clockwise: boolean;
}

/**
 * Extended Vector3 with optional arc metadata
 */
export interface Vector3WithArc extends THREE.Vector3 {
  /** Arc information if this point is part of a curved segment */
  arcInfo?: ArcInfo;
}

/**
 * Internal wall geometry structure providing access to wall face points
 */
export interface WallGeometry {
  /**
   * Get a specific point by index
   * @param index - Point index (0-3 for corners)
   */
  getPoint(index: number): Vector3WithArc;

  /**
   * Get a range of points between two indices
   * @param startIndex - Starting point index
   * @param endIndex - Ending point index
   * @returns Array of points in the range
   */
  getRange(startIndex: number, endIndex: number): Vector3WithArc[];

  /**
   * Get left face edge points
   * @returns Array of two points defining the left edge
   */
  left(): Vector3WithArc[];

  /**
   * Get right face edge points
   * @returns Array of two points defining the right edge
   */
  right(): Vector3WithArc[];

  /**
   * Get front face edge points
   * @returns Array of points defining the front edge
   */
  front(): Vector3WithArc[];

  /**
   * Get back face edge points
   * @returns Array of points defining the back edge
   */
  back(): Vector3WithArc[];

  /**
   * Get top face edge points
   * @returns Array of points defining the top perimeter
   */
  top(): Vector3WithArc[];
}

/**
 * Cached geometry data for a wall entity
 */
export interface CachedWallGeometry {
  /** Array of geometry points */
  geometry: Vector3WithArc[];
  /** Indices mapping to geometry array */
  indices: number[];
}

/**
 * Wall face entity with geometry validation
 */
export interface WallFace {
  /**
   * Validates that the face geometry is correct
   * @returns True if geometry is valid
   */
  validateGeometry(): boolean;

  /**
   * Gets the outer loop polygon of the face
   * @returns Array of points forming the outer boundary
   */
  getOuterLoopPolygon(): THREE.Vector2[];
}

/**
 * Data provider for wall geometry operations.
 * Handles extraction of face paths for different wall face types,
 * supporting both straight and arc walls.
 */
export declare class WallDataProvider extends IDataProvider {
  /** The wall entity this provider serves */
  protected readonly wall: Wall;
  
  /** Cached geometries map indexed by wall ID */
  protected readonly geometries: Map<string, CachedWallGeometry>;

  /**
   * Creates a new wall data provider
   * @param wall - The wall entity
   * @param geometries - Pre-computed geometry cache
   */
  constructor(wall: Wall, geometries: Map<string, CachedWallGeometry>);

  /**
   * Gets the 3D path for a specific wall face
   * @param face - The wall face entity
   * @param options - Optional geometry generation parameters
   * @returns Array of 3D points defining the face boundary
   */
  getFacePath(face: WallFace, options?: FaceGeometryOptions): THREE.Vector3[];

  /**
   * Checks if the wall has a layer beneath it
   * @returns True if an underlying layer exists
   * @private
   */
  private _hasUnderLayer(): boolean;

  /**
   * Generates geometry for a side face (front/back)
   * @param points - Edge points defining the side
   * @param options - Geometry generation options
   * @param isLastSegment - Whether this is the final segment
   * @returns Array of 3D points with optional surface data
   * @private
   */
  private _getSideFaceGeometry(
    points: Vector3WithArc[],
    options?: FaceGeometryOptions,
    isLastSegment?: boolean
  ): Vector3WithSurface;

  /**
   * Adjusts side face geometry to match face polygon
   * @param geometry - The wall geometry structure
   * @param face - The target wall face
   * @returns Adjusted array of 3D points
   * @private
   */
  private _fixSideFaceGeo(
    geometry: WallGeometry,
    face: WallFace
  ): THREE.Vector3[];

  /**
   * Clips a face polygon against multiple clip polygons
   * @param facePolygon - The face polygon to clip
   * @param clipPolygons - Array of clipping polygons
   * @param projector - Plane projector for 2D/3D conversion
   * @returns Clipped polygon points
   * @private
   */
  private static _clipFacePolygon(
    facePolygon: THREE.Vector3[],
    clipPolygons: THREE.Vector2[][],
    projector: PlaneProjector
  ): THREE.Vector3[];

  /**
   * Moves bottom face points down by floor thickness
   * @param points - Points to adjust
   * @private
   */
  private _moveBottomPointsDownThickness(points: THREE.Vector3[]): void;

  /**
   * Cuts geometry points at a specified height
   * @param points - Points to cut
   * @param cutHeight - Maximum z-coordinate
   * @private
   */
  private _cutHeight3D(points: THREE.Vector3[], cutHeight: number): void;

  /**
   * Gets left face geometry for straight walls
   * @param geometry - Wall geometry structure
   * @param face - The left face entity
   * @param options - Geometry options
   * @returns Left face boundary points
   * @private
   */
  private _getLeftFaceGeometry(
    geometry: WallGeometry,
    face: WallFace,
    options?: FaceGeometryOptions
  ): THREE.Vector3[];

  /**
   * Gets right face geometry for straight walls
   * @param geometry - Wall geometry structure
   * @param face - The right face entity
   * @param options - Geometry options
   * @returns Right face boundary points
   * @private
   */
  private _getRightFaceGeometry(
    geometry: WallGeometry,
    face: WallFace,
    options?: FaceGeometryOptions
  ): THREE.Vector3[];

  /**
   * Gets right face geometry for arc walls
   * @param geometry - Wall geometry structure
   * @returns Right face boundary points
   * @private
   */
  private _getArcRightFaceGeometry(geometry: WallGeometry): THREE.Vector3[];

  /**
   * Gets left face geometry for arc walls
   * @param geometry - Wall geometry structure
   * @returns Left face boundary points
   * @private
   */
  private _getArcLeftFaceGeometry(geometry: WallGeometry): THREE.Vector3[];

  /**
   * Generates path geometry at a specific height
   * @param points - Base path points (may include arc info)
   * @param height - Z-coordinate for all points
   * @returns 3D points at specified height
   * @private
   */
  private _getPathGeometry(
    points: Vector3WithArc[],
    height: number
  ): THREE.Vector3[];

  /**
   * Gets face geometry for arc wall sides
   * @param edgePoints - Edge points of the face
   * @param faceType - Type of wall face
   * @returns Face boundary points with surface data
   * @private
   */
  private _getArcFaceGeometry(
    edgePoints: Vector3WithArc[],
    faceType: WallFaceType
  ): Vector3WithSurface;

  /**
   * Gets front face geometry
   * @param geometry - Wall geometry structure
   * @param segmentIndex - Index of the segment
   * @param isLastSegment - Whether this is the last segment
   * @param options - Geometry options
   * @returns Front face boundary points
   * @private
   */
  private _getFrontFaceGeometry(
    geometry: WallGeometry,
    segmentIndex: number,
    isLastSegment: boolean,
    options?: FaceGeometryOptions
  ): THREE.Vector3[];

  /**
   * Gets back face geometry
   * @param geometry - Wall geometry structure
   * @param segmentIndex - Index of the segment
   * @param isLastSegment - Whether this is the last segment
   * @param options - Geometry options
   * @returns Back face boundary points
   * @private
   */
  private _getBackFaceGeometry(
    geometry: WallGeometry,
    segmentIndex: number,
    isLastSegment: boolean,
    options?: FaceGeometryOptions
  ): THREE.Vector3[];

  /**
   * Gets top face geometry for straight walls
   * @param geometry - Wall geometry structure
   * @param options - Geometry options
   * @returns Top face boundary points
   * @private
   */
  private _getTopFaceGeometry(
    geometry: WallGeometry,
    options?: FaceGeometryOptions
  ): Vector3WithArc[];

  /**
   * Gets top face geometry for arc walls
   * @param geometry - Wall geometry structure
   * @returns Top face boundary points
   * @private
   */
  private _getArcTopFaceGeometry(geometry: WallGeometry): THREE.Vector3[];

  /**
   * Gets bottom face geometry for arc walls
   * @param geometry - Wall geometry structure
   * @returns Bottom face boundary points
   * @private
   */
  private _getArcBottomFaceGeometry(geometry: WallGeometry): THREE.Vector3[];

  /**
   * Gets bottom face geometry for straight walls
   * @param geometry - Wall geometry structure
   * @param options - Geometry options
   * @returns Bottom face boundary points
   * @private
   */
  private _getBottomFaceGeometry(
    geometry: WallGeometry,
    options?: FaceGeometryOptions
  ): THREE.Vector3[];

  /**
   * Retrieves cached wall geometry structure
   * @returns Wall geometry accessor or null if not found
   * @private
   */
  private _getWallGeometry(): WallGeometry | null;
}