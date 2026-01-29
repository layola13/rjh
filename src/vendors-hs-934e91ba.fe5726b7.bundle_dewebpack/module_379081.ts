export function dfs(
  graph: Graph,
  sources: string | string[],
  order?: 'pre' | 'post'
): string[] {
  const sourceArray = Array.isArray(sources) ? sources : [sources];
  
  const getNeighbors = graph.isDirected() 
    ? graph.successors.bind(graph) 
    : graph.neighbors.bind(graph);
  
  const result: string[] = [];
  const visited: Record<string, boolean> = {};

  const visit = (
    currentNode: string,
    isPostOrder: boolean,
    visitedNodes: Record<string, boolean>,
    neighborsFn: (node: string) => string[],
    resultList: string[]
  ): void => {
    if (visitedNodes[currentNode]) {
      return;
    }

    visitedNodes[currentNode] = true;

    if (!isPostOrder) {
      resultList.push(currentNode);
    }

    const neighbors = neighborsFn(currentNode);
    for (const neighbor of neighbors) {
      visit(neighbor, isPostOrder, visitedNodes, neighborsFn, resultList);
    }

    if (isPostOrder) {
      resultList.push(currentNode);
    }
  };

  for (const source of sourceArray) {
    if (!graph.hasNode(source)) {
      throw new Error(`Graph does not have node: ${source}`);
    }
    visit(source, order === 'post', visited, getNeighbors, result);
  }

  return result;
}

interface Graph {
  isDirected(): boolean;
  hasNode(node: string): boolean;
  successors(node: string): string[];
  neighbors(node: string): string[];
}