/**
 * Geometry utility module providing various geometric calculations and transformations
 * for walls, openings, and other architectural elements.
 */

import type { Vector2, Vector3, Line3, Plane } from 'three';

/**
 * Information about wall geometry including border paths and face points
 */
interface WallGeometryInfo {
  /** The complete border line path of the wall */
  borderlinePath: Vector3[];
  /** Starting point of the inner wall face */
  innerFrom: Vector3;
  /** Ending point of the inner wall face */
  innerTo: Vector3;
  /** Starting point of the outer wall face */
  outerFrom: Vector3;
  /** Ending point of the outer wall face */
  outerTo: Vector3;
  /** Complete geometry vertex array */
  geometry: Vector3[];
  /** Index array referencing geometry vertices */
  indices: number[];
  /** Computed path of inner wall face */
  readonly innerPath: Vector2[] | null;
  /** Computed path of outer wall face */
  readonly outerPath: Vector2[] | null;
  /** Path from outer face starting point to inner face starting point */
  readonly fromPath: Vector3[];
  /** Path from inner face ending point to outer face ending point */
  readonly toPath: Vector3[];
}

/**
 * Dimension information for a wall or wall segment
 */
interface WallDimension {
  /** Starting point of the dimension */
  from: Vector3;
  /** Ending point of the dimension */
  to: Vector3;
  /** Array of walls included in this dimension */
  walls?: WallModel[];
}

/**
 * Mass properties calculation result
 */
interface MassProperties {
  /** Area of the polygon */
  area: number;
  /** Centroid coordinates */
  centroid: Vector2;
  /** Moment of inertia */
  inertia?: number;
}

/**
 * Arc information attached to path points
 */
interface ArcInfo {
  /** Center point of the arc */
  center: Vector3;
  /** Radius of the arc */
  radius: number;
  /** Whether the arc is clockwise */
  clockwise: boolean;
}

/**
 * Extended Vector3 with optional arc information
 */
interface Vector3WithArc extends Vector3 {
  /** Arc information if this point is part of an arc */
  arcInfo?: ArcInfo;
}

/**
 * Extended Vector2 array with arc path information
 */
interface PointsWithArcs extends Array<Vector2> {
  /** Segmented arc paths within the point array */
  readonly arcPaths: Vector2[][];
}

/**
 * Offset calculation result for content base
 */
interface ContentBaseOffset {
  /** Horizontal offset along the wall */
  offsetX: number;
  /** Vertical offset from the base */
  offsetY: number;
}

/**
 * Wall scope boundary points
 */
interface WallScopePoints {
  /** Top left corner */
  topLeft: Vector3;
  /** Bottom left corner */
  bottomLeft: Vector3;
  /** Bottom right corner */
  bottomRight: Vector3;
  /** Top right corner */
  topRight: Vector3;
}

/**
 * Complete wall scope information
 */
interface WallScope {
  /** Inner face boundary points */
  innerPoints: WallScopePoints;
  /** Outer face boundary points */
  outerPoints: WallScopePoints;
}

/**
 * 2D scope rectangle
 */
