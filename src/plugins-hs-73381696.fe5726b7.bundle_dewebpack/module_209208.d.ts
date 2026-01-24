/**
 * Material Image Plugin Module
 * Handles material image management including seam filler functionality
 */

import { IPlugin } from 'HSApp/Plugin';
import { App } from 'HSApp';

/**
 * Plugin configuration interface
 */
interface PluginConfig {
  /** Plugin display name */
  name: string;
  /** Plugin description */
  description: string;
  /** List of plugin dependencies */
  dependencies: string[];
}

/**
 * Handler initialization options
 */
interface HandlerInitOptions {
  /** Application instance */
  app: App;
}

/**
 * Material image handler interface
 */
interface MaterialImageHandler {
  /**
   * Initialize the handler
   * @param options - Initialization options
   */
  init(options: HandlerInitOptions): void;

  /**
   * Get material URL with seam filler applied
   * @param param1 - First parameter (material identifier or configuration)
   * @param param2 - Second parameter (options or settings)
   * @param param3 - Third parameter (additional configuration)
   * @param param4 - Fourth parameter (extra options)
   * @returns Material URL with seam filler
   */
  getMaterialUrlWithSeamFiller(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown
  ): string;

  /**
   * Get seam image URL
   * @param param1 - First parameter (seam identifier or configuration)
   * @param param2 - Second parameter (options or settings)
   * @param param3 - Third parameter (additional configuration)
   * @returns Seam image URL
   */
  getSeamImageUrl(param1: unknown, param2: unknown, param3: unknown): string;

  /**
   * Add leading zero to number
   * @param value - Value to format
   * @returns Formatted value with leading zero
   */
  addPreZero(value: number | string): string;

  /**
   * Reset material URL cache
   */
  resetMaterialUrlCache(): void;
}

/**
 * Event context for plugin activation
 */
interface ActivationEvent {
  /** Application instance */
  app: App;
}

/**
 * Material Image Plugin
 * Manages material image issues including seam filler functionality
 */
export declare class MaterialImagePlugin extends IPlugin {
  /** Internal handler for material image operations */
  private _handler: MaterialImageHandler;

  /**
   * Creates a new Material Image Plugin instance
   */
  constructor();

  /**
   * Called when the plugin is activated
   * @param event - Activation event context
   * @param param2 - Additional activation parameter
   */
  onActive(event: ActivationEvent, param2: unknown): void;

  /**
   * Called when the plugin is deactivated
   */
  onDeactive(): void;

  /**
   * Get material URL with seam filler applied
   * @param param1 - First parameter (material identifier or configuration)
   * @param param2 - Second parameter (options or settings)
   * @param param3 - Third parameter (additional configuration)
   * @param param4 - Fourth parameter (extra options)
   * @returns Material URL with seam filler
   */
  getMaterialUrlWithSeamFiller(
    param1: unknown,
    param2: unknown,
    param3: unknown,
    param4: unknown
  ): string;

  /**
   * Get seam image URL
   * @param param1 - First parameter (seam identifier or configuration)
   * @param param2 - Second parameter (options or settings)
   * @param param3 - Third parameter (additional configuration)
   * @returns Seam image URL
   */
  getSeamImageUrl(param1: unknown, param2: unknown, param3: unknown): string;

  /**
   * Add leading zero to number
   * @param value - Value to format
   * @returns Formatted value with leading zero
   */
  addPreZero(value: number | string): string;

  /**
   * Reset material URL cache
   */
  resetMaterialUrlCache(): void;
}

/**
 * Global namespace extensions
 */
declare global {
  namespace HSCore {
    namespace Material {
      namespace Util {
        /** Indicates whether seam filler is supported */
        let isSeamFillerSupported: boolean;
      }
    }
  }

  namespace HSApp {
    namespace Plugin {
      /**
       * Register a plugin with the plugin system
       * @param pluginType - Type identifier for the plugin
       * @param pluginClass - Plugin class constructor
       */
      function registerPlugin(
        pluginType: string,
        pluginClass: typeof IPlugin
      ): void;
    }
  }

  namespace HSFPConstants {
    enum PluginType {
      /** Material Image plugin type identifier */
      MaterialImage = 'MaterialImage'
    }
  }
}

export {};