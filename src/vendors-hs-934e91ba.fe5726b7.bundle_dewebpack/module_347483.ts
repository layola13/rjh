interface GraphOptions {
  directed?: boolean;
  multigraph?: boolean;
  compound?: boolean;
}

interface EdgeDescriptor {
  v: string;
  w: string;
  name?: string;
}

type NodeLabelFunction<T = unknown> = (node: string) => T;
type EdgeLabelFunction<T = unknown> = (v: string, w: string, name?: string) => T;

const GRAPH_NODE = "\0";
const ROOT_PARENT = "\0";
const EDGE_KEY_DELIM = "";

export default class Graph<TGraphLabel = unknown, TNodeLabel = unknown, TEdgeLabel = unknown> {
  private _isDirected: boolean;
  private _isMultigraph: boolean;
  private _isCompound: boolean;
  private _label: TGraphLabel | undefined;
  private _defaultNodeLabelFn: NodeLabelFunction<TNodeLabel>;
  private _defaultEdgeLabelFn: EdgeLabelFunction<TEdgeLabel>;
  private _nodes: Record<string, TNodeLabel>;
  private _parent?: Record<string, string>;
  private _children?: Record<string, Record<string, boolean>>;
  private _in: Record<string, Record<string, EdgeDescriptor>>;
  private _preds: Record<string, Record<string, number>>;
  private _out: Record<string, Record<string, EdgeDescriptor>>;
  private _sucs: Record<string, Record<string, number>>;
  private _edgeObjs: Record<string, EdgeDescriptor>;
  private _edgeLabels: Record<string, TEdgeLabel>;
  private _nodeCount: number = 0;
  private _edgeCount: number = 0;

  constructor(options: GraphOptions = {}) {
    this._isDirected = !has(options, "directed") || options.directed;
    this._isMultigraph = !!has(options, "multigraph") && options.multigraph;
    this._isCompound = !!has(options, "compound") && options.compound;
    this._label = undefined;
    this._defaultNodeLabelFn = constant(undefined);
    this._defaultEdgeLabelFn = constant(undefined);
    this._nodes = {};

    if (this._isCompound) {
      this._parent = {};
      this._children = {};
      this._children[ROOT_PARENT] = {};
    }

    this._in = {};
    this._preds = {};
    this._out = {};
    this._sucs = {};
    this._edgeObjs = {};
    this._edgeLabels = {};
  }

  isDirected(): boolean {
    return this._isDirected;
  }

  isMultigraph(): boolean {
    return this._isMultigraph;
  }

  isCompound(): boolean {
    return this._isCompound;
  }

  setGraph(label: TGraphLabel): this {
    this._label = label;
    return this;
  }

  graph(): TGraphLabel | undefined {
    return this._label;
  }

  setDefaultNodeLabel(fn: NodeLabelFunction<TNodeLabel> | TNodeLabel): this {
    this._defaultNodeLabelFn = isFunction(fn) ? fn : constant(fn);
    return this;
  }

  nodeCount(): number {
    return this._nodeCount;
  }

  nodes(): string[] {
    return keys(this._nodes);
  }

  sources(): string[] {
    return filter(this.nodes(), (node) => isEmpty(this._in[node]));
  }

  sinks(): string[] {
    return filter(this.nodes(), (node) => isEmpty(this._out[node]));
  }

  setNodes(nodes: string[], value?: TNodeLabel): this {
    each(nodes, (node) => {
      if (arguments.length > 1) {
        this.setNode(node, value!);
      } else {
        this.setNode(node);
      }
    });
    return this;
  }

  setNode(node: string, value?: TNodeLabel): this {
    const nodeKey = String(node);

    if (has(this._nodes, nodeKey)) {
      if (arguments.length > 1) {
        this._nodes[nodeKey] = value!;
      }
      return this;
    }

    this._nodes[nodeKey] = arguments.length > 1 ? value! : this._defaultNodeLabelFn(nodeKey);

    if (this._isCompound) {
      this._parent![nodeKey] = ROOT_PARENT;
      this._children![nodeKey] = {};
      this._children![ROOT_PARENT][nodeKey] = true;
    }

    this._in[nodeKey] = {};
    this._preds[nodeKey] = {};
    this._out[nodeKey] = {};
    this._sucs[nodeKey] = {};
    this._nodeCount++;

    return this;
  }

