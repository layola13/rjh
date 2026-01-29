/**
 * HomeGPT Plugin Module
 * Provides AI assistant functionality for home design within the HSApp plugin system
 */

import { HSApp } from './core';
import { Handler } from './handler';

/**
 * Interface for plugin configuration
 */
interface PluginConfig {
  /** The display name of the plugin */
  name: string;
  /** A brief description of the plugin's purpose */
  description: string;
  /** Array of plugin dependencies that must be loaded first */
  dependencies: string[];
}

/**
 * Interface for signal hook functionality
 */
interface SignalHook {
  // Define signal hook methods based on your application's needs
  [key: string]: unknown;
}

/**
 * Base plugin interface that all HSApp plugins must implement
 */
declare abstract class IPlugin {
  /**
   * Called when the plugin becomes active
   * @param context - The activation context containing initialization data
   */
  abstract onActive(context: unknown): void;

  /**
   * Called when the plugin is deactivated
   */
  abstract onDeactive(): void;

  /**
   * Retrieves the signal hook for inter-plugin communication
   * @returns The signal hook instance
   */
  abstract getSignalHook(): SignalHook;

  /**
   * Queries whether the plugin can be safely terminated
   * @returns True if the plugin can terminate, false otherwise
   */
  abstract queryTerminate(): boolean;
}

/**
 * HomeGPT Plugin Class
 * Implements AI-powered home design assistance as an HSApp plugin
 * 
 * @extends IPlugin
 */
declare class HomeGPTPlugin extends IPlugin {
  /** Internal handler managing the plugin's core functionality */
  private handler: Handler;

  /**
   * Constructs a new HomeGPT plugin instance
   * Initializes with predefined configuration and creates a handler
   */
  constructor();

  /**
   * Activates the plugin with the given context
   * @param context - Activation context passed from the plugin system
   */
  onActive(context: unknown): void;

  /**
   * Deactivates the plugin and cleans up resources
   */
  onDeactive(): void;

  /**
   * Returns the signal hook for communication with other plugins
   * @returns The handler's signal hook instance
   */
  getSignalHook(): SignalHook;

  /**
   * Checks if the plugin can safely terminate
   * @returns True if termination is allowed, false otherwise
   */
  queryTerminate(): boolean;
}

/**
 * Plugin registration
 * Registers HomeGPTPlugin with the HSApp plugin system under the HomeGPT type
 */
declare namespace HSApp.Plugin {
  /**
   * Registers a plugin class with the plugin system
   * @param pluginType - The type identifier for the plugin
   * @param pluginClass - The plugin class constructor
   */
  function registerPlugin(
    pluginType: string,
    pluginClass: typeof HomeGPTPlugin
  ): void;
}

/**
 * Global constants for plugin types
 */
declare namespace HSFPConstants {
  enum PluginType {
    HomeGPT = 'HomeGPT'
  }
}

export { HomeGPTPlugin, IPlugin, PluginConfig, SignalHook };