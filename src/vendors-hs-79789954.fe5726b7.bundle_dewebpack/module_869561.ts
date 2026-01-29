class LoopSearcher<T> {
  private nextObjsFunc: (obj: T) => T[];
  private objToVertex2dFunc: (obj: T) => THREE.Vector2;
  private objToIdFunc: (obj: T) => string | number;
  private normal: THREE.Vector3;
  private validEdges: Set<string>;
  private invalidEdges: Set<string>;
  private connectsMap: Map<T, T[]>;
  private root: TreeNode<T> | undefined;
  private outNode: TreeNode<T> | undefined;
  private sourceLines: THREE.Line3[];

  constructor(
    normal: THREE.Vector3,
    nextObjsFunc: (obj: T) => T[],
    objToVertex2dFunc: (obj: T) => THREE.Vector2,
    objToIdFunc: (obj: T) => string | number
  ) {
    this.nextObjsFunc = nextObjsFunc;
    this.objToVertex2dFunc = objToVertex2dFunc;
    this.objToIdFunc = objToIdFunc;
    this.normal = normal;
    this.validEdges = new Set<string>();
    this.invalidEdges = new Set<string>();
    this.connectsMap = new Map<T, T[]>();
    this.root = undefined;
    this.outNode = undefined;
    this.sourceLines = [];
  }

  search(segments: T[]): T[][] {
    const createLoopResult = (
      chain: TreeNode<T>[] | undefined
    ): { objLoop: T[]; vertex2dLoop: THREE.Vector2[] } | undefined => {
      if (!chain) return undefined;
      return {
        objLoop: chain.map(node => node.data),
        vertex2dLoop: chain.map(node => node.vertex2d!)
      };
    };

    const forwardResult = this._search(segments, true);
    const backwardResult = this._search(segments, false);
    const forwardLoop = createLoopResult(forwardResult);
    const backwardLoop = createLoopResult(backwardResult);
    const loops: T[][] = [];

    if (forwardLoop && !backwardLoop) {
      loops.push(forwardLoop.objLoop);
    } else if (!forwardLoop && backwardLoop) {
      loops.push(backwardLoop.objLoop);
    } else if (forwardLoop && backwardLoop) {
      const forwardArea = this.getPolygonArea(forwardLoop.vertex2dLoop);
      const backwardArea = this.getPolygonArea(backwardLoop.vertex2dLoop);

      if (
        (this.isLarger(forwardArea, 0) && this.isSmaller(backwardArea, 0)) ||
        (this.isSmaller(forwardArea, 0) && this.isLarger(backwardArea, 0))
      ) {
        loops.push(forwardLoop.objLoop);
        loops.push(backwardLoop.objLoop);
      } else {
        const absForwardArea = Math.abs(forwardArea);
        const absBackwardArea = Math.abs(backwardArea);
        if (this.isSmallerOrEqual(absForwardArea, absBackwardArea)) {
          loops.push(forwardLoop.objLoop);
        } else {
          loops.push(backwardLoop.objLoop);
        }
      }
    }

    return loops;
  }

  private _addNodeChild(parent: TreeNode<T>, data: T): TreeNode<T> {
    const vertex2d = this.objToVertex2dFunc(data);
    const child = parent.addChild(data);
    child.vertex2d = vertex2d;
    return child;
  }

  private _initSegmentNodes(segments: T[]): void {
    this.sourceLines = [];
    this.root = new TreeNode<T>(segments[0], null);
    this.root.vertex2d = this.objToVertex2dFunc(this.root.data);
    this.root.processed = true;

    let current = this.root;
    for (let i = 1; i < segments.length; i++) {
      const child = this._addNodeChild(current, segments[i]);
      child.processed = true;
      this.sourceLines.push(new THREE.Line3(current.vertex2d!, child.vertex2d!));
      this._addValidEdge(current.data, child.data);
      current = child;
    }
    this.outNode = current;
  }

  private _search(segments: T[], forward: boolean): TreeNode<T>[] | undefined {
    this.invalidEdges.clear();
    this.validEdges.clear();
    this._initSegmentNodes(segments);

    let currentNode: TreeNode<T> | undefined = this.outNode;
    let loopNode: TreeNode<T> | undefined = undefined;

    while (currentNode) {
      currentNode.processed = true;

      if (currentNode.data === this.root!.data) {
        this._addValidEdge(currentNode.parent!.data, currentNode.data);
        loopNode = currentNode;
        currentNode = undefined;
        break;
      }

      if (this._isQualifiedNode(currentNode)) {
        let connections = this.connectsMap.get(currentNode.data);
        if (!connections) {
          connections = this.nextObjsFunc(currentNode.data);
          this.connectsMap.set(currentNode.data, connections);
        }

        const candidates: T[] = [];
        connections.forEach(conn => {
          if (
            conn !== currentNode!.parent!.data &&
            !this._isValidEdge(conn, currentNode!.data) &&
            !this._isInvalidEdge(currentNode!.data, conn)
          ) {
            candidates.push(conn);
          }
        });

        if (candidates.length <= 0) {
          const branchParent = this._removeMinimumBranch(currentNode);
          let nextNode: TreeNode<T> | undefined = undefined;
          if (branchParent) {
            nextNode = this._searchNearestNoneProcessedNode(branchParent, true, forward);
          }
          currentNode = nextNode;
        } else {
          const sortedCandidates = this._sortNextConnections(currentNode, candidates);
          sortedCandidates.forEach(candidate => {
            this._addNodeChild(currentNode!, candidate);
          });
          this._addValidEdge(currentNode.parent!.data, currentNode.data);
          currentNode = forward
            ? currentNode.children[0]
            : currentNode.children[currentNode.children.length - 1];
        }
      } else {
        const branchParent = this._removeMinimumBranch(currentNode);
        let nextNode: TreeNode<T> | undefined = undefined;
        if (branchParent) {
          nextNode = this._searchNearestNoneProcessedNode(branchParent, true, forward);
        }
        currentNode = nextNode;
      }
    }

    if (loopNode) {
      let chain = loopNode.getAncestorChain(true);
      chain = chain.reverse();
      return chain;
    }
    return undefined;
  }

  private _isQualifiedNode(node: TreeNode<T>): boolean {
    const hasDuplicateAncestor = node.searchAncestor(false, ancestor => {
      return ancestor.data === node.data;
    });
    return !hasDuplicateAncestor && !this._hasIntersectionWithSourceLines(node);
  }

  private _hasIntersectionWithSourceLines(node: TreeNode<T>): boolean {
    if (node === this.outNode || node.parent === this.outNode) {
      return false;
    }

    const startVertex = node.parent!.vertex2d!;
    const endVertex = node.vertex2d!;
    const edgeLine = new THREE.Line3(startVertex, endVertex);

    return this.sourceLines.some(sourceLine => {
      const crossProduct =
        this.isLeft2D(sourceLine.start, sourceLine.end, startVertex) *
        this.isLeft2D(sourceLine.start, sourceLine.end, endVertex);
      return (
        !this.isLarger(crossProduct, 0) &&
        !!this.getLineIntersection(sourceLine, edgeLine, true, true)
      );
    });
  }

  private _removeMinimumBranch(node: TreeNode<T>): TreeNode<T> | undefined {
    const chain = node.getAncestorChain(true, ancestor => {
      return ancestor.children.length <= 1 && ancestor !== this.outNode;
    });

    for (let i = 0; i < chain.length - 1; i++) {
      const parent = chain[i + 1];
      const child = chain[i];
      this._removeValidEdge(parent.data, child.data);
      this._addInvalidEdge(parent.data, child.data);
    }

    const topNode = chain[chain.length - 1];
    const parentNode = topNode.parent;
    if (parentNode) {
      this._removeValidEdge(parentNode.data, topNode.data);
      this._addInvalidEdge(parentNode.data, topNode.data);
      parentNode.removeChild(topNode);
    }
    return parentNode;
  }

  private _searchNearestNoneProcessedNode(
    node: TreeNode<T>,
    includeSelf: boolean,
    forward: boolean
  ): TreeNode<T> | undefined {
    let unprocessedNode: TreeNode<T> | undefined = undefined;
    let current: TreeNode<T> | undefined = includeSelf ? node : node.parent;

    while (current) {
      if (forward) {
        for (let i = 0; i < current.children.length; i++) {
          const child = current.children[i];
          if (!child.processed) {
            unprocessedNode = child;
            break;
          }
        }
      } else {
        for (let i = current.children.length - 1; i >= 0; i--) {
          const child = current.children[i];
          if (!child.processed) {
            unprocessedNode = child;
            break;
          }
        }
      }
      if (unprocessedNode) break;
      current = current.parent;
    }
    return unprocessedNode;
  }

  private _sortNextConnections(node: TreeNode<T>, candidates: T[]): T[] {
    const startVertex = node.parent!.vertex2d!;
    const endVertex = node.vertex2d!;
    const direction = endVertex.clone().sub(startVertex).normalize();

    const vectors = candidates.map(candidate => {
      const vec = this.objToVertex2dFunc(candidate).sub(endVertex);
      (vec as any).data = candidate;
      return vec;
    });

    const sorted = this.sortLeftToRight(vectors, direction, this.normal);
    return sorted.map(vec => (vec as any).data);
  }

  private _addValidEdge(from: T, to: T): void {
    const edgeKey = this._getEdgeText(from, to);
    this.validEdges.add(edgeKey);
  }

  private _isValidEdge(from: T, to: T): boolean {
    const edgeKey = this._getEdgeText(from, to);
    return this.validEdges.has(edgeKey);
  }

  private _removeValidEdge(from: T, to: T): void {
    const edgeKey = this._getEdgeText(from, to);
    this.validEdges.delete(edgeKey);
  }

  private _addInvalidEdge(from: T, to: T): void {
    const edgeKey = this._getEdgeText(from, to);
    this.invalidEdges.add(edgeKey);
  }

  private _isInvalidEdge(from: T, to: T): boolean {
    const edgeKey = this._getEdgeText(from, to);
    return this.invalidEdges.has(edgeKey);
  }

  private _getEdgeText(from: T, to: T): string {
    return `${this.objToIdFunc(from)}, ${this.objToIdFunc(to)}`;
  }

  private getPolygonArea(vertices: THREE.Vector2[]): number {
    // Placeholder for polygon area calculation
    return 0;
  }

  private isLarger(a: number, b: number): boolean {
    const EPSILON = 1e-10;
    return a - b > EPSILON;
  }

  private isSmaller(a: number, b: number): boolean {
    const EPSILON = 1e-10;
    return b - a > EPSILON;
  }

  private isSmallerOrEqual(a: number, b: number): boolean {
    const EPSILON = 1e-10;
    return a - b <= EPSILON;
  }

  private isLeft2D(lineStart: THREE.Vector2, lineEnd: THREE.Vector2, point: THREE.Vector2): number {
    return (lineEnd.x - lineStart.x) * (point.y - lineStart.y) - (lineEnd.y - lineStart.y) * (point.x - lineStart.x);
  }

  private getLineIntersection(
    line1: THREE.Line3,
    line2: THREE.Line3,
    includeStart: boolean,
    includeEnd: boolean
  ): THREE.Vector3 | null {
    // Placeholder for line intersection calculation
    return null;
  }

  private sortLeftToRight(
    vectors: THREE.Vector2[],
    direction: THREE.Vector2,
    normal: THREE.Vector3
  ): THREE.Vector2[] {
    // Placeholder for sorting vectors from left to right
    return vectors;
  }
}

