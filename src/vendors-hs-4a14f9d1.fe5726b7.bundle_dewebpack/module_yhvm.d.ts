/**
 * Poly2Tri Triangulation Module
 * Constrained Delaunay Triangulation (CDT) implementation
 * @module Triangulation
 */

/** Epsilon value for floating point comparisons */
declare const EPSILON: number;

/**
 * Orientation enumeration for geometric calculations
 */
declare enum Orientation {
  /** Counter-clockwise orientation */
  CCW = "CCW",
  /** Clockwise orientation */
  CW = "CW",
  /** Collinear orientation */
  COLLINEAR = "COLLINEAR"
}

/**
 * Represents a 2D point in the triangulation
 */
interface Point {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Edge list associated with this point (used for constrained edges) */
  _p2t_edge_list?: Edge[];
}

/**
 * Represents a constrained edge between two points
 */
interface Edge {
  /** Starting point of the edge */
  p: Point;
  /** Ending point of the edge */
  q: Point;
}

/**
 * Represents a triangulation node in the advancing front
 */
declare class AdvancingFrontNode {
  /** The point associated with this node */
  point: Point;
  /** Reference to the triangle attached to this node */
  triangle: Triangle | null;
  /** Next node in the advancing front */
  next: AdvancingFrontNode | null;
  /** Previous node in the advancing front */
  prev: AdvancingFrontNode | null;

  constructor(point: Point, triangle?: Triangle | null);
}

/**
 * Represents a triangle in the mesh
 */
declare class Triangle {
  /** Triangle vertices (3 points) */
  points_: [Point, Point, Point];
  /** Neighboring triangles (up to 3) */
  neighbors_: [Triangle | null, Triangle | null, Triangle | null];
  /** Constrained edge flags for each edge */
  constrained_edge: [boolean, boolean, boolean];
  /** Delaunay edge flags for each edge */
  delaunay_edge: [boolean, boolean, boolean];

  /**
   * Creates a new triangle
   * @param p1 - First vertex
   * @param p2 - Second vertex
   * @param p3 - Third vertex
   */
  constructor(p1: Point, p2: Point, p3: Point);

  /**
   * Gets a point by index (0-2)
   */
  getPoint(index: number): Point;

  /**
   * Gets a neighbor triangle by index (0-2)
   */
  getNeighbor(index: number): Triangle | null;

  /**
   * Marks a neighboring triangle
   */
  markNeighbor(triangle: Triangle): void;

  /**
   * Gets the point counter-clockwise from the given point
   */
  pointCCW(point: Point): Point;

  /**
   * Gets the point clockwise from the given point
   */
  pointCW(point: Point): Point;

  /**
   * Gets the neighbor across from the given point
   */
  neighborCCW(point: Point): Triangle | null;

  /**
   * Gets the neighbor clockwise from the given point
   */
  neighborCW(point: Point): Triangle | null;

  /**
   * Gets the neighbor across from the given point
   */
  neighborAcross(point: Point): Triangle | null;

  /**
   * Gets the opposite point of a triangle relative to this triangle
   */
  oppositePoint(triangle: Triangle, point: Point): Point;

  /**
   * Gets the index of a point in the triangle
   */
  index(point: Point): number;

  /**
   * Gets the edge index for two points
   */
  edgeIndex(p1: Point, p2: Point): number;

  /**
   * Marks a constrained edge by index
   */
  markConstrainedEdgeByIndex(index: number): void;

  /**
   * Marks a constrained edge by points
   */
  markConstrainedEdgeByPoints(p1: Point, p2: Point): void;

  /**
   * Gets the constrained edge flag counter-clockwise from point
   */
  getConstrainedEdgeCCW(point: Point): boolean;

  /**
   * Gets the constrained edge flag clockwise from point
   */
  getConstrainedEdgeCW(point: Point): boolean;

  /**
   * Gets the constrained edge flag across from point
   */
  getConstrainedEdgeAcross(point: Point): boolean;

  /**
   * Gets the Delaunay edge flag counter-clockwise from point
   */
  getDelaunayEdgeCCW(point: Point): boolean;

  /**
   * Gets the Delaunay edge flag clockwise from point
   */
  getDelaunayEdgeCW(point: Point): boolean;

  /**
   * Sets the Delaunay edge flag counter-clockwise from point
   */
  setDelaunayEdgeCCW(point: Point, value: boolean): void;

  /**
   * Sets the Delaunay edge flag clockwise from point
   */
  setDelaunayEdgeCW(point: Point, value: boolean): void;

  /**
   * Sets the constrained edge flag counter-clockwise from point
   */
  setConstrainedEdgeCCW(point: Point, value: boolean): void;

  /**
   * Sets the constrained edge flag clockwise from point
   */
  setConstrainedEdgeCW(point: Point, value: boolean): void;

  /**
   * Legalizes the triangle by swapping point positions
   */
  legalize(oldPoint: Point, newPoint: Point): void;

