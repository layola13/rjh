interface DijkstraNode {
  distance: number;
  predecessor?: string;
}

interface DijkstraResult {
  [nodeId: string]: DijkstraNode;
}

type EdgeWeightFunction = (edge: Edge) => number;
type OutEdgesFunction = (nodeId: string) => Edge[];

interface Edge {
  v?: string;
  w?: string;
}

interface Graph {
  nodes(): string[];
  outEdges(nodeId: string): Edge[];
}

interface PriorityQueue {
  add(key: string, priority: number): void;
  decrease(key: string, priority: number): void;
  removeMin(): string;
  size(): number;
}

const DEFAULT_EDGE_WEIGHT = 1;

const constantWeight = (): number => DEFAULT_EDGE_WEIGHT;

/**
 * Dijkstra's shortest path algorithm implementation
 * @param graph - The graph to search
 * @param source - The source node
 * @param edgeWeightFn - Function to determine edge weight
 * @param getOutEdges - Function to get outgoing edges from a node
 * @returns Object mapping node IDs to their shortest distance and predecessor
 */
function dijkstra(
  graph: Graph,
  source: string,
  edgeWeightFn?: EdgeWeightFunction,
  getOutEdges?: OutEdgesFunction
): DijkstraResult {
  const weightFn = edgeWeightFn ?? constantWeight;
  const outEdgesFn = getOutEdges ?? ((nodeId: string) => graph.outEdges(nodeId));

  const results: DijkstraResult = {};
  const priorityQueue: PriorityQueue = new PriorityQueue();
  let currentNode: string;
  let currentNodeData: DijkstraNode;

  const processEdge = (edge: Edge): void => {
    const targetNode = edge.v !== currentNode ? edge.v : edge.w;
    
    if (!targetNode) return;

    const targetData = results[targetNode];
    const edgeWeight = weightFn(edge);
    const newDistance = currentNodeData.distance + edgeWeight;

    if (edgeWeight < 0) {
      throw new Error(
        `dijkstra does not allow negative edge weights. Bad edge: ${edge} Weight: ${edgeWeight}`
      );
    }

    if (newDistance < targetData.distance) {
      targetData.distance = newDistance;
      targetData.predecessor = currentNode;
      priorityQueue.decrease(targetNode, newDistance);
    }
  };

  graph.nodes().forEach((nodeId: string) => {
    const initialDistance = nodeId === source ? 0 : Number.POSITIVE_INFINITY;
    results[nodeId] = { distance: initialDistance };
    priorityQueue.add(nodeId, initialDistance);
  });

  while (priorityQueue.size() > 0) {
    currentNode = priorityQueue.removeMin();
    currentNodeData = results[currentNode];

    if (currentNodeData.distance === Number.POSITIVE_INFINITY) {
      break;
    }

    outEdgesFn(currentNode).forEach(processEdge);
  }

  return results;
}

export default dijkstra;