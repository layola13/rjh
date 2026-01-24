/**
 * Room editing plugin module
 * Provides room edit command processing functionality
 */

/**
 * Plugin context interface containing application instance
 */
interface PluginContext {
  /** Application instance with command and transaction managers */
  app: {
    /** Command manager for registering command handlers */
    cmdManager: {
      /** Register multiple command handlers */
      register(commands: Array<[HSFPConstants.CommandType, new (...args: any[]) => any]>): void;
    };
    /** Transaction manager for registering request handlers */
    transManager: {
      /** Register multiple request handlers */
      register(requests: Array<[HSFPConstants.RequestType, new (...args: any[]) => any]>): void;
    };
  };
}

/**
 * Plugin metadata interface
 */
interface PluginMetadata {
  /** Plugin name identifier */
  name: string;
  /** Human-readable description of plugin functionality */
  description: string;
  /** Array of plugin dependency identifiers */
  dependencies: string[];
}

/**
 * Base plugin interface from HSApp framework
 */
declare namespace HSApp.Plugin {
  /**
   * Base plugin class that all plugins must extend
   */
  abstract class IPlugin {
    /**
     * Constructor accepting plugin metadata
     * @param metadata - Plugin configuration and dependencies
     */
    constructor(metadata: PluginMetadata);

    /**
     * Lifecycle hook called when plugin becomes active
     * @param context - Plugin execution context with app reference
     */
    abstract onActive(context: PluginContext): void;

    /**
     * Lifecycle hook called when plugin becomes inactive
     */
    abstract onDeactive(): void;
  }

  /**
   * Register a plugin with the HSApp framework
   * @param identifier - Unique plugin identifier string
   * @param pluginClass - Plugin class constructor
   */
  function registerPlugin(identifier: string, pluginClass: new () => IPlugin): void;
}

/**
 * Constants namespace for command and request types
 */
declare namespace HSFPConstants {
  /** Command type enumeration for room editing operations */
  enum CommandType {
    /** Change global height command */
    ChangeGlobalHeight,
    /** Change global width command */
    ChangeGlobalWidth,
    /** Toggle ceiling status command */
    ToggleCeilingStatus,
    /** Toggle ceiling visibility command */
    ToggleCeilingVisibility,
    /** Change wall freeze state command */
    ChangeWallFreezed,
    /** Change global area type command */
    ChangeGlobalAreaType,
  }

  /** Request type enumeration for transaction operations */
  enum RequestType {
    /** Toggle ceiling status request */
    ToggleCeilingStatus,
    /** Toggle ceiling visibility request */
    ToggleCeilingVisibility,
    /** Change global width request */
    ChangeGlobalWidth,
    /** Freeze wall request */
    FreezeWall,
    /** Change global area type request */
    ChangeGlobalAreaType,
  }
}

/**
 * Room editing plugin class
 * Handles registration of room editing commands and transaction requests
 */
declare class RoomEditPlugin extends HSApp.Plugin.IPlugin {
  /**
   * Initialize room editing plugin with metadata
   */
  constructor();

  /**
   * Activate plugin and register all command and request handlers
   * @param context - Plugin context containing app managers
   */
  onActive(context: PluginContext): void;

  /**
   * Deactivate plugin and cleanup resources
   */
  onDeactive(): void;
}

/**
 * Module exports the plugin registered as "hsw.plugin.RoomEdit.Plugin"
 */
export default RoomEditPlugin;