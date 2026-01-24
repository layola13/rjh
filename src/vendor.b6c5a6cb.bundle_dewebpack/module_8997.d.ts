/**
 * Earcut triangulation library - TypeScript type definitions
 * A fast polygon triangulation library for JavaScript
 */

/**
 * Represents a node in the doubly-linked polygon vertex list
 */
interface PolygonNode {
  /** Index in the original input array */
  i: number;
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Previous vertex in the polygon ring */
  prev: PolygonNode | null;
  /** Next vertex in the polygon ring */
  next: PolygonNode | null;
  /** Z-order curve value for faster spatial indexing */
  z: number;
  /** Previous vertex in Z-order */
  prevZ: PolygonNode | null;
  /** Next vertex in Z-order */
  nextZ: PolygonNode | null;
  /** Indicates if this is a steiner point */
  steiner: boolean;
}

/**
 * Flattened polygon data structure
 */
interface FlattenedPolygon {
  /** Flat array of vertex coordinates */
  vertices: number[];
  /** Indices where holes start in the vertices array */
  holes: number[];
  /** Number of coordinates per vertex (2 for 2D, 3 for 3D) */
  dimensions: number;
}

/**
 * Main triangulation function - converts a polygon to triangles
 * 
 * @param data - Flat array of vertex coordinates [x0,y0, x1,y1, ...]
 * @param holeIndices - Array of hole starting indices in the data array (optional)
 * @param dimensions - Number of coordinates per vertex (default: 2)
 * @returns Array of triangle vertex indices
 * 
 * @example
 * // Simple triangle
 * earcut([10,0, 0,50, 60,60]); // Returns [1,0,2]
 * 
 * @example
 * // Polygon with a hole
 * const vertices = [...outerRing, ...hole];
 * const holes = [outerRing.length / 2];
 * earcut(vertices, holes, 2);
 */
export default function earcut(
  data: number[],
  holeIndices?: number[] | null,
  dimensions?: number
): number[];

/**
 * Calculates the deviation of the triangulation from the original polygon area
 * Used for verification and quality assessment
 * 
 * @param data - Flat array of vertex coordinates
 * @param holeIndices - Array of hole starting indices
 * @param dimensions - Number of coordinates per vertex
 * @param triangles - Array of triangle indices from earcut()
 * @returns Deviation ratio (0 = perfect match)
 */
export function deviation(
  data: number[],
  holeIndices: number[] | null | undefined,
  dimensions: number,
  triangles: number[]
): number;

/**
 * Converts nested polygon arrays to the flat format required by earcut
 * 
 * @param data - Nested array structure: [[[x,y], [x,y], ...], [[hole vertices], ...], ...]
 * @returns Flattened polygon data with vertices, holes, and dimensions
 * 
 * @example
 * const nested = [
 *   [[0,0], [100,0], [100,100], [0,100]], // outer ring
 *   [[20,20], [80,20], [80,80], [20,80]]  // hole
 * ];
 * const flat = earcut.flatten(nested);
 * const triangles = earcut(flat.vertices, flat.holes, flat.dimensions);
 */
export function flatten(data: number[][][]): FlattenedPolygon;

/**
 * Named exports for CommonJS compatibility
 */
export { earcut, deviation, flatten };