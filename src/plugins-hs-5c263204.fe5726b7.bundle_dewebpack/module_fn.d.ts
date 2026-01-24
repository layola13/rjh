/**
 * Image Browser Environment Detection Module
 * 
 * Checks if the application is currently running in an image browser environment
 * and returns the current selection state.
 * 
 * @module ImageBrowserDetection
 * @originalId fn
 */

/**
 * Plugin manager interface for managing application plugins
 */
interface PluginManager {
  /**
   * Retrieves a plugin by its identifier
   * @param pluginId - The unique identifier of the plugin
   * @returns The plugin instance or undefined if not found
   */
  getPlugin(pluginId: string): ImageBrowserPlugin | undefined;
}

/**
 * Image Browser Plugin interface
 */
interface ImageBrowserPlugin {
  /**
   * Checks if the application is currently in image browser environment
   * @returns true if in image browser environment, false otherwise
   */
  getIsInImageBrowserEnv(): boolean;
}

/**
 * Application instance interface
 */
interface App {
  /** Plugin manager instance */
  pluginManager: PluginManager;
}

/**
 * HSApp global namespace
 */
declare namespace HSApp {
  namespace App {
    /**
     * Gets the current application instance
     * @returns The application instance
     */
    function getApp(): App;
  }
}

/**
 * Selection state returned when in image browser environment
 */
interface ImageBrowserState {
  /** Current selection (undefined when no selection exists) */
  selected: undefined;
}

/**
 * Detects if the application is running in image browser environment
 * and returns the selection state.
 * 
 * @returns Selection state object if in image browser environment, undefined otherwise
 */
declare function detectImageBrowserEnvironment(): ImageBrowserState | undefined;

export { detectImageBrowserEnvironment, ImageBrowserState, ImageBrowserPlugin, PluginManager, App };