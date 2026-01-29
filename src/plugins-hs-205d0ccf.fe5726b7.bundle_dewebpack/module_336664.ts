interface MenuItemConfig {
  name: string;
  settingKey?: string;
  submenu?: MenuItemConfig[];
}

interface PathDictionary {
  [settingKey: string]: string | undefined;
}

interface ItemAddedEvent {
  addedItem: unknown;
  folder: unknown;
}

interface ItemRemovedEvent {
  removedItem: unknown;
  folder: unknown;
}

interface RootMenuOptions {
  name: string;
  itemGetter: unknown;
  itemAddedCallback: (item: unknown, folder: unknown) => void;
  itemRemovedCallback: (item: unknown, folder: unknown) => void;
}

class MenuRoot {
  constructor(options: RootMenuOptions, config: unknown);
  add(item: MenuItemConfig): void;
  show(): void;
  hide(): void;
  getChild(name: string): MenuRoot | undefined;
  remove(name: string): void;
}

declare namespace HSCore.Util {
  class Signal<T> {
    constructor(context: unknown);
    dispatch(data: T): void;
  }
}

export default class Menu {
  name: string;
  pathDictionary: PathDictionary;
  signalItemAdded: HSCore.Util.Signal<ItemAddedEvent>;
  signalItemRemoved: HSCore.Util.Signal<ItemRemovedEvent>;
  private _root: MenuRoot;
  private _isInDefaultEnv: boolean;

  constructor(
    name: string,
    config: unknown,
    itemGetter: unknown,
    items?: MenuItemConfig[],
    isInDefaultEnv: boolean = false
  ) {
    this.name = name;
    this._isInDefaultEnv = isInDefaultEnv;
    this.pathDictionary = this.initPathDictionary(items);
    this.signalItemAdded = new HSCore.Util.Signal<ItemAddedEvent>(this);
    this.signalItemRemoved = new HSCore.Util.Signal<ItemRemovedEvent>(this);

    this._root = new MenuRoot(
      {
        name,
        itemGetter,
        itemAddedCallback: this._onItemAdded.bind(this),
        itemRemovedCallback: this._onItemRemoved.bind(this)
      },
      config
    );

    if (items) {
      items.forEach((item) => this._root.add(item));
    }
  }

  initPathDictionary(
    items?: MenuItemConfig[],
    parentPath: string = ""
  ): PathDictionary {
    const dictionary: PathDictionary = {};

    if (!Array.isArray(items)) {
      return dictionary;
    }

    items.forEach((item) => {
      const { settingKey, name, submenu } = item;
      const currentPath = parentPath ? `${parentPath}/${name}` : name;

      dictionary[settingKey!] = currentPath;

      if (submenu) {
        Object.assign(dictionary, this.initPathDictionary(submenu, currentPath));
      }
    });

    return dictionary;
  }

  addSettingKeyToDictionary(item: MenuItemConfig, parentPath: string): void {
    const { name, settingKey, submenu } = item;
    const currentPath = `${parentPath}/${name}`;

    if (name && settingKey) {
      this.pathDictionary[settingKey] = currentPath;
    }

    if (Array.isArray(submenu)) {
      submenu.forEach((subItem) => {
        this.addSettingKeyToDictionary(subItem, currentPath);
      });
    }
  }

  show(): void {
    this._root.show();
  }

  hide(): void {
    this._root.hide();
  }

  getRoot(): MenuRoot {
    return this._root;
  }

  getItem(path?: string): MenuRoot | undefined {
    let currentItem: MenuRoot | undefined = this._root;

    if (!path) {
      return currentItem;
    }

    path.split("/").forEach((segment) => {
      if (segment && currentItem) {
        currentItem = currentItem.getChild(segment);
      }
    });

    return currentItem;
  }

  getItemBySettingKey(settingKey?: string): MenuRoot | undefined {
    if (!settingKey) {
      return undefined;
    }

    const path = this.pathDictionary[settingKey];
    if (path) {
      return this.getItem(path);
    }

    return undefined;
  }

  addItem(item: MenuItemConfig, parentPath: string): void | undefined {
    const parentItem = this.getItem(parentPath);

    if (parentItem) {
      this.addSettingKeyToDictionary(item, parentPath);
      return parentItem.add(item);
    }

    return undefined;
  }

  removeItem(path?: string): void {
    if (!path) {
      return;
    }

    const pathSegments = path.split("/");
    const itemName = pathSegments.pop();
    const parentPath = pathSegments.join("/");
    const parentItem = this.getItem(parentPath);

    if (!parentItem || !itemName) {
      return;
    }

    for (const key in this.pathDictionary) {
      if (this.pathDictionary[key] === path) {
        this.pathDictionary[key] = undefined;
        break;
      }
    }

    parentItem.remove(itemName);
  }

  isInDefaultEnv(): boolean {
    return this._isInDefaultEnv;
  }

  private _onItemAdded(item: unknown, folder: unknown): void {
    this.signalItemAdded.dispatch({
      addedItem: item,
      folder
    });
  }

  private _onItemRemoved(item: unknown, folder: unknown): void {
    this.signalItemRemoved.dispatch({
      removedItem: item,
      folder
    });
  }
}