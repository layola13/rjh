/**
 * Left Menu Plugin Type Definitions
 * Provides mouse-based left menu functionality with customizable items and strategies
 */

declare namespace HSCore.Util {
  /**
   * Signal class for event handling and observer pattern implementation
   */
  class Signal<T = any> {
    constructor(context?: T);
    /**
     * Subscribe to signal events
     */
    add(listener: Function, context?: any): void;
    /**
     * Unsubscribe from signal events
     */
    remove(listener: Function, context?: any): void;
    /**
     * Dispatch signal to all listeners
     */
    dispatch(...args: any[]): void;
  }
}

declare namespace HSApp.Plugin {
  /**
   * Base plugin interface that all plugins must extend
   */
  abstract class IPlugin {
    /**
     * Plugin metadata
     */
    name: string;
    description: string;
    dependencies: string[];

    /**
     * Called when plugin is activated
     */
    abstract onActive(context: { app: any }): void;

    /**
     * Called when plugin is deactivated
     */
    abstract onDeactive(): void;
  }

  /**
   * Register a plugin with the application
   * @param pluginType - Type identifier for the plugin
   * @param pluginClass - Plugin class constructor
   */
  function registerPlugin(
    pluginType: string,
    pluginClass: new () => IPlugin
  ): void;
}

declare namespace HSFPConstants {
  /**
   * Available plugin types in the system
   */
  enum PluginType {
    LeftMenu = 'LeftMenu',
  }
}

declare namespace LeftMenuPlugin {
  /**
   * Mouse event callback function type
   */
  type MouseEventCallback = (event: MouseEvent) => void | boolean;

  /**
   * 3D mouse event callback function type
   */
  type Mouse3DEventCallback = (event: any) => void | boolean;

  /**
   * Left menu strategy interface for custom behavior
   */
  interface ILeftMenuStrategy {
    /**
     * Strategy identifier
     */
    id: string;
    /**
     * Execute strategy logic
     */
    execute(context: any): void;
  }

  /**
   * Left menu item configuration
   */
  interface ILeftMenuItem {
    /**
     * Unique item identifier
     */
    id: string;
    /**
     * Display label
     */
    label: string;
    /**
     * Icon identifier or URL
     */
    icon?: string;
    /**
     * Click handler
     */
    onClick?: (item: ILeftMenuItem) => void;
    /**
     * Whether item is disabled
     */
    disabled?: boolean;
    /**
     * Child menu items
     */
    children?: ILeftMenuItem[];
  }

  /**
   * Handler class managing left menu behavior and state
   */
  class Handler {
    /**
     * Initialize handler with app context
     * @param app - Application instance
     * @param plugin - Plugin instance
     */
    init(app: any, plugin: LeftMenuPlugin): void;

    /**
     * Clean up and destroy handler
     */
    uninit(): void;

    /**
     * Display left menu bar at specified position
     * @param x - X coordinate
     * @param y - Y coordinate
     * @param force - Force display even if already shown
     * @param items - Optional custom menu items
     */
    showLeftMenuBar(
      x: number,
      y: number,
      force?: boolean,
      items?: ILeftMenuItem[]
    ): void;

    /**
     * Refresh menu items from current context
     */
    refreshMenuItems(): void;

    /**
     * Show the left menu
     */
    showLeftMenu(): void;

    /**
     * Hide the left menu
     */
    hideLeftMenu(): void;

    /**
     * Display left menu (alias for show)
     */
    displayLeftMenu(): void;

    /**
     * Enable left menu interactions
     */
    enableLeftMenu(): void;

    /**
     * Disable left menu interactions
     */
    disableLeftMenu(): void;

    /**
     * Check if left menu is currently visible
     * @returns True if menu is shown
     */
    isLeftMenuShowed(): boolean;

    /**
     * Register mouse event callback
     * @param callback - Function to handle mouse events
     */
    registerMouseEventCallBack(callback: MouseEventCallback): void;

    /**
     * Unregister mouse event callback
     * @param callback - Previously registered callback
     */
    unregisterMouseEventCallBack(callback: MouseEventCallback): void;

    /**
     * Register 3D mouse event callback
     * @param callback - Function to handle 3D mouse events
     */
    register3DMouseEventCallBack(callback: Mouse3DEventCallback): void;

    /**
     * Set left menu to readonly mode
     * @param readonly - True to enable readonly mode
     */
    setLeftMenuReadonlyMode(readonly: boolean): void;

    /**
     * Set left menu to edit mode
     */
    setLeftMenuEditMode(): void;

    /**
     * Register a custom strategy
     * @param strategy - Strategy instance to register
     * @returns True if registration successful
     */
    registerStrategy(strategy: ILeftMenuStrategy): boolean;

