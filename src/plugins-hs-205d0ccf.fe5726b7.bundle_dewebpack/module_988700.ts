import { ItemType } from './ItemType';
import ButtonItem from './ButtonItem';
import ImageItem from './ImageItem';
import CheckboxItem from './CheckboxItem';
import RadioItem from './RadioItem';
import DividerItem from './DividerItem';
import BaseItem from './BaseItem';
import ProxyItem from './ProxyItem';

interface BadgeConfig {
  showDotOnParents?: boolean;
}

interface LockConfig {
  lock(item: FolderItem): void;
}

interface FolderItemData {
  label?: string;
  labelIcon?: string;
  icon?: string;
  iconhover?: string;
  lineType?: string;
  hover?: boolean;
  catagory?: string;
  tooltip?: string;
  isPressed?: boolean;
  firstTooltip?: string;
  styleName?: string;
  checkStatus?: 'all' | 'none' | 'half-checked';
  onchange?: () => void;
  onclick?: () => void;
  lock?: LockConfig;
  badge?: BadgeConfig;
  hasBadgeDot?: boolean;
  hasWarning?: boolean;
  defaultHoverFirstChild?: boolean;
  isGroup?: boolean;
  visible?: boolean;
  isChecked?: boolean;
  dynamicTooltip?: string;
  order?: number;
  onMouseEnter?: () => void;
}

interface ItemConfig {
  name: string;
  type?: ItemType;
  order?: number;
  submenu?: ItemConfig[];
  toolbar?: string;
  path?: string;
  groupId?: string;
  [key: string]: unknown;
}

interface FolderItemConfig extends ItemConfig {
  itemGetter: ItemGetter;
  itemAddedCallback: ItemCallback;
  itemRemovedCallback: ItemCallback;
}

type ItemGetter = (path: string, toolbar: string) => BaseItem | undefined;
type ItemCallback = (item: BaseItem, parent: FolderItem) => void;
type ChangeCallback = () => void;

export default class FolderItem extends BaseItem {
  private readonly _itemGetter: ItemGetter;
  private readonly _itemAddedCallback: ItemCallback;
  private readonly _itemRemovedCallback: ItemCallback;
  private dataMouseEnter: () => void;
  
  public childItems: BaseItem[];
  public data!: FolderItemData;

  constructor(config: FolderItemConfig, changeCallback: ChangeCallback) {
    const { name, itemGetter, itemAddedCallback, itemRemovedCallback, ...restConfig } = config;
    
    super(name, changeCallback);
    
    this._itemGetter = itemGetter;
    this._itemAddedCallback = itemAddedCallback;
    this._itemRemovedCallback = itemRemovedCallback;
    this.childItems = [];

    Object.assign(this.data, {
      label: '',
      labelIcon: '',
      icon: '',
      iconhover: '',
      lineType: '',
      hover: undefined,
      catagory: '',
      tooltip: '',
      isPressed: false,
      firstTooltip: '',
      styleName: '',
      checkStatus: 'all' as const,
      onchange: () => {}
    });

    this.setData(restConfig);
    
    this.dataMouseEnter = this.data?.onMouseEnter ?? (() => {});
    this.data.onMouseEnter = this.onMouseEnter.bind(this);
  }

  get type(): ItemType {
    return ItemType.folder;
  }

  get hasBadgeDot(): boolean {
    if (this.data.badge) {
      return false;
    }
    
    if (this.data.hasBadgeDot) {
      return true;
    }
    
    return this.childItems.some(item => {
      const badge = item.data.badge;
      return (badge?.showDotOnParents) || (item.data.hasBadgeDot || false);
    });
  }

  get hasWarning(): boolean {
    return !!this.data.hasWarning || this.childItems.some(item => item.data.hasWarning || false);
  }

  get hasChildPressed(): boolean {
    return this.childItems.some(item => item.isPressed());
  }

  public click(): void {
    if (!this.isEnabled()) {
      return;
    }

    if (this.data.lock) {
      this.data.lock.lock(this);
    }

    if (this.data.onclick) {
      this.data.onclick();
    }

    super.click();
  }

  public onMouseEnter(): void {
    if (this.data.firstTooltip) {
      this.setData({ firstTooltip: '' });
    }

    if (this.data.defaultHoverFirstChild && this.childItems?.[0]) {
      this.childItems[0].setData({ hover: true });
    }

    if (this.parent?.data.defaultHoverFirstChild) {
      const siblings = this.parent.childItems;
      for (let i = 0; i < siblings.length; i++) {
        siblings[i].setData({ hover: siblings[i].name === this.name });
      }
    }

    this.dataMouseEnter();
  }

