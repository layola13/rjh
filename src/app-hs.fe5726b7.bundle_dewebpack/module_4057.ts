interface GraphNode {
  v: string;
  value?: any;
  parent?: string;
}

interface GraphEdge {
  v: string;
  w: string;
  name?: string;
  value?: any;
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
  value?: any;
}

interface EdgeIdentifier {
  v: string;
  w: string;
  name?: string;
}

interface Graph {
  isDirected(): boolean;
  isMultigraph(): boolean;
  isCompound(): boolean;
  graph(): any;
  nodes(): string[];
  edges(): EdgeIdentifier[];
  node(id: string): any;
  parent(id: string): string | undefined;
  edge(edgeId: EdgeIdentifier): any;
  setGraph(value: any): Graph;
  setNode(id: string, value: any): Graph;
  setParent(childId: string, parentId: string): Graph;
  setEdge(edgeId: EdgeIdentifier, value: any): Graph;
}

interface UtilityFunctions {
  map<T, R>(collection: T[], iteratee: (item: T) => R): R[];
  isUndefined(value: any): boolean;
  clone<T>(value: T): T;
  each<T>(collection: T[], iteratee: (item: T) => void): void;
}

declare const lodash: UtilityFunctions;
declare class GraphLib {
  constructor(options: Partial<GraphOptions>);
  setGraph(value: any): this;
  setNode(id: string, value: any): this;
  setParent(childId: string, parentId: string): this;
  setEdge(edgeId: EdgeIdentifier, value: any): this;
}

function serializeNodes(graph: Graph): GraphNode[] {
  return lodash.map(graph.nodes(), (nodeId: string): GraphNode => {
    const nodeValue = graph.node(nodeId);
    const parentId = graph.parent(nodeId);
    const serializedNode: GraphNode = { v: nodeId };

    if (!lodash.isUndefined(nodeValue)) {
      serializedNode.value = nodeValue;
    }

    if (!lodash.isUndefined(parentId)) {
      serializedNode.parent = parentId;
    }

    return serializedNode;
  });
}

function serializeEdges(graph: Graph): GraphEdge[] {
  return lodash.map(graph.edges(), (edgeId: EdgeIdentifier): GraphEdge => {
    const edgeValue = graph.edge(edgeId);
    const serializedEdge: GraphEdge = {
      v: edgeId.v,
      w: edgeId.w
    };

    if (!lodash.isUndefined(edgeId.name)) {
      serializedEdge.name = edgeId.name;
    }

    if (!lodash.isUndefined(edgeValue)) {
      serializedEdge.value = edgeValue;
    }

    return serializedEdge;
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
  if (!lodash.isUndefined(graphValue)) {
    serialized.value = lodash.clone(graphValue);
  }

  return serialized;
}

export function read(serializedGraph: SerializedGraph): Graph {
  const graph = new GraphLib(serializedGraph.options).setGraph(serializedGraph.value) as unknown as Graph;

  lodash.each(serializedGraph.nodes, (node: GraphNode): void => {
    graph.setNode(node.v, node.value);
    if (node.parent) {
      graph.setParent(node.v, node.parent);
    }
  });

  lodash.each(serializedGraph.edges, (edge: GraphEdge): void => {
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