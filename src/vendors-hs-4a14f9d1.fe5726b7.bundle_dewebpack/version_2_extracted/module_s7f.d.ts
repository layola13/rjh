/**
 * Earcut triangulation algorithm for polygon triangulation
 * Converts a polygon with holes into a triangulated mesh
 */

/**
 * Node in the linked list representing a polygon vertex
 */
interface PolygonNode {
  /** Vertex index in the original input array */
  i: number;
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Previous vertex in the polygon ring */
  prev: PolygonNode | null;
  /** Next vertex in the polygon ring */
  next: PolygonNode | null;
  /** Z-order curve value for spatial indexing */
  z: number;
  /** Previous vertex in z-order */
  prevZ: PolygonNode | null;
  /** Next vertex in z-order */
  nextZ: PolygonNode | null;
  /** Whether this is a steiner point */
  steiner: boolean;
}

/**
 * Result of the flatten operation
 */
interface FlattenResult {
  /** Flattened array of vertex coordinates */
  vertices: number[];
  /** Indices of hole starting vertices */
  holes: number[];
  /** Number of coordinates per vertex (2 or 3) */
  dimensions: number;
}

/**
 * Main triangulation function - converts polygon to triangles
 * @param data - Flat array of vertex coordinates [x0,y0, x1,y1, ...]
 * @param holeIndices - Array of hole starting indices in the data array
 * @param dim - Number of coordinates per vertex (default: 2)
 * @returns Array of triangle vertex indices
 */
export function earcut(
  data: number[],
  holeIndices?: number[],
  dim?: number
): number[];

/**
 * Calculate the deviation of the triangulation from the original polygon area
 * Used to validate triangulation quality
 * @param data - Flat array of vertex coordinates
 * @param holeIndices - Array of hole starting indices
 * @param dim - Number of coordinates per vertex
 * @param triangles - Array of triangle indices from triangulation
 * @returns Deviation ratio (0 = perfect match)
 */
export function deviation(
  data: number[],
  holeIndices: number[],
  dim: number,
  triangles: number[]
): number;

/**
 * Flatten a nested polygon structure into the format expected by earcut
 * @param data - Nested array: [[[x,y], [x,y], ...], [[hole vertices]], ...]
 * @returns Flattened structure with vertices, holes, and dimensions
 */
export function flatten(data: number[][][]): FlattenResult;

/**
 * Create a circular doubly linked list from polygon points
 * @param data - Flat array of vertex coordinates
 * @param start - Start index in data array
 * @param end - End index in data array
 * @param dim - Number of coordinates per vertex
 * @param clockwise - Whether to create list in clockwise order
 * @returns Last node in the created linked list
 */
declare function linkedList(
  data: number[],
  start: number,
  end: number,
  dim: number,
  clockwise: boolean
): PolygonNode | null;

/**
 * Eliminate colinear or duplicate points from the polygon
 * @param start - Starting node of the polygon
 * @param end - Ending node (optional, defaults to start)
 * @returns Filtered polygon node
 */
declare function filterPoints(
  start: PolygonNode,
  end?: PolygonNode
): PolygonNode | null;

/**
 * Main triangulation loop
 * @param ear - Starting polygon node
 * @param triangles - Output array for triangle indices
 * @param dim - Number of coordinates per vertex
 * @param minX - Minimum X coordinate (for z-order)
 * @param minY - Minimum Y coordinate (for z-order)
 * @param invSize - Inverse of coordinate range (for z-order)
 * @param pass - Current algorithm pass (0, 1, or 2)
 */
declare function earcutLinked(
  ear: PolygonNode,
  triangles: number[],
  dim: number,
  minX: number,
  minY: number,
  invSize: number,
  pass: number
): void;

/**
 * Check if a triangle is a valid ear (no other points inside)
 * @param ear - The ear candidate node
 * @returns True if this is a valid ear
 */
declare function isEar(ear: PolygonNode): boolean;

/**
 * Check if a triangle is a valid ear using z-order curve optimization
 * @param ear - The ear candidate node
 * @param minX - Minimum X coordinate
 * @param minY - Minimum Y coordinate
 * @param invSize - Inverse of coordinate range
 * @returns True if this is a valid ear
 */
declare function isEarHashed(
  ear: PolygonNode,
  minX: number,
  minY: number,
  invSize: number
): boolean;

/**
 * Try splitting polygon and triangulate both halves
 * @param start - Starting node
 * @param triangles - Output array for triangle indices
 * @param dim - Number of coordinates per vertex
 * @param minX - Minimum X coordinate
 * @param minY - Minimum Y coordinate
 * @param invSize - Inverse of coordinate range
 */
