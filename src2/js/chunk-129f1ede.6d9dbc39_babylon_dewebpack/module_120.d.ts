/**
 * Earcut - Fast polygon triangulation library
 * Converts polygon vertices into triangles using ear clipping algorithm
 */

/**
 * Represents a node in the linked list of polygon vertices
 */
interface VertexNode {
  /** Index in the original input array */
  i: number;
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Previous vertex in the polygon ring */
  prev: VertexNode | null;
  /** Next vertex in the polygon ring */
  next: VertexNode | null;
  /** Z-order curve value for spatial sorting */
  z: number | null;
  /** Previous vertex in Z-order */
  prevZ: VertexNode | null;
  /** Next vertex in Z-order */
  nextZ: VertexNode | null;
  /** Whether this is a steiner point (for hole bridging) */
  steiner: boolean;
}

/**
 * Input data for polygon with holes
 */
interface FlattenedPolygon {
  /** Flat array of vertex coordinates [x, y, x, y, ...] */
  vertices: number[];
  /** Indices in vertices array where each hole starts */
  holes: number[];
  /** Number of coordinates per vertex (2 for 2D, 3 for 3D) */
  dimensions: number;
}

/**
 * Triangulates a polygon using ear clipping algorithm
 * 
 * @param data - Flat array of vertex coordinates [x0, y0, x1, y1, ...]
 * @param holeIndices - Array of hole starting indices in data array
 * @param dimensions - Number of coordinates per vertex (default: 2)
 * @returns Array of triangle vertex indices [i0, i1, i2, i3, i4, i5, ...]
 */
export default function earcut(
  data: number[],
  holeIndices?: number[],
  dimensions?: number
): number[];

/**
 * Triangulates a polygon using ear clipping algorithm
 * 
 * @param data - Flat array of vertex coordinates [x0, y0, x1, y1, ...]
 * @param holeIndices - Array of hole starting indices in data array
 * @param dimensions - Number of coordinates per vertex (default: 2)
 * @returns Array of triangle vertex indices
 */
export function earcut(
  data: number[],
  holeIndices?: number[],
  dimensions?: number
): number[];

/**
 * Calculates the deviation between input polygon area and triangulated area
 * Used for验证 triangulation quality
 * 
 * @param data - Flat array of vertex coordinates
 * @param holeIndices - Array of hole starting indices
 * @param dimensions - Number of coordinates per vertex
 * @param triangles - Array of triangle indices from triangulation
 * @returns Deviation ratio (0 = perfect match)
 */
export function deviation(
  data: number[],
  holeIndices: number[] | undefined,
  dimensions: number,
  triangles: number[]
): number;

/**
 * Flattens nested polygon array into format accepted by earcut
 * 
 * @param data - Nested array: [outerRing, hole1, hole2, ...] where each ring is [[x, y], [x, y], ...]
 * @returns Flattened polygon data with vertices and hole indices
 */
export function flatten(data: number[][][]): FlattenedPolygon;

/**
 * Creates a circular doubly linked list from polygon points
 * 
 * @param data - Flat coordinate array
 * @param start - Start index in data array
 * @param end - End index in data array
 * @param dimensions - Coordinates per vertex
 * @param clockwise - Whether to create list in clockwise order
 * @returns Last node in the created list
 */
declare function createLinkedList(
  data: number[],
  start: number,
  end: number,
  dimensions: number,
  clockwise: boolean
): VertexNode | null;

/**
 * Eliminates colinear or duplicate points and returns the cleaned list
 * 
 * @param start - Starting node
 * @param end - Ending node (optional, defaults to start)
 * @returns Cleaned vertex list
 */
declare function filterPoints(
  start: VertexNode,
  end?: VertexNode
): VertexNode | null;

/**
 * Main ear slicing logic - iterates through vertices and cuts off valid ears
 * 
 * @param ear - Current vertex being tested as potential ear
 * @param triangles - Output array for triangle indices
 * @param dimensions - Coordinates per vertex
 * @param minX - Minimum X coordinate of polygon (for Z-order)
 * @param minY - Minimum Y coordinate of polygon (for Z-order)
 * @param invSize - Inverse of polygon size (for Z-order normalization)
 * @param pass - Algorithm pass number (0, 1, or 2)
 */
