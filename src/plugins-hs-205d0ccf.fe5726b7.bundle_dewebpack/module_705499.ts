import SignalHook from './SignalHook';
import { ToolbarItem, ToolbarFolder } from './ToolbarTypes';

interface LinkedToolbarOptions {
  addItems?: Array<[ToolbarItemData, string]>;
  excludeItems?: string[];
  includeItems?: string[];
  isInDefaultEnv: boolean;
}

interface ToolbarItemData {
  order: number;
  toolbar: string;
  path: string;
}

interface BaseToolbar {
  name: string;
  pathDictionary: Map<string, ToolbarItem>;
  getRoot(): ToolbarFolder;
  signalItemAdded: Signal;
  signalItemRemoved: Signal;
}

interface Signal {
  type: string;
}

interface ItemAddedEvent {
  data: {
    addedItem: ToolbarItem;
  };
}

interface ItemRemovedEvent {
  data: {
    removedItem: ToolbarItem;
    folder: ToolbarFolder;
  };
}

export default class LinkedToolbar extends BaseToolbarClass {
  private _base: BaseToolbar;
  private _excludeItems?: string[];
  private _includeItems?: string[];
  private _signalHook: SignalHook;
  public pathDictionary: Map<string, ToolbarItem>;

  constructor(
    id: string,
    base: BaseToolbar,
    name: string,
    description: string,
    options: LinkedToolbarOptions
  ) {
    super(id, name, description, undefined, options.isInDefaultEnv);
    
    this._base = base;
    this.pathDictionary = base.pathDictionary;
    this._excludeItems = options.excludeItems;
    this._includeItems = options.includeItems;

    base.getRoot().childItems.forEach((item: ToolbarItem) => {
      this._checkAndAddLinkedItem(item);
    });

    (options.addItems ?? []).forEach(([itemData, parentPath]: [ToolbarItemData, string]) => {
      this.addItem(itemData, parentPath);
    });

    this._signalHook = new HSCore.Util.SignalHook(this);
    this._signalHook
      .listen(base.signalItemAdded, this._onBaseItemAdded)
      .listen(base.signalItemRemoved, this._onBaseItemRemoved);
  }

  private _onBaseItemAdded = (event: ItemAddedEvent): void => {
    const addedItem = event.data.addedItem;
    this.pathDictionary = this._base.pathDictionary;
    this._checkAndAddLinkedItem(addedItem);
  };

  private _onBaseItemRemoved = (event: ItemRemovedEvent): void => {
    const { removedItem, folder } = event.data;
    const folderPath = folder.getPath();
    
    this.pathDictionary = this._base.pathDictionary;
    
    const itemPath = folderPath ? `${folderPath}/${removedItem.name}` : removedItem.name;
    
    if (!this._isBaseItemExcluded(itemPath)) {
      this.removeItem(itemPath);
    }
  };

  private _isBaseItemExcluded(path: string): boolean {
    if (this._includeItems && !this._includeItems.includes(path)) {
      return true;
    }
    
    if (this._excludeItems && this._excludeItems.includes(path)) {
      return true;
    }
    
    return false;
  }

  private _checkAndAddLinkedItem(item: ToolbarItem): void {
    const itemPath = item.getPath();
    
    if (this._isBaseItemExcluded(itemPath)) {
      return;
    }
    
    this.addItem(
      {
        order: item.data.order,
        toolbar: this._base.name,
        path: itemPath
      },
      item.parent.getPath()
    );
    
    item.childItems?.forEach((childItem: ToolbarItem) => {
      this._checkAndAddLinkedItem(childItem);
    });
  }
}