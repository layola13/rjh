/**
 * Kitchen Obstacle Plugin Module
 * Handles obstacle processing in kitchen design environments
 */

/**
 * Plugin handler for kitchen obstacle operations
 */
declare class Handler {
  /**
   * Initialize the handler with application context
   * @param context - Application context or scene reference
   * @param options - Configuration options for the handler
   */
  init(context: unknown, options: unknown): void;

  /**
   * Uninitialize and cleanup handler resources
   */
  uninit(): void;
}

/**
 * Plugin configuration interface
 */
interface IPluginConfig {
  /** Display name of the plugin */
  name: string;
  /** Description of plugin functionality */
  description: string;
  /** List of required plugin dependencies */
  dependencies: string[];
}

/**
 * Base plugin interface
 */
interface IPlugin {
  /**
   * Called when the plugin is activated
   * @param context - Application context
   * @param options - Activation options
   */
  onActive(context: unknown, options: unknown): void;

  /**
   * Called when the plugin is deactivated
   */
  onDeactive(): void;
}

/**
 * Plugin type constants
 */
declare enum PluginType {
  WallDecoration = "WallDecoration",
  ContextualTools = "ContextualTools",
  PropertyBar = "PropertyBar",
  Catalog = "Catalog",
  CustomizedModeling = "CustomizedModeling",
  MaterialImage = "MaterialImage",
  LeftMenu = "LeftMenu",
  RightMenu = "RightMenu",
  KitchenObstacle = "KitchenObstacle"
}

/**
 * Kitchen Obstacle Plugin
 * Manages obstacle detection and processing in kitchen design scenarios
 * Depends on multiple core plugins for wall decoration, tools, catalog, and UI components
 */
declare class KitchenObstaclePlugin implements IPlugin {
  /** Internal handler instance for obstacle operations */
  private _handler: Handler;

  /**
   * Constructor initializes plugin with configuration
   */
  constructor();

  /**
   * Activates the plugin and initializes the handler
   * @param context - Application or scene context
   * @param options - Plugin activation options
   */
  onActive(context: unknown, options: unknown): void;

  /**
   * Deactivates the plugin and cleans up resources
   */
  onDeactive(): void;
}

/**
 * Global HSApp namespace
 */
declare namespace HSApp.Plugin {
  /**
   * Base plugin interface
   */
  export { IPlugin };

  /**
   * Registers a plugin with the application
   * @param pluginType - Type identifier for the plugin
   * @param pluginClass - Plugin class constructor
   */
  export function registerPlugin(
    pluginType: PluginType,
    pluginClass: new () => IPlugin
  ): void;
}

/**
 * Global HSFPConstants namespace
 */
declare namespace HSFPConstants {
  /**
   * Plugin type enumeration
   */
  export { PluginType };
}

export { KitchenObstaclePlugin, Handler, IPlugin, IPluginConfig, PluginType };