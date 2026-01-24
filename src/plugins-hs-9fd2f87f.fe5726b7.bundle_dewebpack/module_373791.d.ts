/**
 * HSW Editor Plugin
 * Manages copy, paste and cut behavior in the application
 */

/**
 * Plugin dependencies configuration
 */
interface EditorPluginDependencies {
  /** User input plugin instance */
  [HSFPConstants.PluginType.UserInput]: HSApp.Plugin.IPlugin;
  /** Toolbar plugin instance */
  [HSFPConstants.PluginType.Toolbar]: HSApp.Plugin.IPlugin;
  /** Catalog plugin instance */
  [HSFPConstants.PluginType.Catalog]: HSApp.Plugin.IPlugin;
}

/**
 * Handler initialization options
 */
interface HandlerInitOptions {
  /** Application instance */
  app: HSApp.Application;
  /** Plugin dependencies map */
  dependencies: EditorPluginDependencies;
}

/**
 * Editor handler interface
 * Manages the core editor functionality
 */
interface IEditorHandler {
  /**
   * Initialize the handler with app and dependencies
   * @param options - Initialization configuration
   */
  init(options: HandlerInitOptions): void;

  /**
   * Cleanup and uninitialize the handler
   */
  uninit(): void;
}

/**
 * Editor Plugin class
 * Extends the base IPlugin to provide editor functionality
 */
declare class EditorPlugin extends HSApp.Plugin.IPlugin {
  /**
   * Internal handler for editor operations
   * @private
   */
  private _handler: IEditorHandler;

  /**
   * Creates an instance of EditorPlugin
   * Initializes with plugin metadata and creates handler
   */
  constructor();

  /**
   * Called when the plugin is activated
   * @param context - Plugin activation context containing app instance
   * @param dependencies - Map of required plugin dependencies
   */
  onActive(
    context: { app: HSApp.Application },
    dependencies: EditorPluginDependencies
  ): void;

  /**
   * Called when the plugin is deactivated
   * Cleans up resources and uninitializes the handler
   */
  onDeactive(): void;
}

/**
 * Register the editor plugin with the application
 * Plugin identifier: "hsw.plugin.editor.Plugin"
 */
declare module HSApp.Plugin {
  /**
   * Registers a plugin class with the given identifier
   * @param identifier - Unique plugin identifier string
   * @param pluginClass - Plugin class constructor
   */
  function registerPlugin(
    identifier: string,
    pluginClass: typeof EditorPlugin
  ): void;
}

/**
 * Global plugin registration
 * The EditorPlugin is registered as "hsw.plugin.editor.Plugin"
 */
export { EditorPlugin };
export default EditorPlugin;