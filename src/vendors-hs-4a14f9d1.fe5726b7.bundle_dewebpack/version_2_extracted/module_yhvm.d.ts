/**
 * Point2D represents a 2D point in Cartesian coordinates
 */
export interface Point2D {
  x: number;
  y: number;
  _p2t_edge_list?: Edge[];
}

/**
 * Edge represents a constrained edge between two points
 */
export interface Edge {
  p: Point2D;
  q: Point2D;
}

/**
 * Orientation enum for geometric calculations
 */
export enum Orientation {
  CW = -1,
  COLLINEAR = 0,
  CCW = 1
}

/**
 * Triangle node in the triangulation mesh
 */
export interface Triangle {
  delaunay_edge: [boolean, boolean, boolean];
  constrained_edge: [boolean, boolean, boolean];
  
  /**
   * Gets the point at the specified index (0, 1, or 2)
   */
  getPoint(index: number): Point2D;
  
  /**
   * Gets the neighboring triangle at the specified index
   */
  getNeighbor(index: number): Triangle | null;
  
  /**
   * Gets the index of the edge between two points
   */
  edgeIndex(p1: Point2D, p2: Point2D): number;
  
  /**
   * Marks an edge as constrained by index
   */
  markConstrainedEdgeByIndex(index: number): void;
  
  /**
   * Marks an edge as constrained by points
   */
  markConstrainedEdgeByPoints(p1: Point2D, p2: Point2D): void;
  
  /**
   * Marks a triangle as a neighbor
   */
  markNeighbor(triangle: Triangle): void;
  
  /**
   * Gets the point in counter-clockwise direction from the given point
   */
  pointCCW(point: Point2D): Point2D;
  
  /**
   * Gets the point in clockwise direction from the given point
   */
  pointCW(point: Point2D): Point2D;
  
  /**
   * Gets the neighboring triangle in counter-clockwise direction from the given point
   */
  neighborCCW(point: Point2D): Triangle | null;
  
  /**
   * Gets the neighboring triangle in clockwise direction from the given point
   */
  neighborCW(point: Point2D): Triangle | null;
  
  /**
   * Gets the constrained edge status in counter-clockwise direction from the given point
   */
  getConstrainedEdgeCCW(point: Point2D): boolean;
  
  /**
   * Gets the constrained edge status in clockwise direction from the given point
   */
  getConstrainedEdgeCW(point: Point2D): boolean;
  
  /**
   * Sets the constrained edge status in counter-clockwise direction from the given point
   */
  setConstrainedEdgeCCW(point: Point2D, value: boolean): void;
  
  /**
   * Sets the constrained edge status in clockwise direction from the given point
   */
  setConstrainedEdgeCW(point: Point2D, value: boolean): void;
  
  /**
   * Gets the Delaunay edge status in counter-clockwise direction from the given point
   */
  getDelaunayEdgeCCW(point: Point2D): boolean;
  
  /**
   * Gets the Delaunay edge status in clockwise direction from the given point
   */
  getDelaunayEdgeCW(point: Point2D): boolean;
  
  /**
   * Sets the Delaunay edge status in counter-clockwise direction from the given point
   */
  setDelaunayEdgeCCW(point: Point2D, value: boolean): void;
  
  /**
   * Sets the Delaunay edge status in clockwise direction from the given point
   */
  setDelaunayEdgeCW(point: Point2D, value: boolean): void;
  
  /**
   * Gets the constrained edge status across from the given point
   */
  getConstrainedEdgeAcross(point: Point2D): boolean;
  
  /**
   * Gets the neighboring triangle across from the given point
   */
  neighborAcross(point: Point2D): Triangle | null;
  
  /**
   * Gets the point opposite to the given triangle at the specified point
   */
  oppositePoint(triangle: Triangle, point: Point2D): Point2D;
  
  /**
   * Gets the index of the given point in this triangle
   */
  index(point: Point2D): number;
  
  /**
   * Legalizes an edge by rotating it
   */
  legalize(p1: Point2D, p2: Point2D): void;
  
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
 * Node in the advancing front
 */
export interface Node {
  point: Point2D;
  triangle: Triangle | null;
  next: Node | null;
  prev: Node | null;
}

/**
 * Basin structure for handling basins during triangulation
 */
export interface Basin {
  left_node: Node | null;
  bottom_node: Node | null;
  right_node: Node | null;
  width: number;
  left_highest: boolean;
}

/**
 * Edge event structure for constrained edge processing
 */
export interface EdgeEvent {
  constrained_edge: Edge | null;
  right: boolean;
}

/**
 * Advancing front structure
 */
export interface AdvancingFront {
  /**
   * Gets the head node of the advancing front
   */
  head(): Node;
}

/**
 * Sweep context for triangulation algorithm
 */
export interface SweepContext {
  basin: Basin;
  edge_event: EdgeEvent;
  
  /**
   * Initializes the triangulation data structures
   */
  initTriangulation(): void;
  
  /**
   * Creates the initial advancing front
   */
  createAdvancingFront(): void;
  
  /**
   * Gets the total number of points to triangulate
   */
  pointCount(): number;
  
  /**
   * Gets a point by index
   */
  getPoint(index: number): Point2D;
  
  /**
   * Locates the node in the advancing front for the given point
   */
  locateNode(point: Point2D): Node;
  
  /**
   * Adds a triangle to the map
   */
  addToMap(triangle: Triangle): void;
  
  /**
   * Maps a triangle to the node structure
   */
  mapTriangleToNodes(triangle: Triangle): void;
  
  /**
   * Gets the advancing front
   */
  front(): AdvancingFront;
  
  /**
   * Cleans up the mesh starting from the given triangle
   */
  meshClean(triangle: Triangle): void;
}

/**
 * Main triangulation function implementing the Poly2Tri algorithm
 * @param sweepContext - The sweep context containing points and constraints
 */
export declare function triangulate(sweepContext: SweepContext): void;