  /**
   * Clears all neighbor references
   */
  clearNeighbors(): void;

  /**
   * Clears all Delaunay edge flags
   */
  clearDelaunayEdges(): void;
}

/**
 * Basin structure for filling concave areas
 */
interface Basin {
  /** Left-most node of the basin */
  left_node: AdvancingFrontNode | null;
  /** Bottom-most node of the basin */
  bottom_node: AdvancingFrontNode | null;
  /** Right-most node of the basin */
  right_node: AdvancingFrontNode | null;
  /** Width of the basin */
  width: number;
  /** Whether the left side is higher than the right */
  left_highest: boolean;
}

/**
 * Edge event structure for constrained edge processing
 */
interface EdgeEvent {
  /** The constrained edge being processed */
  constrained_edge: Edge | null;
  /** Whether processing from right to left */
  right: boolean;
}

/**
 * Sweep context managing the triangulation state
 */
interface SweepContext {
  /** Basin structure */
  basin: Basin;
  /** Edge event structure */
  edge_event: EdgeEvent;

  /**
   * Gets the total number of points
   */
  pointCount(): number;

  /**
   * Gets a point by index
   */
  getPoint(index: number): Point;

  /**
   * Locates the node in the advancing front for the given point
   */
  locateNode(point: Point): AdvancingFrontNode;

  /**
   * Adds a triangle to the mesh
   */
  addToMap(triangle: Triangle): void;

  /**
   * Maps a triangle to its corresponding nodes
   */
  mapTriangleToNodes(triangle: Triangle): void;

  /**
   * Gets the advancing front
   */
  front(): AdvancingFront;

  /**
   * Initializes the triangulation structures
   */
  initTriangulation(): void;

  /**
   * Creates the initial advancing front
   */
  createAdvancingFront(): void;

  /**
   * Cleans up the final mesh, removing external triangles
   */
  meshClean(triangle: Triangle): void;
}

/**
 * Advancing front structure
 */
interface AdvancingFront {
  /**
   * Gets the head node of the advancing front
   */
  head(): AdvancingFrontNode;
}

/**
 * Calculates the 2D orientation of three points
 * @param p1 - First point
 * @param p2 - Second point
 * @param p3 - Third point
 * @returns Orientation enum value
 */
declare function orient2d(p1: Point, p2: Point, p3: Point): Orientation;

/**
 * Checks if a point is in the scan area
 * @param pa - First boundary point
 * @param pb - Second boundary point
 * @param pc - Third boundary point
 * @param pd - Point to test
 * @returns True if point is in scan area
 */
declare function inScanArea(pa: Point, pb: Point, pc: Point, pd: Point): boolean;

/**
 * Checks if the angle at a point is obtuse
 * @param pa - Previous point
 * @param pb - Current point (vertex of angle)
 * @param pc - Next point
 * @returns True if angle is obtuse
 */
declare function isAngleObtuse(pa: Point, pb: Point, pc: Point): boolean;

/**
 * Inserts a new point into the triangulation
 * Creates a new triangle and updates the advancing front
 * @param sweepContext - The sweep context
 * @param point - Point to insert
 * @returns The newly created advancing front node
 */
declare function pointEvent(sweepContext: SweepContext, point: Point): AdvancingFrontNode;

/**
 * Processes a constrained edge
 * Ensures the edge is present in the triangulation
 * @param sweepContext - The sweep context
 * @param edge - Constrained edge to process
 * @param node - Starting node
 */
declare function edgeEventByEdge(sweepContext: SweepContext, edge: Edge, node: AdvancingFrontNode): void;

/**
 * Recursively processes edge events
 * @param sweepContext - The sweep context
 * @param ep - Edge start point
 * @param eq - Edge end point
 * @param triangle - Current triangle
 * @param point - Current point
 */
declare function edgeEventByPoints(
  sweepContext: SweepContext,
  ep: Point,
  eq: Point,
  triangle: Triangle,
  point: Point
): void;

/**
 * Checks if an edge is already in the triangulation
 * @param triangle - Triangle to check
 * @param p1 - First point of edge
 * @param p2 - Second point of edge
 * @returns True if edge exists
 */
declare function isEdgeSideOfTriangle(triangle: Triangle, p1: Point, p2: Point): boolean;

/**
 * Fills a hole in the triangulation by creating a triangle
 * @param sweepContext - The sweep context
 * @param node - Node at the hole
 */
declare function fill(sweepContext: SweepContext, node: AdvancingFrontNode): void;

/**
 * Checks if the configuration forms a basin
 * @param node - Node to check
 * @returns True if forms a basin
 */
declare function isBasinAngleRight(node: AdvancingFrontNode): boolean;

/**
 * Attempts to legalize the triangle using Delaunay criterion
 * @param sweepContext - The sweep context
 * @param triangle - Triangle to legalize
 * @returns True if any edge was flipped
 */