  node(node: string): TNodeLabel | undefined {
    return this._nodes[node];
  }

  hasNode(node: string): boolean {
    return has(this._nodes, node);
  }

  removeNode(node: string): this {
    const nodeKey = String(node);

    if (!has(this._nodes, nodeKey)) {
      return this;
    }

    const removeEdge = (edgeKey: string) => {
      this.removeEdge(this._edgeObjs[edgeKey]);
    };

    delete this._nodes[nodeKey];

    if (this._isCompound) {
      this._removeFromParentsChildList(nodeKey);
      delete this._parent![nodeKey];

      each(this.children(nodeKey), (child) => {
        this.setParent(child);
      });

      delete this._children![nodeKey];
    }

    each(keys(this._in[nodeKey]), removeEdge);
    delete this._in[nodeKey];
    delete this._preds[nodeKey];

    each(keys(this._out[nodeKey]), removeEdge);
    delete this._out[nodeKey];
    delete this._sucs[nodeKey];

    this._nodeCount--;

    return this;
  }

  setParent(node: string, parent?: string): this {
    if (!this._isCompound) {
      throw new Error("Cannot set parent in a non-compound graph");
    }

    let parentKey = parent === undefined ? ROOT_PARENT : String(parent);

    if (parentKey !== ROOT_PARENT) {
      let ancestor: string | undefined = parentKey;
      while (ancestor !== undefined) {
        if (ancestor === node) {
          throw new Error(`Setting ${parentKey} as parent of ${node} would create a cycle`);
        }
        ancestor = this.parent(ancestor);
      }
      this.setNode(parentKey);
    }

    this.setNode(node);
    this._removeFromParentsChildList(node);
    this._parent![node] = parentKey;
    this._children![parentKey][node] = true;

    return this;
  }

  private _removeFromParentsChildList(node: string): void {
    delete this._children![this._parent![node]][node];
  }

  parent(node: string): string | undefined {
    if (this._isCompound) {
      const parentNode = this._parent![node];
      if (parentNode !== ROOT_PARENT) {
        return parentNode;
      }
    }
    return undefined;
  }

  children(node?: string): string[] | undefined {
    const nodeKey = node === undefined ? ROOT_PARENT : String(node);

    if (this._isCompound) {
      const children = this._children![nodeKey];
      if (children) {
        return keys(children);
      }
    } else {
      if (nodeKey === ROOT_PARENT) {
        return this.nodes();
      }
      if (this.hasNode(nodeKey)) {
        return [];
      }
    }

    return undefined;
  }

  predecessors(node: string): string[] | undefined {
    const preds = this._preds[node];
    if (preds) {
      return keys(preds);
    }
    return undefined;
  }

  successors(node: string): string[] | undefined {
    const sucs = this._sucs[node];
    if (sucs) {
      return keys(sucs);
    }
    return undefined;
  }

  neighbors(node: string): string[] | undefined {
    const preds = this.predecessors(node);
    if (preds) {
      return union(preds, this.successors(node)!);
    }
    return undefined;
  }

  isLeaf(node: string): boolean {
    const neighbors = this.isDirected() ? this.successors(node) : this.neighbors(node);
    return (neighbors?.length ?? 0) === 0;
  }

  filterNodes(filter: (node: string) => boolean): Graph<TGraphLabel, TNodeLabel, TEdgeLabel> {
    const filtered = new (this.constructor as typeof Graph)<TGraphLabel, TNodeLabel, TEdgeLabel>({
      directed: this._isDirected,
      multigraph: this._isMultigraph,
      compound: this._isCompound,
    });

    filtered.setGraph(this.graph()!);

    each(this._nodes, (value, node) => {
      if (filter(node)) {
        filtered.setNode(node, value);
      }
    });

    each(this._edgeObjs, (edge) => {
      if (filtered.hasNode(edge.v) && filtered.hasNode(edge.w)) {
        filtered.setEdge(edge, this.edge(edge)!);
      }
    });

    const parentCache: Record<string, string | undefined> = {};

    const findParent = (node: string): string | undefined => {
      const parent = this.parent(node);
      if (parent === undefined || filtered.hasNode(parent)) {
        parentCache[node] = parent;
        return parent;
      }
      if (parent in parentCache) {
        return parentCache[parent];
      }
      return findParent(parent);
    };

    if (this._isCompound) {
      each(filtered.nodes(), (node) => {
        filtered.setParent(node, findParent(node));
      });
    }

    return filtered;
  }

