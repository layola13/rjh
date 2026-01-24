/**
 * Point interface representing a 2D coordinate point
 */
export interface Point {
  x: number;
  y: number;
  equals(other: Point): boolean;
  toString(): string;
}

/**
 * Edge interface representing a line segment between two points
 */
export interface Edge {
  /** Start point of the edge */
  p: Point;
  /** End point of the edge */
  q: Point;
}

/**
 * Triangle class used in Delaunay triangulation
 * Represents a triangle with three points, neighbors, and edge properties
 */
export declare class Triangle {
  /**
   * The three points that define this triangle
   * @private
   */
  private points_: [Point, Point, Point];

  /**
   * The three neighboring triangles (one for each edge)
   * @private
   */
  private neighbors_: [Triangle | null, Triangle | null, Triangle | null];

  /**
   * Whether this triangle is in the interior of the triangulation
   * @private
   */
  private interior_: boolean;

  /**
   * Flags indicating which edges are constrained
   * @private
   */
  private constrained_edge: [boolean, boolean, boolean];

  /**
   * Flags indicating which edges are Delaunay edges
   * @private
   */
  private delaunay_edge: [boolean, boolean, boolean];

  /**
   * Creates a new Triangle
   * @param p1 - First point
   * @param p2 - Second point
   * @param p3 - Third point
   */
  constructor(p1: Point, p2: Point, p3: Point);

  /**
   * Returns a string representation of the triangle
   */
  toString(): string;

  /**
   * Get a point by index (0, 1, or 2)
   * @param index - Index of the point
   */
  getPoint(index: number): Point;

  /**
   * Alias for getPoint
   */
  GetPoint(index: number): Point;

  /**
   * Get all three points of the triangle
   */
  getPoints(): [Point, Point, Point];

  /**
   * Get a neighboring triangle by index
   * @param index - Index of the neighbor (0, 1, or 2)
   */
  getNeighbor(index: number): Triangle | null;

  /**
   * Check if the triangle contains a specific point
   * @param point - Point to check
   */
  containsPoint(point: Point): boolean;

  /**
   * Check if the triangle contains an edge
   * @param edge - Edge to check
   */
  containsEdge(edge: Edge): boolean;

  /**
   * Check if the triangle contains two specific points
   * @param p1 - First point
   * @param p2 - Second point
   */
  containsPoints(p1: Point, p2: Point): boolean;

  /**
   * Check if this triangle is marked as interior
   */
  isInterior(): boolean;

  /**
   * Set the interior flag
   * @param interior - Interior status
   * @returns This triangle for chaining
   */
  setInterior(interior: boolean): this;

  /**
   * Mark a neighboring triangle by two shared points
   * @param p1 - First shared point
   * @param p2 - Second shared point
   * @param triangle - The neighboring triangle
   */
  markNeighborPointers(p1: Point, p2: Point, triangle: Triangle): void;

  /**
   * Mark another triangle as a neighbor
   * @param triangle - The neighboring triangle
   */
  markNeighbor(triangle: Triangle): void;

  /**
   * Clear all neighbor references
   */
  clearNeighbors(): void;

  /**
   * Clear all Delaunay edge flags
   */
  clearDelaunayEdges(): void;

  /**
   * Get the point clockwise from the given point
   * @param point - Reference point
   */
  pointCW(point: Point): Point | null;

  /**
   * Get the point counter-clockwise from the given point
   * @param point - Reference point
   */
  pointCCW(point: Point): Point | null;

  /**
   * Get the neighbor clockwise from the given point
   * @param point - Reference point
   */
  neighborCW(point: Point): Triangle | null;

  /**
   * Get the neighbor counter-clockwise from the given point
   * @param point - Reference point
   */
  neighborCCW(point: Point): Triangle | null;

  /**
   * Get the constrained edge flag clockwise from the given point
   * @param point - Reference point
   */
  getConstrainedEdgeCW(point: Point): boolean;

  /**
   * Get the constrained edge flag counter-clockwise from the given point
   * @param point - Reference point
   */
  getConstrainedEdgeCCW(point: Point): boolean;

  /**
   * Get the constrained edge flag across from the given point
   * @param point - Reference point
   */
  getConstrainedEdgeAcross(point: Point): boolean;

  /**
   * Set the constrained edge flag clockwise from the given point
   * @param point - Reference point
   * @param constrained - Constrained status
   */
  setConstrainedEdgeCW(point: Point, constrained: boolean): void;

  /**
   * Set the constrained edge flag counter-clockwise from the given point
   * @param point - Reference point
   * @param constrained - Constrained status
   */
  setConstrainedEdgeCCW(point: Point, constrained: boolean): void;

  /**
   * Get the Delaunay edge flag clockwise from the given point
   * @param point - Reference point
   */
  getDelaunayEdgeCW(point: Point): boolean;

  /**
   * Get the Delaunay edge flag counter-clockwise from the given point
   * @param point - Reference point
   */
  getDelaunayEdgeCCW(point: Point): boolean;

  /**
   * Set the Delaunay edge flag clockwise from the given point
   * @param point - Reference point
   * @param delaunay - Delaunay status
   */
  setDelaunayEdgeCW(point: Point, delaunay: boolean): void;

  /**
   * Set the Delaunay edge flag counter-clockwise from the given point
   * @param point - Reference point
   * @param delaunay - Delaunay status
   */
  setDelaunayEdgeCCW(point: Point, delaunay: boolean): void;

  /**
   * Get the neighbor across from the given point
   * @param point - Reference point
   */
  neighborAcross(point: Point): Triangle | null;

  /**
   * Get the point opposite to a given edge in a neighboring triangle
   * @param triangle - The neighboring triangle
   * @param point - Point on the shared edge
   */
  oppositePoint(triangle: Triangle, point: Point): Point | null;

  /**
   * Legalize the triangle by rotating around a point
   * @param opoint - Original point to rotate around
   * @param npoint - New point to replace with
   */
  legalize(opoint: Point, npoint: Point): void;

  /**
   * Get the index of a point in this triangle (0, 1, or 2)
   * @param point - Point to find
   * @throws Error if point is not in triangle
   */
  index(point: Point): number;

  /**
   * Get the edge index for two points
   * @param p1 - First point
   * @param p2 - Second point
   * @returns Edge index (0, 1, 2) or -1 if not found
   */
  edgeIndex(p1: Point, p2: Point): number;

  /**
   * Mark an edge as constrained by index
   * @param index - Edge index (0, 1, or 2)
   */
  markConstrainedEdgeByIndex(index: number): void;

  /**
   * Mark an edge as constrained
   * @param edge - Edge to mark
   */
  markConstrainedEdgeByEdge(edge: Edge): void;

  /**
   * Mark an edge as constrained by its two points
   * @param p1 - First point of the edge
   * @param p2 - Second point of the edge
   */
  markConstrainedEdgeByPoints(p1: Point, p2: Point): void;
}

export default Triangle;