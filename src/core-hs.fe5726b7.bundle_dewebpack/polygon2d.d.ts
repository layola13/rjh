/**
 * Polygon2d module - Represents 2D polygons with outer boundary and holes
 */

import { PolyCurve2d, PolyCurve2dDumpData } from './PolyCurve2d';
import { Point2d } from './Point2d';

/**
 * Serialized representation of a Polygon2d
 */
export interface Polygon2dDumpData {
  /** Outer boundary curve data */
  outer: PolyCurve2dDumpData;
  /** Array of hole curve data */
  holes: PolyCurve2dDumpData[];
}

/**
 * Discrete polygon representation with point arrays
 */
export interface DiscretePolygon2d {
  /** Outer boundary points */
  outer: Point2d[];
  /** Arrays of hole points */
  holes: Point2d[][];
}

/**
 * Options for converting polygon to discrete points
 */
export interface DiscreteOptions {
  /** Maximum distance between points (optional) */
  maxDistance?: number;
  /** Minimum number of segments (optional) */
  minSegments?: number;
}

/**
 * Represents a 2D polygon with an outer boundary and optional holes
 */
export declare class Polygon2d {
  /** Outer boundary curve */
  outer: PolyCurve2d;
  
  /** Array of hole curves */
  holes: PolyCurve2d[];

  /**
   * Creates a new empty Polygon2d instance
   */
  constructor();

  /**
   * Creates a Polygon2d from serialized data
   * @param data - Serialized polygon data
   * @returns New Polygon2d instance
   */
  static create(data: Polygon2dDumpData): Polygon2d;

  /**
   * Assigns values from another Polygon2d instance
   * @param source - Source polygon to copy from
   */
  assign(source: Polygon2d): void;

  /**
   * Loads polygon data from serialized format
   * @param data - Serialized polygon data
   */
  load(data: Polygon2dDumpData): void;

  /**
   * Serializes the polygon to a plain object
   * @returns Serialized polygon data
   */
  dump(): Polygon2dDumpData;

  /**
   * Creates a deep copy of this polygon
   * @returns Cloned Polygon2d instance
   */
  clone(): Polygon2d;

  /**
   * Sets polygon from discrete point arrays
   * @param discretePolygon - Polygon defined by point arrays
   */
  setFromDiscretePolygon(discretePolygon: DiscretePolygon2d): void;

  /**
   * Converts polygon to discrete point arrays
   * @param options - Discretization options
   * @returns Discrete polygon representation
   */
  toDiscretePolygon(options?: DiscreteOptions): DiscretePolygon2d;

  /**
   * Checks if a point is inside the polygon
   * @param point - Point to test
   * @param includeOutline - Whether points on the outline count as inside
   * @param tolerance - Numerical tolerance for comparisons
   * @returns True if point is inside the polygon
   */
  isPointInside(
    point: Point2d,
    includeOutline?: boolean,
    tolerance?: number
  ): boolean;

  /**
   * Checks if a point lies on the polygon outline
   * @param point - Point to test
   * @param tolerance - Numerical tolerance for comparisons
   * @returns True if point is on the outline
   */
  isPointOnOutline(point: Point2d, tolerance?: number): boolean;

  /**
   * Checks if this polygon is geometrically identical to another
   * @param other - Polygon to compare with
   * @param tolerance - Numerical tolerance for comparisons
   * @returns True if polygons are the same
   */
  isSamePolygon2d(other: Polygon2d, tolerance?: number): boolean;

  /**
   * Assigns an array of polygons from another array
   * @param target - Target array to populate
   * @param source - Source array to copy from
   */
  static assignArray(target: Polygon2d[], source: Polygon2d[]): void;

  /**
   * Loads an array of polygons from serialized data
   * @param target - Target array to populate
   * @param data - Array of serialized polygon data
   */
  static loadArray(target: Polygon2d[], data: Polygon2dDumpData[]): void;
}

/**
 * Type guard to check if an object is valid Polygon2dDumpData
 * @param data - Object to check
 * @returns True if data matches Polygon2dDumpData structure
 */
export declare function isPolygon2dDumpData(data: unknown): data is Polygon2dDumpData;

/**
 * Type guard to check if an array contains valid Polygon2dDumpData
 * @param data - Array to check
 * @returns True if all elements are Polygon2dDumpData
 */
export declare function isPolygon2dDumpDataArray(data: unknown): data is Polygon2dDumpData[];