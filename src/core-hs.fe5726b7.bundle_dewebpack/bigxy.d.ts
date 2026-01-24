/**
 * Provides 2D/3D projection utilities for geometric entities and faces.
 * Handles projection of planar and non-planar surfaces onto specified planes.
 */

import type { Vector2, Vector3, Plane, Polygon, Matrix3, CoordinateSystem } from './math-types';
import type { Shell, Face, Wire, Edge, Vertex, Surface, BoundingBox } from './geometry-types';

/**
 * Represents a 2D point with X and Y coordinates.
 * Provides both lowercase and uppercase property accessors for compatibility.
 */
export declare class BigXY {
  /**
   * Creates a new 2D point.
   * @param x - The X coordinate
   * @param y - The Y coordinate
   */
  constructor(x: number, y: number);

  /** The X coordinate (lowercase accessor) */
  get x(): number;
  set x(value: number);

  /** The X coordinate (uppercase accessor) */
  get X(): number;
  set X(value: number);

  /** The Y coordinate (lowercase accessor) */
  get y(): number;
  set y(value: number);

  /** The Y coordinate (uppercase accessor) */
  get Y(): number;
  set Y(value: number);

  private _x: number;
  private _y: number;
}

/**
 * Options for configuring projection behavior.
 */
export interface ProjectionOptions {
  /** Tag to filter specific faces for projection */
  facetag?: string;
  
  /** Tags of faces to exclude from projection */
  excludeFaceTags?: string[];
  
  /** Tag identifying the entity being projected */
  entityTag?: string;
}

/**
 * Represents the distance of a projected face from the projection plane.
 */
export interface FaceDistance {
  /** Absolute distance from the plane */
  distance: number;
  
  /** Signed distance (positive/negative based on direction), optional */
  distanceWithDirection?: number;
}

/**
 * Bounding box in 2D space.
 */
export interface PathBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

/**
 * Represents a single projected path with associated metadata.
 */
export interface ProjectedPath {
  /** Unique identifier path for the graphics element */
  graphicsPath: string;
  
  /** Whether this is a copied/duplicated path */
  isCopyPath: boolean;
  
  /** Array of path loops, each containing 2D points */
  paths: BigXY[][];
  
  /** Set of smooth (non-linear) edge discretizations */
  smoothEdgeSet: BigXY[][];
  
  /** Original curve representations before discretization */
  realPaths: unknown[]; // Curve2d types from geometry engine
}

/**
 * Complete projection result for a single face.
 */
export interface FaceProjectionResult {
  /** Array of projected paths */
  paths: ProjectedPath[];
  
  /** Distance from projection plane */
  distance: number;
  
  /** Signed distance (if applicable) */
  distanceWithDirection?: number;
  
  /** Projected area */
  area: number;
  
  /** Bounding box of normal (outer) paths */
  normalPathBounds: PathBounds;
  
  /** Bounding box of hole (inner) paths */
  holePathBounds: PathBounds;
  
  /** Perimeter of normal paths */
  normalPathPerimeter: number;
  
  /** Perimeter of hole paths */
  holePathPerimeter: number;
  
  /** Document/Face identifier */
  docId: string;
  
  /** Whether the face is parallel to projection plane */
  isParallel?: boolean;
  
  /** Unique seek identifier */
  seekId?: string;
}

/**
 * Result of 2D projection operation including unioned contours.
 */
export interface Projection2DResult {
  /** All individual face projections */
  projections: FaceProjectionResult[];
  
  /** Unioned/merged contours as nested point arrays */
  unioned: BigXY[][][];
}

/**
 * Internal context for projection operations.
 */
interface ProjectionContext {
  entityTag?: string;
  shellTag?: string;
}

/**
 * Face pose classification relative to projection plane.
 */
type FacePoseType = 'horizontal' | 'smooth' | 'other';

/**
 * Mesh data structure for tessellation.
 */
interface MeshData {
  vertices: number[];
  faces: number[];
  normals: number[];
  uvs: number[];
}

/**
 * Helper class for projecting 3D geometric entities onto 2D planes.
 * Provides methods for face projection, contour calculation, and boolean operations.
 * 
 * Singleton pattern - use `ProjectionHelper.getInstance()` to access.
 */
export declare class ProjectionHelper {
  /** Default XY projection plane (Z-up orientation) */
  static readonly xyPlane: Plane;

  private static _instance?: ProjectionHelper;

  /**
   * Gets the singleton instance of ProjectionHelper.
   * @returns The shared ProjectionHelper instance
   */
  static getInstance(): ProjectionHelper;

