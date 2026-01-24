/**
 * Utility functions for catalog and room management
 */

/** Room attribute value definition */
interface RoomAttributeValue {
  /** Unique identifier */
  id: string | number;
  /** Display value */
  value: string;
}

/** Room attribute structure */
interface RoomAttribute {
  /** Collection of possible values */
  values: RoomAttributeValue[];
}

/** Category attribute definition */
interface CategoryAttribute {
  /** Attribute identifier */
  id: string;
  /** Attribute type identifier */
  typeId?: string;
}

/** Catalog category definition */
interface Category {
  /** Unique category identifier */
  id: string;
  /** Nested subcategories */
  categories?: Category[];
  /** Category type classifications */
  categoryTypes: string[];
  /** Associated attributes */
  attributes?: CategoryAttribute[];
}

/** Query parameters for category selection */
interface CategoryQuery {
  /** Target category identifier */
  categoryId?: string;
  /** Skip certain filters when true */
  notFilter?: boolean;
}

/** Result of category filtering operation */
interface FilterCategoriesResult {
  /** Filtered category arrays */
  categoriesResult: Category[][];
  /** Currently selected category path */
  selectedCategory: Category[];
}

/** Favorites topic creation parameters */
interface AddFavoriteTopicData {
  /** Source item identifier */
  sourceId: string;
  /** Type of favorite (4 for topics) */
  favoritesType: number;
}

/** API response structure */
interface ApiResponse<T> {
  /** Response data payload */
  data: T;
  /** Return status codes */
  ret: string[];
}

/**
 * Core utility functions for catalog operations, room management, and user interactions
 */
export declare const Utils: {
  /**
   * Set a room attribute value
   * @param key - Attribute key to set
   * @param value - Value to assign
   */
  setRoomAttribute(key: string, value: RoomAttribute): void;

  /**
   * Retrieve display name for a room attribute value
   * @param attributeKey - Key of the room attribute
   * @param valueId - ID of the value to look up
   * @returns Display value or original ID if not found
   */
  getRoomNameAttribute(attributeKey: string, valueId: string | number): string;

  /**
   * Store a public styler filter configuration
   * @param key - Filter identifier
   * @param value - Filter configuration
   */
  setPublicStylerFilter(key: string, value: unknown): void;

  /**
   * Retrieve a stored public styler filter
   * @param key - Filter identifier
   * @returns Stored filter configuration or undefined
   */
  getPublicStylerFilter(key: string): unknown;

  /**
   * Recursively search for a category by ID in category tree
   * @param categories - Array of categories to search
   * @param targetId - Category ID to find
   * @param includeAlliance - Include alliance categories when true (default: false)
   * @param includeActivity - Include activity categories when true (default: false)
   * @returns Found category or undefined
   */
  findCategoryById(
    categories: Category[],
    targetId: string,
    includeAlliance?: boolean,
    includeActivity?: boolean
  ): Category | undefined;

  /**
   * Get the selected category path (V1 algorithm)
   * @param rootCategory - Starting category
   * @returns Array representing category path from root to leaf
   */
  getSelectedCategoryV1(rootCategory?: Category[]): Category[];

  /**
   * Recursively build category path (V1 algorithm helper)
   * @param category - Current category node
   * @param path - Accumulated path array
   * @returns True if path continues deeper
   */
  getSelectedCategoryPathV1(category: Category | null | undefined, path: Category[]): boolean;

  /**
   * Filter categories based on types and context
   * @param categoryGroups - Groups of categories to filter
   * @param options - Query and filter options
   * @returns Filtered categories and selected path
   */
  filterCategories(categoryGroups: Category[][], options?: CategoryQuery): FilterCategoriesResult;

  /**
   * Filter category groups by removing invalid types
   * @param categoryGroups - Input category groups
   * @returns Filtered category groups
   */
  filterByTypes(categoryGroups: Category[][]): Category[][];

  /**
   * Filter individual category and build flattened list
   * @param category - Category to process
   */
  filterAndBuildCategories(category: Category): void;

  /**
   * Get categories related to current selection context
   * @param selectedPath - Currently selected category path
   * @param options - Query options
   * @param fallbackCategories - Categories to return if no related found
   * @returns Related categories or fallback
   */
  getRelatedCategories(
    selectedPath: Category[],
    options?: CategoryQuery,
    fallbackCategories?: Category[]
  ): Category[];

  /**
   * Compute related categories based on command context
   * @param selectedPath - Selected category path
   * @param candidates - Candidate related categories
   * @returns Filtered related categories
   */
  getRelatedCategoriesRes(selectedPath: Category[], candidates: Category[]): Category[];

  /**
   * Get the selected category path from query
   * @param rootCategory - Root category or array
   * @param options - Query containing target categoryId
   * @returns Selected category path
   */
  getSelectedCategory(rootCategory: Category | Category[], options?: CategoryQuery): Category[];

  /**
   * Build category path by searching for ID
   * @param targetId - Category ID to find
   * @param categories - Categories to search
   * @param path - Accumulated path
   * @returns True if category found
   */
  getEntryCategoryById(targetId: string, categories: Category[], path: Category[]): boolean;

  /**
   * Get current user session identifier
   * @returns Promise resolving to session ID
   */
  getUserSessionId(): Promise<string>;

  /**
   * Get bounding rectangle property from React ref
   * @param ref - React ref object
   * @param property - Property name from DOMRect
   * @returns Property value or 0 if ref invalid
   */
  getRefRect(ref: React.RefObject<HTMLElement>, property: keyof DOMRect): number;

  /**
   * Calculate height difference between two ref groups
   * @param property - DOMRect property to sum
   * @param addRefs - Refs to add
   * @param subtractRefs - Refs to subtract
   * @returns Net height calculation
   */
  calcHeight(
    property: keyof DOMRect,
    addRefs: React.RefObject<HTMLElement>[],
    subtractRefs: React.RefObject<HTMLElement>[]
  ): number;

  /**
   * Add a topic to user favorites
   * @param sourceId - Topic source identifier
   * @returns Promise resolving to API response data
   */
  addFavoriteTopic(sourceId: string): Promise<unknown>;

  /**
   * Get default favorites folder ID for topics
   * @returns Promise resolving to folder data
   */
  getFavTopicFolderId(): Promise<unknown>;

  /**
   * Check if current command is a model replacement operation
   * @returns True if replace/change model command active
   */
  isReplaceModelCmd(): boolean;

  /**
   * Check if model recovery mode should be enabled
   * @returns True if in replace mode and default environment
   */
  getModelRecovery(): boolean;

  /**
   * Check if "Make Custom" menu red dot indicator should show
   * @returns True if indicator should be visible
   */
  showMakeCustomMenuRedPoint(): boolean;

  /**
   * Check if menu item "New" icon should display
   * @param storageKey - LocalStorage key for this menu item
   * @returns True if "New" icon should show
   */
  showMenuItemNewIcon(storageKey: string): boolean;

  /**
   * Record that user has seen menu item, hiding "New" icon
   * @param storageKey - LocalStorage key for this menu item
   */
  recordHideMenuItemNewIcon(storageKey: string): void;
};