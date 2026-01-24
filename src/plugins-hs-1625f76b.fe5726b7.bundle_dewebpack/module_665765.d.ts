/**
 * Contextual Tools Plugin Module
 * Provides contextual UI tools for floorplan editing and management
 */

declare namespace HSApp.Plugin {
  /**
   * Options for refreshing the status bar
   */
  interface RefreshOptions {
    /** Whether to refresh the status bar UI */
    refreshStatusBar?: boolean;
    /** Whether to update the height of the status bar */
    updateHeight?: boolean;
  }

  /**
   * Data passed with refresh events
   */
  interface RefreshEventData {
    /** Force update even if no selection */
    forceUpdate?: boolean;
    /** Whether to refresh the status bar */
    refreshStatusBar?: boolean;
  }

  /**
   * Event object containing refresh data
   */
  interface RefreshEvent {
    /** Event data payload */
    data?: RefreshEventData;
  }

  /**
   * Plugin metadata configuration
   */
  interface PluginMetadata {
    /** Display name of the plugin */
    name: string;
    /** Description of plugin functionality */
    description: string;
    /** Array of required plugin dependencies */
    dependencies: string[];
  }

  /**
   * Contextual Tools Plugin
   * Manages contextual toolbar and status bar UI elements for floorplan interactions
   */
  class ContextualToolsPlugin extends IPlugin {
    /**
     * Signal emitted when status bar should be populated with controls
     */
    signalPopulateStatusBar: HSCore.Util.Signal<this>;

    /**
     * Signal emitted when command status bar should be populated
     */
    signalPopulateCommandStatusBar: HSCore.Util.Signal<this>;

    /**
     * Signal emitted when status bar is being retired/removed
     */
    signalRetiringStatusBar: HSCore.Util.Signal<this>;

    /**
     * Signal emitted when canvas is changing state
     */
    signalCanvasChanging: HSCore.Util.Signal<this>;

    /**
     * Signal for controlling popup display
     */
    signalContralPopup: HSCore.Util.Signal<this>;

    /**
     * Internal handler managing status bar operations
     * @private
     */
    private _handler: ContextualToolsHandler;

    /**
     * Creates a new ContextualToolsPlugin instance
     */
    constructor();

    /**
     * Called when plugin is activated
     * @param context - Plugin context containing app reference
     * @param options - Additional initialization options
     */
    onActive(context: { app: HSApp.App }, options?: unknown): void;

    /**
     * Called when plugin is deactivated
     */
    onDeactive(): void;

    /**
     * Shows the status bar UI
     */
    showStatusBar(): void;

    /**
     * Hides the status bar UI
     * @param options - Optional parameters for hiding behavior
     */
    hideStatusBar(options?: unknown): void;

    /**
     * Retrieves a status bar control by its identifier
     * @param controlId - Unique identifier of the control
     * @returns The status bar control instance, or undefined if not found
     */
    getStatusBarControlById(controlId: string): unknown;

    /**
     * Updates the status bar with new data
     * @param data - Update data payload
     */
    update(data: unknown): void;

    /**
     * Debug utility to get currently showing status bar items
     * @returns Array of visible status bar items
     */
    debugGetStatusBarShowingItems(): unknown[];

    /**
     * Refreshes the status bar display
     * @param data - Optional refresh data
     * @param options - Refresh behavior options
     */
    refresh(data?: unknown, options?: RefreshOptions): void;

    /**
     * Event handler for refresh requests
     * @param event - Refresh event containing update instructions
     */
    onRefresh(event: RefreshEvent): void;

    /**
     * Determines if property bar items should be shown for web interface
     * @returns True if property bar items will be shown
     */
    willShowPropertyBarItemsForWeb(): boolean;

    /**
     * Shows status bar items in web interface
     */
    showStatusBarItemsForWeb(): void;

    /**
     * Hides status bar items in web interface
     */
    hideStatusBarItemsForWeb(): void;

