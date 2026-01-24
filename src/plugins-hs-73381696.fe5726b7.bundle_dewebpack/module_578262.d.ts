/**
 * Layout Design Plugin Module
 * Provides layout design mode functionality for the HSApp plugin system
 */

import { HSApp } from './HSApp';
import { Handler } from './Handler';

/**
 * Plugin initialization options
 */
interface PluginOptions {
  /** Display name of the plugin */
  name: string;
  /** Brief description of plugin functionality */
  description: string;
  /** Array of plugin types this plugin depends on */
  dependencies: string[];
}

/**
 * Plugin activation context
 */
interface ActivationContext {
  /** The main application instance */
  app: unknown;
  [key: string]: unknown;
}

/**
 * Plugin dependencies map
 */
interface PluginDependencies {
  [key: string]: unknown;
}

/**
 * Layout Design Plugin
 * Extends the base IPlugin interface to provide layout design capabilities
 */
declare class LayoutDesignPlugin extends HSApp.Plugin.IPlugin {
  /**
   * Handler instance for managing layout design operations
   */
  private handler: Handler;

  /**
   * Creates a new LayoutDesignPlugin instance
   * Initializes with default plugin metadata and creates a Handler
   */
  constructor();

  /**
   * Called when the plugin is activated
   * Initializes the handler with application context and dependencies
   * 
   * @param context - The activation context containing app instance
   * @param dependencies - Map of dependent plugins
   */
  onActive(context: ActivationContext, dependencies: PluginDependencies): void;
}

/**
 * HSFPConstants namespace containing plugin type identifiers
 */
declare namespace HSFPConstants {
  /**
   * Standard plugin type identifiers
   */
  enum PluginType {
    /** Toolbar plugin type */
    Toolbar = 'Toolbar',
    /** Property bar plugin type */
    PropertyBar = 'PropertyBar',
    /** Layout design plugin type */
    LayoutDesign = 'LayoutDesign'
  }
}

/**
 * HSApp Plugin System
 */
declare namespace HSApp.Plugin {
  /**
   * Base plugin interface
   */
  abstract class IPlugin {
    constructor(options: PluginOptions);
    
    /**
     * Called when plugin is activated
     */
    abstract onActive(context: ActivationContext, dependencies: PluginDependencies): void;
  }

  /**
   * Registers a plugin with the plugin system
   * 
   * @param pluginType - The type identifier for the plugin
   * @param pluginClass - The plugin class constructor
   */
  function registerPlugin(
    pluginType: HSFPConstants.PluginType | string,
    pluginClass: new () => IPlugin
  ): void;
}

/**
 * Handler class for layout design operations
 */
declare namespace Handler {
  /**
   * Handler initialization options
   */
  interface InitOptions {
    /** The main application instance */
    app: unknown;
    /** Plugin dependencies */
    dependencies: PluginDependencies;
  }

  class Handler {
    /**
     * Initializes the handler with application context
     * 
     * @param options - Initialization options
     */
    init(options: InitOptions): void;
  }
}

export { LayoutDesignPlugin, HSFPConstants, HSApp, Handler };