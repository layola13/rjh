/**
 * Signal utility class for handling callbacks
 * Part of HSCore.Util namespace
 */
declare namespace HSCore.Util {
  class Signal<T = any> {
    constructor(context: any);
    dispatch(data: T): void;
  }
}

/**
 * Badge configuration interface
 * Used to display badges on menu items or UI elements
 */
interface BadgeConfig {
  /** Badge text or label */
  text?: string;
  /** Badge color or theme */
  color?: string;
  /** Additional badge properties */
  [key: string]: any;
}

/**
 * Menu item data configuration
 */
interface MenuItemData {
  /** Display order (default: 1000) */
  order: number;
  /** Visibility state */
  visible: boolean;
  /** Enabled/disabled state */
  enable: boolean;
  /** Optional badge configuration */
  badge?: BadgeConfig;
  /** Command to execute when item is clicked */
  command?: string | (() => void);
  /** Keyboard shortcut */
  hotkey?: string;
  /** Counter display number */
  countNumber: number;
  /** Show "new" indicator */
  showNew: boolean;
  /** Pressed state (optional) */
  isPressed?: boolean;
}

/**
 * Change callback function type
 * @param event - The change event object
 */
type ChangeCallback = (event?: any) => void;

/**
 * Menu item or UI component class
 * Manages item state, visibility, badges, and hierarchical relationships
 */
declare class MenuItem {
  /** Item name/identifier */
  readonly name: string;
  
  /** Signal dispatched when item data changes */
  readonly signalChanged: HSCore.Util.Signal<MenuItemData>;
  
  /** Parent menu item (for hierarchical structure) */
  parent?: MenuItem;
  
  /** Item configuration data */
  data: MenuItemData;

  /**
   * Creates a new menu item instance
   * @param name - Unique name/identifier for the item
   * @param changeCallback - Optional callback invoked on data changes
   */
  constructor(name: string, changeCallback?: ChangeCallback);

  /**
   * Updates item data
   * @param data - Partial data to merge with existing data
   * @param triggerCallback - Whether to trigger change callback (default: false)
   */
  setData(data: Partial<MenuItemData>, triggerCallback?: boolean): void;

  /**
   * Disables the menu item
   */
  disable(): void;

  /**
   * Enables the menu item
   */
  enable(): void;

  /**
   * Shows the menu item
   */
  show(): void;

  /**
   * Hides the menu item
   */
  hide(): void;

  /**
   * Adds a badge to the menu item
   * @param badgeConfig - Badge configuration object
   */
  addBadge(badgeConfig: BadgeConfig): void;

  /**
   * Removes the badge from the menu item
   */
  removeBadge(): void;

  /**
   * Gets the full hierarchical path of the item
   * @returns Path string (e.g., "parent/child/item")
   */
  getPath(): string;

  /**
   * Checks if the item is in pressed state
   * @returns True if pressed, false otherwise
   */
  isPressed(): boolean;
}

export default MenuItem;