class TreeNode<T> {
  data: T;
  parent: TreeNode<T> | null;
  children: TreeNode<T>[];
  processed: boolean;
  vertex2d?: THREE.Vector2;

  constructor(data: T, parent: TreeNode<T> | null) {
    this.data = data;
    this.parent = parent;
    this.children = [];
    this.processed = false;
  }

  addChild(data: T): TreeNode<T> {
    const child = new TreeNode(data, this);
    this.children.push(child);
    return child;
  }

  removeChild(child: TreeNode<T>): void {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  getAncestorChain(includeSelf: boolean, predicate?: (node: TreeNode<T>) => boolean): TreeNode<T>[] {
    const chain: TreeNode<T>[] = [];
    let current: TreeNode<T> | null = includeSelf ? this : this.parent;

    while (current) {
      if (predicate && !predicate(current)) {
        break;
      }
      chain.push(current);
      current = current.parent;
    }
    return chain;
  }

  searchAncestor(includeSelf: boolean, predicate: (node: TreeNode<T>) => boolean): TreeNode<T> | null {
    let current: TreeNode<T> | null = includeSelf ? this : this.parent;

    while (current) {
      if (predicate(current)) {
        return current;
      }
      current = current.parent;
    }
    return null;
  }
}

export default LoopSearcher;