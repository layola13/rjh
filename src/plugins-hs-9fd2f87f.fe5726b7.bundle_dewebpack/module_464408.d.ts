/**
 * Wardrobe accessory placement module
 * Handles automatic placement of accessories (clothes rails, drawers, shelves, etc.) into wardrobe cabinets
 */

/**
 * Region type constants for wardrobe interior zones
 */
export enum RegionType {
  /** Standard middle region */
  NORMAL = "normal",
  /** Open shelf region without doors */
  OPEN = "open",
  /** Lower region near floor */
  LOW = "low",
  /** Upper region near ceiling */
  HIGH = "high",
  /** Region containing pants drawer */
  PANTSDRAWER = "pantsdrawer",
  /** Region containing clothes hanging rail */
  CLOTHESRAIL = "clothesrail"
}

/**
 * Represents a spatial region within a wardrobe cabinet
 */
export interface WardrobeRegion {
  /** Left boundary in local coordinates */
  left: number;
  /** Right boundary in local coordinates */
  right: number;
  /** Top boundary in local coordinates */
  top: number;
  /** Bottom boundary in local coordinates */
  bottom: number;
  /** Front boundary (depth) */
  front: number;
  /** Back boundary (depth) */
  back: number;
  /** Vertical position */
  z: number;
  /** Width of the region */
  width: number;
  /** Depth of the region */
  depth: number;
  /** Height of the region */
  height: number;
  /** Type classification of this region */
  regionType?: RegionType;
  /** Associated clothes rail if present */
  clothesRail?: HSCore.Model.PContent | HSCore.Model.PAssembly;
  /** Associated pants drawer if present */
  pantsDrawer?: HSCore.Model.PContent;
}

/**
 * Configuration for accessory types that can be placed in wardrobes
 */
export interface AccessoryCategory {
  /** Display label for the category */
  label: string;
  /** Product tag for catalog lookup */
  tag?: string;
  /** Whether multiple items of this type can be placed in same region */
  allowMutiple: boolean;
  /** Array of product seek IDs */
  items: string[];
  /** Fallback product IDs when tag lookup fails */
  defaultItems: string[];
  /** Metadata for placed accessories */
  metas?: unknown[];
  /** Queue for cycling through seek IDs */
  seekIdsQueue?: SeekIdQueue;
  /** Shared queue reference for dependent categories */
  seekIdsCycleQueue?: SeekIdQueue;
}

/**
 * Configuration mapping for all wardrobe types and their accessory categories
 */
export interface WardrobeAccessoryConfig {
  wardrobes: AccessoryCategory[];
}

/**
 * Circular queue for managing accessory product IDs
 * Ensures random distribution without immediate repetition
 */
declare class SeekIdQueue {
  private _internalArray: string[];
  private _currentIndex: number;
  readonly length: number;

  /**
   * @param seekIds - Array of product seek IDs to cycle through
   */
  constructor(seekIds: string[]);

  /**
   * Get next seek ID from the queue (cycles back to start when exhausted)
   * @returns Next seek ID in the shuffled sequence
   */
  dequeue(): string;
}

/**
 * Place accessories into wardrobe cabinets in the current room
 * 
 * @param room - Target room to process, or undefined for entire floorplan
 * @param shouldClearExisting - Whether to remove existing accessories before placement (default: true)
 * @param useDefaultItems - Whether to use default item lists instead of tag-based lookup (default: true)
 * 
 * @example
 *