declare function earcutLinked(
  ear: VertexNode,
  triangles: number[],
  dimensions: number,
  minX: number,
  minY: number,
  invSize: number,
  pass?: number
): void;

/**
 * Checks if a triangle diagonal is valid (lies inside the polygon)
 * 
 * @param a - First vertex
 * @param b - Second vertex
 * @returns True if diagonal is valid
 */
declare function isValidDiagonal(a: VertexNode, b: VertexNode): boolean;

/**
 * Checks if triangle formed by three points is a valid ear
 * Uses Z-order curve for spatial optimization
 * 
 * @param ear - Middle vertex of potential ear
 * @param minX - Bounding box min X
 * @param minY - Bounding box min Y
 * @param invSize - Inverse size for normalization
 * @returns True if ear is valid
 */
declare function isEarHashed(
  ear: VertexNode,
  minX: number,
  minY: number,
  invSize: number
): boolean;

/**
 * Checks if triangle is a valid ear (brute force check all points)
 * 
 * @param ear - Middle vertex of potential ear
 * @returns True if ear is valid
 */
declare function isEar(ear: VertexNode): boolean;

/**
 * Links two polygon segments by creating a bridge between them
 * 
 * @param a - Vertex from first segment
 * @param b - Vertex from second segment
 * @returns New vertex node at the connection
 */
declare function splitPolygon(a: VertexNode, b: VertexNode): VertexNode;

/**
 * Inserts a new vertex node into the linked list
 * 
 * @param index - Vertex index
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param last - Previous node to link to (optional)
 * @returns Newly created node
 */
declare function insertNode(
  index: number,
  x: number,
  y: number,
  last?: VertexNode | null
): VertexNode;

/**
 * Removes a node from the linked list
 * 
 * @param node - Node to remove
 */
declare function removeNode(node: VertexNode): void;

/**
 * Computes the Z-order curve value for spatial indexing
 * 
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param minX - Bounding box min X
 * @param minY - Bounding box min Y
 * @param invSize - Inverse of bounding box size
 * @returns Z-order value
 */
declare function zOrder(
  x: number,
  y: number,
  minX: number,
  minY: number,
  invSize: number
): number;

/**
 * Checks if point lies inside a triangle
 * 
 * @param ax, ay - Triangle vertex A coordinates
 * @param bx, by - Triangle vertex B coordinates
 * @param cx, cy - Triangle vertex C coordinates
 * @param px, py - Point coordinates
 * @returns True if point is inside triangle
 */
declare function pointInTriangle(
  ax: number, ay: number,
  bx: number, by: number,
  cx: number, cy: number,
  px: number, py: number
): boolean;

/**
 * Computes signed area of triangle (cross product)
 * 
 * @param p - First vertex
 * @param q - Second vertex
 * @param r - Third vertex
 * @returns Signed area (positive = counter-clockwise)
 */
declare function area(p: VertexNode, q: VertexNode, r: VertexNode): number;

/**
 * Checks if two points are equal
 * 
 * @param p1 - First point
 * @param p2 - Second point
 * @returns True if points have same coordinates
 */
declare function equals(p1: VertexNode, p2: VertexNode): boolean;

/**
 * Checks if two segments intersect
 * 
 * @param p1, q1 - First segment endpoints
 * @param p2, q2 - Second segment endpoints
 * @returns True if segments intersect
 */
declare function intersects(
  p1: VertexNode,
  q1: VertexNode,
  p2: VertexNode,
  q2: VertexNode
): boolean;

/**
 * Checks if point lies on segment
 * 
 * @param p - Segment start
 * @param i - Point to test
 * @param q - Segment end
 * @returns True if point is on segment
 */
declare function onSegment(
  p: VertexNode,
  i: VertexNode,
  q: VertexNode
): boolean;

/**
 * Returns sign of a number (-1, 0, or 1)
 * 
 * @param num - Input number
 * @returns Sign value
 */
declare function sign(num: number): -1 | 0 | 1;

/**
 * Calculates signed area of a polygon ring
 * 
 * @param data - Flat coordinate array
 * @param start - Start index
 * @param end - End index
 * @param dimensions - Coordinates per vertex
 * @returns Signed area
 */
declare function signedArea(
  data: number[],
  start: number,
  end: number,
  dimensions: number
): number;