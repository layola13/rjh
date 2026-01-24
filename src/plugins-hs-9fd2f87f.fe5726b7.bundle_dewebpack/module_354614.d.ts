/**
 * HSW Plugin Export Module
 * 
 * This module defines the Export Image Plugin for the HSApp framework.
 * It handles image export functionality by registering appropriate commands.
 */

declare namespace HSApp.Plugin {
  /**
   * Base interface for HSApp plugins
   */
  interface IPlugin {
    /** Plugin name */
    name: string;
    
    /** Plugin description */
    description: string;
    
    /** Array of plugin dependencies */
    dependencies: string[];
    
    /**
     * Called when the plugin is activated
     * @param context - The activation context containing app instance
     */
    onActive(context: PluginActivationContext): void;
    
    /**
     * Called when the plugin is deactivated
     */
    onDeactive(): void;
  }
  
  /**
   * Context passed to plugin during activation
   */
  interface PluginActivationContext {
    /** Reference to the main application instance */
    app: HSApp.Application;
  }
  
  /**
   * Registers a plugin with the HSApp framework
   * @param pluginId - Unique identifier for the plugin (e.g., "hsw.plugin.Export.Plugin")
   * @param pluginClass - The plugin class constructor
   */
  function registerPlugin(
    pluginId: string,
    pluginClass: new () => IPlugin
  ): void;
}

declare namespace HSApp {
  /**
   * Main application interface
   */
  interface Application {
    /** Command manager instance */
    cmdManager: CommandManager;
  }
  
  /**
   * Command manager responsible for registering and executing commands
   */
  interface CommandManager {
    /**
     * Register a command handler
     * @param commandType - The type of command to register
     * @param commandHandler - The handler class or function for the command
     */
    register(commandType: string, commandHandler: any): void;
  }
}

declare namespace HSFPConstants {
  /**
   * Command type constants
   */
  enum CommandType {
    /** Export image command type */
    ExportImage = "ExportImage"
  }
}

/**
 * Export Image Plugin
 * 
 * This plugin extends the base IPlugin interface to provide
 * image export functionality to the HSApp application.
 */
declare class ExportImagePlugin extends HSApp.Plugin.IPlugin {
  /**
   * Creates a new Export Image Plugin instance
   */
  constructor();
  
  /**
   * Activates the plugin and registers the export image command
   * @param context - Plugin activation context with app reference
   */
  onActive(context: HSApp.Plugin.PluginActivationContext): void;
  
  /**
   * Deactivates the plugin and cleans up resources
   */
  onDeactive(): void;
}

/**
 * Module augmentation for global plugin registration
 */
declare module "hsw.plugin.Export.Plugin" {
  export default ExportImagePlugin;
}