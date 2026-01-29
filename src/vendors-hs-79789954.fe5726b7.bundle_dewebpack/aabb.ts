import AABB from './AABB';

const NULL_NODE_INDEX = -1;

interface IAABBTreeObject {
  AABB: AABB;
}

class TreeNode {
  public AABB: AABB;
  public object: IAABBTreeObject | null;
  public parentNodeIndex: number;
  public leftNodeIndex: number;
  public rightNodeIndex: number;
  public nextNodeIndex: number;

  constructor() {
    this.AABB = new AABB();
    this.object = null;
    this.parentNodeIndex = NULL_NODE_INDEX;
    this.leftNodeIndex = NULL_NODE_INDEX;
    this.rightNodeIndex = NULL_NODE_INDEX;
    this.nextNodeIndex = NULL_NODE_INDEX;
  }

  public isLeaf(): boolean {
    return this.leftNodeIndex === NULL_NODE_INDEX;
  }
}

class AABBTree {
  private _nodes: TreeNode[];
  private _objectNodeIndexMap: Map<IAABBTreeObject, number>;
  private _rootNodeIndex: number;
  private _allocatedNodeCount: number;
  private _nextFreeNodeIndex: number;
  private _nodeCapacity: number;
  private _growthSize: number;

  constructor(initialCapacity: number) {
    this._nodes = new Array(initialCapacity);
    this._objectNodeIndexMap = new Map();
    this._rootNodeIndex = NULL_NODE_INDEX;
    this._allocatedNodeCount = 0;
    this._nextFreeNodeIndex = 0;
    this._nodeCapacity = initialCapacity;
    this._growthSize = initialCapacity;

    for (let i = 0; i < initialCapacity; i++) {
      const node = new TreeNode();
      node.nextNodeIndex = i + 1;
      this._nodes[i] = node;
    }
    this._nodes[initialCapacity - 1].nextNodeIndex = NULL_NODE_INDEX;
  }

  private allocateNode(): number {
    if (this._nextFreeNodeIndex === NULL_NODE_INDEX) {
      if (this._allocatedNodeCount !== this._nodeCapacity) {
        return NULL_NODE_INDEX;
      }

      this._nodeCapacity += this._growthSize;
      const newNodes = new Array(this._nodeCapacity - this._allocatedNodeCount);
      this._nodes = this._nodes.concat(newNodes);

      for (let i = this._allocatedNodeCount; i < this._nodeCapacity; i++) {
        const node = new TreeNode();
        node.nextNodeIndex = i + 1;
        this._nodes[i] = node;
      }

      this._nodes[this._nodeCapacity - 1].nextNodeIndex = NULL_NODE_INDEX;
      this._nextFreeNodeIndex = this._allocatedNodeCount;
    }

    const nodeIndex = this._nextFreeNodeIndex;
    const node = this._nodes[nodeIndex];

    node.parentNodeIndex = NULL_NODE_INDEX;
    node.leftNodeIndex = NULL_NODE_INDEX;
    node.rightNodeIndex = NULL_NODE_INDEX;
    this._nextFreeNodeIndex = node.nextNodeIndex;
    this._allocatedNodeCount++;

    return nodeIndex;
  }

  private deallocateNode(nodeIndex: number): void {
    this._nodes[nodeIndex].nextNodeIndex = this._nextFreeNodeIndex;
    this._nextFreeNodeIndex = nodeIndex;
    this._allocatedNodeCount--;
  }

  public queryOverlaps(queryObject: IAABBTreeObject): IAABBTreeObject[] {
    const results: IAABBTreeObject[] = [];
    const stack: number[] = [];
    const queryAABB = queryObject.AABB;

    stack.push(this._rootNodeIndex);

    while (stack.length > 0) {
      const nodeIndex = stack.pop()!;

      if (nodeIndex !== NULL_NODE_INDEX) {
        const node = this._nodes[nodeIndex];

        if (node.AABB.overlaps(queryAABB, true) && node.object !== queryObject) {
          if (node.isLeaf()) {
            results.push(node.object!);
          } else {
            stack.push(node.leftNodeIndex);
            stack.push(node.rightNodeIndex);
          }
        }
      }
    }

    return results;
  }

