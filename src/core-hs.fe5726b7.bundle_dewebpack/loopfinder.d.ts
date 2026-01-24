/**
 * Loop finding and utility module for topological analysis of edges and faces.
 * Provides algorithms for discovering loops in a half-edge data structure and managing loop hierarchies.
 */

import type { Vector2, Vector3 } from 'three';
import type { Wall } from './Wall';
import type { Vertex } from './Vertex';
import type { Loop } from './Loop';

/**
 * Represents a half-edge in the topology graph.
 * Each edge is split into two half-edges with opposite directions.
 */
export interface HalfEdge {
  /** Starting vertex of this half-edge */
  from: Vertex;
  
  /** Ending vertex of this half-edge */
  to: Vertex;
  
  /** Unique identifier of the associated edge */
  edgeID?: string | number;
  
  /** Direction vector of this half-edge */
  direction: Vector2;
  
  /** Direction vector at the start point (for curved edges) */
  directionF?: Vector2;
  
  /** Direction vector at the end point (for curved edges) */
  directionT?: Vector2;
  
  /** The opposite half-edge sharing the same edge */
  partner?: HalfEdge;
  
  /** The loop this half-edge belongs to */
  loop?: LoopData;
  
  /** Discrete sample points along this half-edge (for curved edges) */
  discretePts?: Vector2[];
}

/**
 * Represents a topological edge composed of two half-edges.
 */
export interface Edge {
  /** First half-edge of this edge */
  halfEdge1: HalfEdge;
  
  /** Second half-edge of this edge (opposite direction) */
  halfEdge2: HalfEdge;
  
  /** Associated wall entity, if any */
  wall?: Wall;
}

/**
 * Represents a self-loop edge (an edge that starts and ends at the same vertex).
 */
export interface SelfLoopEdge extends Edge {
  // Inherits all Edge properties
}

/**
 * Internal data structure for fake connecting walls used in loop construction.
 */
interface FakeConnectingWall {
  /** Unique identifier */
  id: string | number;
  
  /** Starting vertex */
  from: Vertex;
  
  /** Ending vertex */
  to: Vertex;
  
  /** Direction vector */
  direction: Vector2;
  
  /** Source wall entity */
  fromWall: Wall;
  
  /** Target wall entity */
  toWall: Wall;
  
  /** Wall this fake connection is associated with */
  associatedWall?: Wall;
  
  /** Linear interpolation parameter on the associated wall */
  associatedLerp: number;
}

/**
 * Represents a closed loop of half-edges forming a face boundary.
 * Manages loop hierarchy (parent-child relationships for holes).
 */
export declare class LoopData {
  /** Collection of half-edges forming this loop */
  halfEdges: HalfEdge[];
  
  /** Flag indicating if cached data needs recalculation */
  dirty: boolean;
  
  /** Parent loop containing this loop (for holes) */
  parent?: LoopData;
  
  /** Child loops contained within this loop */
  children: Set<LoopData>;
  
  /** Cached ordered loop edges after cleanup */
  private _loopEdges: HalfEdge[];
  
  /** Cached array of edge IDs forming the loop boundary */
  private _boundEdgeIds: Array<string | number>;
  
  /** Cached signed area (positive = CCW, negative = CW) */
  private _area: number;

  constructor();

  /**
   * Gets the signed area of this loop.
   * Positive area indicates counter-clockwise (CCW) orientation.
   * Negative area indicates clockwise (CW) orientation.
   */
  get area(): number;

  /**
   * Gets the array of unique edge IDs forming the loop boundary.
   */
  get boundEdgeIds(): Array<string | number>;

  /**
   * Gets the ordered array of half-edges forming this loop after cleanup.
   * Removes redundant back-and-forth edges.
   */
  get loopEdges(): HalfEdge[];

  /**
   * Gets the array of vertices (points) forming this loop.
   */
  get loopPoints(): Vertex[];

  /**
   * Gets the loop path as an array of THREE.Vector3 points.
   */
  get loopPath(): Vector3[];

  /**
   * Gets the discrete points along the loop boundary.
   * Includes intermediate sample points for curved edges.
   */
  get loopDiscretePoints(): Vertex[];

  /**
   * Checks if all edges in this loop have discrete sample points.
   */
  get hasDiscretePoints(): boolean;

  /**
   * Adds a half-edge to this loop and marks it as dirty.
   * @param halfEdge - The half-edge to add
   */
  addHalfEdge(halfEdge: HalfEdge): void;

  /**
   * Sets the parent loop of this loop (for nested loop hierarchies).
   * @param parent - The parent loop containing this loop
   */
  setParent(parent: LoopData): void;

  /**
   * Removes a child loop from this loop's children set.
   * @param child - The child loop to remove
   */
  private _removeChild(child: LoopData): void;

  /**
   * Adds a child loop to this loop's children set.
   * @param child - The child loop to add
   */
  private _addChild(child: LoopData): void;

  /**
   * Checks if this loop is completely inside another loop.
   * @param otherLoop - The loop to test against
   * @returns True if all discrete points of this loop are inside the other loop
   */
  isInSideLoop(otherLoop: LoopData): boolean;

  /**
   * Checks if this loop shares any edge with another loop.
   * @param otherLoop - The loop to compare with
   * @returns True if at least one edge is shared
   */
  isShareSomeEdge(otherLoop: LoopData): boolean;

  /**
   * Checks if this loop is a boundary loop (clockwise orientation).
   * @returns True if this loop has negative area (CW)
   */
  isBoundLoop(): boolean;

  /**
   * Checks if this loop has counter-clockwise orientation.
   * @returns True if this loop has positive area
   */
  isCCW(): boolean;

