import { CreatePropertyBarNode, IsPropertyBarType } from './property-bar-utils';

interface PropertyBarNodeConfig {
  id: string;
  label: string;
  disabled?: boolean;
  order: number;
  className?: string;
  disableShow?: boolean;
  items?: PropertyBarNodeConfig[];
}

interface PropertyBarItem {
  id: string;
  order: number;
  type?: string;
  isPropertyBarLevelNode?: boolean;
  items?: PropertyBarItem[];
  insert?: (item: PropertyBarItem | PropertyBarItem[], targetId?: string) => void;
  getItemById?: (id: string) => PropertyBarItem | undefined;
}

export default class PropertyBarLevelNode {
  items: PropertyBarItem[] = [];
  disable: boolean = false;
  type?: string = undefined;
  order?: number = undefined;
  className?: string = undefined;
  isPropertyBarLevelNode: boolean = true;
  disableShow: boolean = true;
  private _label: string = "";
  private _id: string = "";

  constructor(config: PropertyBarNodeConfig) {
    this.id = config.id;
    this.label = config.label;
    this.disabled = config.disabled;
    this.order = config.order;
    this.className = config.className;
    this.disableShow = config.disableShow;
    this.items = this.createItems(config.items);
  }

  get label(): string {
    return this._label;
  }

  set label(value: string) {
    if (value) {
      this._label = value;
    }
  }

  get id(): string {
    return this._id;
  }

  set id(value: string) {
    if (value) {
      this._id = value;
    }
  }

  get disabled(): boolean | undefined {
    return this.disable;
  }

  set disabled(value: boolean | undefined) {
    if (value !== undefined) {
      this.disable = value;
    }
  }

  /**
   * Creates property bar items from configuration array
   */
  createItems(itemConfigs?: PropertyBarNodeConfig[]): PropertyBarItem[] {
    const items: PropertyBarItem[] = [];
    
    if (!itemConfigs || !Array.isArray(itemConfigs)) {
      return items;
    }

    itemConfigs.sort((a, b) => a.order - b.order);
    
    itemConfigs.forEach(config => {
      const node = CreatePropertyBarNode(config);
      if (node) {
        items.push(node);
      }
    });

    return items;
  }

  /**
   * Inserts item(s) into the property bar tree
   */
  insert(item: PropertyBarItem | PropertyBarItem[], targetId?: string): void {
    if (!item) return;

    if (Array.isArray(item)) {
      item.forEach(singleItem => {
        this.insert(singleItem, targetId);
      });
      return;
    }

    if (targetId && this.id !== targetId) {
      const targetItem = this.getItemById(targetId);
      if (targetItem?.isPropertyBarLevelNode && targetItem.insert) {
        targetItem.insert(item);
      }
      return;
    }

    for (const existingItem of this.items) {
      if (existingItem.id === item.id) {
        this.combine(existingItem, item);
        return;
      }
    }

    let itemToInsert: PropertyBarItem = item;
    if (item.type && IsPropertyBarType(item.type)) {
      itemToInsert = CreatePropertyBarNode(item);
    }

    this.items.push(itemToInsert);
    this.items.sort((a, b) => a.order - b.order);
  }

  /**
   * Retrieves an item by its ID from the tree
   */
  getItemById(id: string): PropertyBarItem | undefined {
    if (this.id === id) {
      return this;
    }

    for (const item of this.items) {
      if (item.isPropertyBarLevelNode && item.getItemById) {
        const foundItem = item.getItemById(id);
        if (foundItem?.id === id) {
          return foundItem;
        }
      } else if (item.id === id) {
        return item;
      }
    }

    return undefined;
  }

  /**
   * Combines/merges two items with the same ID
   */
  combine(target: PropertyBarItem, source: PropertyBarItem): void {
    if (!target || !source || target.id !== source.id) {
      return;
    }

    const sourceItems = source.items || [];
    delete source.items;
    Object.assign(target, source);

    sourceItems.forEach(sourceItem => {
      if (!target.items) return;

      for (const targetItem of target.items) {
        if (targetItem.id === sourceItem.id) {
          this.combine(targetItem, sourceItem);
          return;
        }
      }

      if (target.insert) {
        target.insert(sourceItem);
      }
    });
  }
}