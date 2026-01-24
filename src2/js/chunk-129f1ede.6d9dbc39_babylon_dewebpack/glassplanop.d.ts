/**
 * Glass plan operations and data structures module
 * Handles glass panel configurations, guard sash items, and joint calculations
 */

/**
 * Container for glass plan data
 */
export declare class GlassPlans {
  /**
   * Array of glass plan items
   */
  data: Array<GlassPlanItem>;

  constructor();
}

/**
 * Represents a single glass plan item with position and depth configurations
 */
export declare class GlassPlanItem {
  /**
   * Array of fixed position Z coordinates
   */
  fixedposzarray: number[];

  /**
   * Array of leaf position Z coordinates
   */
  leafposzarray: number[];

  /**
   * Fixed depth measurement
   */
  fixeddepthm: number;

  /**
   * Leaf depth measurement
   */
  leafdepthm: number;

  /**
   * Calculated joint Z positions for fixed elements (auto-generated)
   */
  fixedposJTZArray?: number[];

  /**
   * Calculated joint Z positions for leaf elements (auto-generated)
   */
  leafposJTZArray?: number[];

  /**
   * Calculated depth of fixed joints
   */
  fixedjtDepth?: number;

  /**
   * Calculated depth of leaf joints
   */
  leafjtDepth?: number;

  constructor();
}

/**
 * Represents a guard sash plan item
 */
export declare class GuardSashPlanItem {
  constructor();
}

/**
 * Operations for glass plan calculations
 */
export declare class GlassPlanOP {
  /**
   * Initializes joint (JT) data for a glass plan item
   * Calculates intermediate joint positions and depths based on fixed and leaf position arrays
   * 
   * @param item - The glass plan item to initialize with calculated joint data
   */
  static InitJTData(item: GlassPlanItem): void;
}