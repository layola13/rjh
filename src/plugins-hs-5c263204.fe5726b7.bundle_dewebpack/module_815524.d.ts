/**
 * Floorplan Mirror Plugin Module
 * Provides functionality to mirror floorplan layouts
 */

declare namespace HSApp.Plugin {
  /**
   * Base interface for HSApp plugins
   */
  interface IPlugin {
    /**
     * Called when the plugin is activated
     * @param app - The application instance
     * @param dependencies - Plugin dependencies
     */
    onActive(app: any, dependencies: any): void;

    /**
     * Called when the plugin is deactivated
     */
    onDeactive(): void;
  }

  /**
   * Plugin registration function
   * @param pluginType - The type identifier for the plugin
   * @param pluginClass - The plugin class constructor
   */
  function registerPlugin(
    pluginType: HSFPConstants.PluginType,
    pluginClass: new () => IPlugin
  ): void;
}

declare namespace HSFPConstants {
  /**
   * Enumeration of available plugin types
   */
  enum PluginType {
    Toolbar = "Toolbar",
    FloorplanMirror = "FloorplanMirror"
  }
}

declare namespace MirrorPlugin {
  /**
   * Configuration options for plugin initialization
   */
  interface PluginConfig {
    /** Plugin display name */
    name: string;
    /** Plugin description */
    description: string;
    /** Array of required plugin dependencies */
    dependencies: HSFPConstants.PluginType[];
  }

  /**
   * Initialization parameters for the mirror handler
   */
  interface HandlerInitParams {
    /** The main application instance */
    app: any;
    /** Plugin dependencies */
    dependencies: any;
  }

  /**
   * Handler class for floorplan mirroring operations
   */
  class Handler {
    /**
     * Initialize the mirror handler
     * @param params - Initialization parameters
     */
    init(params: HandlerInitParams): void;

    /**
     * Execute floorplan mirroring operation
     * @param mirrorAxis - The axis along which to mirror (e.g., 'x' or 'y')
     * @param options - Additional mirroring options
     */
    _mirrorfloorplan(mirrorAxis: string, options: any): void;

    /**
     * Cleanup and uninitialize the handler
     */
    uninit(): void;
  }
}

/**
 * Floorplan Mirror Plugin
 * Extends the base IPlugin interface to provide mirroring functionality
 */
declare class FloorplanMirrorPlugin extends HSApp.Plugin.IPlugin {
  /**
   * Internal handler instance for mirror operations
   * @private
   */
  private _handler: MirrorPlugin.Handler;

  /**
   * Creates a new instance of the FloorplanMirrorPlugin
   */
  constructor();

  /**
   * Activates the plugin with the given application context
   * @param app - The application instance
   * @param dependencies - Plugin dependencies provided by the plugin system
   */
  onActive(app: any, dependencies: any): void;

  /**
   * Performs a mirror operation on the floorplan
   * @param mirrorAxis - The axis to mirror along ('x' for horizontal, 'y' for vertical)
   * @param options - Additional options for the mirror operation
   */
  mirrorfloorplan(mirrorAxis: string, options: any): void;

  /**
   * Deactivates the plugin and cleans up resources
   */
  onDeactive(): void;
}

export { FloorplanMirrorPlugin };
export as namespace FloorplanMirrorPlugin;