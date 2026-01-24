/**
 * Group Editing Plugin Module
 * Handles group manipulation commands and transformations in the HSApp plugin system
 */

declare namespace HSApp.Plugin {
  /**
   * Base interface for all plugins in the HSApp system
   */
  interface IPlugin {
    /** Plugin name identifier */
    name: string;
    /** Human-readable description of the plugin's purpose */
    description: string;
    /** Array of plugin names that this plugin depends on */
    dependencies: string[];
    
    /**
     * Called when the plugin is activated
     * @param context - The application context containing app instance
     */
    onActive(context: PluginContext): void;
    
    /**
     * Called when the plugin is deactivated
     */
    onDeactive(): void;
  }

  /**
   * Context provided to plugins during activation
   */
  interface PluginContext {
    /** Reference to the main application instance */
    app: HSApp.Application;
  }

  /**
   * Plugin registration function
   * @param pluginId - Unique identifier for the plugin (e.g., "hsw.plugin.Group.Plugin")
   * @param pluginClass - The plugin class constructor
   */
  function registerPlugin(pluginId: string, pluginClass: new () => IPlugin): void;
}

declare namespace HSApp {
  /**
   * Main application interface
   */
  interface Application {
    /** Command manager for registering and executing commands */
    cmdManager: CommandManager;
    /** Transaction/Request manager for handling asynchronous operations */
    transManager: TransactionManager;
  }

  /**
   * Manages command registration and execution
   */
  interface CommandManager {
    /**
     * Register multiple command handlers
     * @param commands - Array of [commandType, commandImplementation] tuples
     */
    register(commands: Array<[HSFPConstants.CommandType, new () => Command]>): void;
  }

  /**
   * Manages transaction/request handlers
   */
  interface TransactionManager {
    /**
     * Register multiple request handlers
     * @param handlers - Array of [requestType, handlerImplementation] tuples
     */
    register(handlers: Array<[HSFPConstants.RequestType, new () => RequestHandler]>): void;
  }

  /**
   * Base command interface
   */
  interface Command {
    /** Execute the command */
    execute(...args: unknown[]): void;
  }

  /**
   * Base request handler interface
   */
  interface RequestHandler {
    /** Handle the request */
    handle(...args: unknown[]): Promise<unknown> | unknown;
  }

  namespace Cmd.Implement {
    /**
     * Command implementation for distributing content elements
     */
    class CmdDistributionContents implements Command {
      execute(...args: unknown[]): void;
    }
  }
}

declare namespace HSFPConstants {
  /**
   * Enumeration of available command types for group operations
   */
  enum CommandType {
    /** Add a new group */
    AddGroup = "AddGroup",
    /** Remove a group without deleting contents */
    RemoveGroup = "RemoveGroup",
    /** Delete a group and its contents */
    DeleteGroup = "DeleteGroup",
    /** Flip/mirror a group horizontally or vertically */
    FlipGroup = "FlipGroup",
    /** Distribute contents within a group evenly */
    DistributionContents = "DistributionContents",
    /** Add member(s) to a group */
    IncludeMember = "IncludeMember",
    /** Remove member(s) from a group */
    ExcludeMember = "ExcludeMember"
  }

  /**
   * Enumeration of request types for asynchronous operations
   */
  enum RequestType {
    /** Request to flip a group (async operation) */
    FlipGroup = "FlipGroup"
  }
}

/**
 * Command: Add a new group to the canvas
 */
declare class CmdAddGroup implements HSApp.Command {
  constructor();
  execute(...args: unknown[]): void;
}

/**
 * Command: Remove a group container while preserving its contents
 */
declare class CmdRemoveGroup implements HSApp.Command {
  constructor();
  execute(...args: unknown[]): void;
}

/**
 * Command: Delete a group and all its child elements
 */
declare class CmdDeleteGroup implements HSApp.Command {
  constructor();
  execute(...args: unknown[]): void;
}

/**
 * Command: Flip/mirror a group along specified axis
 */
declare class CmdFlipGroup implements HSApp.Command {
  constructor();
  execute(...args: unknown[]): void;
}

/**
 * Command: Add one or more members to an existing group
 */
declare class CmdIncludeMember implements HSApp.Command {
  constructor();
  execute(...args: unknown[]): void;
}

/**
 * Command: Remove one or more members from a group
 */
declare class CmdExcludeMember implements HSApp.Command {
  constructor();
  execute(...args: unknown[]): void;
}

/**
 * Request Handler: Asynchronously process group flip operations
 */
declare class TransFlipGroup implements HSApp.RequestHandler {
  constructor();
  handle(...args: unknown[]): Promise<unknown>;
}

/**
 * Group Editing Plugin
 * Registers all group-related commands and request handlers
 * 
 * @remarks
 * This plugin provides comprehensive group manipulation capabilities including:
 * - Creating and deleting groups
 * - Adding/removing group members
 * - Flipping groups
 * - Distributing group contents
 */
declare class GroupPlugin extends HSApp.Plugin.IPlugin {
  /** Plugin identifier */
  readonly name: "group editing";
  
  /** Plugin description */
  readonly description: "Process group edit commands.";
  
  /** No dependencies */
  readonly dependencies: [];

  constructor();

  /**
   * Activates the plugin and registers all command and request handlers
   * @param context - Application context with cmdManager and transManager
   */
  onActive(context: HSApp.Plugin.PluginContext): void;

  /**
   * Deactivates the plugin (currently no cleanup needed)
   */
  onDeactive(): void;
}

/**
 * Module exports
 */
export {};
export as namespace GroupEditingModule;