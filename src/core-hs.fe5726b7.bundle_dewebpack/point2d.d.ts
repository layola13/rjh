/**
 * 2D point geometry module
 * Provides Point2d class and utility functions for working with 2D points
 */

/**
 * Interface representing a 2D point with x and y coordinates
 */
export interface IPoint2d {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * 2D Point class with geometric operations
 * Represents a point in 2D Cartesian coordinate system
 */
export declare class Point2d implements IPoint2d {
  /** X coordinate of the point */
  x: number;
  
  /** Y coordinate of the point */
  y: number;

  /**
   * Creates a new Point2d instance
   * @param x - X coordinate (default: 0)
   * @param y - Y coordinate (default: 0)
   */
  constructor(x?: number, y?: number);

  /**
   * Factory method to create a Point2d from an IPoint2d interface
   * @param point - Point-like object with x and y properties
   * @returns New Point2d instance
   */
  static create(point: IPoint2d): Point2d;

  /**
   * Sets the coordinates of this point
   * @param x - New X coordinate
   * @param y - New Y coordinate
   */
  set(x: number, y: number): void;

  /**
   * Gets the geometry type identifier
   * @returns GeometryObjectType enum value for Point2d
   */
  getType(): GeometryObjectType;

  /**
   * Assigns coordinates from another point to this point
   * @param point - Source point to copy from
   */
  assign(point: IPoint2d): void;

  /**
   * Serializes the point to an array format
   * @returns Array containing [x, y] coordinates
   */
  dump(): [number, number];

  /**
   * Deserializes and loads point data
   * @param point - Point data to load
   */
  load(point: IPoint2d): void;

  /**
   * Creates a deep copy of this point
   * @returns New Point2d instance with same coordinates
   */
  clone(): Point2d;
}

/**
 * Type guard to check if an object is a valid IPoint2d
 * @param value - Value to check
 * @returns True if value is an object with numeric x and y properties
 */
export declare function isIPoint2d(value: unknown): value is IPoint2d;

/**
 * Type guard to check if an array contains only IPoint2d objects
 * @param value - Value to check
 * @returns True if value is an array of IPoint2d objects
 */
export declare function isIPoint2dArray(value: unknown): value is IPoint2d[];

/**
 * Type guard to check if a value is a 2D array of IPoint2d objects
 * @param value - Value to check
 * @returns True if value is a 2D array where each element is an IPoint2d array
 */
export declare function isIPoint2dArrayArray(value: unknown): value is IPoint2d[][];

/**
 * Creates a deep clone of an array of points
 * @param points - Array of points to clone, or undefined
 * @returns New array with cloned point objects, or the original value if undefined
 */
export declare function clonePoint2ds<T extends IPoint2d[] | undefined>(points: T): T;

/**
 * Enum defining geometry object types
 */
export declare enum GeometryObjectType {
  Point2d = "Point2d"
}