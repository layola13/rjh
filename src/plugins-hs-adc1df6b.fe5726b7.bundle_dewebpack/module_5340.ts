import MenuItem from './MenuItem';
import MenuItemType from './MenuItemType';
import DividerMenuItem from './DividerMenuItem';
import ButtonMenuItem from './ButtonMenuItem';
import SearchBoxMenuItem from './SearchBoxMenuItem';

interface BadgeData {
  showDotOnParents?: boolean;
}

interface MenuItemData {
  label: string;
  icon: string;
  isPressed: boolean;
  badge?: BadgeData;
  order?: number;
  type?: MenuItemType;
}

interface SubmenuItemConfig extends Omit<MenuItemData, 'label' | 'icon' | 'isPressed'> {
  name: string;
  submenu?: SubmenuItemConfig[];
  helpbar?: unknown;
  path?: unknown;
}

type ItemGetter = () => unknown;
type ItemAddedCallback = (item: MenuItem, parent: FolderMenuItem) => void;
type ItemRemovedCallback = (item: MenuItem, parent: FolderMenuItem) => void;
type ChangeCallback = () => void;

interface FolderMenuItemConfig extends Omit<MenuItemData, 'label' | 'icon' | 'isPressed'> {
  name: string;
  itemGetter: ItemGetter;
  itemAddedCallback: ItemAddedCallback;
  itemRemovedCallback: ItemRemovedCallback;
}

export default class FolderMenuItem extends MenuItem {
  private readonly _itemGetter: ItemGetter;
  private readonly _itemAddedCallback: ItemAddedCallback;
  private readonly _itemRemovedCallback: ItemRemovedCallback;
  public childItems: MenuItem[];

  constructor(
    config: FolderMenuItemConfig,
    changeCallback: ChangeCallback
  ) {
    const { name, itemGetter, itemAddedCallback, itemRemovedCallback, ...restConfig } = config;
    
    super(name, changeCallback);
    
    this._itemGetter = itemGetter;
    this._itemAddedCallback = itemAddedCallback;
    this._itemRemovedCallback = itemRemovedCallback;
    this.childItems = [];
    
    Object.assign(this.data, {
      label: '',
      icon: '',
      isPressed: false
    });
    
    this.setData(restConfig);
  }

  get type(): MenuItemType {
    return MenuItemType.folder;
  }

  get hasBadgeDot(): boolean {
    return !this.data.badge && this.childItems.some((item) => {
      const badge = item.data.badge;
      return (!(!badge || !badge.showDotOnParents)) || 
             (item.type === MenuItemType.folder && (item as FolderMenuItem).hasBadgeDot);
    });
  }

  get hasChildPressed(): boolean {
    return this.childItems.some((item) => item.isPressed());
  }

  setPressed(pressed: boolean): void {
    this.setData({ isPressed: pressed });
  }

  getChild(name: string): MenuItem | undefined {
    return this.childItems.find((item) => item.name === name);
  }

  add(config: SubmenuItemConfig): MenuItem | undefined {
    if (!config) {
      return undefined;
    }

    const items = this.childItems;
    let insertIndex = -1;

    if (config.order !== undefined) {
      insertIndex = items.findIndex((item) => item.data.order! > config.order!);
    } else {
      const lastItem = items[items.length - 1];
      if (lastItem) {
        config = { ...config, order: lastItem.data.order };
      }
    }

    if (insertIndex === -1) {
      insertIndex = this.childItems.length;
    }

    return this._doInsert(insertIndex, config);
  }

  insertBefore(targetName: string, config: SubmenuItemConfig): MenuItem | undefined {
    return this._insert(targetName, config, true);
  }

  insertAfter(targetName: string, config: SubmenuItemConfig): MenuItem | undefined {
    return this._insert(targetName, config, false);
  }

  remove(name: string): void {
    const items = this.childItems;
    const index = items.findIndex((item) => item.name === name);

    if (index !== -1) {
      const removedItem = items.splice(index, 1)[0];
      removedItem.parent = undefined;
      this._itemRemovedCallback(removedItem, this);
    }
  }

  showItem(name: string): void {
    const item = this.childItems.find((item) => item.name === name);
    item?.show();
  }

  hideItem(name: string): void {
    const item = this.childItems.find((item) => item.name === name);
    item?.hide();
  }

  private _insert(
    targetName: string,
    config: SubmenuItemConfig,
    before: boolean
  ): MenuItem | undefined {
    let index = this.childItems.findIndex((item) => item.name === targetName);

    if (index === -1) {
      return this.add(config);
    }

    const targetItem = this.childItems[index];
    const configWithOrder = { ...config, order: targetItem.data.order };

    if (!before) {
      index += 1;
    }

    return this._doInsert(index, configWithOrder);
  }

  private _doInsert(index: number, config: SubmenuItemConfig): MenuItem {
    const { submenu, ...itemConfig } = config;
    const item = this._createItem(itemConfig);

    this.childItems.splice(index, 0, item);
    item.parent = this;
    this._itemAddedCallback(item, this);

    if (item.type === MenuItemType.folder && submenu) {
      submenu.forEach((submenuConfig) => (item as FolderMenuItem).add(submenuConfig));
    }

    return item;
  }

  private _createItem(config: Omit<SubmenuItemConfig, 'submenu'>): MenuItem {
    const { helpbar, path, ...itemConfig } = config;

    switch (itemConfig.type) {
      case MenuItemType.folder:
        return new FolderMenuItem(
          {
            ...itemConfig,
            itemGetter: this._itemGetter,
            itemAddedCallback: this._itemAddedCallback,
            itemRemovedCallback: this._itemRemovedCallback
          } as FolderMenuItemConfig,
          this._changeCallback
        );
      case MenuItemType.divider:
        return new DividerMenuItem(itemConfig, this._changeCallback);
      case MenuItemType.searchbox:
        return new SearchBoxMenuItem(itemConfig, this._changeCallback);
      case MenuItemType.button:
      default:
        return new ButtonMenuItem(itemConfig, this._changeCallback);
    }
  }
}