interface KDTreeNode<T> {
  obj: T;
  left: KDTreeNode<T> | null;
  right: KDTreeNode<T> | null;
  parent: KDTreeNode<T> | null;
  dimension: number;
}

class TreeNode<T> implements KDTreeNode<T> {
  obj: T;
  left: KDTreeNode<T> | null;
  right: KDTreeNode<T> | null;
  parent: KDTreeNode<T> | null;
  dimension: number;

  constructor(obj: T, dimension: number, parent: KDTreeNode<T> | null) {
    this.obj = obj;
    this.left = null;
    this.right = null;
    this.parent = parent;
    this.dimension = dimension;
  }
}

type DistanceFunction<T> = (a: T, b: T) => number;
type ComparatorFunction<T> = (a: T, b: T) => number;

interface NearestResult<T> {
  point: T;
  distance: number;
}

class BinaryHeap<T> {
  private content: T[];
  private scoreFunction: (element: T) => number;

  constructor(scoreFunction: (element: T) => number) {
    this.content = [];
    this.scoreFunction = scoreFunction;
  }

  push(element: T): void {
    this.content.push(element);
    this.bubbleUp(this.content.length - 1);
  }

  pop(): T | undefined {
    const result = this.content[0];
    const end = this.content.pop();
    if (this.content.length > 0 && end !== undefined) {
      this.content[0] = end;
      this.sinkDown(0);
    }
    return result;
  }

  peek(): T | undefined {
    return this.content[0];
  }

  size(): number {
    return this.content.length;
  }

  private bubbleUp(index: number): void {
    const element = this.content[index];
    const score = this.scoreFunction(element);

    while (index > 0) {
      const parentIndex = Math.floor((index + 1) / 2) - 1;
      const parent = this.content[parentIndex];
      if (score >= this.scoreFunction(parent)) break;

      this.content[parentIndex] = element;
      this.content[index] = parent;
      index = parentIndex;
    }
  }

  private sinkDown(index: number): void {
    const length = this.content.length;
    const element = this.content[index];
    const elementScore = this.scoreFunction(element);

    while (true) {
      const child2Index = (index + 1) * 2;
      const child1Index = child2Index - 1;
      let swapIndex: number | null = null;
      let child1Score: number | undefined;

      if (child1Index < length) {
        const child1 = this.content[child1Index];
        child1Score = this.scoreFunction(child1);
        if (child1Score < elementScore) {
          swapIndex = child1Index;
        }
      }

      if (child2Index < length) {
        const child2 = this.content[child2Index];
        const child2Score = this.scoreFunction(child2);
        if (child2Score < (swapIndex === null ? elementScore : child1Score!)) {
          swapIndex = child2Index;
        }
      }

      if (swapIndex === null) break;

      this.content[index] = this.content[swapIndex];
      this.content[swapIndex] = element;
      index = swapIndex;
    }
  }
}

class KDTree<T extends Record<string, number>> {
  private root: KDTreeNode<T> | null;
  private distanceFunc: DistanceFunction<T>;
  private dimensions: string[];

  constructor(
    points: T[] | KDTreeNode<T>,
    distanceFunction: DistanceFunction<T>,
    dimensions: string[]
  ) {
    this.distanceFunc = distanceFunction;
    this.dimensions = dimensions;
    this.root = null;

    if (Array.isArray(points)) {
      this.root = this.buildTree(points, 0, null, 0, points.length - 1);
    } else {
      this.loadTree(points);
    }
  }

  private buildTree(
    points: T[],
    depth: number,
    parent: KDTreeNode<T> | null,
    startIndex: number,
    endIndex: number
  ): KDTreeNode<T> | null {
    if (points.length <= 0 || startIndex > endIndex) {
      return null;
    }

    const dimensionIndex = depth % this.dimensions.length;

    if (startIndex === endIndex) {
      return new TreeNode(points[startIndex], dimensionIndex, parent);
    }

    const dimensionKey = this.dimensions[dimensionIndex];
    const comparator: ComparatorFunction<T> = (a, b) => {
      const aValue = a[dimensionKey];
      const bValue = b[dimensionKey];
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    };

    const medianIndex = KDTree.quickSelectMedian(points, comparator, startIndex, endIndex);
    const node = new TreeNode(points[medianIndex], dimensionIndex, parent);

    node.left = this.buildTree(points, depth + 1, node, startIndex, medianIndex - 1);
    node.right = this.buildTree(points, depth + 1, node, medianIndex + 1, endIndex);

    return node;
  }

