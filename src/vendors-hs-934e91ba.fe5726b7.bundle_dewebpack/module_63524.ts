interface Graph<T = string> {
  nodes(): T[];
  successors(node: T): T[];
  predecessors(node: T): T[];
}

interface UtilityLibrary {
  has(obj: Record<string, unknown>, key: string): boolean;
  each<T>(collection: T[], iteratee: (item: T) => void): void;
}

export function findConnectedComponents<T = string>(
  graph: Graph<T>,
  utils: UtilityLibrary
): T[][] {
  const visited: Record<string, boolean> = {};
  const connectedComponents: T[][] = [];
  let currentComponent: T[];

  function visitNode(node: T): void {
    const nodeKey = String(node);
    
    if (utils.has(visited, nodeKey)) {
      return;
    }

    visited[nodeKey] = true;
    currentComponent.push(node);
    
    utils.each(graph.successors(node), visitNode);
    utils.each(graph.predecessors(node), visitNode);
  }

  utils.each(graph.nodes(), (node: T) => {
    currentComponent = [];
    visitNode(node);
    
    if (currentComponent.length > 0) {
      connectedComponents.push(currentComponent);
    }
  });

  return connectedComponents;
}