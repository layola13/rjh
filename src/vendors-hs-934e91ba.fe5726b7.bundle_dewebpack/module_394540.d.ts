/**
 * Prim's minimum spanning tree algorithm implementation
 * @module PrimMST
 */

import type { Graph } from './graph-types';
import type { PriorityQueue } from './priority-queue-types';

/**
 * Edge weight calculation function
 * @callback WeightFunction
 * @param edge - The edge object containing vertices v and w
 * @returns The weight/cost of the edge
 */
type WeightFunction<TEdge> = (edge: TEdge) => number;

/**
 * Edge representation in the graph
 */
interface Edge {
  /** First vertex of the edge */
  v: string | number;
  /** Second vertex of the edge */
  w: string | number;
}

/**
 * Computes the minimum spanning tree of a graph using Prim's algorithm
 * 
 * @template TEdge - Type of edge object in the graph
 * @param graph - The input graph to process
 * @param weightFunction - Function to calculate edge weights
 * @returns A new graph representing the minimum spanning tree
 * @throws {Error} If the input graph is not connected
 */
declare function primMST<TEdge extends Edge>(
  graph: Graph,
  weightFunction: WeightFunction<TEdge>
): Graph;

/**
 * Graph interface representing a mathematical graph structure
 */
interface Graph {
  /**
   * Returns the number of nodes in the graph
   */
  nodeCount(): number;

  /**
   * Returns an array of all node identifiers
   */
  nodes(): Array<string | number>;

  /**
   * Returns all edges connected to a specific node
   * @param node - The node identifier
   */
  nodeEdges(node: string | number): Edge[];

  /**
   * Sets/adds a node to the graph
   * @param node - The node identifier
   */
  setNode(node: string | number): void;

  /**
   * Sets/adds an edge between two nodes
   * @param from - Source node identifier
   * @param to - Target node identifier
   */
  setEdge(from: string | number, to: string | number): void;
}

/**
 * Priority queue interface for efficient minimum extraction
 */
interface PriorityQueue<T = string | number> {
  /**
   * Adds an element with a given priority
   * @param element - The element to add
   * @param priority - The priority value (lower = higher priority)
   */
  add(element: T, priority: number): void;

  /**
   * Gets the priority of an element
   * @param element - The element to query
   * @returns The priority value, or undefined if not found
   */
  priority(element: T): number | undefined;

  /**
   * Decreases the priority of an element
   * @param element - The element to update
   * @param newPriority - The new priority value
   */
  decrease(element: T, newPriority: number): void;

  /**
   * Removes and returns the element with minimum priority
   * @returns The element with the lowest priority
   */
  removeMin(): T;

  /**
   * Returns the number of elements in the queue
   */
  size(): number;
}

/**
 * Utility functions for object/collection operations
 */
interface UtilityFunctions {
  /**
   * Iterates over elements in a collection
   * @param collection - The collection to iterate
   * @param callback - Function called for each element
   */
  each<T>(collection: T[], callback: (item: T) => void): void;

  /**
   * Checks if an object has a specific property
   * @param object - The object to check
   * @param key - The property key
   */
  has(object: Record<string | number, unknown>, key: string | number): boolean;
}

export { primMST, Graph, PriorityQueue, Edge, WeightFunction, UtilityFunctions };
export default primMST;