/**
 * Poly2Tri - 2D Constrained Delaunay Triangulation Library
 * 
 * This module provides types for the sweep context and related data structures
 * used in the triangulation algorithm.
 */

/**
 * Represents a point in 2D space
 */
export interface Point {
  x: number;
  y: number;
  /** Internal edge list for point management */
  _p2t_edge_list?: Edge[];
}

/**
 * Represents an edge between two points in the triangulation
 */
export declare class Edge {
  /** Start point of the edge (lower y-coordinate, or leftmost if y is equal) */
  p: Point;
  /** End point of the edge (higher y-coordinate, or rightmost if y is equal) */
  q: Point;

  /**
   * Creates a new edge between two points
   * @param pointA - First point
   * @param pointB - Second point
   * @throws Error if the two points are identical
   */
  constructor(pointA: Point, pointB: Point);
}

/**
 * Configuration for basin optimization during triangulation
 * A basin is a concave region that needs special handling
 */
export interface Basin {
  /** Left node of the basin */
  left_node: AdvancingFrontNode | null;
  /** Bottom node of the basin */
  bottom_node: AdvancingFrontNode | null;
  /** Right node of the basin */
  right_node: AdvancingFrontNode | null;
  /** Width of the basin */
  width: number;
  /** Whether the left side is the highest point */
  left_highest: boolean;

  /**
   * Resets the basin to initial state
   */
  clear(): void;
}

/**
 * Represents an edge event during the sweep algorithm
 */
export interface EdgeEvent {
  /** The constrained edge involved in the event */
  constrained_edge: Edge | null;
  /** Whether the event occurs on the right side */
  right: boolean;
}

/**
 * Node in the advancing front data structure
 */
export interface AdvancingFrontNode {
  /** Pointer to next node in the front */
  next: AdvancingFrontNode | null;
  /** Pointer to previous node in the front */
  prev: AdvancingFrontNode | null;
  /** The point at this node */
  point: Point;
  /** Triangle associated with this node */
  triangle: Triangle | null;
}

/**
 * The advancing front structure used during sweep
 */
export interface AdvancingFront {
  /**
   * Locates the node at or near a given x-coordinate
   * @param x - The x-coordinate to search for
   * @returns The node at or near the given position
   */
  locateNode(x: number): AdvancingFrontNode | null;

  /**
   * Locates a node near a given point
   * @param point - The point to search near
   * @returns The node near the given point
   */
  locatePoint(point: Point): AdvancingFrontNode | null;
}

/**
 * Represents a triangle in the triangulation
 */
export interface Triangle {
  /** Array of constrained edges for each side */
  constrained_edge: boolean[];

  /**
   * Gets a neighboring triangle
   * @param index - Index of the neighbor (0-2)
   * @returns The neighboring triangle or null
   */
  getNeighbor(index: number): Triangle | null;

  /**
   * Gets a point of the triangle
   * @param index - Index of the point (0-2)
   * @returns The point at the given index
   */
  getPoint(index: number): Point;

  /**
   * Gets the next point clockwise from the given point
   * @param point - Reference point
   * @returns The next point in clockwise order
   */
  pointCW(point: Point): Point;

  /**
   * Checks if the triangle is marked as interior
   * @returns True if interior, false otherwise
   */
  isInterior(): boolean;

  /**
   * Marks the triangle as interior or exterior
   * @param interior - Whether the triangle should be marked as interior
   */
  setInterior(interior: boolean): void;
}

/**
 * Options for configuring the sweep context
 */
export interface SweepContextOptions {
  /**
   * Whether to clone the input arrays to avoid external modifications
   * @default false
   */
  cloneArrays?: boolean;
}

/**
 * Main sweep context class that manages the triangulation state
 */
export declare class SweepContext {
  /** List of triangles created during triangulation */
  private triangles_: Triangle[];
  /** Map of triangles for efficient lookup */
  private map_: Triangle[];
  /** Array of all points to be triangulated */
  private points_: Point[];
  /** List of constrained edges */
  edge_list: Edge[];
  /** Minimum point of the bounding box */
  private pmin_: Point | null;
  /** Maximum point of the bounding box */
  private pmax_: Point | null;
  /** The advancing front structure */
  private front_: AdvancingFront | null;
  /** Head point of the initial triangle */
  private head_: Point | null;
  /** Tail point of the initial triangle */
  private tail_: Point | null;
  /** Head node of the advancing front */
  private af_head_: AdvancingFrontNode | null;
  /** Middle node of the advancing front */
  private af_middle_: AdvancingFrontNode | null;
  /** Tail node of the advancing front */
  private af_tail_: AdvancingFrontNode | null;
  /** Basin optimization structure */
  basin: Basin;
  /** Current edge event being processed */
  edge_event: EdgeEvent;