    /**
     * Unregister a custom strategy
     * @param strategyId - ID of strategy to remove
     * @returns True if unregistration successful
     */
    unregisterStrategy(strategyId: string): boolean;

    /**
     * Ignore mouse event temporarily
     */
    ignoreMouseEvent(): void;
  }

  /**
   * Signal for left menu item click events
   */
  class LeftMenuSignal {
    private static instance: LeftMenuSignal;

    /**
     * Get singleton instance
     */
    static getInstance(): LeftMenuSignal;

    /**
     * Dispatch item click event
     * @param item - Clicked menu item
     */
    dispatch(item: ILeftMenuItem): void;

    /**
     * Subscribe to item click events
     * @param listener - Event listener function
     */
    add(listener: (item: ILeftMenuItem) => void): void;

    /**
     * Unsubscribe from item click events
     * @param listener - Previously registered listener
     */
    remove(listener: (item: ILeftMenuItem) => void): void;
  }
}

/**
 * Left Menu Plugin
 * Provides comprehensive left-side menu functionality with mouse interaction support
 */
declare class LeftMenuPlugin extends HSApp.Plugin.IPlugin {
  /**
   * Menu behavior handler
   */
  readonly handler: LeftMenuPlugin.Handler;

  /**
   * Signal emitted when populating minimal menu bar
   */
  readonly signalPopulateMinBar: HSCore.Util.Signal<LeftMenuPlugin>;

  /**
   * Signal emitted when populating customized menu items
   */
  readonly signalPopulateCustomizedItems: HSCore.Util.Signal<LeftMenuPlugin>;

  /**
   * Signal emitted when tracking item click events
   */
  readonly signalItemClickEventTrack: HSCore.Util.Signal<LeftMenuPlugin>;

  /**
   * Global signal for left menu item clicks
   */
  readonly signalLeftMenuItemClick: LeftMenuPlugin.LeftMenuSignal;

  /**
   * Item-specific event handlers
   */
  readonly itemHandlers: any;

  /**
   * Common menu items configuration
   */
  readonly commonItems: any;

  /**
   * Ignore mouse event temporarily
   */
  readonly ignoreMouseEvent: () => void;

  /**
   * Plugin activation callback
   * @param context - Activation context containing app instance
   */
  onActive(context: { app: any }): void;

  /**
   * Plugin deactivation callback
   */
  onDeactive(): void;

  /**
   * Show left menu bar at specified coordinates
   * @param x - X coordinate
   * @param y - Y coordinate
   * @param items - Optional custom menu items
   */
  showLeftMenuBar(
    x: number,
    y: number,
    items?: LeftMenuPlugin.ILeftMenuItem[]
  ): void;

  /**
   * Refresh menu items from current application state
   */
  refreshMenuItems(): void;

  /**
   * Show the left menu
   */
  showLeftMenu(): void;

  /**
   * Hide the left menu
   */
  hideLeftMenu(): void;

  /**
   * Display the left menu (alias for show)
   */
  displayLeftMenu(): void;

  /**
   * Enable left menu interactions
   */
  enableLeftMenu(): void;

  /**
   * Disable left menu interactions
   */
  disableLeftMenu(): void;

  /**
   * Check if left menu is currently visible
   * @returns True if menu is shown
   */
  isLeftMenuShowed(): boolean;

  /**
   * Register a callback for mouse events
   * @param callback - Function to handle mouse events
   */
  registerMouseEventCallBack(
    callback: LeftMenuPlugin.MouseEventCallback
  ): void;

  /**
   * Unregister a previously registered mouse event callback
   * @param callback - Callback to remove
   */
  unregisterMouseEventCallBack(
    callback: LeftMenuPlugin.MouseEventCallback
  ): void;

  /**
   * Register a callback for 3D mouse events
   * @param callback - Function to handle 3D mouse events
   */
  register3DMouseEventCallBack(
    callback: LeftMenuPlugin.Mouse3DEventCallback
  ): void;

  /**
   * Set left menu to readonly mode
   * @param readonly - True to enable readonly mode, false otherwise
   */
  setLeftMenuReadonlyMode(readonly: boolean): void;

  /**
   * Set left menu to edit mode
   */
  setLeftMenuEditMode(): void;

  /**
   * Register a custom strategy for menu behavior
   * @param strategy - Strategy instance implementing ILeftMenuStrategy
   * @returns True if registration successful
   */
  registerStrategy(strategy: LeftMenuPlugin.ILeftMenuStrategy): boolean;

  /**
   * Unregister a previously registered strategy
   * @param strategyId - ID of the strategy to remove
   * @returns True if unregistration successful
   */
  unregisterStrategy(strategyId: string): boolean;
}

export = LeftMenuPlugin;