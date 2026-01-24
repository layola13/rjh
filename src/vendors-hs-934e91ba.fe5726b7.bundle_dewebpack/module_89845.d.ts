/**
 * Floyd-Warshall algorithm for finding shortest paths between all pairs of vertices in a weighted graph.
 * @module FloydWarshall
 */

/**
 * Represents the shortest path information between two nodes.
 */
export interface PathInfo {
  /** The shortest distance between two nodes */
  distance: number;
  /** The predecessor node in the shortest path */
  predecessor?: string;
}

/**
 * Matrix storing shortest path information from each source node to all other nodes.
 * First key: source node, Second key: target node
 */
export interface AllPairsShortestPaths {
  [sourceNode: string]: {
    [targetNode: string]: PathInfo;
  };
}

/**
 * Represents an edge in the graph.
 */
export interface Edge {
  /** Source vertex */
  v: string;
  /** Target vertex */
  w: string;
  /** Edge name/identifier */
  name?: string;
}

/**
 * Graph interface with methods to query nodes and edges.
 */
export interface Graph {
  /** Returns all nodes in the graph */
  nodes(): string[];
  /** Returns outgoing edges from a given node */
  outEdges(nodeId: string): Edge[];
}

/**
 * Function that returns the weight of an edge.
 */
export type WeightFunction = (edge: Edge) => number;

/**
 * Function that returns edges connected to a node.
 */
export type EdgeAccessorFunction = (nodeId: string) => Edge[];

/**
 * Default constant weight function that returns 1 for all edges.
 */
declare const constant: (value: number) => () => number;

/**
 * Computes all-pairs shortest paths using the Floyd-Warshall algorithm.
 * 
 * @param graph - The graph to analyze
 * @param weightFn - Optional function to compute edge weights (defaults to constant weight of 1)
 * @param edgeFn - Optional function to get edges for a node (defaults to graph.outEdges)
 * @returns Matrix of shortest paths between all pairs of nodes
 * 
 * @example
 *