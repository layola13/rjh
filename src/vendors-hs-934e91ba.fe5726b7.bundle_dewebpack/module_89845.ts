interface EdgeObject {
  v: string;
  w: string;
}

interface PathInfo {
  distance: number;
  predecessor?: string;
}

interface AllPairsShortestPaths {
  [source: string]: {
    [target: string]: PathInfo;
  };
}

interface Graph {
  nodes(): string[];
  outEdges(node: string): EdgeObject[];
}

type WeightFunction = (edge: EdgeObject) => number;
type EdgeFunction = (node: string) => EdgeObject[];

function constant(value: number): () => number {
  return () => value;
}

function floydWarshall(
  graph: Graph,
  weightFn?: WeightFunction,
  edgeFn?: EdgeFunction
): AllPairsShortestPaths {
  const weight = weightFn ?? constant(1);
  const getEdges = edgeFn ?? ((node: string) => graph.outEdges(node));

  const results: AllPairsShortestPaths = {};
  const nodes = graph.nodes();

  nodes.forEach((source) => {
    results[source] = {};
    results[source][source] = {
      distance: 0
    };

    nodes.forEach((target) => {
      if (source !== target) {
        results[source][target] = {
          distance: Number.POSITIVE_INFINITY
        };
      }
    });

    getEdges(source).forEach((edge) => {
      const neighbor = edge.v === source ? edge.w : edge.v;
      const edgeWeight = weight(edge);
      results[source][neighbor] = {
        distance: edgeWeight,
        predecessor: source
      };
    });
  });

  nodes.forEach((intermediate) => {
    const intermediateResults = results[intermediate];

    nodes.forEach((source) => {
      const sourceResults = results[source];

      nodes.forEach((target) => {
        const sourceToIntermediate = sourceResults[intermediate];
        const intermediateToTarget = intermediateResults[target];
        const currentPath = sourceResults[target];
        const newDistance = sourceToIntermediate.distance + intermediateToTarget.distance;

        if (newDistance < currentPath.distance) {
          currentPath.distance = newDistance;
          currentPath.predecessor = intermediateToTarget.predecessor;
        }
      });
    });
  });

  return results;
}

export default floydWarshall;