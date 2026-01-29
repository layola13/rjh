import { Entity, Entity_IO } from './Entity';
import { Vector3 } from './Vector3';
import { EntityField } from './decorators';
import { ConcealedWorkCompEntity, ConcealedWorkCompEntity_IO } from './ConcealedWorkCompEntity';
import { DeviceComp } from './DeviceComp';

export class ConcealedWorkNode_IO extends ConcealedWorkCompEntity_IO {
  dump(
    entity: ConcealedWorkNode,
    context?: unknown,
    includeDefaults: boolean = true,
    options: Record<string, unknown> = {}
  ): unknown[] {
    const result = super.dump(entity, undefined, includeDefaults, options);
    result[0].pos = entity.position.toArray3();
    return result;
  }

  load(
    entity: ConcealedWorkNode,
    data: { pos: [number, number, number] },
    context: unknown
  ): void {
    super.load(entity, data, context);
    Entity_IO.setEntityFields(entity, {
      position: new Vector3(data.pos)
    });
  }
}

export class ConcealedWorkNode extends ConcealedWorkCompEntity {
  @EntityField()
  position: Vector3 = new Vector3();

  getIO(): ConcealedWorkNode_IO {
    return ConcealedWorkNode_IO.instance();
  }

  get worldPos(): Vector3 {
    const deviceComp = this.getComponent(DeviceComp.Type);
    if (deviceComp) {
      const worldPosition = this.position.clone();
      worldPosition.add(deviceComp.offset);
      return worldPosition;
    }
    return this.position;
  }

  get tree(): ConcealedWorkTree | undefined {
    return this._findTree(this);
  }

  get parentNode(): ConcealedWorkNode | undefined {
    const treeInstance = this.tree;
    return treeInstance?.getParentNode(this);
  }

  get childNodes(): ConcealedWorkNode[] {
    const treeInstance = this.tree;
    return treeInstance ? treeInstance.getChildNodes(this) : [];
  }

  private _findTree(node: ConcealedWorkNode): ConcealedWorkTree | undefined {
    const uniqueParent = node.getUniqueParent();
    if (uniqueParent) {
      return uniqueParent as ConcealedWorkTree;
    }
    return undefined;
  }

  find(predicate: (node: ConcealedWorkNode) => boolean): ConcealedWorkNode | undefined {
    return this.findNode(this, predicate);
  }

  private findNode(
    node: ConcealedWorkNode,
    predicate: (node: ConcealedWorkNode) => boolean
  ): ConcealedWorkNode | undefined {
    if (predicate(node)) {
      return node;
    }

    let foundNode: ConcealedWorkNode | undefined;
    const children = node.childNodes;
    if (children.length) {
      children.find((child) => {
        foundNode = this.findNode(child, predicate);
        return foundNode;
      });
    }
    return foundNode;
  }

  traverseNode(visitor: (node: ConcealedWorkNode) => void): void {
    visitor(this);
    this.childNodes.forEach((child) => {
      child.traverseNode(visitor);
    });
  }

  private _getPreOrder(node: ConcealedWorkNode, result: ConcealedWorkNode[]): void {
    result.push(node);
    const children = node.childNodes;
    if (children.length) {
      children.forEach((child) => this._getPreOrder(child, result));
    }
  }

  getPreOrderNodes(): ConcealedWorkNode[] {
    const nodes: ConcealedWorkNode[] = [];
    this._getPreOrder(this, nodes);
    return nodes;
  }

  isEmpty(): boolean {
    return this.childNodes.length === 0;
  }

  getNumberOfLinks(): number {
    const childCount = this.childNodes.length;
    return this.parentNode ? childCount + 1 : childCount;
  }

  getChildNodes(): ConcealedWorkNode[] {
    return this.childNodes;
  }

  getParentNode(): ConcealedWorkNode | undefined {
    return this.parentNode;
  }

  removeChildNode(node: ConcealedWorkNode): void {
    const treeInstance = this.tree;
    if (treeInstance) {
      treeInstance.removeNode(node);
    }
  }

  addChildNode(node: ConcealedWorkNode): void {
    const treeInstance = this.tree;
    if (treeInstance) {
      treeInstance.addChildNode(this, node);
    }
  }

  removeChildNodes(predicate?: (node: ConcealedWorkNode) => boolean): void {
    this.childNodes.forEach((child) => {
      if (!predicate || predicate(child)) {
        this.removeChildNode(child);
      }
    });
  }

  getStructureNode(): unknown {
    const treeInstance = this.tree;
    if (treeInstance) {
      return treeInstance.getStructureNode(this);
    }
    return undefined;
  }
}

interface ConcealedWorkTree {
  getParentNode(node: ConcealedWorkNode): ConcealedWorkNode | undefined;
  getChildNodes(node: ConcealedWorkNode): ConcealedWorkNode[];
  removeNode(node: ConcealedWorkNode): void;
  addChildNode(parent: ConcealedWorkNode, child: ConcealedWorkNode): void;
  getStructureNode(node: ConcealedWorkNode): unknown;
}

Entity.registerClass(HSConstants.ModelClass.ConcealedWorkNode, ConcealedWorkNode);