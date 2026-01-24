/**
 * poly2tri.js - Fast Delaunay Triangulation
 * Main module exports for the poly2tri library
 */

/**
 * Library version string
 */
export const VERSION: string;

/**
 * Custom error class for point-related errors
 */
export class PointError extends Error {
  /**
   * Creates a new PointError
   * @param message - Error message describing the point-related issue
   */
  constructor(message?: string);
}

/**
 * Represents a 2D point in the triangulation
 */
export class Point {
  /**
   * X coordinate
   */
  x: number;
  
  /**
   * Y coordinate
   */
  y: number;
  
  /**
   * Creates a new Point
   * @param x - X coordinate
   * @param y - Y coordinate
   */
  constructor(x: number, y: number);
  
  /**
   * Converts the point to a string representation
   */
  toString(): string;
  
  /**
   * Clones the point
   */
  clone(): Point;
  
  /**
   * Sets the coordinates
   * @param x - X coordinate
   * @param y - Y coordinate
   */
  set(x: number, y: number): void;
  
  /**
   * Checks if two points are equal
   * @param point - Point to compare with
   */
  equals(point: Point): boolean;
}

/**
 * Represents a triangle formed by three points
 */
export class Triangle {
  /**
   * Triangle vertices (always 3 points)
   */
  points: [Point, Point, Point];
  
  /**
   * Neighboring triangles
   */
  neighbors: [Triangle | null, Triangle | null, Triangle | null];
  
  /**
   * Interior flags for each edge
   */
  interior: [boolean, boolean, boolean];
  
  /**
   * Creates a new Triangle
   * @param pointA - First vertex
   * @param pointB - Second vertex
   * @param pointC - Third vertex
   */
  constructor(pointA: Point, pointB: Point, pointC: Point);
  
  /**
   * Gets a point by index
   * @param index - Point index (0-2)
   */
  getPoint(index: number): Point;
  
  /**
   * Gets a neighbor by index
   * @param index - Neighbor index (0-2)
   */
  getNeighbor(index: number): Triangle | null;
  
  /**
   * Checks if the triangle contains a specific edge
   * @param edgeStart - Edge start point
   * @param edgeEnd - Edge end point
   */
  containsEdge(edgeStart: Point, edgeEnd: Point): boolean;
  
  /**
   * Checks if the triangle contains a specific point
   * @param point - Point to check
   */
  containsPoint(point: Point): boolean;
}

/**
 * Sweep context for the triangulation algorithm
 * Manages the state and configuration of the sweep-line triangulation
 */
export class SweepContext {
  /**
   * Creates a new SweepContext
   * @param contour - Array of points defining the outer contour (must be CCW)
   * @param options - Optional configuration
   */
  constructor(contour: Point[], options?: SweepContextOptions);
  
  /**
   * Adds a hole (inner contour) to the triangulation
   * @param hole - Array of points defining the hole (must be CW)
   */
  addHole(hole: Point[]): void;
  
  /**
   * Adds a Steiner point (interior point) to the triangulation
   * @param point - Steiner point to add
   */
  addPoint(point: Point): void;
  
  /**
   * Gets the resulting triangles after triangulation
   */
  getTriangles(): Triangle[];
  
  /**
   * Gets all points in the context
   */
  getPoints(): Point[];
}

/**
 * Options for configuring the SweepContext
 */
export interface SweepContextOptions {
  /**
   * Whether to automatically compute triangle neighbors
   * @default false
   */
  cloneArrays?: boolean;
}

/**
 * Performs Delaunay triangulation on a set of points
 * @param context - Sweep context containing the geometry to triangulate
 */
export function triangulate(context: SweepContext): void;

/**
 * Legacy namespace containing triangulation functions
 */
export namespace sweep {
  /**
   * Performs Delaunay triangulation (alias for triangulate)
   * @param context - Sweep context containing the geometry to triangulate
   */
  function Triangulate(context: SweepContext): void;
}

/**
 * Restores the previous poly2tri global variable and returns this library
 * Used to avoid naming conflicts in browser environments
 */
export function noConflict(): typeof import('./poly2tri');