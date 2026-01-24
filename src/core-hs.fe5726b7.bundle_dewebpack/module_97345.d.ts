/**
 * Euler operations for topological modeling.
 * Provides fundamental operations for manipulating boundary representation (B-rep) models.
 */
export declare class EulerOperations {
  /**
   * Make Vertex Shell Face (MVSF)
   * Creates a new vertex, loop, and face from a point.
   * 
   * @param point - The 3D coordinates for the new vertex
   * @returns An object containing the newly created face, loop, and vertex
   */
  static mvsf(point: Point3D): MvsfResult;

  /**
   * Make Edge Vertex (MEV)
   * Creates a new edge and vertex within an existing loop.
   * 
   * @param fromVertex - The starting vertex for the new edge
   * @param toPoint - The 3D coordinates for the new vertex
   * @param loop - The loop to add the edge to
   * @returns An object containing the newly created edge and vertex
   */
  static mev(fromVertex: Vertex, toPoint: Point3D, loop: Loop): MevResult;

  /**
   * Kill Edge Vertex (KEV)
   * Removes an edge and its associated vertex from a loop.
   * Inverse operation of MEV.
   * 
   * @param edge - The edge to remove
   * @param vertex - The vertex to remove
   * @param loop - The loop containing the edge
   */
  static kev(edge: Edge, vertex: Vertex, loop: Loop): void;

  /**
   * Make Edge Face (MEF)
   * Creates a new edge and face by splitting an existing loop.
   * 
   * @param fromVertex - The starting vertex for the new edge
   * @param toVertex - The ending vertex for the new edge
   * @param loop - The loop to split
   * @returns An object containing the newly created edge and loop
   */
  static mef(fromVertex: Vertex, toVertex: Vertex, loop: Loop): MefResult;

  /**
   * Kill Edge Face (KEF)
   * Removes an edge and merges two loops into one.
   * Inverse operation of MEF.
   * 
   * @param edge - The edge to remove
   * @param face - The face containing the edge
   */
  static kef(edge: Edge, face: Face): void;

  /**
   * Edge Split (ESPLIT)
   * Splits an edge into multiple segments by inserting intermediate vertices.
   * 
   * @param edge - The edge to split
   * @param vertices - Array of intermediate vertices to insert
   * @returns An object containing the array of newly created edges, or undefined if no vertices provided
   */
  static esplit(edge: Edge, vertices: Vertex[]): EsplitResult | undefined;

  /**
   * Merge Edges on Vertex
   * Merges two collinear edges that meet at a vertex into a single edge.
   * 
   * @param vertex - The vertex where two edges meet
   * @returns True if merge was successful, false otherwise
   */
  static mergeEdgesOnVertex(vertex: Vertex): boolean;
}

/**
 * 3D point coordinates
 */
interface Point3D {
  /** X coordinate */
  x?: number;
  /** Y coordinate */
  y?: number;
  /** Z coordinate */
  z?: number;
}

/**
 * Result of MVSF operation
 */
interface MvsfResult {
  /** The newly created face */
  face: Face;
  /** The newly created loop */
  loop: Loop;
  /** The newly created vertex */
  vertex: Vertex;
}

/**
 * Result of MEV operation
 */
interface MevResult {
  /** The newly created edge */
  edge: Edge;
  /** The newly created vertex */
  vertex: Vertex;
}

/**
 * Result of MEF operation
 */
interface MefResult {
  /** The newly created edge */
  edge: Edge;
  /** The newly created loop */
  loop: Loop;
}

/**
 * Result of ESPLIT operation
 */
interface EsplitResult {
  /** Array of newly created edges from the split */
  edges: Edge[];
}

/**
 * Represents a vertex in 3D space
 */
declare class Vertex {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
  /** Z coordinate */
  z: number;
  /** Parent topological elements */
  parents: Record<string, unknown>;

  /**
   * Creates a new vertex
   * @param x - X coordinate
   * @param y - Y coordinate
   * @param z - Z coordinate
   */
  static create(x: number, y: number, z: number): Vertex;
}

/**
 * Represents an edge connecting two vertices
 */
declare class Edge {
  /** Starting vertex of the edge */
  from?: Vertex;
  /** Ending vertex of the edge */
  to?: Vertex;
  /** Associated co-edge */
  coedge?: CoEdge;
  /** Curve geometry of the edge */
  curve?: unknown;
  /** Whether this edge is a split edge */
  isSplitEdge?: boolean;
  /** Whether this edge is an inner edge */
  isInnerEdge?: boolean;

  /**
   * Creates a new edge
   * @param from - Starting vertex
   * @param to - Ending vertex
   */
  static create(from: Vertex, to: Vertex): Edge;

  /**
   * Removes the edge from the model
   */
  remove(): void;

  /**
   * Copies properties from another edge
   * @param source - Source edge to copy from
   */
  copyProperty(source: Edge): void;
}

/**
 * Represents a co-edge (oriented edge) in a loop
 */
declare class CoEdge {
  /** Starting vertex */
  from: Vertex;
  /** Ending vertex */
  to: Vertex;
  /** Next co-edge in the loop */
  next?: CoEdge;
  /** Previous co-edge in the loop */
  prev?: CoEdge;
  /** Partner co-edge (opposite orientation) */
  partner: CoEdge;
  /** Associated edge */
  edge: Edge;
  /** Whether the co-edge is reversed */
  reversed?: boolean;

  /**
   * Creates a new co-edge
   * @param from - Starting vertex
   * @param to - Ending vertex
   */
  static create(from: Vertex, to: Vertex): CoEdge;

  /**
   * Removes the co-edge from the model
   */
  remove(): void;

  /**
   * Sets the parent loop for this co-edge
   * @param loop - The parent loop
   */
  setLoop(loop: Loop): void;

  /**
   * Gets the unique parent loop
   */
  getUniqueParent(): Loop;
}

/**
 * Represents a loop of connected co-edges
 */
declare class Loop {
  /** Root co-edge of the loop */
  root?: CoEdge;

  /**
   * Finds a co-edge that ends at the specified vertex
   * @param vertex - Target vertex
   */
  findCoEdgeToVertex(vertex: Vertex): CoEdge;

  /**
   * Adds a co-edge as a child of this loop
   * @param coedge - Co-edge to add
   */
  addChild(coedge: CoEdge): void;

  /**
   * Removes all child co-edges
   */
  removeAllChildren(): void;

  /**
   * Removes a specific co-edge from the loop
   * @param coedge - Co-edge to remove
   */
  removeCoEdge(coedge: CoEdge): void;

  /**
   * Appends a co-edge after a specified co-edge
   * @param coedge - Co-edge to append
   * @param after - Co-edge to append after
   */
  appendCoEdge(coedge: CoEdge, after: CoEdge): void;

  /**
   * Iterates over all co-edges in the loop
   * @param callback - Function to call for each co-edge
   */
  forEachCoEdge(callback: (coedge: CoEdge) => void): void;

  /**
   * Validates the loop structure
   * @returns True if valid, false otherwise
   */
  validate(): boolean;
}

/**
 * Represents a face bounded by loops
 */
declare class Face {
  /** The outer boundary loop of the face */
  outerLoop?: Loop;
}