/**
 * StartUpAction Plugin Module
 * 
 * This module defines a plugin for handling startup actions in the HSApp framework.
 * It manages the initialization sequence and coordinates with other dependent plugins
 * like Welcome, DesignTemplates, UnderlayImg, and WallAutoBuilder.
 */

import { Handler } from './Handler';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * Configuration options for the StartUpAction plugin
 */
interface PluginConfig {
  /** Human-readable name of the plugin */
  name: string;
  /** Description of the plugin's functionality */
  description: string;
  /** Array of plugin types that must be loaded before this plugin */
  dependencies: string[];
}

/**
 * Action execution context
 */
interface ActionContext {
  [key: string]: unknown;
}

/**
 * Action parameters passed during execution
 */
interface ActionParams {
  [key: string]: unknown;
}

/**
 * StartUpAction Plugin
 * 
 * Manages the application startup sequence and coordinates initial actions.
 * This plugin depends on several other plugins and ensures they are loaded
 * in the correct order based on the tenant configuration.
 * 
 * @extends HSApp.Plugin.IPlugin
 */
export declare class StartUpActionPlugin extends HSApp.Plugin.IPlugin {
  /**
   * Internal handler for managing plugin lifecycle and action execution
   * @private
   */
  private _handler: Handler;

  /**
   * Creates a new instance of StartUpActionPlugin
   * 
   * The plugin is configured with dependencies that vary based on tenant:
   * - For "fp" tenant: includes DesignTemplates plugin
   * - For other tenants: excludes DesignTemplates plugin
   */
  constructor();

  /**
   * Called when the plugin becomes active
   * 
   * @param context - The activation context
   * @param params - Additional activation parameters
   */
  onActive(context: ActionContext, params: ActionParams): void;

  /**
   * Called when the plugin becomes inactive
   * 
   * @param context - The deactivation context
   */
  onDeactive(context: ActionContext): void;

  /**
   * Executes a specific action with the provided parameters
   * 
   * @param context - The execution context
   * @param params - Parameters for the action
   */
  executeAction(context: ActionContext, params: ActionParams): void;

  /**
   * Marks the current action as complete
   * Triggers any necessary cleanup or follow-up actions
   */
  completeAction(): void;

  /**
   * Cancels the current action
   * Reverts any partial changes and performs cleanup
   */
  cancelAction(): void;
}

/**
 * Plugin registration
 * Registers the StartUpActionPlugin with the HSApp plugin system
 */
declare module './HSApp' {
  namespace HSApp.Plugin {
    /**
     * Registers a plugin with the specified type identifier
     * 
     * @param pluginType - The unique identifier for this plugin type
     * @param pluginClass - The plugin class constructor
     */
    function registerPlugin(
      pluginType: typeof HSFPConstants.PluginType.StartUpAction,
      pluginClass: typeof StartUpActionPlugin
    ): void;
  }
}

/**
 * Plugin type constants
 */
declare module './HSFPConstants' {
  namespace HSFPConstants.PluginType {
    /** StartUpAction plugin type identifier */
    const StartUpAction: string;
    /** Welcome plugin type identifier */
    const Welcome: string;
    /** DesignTemplates plugin type identifier */
    const DesignTemplates: string;
    /** UnderlayImg plugin type identifier */
    const UnderlayImg: string;
    /** WallAutoBuilder plugin type identifier */
    const WallAutoBuilder: string;
  }
}

/**
 * Application configuration
 */
declare module './HSApp' {
  namespace HSApp.Config {
    /** Current tenant identifier (e.g., "fp" for floor planner) */
    const TENANT: string;
  }
}