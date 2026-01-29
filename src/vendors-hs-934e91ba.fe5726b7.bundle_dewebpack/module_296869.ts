interface GraphNode {
  v: string;
  value?: unknown;
  parent?: string;
}

interface GraphEdge {
  v: string;
  w: string;
  name?: string;
  value?: unknown;
}

interface GraphOptions {
  directed: boolean;
  multigraph: boolean;
  compound: boolean;
}

interface SerializedGraph {
  options: GraphOptions;
  nodes: GraphNode[];
  edges: GraphEdge[];
  value?: unknown;
}

interface Graph {
  nodes(): string[];
  edges(): EdgeDescriptor[];
  node(id: string): unknown;
  parent(id: string): string | undefined;
  edge(edge: EdgeDescriptor): unknown;
  graph(): unknown;
  isDirected(): boolean;
  isMultigraph(): boolean;
  isCompound(): boolean;
  setNode(id: string, value?: unknown): Graph;
  setParent(child: string, parent: string): Graph;
  setEdge(edge: EdgeDescriptor, value?: unknown): Graph;
  setGraph(value?: unknown): Graph;
}

interface EdgeDescriptor {
  v: string;
  w: string;
  name?: string;
}

interface Utils {
  map<T, R>(collection: T[], iteratee: (item: T) => R): R[];
  each<T>(collection: T[], iteratee: (item: T) => void): void;
  isUndefined(value: unknown): value is undefined;
  clone<T>(value: T): T;
}

interface GraphConstructor {
  new (options?: Partial<GraphOptions>): Graph;
}

declare const utils: Utils;
declare const GraphClass: GraphConstructor;

function serializeNodes(graph: Graph): GraphNode[] {
  return utils.map(graph.nodes(), (nodeId: string): GraphNode => {
    const nodeValue = graph.node(nodeId);
    const parentId = graph.parent(nodeId);
    const serialized: GraphNode = { v: nodeId };

    if (!utils.isUndefined(nodeValue)) {
      serialized.value = nodeValue;
    }

    if (!utils.isUndefined(parentId)) {
      serialized.parent = parentId;
    }

    return serialized;
  });
}

function serializeEdges(graph: Graph): GraphEdge[] {
  return utils.map(graph.edges(), (edgeDescriptor: EdgeDescriptor): GraphEdge => {
    const edgeValue = graph.edge(edgeDescriptor);
    const serialized: GraphEdge = {
      v: edgeDescriptor.v,
      w: edgeDescriptor.w
    };

    if (!utils.isUndefined(edgeDescriptor.name)) {
      serialized.name = edgeDescriptor.name;
    }

    if (!utils.isUndefined(edgeValue)) {
      serialized.value = edgeValue;
    }

    return serialized;
  });
}

export function write(graph: Graph): SerializedGraph {
  const serialized: SerializedGraph = {
    options: {
      directed: graph.isDirected(),
      multigraph: graph.isMultigraph(),
      compound: graph.isCompound()
    },
    nodes: serializeNodes(graph),
    edges: serializeEdges(graph)
  };

  const graphValue = graph.graph();
  if (!utils.isUndefined(graphValue)) {
    serialized.value = utils.clone(graphValue);
  }

  return serialized;
}

export function read(data: SerializedGraph): Graph {
  const graph = new GraphClass(data.options).setGraph(data.value);

  utils.each(data.nodes, (node: GraphNode): void => {
    graph.setNode(node.v, node.value);
    if (node.parent) {
      graph.setParent(node.v, node.parent);
    }
  });

  utils.each(data.edges, (edge: GraphEdge): void => {
    graph.setEdge(
      {
        v: edge.v,
        w: edge.w,
        name: edge.name
      },
      edge.value
    );
  });

  return graph;
}