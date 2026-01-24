/**
 * Single Device Login Plugin
 * 
 * This plugin ensures only one device can be logged in at a time.
 * When a user logs in from a new device, the previous session is terminated.
 */

import { HSApp } from './hs-app';
import { Handler } from './handler';

/**
 * Plugin configuration interface
 */
interface PluginConfig {
  /** Plugin display name */
  name: string;
  /** Plugin description */
  description: string;
  /** Array of plugin type dependencies required for this plugin to function */
  dependencies: string[];
}

/**
 * Message Center plugin interface
 * Used for handling device login messages and notifications
 */
interface MessageCenterPlugin {
  /** Send notification about device login conflict */
  notify(message: string): void;
  /** Subscribe to login events */
  subscribe(event: string, callback: Function): void;
}

/**
 * Plugin activation context containing dependent plugins
 */
interface ActivationContext {
  [HSFPConstants.PluginType.MessageCenter]: MessageCenterPlugin;
  [key: string]: unknown;
}

/**
 * Single Device Login Plugin
 * 
 * Manages single device login restrictions by:
 * - Monitoring login events across devices
 * - Notifying users of concurrent login attempts
 * - Terminating previous sessions when new device logs in
 * 
 * @extends HSApp.Plugin.IPlugin
 */
declare class SingleDeviceLoginPlugin extends HSApp.Plugin.IPlugin {
  /**
   * Handler instance for managing device login logic
   */
  readonly handler: Handler;

  /**
   * Creates a new Single Device Login plugin instance
   * Initializes with plugin metadata and handler
   */
  constructor();

  /**
   * Called when the plugin is activated
   * Initializes the handler with the MessageCenter plugin dependency
   * 
   * @param context - Plugin context (unused in this implementation)
   * @param plugins - Map of activated dependent plugins
   */
  onActive(context: unknown, plugins: ActivationContext): void;

  /**
   * Called when the plugin is deactivated
   * Performs cleanup of resources and event listeners
   */
  onDeactive(): void;
}

/**
 * Plugin constants namespace
 */
declare namespace HSFPConstants {
  /**
   * Available plugin types
   */
  enum PluginType {
    /** Message Center plugin for notifications */
    MessageCenter = 'MessageCenter',
    /** Single Device Login enforcement plugin */
    SingleDeviceLogin = 'SingleDeviceLogin'
  }
}

/**
 * Register the Single Device Login plugin with the HSApp plugin system
 */
declare function registerSingleDeviceLoginPlugin(): void;

export { SingleDeviceLoginPlugin, PluginConfig, MessageCenterPlugin, ActivationContext };