  /**
   * Projects shells onto a plane and returns individual and unioned projections.
   * Handles planar, non-planar, and continuous faces with boolean union.
   * 
   * @param shells - Array of 3D shells to project
   * @param projectionPlane - Target projection plane (defaults to xyPlane)
   * @param options - Projection filtering and tagging options
   * @returns Projection results with individual faces and unioned contours
   */
  export2DProjection(
    shells: Shell[],
    projectionPlane?: Plane,
    options?: ProjectionOptions
  ): Projection2DResult;

  /**
   * Simplified projection for planar/cylindrical faces parallel to projection plane.
   * Optimized for cases where face normals match the projection plane normal.
   * 
   * @param shells - Array of 3D shells to project
   * @param projectionPlane - Target projection plane (defaults to xyPlane)
   * @param options - Projection filtering and tagging options
   * @returns Simplified projection results
   */
  exportSimple2DProjection(
    shells: Shell[],
    projectionPlane?: Plane,
    options?: ProjectionOptions
  ): Projection2DResult;

  /**
   * Calculates the total surface area of faces, optionally filtered by planes.
   * 
   * @param shells - Shells containing faces to measure
   * @param filterPlanes - Optional array of planes to filter faces
   * @returns Total surface area
   */
  getSurffaceArea(shells: Shell[], filterPlanes?: Plane[]): number;

  /**
   * Calculates merged contours from projection results.
   * Performs boolean union on all paths to eliminate overlaps.
   * 
   * @param projections - Array of face projection results
   * @param pathsOverride - Optional explicit paths to use instead of projection paths
   * @returns Array of merged contour loops
   */
  calcProjectionContours(
    projections: FaceProjectionResult[],
    pathsOverride?: BigXY[][][]
  ): BigXY[][];

  /**
   * Performs boolean union on path arrays to get outer contours.
   * 
   * @param paths - Array of path loops (each loop is an array of point arrays)
   * @returns Merged contours
   */
  getContours(paths: BigXY[][][]): BigXY[][];

  /**
   * Converts 2D paths to Polygon objects for geometric operations.
   * 
   * @param paths - Array of path loops
   * @returns Array of Polygon objects
   */
  getPolygons(paths: BigXY[][][]): Polygon[];

  /**
   * Checks if a plane and surface represent the same plane (coplanar within tolerance).
   * 
   * @param plane - Plane to compare
   * @param surface - Surface to compare against
   * @returns True if planes are coplanar
   */
  isTheSamePlane(plane: Plane, surface: Surface): boolean;

  /**
   * Classifies face orientation relative to projection plane.
   * 
   * @param face - Face to classify
   * @param plane - Reference projection plane
   * @returns Classification: 'horizontal' (parallel), 'smooth' (non-planar), or 'other'
   */
  judgeFacePoseType(face: Face, plane: Plane): FacePoseType;

  /**
   * Calculates distance of a face from the projection plane.
   * 
   * @param face - Face to measure
   * @param plane - Reference plane
   * @returns Distance information (absolute and signed)
   */
  calcFaceDistance(face: Face, plane: Plane): FaceDistance;

  /**
   * Calculates distance of a continuous (multi-face) feature from projection plane.
   * 
   * @param continuousFace - Continuous face structure
   * @param plane - Reference plane
   * @returns Distance information
   */
  calcContinousFaceDistance(continuousFace: unknown, plane: Plane): FaceDistance;

  /**
   * Projects a single planar or simple face onto the projection plane.
   * 
   * @param face - Face to project
   * @param plane - Target projection plane
   * @param context - Context with entity/shell tags
   * @returns Projection result or undefined if projection fails
   */
  projectFace(
    face: Face,
    plane: Plane,
    context: ProjectionContext
  ): FaceProjectionResult | undefined;

  /**
   * Projects a continuous (smooth) multi-face feature.
   * 
   * @param continuousFace - Continuous face structure
   * @param plane - Target projection plane
   * @param context - Context with entity/shell tags
   * @returns Projection result
   */
  projectContinousFace(
    continuousFace: unknown,
    plane: Plane,
    context: ProjectionContext
  ): FaceProjectionResult;

  /**
   * Projects non-planar faces using mesh tessellation and contour extraction.
   * 
   * @param face - Non-planar face to project
   * @param plane - Target projection plane
   * @param context - Context with entity/shell tags
   * @returns Array of projection results (may be multiple contours)
   */
  projectNonPlaneFace(
    face: Face,
    plane: Plane,
    context: ProjectionContext
  ): FaceProjectionResult[];
}