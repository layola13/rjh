/**
 * ShareCase Plugin Module
 * Provides functionality for sharing design cases via URL
 */

declare namespace HSApp.Plugin {
  /**
   * Base interface for all plugins
   */
  interface IPlugin {
    /** Plugin name identifier */
    name: string;
    /** Human-readable description of the plugin's purpose */
    description: string;
    /** List of plugin dependencies required for this plugin to function */
    dependencies: string[];
    
    /**
     * Called when the plugin is activated
     * @param event - Activation event data
     * @param context - Plugin execution context
     */
    onActive(event: unknown, context: unknown): void;
  }

  /**
   * Plugin for sharing design case URLs
   * Enables users to generate and copy shareable links for their designs
   */
  class ShareCasePlugin extends IPlugin {
    /** Plugin name: "share case" */
    name: "share case";
    /** Plugin description */
    description: "share current case url";
    /** No dependencies required */
    dependencies: [];

    /**
     * Internal handler managing share case operations
     */
    private handler: ShareCaseHandler;

    /**
     * Creates a new ShareCase plugin instance
     */
    constructor();

    /**
     * Invoked when plugin becomes active in the application
     * @param event - Activation event containing trigger information
     * @param context - Execution context with app state
     */
    onActive(event: unknown, context: unknown): void;

    /**
     * Hides the share case dialog UI
     */
    hideShareCaseDialog(): void;

    /**
     * Displays the share case dialog UI to the user
     */
    showShareCaseDialog(): void;

    /**
     * Copies the design URL to system clipboard
     * Generates tenant-specific URLs (different for "fp" tenant vs others)
     * @returns Promise resolving when copy operation completes
     */
    copyDesignLink(): Promise<void>;

    /**
     * Initiates the case sharing workflow
     */
    shareCase(): void;
  }

  /**
   * Registers a plugin with the plugin system
   * @param pluginType - The type identifier for the plugin
   * @param pluginClass - The plugin class constructor
   */
  function registerPlugin(
    pluginType: string,
    pluginClass: new () => IPlugin
  ): void;
}

declare namespace HSFPConstants {
  /**
   * Enumeration of available plugin types
   */
  enum PluginType {
    /** Share case functionality plugin */
    ShareCase = "ShareCase"
  }
}

declare namespace HSApp {
  namespace App {
    /**
     * Retrieves the singleton application instance
     * @returns The main application object
     */
    function getApp(): AppInstance;
  }

  /**
   * Main application instance interface
   */
  interface AppInstance {
    /** Design metadata manager */
    designMetadata: DesignMetadata;
  }

  /**
   * Manages design metadata key-value storage
   */
  interface DesignMetadata {
    /**
     * Retrieves a metadata value by key
     * @param key - The metadata key to fetch
     * @returns The stored value
     */
    get(key: string): string;
  }

  /**
   * Application configuration settings
   */
  namespace Config {
    /** Current tenant identifier (e.g., "fp" for partner tenant) */
    const TENANT: string;
  }

  /**
   * Partner-specific configuration
   */
  namespace PartnerConfig {
    /** Base URL for the user center service */
    const USERCENTER_URL: string;
  }
}

/**
 * Internal handler for share case operations
 */
declare class ShareCaseHandler {
  /**
   * Creates a new share case handler
   */
  constructor();

  /**
   * Hides the share case view component
   */
  hideShareCaseView(): void;

  /**
   * Shows the share case view component
   */
  showShareCaseView(): void;

  /**
   * Executes the case sharing logic
   */
  shareCase(): void;
}

/**
 * Clipboard utility functions
 */
declare namespace ClipboardUtil {
  /**
   * Copies text to the system clipboard
   * @param text - The text content to copy
   * @returns Promise resolving to true if successful, false otherwise
   */
  function copyText(text: string): Promise<boolean>;
}

declare module "*/module_347913" {
  export {};
}