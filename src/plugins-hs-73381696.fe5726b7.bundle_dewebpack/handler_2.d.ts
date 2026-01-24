/**
 * Module: Handler
 * Context menu handler for managing left-click menu interactions in 2D/3D views
 */

import { HSCore } from './hs-core';
import { HSDevice, MouseEvents } from './hs-device';
import { HSApp } from './hs-app';
import { HSFPConstants } from './hs-fp-constants';
import { DataBuilder } from './data-builder';
import { 
  hideLeftMenu, 
  showLeftMenu, 
  updatePosition, 
  displayLeftMenu, 
  destroyLeftMenu 
} from './left-menu-ui';
import { Vector2 } from './vector2';
import { UIUtil, Direction } from './ui-util';

/**
 * Position coordinate on screen
 */
interface Position {
  x: number;
  y: number;
}

/**
 * Menu item configuration
 */
interface MenuItem {
  id: string;
  unusable?: boolean;
  children?: MenuItem[];
}

/**
 * Signal hook initialization options
 */
interface HandlerOptions {
  /** Signal for populating customized menu items */
  signalPopulateCustomizedItems: HSCore.Util.Signal<unknown>;
  /** Signal for tracking item click events */
  signalItemClickEventTrack: HSCore.Util.Signal<void>;
}

/**
 * Auto-fit menu options
 */
interface AutoFitOptions {
  /** Maximum container element for menu positioning */
  maxContainer?: HTMLElement;
  /** Strategy information for positioning */
  strategyInfos?: StrategyInfo[];
  /** Layout manager registration keys */
  layoutMangerRegisterKeys?: string[];
  /** Collision detection information */
  collisionInfos?: unknown[];
  /** Selected loop polygon */
  selectedLoop?: unknown;
}

/**
 * Strategy information for menu positioning
 */
interface StrategyInfo {
  offset: Vector2;
  directions: Direction[];
  position: Vector2;
  strategyHandler: (args: unknown) => Position | null;
}

/**
 * Menu position result
 */
interface MenuPosition {
  left: number;
  top: number;
}

/**
 * Event data for selection changes
 */
interface SelectionChangedEventData {
  newEntities?: HSCore.Model.Entity[];
}

/**
 * Event data for command lifecycle
 */
interface CommandEventData {
  cmd: {
    type: string;
  };
}

/**
 * Context menu handler for managing right-click and left-click menu interactions
 * Handles menu positioning, visibility, and interaction with 2D/3D views
 */
export declare class Handler {
  private _signalHook: HSCore.Util.SignalHook | undefined;
  
  /** Signal dispatched when customized items need to be populated */
  public signalPopulateCustomizedItems: HSCore.Util.Signal<unknown> | undefined;
  
  /** Signal dispatched when menu item is clicked for tracking */
  public signalItemClickEventTrack: HSCore.Util.Signal<void> | undefined;
  
  private _showLeftMenu: boolean | undefined;
  private _app: HSApp | undefined;
  private _ignoreMouseEvent: boolean | undefined;
  private _isReadonlyMode: boolean | undefined;
  private _readonlyShowItems: MenuItem[] | undefined;
  private timeId: number | undefined;
  private _lastMousePos: Position | undefined;
  private _isDisableLeftmenu: boolean | undefined;
  private _timeout: number | undefined;
  private _docElement: HTMLElement | undefined;
  
  /** Flag indicating if menu was hidden by command */
  public hideByCmd: boolean | undefined;

  /**
   * Initialize the handler with application instance and signals
   * @param app - The main application instance
   * @param options - Handler initialization options
   */
  public init(app: HSApp, options: HandlerOptions): void;

  /**
   * Set whether to ignore mouse events
   */
  public set ignoreMouseEvent(value: boolean);

  /**
   * Register signal listeners for command and view changes
   */
  public registerSignal(): void;

  /**
   * Handle command start events
   * @param event - Command event data
   */
  private _onCmdStart(event: { data: CommandEventData }): void;

  /**
   * Handle command end events
   * @param event - Command event data
   */
  private _onCmdEnd(event: { data: CommandEventData }): void;

  /**
   * Hide left menu when command starts
   */
  private _cmdLeftMenuHide(): void;

  /**
   * Display left menu when command ends
   */
  private _cmdLeftMenuDisplay(): void;

  /**
   * Control left menu display based on view changes
   */
  private _controlLeftMenuDisplay(): void;

  /**
   * Update left menu position on screen
   */
  public updateLeftMenuPosition(): void;

  /**
   * Register mouse event callback for 2D auxiliary view
   * @param mouseSignal - Mouse signal to bind
   */
  public registerMouseEventCallBack(mouseSignal: HSCore.Util.Signal<unknown>): void;

  /**
   * Unregister mouse event callback
   * @param mouseSignal - Mouse signal to unbind
   */
  public unregisterMouseEventCallBack(mouseSignal: HSCore.Util.Signal<unknown>): void;

