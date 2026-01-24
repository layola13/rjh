/**
 * BOM Control Plugin Type Definitions
 * Module: module_455967
 * Original ID: 455967
 */

declare namespace HSApp.Plugin {
  /**
   * Base plugin interface that all plugins must extend
   */
  interface IPlugin {
    /**
     * Plugin dependencies
     */
    dependencies: unknown[];

    /**
     * Initialize the plugin
     */
    init(): void;

    /**
     * Called when plugin becomes active
     */
    onActive(): void;

    /**
     * Called when plugin becomes inactive
     */
    onDeactive(): void;
  }

  /**
   * Register a plugin with the application
   * @param pluginType - The type of plugin to register
   * @param pluginClass - The plugin class constructor
   */
  function registerPlugin(
    pluginType: string,
    pluginClass: new () => IPlugin
  ): void;
}

declare namespace HSFPConstants {
  /**
   * Enum of available plugin types
   */
  const enum PluginType {
    /** BOM Control plugin type identifier */
    BomControl = 'BomControl'
  }
}

declare namespace Handler {
  /**
   * Handler class for BOM control operations
   */
  class Handler {
    /**
     * Initialize the handler
     */
    init(): void;

    /**
     * Show BOM control UI or perform show operation
     * @param data - Data to display or process
     */
    show(data: unknown): void;
  }
}

/**
 * BOM Control Plugin
 * Manages Bill of Materials control functionality
 */
declare class BomControlPlugin extends HSApp.Plugin.IPlugin {
  /**
   * Internal handler for BOM operations
   */
  private _handler: Handler.Handler;

  /**
   * Creates a new BOM Control Plugin instance
   */
  constructor();

  /**
   * Initialize the BOM control plugin
   */
  init(): void;

  /**
   * Called when the plugin becomes active
   * Triggers initialization
   */
  onActive(): void;

  /**
   * Display BOM control interface
   * @param data - Data to display in the BOM control
   */
  show(data: unknown): void;

  /**
   * Called when the plugin becomes inactive
   * Cleanup operations
   */
  onDeactive(): void;
}

/**
 * Module augmentation for global HSApp namespace
 */
declare global {
  namespace HSApp {
    namespace Plugin {
      interface IPlugin {
        dependencies: unknown[];
        init(): void;
        onActive(): void;
        onDeactive(): void;
      }

      function registerPlugin(
        pluginType: string,
        pluginClass: new () => IPlugin
      ): void;
    }
  }

  namespace HSFPConstants {
    const enum PluginType {
      BomControl = 'BomControl'
    }
  }
}

export {};