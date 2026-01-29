import { Entity, Entity_IO } from './Entity';
import { ConcealedWorkCompEntity, ConcealedWorkCompEntity_IO } from './ConcealedWorkCompEntity';
import { ConcealedWorkNode } from './ConcealedWorkNode';
import { JointComp } from './JointComp';
import { DeviceComp } from './DeviceComp';
import { EntityField } from './decorators';
import { GenericTree } from './GenericTree';
import { GenericNode } from './GenericNode';
import { StructureNode } from './StructureNode';
import { Logger } from './Logger';

interface DumpOptions {
  [key: string]: unknown;
}

interface SerializedTreeData {
  tr?: unknown;
  [key: string]: unknown;
}

export class ConcealedWorkTree_IO extends ConcealedWorkCompEntity_IO {
  dump(
    entity: ConcealedWorkTree,
    context?: unknown,
    includeTreeData: boolean = true,
    options: DumpOptions = {}
  ): [SerializedTreeData, unknown] {
    const result = super.dump(entity, undefined, includeTreeData, options);
    const serialized = result[0];

    if (entity.treeData) {
      serialized.tr = entity.treeData.dump();
    }

    return result;
  }

  load(
    entity: ConcealedWorkTree,
    data: SerializedTreeData,
    context?: unknown
  ): void {
    super.load(entity, data, context);

    if (data.tr) {
      const treeData = GenericTree.load(data.tr);
      Entity_IO.setEntityFields(entity, { treeData });
    }
  }
}

export class ConcealedWorkTree extends ConcealedWorkCompEntity {
  @EntityField()
  treeData?: GenericTree;

  getIO(): ConcealedWorkTree_IO {
    return ConcealedWorkTree_IO.instance();
  }

  set root(newRoot: ConcealedWorkNode | undefined) {
    const currentRoot = this.root;

    if (currentRoot) {
      this.removeChild(currentRoot);
      this.treeData = undefined;
    }

    if (newRoot) {
      if (!newRoot.isOrphan()) {
        if (DEBUG) {
          Logger.console.error(`newRoot: ${newRoot.tag} is not Orphan`);
        }
        return;
      }

      this.addChild(newRoot);
      const tree = new GenericTree();
      tree.root = new GenericNode(newRoot.id);
      this.treeData = tree;
    }
  }

  get root(): ConcealedWorkNode | undefined {
    const rootId = this.treeData?.root?.id;
    let rootNode: unknown;

    if (rootId) {
      rootNode = this._children[rootId];
    }

    return rootNode instanceof ConcealedWorkNode ? rootNode : undefined;
  }

  get cworks(): unknown[] {
    return Object.values(this._parents);
  }

  size(): number {
    return this.root ? this.getDescendantsCount(this.root) + 1 : 0;
  }

  getDescendantsCount(node: ConcealedWorkNode): number {
    const children = node.childNodes;
    let count = children.length;

    if (count) {
      children.forEach((child) => {
        count += this.getDescendantsCount(child);
      });
    }

    return count;
  }

  getPreOrderNodes(): ConcealedWorkNode[] {
    return this.root ? this.root.getPreOrderNodes() : [];
  }

  getSegments(): [ConcealedWorkNode, ConcealedWorkNode][] {
    const segments: [ConcealedWorkNode, ConcealedWorkNode][] = [];

    if (this.root) {
      this._traverseSegments(this.root, segments);
    }

    return segments;
  }

  getJoints(): ConcealedWorkNode[] {
    const joints: ConcealedWorkNode[] = [];

    this.root?.traverseNode((node) => {
      if (node.getComponent(JointComp.Type)) {
        joints.push(node);
      }
    });

    return joints;
  }

  private _traverseSegments(
    node: ConcealedWorkNode,
    segments: [ConcealedWorkNode, ConcealedWorkNode][]
  ): void {
    const children = node.childNodes;

    if (children.length) {
      children.forEach((child) => {
        const parentDevice = node.getComponent(DeviceComp.Type);
        const childDevice = child.getComponent(DeviceComp.Type);

        if (!(parentDevice && childDevice && parentDevice.content === childDevice.content)) {
          segments.push([node, child]);
        }

        this._traverseSegments(child, segments);
      });
    }
  }

  findById(id: string): ConcealedWorkNode | undefined {
    return this.treeData?.find(id) ? this.children[id] : undefined;
  }

  find(predicate: (node: ConcealedWorkNode) => boolean): ConcealedWorkNode | undefined {
    return this.root?.find(predicate);
  }

  getChildNodes(node: ConcealedWorkNode): ConcealedWorkNode[] {
    const treeNode = this.treeData?.find(node.id);
    if (!treeNode) return [];

    const childNodes = treeNode.childNodes
      ?.map((childTreeNode) => this.children[childTreeNode.id])
      .filter((child): child is ConcealedWorkNode => child instanceof ConcealedWorkNode);

    return childNodes ?? [];
  }

  getParentNode(node: ConcealedWorkNode): ConcealedWorkNode | undefined {
    const treeNode = this.treeData?.find(node.id);
    const parentTreeNode = treeNode?.parentNode;

    return parentTreeNode ? this.children[parentTreeNode.id] : undefined;
  }

  addChildNode(parentNode: ConcealedWorkNode, childNode: ConcealedWorkNode): void {
    if (!childNode.isOrphan()) {
      if (DEBUG) {
        Logger.console.error(`addChildNode: ${childNode.tag} is not Orphan`);
      }
      return;
    }

    if (this.treeData?.find(childNode.id)) {
      if (DEBUG) {
        Logger.console.error(`addChildNode: ${childNode.tag} exist in treeData`);
      }
      return;
    }

    this.addChild(childNode);

    const clonedTree = this.treeData?.clone();
    const parentTreeNode = clonedTree?.find(parentNode.id);
    const newTreeNode = new GenericNode(childNode.id);

    parentTreeNode?.addChildNode(newTreeNode);
    clonedTree?.addMap(newTreeNode);
    this.treeData = clonedTree;
  }

  removeNode(node: ConcealedWorkNode): void {
    if (this.root === node) {
      node.childNodes.forEach((child) => {
        this.removeNode(child);
      });
      this.root = undefined;
      return;
    }

    node.childNodes.forEach((child) => {
      this.removeNode(child);
    });

    this.removeChild(node);

    const clonedTree = this.treeData?.clone();
    const treeNode = clonedTree?.find(node.id);

    if (treeNode) {
      if (treeNode.parentNode) {
        treeNode.parentNode.removeChildNode(treeNode);
        clonedTree?.removeMap(treeNode);
        this.treeData = clonedTree;
      } else {
        this.treeData = undefined;
      }
    }
  }

  removeSelf(): void {
    Object.values(this._parents).forEach((parent) => {
      parent.removeChild(this);
    }, this);
  }

  getStructureNode(node: ConcealedWorkNode): StructureNode | undefined {
    return this._traverseStructureNode(node);
  }

  private _traverseStructureNode(node: ConcealedWorkNode): StructureNode | undefined {
    if (!this.treeData?.find(node.id)) return undefined;

    const structureNode = new StructureNode(node);

    node.getChildNodes().forEach((childNode) => {
      const childStructureNode = this._traverseStructureNode(childNode);
      if (childStructureNode) {
        childStructureNode.parentNode = structureNode;
        structureNode.childNodes.push(childStructureNode);
      }
    });

    return structureNode;
  }
}

Entity.registerClass(HSConstants.ModelClass.ConcealedWorkTree, ConcealedWorkTree);