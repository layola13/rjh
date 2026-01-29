/**
 * HSApp Home Plugin - HID/PCVR Entry Point
 * Provides VR functionality integration with toolbar
 */

declare namespace HSApp.Plugin.HID {
  /**
   * Plugin configuration for Home/HID entry
   */
  interface PluginConfig {
    /** Display name of the plugin */
    name: string;
    /** Brief description of plugin functionality */
    description: string;
    /** List of required plugin dependencies */
    dependencies: string[];
  }

  /**
   * Toolbar item configuration
   */
  interface ToolbarItemConfig {
    /** Item type (button, divider, etc.) */
    type: 'button' | 'divider' | 'separator';
    /** Tooltip text displayed on hover */
    tooltip?: string;
    /** Display label for the item */
    label?: string;
    /** Unique identifier for the item */
    name: string;
    /** Display order in toolbar */
    order: number;
    /** Path to icon resource */
    icon?: string;
    /** Click event handler */
    onclick?: () => void;
  }

  /**
   * Toolbar plugin interface
   */
  interface IToolbarPlugin {
    /**
     * Add a new item to the toolbar
     * @param config - Configuration object for the toolbar item
     */
    addItem(config: ToolbarItemConfig): void;
  }

  /**
   * Plugin dependencies map
   */
  interface PluginDependencies {
    [HSFPConstants.PluginType.Toolbar]: IToolbarPlugin;
    [key: string]: unknown;
  }

  /**
   * Application parameters
   */
  interface AppParams {
    /** PCVR mode flag */
    _pcvr?: string;
    [key: string]: unknown;
  }

  /**
   * Floor plan interface
   */
  interface IFloorPlan {
    /**
     * Serialize floor plan to string format
     * @returns Serialized design data
     */
    saveToString(): string;
  }

  /**
   * HSApp application interface
   */
  interface IApp {
    /** Application parameters */
    appParams: AppParams;
    /** Floor plan instance */
    floorplan: IFloorPlan;
  }

  /**
   * Main HID Plugin class
   * Integrates VR functionality with HSApp toolbar
   */
  class Plugin extends HSApp.Plugin.IPlugin {
    /** Reference to toolbar plugin instance */
    private toolbarPlugin: IToolbarPlugin;

    /**
     * Creates an instance of the HID Plugin
     * Initializes plugin configuration with name, description, and dependencies
     */
    constructor();

    /**
     * Called when plugin is activated
     * @param config - Plugin configuration
     * @param dependencies - Map of dependent plugins
     */
    onActive(config: unknown, dependencies: PluginDependencies): void;

    /**
     * Called when plugin is deactivated
     * Cleanup logic should be implemented here
     */
    onDeactive(): void;

    /**
     * Called after design is saved
     * Sends design data to local WebSocket server for VR processing
     */
    onPostDesign(): void;

    /**
     * Injects HID-specific buttons into the toolbar
     * Adds eVR button and divider to the application toolbar
     * @private
     */
    private _injectToolbar(): void;
  }
}

declare namespace HSApp {
  namespace Plugin {
    /**
     * Base plugin interface
     * All HSApp plugins should extend this interface
     */
    abstract class IPlugin {
      /** Plugin configuration */
      protected config?: {
        name: string;
        description: string;
        dependencies: string[];
      };

      /**
       * Plugin activation lifecycle hook
       * @param config - Plugin configuration
       * @param dependencies - Dependent plugins
       */
      abstract onActive(config: unknown, dependencies: Record<string, unknown>): void;

      /**
       * Plugin deactivation lifecycle hook
       */
      abstract onDeactive(): void;
    }

    /**
     * Register a plugin with the HSApp system
     * @param identifier - Unique plugin identifier
     * @param pluginClass - Plugin class constructor
     */
    function registerPlugin(
      identifier: string,
      pluginClass: new () => IPlugin
    ): void;
  }

  namespace App {
    /**
     * Get the singleton application instance
     * @returns The main HSApp application instance
     */
    function getApp(): HSApp.Plugin.HID.IApp;
  }
}

declare namespace HSFPConstants {
  /**
   * Plugin type identifiers
   */
  enum PluginType {
    /** Toolbar plugin type */
    Toolbar = 'Toolbar'
  }
}

/**
 * WebSocket API for VR communication
 * Standard WebSocket interface for sending design data to local VR server
 */
declare class WebSocket {
  /**
   * Create a WebSocket connection
   * @param url - WebSocket server URL (e.g., ws://127.0.0.1:8090)
   */
  constructor(url: string);

  /**
   * Event handler called when connection is opened
   */
  onopen: ((event: Event) => void) | null;

  /**
   * Event handler called on connection error
   */
  onerror: ((event: Event) => void) | null;

  /**
   * Event handler called when connection is closed
   */
  onclose: ((event: CloseEvent) => void) | null;

  /**
   * Event handler called when message is received
   */
  onmessage: ((event: MessageEvent) => void) | null;

  /**
   * Send data through the WebSocket connection
   * @param data - Data to send
   */
  send(data: string | ArrayBuffer | Blob): void;

  /**
   * Close the WebSocket connection
   * @param code - Optional close code
   * @param reason - Optional close reason
   */
  close(code?: number, reason?: string): void;
}

export {};