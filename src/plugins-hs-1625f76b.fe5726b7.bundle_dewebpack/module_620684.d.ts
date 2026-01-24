/**
 * Compass Plugin Module
 * Provides compass functionality for floorplan navigation
 */

import { HSApp } from './app-types';

/**
 * Plugin metadata interface
 */
interface PluginMetadata {
  /** Display name of the plugin */
  name: string;
  /** Brief description of plugin functionality */
  description: string;
  /** List of plugin dependencies */
  dependencies: string[];
}

/**
 * Compass handler initialization options
 */
interface CompassHandlerInitOptions {
  /** Application instance */
  app: unknown;
}

/**
 * Compass handler class responsible for compass rendering and interaction
 */
declare class CompassHandler {
  /**
   * Initialize the compass handler
   * @param options - Initialization options containing app reference
   */
  init(options: CompassHandlerInitOptions): void;

  /**
   * Show the compass UI element
   */
  show(): void;

  /**
   * Hide the compass UI element
   */
  hide(): void;

  /**
   * Configure automatic show/hide behavior
   * @param enabled - Whether to enable auto show/hide
   */
  setAutoShowHide(enabled: boolean): void;

  /**
   * Get current compass rotation degree
   * @returns Current rotation angle in degrees (0-360)
   */
  getDegree(): number;
}

/**
 * Plugin activation context
 */
interface PluginActivationContext {
  /** Application instance */
  app: unknown;
}

/**
 * Compass Plugin for floorplan navigation
 * Extends the base plugin interface to provide compass functionality
 */
declare class CompassPlugin extends HSApp.Plugin.IPlugin {
  /**
   * Internal compass handler instance
   * @private
   */
  private handler: CompassHandler;

  /**
   * Creates a new CompassPlugin instance
   */
  constructor();

  /**
   * Called when the plugin is activated
   * @param context - Activation context containing app reference
   * @param options - Additional activation options
   */
  onActive(context: PluginActivationContext, options?: unknown): void;

  /**
   * Called when the plugin is deactivated
   */
  onDeactive(): void;

  /**
   * Show the compass UI
   */
  show(): void;

  /**
   * Hide the compass UI
   */
  hide(): void;

  /**
   * Enable or disable automatic show/hide behavior
   * @param enabled - True to enable auto show/hide, false to disable
   */
  setAutoShowHide(enabled: boolean): void;

  /**
   * Get the current compass rotation degree
   * @returns Current rotation angle in degrees (0-360)
   */
  getDegree(): number;
}

/**
 * Global plugin type constants
 */
declare const HSFPConstants: {
  PluginType: {
    /** Compass plugin type identifier */
    Compass: string;
  };
};

/**
 * Register the compass plugin with the application
 */
declare function registerCompassPlugin(): void;

export { CompassPlugin, CompassHandler, PluginMetadata, CompassHandlerInitOptions, PluginActivationContext };