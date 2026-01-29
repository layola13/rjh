export class GenericNode {
  public childNodes: GenericNode[] = [];
  public parentNode?: GenericNode;
  public id: string;

  constructor(id: string) {
    this.id = id;
  }

  clone(): GenericNode {
    const clonedNode = new GenericNode(this.id);
    clonedNode.childNodes = this.childNodes.map((childNode) => {
      const clonedChild = childNode.clone();
      clonedChild.parentNode = clonedNode;
      return clonedChild;
    });
    return clonedNode;
  }

  dump(): DumpedNode {
    return {
      id: this.id,
      c: this.childNodes.length ? this.childNodes.map((node) => node.dump()) : undefined
    };
  }

  static load(data: DumpedNode): GenericNode {
    const node = new GenericNode(data.id);
    if (data.c) {
      node.childNodes = data.c.map((childData) => {
        const childNode = GenericNode.load(childData);
        childNode.parentNode = node;
        return childNode;
      });
    }
    return node;
  }

  addChildNode(nodes: GenericNode | GenericNode[]): void {
    const updatedChildren = this.childNodes.slice();
    const nodeArray = Array.isArray(nodes) ? nodes : [nodes];
    
    nodeArray.forEach((node) => {
      if (!this.childNodes.find((existingNode) => existingNode.id === node.id)) {
        node.parentNode = this;
        updatedChildren.push(node);
      }
    });
    
    this.childNodes = updatedChildren;
  }

  removeChildNode(nodes: GenericNode | GenericNode[] | string | string[]): void {
    const nodesToRemove: GenericNode[] = [];
    const nodeArray = Array.isArray(nodes) ? nodes : [nodes];
    
    nodeArray.forEach((node) => {
      const targetNode = node instanceof GenericNode ? node : this.getChildNode(node);
      if (targetNode) {
        targetNode.parentNode = undefined;
        nodesToRemove.push(targetNode);
      }
    });
    
    this.childNodes = this.childNodes.filter((node) => !nodesToRemove.includes(node));
  }

  getChildNode(id: string): GenericNode | undefined {
    return this.childNodes.find((node) => node.id === id);
  }

  find(predicate: (node: GenericNode) => boolean): GenericNode | undefined {
    return this.findNode(this, predicate);
  }

  private findNode(node: GenericNode, predicate: (node: GenericNode) => boolean): GenericNode | undefined {
    if (predicate(node)) {
      return node;
    }

    let foundNode: GenericNode | undefined;
    const children = node.childNodes;
    
    if (children?.length) {
      children.find((childNode) => {
        foundNode = this.findNode(childNode, predicate);
        return foundNode;
      });
    }
    
    return foundNode;
  }

  private _getPreOrder(node: GenericNode, result: GenericNode[]): void {
    result.push(node);
    const children = node.childNodes;
    
    if (children.length) {
      children.forEach((childNode) => this._getPreOrder(childNode, result));
    }
  }

  getPreOrderNodes(): GenericNode[] {
    const nodes: GenericNode[] = [];
    this._getPreOrder(this, nodes);
    return nodes;
  }
}

interface DumpedNode {
  id: string;
  c?: DumpedNode[];
}