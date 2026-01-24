/**
 * RBush - A high-performance JavaScript library for 2D spatial indexing of points and rectangles.
 * Based on R-tree data structure with bulk insertion support.
 */

/**
 * Bounding box interface representing a rectangular area in 2D space
 */
interface BBox {
  /** Minimum X coordinate */
  minX: number;
  /** Minimum Y coordinate */
  minY: number;
  /** Maximum X coordinate */
  maxX: number;
  /** Maximum Y coordinate */
  maxY: number;
}

/**
 * Tree node interface representing either a leaf or internal node
 */
interface RBushNode<T = any> extends BBox {
  /** Child nodes or data items */
  children: T[];
  /** Height of the node in the tree */
  height: number;
  /** Whether this is a leaf node */
  leaf: boolean;
}

/**
 * Comparison function type for custom equality checks
 */
type CompareFunction<T> = (a: T, b: T) => boolean;

/**
 * Format configuration for custom coordinate accessors
 * [minX accessor, minY accessor, maxX accessor, maxY accessor]
 */
type FormatConfig = [string, string, string, string];

/**
 * RBush - High-performance 2D spatial index based on an optimized R-tree
 * @template T - Type of items stored in the tree
 */
declare class RBush<T = any> {
  /**
   * Creates a new RBush instance
   * @param maxEntries - Maximum number of entries in a node (default: 9)
   * @param format - Custom format for accessing coordinates from items
   */
  constructor(maxEntries?: number, format?: FormatConfig);

  /** Root node of the R-tree */
  data: RBushNode<T>;

  /** Maximum entries per node (minimum 4) */
  private _maxEntries: number;

  /** Minimum entries per node (40% of maxEntries, minimum 2) */
  private _minEntries: number;

  /**
   * Returns all items in the tree
   * @returns Array of all items
   */
  all(): T[];

  /**
   * Searches for items intersecting the given bounding box
   * @param bbox - Bounding box to search within
   * @returns Array of items that intersect the bbox
   */
  search(bbox: BBox): T[];

  /**
   * Checks if any items collide with the given bounding box
   * @param bbox - Bounding box to check collision against
   * @returns True if collision exists, false otherwise
   */
  collides(bbox: BBox): boolean;

  /**
   * Bulk-loads items into the tree (faster than inserting one by one)
   * @param items - Array of items to load
   * @returns This RBush instance for chaining
   */
  load(items: T[]): this;

  /**
   * Inserts a single item into the tree
   * @param item - Item to insert
   * @returns This RBush instance for chaining
   */
  insert(item: T): this;

  /**
   * Removes all items from the tree
   * @returns This RBush instance for chaining
   */
  clear(): this;

  /**
   * Removes a specific item from the tree
   * @param item - Item to remove
   * @param compareFunc - Optional custom equality comparison function
   * @returns This RBush instance for chaining
   */
  remove(item: T, compareFunc?: CompareFunction<T>): this;

  /**
   * Converts an item to its bounding box representation
   * @param item - Item to convert
   * @returns Bounding box of the item
   */
  toBBox(item: T): BBox;

  /**
   * Compares two bounding boxes by minimum X coordinate
   * @param a - First bounding box
   * @param b - Second bounding box
   * @returns Difference in minX values
   */
  compareMinX(a: BBox, b: BBox): number;

  /**
   * Compares two bounding boxes by minimum Y coordinate
   * @param a - First bounding box
   * @param b - Second bounding box
   * @returns Difference in minY values
   */
  compareMinY(a: BBox, b: BBox): number;

  /**
   * Exports the tree to JSON format
   * @returns Root node as JSON-serializable object
   */
  toJSON(): RBushNode<T>;

  /**
   * Imports tree data from JSON
   * @param data - Previously exported tree data
   * @returns This RBush instance for chaining
   */
  fromJSON(data: RBushNode<T>): this;

  /**
   * Recursively collects all items from a subtree
   * @private
   */
  private _all(node: RBushNode<T>, result: T[]): T[];

  /**
   * Builds an R-tree from sorted items using bulk-loading algorithm
   * @private
   */
  private _build(items: T[], left: number, right: number, height: number): RBushNode<T>;

  /**
   * Chooses the best subtree for insertion
   * @private
   */
  private _chooseSubtree(bbox: BBox, node: RBushNode<T>, level: number, path: RBushNode<T>[]): RBushNode<T>;

  /**
   * Inserts an item at a specific tree level
   * @private
   */
  private _insert(item: T, level: number, isNode?: boolean): void;

  /**
   * Splits an overflowing node into two nodes
   * @private
   */
  private _split(path: RBushNode<T>[], level: number): void;

  /**
   * Splits the root node when it overflows
   * @private
   */
  private _splitRoot(node1: RBushNode<T>, node2: RBushNode<T>): void;

  /**
   * Chooses the optimal split index for a node
   * @private
   */
  private _chooseSplitIndex(node: RBushNode<T>, minEntries: number, totalEntries: number): number;

  /**
   * Chooses the optimal split axis (X or Y) for a node
   * @private
   */
  private _chooseSplitAxis(node: RBushNode<T>, minEntries: number, totalEntries: number): void;

  /**
   * Calculates total margin of all possible distributions along an axis
   * @private
   */
  private _allDistMargin(node: RBushNode<T>, minEntries: number, totalEntries: number, compare: (a: any, b: any) => number): number;

  /**
   * Adjusts bounding boxes of parent nodes after modification
   * @private
   */
  private _adjustParentBBoxes(bbox: BBox, path: RBushNode<T>[], level: number): void;

  /**
   * Condenses the tree after removal by eliminating empty nodes
   * @private
   */
  private _condense(path: RBushNode<T>[]): void;

  /**
   * Initializes custom format functions for coordinate access
   * @private
   */
  private _initFormat(format: FormatConfig): void;
}

export = RBush;