  /**
   * Register mouse event callback for 3D view
   * @param mouseSignal - Mouse signal to bind
   */
  public register3DMouseEventCallBack(mouseSignal: HSCore.Util.Signal<unknown>): void;

  /**
   * Clean up resources and unregister all listeners
   */
  public uninit(): void;

  /**
   * Dispatch item click event tracking signal
   */
  public onItemClickEventTrack(): void;

  /**
   * Render the context menu with given items
   * @param position - Screen position for menu
   * @param items - Menu items to display
   * @param destroyPrevious - Whether to destroy previous menu (default: false)
   * @param useInnerContainer - Whether to use inner container for positioning (default: false)
   */
  public renderMenu(
    position: Position,
    items: MenuItem[],
    destroyPrevious?: boolean,
    useInnerContainer?: boolean
  ): void;

  /**
   * Callback when left menu is closed
   */
  public onLeftMenuClose(): void;

  /**
   * Handle selection changed events
   * @param event - Selection change event data
   */
  private _onSelectionChanged(event: { data: SelectionChangedEventData }): void;

  /**
   * Refresh menu items at last mouse position
   */
  public refreshMenuItems(): void;

  /**
   * Auto-fit menu position (legacy implementation)
   * @param useInnerContainer - Whether to use inner container
   * @param position - Target position
   * @param menuElement - Menu DOM element
   * @returns Calculated menu position
   */
  public autoFitMenuOld(
    useInnerContainer: boolean,
    position?: Position,
    menuElement?: HTMLElement
  ): MenuPosition | undefined;

  /**
   * Get position order for opening based on rotation
   * @param rotation - Rotation angle in degrees
   * @returns Position order string (e.g., "123", "341")
   */
  private getOpeningPositionOrder(rotation: number): string;

  /**
   * Get position order for corner window
   * @param cornerWindow - Corner window model
   * @returns Position order string
   */
  private getCornerWindowPositionOrder(cornerWindow: HSCore.Model.CornerWindow): string | undefined;

  /**
   * Auto-fit menu position using collision detection
   * @param useInnerContainer - Whether to use inner container
   * @param position - Target position
   * @param menuElement - Menu DOM element
   * @param options - Auto-fit options
   * @returns Calculated menu position
   */
  public autoFitMenu(
    useInnerContainer: boolean,
    position?: Position,
    menuElement?: HTMLElement,
    options?: AutoFitOptions
  ): MenuPosition | null;

  /**
   * Initialize menu data based on signal and position
   * @param signal - Signal for populating items
   * @param position - Mouse position
   * @returns Menu items array
   */
  public initData(
    signal: HSCore.Util.Signal<unknown> | undefined,
    position: Position
  ): MenuItem[];

  /**
   * Register custom strategy for menu item generation
   * @param strategy - Strategy to register
   * @returns Success flag
   */
  public registerStrategy(strategy: unknown): boolean;

  /**
   * Unregister custom strategy
   * @param strategy - Strategy to unregister
   * @returns Success flag
   */
  public unregisterStrategy(strategy: unknown): boolean;

  /**
   * Handle ungroup action for selected entities
   */
  public ungroupEvent(): void;

  /**
   * Handle group action for selected entities
   */
  public groupEvent(): void;

  /**
   * Handle hide action for selected entities
   */
  public hideEvent(): void;

  /**
   * Handle show all action
   */
  public showAllEvent(): void;

  /**
   * Handle rotate on XY plane action for selected entities
   */
  public rotateXYPlaneEvent(): void;

  /**
   * Show left menu bar at specified position
   * @param position - Screen position
   * @param items - Menu items (will be initialized if not provided)
   * @param destroyPrevious - Whether to destroy previous menu (default: false)
   * @param useInnerContainer - Whether to use inner container (default: false)
   */
  public showLeftMenuBar(
    position: Position,
    items?: MenuItem[],
    destroyPrevious?: boolean,
    useInnerContainer?: boolean
  ): void;

  /**
   * Disable left menu globally
   */
  public disableLeftMenu(): void;

  /**
   * Enable left menu globally
   */
  public enableLeftMenu(): void;

  /**
   * Check if left menu is currently shown
   * @returns True if menu is visible
   */
  public isLeftMenuShowed(): boolean;

  /**
   * Hide the left menu
   */
  public hideLeftMenu(): void;

  /**
   * Display the left menu and update position
   */
  public displayLeftMenu(): void;

  /**
   * Hide left menu when ESC or certain keys are pressed
   * @param event - Keyboard event
   */
  public escHideLeftMenu(event?: KeyboardEvent): void;

  /**
   * Set left menu to readonly mode with allowed items
   * @param allowedItems - Array of allowed menu item IDs (default: [])
   */
  public setLeftMenuReadonlyMode(allowedItems?: MenuItem[]): void;

  /**
   * Set left menu to edit mode (disable readonly)
   */
  public setLeftMenuEditMode(): void;
}