declare function splitEarcut(
  start: PolygonNode,
  triangles: number[],
  dim: number,
  minX: number,
  minY: number,
  invSize: number
): void;

/**
 * Link holes to the outer polygon
 * @param data - Flat array of vertex coordinates
 * @param holeIndices - Array of hole starting indices
 * @param outerNode - Outer polygon linked list
 * @param dim - Number of coordinates per vertex
 * @returns Linked polygon with holes
 */
declare function eliminateHoles(
  data: number[],
  holeIndices: number[],
  outerNode: PolygonNode,
  dim: number
): PolygonNode;

/**
 * Find a bridge connecting a hole to the outer polygon
 * @param hole - Starting node of the hole
 * @param outerNode - Node in the outer polygon
 * @returns Bridge connection point
 */
declare function findHoleBridge(
  hole: PolygonNode,
  outerNode: PolygonNode
): PolygonNode | null;

/**
 * Calculate Z-order curve value for a point
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param minX - Minimum X coordinate
 * @param minY - Minimum Y coordinate
 * @param invSize - Inverse of coordinate range
 * @returns Z-order value (32-bit integer)
 */
declare function zOrder(
  x: number,
  y: number,
  minX: number,
  minY: number,
  invSize: number
): number;

/**
 * Find the leftmost point in a polygon
 * @param start - Starting node
 * @returns Leftmost node
 */
declare function getLeftmost(start: PolygonNode): PolygonNode;

/**
 * Check if a point is inside a triangle
 * @param ax - Triangle vertex A x-coordinate
 * @param ay - Triangle vertex A y-coordinate
 * @param bx - Triangle vertex B x-coordinate
 * @param by - Triangle vertex B y-coordinate
 * @param cx - Triangle vertex C x-coordinate
 * @param cy - Triangle vertex C y-coordinate
 * @param px - Point x-coordinate
 * @param py - Point y-coordinate
 * @returns True if point is inside triangle
 */
declare function pointInTriangle(
  ax: number,
  ay: number,
  bx: number,
  by: number,
  cx: number,
  cy: number,
  px: number,
  py: number
): boolean;

/**
 * Check if a diagonal is valid (inside the polygon)
 * @param a - First node
 * @param b - Second node
 * @returns True if diagonal is valid
 */
declare function isValidDiagonal(a: PolygonNode, b: PolygonNode): boolean;

/**
 * Calculate signed area of a triangle
 * @param p - First point
 * @param q - Second point
 * @param r - Third point
 * @returns Signed area (positive = counter-clockwise)
 */
declare function area(p: PolygonNode, q: PolygonNode, r: PolygonNode): number;

/**
 * Check if two points are equal
 * @param p1 - First point
 * @param p2 - Second point
 * @returns True if points have same coordinates
 */
declare function equals(p1: PolygonNode, p2: PolygonNode): boolean;

/**
 * Check if two segments intersect
 * @param p1 - First segment start
 * @param q1 - First segment end
 * @param p2 - Second segment start
 * @param q2 - Second segment end
 * @returns True if segments intersect
 */
declare function intersects(
  p1: PolygonNode,
  q1: PolygonNode,
  p2: PolygonNode,
  q2: PolygonNode
): boolean;

/**
 * Check if a diagonal between two nodes is locally inside the polygon
 * @param a - First node
 * @param b - Second node
 * @returns True if diagonal is inside
 */
declare function locallyInside(a: PolygonNode, b: PolygonNode): boolean;

/**
 * Link two nodes by splitting the polygon
 * @param a - First node
 * @param b - Second node
 * @returns New node created at the split
 */
declare function splitPolygon(a: PolygonNode, b: PolygonNode): PolygonNode;

/**
 * Create a new polygon node
 * @param i - Vertex index
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param last - Previous node to link to (optional)
 * @returns New polygon node
 */
declare function insertNode(
  i: number,
  x: number,
  y: number,
  last?: PolygonNode
): PolygonNode;

/**
 * Remove a node from the linked list
 * @param p - Node to remove
 */
declare function removeNode(p: PolygonNode): void;

/**
 * Calculate signed area of a polygon
 * @param data - Flat array of vertex coordinates
 * @param start - Start index
 * @param end - End index
 * @param dim - Number of coordinates per vertex
 * @returns Signed area
 */
declare function signedArea(
  data: number[],
  start: number,
  end: number,
  dim: number
): number;

export default earcut;