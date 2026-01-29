interface SignalPayload {
  addedItem: TreeNode;
  folder: TreeNode;
}

interface RemovalPayload {
  removedItem: TreeNode;
  folder: TreeNode;
}

interface TreeNodeConfig {
  name: string;
  itemGetter: (name: string) => unknown;
  itemAddedCallback: (item: TreeNode, folder: TreeNode) => void;
  itemRemovedCallback: (item: TreeNode, folder: TreeNode) => void;
}

type ItemGetter = (name: string) => unknown;

class TreeNode {
  name: string;
  signalItemAdded: HSCore.Util.Signal<SignalPayload>;
  signalItemRemoved: HSCore.Util.Signal<RemovalPayload>;
  private _root: TreeNodeImplementation;

  constructor(
    name: string,
    nodeData: unknown,
    itemGetter: ItemGetter,
    initialItems?: unknown[]
  ) {
    this.name = name;
    this.signalItemAdded = new HSCore.Util.Signal(this);
    this.signalItemRemoved = new HSCore.Util.Signal(this);

    const rootNode = this._root = new TreeNodeImplementation(
      {
        name: name,
        itemGetter: itemGetter,
        itemAddedCallback: this._onItemAdded.bind(this),
        itemRemovedCallback: this._onItemRemoved.bind(this)
      },
      nodeData
    );

    if (initialItems) {
      initialItems.forEach((item) => rootNode.add(item));
    }
  }

  show(): void {
    this._root.show();
  }

  hide(): void {
    this._root.hide();
  }

  getRoot(): TreeNodeImplementation {
    return this._root;
  }

  getItem(path?: string): TreeNodeImplementation | undefined {
    let currentNode: TreeNodeImplementation | undefined = this._root;

    if (!path) {
      return currentNode;
    }

    path.split("/").forEach((segment) => {
      if (segment && currentNode) {
        currentNode = currentNode.getChild(segment);
      }
    });

    return currentNode;
  }

  addItem(item: unknown, parentPath?: string): unknown {
    const parentNode = this.getItem(parentPath);
    if (parentNode) {
      return parentNode.add(item);
    }
    return undefined;
  }

  removeItem(itemPath?: string): void {
    if (!itemPath) {
      return;
    }

    const pathSegments = itemPath.split("/");
    const itemName = pathSegments.pop();
    const parentPath = pathSegments.join("/");
    const parentNode = this.getItem(parentPath);

    if (parentNode && itemName) {
      parentNode.remove(itemName);
    }
  }

  private _onItemAdded(item: TreeNode, folder: TreeNode): void {
    this.signalItemAdded.dispatch({
      addedItem: item,
      folder: folder
    });
  }

  private _onItemRemoved(item: TreeNode, folder: TreeNode): void {
    this.signalItemRemoved.dispatch({
      removedItem: item,
      folder: folder
    });
  }
}

export default TreeNode;