  private loadTree(node: KDTreeNode<T>): void {
    this.root = node;

    const linkParents = (currentNode: KDTreeNode<T>): void => {
      if (currentNode.left) {
        currentNode.left.parent = currentNode;
        linkParents(currentNode.left);
      }
      if (currentNode.right) {
        currentNode.right.parent = currentNode;
        linkParents(currentNode.right);
      }
    };

    linkParents(this.root);
  }

  toJSON(node?: KDTreeNode<T> | null): KDTreeNode<T> | null {
    if (!node) {
      node = this.root;
    }
    if (!node) {
      return null;
    }

    const serializedNode = new TreeNode(node.obj, node.dimension, null);

    if (node.left) {
      serializedNode.left = this.toJSON(node.left);
    }
    if (node.right) {
      serializedNode.right = this.toJSON(node.right);
    }

    return serializedNode;
  }

  private innerSearch(
    point: T,
    node: KDTreeNode<T> | null,
    parent: KDTreeNode<T> | null
  ): KDTreeNode<T> | null {
    if (!node) {
      return parent;
    }

    const dimensionKey = this.dimensions[node.dimension];
    return point[dimensionKey] < node.obj[dimensionKey]
      ? this.innerSearch(point, node.left, node)
      : this.innerSearch(point, node.right, node);
  }

  insert(point: T): void {
    const parentNode = this.innerSearch(point, this.root, null);

    if (parentNode !== null) {
      const nextDimension = (parentNode.dimension + 1) % this.dimensions.length;
      const newNode = new TreeNode(point, nextDimension, parentNode);
      const dimensionKey = this.dimensions[parentNode.dimension];

      if (point[dimensionKey] < parentNode.obj[dimensionKey]) {
        parentNode.left = newNode;
      } else {
        parentNode.right = newNode;
      }
    } else {
      this.root = new TreeNode(point, 0, null);
    }
  }

  private nodeSearch(point: T, node: KDTreeNode<T> | null): KDTreeNode<T> | null {
    if (node === null) {
      return null;
    }
    if (node.obj === point) {
      return node;
    }

    const dimensionKey = this.dimensions[node.dimension];
    return point[dimensionKey] < node.obj[dimensionKey]
      ? this.nodeSearch(point, node.left)
      : this.nodeSearch(point, node.right);
  }

  private removeNode(node: KDTreeNode<T>): void {
    const findMin = (
      currentNode: KDTreeNode<T> | null,
      targetDimension: number
    ): KDTreeNode<T> | null => {
      if (currentNode === null) {
        return null;
      }

      const dimensionKey = this.dimensions[targetDimension];

      if (currentNode.dimension === targetDimension) {
        return currentNode.left !== null ? findMin(currentNode.left, targetDimension) : currentNode;
      }

      const currentValue = currentNode.obj[dimensionKey];
      const leftMin = findMin(currentNode.left, targetDimension);
      const rightMin = findMin(currentNode.right, targetDimension);
      let minNode = currentNode;

      if (leftMin !== null && leftMin.obj[dimensionKey] < currentValue) {
        minNode = leftMin;
      }
      if (rightMin !== null && rightMin.obj[dimensionKey] < minNode.obj[dimensionKey]) {
        minNode = rightMin;
      }

      return minNode;
    };

    if (node.left === null && node.right === null) {
      if (node.parent === null) {
        this.root = null;
        return;
      }

      const parentDimensionKey = this.dimensions[node.parent.dimension];
      if (node.obj[parentDimensionKey] < node.parent.obj[parentDimensionKey]) {
        node.parent.left = null;
      } else {
        node.parent.right = null;
      }
      return;
    }

    let minNode: KDTreeNode<T>;
    let replacementObj: T;

    if (node.right !== null) {
      minNode = findMin(node.right, node.dimension)!;
      replacementObj = minNode.obj;
      this.removeNode(minNode);
      node.obj = replacementObj;
    } else {
      minNode = findMin(node.left, node.dimension)!;
      replacementObj = minNode.obj;
      this.removeNode(minNode);
      node.right = node.left;
      node.left = null;
      node.obj = replacementObj;
    }
  }

