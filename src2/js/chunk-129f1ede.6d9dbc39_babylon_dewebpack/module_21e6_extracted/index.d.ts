/**
 * Webpack Bundle Type Definitions
 * Auto-generated TypeScript declarations for modular bundle
 */

/**
 * Add module - handles adding operations
 */
export interface Add {
  /**
   * Adds an item to a collection
   * @param item - The item to add
   * @returns Success status
   */
  (item: unknown): boolean;
}

/**
 * Update search input module - manages search input state
 */
export interface UpdateSearchInput {
  /**
   * Updates the search input value
   * @param value - New search value
   * @param options - Update options
   */
  (value: string, options?: { debounce?: number; trigger?: boolean }): void;
}

/**
 * Remove module - handles removal operations
 */
export interface Remove {
  /**
   * Removes an item by identifier
   * @param id - Item identifier
   * @returns Success status
   */
  (id: string | number): boolean;
}

/**
 * Open calculator/order dialog module
 */
export interface OpenCalcorderDialog {
  /**
   * Opens the calculator or order dialog
   * @param config - Dialog configuration
   */
  (config?: { mode?: 'calc' | 'order'; data?: Record<string, unknown> }): void;
}

/**
 * Set module - handles setting values
 */
export interface Set {
  /**
   * Sets a key-value pair
   * @param key - Storage key
   * @param value - Value to store
   */
  (key: string, value: unknown): void;
}

/**
 * Function utilities module
 */
export interface Fn {
  /**
   * Utility function collection
   */
  readonly utils: Record<string, (...args: unknown[]) => unknown>;
}

/**
 * Toggle show category module
 */
export interface ToggleShowCate {
  /**
   * Toggles category visibility
   * @param categoryId - Category identifier
   * @param visible - Optional explicit visibility state
   */
  (categoryId: string | number, visible?: boolean): void;
}

/**
 * Paper/document list item
 */
export interface PaperItem {
  readonly id: string | number;
  readonly title: string;
  readonly content?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

/**
 * Paper list module - manages document collections
 */
export interface PaperList {
  /**
   * Gets all papers
   */
  getAll(): readonly PaperItem[];
  
  /**
   * Gets paper by ID
   */
  getById(id: string | number): PaperItem | undefined;
  
  /**
   * Filters papers by criteria
   */
  filter(predicate: (item: PaperItem) => boolean): readonly PaperItem[];
}

/**
 * Get module - retrieves stored values
 */
export interface Get {
  /**
   * Retrieves value by key
   * @param key - Storage key
   * @param defaultValue - Default value if key not found
   */
  <T = unknown>(key: string, defaultValue?: T): T | undefined;
}

/**
 * Order information
 */
export interface OrderInfo {
  readonly product_id: string | number;
  readonly quantity: number;
  readonly price: number;
  readonly customerId?: string;
  readonly timestamp: number;
}

/**
 * Module exports
 */
export const add: Add;
export const updateSearchInput: UpdateSearchInput;
export const remove: Remove;
export const openCalcorderDialog: OpenCalcorderDialog;
export const set: Set;
export const fn: Fn;
export const toggleShowCate: ToggleShowCate;
export const paperList: PaperList;
export const get: Get;
export const orderInfo: OrderInfo;