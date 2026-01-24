/**
 * Toolbar Plugin Type Definitions
 * Provides toolbar management functionality including item manipulation,
 * toolbar activation, and permission-based UI updates.
 */

declare namespace HSApp.Plugin {
  /**
   * Toolbar item configuration interface
   */
  interface ToolbarItemConfig {
    /** Unique identifier for the toolbar item */
    id: string;
    /** Display name or label */
    name?: string;
    /** Icon identifier or URL */
    icon?: string;
    /** Click event handler */
    onClick?: () => void;
    /** Whether the item is disabled */
    disabled?: boolean;
    /** Whether the item is visible */
    visible?: boolean;
    /** Tooltip text */
    tooltip?: string;
    /** Badge count for notifications */
    badgeCount?: number;
    /** Custom data attached to the item */
    data?: Record<string, unknown>;
  }

  /**
   * Toolbar configuration interface
   */
  interface ToolbarConfig {
    /** Unique identifier for the toolbar */
    id: string;
    /** Array of toolbar items */
    items?: ToolbarItemConfig[];
    /** Whether the toolbar is visible */
    visible?: boolean;
  }

  /**
   * View option status interface
   */
  interface ViewOptionStatus {
    /** Option identifier */
    key: string;
    /** Whether the option is enabled */
    enabled: boolean;
    /** Whether the option is visible */
    visible?: boolean;
  }

  /**
   * Toolbar item instance with control methods
   */
  interface ToolbarItem {
    /** Disable the toolbar item */
    disable(): void;
    /** Enable the toolbar item */
    enable(): void;
    /** Get item configuration */
    getConfig(): ToolbarItemConfig;
  }

  /**
   * Plugin dependencies map
   */
  interface PluginDependencies {
    [HSFPConstants.PluginType.UserInput]?: HSApp.Plugin.IPlugin;
    [HSFPConstants.PluginType.Login]?: LoginPlugin;
    [key: string]: HSApp.Plugin.IPlugin | undefined;
  }

  /**
   * Login plugin interface with permission check signal
   */
  interface LoginPlugin extends IPlugin {
    /** Signal emitted when permission check is completed */
    signalCheckPermissionsCompleted: HSCore.Util.Signal<LoginPlugin>;
  }

  /**
   * Handler initialization options
   */
  interface HandlerInitOptions {
    /** Plugin dependencies */
    dependencies: PluginDependencies;
    /** Signal emitted before toolbar changes */
    signalToolbarChanging: HSCore.Util.Signal<ToolbarPlugin>;
    /** Signal emitted after toolbar changes */
    signalToolbarChanged: HSCore.Util.Signal<ToolbarPlugin>;
    /** Signal emitted on toolbar item hover */
    signalToolbarHover: HSCore.Util.Signal<ToolbarPlugin>;
    /** Hook for tooltip signals */
    toolTipSignalHook: HSCore.Util.Signal<ToolbarPlugin>;
  }

  /**
   * Toolbar Plugin
   * Manages application toolbars, items, and their interactions.
   * Handles permission-based UI updates and toolbar state management.
   */
  class ToolbarPlugin extends IPlugin {
    /** Toolbar handler instance */
    private _handler: Handler;

    /** Enumeration of standard toolbar IDs */
    ToolbarIdEnum: typeof ToolbarIdEnum;

    /** Signal emitted before toolbar state changes */
    signalToolbarChanging: HSCore.Util.Signal<ToolbarPlugin>;

    /** Signal emitted after toolbar state changes */
    signalToolbarChanged: HSCore.Util.Signal<ToolbarPlugin>;

    /** Signal emitted when hovering over toolbar items */
    signalToolbarHover: HSCore.Util.Signal<ToolbarPlugin>;

    /** Hook for intercepting tooltip signals */
    toolTipSignalHook: HSCore.Util.Signal<ToolbarPlugin>;

    /** Signal hook for managing event subscriptions */
    signalHook: HSCore.Util.SignalHook<ToolbarPlugin>;

    constructor();

    /**
     * Updates toolbar visibility based on user permissions
     * Removes export and pricing-related items if restricted
     * @private
     */
    private _updateToolbarByPermission(): void;

