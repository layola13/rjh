import { each, has } from './module_9414';
import Graph from './module_6431';
import PriorityQueue from './module_5244';

export default function prim<TNode = string, TEdge = unknown>(
  graph: Graph<TNode, TEdge>,
  weightFn: (edge: Edge<TNode>) => number
): Graph<TNode, never> {
  const result = new Graph<TNode, never>();
  const parents: Record<string, string> = {};
  const priorityQueue = new PriorityQueue<string, number>();

  if (graph.nodeCount() === 0) {
    return result;
  }

  each(graph.nodes(), (node: string) => {
    priorityQueue.add(node, Number.POSITIVE_INFINITY);
    result.setNode(node as TNode);
  });

  priorityQueue.decrease(graph.nodes()[0], 0);

  let currentNode: string;
  let hasProcessedNode = false;

  while (priorityQueue.size() > 0) {
    currentNode = priorityQueue.removeMin();

    if (has(parents, currentNode)) {
      result.setEdge(currentNode as TNode, parents[currentNode] as TNode);
    } else {
      if (hasProcessedNode) {
        throw new Error(`Input graph is not connected: ${graph}`);
      }
      hasProcessedNode = true;
    }

    graph.nodeEdges(currentNode as TNode).forEach((edge: Edge<TNode>) => {
      updatePriority(edge);
    });
  }

  function updatePriority(edge: Edge<TNode>): void {
    const neighbor = edge.v === currentNode ? edge.w : edge.v;
    const neighborKey = String(neighbor);
    const currentPriority = priorityQueue.priority(neighborKey);

    if (currentPriority !== undefined) {
      const edgeWeight = weightFn(edge);
      if (edgeWeight < currentPriority) {
        parents[neighborKey] = currentNode;
        priorityQueue.decrease(neighborKey, edgeWeight);
      }
    }
  }

  return result;
}

interface Edge<TNode> {
  v: TNode;
  w: TNode;
  name?: string;
}