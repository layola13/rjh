/**
 * poly2tri.js - 2D constrained Delaunay triangulation library
 * Main module exports
 */

/**
 * Library version string
 */
export const VERSION: string;

/**
 * Custom error class for Point-related errors
 */
export class PointError extends Error {
  constructor(message?: string);
}

/**
 * Represents a 2D point in the triangulation
 */
export class Point {
  /** X coordinate */
  x: number;
  
  /** Y coordinate */
  y: number;
  
  /**
   * Creates a new Point
   * @param x - The x coordinate
   * @param y - The y coordinate
   */
  constructor(x: number, y: number);
  
  /**
   * Creates a copy of this point
   */
  clone(): Point;
  
  /**
   * Sets the coordinates of this point
   */
  set(x: number, y: number): void;
  
  /**
   * Checks equality with another point
   */
  equals(point: Point): boolean;
}

/**
 * Represents a triangle in the triangulation mesh
 */
export class Triangle {
  /** Array of three points forming the triangle */
  points: [Point, Point, Point];
  
  /** Adjacent triangles (up to 3 neighbors) */
  neighbors: [Triangle | null, Triangle | null, Triangle | null];
  
  /**
   * Creates a new Triangle
   * @param pointA - First vertex
   * @param pointB - Second vertex
   * @param pointC - Third vertex
   */
  constructor(pointA: Point, pointB: Point, pointC: Point);
  
  /**
   * Gets a point by index (0-2)
   */
  getPoint(index: number): Point;
  
  /**
   * Gets a neighbor by index (0-2)
   */
  getNeighbor(index: number): Triangle | null;
  
  /**
   * Checks if this triangle contains the given point
   */
  containsPoint(point: Point): boolean;
  
  /**
   * Checks if this triangle contains the given edge
   */
  containsEdge(edgePoints: [Point, Point]): boolean;
}

/**
 * Configuration and context for the sweep-line triangulation algorithm
 */
export class SweepContext {
  /**
   * Creates a new SweepContext
   * @param contour - Array of points forming the outer boundary (polyline)
   */
  constructor(contour: Point[]);
  
  /**
   * Adds a hole to the triangulation
   * @param hole - Array of points forming a hole boundary
   */
  addHole(hole: Point[]): void;
  
  /**
   * Adds a Steiner point (interior point that must be included)
   * @param point - The Steiner point to add
   */
  addPoint(point: point): void;
  
  /**
   * Gets the resulting triangles after triangulation
   * @returns Array of triangles forming the mesh
   */
  getTriangles(): Triangle[];
}

/**
 * Performs constrained Delaunay triangulation on a polygon
 * @param context - The sweep context containing contour and constraints
 * @returns The same context with triangulation results
 */
export function triangulate(context: SweepContext): SweepContext;

/**
 * Namespace containing sweep algorithm functions
 */
export namespace sweep {
  /**
   * Alias for the triangulate function
   */
  const Triangulate: typeof triangulate;
}

/**
 * Restores the previous global poly2tri value and returns this module
 * (for use in browser environments to avoid naming conflicts)
 */
export function noConflict(): typeof import('./index');