  setDefaultEdgeLabel(fn: EdgeLabelFunction<TEdgeLabel> | TEdgeLabel): this {
    this._defaultEdgeLabelFn = isFunction(fn) ? fn : constant(fn);
    return this;
  }

  edgeCount(): number {
    return this._edgeCount;
  }

  edges(): EdgeDescriptor[] {
    return values(this._edgeObjs);
  }

  setPath(nodes: string[], value?: TEdgeLabel): this {
    reduce(
      nodes,
      (prevNode, node) => {
        if (arguments.length > 1) {
          this.setEdge(prevNode, node, value);
        } else {
          this.setEdge(prevNode, node);
        }
        return node;
      },
      nodes[0]
    );
    return this;
  }

  setEdge(v: string | EdgeDescriptor, w?: string | TEdgeLabel, label?: TEdgeLabel | string, name?: string): this {
    let nodeV: string;
    let nodeW: string;
    let edgeName: string | undefined;
    let edgeLabel: TEdgeLabel | undefined;
    let hasValue = false;

    if (typeof v === "object" && v !== null && "v" in v) {
      const edge = v as EdgeDescriptor;
      nodeV = edge.v;
      nodeW = edge.w;
      edgeName = edge.name;
      if (arguments.length === 2) {
        edgeLabel = w as TEdgeLabel;
        hasValue = true;
      }
    } else {
      nodeV = String(v);
      nodeW = String(w);
      edgeName = name !== undefined ? String(name) : undefined;
      if (arguments.length > 2 && typeof label !== "string") {
        edgeLabel = label as TEdgeLabel;
        hasValue = true;
      } else if (typeof label === "string") {
        edgeName = label;
      }
    }

    const edgeKey = buildEdgeKey(this._isDirected, nodeV, nodeW, edgeName);

    if (has(this._edgeLabels, edgeKey)) {
      if (hasValue) {
        this._edgeLabels[edgeKey] = edgeLabel!;
      }
      return this;
    }

    if (edgeName !== undefined && !this._isMultigraph) {
      throw new Error("Cannot set a named edge when isMultigraph = false");
    }

    this.setNode(nodeV);
    this.setNode(nodeW);

    this._edgeLabels[edgeKey] = hasValue ? edgeLabel! : this._defaultEdgeLabelFn(nodeV, nodeW, edgeName);

    const edgeDescriptor = normalizeEdge(this._isDirected, nodeV, nodeW, edgeName);
    nodeV = edgeDescriptor.v;
    nodeW = edgeDescriptor.w;

    Object.freeze(edgeDescriptor);

    this._edgeObjs[edgeKey] = edgeDescriptor;
    incrementOrInitEntry(this._preds[nodeW], nodeV);
    incrementOrInitEntry(this._sucs[nodeV], nodeW);
    this._in[nodeW][edgeKey] = edgeDescriptor;
    this._out[nodeV][edgeKey] = edgeDescriptor;
    this._edgeCount++;

    return this;
  }

  edge(v: string | EdgeDescriptor, w?: string, name?: string): TEdgeLabel | undefined {
    const edgeKey =
      arguments.length === 1
        ? edgeDescriptorToKey(this._isDirected, v as EdgeDescriptor)
        : buildEdgeKey(this._isDirected, String(v), String(w), name);
    return this._edgeLabels[edgeKey];
  }

  hasEdge(v: string | EdgeDescriptor, w?: string, name?: string): boolean {
    const edgeKey =
      arguments.length === 1
        ? edgeDescriptorToKey(this._isDirected, v as EdgeDescriptor)
        : buildEdgeKey(this._isDirected, String(v), String(w), name);
    return has(this._edgeLabels, edgeKey);
  }

