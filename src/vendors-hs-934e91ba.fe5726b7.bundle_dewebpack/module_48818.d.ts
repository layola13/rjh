/**
 * Dijkstra's shortest path algorithm implementation
 * Computes shortest paths from a source node to all other nodes in a graph
 * @module DijkstraShortestPath
 */

/**
 * Result of Dijkstra's algorithm for a single node
 */
export interface DijkstraResult {
  /** Distance from source node to this node */
  distance: number;
  /** Previous node in the shortest path (undefined for source node) */
  predecessor?: string;
}

/**
 * Map of node IDs to their shortest path results
 */
export interface DijkstraResults {
  [nodeId: string]: DijkstraResult;
}

/**
 * Function that returns the weight/cost of an edge
 * @param edge - The edge object to get weight from
 * @returns The numeric weight of the edge
 */
export type EdgeWeightFunction = (edge: Edge) => number;

/**
 * Function that returns all edges connected to a node
 * @param nodeId - The node ID to get edges for
 * @returns Array of edges connected to the node
 */
export type EdgeAccessorFunction = (nodeId: string) => Edge[];

/**
 * Represents an edge in the graph
 */
export interface Edge {
  /** Source vertex of the edge */
  v?: string;
  /** Destination vertex of the edge */
  w?: string;
  /** Optional edge name/identifier */
  name?: string;
}

/**
 * Graph interface with node and edge accessors
 */
export interface Graph {
  /** Returns all nodes in the graph */
  nodes(): string[];
  /** Returns all outgoing edges from a node */
  outEdges(nodeId: string): Edge[];
}

/**
 * Computes shortest paths from a source node to all reachable nodes using Dijkstra's algorithm
 * 
 * @param graph - The graph to search
 * @param source - The starting node ID
 * @param edgeWeightFn - Optional function to compute edge weights (defaults to constant weight of 1)
 * @param edgeAccessorFn - Optional function to get edges from a node (defaults to graph.outEdges)
 * @returns Map of node IDs to their shortest path results
 * @throws Error if any edge has negative weight
 */
export default function dijkstra(
  graph: Graph,
  source: string,
  edgeWeightFn?: EdgeWeightFunction,
  edgeAccessorFn?: EdgeAccessorFunction
): DijkstraResults;