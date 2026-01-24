/**
 * Graph serialization utilities for converting graph structures to/from JSON format.
 * Provides methods to serialize and deserialize graph data including nodes, edges, and metadata.
 */

/**
 * Options for graph configuration
 */
export interface GraphOptions {
  /** Whether the graph is directed */
  directed: boolean;
  /** Whether the graph supports multiple edges between the same nodes */
  multigraph: boolean;
  /** Whether the graph supports compound/nested nodes */
  compound: boolean;
}

/**
 * Serialized node representation
 */
export interface SerializedNode<TNodeValue = unknown> {
  /** Node identifier */
  v: string | number;
  /** Optional node value/data */
  value?: TNodeValue;
  /** Optional parent node identifier for compound graphs */
  parent?: string | number;
}

/**
 * Serialized edge representation
 */
export interface SerializedEdge<TEdgeValue = unknown> {
  /** Source node identifier */
  v: string | number;
  /** Target node identifier */
  w: string | number;
  /** Optional edge name for multigraphs */
  name?: string;
  /** Optional edge value/data */
  value?: TEdgeValue;
}

/**
 * Complete serialized graph structure
 */
export interface SerializedGraph<TGraphValue = unknown, TNodeValue = unknown, TEdgeValue = unknown> {
  /** Graph configuration options */
  options: GraphOptions;
  /** Array of serialized nodes */
  nodes: SerializedNode<TNodeValue>[];
  /** Array of serialized edges */
  edges: SerializedEdge<TEdgeValue>[];
  /** Optional graph-level value/metadata */
  value?: TGraphValue;
}

/**
 * Edge identifier structure used in graph operations
 */
export interface EdgeIdentifier {
  /** Source node identifier */
  v: string | number;
  /** Target node identifier */
  w: string | number;
  /** Optional edge name for multigraphs */
  name?: string;
}

/**
 * Graph interface representing a directed/undirected graph structure
 */
export interface Graph<TGraphValue = unknown, TNodeValue = unknown, TEdgeValue = unknown> {
  /** Check if graph is directed */
  isDirected(): boolean;
  /** Check if graph supports multiple edges */
  isMultigraph(): boolean;
  /** Check if graph supports compound nodes */
  isCompound(): boolean;
  /** Get graph-level value/metadata */
  graph(): TGraphValue | undefined;
  /** Get all node identifiers */
  nodes(): Array<string | number>;
  /** Get node value by identifier */
  node(nodeId: string | number): TNodeValue | undefined;
  /** Get parent of a node (for compound graphs) */
  parent(nodeId: string | number): string | number | undefined;
  /** Get all edges */
  edges(): EdgeIdentifier[];
  /** Get edge value by identifier */
  edge(edgeId: EdgeIdentifier): TEdgeValue | undefined;
  /** Set graph-level value */
  setGraph(value: TGraphValue): this;
  /** Set node value */
  setNode(nodeId: string | number, value?: TNodeValue): this;
  /** Set parent-child relationship */
  setParent(nodeId: string | number, parentId: string | number): this;
  /** Set edge value */
  setEdge(edgeId: EdgeIdentifier, value?: TEdgeValue): this;
}

/**
 * Serializes a graph to JSON-compatible format
 * @param graph - The graph instance to serialize
 * @returns Serialized graph structure
 */
export function write<TGraphValue = unknown, TNodeValue = unknown, TEdgeValue = unknown>(
  graph: Graph<TGraphValue, TNodeValue, TEdgeValue>
): SerializedGraph<TGraphValue, TNodeValue, TEdgeValue>;

/**
 * Deserializes a JSON structure into a graph instance
 * @param data - The serialized graph data
 * @returns Reconstructed graph instance
 */
export function read<TGraphValue = unknown, TNodeValue = unknown, TEdgeValue = unknown>(
  data: SerializedGraph<TGraphValue, TNodeValue, TEdgeValue>
): Graph<TGraphValue, TNodeValue, TEdgeValue>;

/**
 * Graph serialization module exports
 */
declare const graphSerializer: {
  /** Serialize graph to JSON format */
  write: typeof write;
  /** Deserialize JSON to graph instance */
  read: typeof read;
};

export default graphSerializer;