  public setChecked(): void {
    if (!this.data.isGroup) {
      return;
    }

    const visibleChildren = this.childItems.filter(item => item.data.visible);
    const checkedChildren = this.childItems.filter(item => item.data.isChecked && item.data.visible);

    if (checkedChildren.length === visibleChildren.length) {
      this.setData({ checkStatus: 'all' });
    } else if (checkedChildren.length === 0) {
      this.setData({ checkStatus: 'none' });
    } else {
      this.setData({ checkStatus: 'half-checked' });
    }
  }

  public expand(): void {
    this.setData({ hover: true });
  }

  public collapse(): void {
    this.setData({ hover: false });
  }

  public setPressed(pressed: boolean): void {
    this.setData({ isPressed: pressed });
  }

  public setShowDynamicTooltip(tooltip: string): void {
    this.setData({ dynamicTooltip: tooltip });
  }

  public getChild(name: string): BaseItem | undefined {
    return this.childItems.find(item => item.name === name);
  }

  public getAllChildren(): BaseItem[] {
    return this.childItems;
  }

  private _cancelRadioStatus(groupId?: string): void {
    if (!groupId) {
      return;
    }

    this.childItems.forEach(item => {
      if (item.type === ItemType.radio) {
        if (item.data.groupId !== groupId) {
          return;
        }
        if (item.data.isChecked) {
          item.data.isChecked = false;
        }
      }
    });
  }

  public add(config: ItemConfig): BaseItem | undefined {
    if (!config) {
      return undefined;
    }

    const items = this.childItems;

    if (config.type === ItemType.radio) {
      (config as any).cancelRadioStatus = this._cancelRadioStatus.bind(this);
    }

    let insertIndex = -1;

    if (config.order !== undefined) {
      insertIndex = items.findIndex(item => item.data.order! > config.order!);
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

  public insertBefore(targetName: string, config: ItemConfig): BaseItem | undefined {
    return this._insert(targetName, config, true);
  }

  public insertAfter(targetName: string, config: ItemConfig): BaseItem | undefined {
    return this._insert(targetName, config, false);
  }

  public remove(name: string): void {
    const items = this.childItems;
    const index = items.findIndex(item => item.name === name);

    if (index !== -1) {
      const [removedItem] = items.splice(index, 1);
      removedItem.parent = undefined;
      this._changeCallback();
      this._itemRemovedCallback(removedItem, this);
    }
  }

  private _insert(targetName: string, config: ItemConfig, before: boolean): BaseItem | undefined {
    const index = this.childItems.findIndex(item => item.name === targetName);

    if (index === -1) {
      return this.add(config);
    }

    const targetItem = this.childItems[index];
    const newConfig = { ...config, order: targetItem.data.order };
    const insertIndex = before ? index : index + 1;

    return this._doInsert(insertIndex, newConfig);
  }

  private _doInsert(index: number, config: ItemConfig): BaseItem | undefined {
    const { submenu, ...itemConfig } = config;
    const item = this._createItem(itemConfig);

    if (!item) {
      return undefined;
    }

    this.childItems.splice(index, 0, item);
    item.parent = this;
    this._changeCallback();
    this._itemAddedCallback(item, this);

    if (item.type === ItemType.folder && submenu) {
      submenu.forEach(subConfig => (item as FolderItem).add(subConfig));
    }

    return item;
  }

  private _createItem(config: ItemConfig): BaseItem | undefined {
    const { toolbar, path, ...restConfig } = config;

    if (toolbar && path) {
      const item = this._itemGetter(path, toolbar);
      if (!item) {
        return undefined;
      }
      return this._createItemProxy(restConfig, item);
    }

    let ItemClass: typeof BaseItem;

    switch (restConfig.type) {
      case ItemType.folder:
        return new FolderItem({
          ...restConfig,
          name: restConfig.name,
          itemGetter: this._itemGetter,
          itemAddedCallback: this._itemAddedCallback,
          itemRemovedCallback: this._itemRemovedCallback
        }, this._changeCallback);

      case ItemType.image:
        ItemClass = ImageItem;
        break;

      case ItemType.checkbox:
        ItemClass = CheckboxItem;
        break;

      case ItemType.radio:
        ItemClass = RadioItem;
        break;

      case ItemType.divider:
        ItemClass = DividerItem;
        break;

      case ItemType.button:
      default:
        ItemClass = ButtonItem;
        break;
    }

    return new ItemClass(restConfig, this._changeCallback);
  }

  private _createItemProxy(config: ItemConfig, sourceItem: BaseItem): ProxyItem {
    return new ProxyItem(
      config,
      sourceItem,
      new FolderItem({
        name: '',
        itemGetter: this._itemGetter,
        itemAddedCallback: this._itemAddedCallback,
        itemRemovedCallback: this._itemRemovedCallback
      }, this._changeCallback),
      this._changeCallback
    );
  }
}