interface Scope2D {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * Wall face profile information
 */
interface WallFaceProfile {
  /** Starting point of the profile */
  from: Vector3;
  /** Ending point of the profile */
  to: Vector3;
}

/**
 * Wall model interface
 */
interface WallModel {
  /** Previous wall in the chain */
  prev?: WallModel;
  /** Next wall in the chain */
  next?: WallModel;
  /** Wall starting point */
  from: Vector3;
  /** Wall ending point */
  to: Vector3;
  /** Wall height in 3D space */
  height3d: number;
  /** Wall identifier */
  id: string;
  /** Room information associated with the wall */
  roomInfos: RoomInfo[];
  /** Left face identifiers */
  leftFaces: Record<string, unknown>;
  /** Right face identifiers */
  rightFaces: Record<string, unknown>;
  /** Check if instance is of given class */
  instanceOf(className: string): boolean;
  /** Get parent room of the wall */
  getParentRoom(): RoomModel | undefined;
}

/**
 * Opening model (door, window, etc.)
 */
interface OpeningModel {
  /** Profile string data */
  profile: string;
  /** Horizontal scale factor */
  XScale: number;
  /** Vertical scale factor */
  ZScale: number;
  /** Vertical size */
  ZSize: number;
  /** Opening identifier */
  id: string;
  /** Check if instance is of given class */
  instanceOf(className: string): boolean;
  /** Get pocket information if available */
  getPocket?(): PocketInfo | undefined;
  /** Get unique parent element */
  getUniqueParent(): ModelElement;
  /** Get paths coplanar with wall */
  getPathsCoplanarWithWall(wall: WallModel, options?: unknown): Vector3[][][];
  /** Get window holes for corner windows */
  getWindowHoles?(): OpeningModel[];
}

/**
 * Pocket information for doors
 */
interface PocketInfo {
  /** Horizontal size of the pocket */
  XSize: number;
  /** Pocket side: 'inner' or 'outer' */
  side: 'inner' | 'outer';
  /** Outer thickness */
  outerThickness?: number;
  /** Inner thickness */
  thickness?: number;
  /** Parent element */
  parent: ModelElement;
}

/**
 * Room model interface
 */
interface RoomModel {
  /** Room identifier */
  id: string;
}

/**
 * Room information
 */
interface RoomInfo {
  /** Associated face identifiers */
  faces: unknown[];
}

/**
 * Face model
 */
interface FaceModel {
  /** Face identifier */
  id: string;
  /** Room information array */
  roomInfos: RoomInfo[];
}

/**
 * Generic model element
 */
interface ModelElement {
  /** Element identifier */
  id: string;
  /** Check if instance is of given class */
  instanceOf(className: string): boolean;
  /** Get unique parent element */
  getUniqueParent?(): ModelElement;
  /** Host wall or element */
  host?: WallModel;
  /** Show pocket flag */
  showPocket?: boolean;
  /** Get window pockets */
  getWindowPockets?(): Array<{ parameters: { profileData: { profileSizeX: number } } }>;
}

/**
 * Geometry data from geometry manager
 */
interface GeometryData {
  /** Vertex array */
  geometry: Vector3[];
  /** Index array */
  indices: number[];
}

/**
 * Arc segments configuration
 */
interface ArcSegmentsOptions {
  /** Number of segments to divide the arc */
  segments?: number;
}

/**
 * GeometryUtil - Utility class for geometric calculations
 * Provides methods for wall geometry analysis, dimension calculation,
 * path manipulation, and collision detection.
 */
export declare class GeometryUtil {
  /**
   * Get detailed geometry information for a wall
   * @param wall - The wall model to analyze
   * @returns Wall geometry information including inner/outer paths and boundary points
   */
  static getWallGeometryInfo(wall: WallModel): WallGeometryInfo | undefined;

  /**
   * Get dimension information for a wall including connected walls in line
   * @param wall - The wall model to measure
   * @returns Dimension with from/to points and connected walls array
   */
  static getWallDimension(wall: WallModel): WallDimension | undefined;

  /**
   * Find all walls that are in line with the given wall
   * @param wall - The starting wall
   * @returns Array of walls in the same line
   */
  static findWallsInLine(wall: WallModel): WallModel[];

  /**
   * Get inner dimension points for a series of connected walls
   * @param walls - Array of connected walls
   * @returns Dimension from/to points along inner face
   */
  static getInnerDimension(walls: WallModel[]): { from: Vector3; to: Vector3 } | undefined;

  /**
   * Filter neighboring walls based on room and polygon criteria
   * @param walls - Candidate wall array
   * @param excludeWalls - Walls to exclude from results
   * @param room - Optional room for filtering
   * @returns Filtered array of neighboring walls
   * @internal
   */
  static _filterNerghborWalls(
    walls: WallModel[],
    excludeWalls: WallModel[],
    room?: RoomModel
  ): WallModel[];

  /**
   * Get colinear walls connected to the previous end of a wall
   * @param wall - The wall to check
   * @returns Array of previous colinear walls
   * @internal
   */
  static _getPrevCowalls(wall: WallModel): WallModel[];

  /**
   * Get colinear walls connected to the next end of a wall
   * @param wall - The wall to check
   * @returns Array of next colinear walls
   * @internal
   */
  static _getNextCowalls(wall: WallModel): WallModel[];

