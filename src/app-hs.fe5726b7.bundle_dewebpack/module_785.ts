export class CycleException extends Error {
  constructor() {
    super('Cycle detected in graph');
    this.name = 'CycleException';
  }
}

interface Graph<T = string> {
  sinks(): T[];
  predecessors(node: T): T[];
  nodeCount(): number;
}

interface GraphUtility {
  each<T>(collection: T[], iterator: (item: T) => void): void;
  has(object: Record<string, boolean>, key: string): boolean;
  size(object: Record<string, boolean>): number;
}

declare const graphUtils: GraphUtility;

/**
 * Performs topological sort on a directed graph
 * @param graph - The graph to sort
 * @returns Array of nodes in topological order
 * @throws {CycleException} If the graph contains a cycle
 */
export function topologicalSort<T = string>(graph: Graph<T>): T[] {
  const visited: Record<string, boolean> = {};
  const visiting: Record<string, boolean> = {};
  const sorted: T[] = [];

  function visit(node: T): void {
    const nodeKey = String(node);

    if (graphUtils.has(visiting, nodeKey)) {
      throw new CycleException();
    }

    if (!graphUtils.has(visited, nodeKey)) {
      visiting[nodeKey] = true;
      visited[nodeKey] = true;

      graphUtils.each(graph.predecessors(node), visit);

      delete visiting[nodeKey];
      sorted.push(node);
    }
  }

  graphUtils.each(graph.sinks(), visit);

  if (graphUtils.size(visited) !== graph.nodeCount()) {
    throw new CycleException();
  }

  return sorted;
}