interface GraphNode {
  onStack: boolean;
  lowlink: number;
  index: number;
}

interface Graph<T = string> {
  nodes(): T[];
  successors(node: T): T[];
}

function has<T>(obj: Record<string, T>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function findStronglyConnectedComponents<T = string>(graph: Graph<T>): T[][] {
  let currentIndex = 0;
  const stack: T[] = [];
  const nodeInfo: Record<string, GraphNode> = {};
  const stronglyConnectedComponents: T[][] = [];

  function strongConnect(node: T): void {
    const info: GraphNode = {
      onStack: true,
      lowlink: currentIndex,
      index: currentIndex++
    };
    nodeInfo[node as string] = info;
    stack.push(node);

    graph.successors(node).forEach((successor: T) => {
      if (has(nodeInfo, successor as string)) {
        if (nodeInfo[successor as string].onStack) {
          info.lowlink = Math.min(info.lowlink, nodeInfo[successor as string].index);
        }
      } else {
        strongConnect(successor);
        info.lowlink = Math.min(info.lowlink, nodeInfo[successor as string].lowlink);
      }
    });

    if (info.lowlink === info.index) {
      const component: T[] = [];
      let currentNode: T;
      
      do {
        currentNode = stack.pop()!;
        nodeInfo[currentNode as string].onStack = false;
        component.push(currentNode);
      } while (node !== currentNode);
      
      stronglyConnectedComponents.push(component);
    }
  }

  graph.nodes().forEach((node: T) => {
    if (!has(nodeInfo, node as string)) {
      strongConnect(node);
    }
  });

  return stronglyConnectedComponents;
}