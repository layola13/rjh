/**
 * Menu system module for hierarchical item management
 * Provides functionality for creating, organizing, and managing menu items with path-based navigation
 */

/**
 * Configuration for a menu item or submenu
 */
interface MenuItemConfig {
  /** Unique key for settings identification */
  settingKey?: string;
  /** Display name of the menu item */
  name: string;
  /** Nested submenu items */
  submenu?: MenuItemConfig[];
}

/**
 * Signal event payload when an item is added
 */
interface ItemAddedEvent<T> {
  /** The newly added item */
  addedItem: T;
  /** The parent folder/container */
  folder: MenuFolder<T>;
}

/**
 * Signal event payload when an item is removed
 */
interface ItemRemovedEvent<T> {
  /** The removed item */
  removedItem: T;
  /** The parent folder/container */
  folder: MenuFolder<T>;
}

/**
 * Options for initializing a menu folder
 */
interface MenuFolderOptions<T> {
  /** Name of the folder */
  name: string;
  /** Function to retrieve items */
  itemGetter: () => T;
  /** Callback when an item is added */
  itemAddedCallback: (item: T, folder: MenuFolder<T>) => void;
  /** Callback when an item is removed */
  itemRemovedCallback: (item: T, folder: MenuFolder<T>) => void;
}

/**
 * Represents a folder/container in the menu hierarchy
 */
declare class MenuFolder<T> {
  constructor(options: MenuFolderOptions<T>, parent?: MenuFolder<T>);
  
  /** Display the folder */
  show(): void;
  
  /** Hide the folder */
  hide(): void;
  
  /** Get a child item by name */
  getChild(name: string): MenuFolder<T> | undefined;
  
  /** Add an item to this folder */
  add(item: MenuItemConfig): MenuFolder<T>;
  
  /** Remove an item by name */
  remove(name: string): void;
}

/**
 * Signal utility for event dispatching
 */
declare namespace HSCore.Util {
  class Signal<T> {
    constructor(context: unknown);
    dispatch(data: T): void;
  }
}

/**
 * Main menu management class
 * Handles hierarchical menu structure with path-based item lookup and signals for item changes
 * 
 * @template T - Type of items managed by this menu
 */
export default class Menu<T = unknown> {
  /** Name of the menu */
  readonly name: string;
  
  /** Whether this menu is in the default environment */
  private readonly _isInDefaultEnv: boolean;
  
  /** Root folder of the menu hierarchy */
  private readonly _root: MenuFolder<T>;
  
  /** Maps setting keys to their full path in the menu */
  pathDictionary: Record<string, string | undefined>;
  
  /** Signal dispatched when an item is added */
  signalItemAdded: HSCore.Util.Signal<ItemAddedEvent<T>>;
  
  /** Signal dispatched when an item is removed */
  signalItemRemoved: HSCore.Util.Signal<ItemRemovedEvent<T>>;
  
  /**
   * Creates a new menu instance
   * 
   * @param name - Unique name for this menu
   * @param parent - Optional parent menu folder
   * @param itemGetter - Function to retrieve items
   * @param initialItems - Initial menu item configurations
   * @param isInDefaultEnv - Whether this menu is in the default environment
   */
  constructor(
    name: string,
    parent: MenuFolder<T> | undefined,
    itemGetter: () => T,
    initialItems?: MenuItemConfig[],
    isInDefaultEnv?: boolean
  );
  
  /**
   * Initialize the path dictionary from menu item configurations
   * Recursively builds a map of setting keys to their full paths
   * 
   * @param items - Array of menu item configurations
   * @param basePath - Base path prefix for nested items
   * @returns Dictionary mapping setting keys to paths
   */
  initPathDictionary(
    items?: MenuItemConfig[],
    basePath?: string
  ): Record<string, string | undefined>;
  
  /**
   * Add a setting key to the path dictionary
   * Recursively processes submenu items
   * 
   * @param item - Menu item configuration
   * @param parentPath - Path of the parent item
   */
  addSettingKeyToDictionary(item: MenuItemConfig, parentPath: string): void;
  
  /**
   * Show the menu
   */
  show(): void;
  
  /**
   * Hide the menu
   */
  hide(): void;
  
  /**
   * Get the root folder of the menu
   * 
   * @returns Root menu folder
   */
  getRoot(): MenuFolder<T>;
  
  /**
   * Get a menu item by its path
   * 
   * @param path - Slash-separated path (e.g., "File/Open")
   * @returns Menu folder at the specified path, or undefined if not found
   */
  getItem(path?: string): MenuFolder<T> | undefined;
  
  /**
   * Get a menu item by its setting key
   * 
   * @param settingKey - Unique setting key
   * @returns Menu folder associated with the key, or undefined if not found
   */
  getItemBySettingKey(settingKey?: string): MenuFolder<T> | undefined;
  
  /**
   * Add a new item to the menu at the specified path
   * 
   * @param itemConfig - Configuration for the new item
   * @param parentPath - Path where the item should be added
   * @returns Newly created menu folder, or undefined if parent not found
   */
  addItem(itemConfig: MenuItemConfig, parentPath: string): MenuFolder<T> | undefined;
  
  /**
   * Remove an item from the menu by its path
   * Also removes the item's setting key from the path dictionary
   * 
   * @param path - Full path to the item to remove
   */
  removeItem(path?: string): void;
  
  /**
   * Check if this menu is in the default environment
   * 
   * @returns True if in default environment
   */
  isInDefaultEnv(): boolean;
  
  /**
   * Internal callback when an item is added
   * Dispatches the itemAdded signal
   * 
   * @param item - Added item
   * @param folder - Parent folder
   */
  private _onItemAdded(item: T, folder: MenuFolder<T>): void;
  
  /**
   * Internal callback when an item is removed
   * Dispatches the itemRemoved signal
   * 
   * @param item - Removed item
   * @param folder - Parent folder
   */
  private _onItemRemoved(item: T, folder: MenuFolder<T>): void;
}