  /**
   * Creates a new sweep context
   * @param contour - Array of points defining the outer contour
   * @param options - Configuration options
   */
  constructor(contour: Point[], options?: SweepContextOptions);

  /**
   * Adds a hole to the triangulation
   * @param hole - Array of points defining the hole
   * @returns This context for method chaining
   */
  addHole(hole: Point[]): this;

  /**
   * Alias for addHole (deprecated naming convention)
   * @deprecated Use addHole instead
   */
  AddHole(hole: Point[]): this;

  /**
   * Adds multiple holes to the triangulation
   * @param holes - Array of hole contours
   * @returns This context for method chaining
   */
  addHoles(holes: Point[][]): this;

  /**
   * Adds a single point to the triangulation
   * @param point - The point to add
   * @returns This context for method chaining
   */
  addPoint(point: Point): this;

  /**
   * Alias for addPoint (deprecated naming convention)
   * @deprecated Use addPoint instead
   */
  AddPoint(point: Point): this;

  /**
   * Adds multiple points to the triangulation
   * @param points - Array of points to add
   * @returns This context for method chaining
   */
  addPoints(points: Point[]): this;

  /**
   * Performs the triangulation
   * @returns This context for method chaining
   */
  triangulate(): this;

  /**
   * Gets the bounding box of all points
   * @returns Object containing min and max points
   */
  getBoundingBox(): { min: Point; max: Point };

  /**
   * Gets the array of generated triangles
   * @returns Array of triangles
   */
  getTriangles(): Triangle[];

  /**
   * Alias for getTriangles (deprecated naming convention)
   * @deprecated Use getTriangles instead
   */
  GetTriangles(): Triangle[];

  /**
   * Gets the advancing front
   * @returns The advancing front structure
   */
  front(): AdvancingFront | null;

  /**
   * Gets the number of points in the context
   * @returns Total point count
   */
  pointCount(): number;

  /**
   * Gets the head point of the initial triangle
   * @returns The head point
   */
  head(): Point | null;

  /**
   * Sets the head point
   * @param point - The new head point
   */
  setHead(point: Point): void;

  /**
   * Gets the tail point of the initial triangle
   * @returns The tail point
   */
  tail(): Point | null;

  /**
   * Sets the tail point
   * @param point - The new tail point
   */
  setTail(point: Point): void;

  /**
   * Gets the internal triangle map
   * @returns Array of triangles in the map
   */
  getMap(): Triangle[];

  /**
   * Initializes the triangulation by computing bounding box and sorting points
   */
  initTriangulation(): void;

  /**
   * Initializes edges from a contour of points
   * @param points - Array of points forming a closed contour
   */
  initEdges(points: Point[]): void;

  /**
   * Gets a point by index
   * @param index - Index of the point
   * @returns The point at the given index
   */
  getPoint(index: number): Point;

  /**
   * Adds a triangle to the internal map
   * @param triangle - Triangle to add
   */
  addToMap(triangle: Triangle): void;

  /**
   * Locates the advancing front node at a given point
   * @param point - Point to locate
   * @returns The node at or near the point
   */
  locateNode(point: Point): AdvancingFrontNode | null;

  /**
   * Creates the initial advancing front structure
   */
  createAdvancingFront(): void;

  /**
   * Removes a node from the advancing front
   * @param node - Node to remove
   */
  removeNode(node: AdvancingFrontNode): void;

  /**
   * Maps a triangle to its corresponding nodes in the advancing front
   * @param triangle - Triangle to map
   */
  mapTriangleToNodes(triangle: Triangle): void;

  /**
   * Removes a triangle from the internal map
   * @param triangle - Triangle to remove
   */
  removeFromMap(triangle: Triangle): void;

  /**
   * Performs mesh cleanup to mark interior triangles
   * @param triangle - Starting triangle for the cleanup process
   */
  meshClean(triangle: Triangle): void;
}

export default SweepContext;