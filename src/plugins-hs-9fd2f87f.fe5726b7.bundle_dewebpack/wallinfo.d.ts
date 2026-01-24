/**
 * Wall information module for floor plan processing
 * Handles wall geometry, overlaps, regions, and opening calculations
 */

import { Vector2, Vector3, Polygon, Loop, MathUtil } from './geometry';
import { HSCore } from './core';
import { DiffToolUtil } from './diff-tools';
import { WallRegionDiffType } from './wall-region-types';

/**
 * Represents a vertex point in 2D space
 */
interface Vertex {
  x: number;
  y: number;
}

/**
 * Represents a wall opening (door, window, etc.)
 */
interface WallOpening {
  id: string;
  ZSize: number;
}

/**
 * Represents a wall path segment
 */
interface PathSegment {
  from: Vector2;
  to: Vector2;
}

/**
 * Represents a wall region with linked walls
 */
interface WallRegion {
  path: {
    outer: Vector2[];
  };
  linkWallIds: string[];
}

/**
 * Wall builder region information
 */
interface WallBuilderRegion {
  regions: WallRegion[];
}

/**
 * Represents a complete wall entity
 */
interface Wall {
  id: string;
  from: Vertex;
  to: Vertex;
  width: number;
  height3d: number;
  wallType: string;
  isLoadBearing: boolean;
  path: Vector2[];
  crossPath: Vector2[];
  openings: Record<string, WallOpening>;
  parametricOpenings: Map<string, WallOpening>;
}

/**
 * Layer containing room builder functionality
 */
interface Layer {
  roomBuilder: {
    getWallInfo(wallId: string): WallBuilderRegion;
  };
}

/**
 * Floor plan information manager
 */
interface FloorplanInfo {
  addShareWallRegionInfo(
    region: WallRegion,
    wallId: string,
    diffType: WallRegionDiffType
  ): void;
  isWallRegionBelong(region: WallRegion, wallId: string): boolean;
  getOpeningPathById(openingId: string): PathSegment[];
}

/**
 * Parameter range representing overlap or region boundaries
 * [start, end] where 0 <= start < end <= 1
 */
type ParameterRange = [number, number];

/**
 * Region parameters with associated wall region
 */
interface RegionParams {
  params: ParameterRange;
  wallRegion: WallRegion;
}

/**
 * Non-overlapped wall segment data
 */
interface WallSegmentData {
  /** Center point of the segment */
  center: Vector2;
  /** Width of the segment */
  width: number;
  /** Height of the segment */
  height: number;
  /** Rotation angle in radians */
  rotation: number;
  /** Left parameter (0-1) */
  left: number;
  /** Right parameter (0-1) */
  right: number;
  /** Total area occupied by openings */
  openingArea: number;
}

/**
 * Manages wall information including geometry, overlaps, and regions
 * Used for floor plan diff calculations and wall segment processing
 */
export declare class WallInfo {
  private readonly _wall: Wall;
  private readonly _layer: Layer;
  private readonly _floorplanInfo: FloorplanInfo;
  private readonly _oriFrom: Vector2;
  private readonly _oriTo: Vector2;
  private _from: Vector2;
  private _to: Vector2;
  private readonly _id: string;
  private readonly _isArc: boolean;
  private _overlapParameters: ParameterRange[];
  private _leftParams?: ParameterRange[];

  /**
   * Creates a new WallInfo instance
   * @param wall - The wall entity to process
   * @param layer - The layer containing room builder data
   * @param floorplanInfo - Floor plan information manager
   */
  constructor(wall: Wall, layer: Layer, floorplanInfo: FloorplanInfo);

  /**
   * Gets the wall entity
   */
  get wall(): Wall;

  /**
   * Checks if the wall is an arc
   */
  get isArc(): boolean;

  /**
   * Gets the start point of the wall (cloned)
   */
  get from(): Vector2;

  /**
   * Gets the end point of the wall (cloned)
   */
  get to(): Vector2;

  /**
   * Gets the wall ID
   */
  getId(): string;

  /**
   * Retrieves wall edge data from all regions
   * @returns Flattened array of outer path points from all regions
   */
  getWallEdgeData(): Vector2[];

  /**
   * Gets wall start and end points as 3D vectors
   * @returns Array containing from and to points as Vector3
   */
  getWallFromToData(): Vector3[];

