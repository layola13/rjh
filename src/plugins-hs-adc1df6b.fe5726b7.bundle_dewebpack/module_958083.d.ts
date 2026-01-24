/**
 * Plugin for opening and loading local design files
 * @module OpenLocalDesignPlugin
 */

import { HSApp } from './hs-app';
import { loadUniversalDesignJson } from './utils';

/**
 * Configuration options for plugin registration
 */
interface PluginRegistrationOptions {
  /** Plugin name identifier */
  name: string;
  /** Plugin description */
  description: string;
}

/**
 * Plugin class for handling local design file operations.
 * Allows cloning and saving design files to the server.
 */
declare class OpenLocalDesignPlugin extends HSApp.Plugin.IPlugin {
  /**
   * Creates an instance of OpenLocalDesignPlugin
   */
  constructor();

  /**
   * Opens and loads a local design file
   * @param designFilePath - Path to the local design file
   * @returns Promise that resolves when the design is loaded
   * @throws Error if the design file cannot be loaded
   */
  openLocalDesign(designFilePath: string): Promise<void>;
}

/**
 * Loads universal design JSON data from a file path
 * @param filePath - Path to the design JSON file
 * @returns Promise that resolves when the design data is loaded
 */
declare function loadUniversalDesignJson(filePath: string): Promise<unknown>;

/**
 * Registers the OpenLocalDesignPlugin with the application
 * @param pluginId - Unique identifier for the plugin
 * @param pluginClass - The plugin class to register
 * @param callback - Optional callback function executed after registration
 */
declare function registerPlugin(
  pluginId: string,
  pluginClass: typeof OpenLocalDesignPlugin,
  callback?: () => void
): void;

export { OpenLocalDesignPlugin, loadUniversalDesignJson, registerPlugin };