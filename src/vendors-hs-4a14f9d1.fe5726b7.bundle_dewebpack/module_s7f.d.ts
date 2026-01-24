/**
 * Earcut triangulation library - Type definitions
 * A fast polygon triangulation library for JavaScript
 */

/**
 * Represents a node in the doubly-linked list used for triangulation
 */
interface LinkedListNode {
  /** Index of the vertex in the original input array */
  i: number;
  /** X coordinate of the vertex */
  x: number;
  /** Y coordinate of the vertex */
  y: number;
  /** Previous node in the linked list */
  prev: LinkedListNode | null;
  /** Next node in the linked list */
  next: LinkedListNode | null;
  /** Z-order curve value for spatial indexing */
  z: number;
  /** Previous node in Z-order */
  prevZ: LinkedListNode | null;
  /** Next node in Z-order */
  nextZ: LinkedListNode | null;
  /** Flag indicating if this is a Steiner point */
  steiner: boolean;
}

/**
 * Result of the flatten operation
 */
interface FlattenResult {
  /** Flattened array of vertex coordinates */
  vertices: number[];
  /** Array of hole indices */
  holes: number[];
  /** Number of dimensions per vertex (2 for 2D, 3 for 3D) */
  dimensions: number;
}

/**
 * Main triangulation function using Earcut algorithm
 * @param data - Flat array of vertex coordinates [x0, y0, x1, y1, ...]
 * @param holeIndices - Array of hole indices if any (e.g., [5] for a hole starting at the 5th vertex)
 * @param dimensions - Number of coordinates per vertex (default: 2)
 * @returns Array of triangle indices
 */
declare function earcut(
  data: number[],
  holeIndices?: number[] | null,
  dimensions?: number
): number[];

declare namespace earcut {
  /**
   * Calculate the deviation of a triangulation from the original polygon area
   * Used to verify the quality of the triangulation
   * @param data - Flat array of vertex coordinates
   * @param holeIndices - Array of hole indices
   * @param dimensions - Number of coordinates per vertex
   * @param triangles - Array of triangle indices from triangulation result
   * @returns Deviation value (0 means perfect match)
   */
  function deviation(
    data: number[],
    holeIndices: number[] | null,
    dimensions: number,
    triangles: number[]
  ): number;

  /**
   * Flatten nested polygon data into the format expected by earcut
   * @param data - Nested array where data[0] is outer ring and data[1..n] are holes
   * @returns Flattened polygon data with vertices, holes, and dimensions
   * @example
   * // Input: [[[0,0], [100,0], [100,100], [0,100]], [[20,20], [80,20], [80,80], [20,80]]]
   * // Output: { vertices: [0,0,100,0,100,100,0,100,20,20,80,20,80,80,20,80], holes: [4], dimensions: 2 }
   */
  function flatten(data: number[][][]): FlattenResult;
}

export = earcut;
export as namespace earcut;