const GRAPH_NODE = "\0";
const COMPOUND_ROOT = "\0";
const EDGE_KEY_DELIM = "";

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

type NodeLabel = unknown;
type EdgeLabel = unknown;
type GraphLabel = unknown;

type NodeLabelFunction = (nodeId: string) => NodeLabel;
type EdgeLabelFunction = (v: string, w: string, name?: string) => EdgeLabel;

interface NodeMap {
  [nodeId: string]: NodeLabel;
}

interface EdgeMap {
  [edgeKey: string]: EdgeDescriptor;
}

interface EdgeLabelMap {
  [edgeKey: string]: EdgeLabel;
}

interface ParentMap {
  [nodeId: string]: string;
}

interface ChildrenMap {
  [nodeId: string]: { [childId: string]: boolean };
}

interface AdjacencyMap {
  [nodeId: string]: { [edgeKey: string]: EdgeDescriptor };
}

interface CountMap {
  [key: string]: number;
}

class Graph {
  private _isDirected: boolean;
  private _isMultigraph: boolean;
  private _isCompound: boolean;
  private _label: GraphLabel;
  private _defaultNodeLabelFn: NodeLabelFunction;
  private _defaultEdgeLabelFn: EdgeLabelFunction;
  private _nodes: NodeMap;
  private _parent?: ParentMap;
  private _children?: ChildrenMap;
  private _in: AdjacencyMap;
  private _preds: { [nodeId: string]: CountMap };
  private _out: AdjacencyMap;
  private _sucs: { [nodeId: string]: CountMap };
  private _edgeObjs: EdgeMap;
  private _edgeLabels: EdgeLabelMap;
  private _nodeCount: number;
  private _edgeCount: number;