declare function legalize(sweepContext: SweepContext, triangle: Triangle): boolean;

/**
 * Checks if four points form a Delaunay configuration
 * (Point d is inside the circumcircle of triangle abc)
 * @param pa - First point of triangle
 * @param pb - Second point of triangle
 * @param pc - Third point of triangle
 * @param pd - Point to test
 * @returns True if Delaunay criterion is violated
 */
declare function inCircle(pa: Point, pb: Point, pc: Point, pd: Point): boolean;

/**
 * Rotates a triangle edge (edge flip)
 * @param triangle - First triangle
 * @param point - Point in first triangle
 * @param oppositeTriangle - Opposite triangle
 * @param oppositePoint - Point in opposite triangle
 */
declare function rotateTrianglePair(
  triangle: Triangle,
  point: Point,
  oppositeTriangle: Triangle,
  oppositePoint: Point
): void;

/**
 * Fills a basin-shaped concave area
 * @param sweepContext - The sweep context
 * @param node - Bottom node of basin
 */
declare function fillBasin(sweepContext: SweepContext, node: AdvancingFrontNode): void;

/**
 * Fills to the right of an edge event
 * @param sweepContext - The sweep context
 * @param edge - The constrained edge
 * @param node - Current node
 */
declare function fillRightAboveEdgeEvent(sweepContext: SweepContext, edge: Edge, node: AdvancingFrontNode): void;

/**
 * Fills concave area to the right
 * @param sweepContext - The sweep context
 * @param edge - The constrained edge
 * @param node - Current node
 */
declare function fillRightConcaveEdgeEvent(sweepContext: SweepContext, edge: Edge, node: AdvancingFrontNode): void;

/**
 * Fills convex area to the right
 * @param sweepContext - The sweep context
 * @param edge - The constrained edge
 * @param node - Current node
 */
declare function fillRightConvexEdgeEvent(sweepContext: SweepContext, edge: Edge, node: AdvancingFrontNode): void;

/**
 * Fills to the left of an edge event
 * @param sweepContext - The sweep context
 * @param edge - The constrained edge
 * @param node - Current node
 */
declare function fillLeftAboveEdgeEvent(sweepContext: SweepContext, edge: Edge, node: AdvancingFrontNode): void;

/**
 * Fills convex area to the left
 * @param sweepContext - The sweep context
 * @param edge - The constrained edge
 * @param node - Current node
 */
declare function fillLeftConvexEdgeEvent(sweepContext: SweepContext, edge: Edge, node: AdvancingFrontNode): void;

/**
 * Fills concave area to the left
 * @param sweepContext - The sweep context
 * @param edge - The constrained edge
 * @param node - Current node
 */
declare function fillLeftConcaveEdgeEvent(sweepContext: SweepContext, edge: Edge, node: AdvancingFrontNode): void;

/**
 * Flips an edge during constrained edge processing
 * @param sweepContext - The sweep context
 * @param ep - Edge start point
 * @param eq - Edge end point
 * @param triangle - Current triangle
 * @param point - Current point
 */
declare function flipEdgeEvent(
  sweepContext: SweepContext,
  ep: Point,
  eq: Point,
  triangle: Triangle,
  point: Point
): void;

/**
 * Determines which triangle to return after flipping
 * @param orientation - Orientation of points
 * @param triangle - First triangle
 * @param oppositeTriangle - Opposite triangle
 * @param point - Point in first triangle
 * @param oppositePoint - Point in opposite triangle
 * @returns The appropriate triangle after flip
 */
declare function nextFlipTriangle(
  sweepContext: SweepContext,
  orientation: Orientation,
  triangle: Triangle,
  oppositeTriangle: Triangle,
  point: Point,
  oppositePoint: Point
): Triangle;

/**
 * Determines the next point for edge flipping
 * @param ep - Edge start point
 * @param eq - Edge end point
 * @param oppositeTriangle - Opposite triangle
 * @param oppositePoint - Opposite point
 * @returns Next point for flipping
 */
declare function nextFlipPoint(ep: Point, eq: Point, oppositeTriangle: Triangle, oppositePoint: Point): Point;

/**
 * Performs edge flipping when scan area test fails
 * @param sweepContext - The sweep context
 * @param ep - Edge start point
 * @param eq - Edge end point
 * @param triangle - Current triangle
 * @param oppositeTriangle - Opposite triangle
 * @param point - Current point
 */
declare function flipScanEdgeEvent(
  sweepContext: SweepContext,
  ep: Point,
  eq: Point,
  triangle: Triangle,
  oppositeTriangle: Triangle,
  point: Point
): void;

/**
 * Main triangulation function
 * Performs constrained Delaunay triangulation on the input points
 * @param sweepContext - The sweep context containing points and constraints
 */
export function triangulate(sweepContext: SweepContext): void;