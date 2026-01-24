/**
 * Layout system for managing region stretching and hierarchical layouts
 * @module StretchType
 */

/**
 * Defines how a layout item stretches within its parent container
 */
export enum StretchType {
  /** Fixed size, does not expand */
  fix = "fix",
  /** Expands to fill available space */
  expand = "expand"
}

/**
 * Class names used for serialization/deserialization of layout models
 */
export const LayoutModelClassName: {
  readonly RegionLayoutItem: "regionLayoutItem";
  readonly VerticalLayout: "verticalLayout";
};

/**
 * Options for dumping layout data to JSON
 */
export interface DumpOptions {
  [key: string]: unknown;
}

/**
 * Options for loading layout data from JSON
 */
export interface LoadOptions {
  [key: string]: unknown;
}

/**
 * Serialized representation of a layout item
 */
export interface LayoutItemJSON {
  /** Class name for type identification */
  Class: string;
  /** Stretch behavior */
  stretch: StretchType;
  [key: string]: unknown;
}

/**
 * Serialized representation of a region layout item
 */
export interface RegionLayoutItemJSON extends LayoutItemJSON {
  /** Region entity ID */
  region: string;
}

/**
 * Serialized representation of a layout container
 */
export interface LayoutJSON extends LayoutItemJSON {
  /** Child layout items */
  items: LayoutItemJSON[];
}

/**
 * Top-level serialization wrapper
 */
export interface LayoutDataJSON {
  /** Serialization format version */
  version: number;
  /** Root layout data */
  data: LayoutItemJSON;
}

/**
 * Geometry polygon representation
 */
export interface GeomPolygon {
  [key: string]: unknown;
}

/**
 * Region entity interface
 */
export interface Region {
  /** Unique identifier */
  readonly id: string;
  /** Geometry polygons defining the region */
  readonly geomPolygons: GeomPolygon[];
  /** Adjust region to fit parent layout geometry */
  fitToLayout(parentGeometry: GeomPolygon[]): void;
}

/**
 * Constructor type for layout items
 */
export type LayoutItemConstructor = new (...args: any[]) => LayoutItem;

/**
 * Callback function for traversing layout hierarchy
 * @returns false to stop traversal, true to continue
 */
export type TraverseCallback = (item: LayoutItem) => boolean | void;

/**
 * Base class for all layout items
 * Provides serialization, cloning, and stretch behavior
 */
export declare abstract class LayoutItem {
  private _stretch: StretchType;
  private static constructorByClass: Map<string, LayoutItemConstructor>;

  /**
   * Creates a layout item with optional stretch type
   * @param stretchType - How the item stretches (defaults to fix)
   */
  constructor(stretchType?: StretchType);

  /**
   * Gets the current stretch behavior
   */
  get stretchType(): StretchType;

  /**
   * Returns the class name for serialization
   */
  abstract getClassName(): string;

  /**
   * Gets the geometry polygons for this layout item
   */
  abstract getGeometry(): GeomPolygon[];

  /**
   * Called when parent geometry changes, allows item to adjust
   * @param parentGeometry - The new parent geometry
   */
  abstract onParentGeomChanged(parentGeometry: GeomPolygon[]): void;

  /**
   * Creates a deep copy of this layout item
   */
  abstract clone(): LayoutItem;

  /**
   * Copies properties from another layout item
   * @param source - Item to copy from
   */
  copyFrom(source: LayoutItem): void;

  /**
   * Serializes the layout item to JSON
   * @param options - Dump options
   * @returns JSON representation
   */
  dump(options?: DumpOptions): LayoutItemJSON;

  /**
   * Deserializes the layout item from JSON
   * @param json - JSON data
   * @param options - Load options
   */
  load(json: LayoutItemJSON, options?: LoadOptions): void;

  /**
   * @deprecated Use dump() instead
   */
  dumpDataToJSON(): void;

  /**
   * @deprecated Use load() instead
   */
  loadDataFromJSON(): void;

  /**
   * Registers a layout item class for deserialization
   * @param className - Class identifier
   * @param constructor - Constructor function
   */
  static registerClass(className: string, constructor: LayoutItemConstructor): void;

