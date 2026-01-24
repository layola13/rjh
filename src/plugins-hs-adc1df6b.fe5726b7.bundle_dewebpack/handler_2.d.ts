/**
 * Handler module for managing page header items and rendering
 * Handles dynamic addition, removal, and updating of UI items
 */

/**
 * Represents a renderable item in the handler
 */
export interface HandlerItem {
  /**
   * Function that returns the rendered item component
   */
  getRenderItem: () => unknown;
  
  /**
   * Reference to the original item instance
   */
  _item: ItemWithRender;
  
  /**
   * Position type of the item in the UI
   * @default "right"
   */
  posType: "left" | "right" | "center";
  
  /**
   * Display order of the item
   */
  order: number;
  
  /**
   * Unique identifier for the item
   */
  id: string;
  
  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * Interface for items that can be rendered
 */
export interface ItemWithRender {
  /**
   * Returns the renderable component
   */
  getRenderItem: () => unknown;
  
  /**
   * Display order priority
   */
  order: number;
  
  /**
   * Optional method to update item state
   */
  setState?: (state: unknown) => void;
}

/**
 * Main Handler class for managing UI items lifecycle
 */
export declare class Handler {
  /**
   * Collection of handler items
   */
  items: HandlerItem[];
  
  /**
   * Whether the handler is enabled
   * @private
   */
  private _enable: boolean;
  
  /**
   * Timer reference for scheduled render
   */
  nextRun: ReturnType<typeof setTimeout> | null;
  
  /**
   * Application instance reference
   * @private
   */
  private _app: unknown;
  
  /**
   * Dependencies injected into the handler
   * @private
   */
  private _dependencies: unknown;
  
  /**
   * Creates a new Handler instance
   * @param app - Application instance
   * @param dependencies - Dependency injection container
   */
  constructor(app: unknown, dependencies: unknown);
  
  /**
   * Adds a new item to the handler
   * @param item - The item to add
   * @param posType - Position type (left, right, center)
   * @param id - Unique identifier for the item
   */
  addItem(item: ItemWithRender, posType?: "left" | "right" | "center", id?: string): void;
  
  /**
   * Updates an existing item by its ID
   * @param item - The new item data
   * @param id - ID of the item to update
   */
  updateItemById(item: ItemWithRender, id: string): void;
  
  /**
   * Updates the state of an item by its ID
   * @param id - ID of the item to update
   * @param state - New state to apply
   */
  updateStateById(id: string, state: unknown): void;
  
  /**
   * Retrieves an item by its ID
   * @param id - ID of the item to retrieve
   * @returns The handler item or undefined if not found
   */
  getItemById(id: string): HandlerItem | undefined;
  
  /**
   * Removes an item by its ID
   * @param id - ID of the item to remove
   */
  removeItemById(id: string): void;
  
  /**
   * Removes all items matching a position type
   * @param posType - Position type to filter and remove
   */
  removeItem(posType: "left" | "right" | "center"): void;
  
  /**
   * Triggers a render of all items
   * @private
   */
  private _render(): void;
  
  /**
   * Sets page header to readonly mode, disabling specific items
   * @param customIds - Optional array of custom IDs to disable
   * @param append - Whether to append to default readonly items or replace
   */
  setPageHeaderReadonlyMode(customIds?: string[], append?: boolean): void;
  
  /**
   * Sets page header to edit mode, enabling all items
   */
  setPageHeaderEditMode(): void;
}