  private _insertLeaf(leafNodeIndex: number): void {
    const leafNode = this._nodes[leafNodeIndex];

    if (
      leafNode.parentNodeIndex === NULL_NODE_INDEX &&
      leafNode.leftNodeIndex === NULL_NODE_INDEX &&
      leafNode.rightNodeIndex === NULL_NODE_INDEX
    ) {
      if (this._rootNodeIndex === NULL_NODE_INDEX) {
        this._rootNodeIndex = leafNodeIndex;
        return;
      }

      let currentNodeIndex = this._rootNodeIndex;

      while (!this._nodes[currentNodeIndex].isLeaf()) {
        const currentNode = this._nodes[currentNodeIndex];
        const leftChildIndex = currentNode.leftNodeIndex;
        const rightChildIndex = currentNode.rightNodeIndex;
        const leftChild = this._nodes[leftChildIndex];
        const rightChild = this._nodes[rightChildIndex];

        const mergedAABB = currentNode.AABB.merge(leafNode.AABB);
        const mergedSurfaceArea = 2 * mergedAABB.surfaceArea;
        const inheritanceCost = 2 * (mergedAABB.surfaceArea - currentNode.AABB.surfaceArea);

        let leftCost: number;
        if (leftChild.isLeaf()) {
          leftCost = leafNode.AABB.merge(leftChild.AABB).surfaceArea + inheritanceCost;
        } else {
          leftCost = leafNode.AABB.merge(leftChild.AABB).surfaceArea - leftChild.AABB.surfaceArea + inheritanceCost;
        }

        let rightCost: number;
        if (rightChild.isLeaf()) {
          rightCost = leafNode.AABB.merge(rightChild.AABB).surfaceArea + inheritanceCost;
        } else {
          rightCost = leafNode.AABB.merge(rightChild.AABB).surfaceArea - rightChild.AABB.surfaceArea + inheritanceCost;
        }

        if (mergedSurfaceArea < leftCost && mergedSurfaceArea < rightCost) {
          break;
        }

        currentNodeIndex = leftCost < rightCost ? leftChildIndex : rightChildIndex;
      }

      const siblingNodeIndex = currentNodeIndex;
      const siblingNode = this._nodes[siblingNodeIndex];
      const oldParentIndex = siblingNode.parentNodeIndex;

      const newParentIndex = this.allocateNode();
      const newParentNode = this._nodes[newParentIndex];

      newParentNode.parentNodeIndex = oldParentIndex;
      newParentNode.AABB = leafNode.AABB.merge(siblingNode.AABB);
      newParentNode.leftNodeIndex = siblingNodeIndex;
      newParentNode.rightNodeIndex = leafNodeIndex;

      leafNode.parentNodeIndex = newParentIndex;
      siblingNode.parentNodeIndex = newParentIndex;

      if (oldParentIndex === NULL_NODE_INDEX) {
        this._rootNodeIndex = newParentIndex;
      } else {
        const oldParentNode = this._nodes[oldParentIndex];
        if (oldParentNode.leftNodeIndex === siblingNodeIndex) {
          oldParentNode.leftNodeIndex = newParentIndex;
        } else {
          oldParentNode.rightNodeIndex = newParentIndex;
        }
      }

      this._fixUpwardsTree(leafNode.parentNodeIndex);
    }
  }

  private _removeLeaf(leafNodeIndex: number): void {
    if (leafNodeIndex !== this._rootNodeIndex) {
      const leafNode = this._nodes[leafNodeIndex];
      const parentIndex = leafNode.parentNodeIndex;
      const parentNode = this._nodes[parentIndex];
      const grandParentIndex = parentNode.parentNodeIndex;
      const siblingNodeIndex = parentNode.leftNodeIndex === leafNodeIndex ? parentNode.rightNodeIndex : parentNode.leftNodeIndex;

      if (siblingNodeIndex !== NULL_NODE_INDEX) {
        const siblingNode = this._nodes[siblingNodeIndex];

        if (grandParentIndex !== NULL_NODE_INDEX) {
          const grandParentNode = this._nodes[grandParentIndex];
          if (grandParentNode.leftNodeIndex === parentIndex) {
            grandParentNode.leftNodeIndex = siblingNodeIndex;
          } else {
            grandParentNode.rightNodeIndex = siblingNodeIndex;
          }

          siblingNode.parentNodeIndex = grandParentIndex;
          this.deallocateNode(parentIndex);
          this._fixUpwardsTree(grandParentIndex);
        } else {
          this._rootNodeIndex = siblingNodeIndex;
          siblingNode.parentNodeIndex = NULL_NODE_INDEX;
          this.deallocateNode(parentIndex);
        }

        leafNode.parentNodeIndex = NULL_NODE_INDEX;
      }
    } else {
      this._rootNodeIndex = NULL_NODE_INDEX;
    }
  }

  private _updateLeaf(leafNodeIndex: number, newAABB: AABB): void {
    const leafNode = this._nodes[leafNodeIndex];

    if (!leafNode.AABB.contains(newAABB)) {
      this._removeLeaf(leafNodeIndex);
      leafNode.AABB = newAABB;
      this._insertLeaf(leafNodeIndex);
    }
  }

  private _fixUpwardsTree(nodeIndex: number): void {
    let currentIndex = nodeIndex;

    while (currentIndex !== NULL_NODE_INDEX) {
      const currentNode = this._nodes[currentIndex];

      if (currentNode.leftNodeIndex === NULL_NODE_INDEX || currentNode.rightNodeIndex === NULL_NODE_INDEX) {
        return;
      }

      const leftChild = this._nodes[currentNode.leftNodeIndex];
      const rightChild = this._nodes[currentNode.rightNodeIndex];

      currentNode.AABB = leftChild.AABB.merge(rightChild.AABB);
      currentIndex = currentNode.parentNodeIndex;
    }
  }

  public insertObject(object: IAABBTreeObject): void {
    const nodeIndex = this.allocateNode();
    const node = this._nodes[nodeIndex];

    node.AABB = object.AABB;
    node.object = object;

    this._insertLeaf(nodeIndex);
    this._objectNodeIndexMap.set(object, nodeIndex);
  }

  public removeObject(object: IAABBTreeObject): void {
    const nodeIndex = this._objectNodeIndexMap.get(object);
    if (nodeIndex !== undefined) {
      this._removeLeaf(nodeIndex);
      this.deallocateNode(nodeIndex);
      this._objectNodeIndexMap.delete(object);
    }
  }

  public updateObject(object: IAABBTreeObject): void {
    const nodeIndex = this._objectNodeIndexMap.get(object);
    if (nodeIndex !== undefined) {
      this._updateLeaf(nodeIndex, object.AABB);
    }
  }
}

export default AABBTree;