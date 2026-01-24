/**
 * Graph traversal module - Depth First Search implementation
 * Provides DFS traversal functionality for directed and undirected graphs
 */

/**
 * Graph node identifier
 */
type NodeId = string | number;

/**
 * Graph interface representing a data structure with nodes and edges
 */
interface Graph {
  /**
   * Check if the graph is directed
   * @returns true if the graph has directed edges
   */
  isDirected(): boolean;

  /**
   * Check if a node exists in the graph
   * @param nodeId - The identifier of the node to check
   * @returns true if the node exists in the graph
   */
  hasNode(nodeId: NodeId): boolean;

  /**
   * Get all successor nodes (outgoing edges) for a directed graph
   * @param nodeId - The identifier of the source node
   * @returns Array of successor node identifiers
   */
  successors(nodeId: NodeId): NodeId[];

  /**
   * Get all neighboring nodes (adjacent nodes) for an undirected graph
   * @param nodeId - The identifier of the node
   * @returns Array of neighbor node identifiers
   */
  neighbors(nodeId: NodeId): NodeId[];
}

/**
 * Traversal order type
 * - 'pre': Pre-order traversal (visit node before its descendants)
 * - 'post': Post-order traversal (visit node after its descendants)
 */
type TraversalOrder = 'pre' | 'post';

/**
 * Visited nodes tracking object
 */
type VisitedMap = Record<NodeId, boolean>;

/**
 * Utility functions interface (lodash-like)
 */
interface UtilityLibrary {
  /**
   * Check if an object has a specific property
   * @param obj - The object to check
   * @param key - The property key
   * @returns true if the property exists
   */
  has(obj: Record<string, any>, key: string | number): boolean;

  /**
   * Iterate over a collection and execute a callback for each element
   * @param collection - The collection to iterate
   * @param callback - Function to execute for each element
   */
  each<T>(collection: T[], callback: (item: T) => void): void;

  /**
   * Check if a value is an array
   * @param value - The value to check
   * @returns true if the value is an array
   */
  isArray(value: any): value is any[];
}

/**
 * Recursively visit nodes in depth-first order
 * 
 * @param graph - The graph instance (unused in recursion but kept for signature)
 * @param nodeId - Current node to visit
 * @param isPostOrder - If true, add node after visiting descendants (post-order)
 * @param visited - Map tracking already visited nodes to prevent cycles
 * @param getNeighbors - Function to retrieve adjacent nodes
 * @param result - Accumulated array of visited nodes in order
 */
declare function visitNode(
  graph: Graph,
  nodeId: NodeId,
  isPostOrder: boolean,
  visited: VisitedMap,
  getNeighbors: (nodeId: NodeId) => NodeId[],
  result: NodeId[]
): void;

/**
 * Perform depth-first search traversal on a graph
 * 
 * @param graph - The graph to traverse
 * @param startNodes - Single node or array of starting nodes for traversal
 * @param order - Traversal order: 'pre' for pre-order, 'post' for post-order
 * @returns Array of node identifiers in traversal order
 * @throws Error if any starting node does not exist in the graph
 * 
 * @example
 *