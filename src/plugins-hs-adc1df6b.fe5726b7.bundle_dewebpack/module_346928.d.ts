/**
 * Page Header Plugin Type Definitions
 * Provides page header wrapper functionality with login status, notifications, and various UI controls
 */

declare namespace HSApp.Plugin.PageHeader {
  /**
   * Plugin dependency types required by PageHeader
   */
  type Dependencies = {
    'hsw.plugin.switchlanguage.Plugin': any;
    'hsw.plugin.signin.Plugin': SignInPlugin;
    'hsw.plugin.persistence.Plugin': any;
    'hsw.plugin.userInfo.Plugin': UserInfoPlugin;
    [HSFPConstants.PluginType.Welcome]: any;
    [key: string]: any;
  };

  /**
   * User center menu item configuration
   */
  interface UserCenterItem {
    id: string;
    label: string;
    icon?: string;
    onClick?: () => void;
    visible?: boolean;
  }

  /**
   * Readonly mode configuration
   */
  interface ReadonlyModeConfig {
    /** Callback function when readonly button is clicked */
    readonlyFn: () => void;
    /** Button text (defaults to localized string) */
    text?: string;
    /** Tooltip text */
    tips?: string;
  }

  /**
   * Environment entering options
   */
  interface EnterEnvOptions {
    /** Custom render item */
    getRenderItem?: () => React.ReactElement;
    [key: string]: any;
  }

  /**
   * Item position in header
   */
  type ItemPosition = 'left' | 'right';

  /**
   * Sign-in plugin interface
   */
  interface SignInPlugin {
    // Define sign-in plugin methods if needed
    [key: string]: any;
  }

  /**
   * User info plugin interface
   */
  interface UserInfoPlugin {
    showItem(itemId: string): void;
    hideItem(itemId: string): void;
    updateItem(item: UserCenterItem): void;
    addItem(item: UserCenterItem): void;
    [key: string]: any;
  }

  /**
   * FP login status component interface
   */
  interface FPLoginStatus {
    openUserMenu?: () => void;
    hideUserMenu?: () => void;
    [key: string]: any;
  }

  /**
   * Main PageHeader Plugin class
   * Manages the application header with various UI components and user interactions
   */
  class Plugin extends HSApp.Plugin.IPlugin {
    /** Internal handler for managing header items */
    private _handler: Handler | null;
    
    /** Application instance */
    private _app: HSApp.Application;
    
    /** Plugin dependencies */
    private _dependencies: Dependencies;
    
    /** Help menu component */
    private _help: Help;
    
    /** Sign-in plugin reference */
    signInPlugin: SignInPlugin;
    
    /** Login status component */
    loginStatus: UserInfoPlugin;
    
    /** FP-specific login status component */
    fpLoginStatus?: FPLoginStatus;
    
    /** Signal hook for event handling */
    signalHook: HSCore.Util.SignalHook;
    
    /** Whether to show price bar */
    showPriceBar: boolean;

    constructor();

    /**
     * Called when plugin is activated
     * Initializes header components and sets up event listeners
     * @param context - Plugin activation context
     * @param dependencies - Required plugin dependencies
     */
    onActive(context: HSApp.Plugin.IPluginContext, dependencies: Dependencies): void;

    /**
     * Called when plugin is deactivated
     */
    onDeactive(): void;

    /**
     * Add an item to the page header
     * @param item - Component to add
     * @param position - Left or right position
     * @param id - Unique identifier for the item
     */
    addItem(item: any, position: ItemPosition, id: string): void;

    /**
     * Remove an item from the header by ID
     * @param itemId - ID of item to remove
     */
    removeItem(itemId: string): void;

    /**
     * Remove login status component from header
     */
    removeLoginStatus(): void;

    /**
     * Add login status component to header
     * Checks URL parameters and environment before adding
     */
    addLoginStatus(): void;

    /**
     * Remove an item by its unique ID
     * @param itemId - ID of item to remove
     */
    removeItemById(itemId: string): void;