  constructor(options: GraphOptions = {}) {
    this._isDirected = !hasProperty(options, "directed") || options.directed;
    this._isMultigraph = !!hasProperty(options, "multigraph") && options.multigraph;
    this._isCompound = !!hasProperty(options, "compound") && options.compound;
    this._label = undefined;
    this._defaultNodeLabelFn = constant(undefined);
    this._defaultEdgeLabelFn = constant(undefined);
    this._nodes = {};
    this._nodeCount = 0;
    this._edgeCount = 0;

    if (this._isCompound) {
      this._parent = {};
      this._children = {};
      this._children[COMPOUND_ROOT] = {};
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

  setGraph(label: GraphLabel): this {
    this._label = label;
    return this;
  }

  graph(): GraphLabel {
    return this._label;
  }

  setDefaultNodeLabel(labelFn: NodeLabel | NodeLabelFunction): this {
    const fn = isFunction(labelFn) ? labelFn : constant(labelFn);
    this._defaultNodeLabelFn = fn;
    return this;
  }

  nodeCount(): number {
    return this._nodeCount;
  }

  nodes(): string[] {
    return keys(this._nodes);
  }

  sources(): string[] {
    return filter(this.nodes(), (nodeId) => isEmpty(this._in[nodeId]));
  }

  sinks(): string[] {
    return filter(this.nodes(), (nodeId) => isEmpty(this._out[nodeId]));
  }

  setNodes(nodeIds: string[], label?: NodeLabel): this {
    each(nodeIds, (nodeId) => {
      if (arguments.length > 1) {
        this.setNode(nodeId, label);
      } else {
        this.setNode(nodeId);
      }
    });
    return this;
  }

  setNode(nodeId: string, label?: NodeLabel): this {
    const id = String(nodeId);
    
    if (hasProperty(this._nodes, id)) {
      if (arguments.length > 1) {
        this._nodes[id] = label;
      }
      return this;
    }

    this._nodes[id] = arguments.length > 1 ? label : this._defaultNodeLabelFn(id);

    if (this._isCompound) {
      this._parent![id] = COMPOUND_ROOT;
      this._children![id] = {};
      this._children![COMPOUND_ROOT][id] = true;
    }

    this._in[id] = {};
    this._preds[id] = {};
    this._out[id] = {};
    this._sucs[id] = {};
    ++this._nodeCount;

    return this;
  }

  node(nodeId: string): NodeLabel {
    return this._nodes[nodeId];
  }

  hasNode(nodeId: string): boolean {
    return hasProperty(this._nodes, nodeId);
  }

  removeNode(nodeId: string): this {
    const id = String(nodeId);

    if (hasProperty(this._nodes, id)) {
      const removeEdge = (edgeKey: string): void => {
        this.removeEdge(this._edgeObjs[edgeKey]);
      };

      delete this._nodes[id];

      if (this._isCompound) {
        this._removeFromParentsChildList(id);
        delete this._parent![id];
        each(this.children(id), (childId) => {
          this.setParent(childId);
        });
        delete this._children![id];
      }

      each(keys(this._in[id]), removeEdge);
      delete this._in[id];
      delete this._preds[id];
      each(keys(this._out[id]), removeEdge);
      delete this._out[id];
      delete this._sucs[id];
      --this._nodeCount;
    }

    return this;
  }

  setParent(childId: string, parentId?: string): this {
    if (!this._isCompound) {
      throw new Error("Cannot set parent in a non-compound graph");
    }

    let parent: string = isUndefined(parentId) ? COMPOUND_ROOT : String(parentId);

    if (!isUndefined(parentId)) {
      let ancestor: string | undefined = parent;
      while (!isUndefined(ancestor)) {
        if (ancestor === childId) {
          throw new Error(`Setting ${parent} as parent of ${childId} would create a cycle`);
        }
        ancestor = this.parent(ancestor);
      }
      this.setNode(parent);
    }

    this.setNode(childId);
    this._removeFromParentsChildList(childId);
    this._parent![childId] = parent;
    this._children![parent][childId] = true;

    return this;
  }

  private _removeFromParentsChildList(nodeId: string): void {
    delete this._children![this._parent![nodeId]][nodeId];
  }

  parent(nodeId: string): string | undefined {
    if (this._isCompound) {
      const parentId = this._parent![nodeId];
      if (parentId !== COMPOUND_ROOT) {
        return parentId;
      }
    }
    return undefined;
  }

  children(nodeId?: string): string[] | undefined {
    const id = isUndefined(nodeId) ? COMPOUND_ROOT : String(nodeId);

    if (this._isCompound) {
      const children = this._children![id];
      if (children) {
        return keys(children);
      }
    } else {
      if (id === COMPOUND_ROOT) {
        return this.nodes();
      }
      if (this.hasNode(id)) {
        return [];
      }
    }
    return undefined;
  }

  predecessors(nodeId: string): string[] | undefined {
    const preds = this._preds[nodeId];
    if (preds) {
      return keys(preds);
    }
    return undefined;
  }

  successors(nodeId: string): string[] | undefined {
    const sucs = this._sucs[nodeId];
    if (sucs) {
      return keys(sucs);
    }
    return undefined;
  }

  neighbors(nodeId: string): string[] | undefined {
    const preds = this.predecessors(nodeId);
    if (preds) {
      return union(preds, this.successors(nodeId)!);
    }
    return undefined;
  }

  isLeaf(nodeId: string): boolean {
    const neighbors = this.isDirected() ? this.successors(nodeId) : this.neighbors(nodeId);
    return neighbors?.length === 0;
  }

  filterNodes(predicate: (nodeId: string) => boolean): Graph {
    const filtered = new Graph({
      directed: this._isDirected,
      multigraph: this._isMultigraph,
      compound: this._isCompound,
    });

    filtered.setGraph(this.graph());

    each(this._nodes, (label, nodeId) => {
      if (predicate(nodeId)) {
        filtered.setNode(nodeId, label);
      }
    });

    each(this._edgeObjs, (edge) => {
      if (filtered.hasNode(edge.v) && filtered.hasNode(edge.w)) {
        filtered.setEdge(edge, this.edge(edge));
      }
    });

    if (this._isCompound) {
      const parentCache: { [nodeId: string]: string | undefined } = {};

      const findParent = (nodeId: string): string | undefined => {
        const parent = this.parent(nodeId);
        if (isUndefined(parent) || filtered.hasNode(parent)) {
          parentCache[nodeId] = parent;
          return parent;
        }
        if (parent in parentCache) {
          return parentCache[parent];
        }
        return findParent(parent);
      };

      each(filtered.nodes(), (nodeId) => {
        filtered.setParent(nodeId, findParent(nodeId));
      });
    }

    return filtered;
  }

  setDefaultEdgeLabel(labelFn: EdgeLabel | EdgeLabelFunction): this {
    const fn = isFunction(labelFn) ? labelFn : constant(labelFn);
    this._defaultEdgeLabelFn = fn;
    return this;
  }

  edgeCount(): number {
    return this._edgeCount;
  }

  edges(): EdgeDescriptor[] {
    return values(this._edgeObjs);
  }

  setPath(nodes: string[], label?: EdgeLabel): this {
    reduce(nodes, (prev, curr) => {
      if (arguments.length > 1) {
        this.setEdge(prev, curr, label);
      } else {
        this.setEdge(prev, curr);
      }
      return curr;
    });
    return this;
  }

  setEdge(v: string | EdgeDescriptor, w?: string, label?: EdgeLabel, name?: string): this {
    let source: string;
    let target: string;
    let edgeName: string | undefined;
    let edgeLabel: EdgeLabel | undefined;
    let hasLabel = false;

    const firstArg = v;

    if (typeof firstArg === "object" && firstArg !== null && "v" in firstArg) {
      source = firstArg.v;
      target = firstArg.w;
      edgeName = firstArg.name;
      if (arguments.length === 2) {
        edgeLabel = w;
        hasLabel = true;
      }
    } else {
      source = String(firstArg);
      target = String(w);
      edgeName = name;
      if (arguments.length > 2) {
        edgeLabel = label;
        hasLabel = true;
      }
    }

    source = String(source);
    target = String(target);
    if (!isUndefined(edgeName)) {
      edgeName = String(edgeName);
    }

    const edgeKey = buildEdgeKey(this._isDirected, source, target, edgeName);

    if (hasProperty(this._edgeLabels, edgeKey)) {
      if (hasLabel) {
        this._edgeLabels[edgeKey] = edgeLabel;
      }
      return this;
    }

    if (!isUndefined(edgeName) && !this._isMultigraph) {
      throw new Error("Cannot set a named edge when isMultigraph = false");
    }

    this.setNode(source);
    this.setNode(target);

    this._edgeLabels[edgeKey] = hasLabel
      ? edgeLabel
      : this._defaultEdgeLabelFn(source, target, edgeName);

    const edgeDescriptor = normalizeEdge(this._isDirected, source, target, edgeName);
    source = edgeDescriptor.v;
    target = edgeDescriptor.w;

    Object.freeze(edgeDescriptor);
    this._edgeObjs[edgeKey] = edgeDescriptor;

    incrementCount(this._preds[target], source);
    incrementCount(this._sucs[source], target);
    this._in[target][edgeKey] = edgeDescriptor;
    this._out[source][edgeKey] = edgeDescriptor;
    this._edgeCount++;

    return this;
  }

  edge(v: string | EdgeDescriptor, w?: string, name?: string): EdgeLabel {
    const edgeKey =
      arguments.length === 1
        ? edgeDescriptorToKey(this._isDirected, v as EdgeDescriptor)
        : buildEdgeKey(this._isDirected, v as string, w!, name);
    return this._edgeLabels[edgeKey];
  }

  hasEdge(v: string | EdgeDescriptor, w?: string, name?: string): boolean {
    const edgeKey =
      arguments.length === 1
        ? edgeDescriptorToKey(this._isDirected, v as EdgeDescriptor)
        : buildEdgeKey(this._isDirected, v as string, w!, name);
    return hasProperty(this._edgeLabels, edgeKey);
  }

  removeEdge(v: string | EdgeDescriptor, w?: string, name?: string): this {
    const edgeKey =
      arguments.length === 1
        ? edgeDescriptorToKey(this._isDirected, v as EdgeDescriptor)
        : buildEdgeKey(this._isDirected, v as string, w!, name);

    const edge = this._edgeObjs[edgeKey];

    if (edge) {
      const source = edge.v;
      const target = edge.w;

      delete this._edgeLabels[edgeKey];
      delete this._edgeObjs[edgeKey];
      decrementCount(this._preds[target], source);
      decrementCount(this._sucs[source], target);
      delete this._in[target][edgeKey];
      delete this._out[source][edgeKey];
      this._edgeCount--;
    }

    return this;
  }

  inEdges(nodeId: string, sourceId?: string): EdgeDescriptor[] | undefined {
    const inEdges = this._in[nodeId];
    if (inEdges) {
      const edges = values(inEdges);
      return sourceId
        ? filter(edges, (edge) => edge.v === sourceId)
        : edges;
    }
    return undefined;
  }

  outEdges(nodeId: string, targetId?: string): EdgeDescriptor[] | undefined {
    const outEdges = this._out[nodeId];
    if (outEdges) {
      const edges = values(outEdges);
      return targetId
        ? filter(edges, (edge) => edge.w === targetId)
        : edges;
    }
    return undefined;
  }

  nodeEdges(nodeId: string, otherId?: string): EdgeDescriptor[] | undefined {
    const inEdges = this.inEdges(nodeId, otherId);
    if (inEdges) {
      return inEdges.concat(this.outEdges(nodeId, otherId)!);
    }
    return undefined;
  }
}

function incrementCount(map: CountMap, key: string): void {
  if (map[key]) {
    map[key]++;
  } else {
    map[key] = 1;
  }
}

function decrementCount(map: CountMap, key: string): void {
  if (--map[key] === 0) {
    delete map[key];
  }
}

function buildEdgeKey(
  isDirected: boolean,
  v: string,
  w: string,
  name?: string
): string {
  let source = String(v);
  let target = String(w);

  if (!isDirected && source > target) {
    const temp = source;
    source = target;
    target = temp;
  }

  return (
    source +
    EDGE_KEY_DELIM +
    target +
    EDGE_KEY_DELIM +
    (isUndefined(name) ? GRAPH_NODE : name)
  );
}

function edgeDescriptorToKey(isDirected: boolean, edge: EdgeDescriptor): string {
  return buildEdgeKey(isDirected, edge.v, edge.w, edge.name);
}

function normalizeEdge(
  isDirected: boolean,
  v: string,
  w: string,
  name?: string
): EdgeDescriptor {
  let source = String(v);
  let target = String(w);

  if (!isDirected && source > target) {
    const temp = source;
    source = target;
    target = temp;
  }

  const edge: EdgeDescriptor = { v: source, w: target };
  if (name) {
    edge.name = name;
  }
  return edge;
}

function hasProperty<T>(obj: T, key: string | number | symbol): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function keys(obj: object): string[] {
  return Object.keys(obj);
}

function values<T>(obj: { [key: string]: T }): T[] {
  return Object.values(obj);
}

function each<T>(
  collection: T[] | { [key: string]: T },
  iteratee: (value: T, key: string | number) => void
): void {
  if (Array.isArray(collection)) {
    collection.forEach(iteratee);
  } else {
    Object.keys(collection).forEach((key) => {
      iteratee(collection[key], key);
    });
  }
}

function filter<T>(array: T[], predicate: (value: T) => boolean): T[] {
  return array.filter(predicate);
}

function reduce<T>(
  array: T[],
  iteratee: (accumulator: T, value: T) => T
): T | undefined {
  return array.reduce(iteratee);
}

function isEmpty(obj: object): boolean {
  return Object.keys(obj).length === 0;
}

function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

function isFunction(value: unknown): value is Function {
  return typeof value === "function";
}

function constant<T>(value: T): () => T {
  return () => value;
}

function union<T>(arr1: T[], arr2: T[]): T[] {
  return Array.from(new Set([...arr1, ...arr2]));
}

export default Graph;