interface TreeNodeData<T = any> {
  [key: string]: T;
}

class TreeNode<T = any> {
  data: T;
  parent?: TreeNode<T>;
  children: TreeNode<T>[];

  constructor(data: T, parent?: TreeNode<T>) {
    this.data = data;
    this.parent = parent;
    this.children = [];
  }

  addChild(data: T): TreeNode<T> {
    const node = new TreeNode(data, this);
    this.children.push(node);
    return node;
  }

  removeChild(child: TreeNode<T>): void {
    const index = this.children.indexOf(child);
    if (index >= 0) {
      this.children.splice(index, 1);
      child.parent = undefined;
    }
  }

  searchNode(data: T): TreeNode<T> | undefined {
    const results: TreeNode<T>[] = [];
    TreeNode._breadthFirstTraverse(this, (node) => {
      if (node.data !== data) {
        return true;
      }
      results.push(node);
      return false;
    });
    
    if (results.length > 0) {
      return results[0];
    }
    return undefined;
  }

  searchAncestor(includeSelf: boolean, predicate: (node: TreeNode<T>) => boolean): TreeNode<T> | undefined {
    let current = includeSelf ? this : this.parent;
    while (current) {
      if (predicate(current)) {
        return current;
      }
      current = current.parent;
    }
    return undefined;
  }

  getLeaves(): TreeNode<T>[] {
    const leaves: TreeNode<T>[] = [];
    TreeNode._breadthFirstTraverse(this, (node) => {
      if (node.children.length <= 0) {
        leaves.push(node);
      }
      return true;
    });
    return leaves;
  }

  getRoot(): TreeNode<T> {
    let root: TreeNode<T> = this;
    while (root.parent) {
      root = root.parent;
    }
    return root;
  }

  forEach(callback: (node: TreeNode<T>) => boolean | void): this {
    if (typeof callback !== 'function') {
      throw new TypeError('forEach() callback must be a function');
    }
    TreeNode._breadthFirstTraverse(this, callback);
    return this;
  }

  getAncestorChain(includeSelf: boolean, predicate?: (node: TreeNode<T>) => boolean): TreeNode<T>[] {
    const chain: TreeNode<T>[] = [];
    
    if (includeSelf && (!predicate || predicate(this))) {
      chain.push(this);
    }
    
    let current = this.parent;
    while (current && (!predicate || predicate(current))) {
      chain.push(current);
      current = current.parent;
    }
    
    return chain;
  }

  getDescendantChains(includeSelf: boolean, predicate?: (node: TreeNode<T>) => boolean): TreeNode<T>[][] {
    if (includeSelf && predicate && !predicate(this)) {
      return [];
    }
    
    interface NodeGroupWithChain extends Array<TreeNode<T>> {
      parentChain?: TreeNode<T>[];
    }
    
    const initialChain: TreeNode<T>[] = [];
    if (includeSelf) {
      initialChain.push(this);
    }
    
    const childrenGroup: NodeGroupWithChain = this.children.slice();
    childrenGroup.parentChain = initialChain;
    
    let queue: NodeGroupWithChain[] = [childrenGroup];
    const chains: TreeNode<T>[][] = [];
    
    while (queue.length > 0) {
      const nextLevel: NodeGroupWithChain[] = [];
      
      queue.forEach((group) => {
        group.forEach((node) => {
          const currentChain = (group.parentChain ?? []).slice();
          
          if (predicate && !predicate(node)) {
            chains.push(currentChain);
          } else {
            currentChain.push(node);
            
            if (node.children.length <= 0) {
              chains.push(currentChain);
            } else {
              const nextGroup: NodeGroupWithChain = node.children.slice();
              nextGroup.parentChain = currentChain;
              nextLevel.push(nextGroup);
            }
          }
        });
      });
      
      queue = nextLevel;
    }
    
    return chains;
  }

  private static _breadthFirstTraverse<T>(root: TreeNode<T>, callback: (node: TreeNode<T>) => boolean | void): void {
    let queue: TreeNode<T>[] = [root];
    
    while (queue.length > 0) {
      const nextLevel: TreeNode<T>[] = [];
      
      for (let i = 0; i < queue.length; i++) {
        const node = queue[i];
        
        if (callback(node) === false) {
          return;
        }
        
        node.children.forEach((child) => {
          nextLevel.push(child);
        });
      }
      
      queue = nextLevel;
    }
  }

  private static _depthFirstTraverse<T>(root: TreeNode<T>, callback: (node: TreeNode<T>) => boolean | void): void {
    let stack: TreeNode<T>[] = [root];
    
    while (stack.length > 0) {
      const node = stack.shift()!;
      
      if (callback(node) === false) {
        return;
      }
      
      stack = [...node.children, ...stack];
    }
  }
}

export default TreeNode;