  remove(point: T): void {
    const node = this.nodeSearch(point, this.root);
    if (node) {
      this.removeNode(node);
    }
  }

  nearest(point: T, maxCount: number, maxDistance?: number): Array<[T, number]> {
    const heap = new BinaryHeap<[KDTreeNode<T> | null, number]>((element) => -element[1]);

    const addToHeap = (node: KDTreeNode<T>, distance: number): void => {
      heap.push([node, distance]);
      if (heap.size() > maxCount) {
        heap.pop();
      }
    };

    if (maxDistance) {
      for (let i = 0; i < maxCount; i++) {
        heap.push([null, maxDistance]);
      }
    }

    if (this.root) {
      const searchNode = (node: KDTreeNode<T>): void => {
        const dimensionKey = this.dimensions[node.dimension];
        const planePoint: Partial<T> = {} as Partial<T>;

        for (let i = 0; i < this.dimensions.length; i++) {
          if (i === node.dimension) {
            planePoint[this.dimensions[i] as keyof T] = point[this.dimensions[i]] as any;
          } else {
            planePoint[this.dimensions[i] as keyof T] = node.obj[this.dimensions[i]] as any;
          }
        }

        const planeDistance = this.distanceFunc(planePoint as T, node.obj);
        const nodeDistance = this.distanceFunc(point, node.obj);

        if (node.right !== null || node.left !== null) {
          const nearerChild =
            node.right === null
              ? node.left
              : node.left === null
              ? node.right
              : point[dimensionKey] < node.obj[dimensionKey]
              ? node.left
              : node.right;

          searchNode(nearerChild!);

          if (heap.size() < maxCount || nodeDistance < heap.peek()![1]) {
            addToHeap(node, nodeDistance);
          }

          if (heap.size() < maxCount || Math.abs(planeDistance) < heap.peek()![1]) {
            const fartherChild = nearerChild === node.left ? node.right : node.left;
            if (fartherChild !== null) {
              searchNode(fartherChild);
            }
          }
        } else {
          if (heap.size() < maxCount || nodeDistance < heap.peek()![1]) {
            addToHeap(node, nodeDistance);
          }
        }
      };

      searchNode(this.root);
    }

    const result: Array<[T, number]> = [];
    for (let i = 0; i < Math.min(maxCount, heap.size()); i++) {
      const entry = (heap as any).content[i];
      if (entry[0]) {
        result.push([entry[0].obj, entry[1]]);
      }
    }

    return result;
  }

  balanceFactor(): number {
    const calculateHeight = (node: KDTreeNode<T> | null): number => {
      if (node === null) {
        return 0;
      }
      return Math.max(calculateHeight(node.left), calculateHeight(node.right)) + 1;
    };

    const countNodes = (node: KDTreeNode<T> | null): number => {
      if (node === null) {
        return 0;
      }
      return countNodes(node.left) + countNodes(node.right) + 1;
    };

    const height = calculateHeight(this.root);
    const nodeCount = countNodes(this.root);

    return height / (Math.log(nodeCount) / Math.log(2));
  }

  private static quickSelectMedian<T>(
    array: T[],
    comparator: ComparatorFunction<T>,
    left: number,
    right: number
  ): number {
    const medianIndex = Math.floor((left + right) / 2);
    let currentLeft = left;
    let currentRight = right;

    while (currentLeft < currentRight) {
      let i = currentLeft;
      let j = currentRight;
      const pivot = array[Math.floor((i + j) / 2)];

      while (i < j) {
        if (comparator(array[i], pivot) > -1) {
          const temp = array[j];
          array[j] = array[i];
          array[i] = temp;
          j--;
        } else {
          i++;
        }
      }

      if (comparator(array[i], pivot) > 0) {
        i--;
      }

      if (medianIndex <= i) {
        currentRight = i;
      } else {
        currentLeft = i + 1;
      }
    }

    return medianIndex;
  }
}

export default KDTree;