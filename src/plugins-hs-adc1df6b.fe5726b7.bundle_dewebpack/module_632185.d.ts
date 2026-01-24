/**
 * Performance Optimizer Plugin for HSApp
 * Optimizes performance when working under 2D view
 */

declare namespace HSApp.Plugin.PerformanceOptimizer {
  /**
   * Plugin configuration options
   */
  interface PluginConfig {
    /** Plugin display name */
    name: string;
    /** Plugin description */
    description: string;
    /** List of required plugin dependencies */
    dependencies: string[];
  }

  /**
   * Plugin activation context
   */
  interface ActivationContext {
    /** Main application instance */
    app: HSApp.Application;
  }

  /**
   * Performance optimization handler
   * Manages the core optimization logic for 2D view performance
   */
  class Handler {
    /**
     * Initialize the performance handler
     * @param app - Main application instance
     * @param context - Additional context data
     * @param storage - Local storage instance for persisting settings
     */
    init(
      app: HSApp.Application,
      context: unknown,
      storage: HSApp.Util.Storage
    ): void;
  }

  /**
   * Performance Optimizer Plugin
   * Extends the base IPlugin interface to provide performance optimization
   * capabilities specifically for 2D view operations
   */
  class Plugin extends HSApp.Plugin.IPlugin {
    /** Internal performance optimization handler */
    private _handler: Handler;

    /** Local storage instance for plugin settings */
    private _localStorage: HSApp.Util.Storage;

    /**
     * Creates a new Performance Optimizer Plugin instance
     */
    constructor();

    /**
     * Called when the plugin is activated
     * Initializes the performance handler with application context and storage
     * @param context - Activation context containing app instance
     * @param data - Additional activation data
     */
    onActive(context: ActivationContext, data: unknown): void;

    /**
     * Called when the plugin is deactivated
     * Cleanup operations should be performed here
     */
    onDeactive(): void;
  }
}

/**
 * Registered plugin identifier
 */
declare const PERFORMANCE_OPTIMIZER_PLUGIN_ID = "hsw.plugin.performanceoptimizer.Plugin";

declare module HSApp.Plugin {
  /**
   * Register a plugin with the HSApp plugin system
   * @param pluginId - Unique plugin identifier
   * @param pluginClass - Plugin class constructor
   */
  function registerPlugin(
    pluginId: string,
    pluginClass: typeof HSApp.Plugin.IPlugin
  ): void;
}

declare module HSApp.Util {
  /**
   * Local storage wrapper utility
   * Provides persistent storage with namespacing
   */
  class Storage {
    /**
     * Create a new storage instance with a namespace
     * @param namespace - Storage namespace for isolating data
     */
    constructor(namespace: string);
  }
}

declare module HSApp {
  /**
   * Main application interface
   */
  interface Application {
    /** Command manager for application operations */
    cmdManager: unknown;
  }
}

declare namespace HSFPConstants {
  /**
   * Available plugin types in the system
   */
  enum PluginType {
    /** Contextual tools plugin type */
    ContextualTools = "ContextualTools"
  }
}