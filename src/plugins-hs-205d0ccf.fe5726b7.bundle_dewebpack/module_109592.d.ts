/**
 * Room Property Plugin Module
 * Provides functionality for managing room properties in the application
 */

/**
 * Plugin dependency types required for the Room Property plugin
 */
interface PluginDependencies {
  LeftMenu: string;
  RightMenu: string;
  ContextualTools: string;
  PropertyBar: string;
  RoomProperty: string;
}

/**
 * Plugin configuration interface
 */
interface PluginConfig {
  /** Display name of the plugin */
  name: string;
  /** Description of plugin functionality */
  description: string;
  /** Array of required plugin dependencies */
  dependencies: string[];
}

/**
 * Base plugin interface that all plugins must implement
 */
interface IPlugin {
  /**
   * Called when the plugin is activated
   * @param context - The application context
   * @param options - Plugin-specific options
   */
  onActive(context: unknown, options: unknown): void;

  /**
   * Called when the plugin is deactivated
   */
  onDeactive(): void;
}

/**
 * Room property handler interface
 */
interface IRoomPropertyHandler {
  /**
   * Initialize the room property handler
   */
  init(): void;

  /**
   * Cleanup and uninitialize the handler
   */
  _uninit(): void;
}

/**
 * Room Property Plugin
 * Manages room properties and integrates with menu and toolbar systems
 */
declare class RoomPropertyPlugin extends IPlugin {
  /** Internal handler for room property operations */
  private _handler?: IRoomPropertyHandler;

  /**
   * Creates a new instance of the Room Property plugin
   */
  constructor();

  /**
   * Activates the plugin and initializes the room property handler
   * @param context - The application context containing app state and services
   * @param options - Configuration options for the plugin
   */
  onActive(context: unknown, options: unknown): void;

  /**
   * Deactivates the plugin and cleans up resources
   */
  onDeactive(): void;
}

/**
 * Global application namespace
 */
declare namespace HSApp {
  namespace Plugin {
    /** Base plugin interface */
    export { IPlugin };

    /**
     * Registers a plugin with the application
     * @param pluginType - The type identifier for the plugin
     * @param pluginClass - The plugin class constructor
     */
    function registerPlugin(
      pluginType: string,
      pluginClass: new () => IPlugin
    ): void;
  }
}

/**
 * Global constants for plugin types
 */
declare namespace HSFPConstants {
  namespace PluginType {
    const LeftMenu: string;
    const RightMenu: string;
    const ContextualTools: string;
    const PropertyBar: string;
    const RoomProperty: string;
  }
}

export { RoomPropertyPlugin, IPlugin, PluginConfig, IRoomPropertyHandler };