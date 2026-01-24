/**
 * Topological sort algorithm for directed acyclic graphs (DAG).
 * Performs a depth-first search to order nodes such that for every directed edge u → v,
 * u comes before v in the ordering.
 * 
 * @module TopologicalSort
 */

import type * as GraphLib from './graphlib';

/**
 * Error thrown when a cycle is detected in the graph during topological sorting.
 * A topological sort is only possible for directed acyclic graphs (DAGs).
 */
export class CycleException extends Error {
  constructor(message?: string);
}

/**
 * Performs a topological sort on a directed graph.
 * 
 * @param graph - The directed graph to sort. Must be acyclic (DAG).
 * @returns An array of node identifiers in topological order, where each node
 *          appears before all nodes it has edges to.
 * @throws {CycleException} If the graph contains a cycle, making topological sort impossible.
 * 
 * @example
 *