    /**
     * Determines if status bar items should be shown for web interface
     * @returns True if status bar items will be shown
     */
    willShowStatusBarItemsForWeb(): boolean;

    /**
     * Disables all event hookups and listeners
     * @returns Operation result
     */
    disableAllHookups(): unknown;

    /**
     * Enables all event hookups and listeners
     * @returns Operation result
     */
    enableAllHookups(): unknown;

    /**
     * Handles changes to customized modeling environment
     * @param environmentData - New environment configuration
     */
    onCustomizedModelingEnvironmentChanged(environmentData: unknown): void;
  }

  /**
   * Internal handler class for contextual tools operations
   * @private
   */
  class ContextualToolsHandler {
    /**
     * Initializes the handler
     * @param app - Application instance
     * @param plugin - Parent plugin instance
     * @param options - Initialization options
     */
    init_(app: HSApp.App, plugin: ContextualToolsPlugin, options?: unknown): void;

    /**
     * Uninitializes and cleans up the handler
     */
    uninit_(): void;

    /**
     * Shows the status bar
     */
    show_(): void;

    /**
     * Hides the status bar
     * @param options - Hide options
     */
    hide_(options?: unknown): void;

    /**
     * Gets a status bar control by ID
     * @param controlId - Control identifier
     */
    getStatusBarControlById_(controlId: string): unknown;

    /**
     * Updates the status bar
     * @param data - Update data
     */
    update_(data: unknown): void;

    /**
     * Debug method to get showing items
     */
    debugGetStatusBarShowingItems_(): unknown[];

    /**
     * Internal refresh implementation
     * @param data - Refresh data
     * @param options - Refresh options
     */
    _refresh(data?: unknown, options?: RefreshOptions): void;

    /**
     * Checks if property bar items will show for web
     */
    willShowPropertyBarItemsForWeb_(): boolean;

    /**
     * Shows status bar items for web
     */
    showStatusBarItemsForWeb_(): void;

    /**
     * Hides status bar items for web
     */
    hideStatusBarItemsForWeb_(): void;

    /**
     * Checks if status bar items will show for web
     */
    willShowStatusBarItemsForWeb_(): boolean;

    /**
     * Disables all hookups
     */
    disableAllHookups(): unknown;

    /**
     * Enables all hookups
     */
    enableAllHookups(): unknown;

    /**
     * Handles modeling environment changes
     * @param environmentData - Environment data
     */
    onCustomizedModelingEnvironmentChanged(environmentData: unknown): void;
  }

  /**
   * Registers a plugin with the application
   * @param pluginType - Plugin type identifier
   * @param pluginClass - Plugin class constructor
   */
  function registerPlugin(
    pluginType: string,
    pluginClass: new () => IPlugin
  ): void;
}

declare namespace HSFPConstants {
  /**
   * Plugin type constants
   */
  namespace PluginType {
    const ContextualTools: string;
    const Catalog: string;
    const UserInput: string;
    const StatusBar: string;
  }
}

declare namespace HSCore.Util {
  /**
   * Signal class for event handling
   * @template T - Type of the signal owner
   */
  class Signal<T> {
    /**
     * Creates a new signal
     * @param owner - Owner of the signal
     */
    constructor(owner: T);

    /**
     * Registers a listener for this signal
     * @param callback - Callback function to invoke
     * @param context - Context for the callback
     */
    listen(callback: (event: unknown) => void, context: unknown): void;
  }
}

declare namespace HSApp {
  /**
   * Application instance
   */
  class App {
    /**
     * Signal for contextual tool refresh requests
     */
    signalContextualtoolRefresh: HSCore.Util.Signal<App>;

    /**
     * Selection manager instance
     */
    selectionManager: {
      /** Number of selected items */
      count: number;
    };

    /**
     * Gets the global application instance
     */
    static getApp(): App;
  }
}