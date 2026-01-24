/**
 * Polygon winding order utilities
 * Provides functions for calculating and manipulating polygon winding orders,
 * areas, centroids, and performing boolean operations on polygons.
 */

/**
 * Unknown winding order
 */
export const WINDING_UNKNOWN: 0;

/**
 * Counter-clockwise winding order
 */
export const WINDING_CCW: 1;

/**
 * Clockwise winding order
 */
export const WINDING_CW: 2;

/**
 * Winding order type
 */
export type WindingOrder = 0 | 1 | 2;

/**
 * 2D or 3D point coordinate
 */
export type Point = [number, number] | [number, number, number];

/**
 * Polygon represented as an array of points
 */
export type Polygon = Point[];

/**
 * Bounding box of a polygon
 */
export interface Bounds {
  /** Minimum X coordinate */
  xMin: number;
  /** Minimum Y coordinate */
  yMin: number;
  /** Maximum X coordinate */
  xMax: number;
  /** Maximum Y coordinate */
  yMax: number;
}

/**
 * Calculate the counter-clockwise test for three points
 * Returns positive if counter-clockwise, negative if clockwise, zero if collinear
 * 
 * @param pointA - First point
 * @param pointB - Second point
 * @param pointC - Third point
 * @returns CCW test result
 */
export function ccw(pointA: Point, pointB: Point, pointC: Point): number;

/**
 * Calculate the normal vector of a polygon
 * 
 * @param polygon - The polygon vertices
 * @param useNewell - Whether to use Newell's method for degenerate cases
 * @returns Normal vector as [x, y, z] or null if cannot be calculated
 */
export function normal(polygon: Polygon, useNewell?: boolean): [number, number, number] | null;

/**
 * Calculate the signed area of a polygon
 * Positive area indicates CCW winding, negative indicates CW winding
 * 
 * @param polygon - The polygon vertices
 * @param normalVector - Optional pre-calculated normal vector for 3D polygons
 * @returns Signed area of the polygon
 */
export function area(polygon: Polygon, normalVector?: [number, number, number] | null): number;

/**
 * Calculate the centroid (geometric center) of a polygon
 * 
 * @param polygon - The polygon vertices
 * @returns Centroid as [x, y]
 */
export function centroid(polygon: Polygon): [number, number];

/**
 * Check if a polygon has counter-clockwise winding order
 * 
 * @param polygon - The polygon vertices
 * @param normalVector - Optional pre-calculated normal vector
 * @returns True if counter-clockwise
 */
export function is_ccw(polygon: Polygon, normalVector?: [number, number, number] | null): boolean;

/**
 * Check if a polygon has clockwise winding order
 * 
 * @param polygon - The polygon vertices
 * @param normalVector - Optional pre-calculated normal vector
 * @returns True if clockwise
 */
export function is_cw(polygon: Polygon, normalVector?: [number, number, number] | null): boolean;

/**
 * Determine the winding order of a polygon
 * 
 * @param polygon - The polygon vertices
 * @param normalVector - Optional pre-calculated normal vector
 * @returns WINDING_CW, WINDING_CCW, or WINDING_UNKNOWN
 */
export function winding(polygon: Polygon, normalVector?: [number, number, number] | null): WindingOrder;

/**
 * Calculate the axis-aligned bounding box of a polygon
 * 
 * @param polygon - The polygon vertices
 * @returns Bounding box coordinates
 */
export function bounds(polygon: Polygon): Bounds;

/**
 * Ensure a polygon has clockwise winding order
 * Reverses the polygon vertices if they are counter-clockwise
 * 
 * @param polygon - The polygon vertices (modified in place)
 * @param normalVector - Optional pre-calculated normal vector
 * @returns The polygon with clockwise winding
 */
export function ensure_cw(polygon: Polygon, normalVector?: [number, number, number] | null): Polygon;

/**
 * Ensure a polygon has counter-clockwise winding order
 * Reverses the polygon vertices if they are clockwise
 * 
 * @param polygon - The polygon vertices (modified in place)
 * @param normalVector - Optional pre-calculated normal vector
 * @returns The polygon with counter-clockwise winding
 */
export function ensure_ccw(polygon: Polygon, normalVector?: [number, number, number] | null): Polygon;

/**
 * Triangulate a polygon with holes using tessellation
 * 
 * @param polygon - The outer polygon boundary
 * @param holes - Array of hole polygons inside the outer boundary
 * @returns Array of triangulated polygons
 */
export function triangulate(polygon: Polygon, holes: Polygon[]): Polygon[];

/**
 * Subtract one or more polygons from a base polygon (boolean difference)
 * 
 * @param basePolygon - The base polygon
 * @param subtractPolygons - Polygons to subtract from the base
 * @returns Array of resulting polygons after subtraction
 */
export function subtract(basePolygon: Polygon, ...subtractPolygons: Polygon[]): Polygon[];

/**
 * Compute the union of multiple polygons (boolean union)
 * 
 * @param polygons - Polygons to union together
 * @returns Array of resulting polygons after union
 */
export function union(...polygons: Polygon[]): Polygon[];

/**
 * Compute the intersection of two polygons (boolean intersection)
 * 
 * @param polygonA - First polygon
 * @param polygonB - Second polygon
 * @returns Array of resulting polygons representing the intersection
 */
export function intersection(polygonA: Polygon, polygonB: Polygon): Polygon[];