    /**
     * Called when plugin is activated
     * @param context - Plugin context
     * @param dependencies - Map of dependent plugins
     */
    onActive(context: PluginContext, dependencies?: PluginDependencies): void;

    /**
     * Called when plugin is deactivated
     * @param context - Plugin context
     */
    onDeactive(context: PluginContext): void;

    /**
     * Retrieves a toolbar item by ID
     * @param itemId - Item identifier
     * @param toolbarId - Toolbar identifier (optional)
     * @returns The toolbar item instance
     */
    getItem(itemId: string, toolbarId?: string): ToolbarItem;

    /**
     * Retrieves a toolbar item by its setting key
     * @param settingKey - Setting key identifier
     * @param toolbarId - Toolbar identifier (optional)
     * @returns The toolbar item instance
     */
    getItemBySettingKey(settingKey: string, toolbarId?: string): ToolbarItem;

    /**
     * Adds a new item to a toolbar
     * @param itemConfig - Item configuration
     * @param toolbarId - Toolbar identifier
     * @param index - Position index (optional)
     * @returns The created toolbar item
     */
    addItem(itemConfig: ToolbarItemConfig, toolbarId: string, index?: number): ToolbarItem;

    /**
     * Removes an item from a toolbar
     * @param itemId - Item identifier
     * @param toolbarId - Toolbar identifier
     */
    removeItem(itemId: string, toolbarId: string): void;

    /**
     * Updates multiple toolbar items
     * @param items - Array of item configurations
     * @param toolbarId - Toolbar identifier
     * @param replace - Whether to replace existing items
     */
    updateItems(items: ToolbarItemConfig[], toolbarId: string, replace?: boolean): void;

    /**
     * Hides a toolbar
     * @param toolbarId - Toolbar identifier
     * @returns Success status
     */
    hide(toolbarId: string): boolean;

    /**
     * Shows a toolbar
     * @param toolbarId - Toolbar identifier
     * @returns Success status
     */
    show(toolbarId: string): boolean;

    /**
     * Adds a new toolbar
     * @param toolbarConfig - Toolbar configuration
     * @param activate - Whether to activate immediately
     */
    addToolbar(toolbarConfig: ToolbarConfig, activate?: boolean): void;

    /**
     * Updates an existing toolbar
     * @param toolbarId - Toolbar identifier
     * @param toolbarConfig - Updated toolbar configuration
     */
    updateToolbar(toolbarId: string, toolbarConfig: Partial<ToolbarConfig>): void;

    /**
     * Activates a toolbar
     * @param toolbarId - Toolbar identifier
     * @param triggerSignal - Whether to emit change signals (default: true)
     */
    activateToolbar(toolbarId: string, triggerSignal?: boolean): void;

    /**
     * Gets the currently active toolbar ID
     * @returns Active toolbar identifier
     */
    getActiveToolbarId(): string;

    /**
     * Links a toolbar to another toolbar
     * @param parentToolbarId - Parent toolbar identifier
     * @param childToolbarId - Child toolbar identifier
     * @param triggerId - Item that triggers the link
     */
    addLinkedToolbar(parentToolbarId: string, childToolbarId: string, triggerId: string): void;

    /**
     * Disables a toolbar item
     * @param itemId - Item identifier
     * @param toolbarId - Toolbar identifier (optional)
     */
    disableItem(itemId: string, toolbarId?: string): void;

    /**
     * Enables a toolbar item
     * @param itemId - Item identifier
     * @param toolbarId - Toolbar identifier (optional)
     */
    enableItem(itemId: string, toolbarId?: string): void;

    /**
     * Sets the status of a single view option
     * @param optionKey - Option key identifier
     * @param status - Option status
     */
    setViewOptionStatus(optionKey: string, status: ViewOptionStatus): void;

    /**
     * Sets the status of multiple view options
     * @param options - Array of option statuses
     */
    setViewOptionsStatus(options: ViewOptionStatus[]): void;

    /**
     * Updates items based on option changes
     * @param options - Options object
     * @param toolbarId - Toolbar identifier
     */
    updateItemsByOptions(options: Record<string, unknown>, toolbarId: string): void;