  /**
   * Adjusts wall from/to points based on cross-section outline
   * Updates _from and _to to match the actual wall geometry
   */
  resizeFromToByOutline(): void;

  /**
   * Creates a 2D vector from a vertex
   * @param vertex - The vertex to convert
   * @returns A new Vector2 instance
   */
  createVec2ByVertex(vertex: Vertex): Vector2;

  /**
   * Checks if wall properties match another wall
   * @param other - Another WallInfo to compare
   * @returns True if width, height, type, and load-bearing status match
   */
  propertyEquals(other: WallInfo | null): boolean;

  /**
   * Adds overlap information from another wall
   * @param other - The overlapping wall
   */
  addOverlapInfo(other: WallInfo): void;

  /**
   * Calculates overlap parameters between this wall and another
   * @param other - The wall to check overlap with
   * @returns Array of parameter ranges where walls overlap
   */
  getOverlappedParameters(other: WallInfo | null): ParameterRange[];

  /**
   * Checks if this wall overlaps with another wall
   * @param other - The wall to check
   * @returns True if walls are parallel segments that overlap
   */
  isOverlapped(other: WallInfo | null): boolean;

  /**
   * Computes outlines for non-overlapped wall segments
   * @returns Array of outline polygons for each non-overlapped segment
   */
  getNonOverlappedOutlines(): Vector2[][];

  /**
   * Pre-calculates wall region information for shared walls
   * Identifies regions linked to multiple walls and stores union data
   */
  preCalcWallRegionInfo(): void;

  /**
   * Calculates parameter ranges for non-overlapped segments
   * @returns Sorted and merged parameter ranges
   */
  calcNonOverlapParam(): ParameterRange[];

  /**
   * Gets remaining parameter ranges after removing overlaps and regions
   * @returns Cached or newly calculated left parameters
   */
  getLeftParams(): ParameterRange[];

  /**
   * Interpolates a point along the wall at a given parameter
   * @param t - Parameter value (0-1)
   * @returns Interpolated point, adjusted for wall geometry at endpoints
   */
  getPointAt(t: number): Vector2;

  /**
   * Finds points adjacent to a target point in a path
   * @param path - Array of points forming a closed path
   * @param target - The point to find neighbors for
   * @returns Array of neighboring points (empty if not found)
   */
  getNearPoints(path: Vector2[], target: Vector2): Vector2[];

  /**
   * Gets data for all non-overlapped wall segments
   * @returns Array of segment data including geometry and opening areas
   */
  getNonOverlappedData(): WallSegmentData[];

  /**
   * Calculates the length of an opening within a segment
   * @param segmentStart - Start point of the segment
   * @param segmentEnd - End point of the segment
   * @param openingId - ID of the opening to measure
   * @returns Length of opening within the segment
   */
  calcModifyOpeningLength(
    segmentStart: Vector2,
    segmentEnd: Vector2,
    openingId: string
  ): number;

  /**
   * Merges left parameters with wall region parameters
   * @param leftParams - Non-overlapped parameter ranges
   * @returns Intersection of left params with region params
   */
  mergeLeftParamsAndRegionParams(leftParams: ParameterRange[]): ParameterRange[];

  /**
   * Computes union of all wall region parameters
   * @param leftParams - Base parameter ranges to compare against
   * @returns Merged and sorted region parameter ranges
   */
  wallRegionParamsUion(leftParams: ParameterRange[]): ParameterRange[];

  /**
   * Calculates how a region intersects with parameter ranges
   * @param params - Parameter ranges to check against
   * @param regionParams - Region parameter range
   * @returns Diff type indicating full, partial, or no overlap
   */
  calcUnionPart(params: ParameterRange[], regionParams: ParameterRange): WallRegionDiffType;

  /**
   * Extracts parameter range for a wall region
   * @param region - The wall region to analyze
   * @returns Region parameters with associated wall region
   */
  getRegionParams(region: WallRegion): RegionParams;

  /**
   * Checks if a region is shared by multiple walls
   * @param region - The wall region to check
   * @returns True if linked to more than one wall
   */
  isShareRegion(region: WallRegion): boolean;

  /**
   * Checks if a point is in a modified (non-overlapped) segment
   * @param point - The point to check
   * @returns True if point is not within any overlapped segment
   */
  isSegmentModified(point: Vertex): boolean;

  /**
   * Gets all overlap parameter ranges
   * @returns Array of overlapping parameter ranges
   */
  getOverlapParameters(): ParameterRange[];
}