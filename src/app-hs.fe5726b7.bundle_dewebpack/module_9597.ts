interface Graph {
  isDirected(): boolean;
  successors(node: string): string[];
  neighbors(node: string): string[];
  hasNode(node: string): boolean;
}

interface UtilityLibrary {
  has<T>(obj: T, key: keyof T): boolean;
  each<T>(collection: T[] | Record<string, T>, iteratee: (value: T) => void): void;
  isArray(value: unknown): value is unknown[];
}

declare const utilityLib: UtilityLibrary;

function visitNode(
  graph: Graph,
  node: string,
  isPostOrder: boolean,
  visited: Record<string, boolean>,
  getAdjacentNodes: (node: string) => string[],
  result: string[]
): void {
  if (utilityLib.has(visited, node as keyof typeof visited)) {
    return;
  }

  visited[node] = true;

  if (!isPostOrder) {
    result.push(node);
  }

  utilityLib.each(getAdjacentNodes(node), (adjacentNode: string) => {
    visitNode(graph, adjacentNode, isPostOrder, visited, getAdjacentNodes, result);
  });

  if (isPostOrder) {
    result.push(node);
  }
}

export default function graphTraversal(
  graph: Graph,
  startNodes: string | string[],
  order?: string
): string[] {
  const nodes = utilityLib.isArray(startNodes) ? startNodes : [startNodes];
  
  const getAdjacentNodes = graph.isDirected() 
    ? graph.successors.bind(graph) 
    : graph.neighbors.bind(graph);
  
  const result: string[] = [];
  const visited: Record<string, boolean> = {};
  const isPostOrder = order === "post";

  utilityLib.each(nodes, (node: string) => {
    if (!graph.hasNode(node)) {
      throw new Error(`Graph does not have node: ${node}`);
    }
    visitNode(graph, node, isPostOrder, visited, getAdjacentNodes, result);
  });

  return result;
}