    /**
     * Sets the pressed state of a toolbar item
     * @param itemId - Item identifier
     */
    setToolbarItemisPressed(itemId: string): void;

    /**
     * Clears all hidden models
     * @param clearAll - Whether to clear all models
     */
    clearAllHiddenModels(clearAll: boolean): void;

    /**
     * Adds models to the hidden list
     * @param modelIds - Array of model identifiers
     */
    addHiddenModels(modelIds: string[]): void;

    /**
     * Updates the hidden models list
     * @param modelIds - Array of model identifiers
     */
    updateHiddenModels(modelIds: string[]): void;

    /**
     * Shows the secondary toolbar
     * @param show - Whether to show the secondary toolbar
     */
    showSecondToolbar(show: boolean): void;

    /**
     * Gets the current toolbar height
     * @returns Toolbar height in pixels
     */
    getToolbarHeight(): number;

    /**
     * Sets toolbar to readonly mode
     * Disables editing capabilities
     */
    setToolbarReadonlyModel(): void;

    /**
     * Sets toolbar to viewer mode
     * Optimized for viewing only
     */
    setToolbarViewerModel(): void;

    /**
     * Sets toolbar to edit mode
     * Enables full editing capabilities
     */
    setToolbarEditModel(): void;

    /**
     * Sets the badge count for an item
     * @param itemId - Item identifier
     * @param count - Badge count number
     * @param toolbarId - Toolbar identifier (optional)
     */
    setBadgeCount(itemId: string, count: number, toolbarId?: string): void;

    /**
     * Sets custom data for an item
     * @param itemId - Item identifier
     * @param data - Data object
     * @param toolbarId - Toolbar identifier (optional)
     */
    setItemData(itemId: string, data: Record<string, unknown>, toolbarId?: string): void;

    /**
     * Gets a child item of a parent item
     * @param parentId - Parent item identifier
     * @param childId - Child item identifier
     * @returns The child toolbar item
     */
    getChildItem(parentId: string, childId: string): ToolbarItem;

    /**
     * Gets all children items of a parent item
     * @param parentId - Parent item identifier
     * @param toolbarId - Toolbar identifier (optional)
     * @returns Array of child toolbar items
     */
    getChildrenItems(parentId: string, toolbarId?: string): ToolbarItem[];

    /**
     * Gets all toolbars in the default environment
     * @returns Array of toolbar configurations
     */
    getToolbarsInDefaultEnv(): ToolbarConfig[];
  }

  /**
   * Standard toolbar ID enumeration
   */
  const enum ToolbarIdEnum {
    /** Default main toolbar */
    DEFAULT_TOOLBAR_ID = "default_toolbar",
  }
}

declare namespace HSApp.UI {
  /** Exported toolbar ID enumeration for UI access */
  const ToolbarIdEnum: typeof HSApp.Plugin.ToolbarIdEnum;
}

declare namespace HSCore.Util {
  /**
   * Generic signal for event broadcasting
   */
  class Signal<T> {
    constructor(context: T);
    /** Emit signal with data */
    emit(...args: unknown[]): void;
    /** Listen to signal */
    listen(callback: (...args: unknown[]) => void): void;
  }

  /**
   * Signal hook for managing signal subscriptions
   */
  class SignalHook<T> {
    constructor(context: T);
    /** Listen to a signal */
    listen<S>(signal: Signal<S>, callback: (...args: unknown[]) => void): void;
    /** Unlisten from all signals */
    unlistenAll(): void;
  }
}

declare namespace HSFPConstants {
  /** Plugin type identifiers */
  const enum PluginType {
    Toolbar = "toolbar",
    UserInput = "userInput",
    Login = "login",
  }
}

declare namespace adskUser {
  /** Whether offline export with color is enabled */
  const exportPicColorOffline: boolean;
  
  /**
   * Checks user benefit permissions
   * @param category - Benefit category
   * @param feature - Feature name
   * @returns Benefit check result
   */
  function checkBenefit(category: string, feature: string): { useful: boolean } | null;
}