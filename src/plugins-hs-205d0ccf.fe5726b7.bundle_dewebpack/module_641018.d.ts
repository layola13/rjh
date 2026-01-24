/**
 * Status bar manager for handling left and right status bar items
 * Manages positioning, visibility, and lifecycle of status bar components
 */

import type HSCore from './HSCore';
import type { App } from './App';
import type { LayoutManager } from './LayoutManager';
import type { Environment } from './HSFPConstants';

/**
 * Position type for status bar items
 */
type ItemPosition = 'left' | 'right' | 'rightFloat';

/**
 * Type for status bar visibility control
 */
type StatusBarType = 'left' | 'right' | 'all';

/**
 * Data structure for status bar item configuration
 */
interface StatusBarItemData {
  /** Unique identifier for the item */
  id?: string;
  /** CSS class name for styling */
  className?: string;
  /** Whether the item is visible */
  visible?: boolean;
  /** Whether the item is hidden (inverse of visible) */
  hidden?: boolean;
  /** Whether the item is disabled */
  disable?: boolean;
  /** Additional item-specific data */
  [key: string]: unknown;
}

/**
 * Configuration for adding a status bar item
 */
interface StatusBarItemConfig {
  /** Unique identifier for the item */
  id?: string;
  /** Type/category of the item */
  type: string;
  /** Item data configuration */
  data: StatusBarItemData;
  /** Position of the item in the status bar */
  position?: ItemPosition;
}

/**
 * Layout update parameters for left position changes
 */
interface LeftPositionChangeParams {
  /** Whether the left panel is shown */
  isShow: boolean;
  /** Width of the left panel */
  width: number;
}

/**
 * Layout update parameters for position changes
 */
interface PositionChangeParams {
  /** Whether the panel is in modal mode */
  isModal?: boolean;
  /** Left position value */
  left?: number;
  /** Display style value */
  display?: 'block' | 'none';
}

/**
 * Status bar item wrapper class
 */
declare class StatusBarItem {
  constructor(
    data: StatusBarItemData & { id: string },
    type: string,
    manager: StatusBarManager,
    position: ItemPosition
  );

  /** Item configuration data */
  data: StatusBarItemData & { id: string };
  /** Item type */
  type: string;
  /** Position in status bar */
  position: ItemPosition;
}

/**
 * Main status bar manager class
 * Handles the creation, positioning, and lifecycle of status bar UI components
 */
export default class StatusBarManager {
  /** Reference to the main application instance */
  private _app: App;
  
  /** Root DOM element for the status bar */
  private _rootElement: JQuery<HTMLElement> | null;
  
  /** Map of all registered status bar items */
  private _ItemsMap: Map<string, StatusBarItem>;
  
  /** Signal hook for event management */
  private _signalHook: HSCore.Util.SignalHook;
  
  /** Whether the left status bar is disabled */
  private _disableLeft: boolean;
  
  /** Whether the right status bar is disabled */
  private _disableRight: boolean;
  
  /** Whether the left status bar is visible */
  private _showLeft: boolean;
  
  /** Whether the right status bar is visible */
  private _showRight: boolean;

  constructor();

  /**
   * Initialize the status bar manager
   * @param app - Main application instance
   * @param config - Additional configuration options
   */
  init_(app: App, config?: unknown): void;

  /**
   * Cleanup and uninitialize the status bar
   */
  uninit_(): void;

  /**
   * Internal initialization of DOM elements
   */
  private _init(): void;

  /**
   * Handle window resize events
   */
  handleResize: (event: Event) => void;

  /**
   * Update status bar position when left panel changes
   * @param params - Left position change parameters
   */
  positionLeftChange(params: LeftPositionChangeParams): void;

  /**
   * Update status bar position when panels change
   * @param params - Position change parameters
   */
  positionChange(params: PositionChangeParams): void;

  /**
   * Calculate the current left position based on visible panels
   * @returns The calculated left position in pixels
   */
  getLeftPosition(): number;

  /**
   * Show the status bar and render React components
   * @param container - Optional container element to append to
   */
  show(container?: JQuery<HTMLElement>): void;

  /**
   * Hide the status bar
   */
  hide(): void;

  /**
   * Clear all items from the status bar
   */
  clear(): void;

  /**
   * Add a single item to the status bar
   * @param config - Item configuration
   * @param position - Position in the status bar
   * @returns The created status bar item
   */
  addItem(config: StatusBarItemConfig, position: ItemPosition): StatusBarItem;

  /**
   * Update status bar with new sets of items
   * @param leftItems - Items for the left side
   * @param centerItems - Items for the center (rendered as left)
   * @param rightItems - Items for the right side
   */
  update(
    leftItems?: StatusBarItemConfig[],
    centerItems?: StatusBarItemConfig[],
    rightItems?: StatusBarItemConfig[]
  ): void;

  /**
   * Get a status bar item by its ID
   * @param id - Item identifier
   * @returns The status bar item or undefined
   */
  getItemById(id: string): StatusBarItem | undefined;

  /**
   * Remove all items from the status bar
   */
  private _removeAll(): void;

  /**
   * Disable a section of the status bar
   * @param type - Section type to disable
   */
  disableStatusBarByType(type: 'left' | 'right'): void;

  /**
   * Enable a section of the status bar
   * @param type - Section type to enable
   */
  enableStatusBarByType(type: 'left' | 'right'): void;

  /**
   * Show or hide status bar sections
   * @param type - Section type to control
   * @param visible - Whether to show the section
   */
  showStatusBar(type: StatusBarType, visible: boolean): void;

  /**
   * Check if a status bar section is disabled
   * @param type - Section type to check
   * @returns Whether the section is disabled
   */
  isDisabled(type: 'left' | 'right'): boolean;

  /**
   * Disable or enable all items in the status bar
   * @param disable - Whether to disable items (default: true)
   */
  disableAllItems(disable?: boolean): void;

  /**
   * Set status bar to edit mode (all items enabled)
   */
  setToolbarEditModel(): void;

  /**
   * Set status bar to viewer mode
   */
  setToolbarViewerModel(): void;

  /**
   * Set status bar to readonly mode
   */
  setToolbarReadonlyModel(): void;

  /**
   * Internal method to add an item to the status bar
   * @param config - Item configuration
   * @param position - Position in the status bar
   * @returns The created status bar item
   */
  private _addItem(config: StatusBarItemConfig, position: ItemPosition): StatusBarItem;

  /**
   * Handler for opening popup events
   */
  onopenpopup?: () => void;

  /**
   * Handler for closing popup events
   */
  onclosepopup?: () => void;
}