  /**
   * Convert 3D points to 2D points, handling arc segments
   * @param points - Array of 3D points (may contain arc info)
   * @param closed - Whether the path should be closed
   * @returns 2D point array with arc path information
   */
  static getPoints(points: Vector3WithArc[], closed?: boolean): PointsWithArcs | null;

  /**
   * Generate discrete points along an arc
   * @param arc - The arc ellipse curve
   * @param options - Optional segment count configuration
   * @returns Array of points along the arc
   */
  static getArcPoints(arc: THREE.EllipseCurve, options?: ArcSegmentsOptions): Vector2[];

  /**
   * Calculate mass properties (area, centroid) for a closed polygon
   * @param points - Array of points defining the polygon
   * @returns Mass properties including area and centroid
   */
  static getMassProperties(points: Vector3[]): MassProperties[];

  /**
   * Calculate the total perimeter length of a path
   * @param points - Array of points (may contain arc info)
   * @returns Total perimeter length
   */
  static getPathPerimeter(points: Vector3WithArc[]): number;

  /**
   * Get 2D scope coordinates for content placed on a wall
   * @param contentPosition - 3D position of the content
   * @param wall - Host wall model
   * @returns Array of 2D scope corner points
   */
  static getContentBaseWallScope(contentPosition: Vector3, wall: WallModel): Scope2D[] | undefined;

  /**
   * Get 2D loop representing an opening profile
   * @param opening - The opening model (door, window, etc.)
   * @param face - Optional face for orientation
   * @returns Array of 2D points forming the opening loop
   */
  static getOpeningLoop(opening: OpeningModel, face?: FaceModel): Vector2[] | undefined;

  /**
   * Calculate offset of content base relative to wall coordinate system
   * @param contentPosition - 3D position of the content
   * @param wall - Host wall model
   * @param basePoint - Reference base point
   * @returns Offset in X and Y directions
   * @internal
   */
  static _getOffsetContentBase(
    contentPosition: Vector3,
    wall: WallModel,
    basePoint: Vector3
  ): ContentBaseOffset;

  /**
   * Get clipping loop for an opening with offset applied
   * @param opening - The opening model
   * @param wall - Host wall model
   * @param basePoint - Reference base point
   * @returns Array of 2D points forming the clip loop
   * @internal
   */
  static _getOpeningClipLoop(
    opening: OpeningModel,
    wall: WallModel,
    basePoint: Vector3
  ): Vector2[];

  /**
   * Get clipping loops for all holes in a corner window
   * @param cornerWindow - The corner window model
   * @param wall - Host wall model
   * @param basePoint - Reference base point
   * @returns Array of clip loops
   * @internal
   */
  static _getCornerWindowClipLoops(
    cornerWindow: OpeningModel,
    wall: WallModel,
    basePoint: Vector3
  ): Vector2[][];

  /**
   * Calculate vector perpendicular to a wall
   * @param wall - The wall model
   * @returns Normalized perpendicular vector
   */
  static getVerticalToWall(wall: WallModel): Vector3;

  /**
   * Get clipping loops for customized model paths
   * @param customModel - The customized model
   * @param wall - Host wall model
   * @param basePoint - Reference base point
   * @returns Array of clip loops
   * @internal
   */
  static _getCustomizedClipLoops(
    customModel: OpeningModel,
    wall: WallModel,
    basePoint: Vector3
  ): Vector2[][] | undefined;

  /**
   * Get all obstacle loops for content base collision detection
   * @param basePoint - Reference base point on wall
   * @param obstacles - Array of obstacle models (openings, windows, etc.)
   * @param wall - Host wall model
   * @returns Array of obstacle loops in wall coordinate system
   */
  static getContentBaseObstacleLoops(
    basePoint: Vector3,
    obstacles: ModelElement[],
    wall: WallModel
  ): Vector2[][];

  /**
   * Get profile geometry for a wall side face
   * @param face - The face model
   * @returns Profile with from/to points, or undefined if not found
   */
  static getWallSideFaceProfile(face: FaceModel): WallFaceProfile | undefined;

  /**
   * Extract points from a topology loop structure
   * @param loop - The topology loop
   * @returns Array of 2D points with arc information
   */
  static getLoopPoints(loop: unknown): Vector2[] | PointsWithArcs;
}