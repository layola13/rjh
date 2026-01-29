interface Graph {
  nodeCount(): number;
  nodes(): string[];
  nodeEdges(node: string): Edge[];
}

interface Edge {
  v: string;
  w: string;
}

interface PriorityQueue {
  add(node: string, priority: number): void;
  decrease(node: string, priority: number): void;
  priority(node: string): number | undefined;
  size(): number;
  removeMin(): string;
}

interface ResultGraph {
  setNode(node: string): void;
  setEdge(from: string, to: string): void;
}

interface Utils {
  each<T>(collection: T[], callback: (item: T) => void): void;
  has(object: Record<string, unknown>, key: string): boolean;
}

function prim(
  graph: Graph,
  weightFunction: (edge: Edge) => number,
  utils: Utils,
  ResultGraphConstructor: new () => ResultGraph,
  PriorityQueueConstructor: new () => PriorityQueue
): ResultGraph {
  let currentNode: string;
  const resultGraph = new ResultGraphConstructor();
  const parentMap: Record<string, string> = {};
  const priorityQueue = new PriorityQueueConstructor();

  function processEdge(edge: Edge): void {
    const neighbor = edge.v === currentNode ? edge.w : edge.v;
    const currentPriority = priorityQueue.priority(neighbor);
    
    if (currentPriority !== undefined) {
      const edgeWeight = weightFunction(edge);
      if (edgeWeight < currentPriority) {
        parentMap[neighbor] = currentNode;
        priorityQueue.decrease(neighbor, edgeWeight);
      }
    }
  }

  if (graph.nodeCount() === 0) {
    return resultGraph;
  }

  utils.each(graph.nodes(), (node: string) => {
    priorityQueue.add(node, Number.POSITIVE_INFINITY);
    resultGraph.setNode(node);
  });

  priorityQueue.decrease(graph.nodes()[0], 0);

  let hasProcessedFirstComponent = false;

  while (priorityQueue.size() > 0) {
    currentNode = priorityQueue.removeMin();

    if (utils.has(parentMap, currentNode)) {
      resultGraph.setEdge(currentNode, parentMap[currentNode]);
    } else {
      if (hasProcessedFirstComponent) {
        throw new Error("Input graph is not connected: " + graph);
      }
      hasProcessedFirstComponent = true;
    }

    graph.nodeEdges(currentNode).forEach(processEdge);
  }

  return resultGraph;
}

export default prim;