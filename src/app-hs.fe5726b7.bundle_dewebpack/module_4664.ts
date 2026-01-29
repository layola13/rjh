interface Graph<T = string> {
  nodes(): T[];
  successors(node: T): T[];
  predecessors(node: T): T[];
}

interface GraphUtils {
  has(obj: Record<string, unknown>, key: string): boolean;
  each<T>(collection: T[], callback: (item: T) => void): void;
}

/**
 * Finds all connected components in a directed graph.
 * Returns an array of components, where each component is an array of connected nodes.
 */
export default function findConnectedComponents<T = string>(
  graph: Graph<T>,
  utils: GraphUtils
): T[][] {
  const visitedNodes: Record<string, boolean> = {};
  const components: T[][] = [];
  let currentComponent: T[];

  function visitNode(node: T): void {
    const nodeKey = String(node);
    
    if (utils.has(visitedNodes, nodeKey)) {
      return;
    }

    visitedNodes[nodeKey] = true;
    currentComponent.push(node);
    
    utils.each(graph.successors(node), visitNode);
    utils.each(graph.predecessors(node), visitNode);
  }

  utils.each(graph.nodes(), (node: T) => {
    currentComponent = [];
    visitNode(node);
    
    if (currentComponent.length > 0) {
      components.push(currentComponent);
    }
  });

  return components;
}