interface DijkstraResult {
  distance: number;
  predecessor?: string;
}

interface PriorityQueue {
  add(key: string, priority: number): void;
  decrease(key: string, priority: number): void;
  removeMin(): string;
  size(): number;
}

interface Edge {
  v: string;
  w: string;
}

interface Graph {
  nodes(): string[];
  outEdges(node: string): Edge[];
}

type WeightFunction = (edge: Edge) => number;
type EdgesFunction = (node: string) => Edge[];

function dijkstra(
  graph: Graph,
  source: string,
  weightFunction?: WeightFunction,
  edgesFunction?: EdgesFunction
): Record<string, DijkstraResult> {
  return runDijkstra(
    graph,
    String(source),
    weightFunction ?? constantWeight,
    edgesFunction ?? ((node: string) => graph.outEdges(node))
  );
}

function runDijkstra(
  graph: Graph,
  source: string,
  getWeight: WeightFunction,
  getEdges: EdgesFunction
): Record<string, DijkstraResult> {
  let currentNode: string;
  let currentResult: DijkstraResult;
  const results: Record<string, DijkstraResult> = {};
  const queue: PriorityQueue = new PriorityQueue();

  const processEdge = (edge: Edge): void => {
    const targetNode = edge.v !== currentNode ? edge.v : edge.w;
    const targetResult = results[targetNode];
    const edgeWeight = getWeight(edge);
    const newDistance = currentResult.distance + edgeWeight;

    if (edgeWeight < 0) {
      throw new Error(
        `dijkstra does not allow negative edge weights. Bad edge: ${edge} Weight: ${edgeWeight}`
      );
    }

    if (newDistance < targetResult.distance) {
      targetResult.distance = newDistance;
      targetResult.predecessor = currentNode;
      queue.decrease(targetNode, newDistance);
    }
  };

  graph.nodes().forEach((node: string) => {
    const initialDistance = node === source ? 0 : Number.POSITIVE_INFINITY;
    results[node] = { distance: initialDistance };
    queue.add(node, initialDistance);
  });

  while (queue.size() > 0) {
    currentNode = queue.removeMin();
    currentResult = results[currentNode];

    if (currentResult.distance === Number.POSITIVE_INFINITY) {
      break;
    }

    getEdges(currentNode).forEach(processEdge);
  }

  return results;
}

const constantWeight: WeightFunction = (): number => 1;

export default dijkstra;