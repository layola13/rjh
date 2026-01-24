/**
 * Content Tag Plugin Module
 * Provides content tagging functionality for floorplan applications
 * @module ContentTagPlugin
 */

import { Handler } from './Handler';

/**
 * Plugin configuration interface
 */
interface IPluginConfig {
  /** Plugin display name */
  name: string;
  /** Plugin description */
  description: string;
  /** Array of required plugin dependencies */
  dependencies: string[];
}

/**
 * Floorplan initialization parameters
 */
interface IFloorplanParams {
  // Define specific properties based on your application needs
  [key: string]: unknown;
}

/**
 * Plugin context/editor reference
 */
interface IPluginContext {
  // Define specific properties based on your application needs
  [key: string]: unknown;
}

/**
 * Plugin options/configuration
 */
interface IPluginOptions {
  // Define specific properties based on your application needs
  [key: string]: unknown;
}

/**
 * Base plugin interface that all plugins must implement
 */
declare abstract class IPlugin {
  /**
   * Called when the plugin becomes active
   * @param context - The plugin context or editor instance
   * @param options - Plugin-specific options
   */
  abstract onActive(context: IPluginContext, options: IPluginOptions): void;

  /**
   * Called when the plugin is deactivated
   */
  abstract onDeactive(): void;

  /**
   * Initialize the floorplan with plugin-specific logic
   * @param floorplan - The floorplan instance
   * @param context - The plugin context
   * @param options - Initialization options
   */
  abstract initFloorplan(
    floorplan: IFloorplanParams,
    context: IPluginContext,
    options: IPluginOptions
  ): void;
}

/**
 * Content Tag Plugin
 * Manages content tagging functionality within the floorplan editor
 * @extends IPlugin
 */
declare class ContentTagPlugin extends IPlugin {
  /**
   * Internal handler for content tag operations
   * @private
   */
  private _handler: Handler;

  /**
   * Creates an instance of ContentTagPlugin
   * Initializes with plugin metadata and creates a new Handler instance
   */
  constructor();

  /**
   * Activates the plugin and initializes the handler
   * @param context - The plugin context or editor instance
   * @param options - Plugin-specific options
   */
  onActive(context: IPluginContext, options: IPluginOptions): void;

  /**
   * Deactivates the plugin and performs cleanup
   */
  onDeactive(): void;

  /**
   * Initializes the floorplan with content tag capabilities
   * @param floorplan - The floorplan instance to initialize
   * @param context - The plugin context
   * @param options - Initialization options
   */
  initFloorplan(
    floorplan: IFloorplanParams,
    context: IPluginContext,
    options: IPluginOptions
  ): void;
}

/**
 * Global HSApp namespace
 */
declare namespace HSApp {
  namespace Plugin {
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
 * Global constants namespace
 */
declare namespace HSFPConstants {
  /**
   * Plugin type identifiers
   */
  enum PluginType {
    /** Content tagging plugin */
    ContentTag = 'ContentTag',
    /** Contextual tools plugin */
    ContextualTools = 'ContextualTools',
    /** Property bar plugin */
    PropertyBar = 'PropertyBar',
    /** Common UI components plugin */
    CommonUI = 'CommonUI',
  }
}

export { ContentTagPlugin, IPlugin, IPluginConfig, IPluginContext, IPluginOptions, IFloorplanParams };