  /**
   * Checks if this loop has clockwise orientation.
   * @returns True if this loop has negative area
   */
  isCW(): boolean;

  /**
   * Updates cached loop data (edges, edge IDs, area) if marked as dirty.
   */
  update(): void;
}

/**
 * Algorithm for finding all loops in a half-edge graph structure.
 * Constructs loop hierarchy by analyzing edge connectivity and orientations.
 */
export declare class LoopFinder {
  /** Input edges for loop finding */
  readonly edges: Edge[];
  
  /** Self-loop edges (edges connecting a vertex to itself) */
  readonly selfLoopEdges: SelfLoopEdge[];
  
  /** Map from vertex ID to outgoing half-edges */
  readonly outHalfEdgesMap: Map<string | number, HalfEdge[]>;
  
  /** All discovered loops */
  readonly loops: LoopData[];

  /**
   * Creates a new loop finder and executes the search algorithm.
   * @param edges - Array of edges to analyze
   * @param selfLoopEdges - Optional array of self-loop edges
   */
  constructor(edges: Edge[], selfLoopEdges?: SelfLoopEdge[]);

  /**
   * Adds a half-edge to the outgoing edges map.
   * @param halfEdge - The half-edge to add
   */
  private _addHalfEdge(halfEdge: HalfEdge): void;

  /**
   * Gets all root loops (CW loops without parents).
   * These represent the outermost boundaries.
   * @returns Array of root loops
   */
  getRootLoops(): LoopData[];

  /**
   * Gets all inner edges (edges between two CCW loops).
   * @returns Array of inner edges
   */
  getInnerEdges(): Edge[];

  /**
   * Gets all outer edges (edges between a CCW and CW loop).
   * @returns Array of outer boundary edges
   */
  getOuterEdges(): Edge[];

  /**
   * Gets all isolated edges (edges between two CW loops).
   * @returns Array of isolated edges
   */
  getIsolateEdges(): Edge[];

  /**
   * Finds the loop containing a specific half-edge.
   * @param from - Starting vertex
   * @param to - Ending vertex
   * @returns The loop containing the half-edge, or undefined
   */
  getHalfEdgeLoop(from: Vertex, to: Vertex): LoopData | undefined;

  /**
   * Gets all counter-clockwise (CCW) oriented loops.
   * @returns Array of CCW loops
   */
  getCCWLoops(): LoopData[];

  /**
   * Main search algorithm to discover all loops in the edge graph.
   * @returns Array of all discovered loops
   */
  search(): LoopData[];

  /**
   * Gets all outgoing half-edges from a vertex.
   * @param vertex - The vertex to query
   * @returns Array of outgoing half-edges
   */
  private _outHalfEdges(vertex: Vertex): HalfEdge[] | undefined;

  /**
   * Searches for a loop starting from a given half-edge.
   * @param startHalfEdge - The half-edge to start searching from
   * @returns The discovered loop, or null if already visited
   */
  private _search(startHalfEdge: HalfEdge): LoopData | null;

  /**
   * Finds the next outgoing half-edge following the smallest clockwise angle.
   * @param currentHalfEdge - Current half-edge
   * @param outHalfEdges - Available outgoing half-edges from the current endpoint
   * @returns The next half-edge to traverse
   */
  private _findNextOutHalfEdge(
    currentHalfEdge: HalfEdge,
    outHalfEdges: HalfEdge[]
  ): HalfEdge | undefined;

  /**
   * Updates parent-child relationships between loops based on containment.
   * CCW loops become children of CW loops that contain them.
   * @param loops - Set of all loops to analyze
   */
  private _updateLoopsParent(loops: Set<LoopData>): void;
}

/**
 * Utility functions for loop processing and wall loop extraction.
 */
export declare const LoopUtil: {
  /**
   * Cleans up a loop array by removing consecutive duplicate elements.
   * Also removes the last element if it equals the first (closing duplicates).
   * @param loopArray - Array to clean up
   * @param equalsFn - Optional custom equality function (defaults to strict equality)
   * @returns Cleaned array without consecutive duplicates
   */
  cleanupLoopArray<T>(
    loopArray: T[],
    equalsFn?: (a: T, b: T) => boolean
  ): T[];

  /**
   * Extracts all wall loops from a layer using topological analysis.
   * Constructs half-edges from walls and finds all closed loops.
   * @param layer - The layer containing walls to analyze
   * @returns A LoopFinder instance with all discovered loops
   */
  getLayerWallLoops(layer: unknown): LoopFinder;

  /**
   * Internal method to generate fake connecting walls for intersecting walls.
   * @param layer - The layer to analyze
   * @returns Array of fake connecting wall descriptors
   */
  _getFakeConnectingWalls(layer: unknown): FakeConnectingWall[];

  /**
   * Gets all parent wall entities associated with a vertex.
   * @param vertex - The vertex to query
   * @returns Array of parent walls
   */
  getParentWalls(vertex: Vertex): Wall[];

  /**
   * Updates an existing loop by moving its vertices to new positions.
   * If vertex counts don't match, creates a new loop instead.
   * @param existingLoop - The loop to update
   * @param newPoints - New positions for the loop vertices
   * @returns The updated loop or a newly created loop
   */
  updateLoopByPoints(existingLoop: Loop | undefined, newPoints: Vector3[]): Loop;

  /**
   * Creates a new model loop from an array of points.
   * @param points - Array of 2D or 3D points
   * @returns A new Loop instance
   */
  createModelLoop(points: Array<{ x: number; y: number; z?: number }>): Loop;
};