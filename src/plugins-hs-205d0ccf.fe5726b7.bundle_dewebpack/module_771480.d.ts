/**
 * Selection Plugin Module
 * 
 * This module provides selection-related functionality for the HSApp plugin system.
 * It handles various selection operations including point selection, window selection,
 * elevation selection, deletion, and duplication of selected elements.
 * 
 * @module SelectionPlugin
 */

declare namespace HSApp {
  namespace Plugin {
    /**
     * Base interface for all plugins in the HSApp system
     */
    interface IPlugin {
      /**
       * Called when the plugin is activated
       * @param context - The activation context containing app and environment information
       */
      onActive(context: PluginActivationContext): void;
    }

    /**
     * Context object passed to plugins during activation
     */
    interface PluginActivationContext {
      /** Reference to the main application instance */
      app: AppInstance;
    }

    /**
     * Main application instance interface
     */
    interface AppInstance {
      /** Command manager for registering and executing commands */
      cmdManager: CommandManager;
    }

    /**
     * Command manager for handling application commands
     */
    interface CommandManager {
      /**
       * Register one or more commands with their corresponding command classes
       * @param commands - Array of tuples containing command type and command class
       */
      register(commands: Array<[HSFPConstants.CommandType, CommandConstructor]>): void;
    }

    /**
     * Constructor type for command classes
     */
    type CommandConstructor = new (...args: any[]) => ICommand;

    /**
     * Base interface for all commands
     */
    interface ICommand {
      /** Execute the command */
      execute(...args: any[]): void;
    }

    /**
     * Register a plugin with the plugin system
     * @param pluginType - Type identifier for the plugin
     * @param pluginClass - Constructor for the plugin class
     */
    function registerPlugin(
      pluginType: HSFPConstants.PluginType,
      pluginClass: new () => IPlugin
    ): void;
  }
}

declare namespace HSFPConstants {
  /**
   * Enum of available plugin types
   */
  enum PluginType {
    /** Selection-related functionality plugin */
    Selection = "Selection"
  }

  /**
   * Enum of available command types
   */
  enum CommandType {
    /** Delete selected elements */
    DeleteSelection = "DeleteSelection",
    /** Duplicate selected elements */
    DuplicateSelection = "DuplicateSelection",
    /** Select elements by point */
    PointSelect = "PointSelect",
    /** Select elements by window */
    WindowSelect = "WindowSelect",
    /** Select elements by elevation */
    ElevationSelect = "ElevationSelect"
  }
}

/**
 * Command for deleting selected elements
 */
declare class CmdDeleteSelection implements HSApp.Plugin.ICommand {
  constructor();
  execute(): void;
}

/**
 * Command for duplicating selected elements
 */
declare class CmdDuplicateSelection implements HSApp.Plugin.ICommand {
  constructor();
  execute(): void;
}

/**
 * Command for point-based selection
 * Allows users to select elements by clicking on specific points
 */
declare class CmdPointSelect implements HSApp.Plugin.ICommand {
  constructor();
  execute(): void;
}

/**
 * Command for window-based selection
 * Allows users to select elements by drawing a selection window/rectangle
 */
declare class CmdWindowSelect implements HSApp.Plugin.ICommand {
  constructor();
  execute(): void;
}

/**
 * Command for elevation-based selection
 * Allows users to select elements based on their elevation/height
 */
declare class CmdElevationSelect implements HSApp.Plugin.ICommand {
  constructor();
  execute(): void;
}

/**
 * Plugin configuration interface
 */
interface PluginConfig {
  /** Unique name identifier for the plugin */
  name: string;
  /** Human-readable description of plugin functionality */
  description: string;
  /** Array of plugin names that this plugin depends on */
  dependencies: string[];
}

/**
 * Selection Plugin
 * 
 * Handles all selection-related operations in the application including:
 * - Point selection: Select individual elements by clicking
 * - Window selection: Select multiple elements within a rectangular area
 * - Elevation selection: Select elements based on elevation criteria
 * - Delete selection: Remove selected elements
 * - Duplicate selection: Create copies of selected elements
 * 
 * @extends HSApp.Plugin.IPlugin
 */
declare class SelectionPlugin extends HSApp.Plugin.IPlugin {
  /**
   * Creates a new instance of the SelectionPlugin
   * Initializes with default configuration including name, description, and dependencies
   */
  constructor();

  /**
   * Called when the plugin is activated in the application
   * Registers all selection-related commands with the command manager
   * 
   * @param context - Activation context containing application instance and environment info
   */
  onActive(context: HSApp.Plugin.PluginActivationContext): void;

  /**
   * Retrieves the point selection command class
   * 
   * @returns The CmdPointSelect command class constructor
   */
  getCmdPointSelect(): typeof CmdPointSelect;
}

/**
 * Module exports
 */
export { SelectionPlugin, CmdPointSelect, CmdWindowSelect, CmdElevationSelect, CmdDeleteSelection, CmdDuplicateSelection };
export default SelectionPlugin;