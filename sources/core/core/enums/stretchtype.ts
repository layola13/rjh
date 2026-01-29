export enum StretchType {
  fix = "fix",
  expand = "expand"
}

Object.freeze(StretchType);

export interface LayoutDumpData {
  Class: string;
  stretch: StretchType;
  [key: string]: unknown;
}

export interface LayoutLoadContext {
  [key: string]: unknown;
}

export abstract class LayoutItem {
  private static constructorByClass: Map<string, new (...args: any[]) => LayoutItem> = new Map();
  
  protected _stretch: StretchType = StretchType.fix;

  constructor(stretchType?: StretchType) {
    if (stretchType) {
      this._stretch = stretchType;
    }
  }

  get stretchType(): StretchType {
    return this._stretch;
  }

  abstract getClassName(): string;
  abstract getGeometry(): unknown[];
  abstract clone(): LayoutItem;

  copyFrom(other: LayoutItem): void {
    this._stretch = other._stretch;
  }

  dump(context: LayoutLoadContext = {}): LayoutDumpData {
    return {
      Class: this.getClassName(),
      stretch: this._stretch
    };
  }

  load(data: LayoutDumpData, context: LayoutLoadContext = {}): void {
    this._stretch = data.stretch;
  }

  dumpDataToJSON(): void {
    console.error("use dump instead!");
  }

  loadDataFromJSON(): void {
    console.error("use load instead!");
  }

  static registerClass(className: string, constructor: new (...args: any[]) => LayoutItem): void {
    LayoutItem.constructorByClass.set(className, constructor);
  }

  static buildFromJSON(data: LayoutDumpData, context: LayoutLoadContext = {}): LayoutItem | undefined {
    const constructor = LayoutItem.constructorByClass.get(data.Class);
    if (!constructor) {
      console.assert(false, `unknown ${data.Class}`);
      return undefined;
    }
    const instance = new constructor();
    instance.load(data, context);
    return instance;
  }

  static buildItemFromJSON(): void {
    console.error("use buildFromJSON instead!");
  }
}

export const LayoutModelClassName = {
  RegionLayoutItem: "regionLayoutItem",
  VerticalLayout: "verticalLayout"
} as const;

interface Region {
  id: string;
  geomPolygons: unknown[];
  fitToLayout(geometry: unknown[]): void;
}

interface Entity {
  loadFromDumpById(id: string, context: LayoutLoadContext): Region | null;
}

declare const Entity: Entity;

interface RegionLayoutItemDumpData extends LayoutDumpData {
  region: string;
}

export class RegionLayoutItem extends LayoutItem {
  private _region: Region;

  constructor(region: Region, stretchType?: StretchType) {
    super(stretchType);
    this._region = region;
  }

  get region(): Region {
    return this._region;
  }

  getClassName(): string {
    return LayoutModelClassName.RegionLayoutItem;
  }

  getGeometry(): unknown[] {
    return this._region.geomPolygons;
  }

  onParentGeomChanged(geometry: unknown[]): void {
    this._region.fitToLayout(geometry);
  }

  clone(): RegionLayoutItem {
    const cloned = new RegionLayoutItem(this._region);
    cloned.copyFrom(this);
    return cloned;
  }

  copyFrom(other: LayoutItem): void {
    super.copyFrom(other);
    if (other instanceof RegionLayoutItem) {
      this._region = other._region;
    }
  }

  dump(context: LayoutLoadContext = {}): RegionLayoutItemDumpData {
    const data = super.dump(context) as RegionLayoutItemDumpData;
    data.region = this._region.id;
    return data;
  }

  load(data: RegionLayoutItemDumpData, context: LayoutLoadContext = {}): void {
    super.load(data, context);
    const region = Entity.loadFromDumpById(data.region, context);
    if (!region) {
      console.error(`RegionLayoutItem: failed to load region ${data.region}.`);
      return;
    }
    this._region = region;
  }
}

LayoutItem.registerClass(LayoutModelClassName.RegionLayoutItem, RegionLayoutItem);

interface LayoutDumpDataExtended extends LayoutDumpData {
  items: LayoutDumpData[];
}