    /**
     * Add multiple user center menu items
     * @param items - Array of user center items to add
     */
    addUserCenterItems(items: UserCenterItem[]): void;

    /**
     * Programmatically open the user dropdown menu
     * Only available in FP tenant mode
     */
    openUserDropMenu(): void;

    /**
     * Hide the user dropdown menu
     * Only available in FP tenant mode
     */
    hideUserDropMenu(): void;

    /**
     * Show a specific user center menu item
     * @param itemId - ID of item to show
     */
    showUserCenterItem(itemId: string): void;

    /**
     * Hide a specific user center menu item
     * @param itemId - ID of item to hide
     */
    hideUserCenterItem(itemId: string): void;

    /**
     * Update properties of a user center menu item
     * @param item - Updated item configuration
     */
    updateUserCenterItem(item: UserCenterItem): void;

    /**
     * Add a single user center menu item
     * @param item - Item configuration to add
     */
    addUserCenterItem(item: UserCenterItem): void;

    /**
     * Get a help menu item by ID
     * @param itemId - Help item identifier
     * @returns Help item instance
     */
    getHelpItem(itemId: string): any;

    /**
     * Create a new share/privacy item
     * @param config - Share item configuration
     * @returns New privacy/share component instance
     */
    getNewShareItem(config: any): any;

    /**
     * Show the page header
     */
    show(): void;

    /**
     * Hide the page header
     */
    hide(): void;

    /**
     * Prepare header before entering a new environment
     * Removes left items and optionally adds custom render item
     * @param item - Environment-specific item or render config
     * @param position - Position to add the item
     * @param useReactWrapper - Whether to wrap in React component (default: true)
     */
    beforeEnterEnv(
      item: EnterEnvOptions | any,
      position: ItemPosition,
      useReactWrapper?: boolean
    ): void;

    /**
     * Restore header after leaving an environment
     * Re-adds default logo, design info, and privacy components
     */
    afterOuterEnv(): void;

    /**
     * Switch header to readonly mode
     * Adds readonly indicator button and removes editable controls
     * @param config - Readonly mode configuration
     */
    setPageHeaderReadonlyMode(config: ReadonlyModeConfig): void;

    /**
     * Switch header back to edit mode
     * Removes readonly button and restores edit controls
     */
    setPageHeaderEditMode(): void;

    /**
     * Update state of a specific header item
     * @param itemId - ID of item to update
     * @param state - New state object
     */
    updateState(itemId: string, state: Record<string, any>): void;

    /**
     * Trigger share to community action
     * Delegates to privacy item's share handler
     */
    shareToCommunity(): void;
  }

  /**
   * Internal handler for managing header items
   */
  interface Handler {
    addItem(item: any, position: ItemPosition, id?: string): void;
    removeItem(position: ItemPosition): void;
    removeItemById(id: string): void;
    getItemById(id: string): any;
    setPageHeaderReadonlyMode(): void;
    setPageHeaderEditMode(): void;
    updateStateById(id: string, state: Record<string, any>): void;
  }

  /**
   * Help menu component
   */
  interface Help {
    getItem_(itemId: string): any;
    removeItem_(itemId: string): void;
  }
}

/**
 * Global constants for PageHeader plugin
 */
declare namespace HSFPConstants {
  namespace PluginType {
    const PageHeader: string;
    const UserInfo: string;
    const Welcome: string;
  }
  
  namespace Environment {
    const Default: string;
  }
}

/**
 * Global HSApp namespace extensions
 */
declare namespace HSApp {
  namespace Plugin {
    /**
     * Register a plugin with the application
     * @param pluginType - Plugin type identifier
     * @param pluginClass - Plugin class constructor
     */
    function registerPlugin(
      pluginType: string,
      pluginClass: new (...args: any[]) => IPlugin
    ): void;
  }

  namespace Config {
    /** Application version (e.g., 'ea' for early access) */
    const VERSION: string;
    /** Tenant identifier (e.g., 'fp') */
    const TENANT: string;
  }
}