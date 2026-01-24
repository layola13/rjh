/**
 * Module: Space Rebuild Plugin
 * Provides space rebuilding capabilities for DWG export support
 */

/**
 * Handler interface for managing space rebuild operations
 */
interface ISpaceRebuildHandler {
  /**
   * Initialize the handler
   */
  init(): void;

  /**
   * Compare and analyze wall differences
   * @returns Wall difference analysis result
   */
  diffWalls(): unknown;
}

/**
 * Signal type for save origin design events
 */
type SaveOriginDesignSignal = HSCore.Util.Signal<unknown>;

/**
 * Plugin configuration options
 */
interface IPluginConfig {
  /** Plugin display name */
  name: string;
  /** Plugin description */
  description: string;
  /** Required plugin dependencies */
  dependencies: HSFPConstants.PluginType[];
}

/**
 * Space Rebuild Plugin
 * Extends base IPlugin to provide simple space rebuild ability for supporting DWG export
 */
declare class SpaceRebuildPlugin extends HSApp.Plugin.IPlugin {
  /**
   * Signal emitted when saving original design
   */
  signalSaveOriginDesign: SaveOriginDesignSignal;

  /**
   * Internal handler for space rebuild operations
   * @private
   */
  private _handler?: ISpaceRebuildHandler;

  /**
   * Register callback for save origin extend functionality
   * @param callback - Function to be called on save origin extend
   */
  registerOnSaveOriginExtend: typeof registerOnSaveOriginExtend;

  /**
   * Lifecycle hook called when plugin is activated
   * @param event - Activation event data
   * @param context - Plugin context or dependencies
   */
  onActive(event: unknown, context: unknown): void;

  /**
   * Lifecycle hook called when plugin is deactivated
   */
  onDeactive(): void;

  /**
   * Compare and analyze wall differences in the current space
   * @returns Wall difference analysis result
   */
  diffWalls(): unknown;
}

/**
 * External function for registering save origin extend callbacks
 */
declare function registerOnSaveOriginExtend(callback: Function): void;

/**
 * HSFPConstants namespace containing plugin type definitions
 */
declare namespace HSFPConstants {
  enum PluginType {
    Toolbar = 'Toolbar',
    Persistence = 'Persistence',
    SpaceRebuild = 'SpaceRebuild'
  }
}

/**
 * HSApp namespace containing plugin infrastructure
 */
declare namespace HSApp.Plugin {
  /**
   * Base plugin interface
   */
  class IPlugin {
    constructor(config: IPluginConfig);
  }

  /**
   * Register a plugin instance with the plugin system
   * @param pluginType - Type identifier for the plugin
   * @param pluginClass - Plugin class constructor
   */
  function registerPlugin(
    pluginType: HSFPConstants.PluginType,
    pluginClass: new () => IPlugin
  ): void;
}

/**
 * HSCore utility namespace
 */
declare namespace HSCore.Util {
  /**
   * Generic signal/event emitter
   * @template T - Type of data emitted by the signal
   */
  class Signal<T> {
    constructor(context: unknown);
    emit(data: T): void;
    add(listener: (data: T) => void): void;
    remove(listener: (data: T) => void): void;
  }
}

// Plugin registration
// HSApp.Plugin.registerPlugin(HSFPConstants.PluginType.SpaceRebuild, SpaceRebuildPlugin);