type TraverseCallback = (item: LayoutItem) => boolean | void;

declare global {
  interface Array<T> {
    xPushCollection(items: T[]): void;
    xRemove(item: T): void;
  }
}

export class Layout extends LayoutItem {
  protected _items: LayoutItem[] = [];

  constructor() {
    super();
  }

  copyFrom(other: LayoutItem): void {
    super.copyFrom(other);
    if (other instanceof Layout) {
      this._items = other._items.map(item => item.clone());
    }
  }

  traverse(callback: TraverseCallback, thisArg?: unknown): boolean {
    if (!callback) {
      return false;
    }

    if (callback.call(thisArg, this) === false) {
      return false;
    }

    for (let i = 0; i < this.getItemCount(); i++) {
      const item = this.itemAt(i);
      if (!item) continue;

      if (callback.call(thisArg, item) === false) {
        return false;
      }

      if (item instanceof Layout && item.traverse(callback, thisArg) === false) {
        return false;
      }
    }

    return true;
  }

  getGeometry(): unknown[] {
    const geometry: unknown[] = [];
    for (const item of this._items) {
      geometry.xPushCollection(item.getGeometry());
    }
    return geometry;
  }

  getAllRegions(): Region[] {
    const regions: Region[] = [];
    this.traverse((item: LayoutItem) => {
      if (item instanceof RegionLayoutItem) {
        regions.push(item.region);
      }
    });
    return regions;
  }

  getItemCount(): number {
    return this._items.length;
  }

  itemAt(index: number): LayoutItem | null {
    if (index < 0 || index >= this._items.length) {
      return null;
    }
    return this._items[index];
  }

  insertRegion(region: Region, index: number, stretchType?: StretchType): void {
    const item = new RegionLayoutItem(region, stretchType);
    this.insertLayoutItem(item, index);
  }

  removeRegion(region: Region): boolean {
    const item = this.getRegionItem(region);
    if (item) {
      this.removeLayoutItem(item);
      return true;
    }

    let removed = false;
    const childLayouts = this.getChildLayouts();
    for (const layout of childLayouts) {
      if (layout.removeRegion(region)) {
        removed = true;
      }
    }
    return removed;
  }

  insertLayoutItem(item: LayoutItem, index: number): void {
    this._items.splice(index, 0, item);
  }

  removeLayoutItem(item: LayoutItem): void {
    this._items.xRemove(item);
  }

  getItemIndex(item: LayoutItem): number {
    return this._items.indexOf(item);
  }

  getRegionItem(region: Region): RegionLayoutItem | null {
    for (const item of this._items) {
      if (item instanceof RegionLayoutItem && item.region === region) {
        return item;
      }
    }
    return null;
  }

  getChildLayouts(): Layout[] {
    return this._items.filter((item): item is Layout => item instanceof Layout);
  }

  dump(context: LayoutLoadContext = {}): LayoutDumpDataExtended {
    const data = super.dump(context) as LayoutDumpDataExtended;
    data.items = [];
    for (const item of this._items) {
      const itemData = item.dump(context);
      data.items.push(itemData);
    }
    return data;
  }

  load(data: LayoutDumpDataExtended, context: LayoutLoadContext = {}): void {
    super.load(data, context);
    const items: LayoutItem[] = [];
    for (const itemData of data.items) {
      const item = LayoutItem.buildFromJSON(itemData, context);
      if (item) {
        items.push(item);
      }
    }
    this._items = items;
  }

  getClassName(): string {
    return "";
  }

  clone(): Layout {
    const cloned = new Layout();
    cloned.copyFrom(this);
    return cloned;
  }
}

interface LayoutIODumpResult {
  version: number;
  data: LayoutDumpData;
}

export class Layout_IO {
  static dumpToJSON(layout: LayoutItem, context?: LayoutLoadContext): LayoutIODumpResult {
    return {
      version: 0.1,
      data: layout.dump(context)
    };
  }

  static loadFromJSON(json: LayoutIODumpResult, context?: LayoutLoadContext): LayoutItem | undefined {
    const { data } = json;
    return LayoutItem.buildFromJSON(data, context);
  }
}