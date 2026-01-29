interface PathInfo {
  distance: number;
  predecessor?: string;
}

interface AllPairsShortestPaths {
  [source: string]: {
    [target: string]: PathInfo;
  };
}

interface Edge {
  v: string;
  w: string;
}

type WeightFunction = (edge: Edge) => number;
type IncidentEdgesFunction = (node: string) => Edge[];

interface Graph {
  nodes(): string[];
  outEdges(node: string): Edge[];
}

const DEFAULT_WEIGHT = 1;

function constantWeight(value: number): WeightFunction {
  return () => value;
}

function floydWarshall(
  graph: Graph,
  weightFn?: WeightFunction,
  incidentEdgesFn?: IncidentEdgesFunction
): AllPairsShortestPaths {
  const weight = weightFn ?? constantWeight(DEFAULT_WEIGHT);
  const getIncidentEdges = incidentEdgesFn ?? ((node: string) => graph.outEdges(node));

  const distances: AllPairsShortestPaths = {};
  const nodes = graph.nodes();

  // Initialize distances
  nodes.forEach((source) => {
    distances[source] = {};
    distances[source][source] = {
      distance: 0
    };

    nodes.forEach((target) => {
      if (source !== target) {
        distances[source][target] = {
          distance: Number.POSITIVE_INFINITY
        };
      }
    });

    getIncidentEdges(source).forEach((edge) => {
      const neighbor = edge.v === source ? edge.w : edge.v;
      const edgeWeight = weight(edge);
      distances[source][neighbor] = {
        distance: edgeWeight,
        predecessor: source
      };
    });
  });

  // Floyd-Warshall algorithm
  nodes.forEach((intermediate) => {
    const intermediateDistances = distances[intermediate];

    nodes.forEach((source) => {
      const sourceDistances = distances[source];

      nodes.forEach((target) => {
        const sourceToIntermediate = sourceDistances[intermediate];
        const intermediateToTarget = intermediateDistances[target];
        const currentPath = sourceDistances[target];
        const newDistance = sourceToIntermediate.distance + intermediateToTarget.distance;

        if (newDistance < currentPath.distance) {
          currentPath.distance = newDistance;
          currentPath.predecessor = intermediateToTarget.predecessor;
        }
      });
    });
  });

  return distances;
}

export = floydWarshall;