  removeEdge(v: string | EdgeDescriptor, w?: string, name?: string): this {
    const edgeKey =
      arguments.length === 1
        ? edgeDescriptorToKey(this._isDirected, v as EdgeDescriptor)
        : buildEdgeKey(this._isDirected, String(v), String(w), name);

    const edge = this._edgeObjs[edgeKey];

    if (edge) {
      const nodeV = edge.v;
      const nodeW = edge.w;

      delete this._edgeLabels[edgeKey];
      delete this._edgeObjs[edgeKey];
      decrementOrRemoveEntry(this._preds[nodeW], nodeV);
      decrementOrRemoveEntry(this._sucs[nodeV], nodeW);
      delete this._in[nodeW][edgeKey];
      delete this._out[nodeV][edgeKey];
      this._edgeCount--;
    }

    return this;
  }

  inEdges(node: string, source?: string): EdgeDescriptor[] | undefined {
    const inEdges = this._in[node];
    if (inEdges) {
      const edges = values(inEdges);
      return source ? filter(edges, (edge) => edge.v === source) : edges;
    }
    return undefined;
  }

  outEdges(node: string, target?: string): EdgeDescriptor[] | undefined {
    const outEdges = this._out[node];
    if (outEdges) {
      const edges = values(outEdges);
      return target ? filter(edges, (edge) => edge.w === target) : edges;
    }
    return undefined;
  }

  nodeEdges(node: string, otherNode?: string): EdgeDescriptor[] | undefined {
    const inEdges = this.inEdges(node, otherNode);
    if (inEdges) {
      return inEdges.concat(this.outEdges(node, otherNode)!);
    }
    return undefined;
  }
}

function incrementOrInitEntry(obj: Record<string, number>, key: string): void {
  if (obj[key]) {
    obj[key]++;
  } else {
    obj[key] = 1;
  }
}

function decrementOrRemoveEntry(obj: Record<string, number>, key: string): void {
  obj[key]--;
  if (!obj[key]) {
    delete obj[key];
  }
}

function buildEdgeKey(isDirected: boolean, v: string, w: string, name?: string): string {
  let nodeV = v;
  let nodeW = w;

  if (!isDirected && nodeV > nodeW) {
    const temp = nodeV;
    nodeV = nodeW;
    nodeW = temp;
  }

  return nodeV + EDGE_KEY_DELIM + nodeW + EDGE_KEY_DELIM + (name === undefined ? GRAPH_NODE : name);
}

function edgeDescriptorToKey(isDirected: boolean, edge: EdgeDescriptor): string {
  return buildEdgeKey(isDirected, edge.v, edge.w, edge.name);
}

function normalizeEdge(isDirected: boolean, v: string, w: string, name?: string): EdgeDescriptor {
  let nodeV = v;
  let nodeW = w;

  if (!isDirected && nodeV > nodeW) {
    const temp = nodeV;
    nodeV = nodeW;
    nodeW = temp;
  }

  const edge: EdgeDescriptor = { v: nodeV, w: nodeW };
  if (name !== undefined) {
    edge.name = name;
  }

  return edge;
}

// Utility functions (lodash-like helpers)
function has<T extends object>(obj: T, key: string | number | symbol): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function constant<T>(value: T): () => T {
  return () => value;
}

function isFunction(value: unknown): value is Function {
  return typeof value === "function";
}

function keys<T extends object>(obj: T): string[] {
  return Object.keys(obj);
}

function values<T>(obj: Record<string, T>): T[] {
  return Object.values(obj);
}

function filter<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(predicate);
}

function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

function each<T>(obj: Record<string, T> | T[], callback: (value: T, key: string) => void): void {
  if (Array.isArray(obj)) {
    obj.forEach((value, index) => callback(value, String(index)));
  } else {
    Object.entries(obj).forEach(([key, value]) => callback(value as T, key));
  }
}

function union<T>(arr1: T[], arr2: T[]): T[] {
  return Array.from(new Set([...arr1, ...arr2]));
}

function reduce<T, R>(arr: T[], callback: (acc: R, value: T) => R, initial: R): R {
  return arr.reduce(callback, initial);
}