  /**
   * Builds a layout item from JSON data
   * @param json - Serialized layout item
   * @param options - Load options
   * @returns Constructed layout item or undefined if class unknown
   */
  static buildFromJSON(json: LayoutItemJSON, options?: LoadOptions): LayoutItem | undefined;

  /**
   * @deprecated Use buildFromJSON() instead
   */
  static buildItemFromJSON(): void;
}

/**
 * Layout item that wraps a region entity
 * Manages geometry and layout fitting for a single region
 */
export declare class RegionLayoutItem extends LayoutItem {
  private _region: Region;

  /**
   * Creates a region layout item
   * @param region - The region entity to wrap
   * @param stretchType - Stretch behavior (defaults to fix)
   */
  constructor(region: Region, stretchType?: StretchType);

  /**
   * Gets the wrapped region
   */
  get region(): Region;

  getClassName(): string;
  getGeometry(): GeomPolygon[];
  onParentGeomChanged(parentGeometry: GeomPolygon[]): void;
  clone(): RegionLayoutItem;
  copyFrom(source: LayoutItem): void;
  dump(options?: DumpOptions): RegionLayoutItemJSON;
  load(json: RegionLayoutItemJSON, options?: LoadOptions): void;
}

/**
 * Container layout item that can hold child layout items
 * Supports hierarchical layouts with traversal and region management
 */
export declare class Layout extends LayoutItem {
  private _items: LayoutItem[];

  constructor();

  copyFrom(source: LayoutItem): void;

  /**
   * Traverses the layout hierarchy depth-first
   * @param callback - Function called for each item
   * @param thisArg - Value to use as 'this' when executing callback
   * @returns false if traversal was stopped, true if completed
   */
  traverse(callback: TraverseCallback, thisArg?: unknown): boolean;

  getGeometry(): GeomPolygon[];

  /**
   * Collects all regions in this layout and its children
   * @returns Array of all regions
   */
  getAllRegions(): Region[];

  /**
   * Gets the number of direct child items
   */
  getItemCount(): number;

  /**
   * Gets the child item at the specified index
   * @param index - Zero-based index
   * @returns Layout item or null if index out of bounds
   */
  itemAt(index: number): LayoutItem | null;

  /**
   * Inserts a region as a new layout item
   * @param region - Region to insert
   * @param index - Position to insert at
   * @param stretchType - Stretch behavior for the region item
   */
  insertRegion(region: Region, index: number, stretchType?: StretchType): void;

  /**
   * Removes a region from this layout or any child layouts
   * @param region - Region to remove
   * @returns true if region was found and removed
   */
  removeRegion(region: Region): boolean;

  /**
   * Inserts a layout item at the specified position
   * @param item - Item to insert
   * @param index - Position to insert at
   */
  insertLayoutItem(item: LayoutItem, index: number): void;

  /**
   * Removes a layout item from this container
   * @param item - Item to remove
   */
  removeLayoutItem(item: LayoutItem): void;

  /**
   * Gets the index of a layout item
   * @param item - Item to find
   * @returns Index or -1 if not found
   */
  getItemIndex(item: LayoutItem): number;

  /**
   * Finds the layout item wrapping a specific region
   * @param region - Region to search for
   * @returns RegionLayoutItem or null if not found
   */
  getRegionItem(region: Region): RegionLayoutItem | null;

  /**
   * Gets all direct child layouts (excludes region items)
   * @returns Array of child layouts
   */
  getChildLayouts(): Layout[];

  dump(options?: DumpOptions): LayoutJSON;
  load(json: LayoutJSON, options?: LoadOptions): void;
}

/**
 * Utility class for serializing and deserializing layout hierarchies
 */
export declare class Layout_IO {
  /**
   * Serializes a layout to JSON with version information
   * @param layout - Layout to serialize
   * @param options - Dump options
   * @returns Versioned JSON representation
   */
  static dumpToJSON(layout: Layout, options?: DumpOptions): LayoutDataJSON;

  /**
   * Deserializes a layout from JSON
   * @param json - Serialized layout data
   * @param options - Load options
   * @returns Reconstructed layout or undefined if failed
   */
  static loadFromJSON(json: LayoutDataJSON, options?: LoadOptions): LayoutItem | undefined;
}