/**
 * Commission Plugin for HSApp
 * Handles commission calculations and display for floorplan functionality
 */

import { Handler } from './handler';
import { HSCore } from './hs-core';

/**
 * Plugin metadata interface
 */
interface PluginMetadata {
  /** Plugin display name */
  name: string;
  /** Plugin description */
  description: string;
  /** Array of plugin dependencies */
  dependencies: string[];
}

/**
 * Plugin context passed during activation
 */
interface PluginContext {
  /** Reference to the main HSApp application instance */
  app: HSApp.Application;
}

/**
 * Plugin activation arguments
 */
interface ActivationArgs {
  /** Application context */
  app: HSApp.Application;
  [key: string]: unknown;
}

/**
 * Signal for commission updates
 */
interface UpdateCommissionSignal {
  /** Subscribe to commission update events */
  subscribe(callback: (data: unknown) => void): void;
  /** Unsubscribe from commission update events */
  unsubscribe(callback: (data: unknown) => void): void;
}

/**
 * Commission Plugin Class
 * Extends HSApp base plugin to provide commission calculation and display functionality
 */
declare class CommissionPlugin extends HSApp.Plugin.IPlugin {
  /**
   * Internal handler for commission operations
   * @private
   */
  private _handler: Handler;

  /**
   * Constructor
   * Initializes the plugin with metadata and creates a new handler instance
   */
  constructor();

  /**
   * Called when the plugin is activated
   * @param context - Plugin context containing app reference
   * @param additionalArgs - Additional activation arguments
   */
  onActive(context: PluginContext, additionalArgs?: unknown): void;

  /**
   * Called when the plugin is deactivated
   * Performs cleanup operations
   */
  onDeactive(): void;

  /**
   * Shows the commission bar UI
   */
  show(): void;

  /**
   * Hides the commission bar UI
   */
  hide(): void;

  /**
   * Gets the signal for commission update notifications
   * @returns Signal object for subscribing to commission updates
   */
  getUpdateCommissionSignal(): UpdateCommissionSignal;

  /**
   * Gets the current commission identifier
   * @returns The commission ID
   */
  getCommissionId(): string | number;

  /**
   * Gets the name of the current store
   * @returns The store name
   */
  getCurrentStoreName(): string;

  /**
   * Checks if this is an EA (Enterprise Agreement) commission
   * @returns True if EA commission, false otherwise
   */
  isEACommission(): boolean;
}

/**
 * Global HSApp namespace extensions
 */
declare global {
  namespace HSApp {
    interface Application {
      [key: string]: unknown;
    }

    namespace Plugin {
      /**
       * Base plugin interface
       */
      abstract class IPlugin {
        onActive?(context: PluginContext, ...args: unknown[]): void;
        onDeactive?(): void;
      }

      /**
       * Registers a plugin with the HSApp plugin system
       * @param pluginType - The type identifier for the plugin
       * @param pluginClass - The plugin class constructor
       * @param callback - Optional callback function after registration
       */
      function registerPlugin(
        pluginType: string,
        pluginClass: new () => IPlugin,
        callback?: () => void
      ): void;
    }
  }

  namespace HSFPConstants {
    namespace PluginType {
      /** Commission plugin type identifier */
      const Commission: string;
    }
  }
}

/**
 * Plugin registration
 * Registers the CommissionPlugin with the HSApp plugin system
 */
export function registerCommissionPlugin(): void;

export { CommissionPlugin };