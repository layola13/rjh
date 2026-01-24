/**
 * Room layout sorting module
 * Provides specialized sorters for different room types (living/dining rooms, bathrooms, bedrooms)
 */

/**
 * Room layout data structure containing spatial and matching information
 */
interface RoomLayout {
  /** JSON string representation of the room layout */
  layout_json_string?: string;
  
  /** Number of matched furniture/fixture groups */
  matched_group_count: number;
  
  /** Distance metric between furniture groups */
  group_distance: number;
  
  /** Distance metric for the main furniture group */
  main_group_distance: number;
  
  /** Distance metric for floor elements */
  floor_distance: number;
  
  /** Distance metric for door placements */
  doors_distance: number;
  
  /** Distance metric for window placements */
  windows_distance: number;
  
  /** Similarity score for rounded opening hosts (0-1) */
  rounded_opening_host_similarity: number;
  
  /** Glazed facade index from room info centroid */
  roomInfoCentroid: {
    glazed_facade_index: number;
  };
  
  /** Target glazed facade index */
  glazed_facade_index: number;
  
  /** Target reduction step value */
  targetReduceStep: number;
  
  /** Current reduction step value */
  reduce_step: number;
  
  /** Number of matched doors */
  matched_doors_count: number;
  
  /** Computed sorting score (added by sorter) */
  score?: number;
}

/**
 * Configuration for a scoring step in the sorting algorithm
 * @template T - The type of items being sorted
 */
interface ScoreStep<T> {
  /** Function to extract the value to score from an item */
  getter: (item: T) => number;
  
  /** Whether higher values are better (true) or lower values are better (false) */
  higherTheBetter: boolean;
  
  /** Weight of this scoring step (typically 0.0 - 1.0) */
  weight: number;
}

/**
 * Configuration for an ordering step in the sorting algorithm
 * @template T - The type of items being sorted
 */
interface OrderByStep<T> {
  /** Function to extract the comparison value from an item */
  getter: (item: T) => number;
  
  /** Whether to sort with highest values first (true) or lowest first (false) */
  highestFirst: boolean;
}

/**
 * Generic sorter class that implements a multi-stage scoring and sorting algorithm
 * @template T - The type of items being sorted
 */
declare class RoomLayoutSorter<T extends RoomLayout> {
  /** Steps for calculating weighted scores */
  private scoreSteps: ScoreStep<T>[];
  
  /** Steps for final ordering by specific criteria */
  private orderBySteps: OrderByStep<T>[];
  
  /** Optional filter function to exclude items */
  private filterFn?: (item: T) => boolean;
  
  /** Optional initialization function to transform items before sorting */
  private initializeFn?: (item: T) => T & { score: number };

  constructor();

  /**
   * Add a filter to exclude items from sorting
   * @param filterFn - Function that returns true for items to include
   * @returns This sorter instance for method chaining
   */
  addFilter(filterFn: (item: T) => boolean): this;

  /**
   * Add an initializer to transform items before sorting
   * @param initializeFn - Function to initialize/transform each item
   * @returns This sorter instance for method chaining
   */
  addInitializer(initializeFn: (item: T) => T & { score: number }): this;

  /**
   * Add a scoring step to the algorithm
   * Items are ranked by each score step and assigned weighted scores
   * @param step - Score step configuration
   * @returns This sorter instance for method chaining
   */
  addScoreStep(step: ScoreStep<T>): this;

  /**
   * Add an ordering criterion for final sort
   * @param step - Order by step configuration
   * @returns This sorter instance for method chaining
   */
  addOrderBy(step: OrderByStep<T>): this;

  /**
   * Execute the sorting algorithm on the provided items
   * @param items - Array of items to sort
   * @returns Sorted array with computed scores
   */
  sort(items: T[]): Array<T & { score: number }>;
}

/**
 * Pre-configured sorter for living and dining room layouts
 * Prioritizes: matched groups, spatial distances, facade alignment, and opening similarity
 */
export declare const livingDiningRoomSorter: RoomLayoutSorter<RoomLayout>;

/**
 * Pre-configured sorter for bathroom layouts
 * Prioritizes: matched groups, door placement, spatial distances, and reduction steps
 */
export declare const bathroomSorter: RoomLayoutSorter<RoomLayout>;

/**
 * Pre-configured sorter for bedroom layouts
 * Prioritizes: matched groups, door/window distances, floor distance, and opening similarity
 */
export declare const bedroomSorter: RoomLayoutSorter<RoomLayout>;