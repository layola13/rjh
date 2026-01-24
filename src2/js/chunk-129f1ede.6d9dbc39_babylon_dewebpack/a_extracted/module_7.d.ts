/**
 * Earcut polygon triangulation library
 * Converts polygon vertices into triangle indices using ear clipping algorithm
 */

/**
 * Point node in a circular doubly linked list representing polygon vertices
 */
interface PolygonNode {
  /** Original vertex index in input array */
  i: number;
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Previous vertex in polygon */
  prev: PolygonNode | null;
  /** Next vertex in polygon */
  next: PolygonNode | null;
  /** Z-order curve value for spatial sorting */
  z: number | null;
  /** Previous vertex in z-order */
  prevZ: PolygonNode | null;
  /** Next vertex in z-order */
  nextZ: PolygonNode | null;
  /** Whether this is a steiner point */
  steiner: boolean;
}

/**
 * Input data structure for flattened polygon
 */
interface FlattenedPolygon {
  /** Flat array of vertex coordinates */
  vertices: number[];
  /** Indices where each hole starts */
  holes: number[];
  /** Number of dimensions per vertex (2 or 3) */
  dimensions: number;
}

/**
 * Triangulates a polygon using the ear clipping algorithm
 * @param data - Flat array of vertex coordinates [x0,y0, x1,y1, ...]
 * @param holeIndices - Array of hole starting indices (optional)
 * @param dimensions - Number of coordinates per vertex (default: 2)
 * @returns Array of triangle vertex indices
 */
export default function earcut(
  data: number[],
  holeIndices?: number[],
  dimensions?: number
): number[];

/**
 * Calculates the deviation between triangulated area and original polygon area
 * @param data - Flat array of vertex coordinates
 * @param holeIndices - Array of hole starting indices
 * @param dimensions - Number of coordinates per vertex
 * @param triangles - Output triangle indices from earcut
 * @returns Relative deviation value (0 = perfect match)
 */
export function deviation(
  data: number[],
  holeIndices: number[] | undefined,
  dimensions: number,
  triangles: number[]
): number;

/**
 * Flattens nested polygon coordinate arrays into earcut input format
 * @param data - Nested array of polygon rings, each ring is an array of coordinate arrays
 * @returns Flattened polygon data structure
 */
export function flatten(data: number[][][]): FlattenedPolygon;

/**
 * Creates a circular doubly linked list from polygon vertices
 * @param data - Flat coordinate array
 * @param start - Start index in data array
 * @param end - End index in data array
 * @param dimensions - Coordinates per vertex
 * @param clockwise - Whether vertices are in clockwise order
 * @returns Last node in the created list
 */
declare function linkedList(
  data: number[],
  start: number,
  end: number,
  dimensions: number,
  clockwise: boolean
): PolygonNode | null;

/**
 * Filters out collinear or duplicate points from linked list
 * @param start - Starting node
 * @param end - Ending node (optional, defaults to start)
 * @returns Filtered list starting node
 */
declare function filterPoints(
  start: PolygonNode,
  end?: PolygonNode
): PolygonNode;

/**
 * Main ear slicing loop
 * @param ear - Current ear candidate node
 * @param triangles - Output triangle index array
 * @param dimensions - Coordinates per vertex
 * @param minX - Minimum X coordinate for z-order
 * @param minY - Minimum Y coordinate for z-order
 * @param invSize - Inverse of polygon size for z-order normalization
 * @param pass - Current algorithm pass (0, 1, or 2)
 */
declare function earcutLinked(
  ear: PolygonNode | null,
  triangles: number[],
  dimensions: number,
  minX: number,
  minY: number,
  invSize: number,
  pass?: number
): void;

/**
 * Checks if a triangle diagonal is valid (locally inside the polygon)
 * @param a - First vertex
 * @param b - Second vertex
 * @returns True if diagonal is valid
 */
declare function isValidDiagonal(a: PolygonNode, b: PolygonNode): boolean;

/**
 * Checks whether a point lies within a triangle
 * @param ax - Triangle point A x
 * @param ay - Triangle point A y
 * @param bx - Triangle point B x
 * @param by - Triangle point B y
 * @param cx - Triangle point C x
 * @param cy - Triangle point C y
 * @param px - Test point x
 * @param py - Test point y
 * @returns True if point is inside triangle
 */
declare function pointInTriangle(
  ax: number, ay: number,
  bx: number, by: number,
  cx: number, cy: number,
  px: number, py: number
): boolean;

/**
 * Computes z-order curve value for a point
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
 * Calculates signed area of a polygon ring
 * @param data - Flat coordinate array
 * @param start - Start index
 * @param end - End index
 * @param dimensions - Coordinates per vertex
 * @returns Signed area (positive = counter-clockwise)
 */
declare function signedArea(
  data: number[],
  start: number,
  end: number,
  dimensions: number
): number;

/**
 * Computes 2D cross product (triangle area * 2)
 * @param p - First point
 * @param q - Second point
 * @param r - Third point
 * @returns Cross product value
 */
declare function area(p: PolygonNode, q: PolygonNode, r: PolygonNode): number;

/**
 * Checks if two points are equal
 * @param p1 - First point
 * @param p2 - Second point
 * @returns True if points have same coordinates
 */
declare function equals(p1: PolygonNode, p2: PolygonNode): boolean;

/**
 * Checks if two segments intersect
 * @param p1 - Segment 1 start
 * @param q1 - Segment 1 end
 * @param p2 - Segment 2 start
 * @param q2 - Segment 2 end
 * @returns True if segments intersect
 */
declare function intersects(
  p1: PolygonNode,
  q1: PolygonNode,
  p2: PolygonNode,
  q2: PolygonNode
): boolean;

/**
 * Checks if point is on segment
 * @param p - Segment start
 * @param i - Test point
 * @param q - Segment end
 * @returns True if point is on segment
 */
declare function onSegment(
  p: PolygonNode,
  i: PolygonNode,
  q: PolygonNode
): boolean;

/**
 * Returns sign of a number (-1, 0, or 1)
 * @param num - Input number
 * @returns Sign value
 */
declare function sign(num: number): -1 | 0 | 1;

/**
 * Checks if diagonal between two nodes is locally inside polygon
 * @param a - First node
 * @param b - Second node
 * @returns True if diagonal is inside
 */
declare function locallyInside(a: PolygonNode, b: PolygonNode): boolean;

/**
 * Links two polygon segments
 * @param a - First segment node
 * @param b - Second segment node
 * @returns New node created at connection
 */
declare function splitPolygon(a: PolygonNode, b: PolygonNode): PolygonNode;

/**
 * Creates a new node and optionally inserts it into list
 * @param index - Vertex index
 * @param x - X coordinate
 * @param y - Y coordinate
 * @param last - Previous node to link to (optional)
 * @returns Created node
 */
declare function insertNode(
  index: number,
  x: number,
  y: number,
  last: PolygonNode | null
): PolygonNode;

/**
 * Removes a node from the linked list
 * @param node - Node to remove
 */
declare function removeNode(node: PolygonNode): void;