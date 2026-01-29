import { GenericNode } from './GenericNode';

interface TreeDump {
  rt?: any;
}

export class GenericTree {
  private _root?: GenericNode;
  private _idMap: Map<string, GenericNode> = new Map();

  get root(): GenericNode | undefined {
    return this._root;
  }

  set root(node: GenericNode | undefined) {
    this._root = node;
    this._idMap = new Map();
    if (node) {
      this._traverseIdMap(node);
    }
  }

  addMap(nodes: GenericNode | GenericNode[]): void {
    const nodeArray = Array.isArray(nodes) ? nodes : [nodes];
    nodeArray.forEach((node) => {
      if (!this._idMap.has(node.id)) {
        this._idMap.set(node.id, node);
      }
    });
  }

  private _traverseIdMap(node: GenericNode): void {
    this._idMap.set(node.id, node);
    node.childNodes.forEach((childNode) => this._traverseIdMap(childNode));
  }

  removeMap(nodes: GenericNode | GenericNode[]): void {
    const nodeArray = Array.isArray(nodes) ? nodes : [nodes];
    nodeArray.forEach((node) => {
      this._idMap.delete(node.id);
    });
  }

  clone(): GenericTree {
    const clonedTree = new GenericTree();
    clonedTree.root = this.root?.clone();
    return clonedTree;
  }

  dump(): TreeDump {
    return {
      rt: this.root?.dump()
    };
  }

  static load(data: TreeDump): GenericTree {
    const tree = new GenericTree();
    if (data.rt) {
      tree.root = GenericNode.load(data.rt);
    }
    return tree;
  }

  find(id: string): GenericNode | undefined {
    return this._idMap.get(id);
  }
}