/**
 * Background class for managing 2D polygon regions.
 * Handles creation, manipulation, and transformation of background geometry.
 * @module Background
 */

import type { IPoint2d } from './Point2d';
import type { Polygon2d, Polygon2dDumpData } from './Polygon2d';
import type { DiscretePolygon2d, DiscretePolygon2dData } from './DiscretePolygon2d';
import type { Matrix3 } from 'three';

/**
 * Serialized background data structure.
 */
export interface BackgroundDumpData {
  /** Class identifier for deserialization */
  type: 'background';
  /** Data format version */
  version: string;
  /** Array of polygon region data */
  regions: Polygon2dDumpData[];
}

/**
 * Supported input data formats for background initialization.
 */
export type BackgroundInputData =
  | IPoint2d[]
  | DiscretePolygon2dData
  | DiscretePolygon2dData[]
  | Polygon2dDumpData
  | Polygon2dDumpData[];

/**
 * Options for polygon clipping operations.
 */
export interface ClipOptions {
  /** Type of boolean operation (union, diff, intersection, etc.) */
  operation: unknown;
}

/**
 * Manages a collection of 2D polygon regions representing background geometry.
 * Supports boolean operations, transformations, and point containment queries.
 */
export declare class Background {
  /** Class name identifier used for serialization */
  static readonly ClassName: 'background';

  /** Collection of polygon regions comprising the background */
  regions: Polygon2d[];

  /**
   * Creates a new empty Background instance.
   */
  constructor();

  /**
   * Assigns polygon regions from another background instance.
   * @param source - Source background to copy regions from
   */
  assign(source: Background): void;

  /**
   * Deep copies data from another background instance.
   * @param source - Source background to clone
   */
  copyFrom(source: Background): void;

  /**
   * Creates a deep clone of this background.
   * @returns New background instance with copied data
   */
  clone(): Background;

  /**
   * Checks equality with another background.
   * @param other - Background to compare against
   * @returns True if backgrounds are identical
   */
  equals(other: Background): boolean;

  /**
   * Checks if this background has the same geometry as another.
   * @param other - Background to compare against
   * @param tolerance - Geometric comparison tolerance (default: HSConstants.Constants.TOLERANCE)
   * @returns True if geometries match within tolerance
   */
  isSameBackground(other: Background, tolerance?: number): boolean;

  /**
   * Initializes background from an array of points forming a single polygon.
   * @param points - Array of 2D points defining the outer boundary
   * @param performUnion - Whether to apply boolean union operation (default: true)
   */
  setFromPoints(points: IPoint2d[], performUnion?: boolean): void;

  /**
   * Initializes background from a discrete polygon with outer boundary and holes.
   * @param polygon - Discrete polygon data structure
   * @param performUnion - Whether to apply boolean operations (default: true)
   */
  setFromDiscretePolygon2d(polygon: DiscretePolygon2dData, performUnion?: boolean): void;

  /**
   * Initializes background from multiple discrete polygons.
   * Performs boolean union and hole subtraction if enabled.
   * @param polygons - Array of discrete polygon data
   * @param performUnion - Whether to merge overlapping regions (default: true)
   */
  setFromDiscretePolygon2dArray(polygons: DiscretePolygon2dData[], performUnion?: boolean): void;

  /**
   * Initializes background from serialized polygon data array.
   * @param data - Array of polygon dump data
   */
  setFromPolygon2dDataArray(data: Polygon2dDumpData[]): void;

  /**
   * Initializes background from a single serialized polygon.
   * @param data - Polygon dump data
   */
  setFromPolygon2d(data: Polygon2dDumpData): void;

  /**
   * Initializes background from various supported data formats.
   * Automatically detects and handles different input types.
   * @param data - Input data in any supported format
   * @throws {Error} If data format is not recognized
   */
  setFromData(data: BackgroundInputData): void;

  /**
   * Converts all regions to discrete polygon format.
   * @returns Array of discrete polygons with outer boundaries and holes
   */
  toDiscretePolygons(): DiscretePolygon2d[];

  /**
   * Gets the outer boundary of the first region.
   * @deprecated Should not be called; review logic after usage
   * @returns Points of first polygon's outer boundary, or null if empty
   */
  getFirstPolygonOuter(): IPoint2d[] | null;

  /**
   * Tests if a point lies inside any region.
   * @param point - Point to test
   * @returns True if point is inside any polygon region
   */
  isPointInside(point: IPoint2d): boolean;

  /**
   * Tests if a point lies on the outline of any region.
   * @param point - Point to test
   * @param tolerance - Distance tolerance (default: HSConstants.Constants.TOLERANCE)
   * @returns True if point is on any outline within tolerance
   */
  isPointOnOutline(point: IPoint2d, tolerance?: number): boolean;

  /**
   * Migrates data from legacy format.
   * @param data - Legacy background data
   */
  migrate(data: unknown): void;

  /**
   * Loads background from serialized data.
   * Handles both current and legacy formats.
   * @param data - Serialized background data
   */
  load(data: BackgroundDumpData | unknown): void;

  /**
   * Flips all regions vertically around the middle Y coordinate.
   */
  flipY(): void;

  /**
   * Computes the transformation matrix for vertical flipping.
   * @returns Matrix that flips geometry around middle Y axis
   */
  getMatrixFlipY(): Matrix3;

  /**
   * Calculates twice the middle Y coordinate of all regions.
   * Used for flip transformations.
   * @returns Double of the vertical center coordinate, or 0 if empty
   */
  getDoubleMiddleY(): number;

  /**
   * Serializes background to JSON-compatible format.
   * @returns Background dump data structure
   */
  dump(): BackgroundDumpData;

  /**
   * Applies a 2D transformation matrix to all regions.
   * Handles curve transformations and reverses winding order if determinant is negative.
   * @param matrix - 3x3 transformation matrix
   */
  transform(matrix: Matrix3): void;

  /**
   * Removes all regions, resetting to empty state.
   */
  clear(): void;

  /**
   * Validates that the background contains at least one region.
   * @returns True if background has one or more regions
   */
  verify(): boolean;
}