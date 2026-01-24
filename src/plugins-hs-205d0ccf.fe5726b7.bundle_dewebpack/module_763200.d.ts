/**
 * Smart Layout Store Plugin for HSApp
 * Manages layout handler lifecycle and initialization
 */

import { Handler } from './handler';

/**
 * Application instance interface
 */
interface App {
  // Add specific app properties as needed
  [key: string]: unknown;
}

/**
 * Plugin activation event payload
 */
interface ActivationEvent {
  /** The application instance */
  app: App;
}

/**
 * Base plugin interface from HSApp framework
 */
interface IPlugin {
  /** Called when plugin becomes active */
  onActive(event: ActivationEvent): void;
  /** Called when plugin is deactivated */
  onDeactive(): void;
}

/**
 * Plugin constructor configuration
 */
interface PluginConfig {
  /** List of plugin dependencies */
  dependencies: string[];
}

/**
 * HSApp global namespace
 */
declare global {
  namespace HSApp {
    namespace Plugin {
      /** Base plugin class */
      class IPlugin {
        constructor(config: PluginConfig);
      }
      
      /**
       * Register a plugin with the HSApp framework
       * @param pluginType - The type identifier for the plugin
       * @param pluginClass - The plugin class constructor
       */
      function registerPlugin(
        pluginType: string,
        pluginClass: new () => IPlugin
      ): void;
    }
  }

  namespace HSFPConstants {
    enum PluginType {
      StoreSmartLayout = 'StoreSmartLayout'
    }
  }
}

/**
 * Smart Layout Plugin
 * Manages the smart layout handler for the application store
 */
class StoreSmartLayoutPlugin extends HSApp.Plugin.IPlugin {
  /** The layout handler instance */
  private _handler?: Handler;

  constructor() {
    super({ dependencies: [] });
  }

  /**
   * Lifecycle hook: Called when the plugin is activated
   * Initializes the layout handler
   * @param event - Activation event containing app instance
   */
  onActive(event: ActivationEvent): void {
    const { app } = event;
    this._handler = new Handler(app);
    this._handler.init();
  }

  /**
   * Lifecycle hook: Called when the plugin is deactivated
   * Cleanup operations can be performed here
   */
  onDeactive(): void {
    // Cleanup logic if needed
  }

  /**
   * Get the current handler instance
   * @returns The layout handler, or undefined if not initialized
   */
  getHandler(): Handler | undefined {
    return this._handler;
  }
}

// Register the plugin with HSApp framework
HSApp.Plugin.registerPlugin(
  HSFPConstants.PluginType.StoreSmartLayout,
  StoreSmartLayoutPlugin
);

export default StoreSmartLayoutPlugin;
export type { App, ActivationEvent, PluginConfig };