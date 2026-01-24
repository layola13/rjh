/**
 * File drop plugin for HSApp
 * Allows users to drag and drop design data JSON files into the canvas
 */

/**
 * File opener interface for loading JSON design files
 */
interface IFileOpener {
  /**
   * Registers the file opener with the application
   */
  register(): void;
  
  /**
   * Loads a JSON file and opens the design
   * @param file - The file to load
   */
  loadJSON(file: File): void;
}

/**
 * Plugin activation event context
 */
interface IPluginActivationContext {
  /**
   * The HSApp application instance
   */
  app: {
    /**
     * Application parameters
     */
    appParams: {
      /**
       * Whether debug mode is enabled
       */
      debug: boolean;
    };
    
    /**
     * Hotkey manager for registering keyboard shortcuts
     */
    hotkey: {
      /**
       * Registers a hotkey combination
       * @param keys - Platform-specific key combinations
       * @param callback - Function to call when hotkey is pressed
       */
      registerHotkey(keys: { win: string; mac: string }, callback: () => void): void;
    };
  };
}

/**
 * Plugin metadata
 */
interface IPluginMetadata {
  /**
   * Display name of the plugin
   */
  name: string;
  
  /**
   * Description of the plugin's functionality
   */
  description: string;
}

/**
 * Base plugin interface
 */
declare class IPlugin {
  constructor(metadata: IPluginMetadata);
  
  /**
   * Called when the plugin is activated
   * @param context - Activation context containing app instance
   */
  onActive(context: IPluginActivationContext): void;
  
  /**
   * Called when the plugin is deactivated
   */
  onDeactive(): void;
}

/**
 * File drop plugin class
 * Enables drag-and-drop functionality for design JSON files and provides
 * a hotkey shortcut (Ctrl+Alt+O on Windows, Cmd+Alt+O on Mac) to open files
 */
declare class FileDropPlugin extends IPlugin {
  /**
   * File opener instance for handling JSON file loading
   */
  private readonly opener: IFileOpener;
  
  /**
   * Creates a new FileDropPlugin instance
   */
  constructor();
  
  /**
   * Opens a file picker dialog to select a JSON design file
   * Prompts the user to select a .json file and loads it into the canvas
   */
  loadLocalfile(): void;
  
  /**
   * Activates the plugin and registers event handlers
   * @param context - Activation context containing app instance
   */
  onActive(context: IPluginActivationContext): void;
  
  /**
   * Deactivates the plugin and cleans up resources
   */
  onDeactive(): void;
}

/**
 * HSApp namespace declarations
 */
declare namespace HSApp {
  namespace Util {
    namespace File {
      /**
       * Opens a file picker dialog
       * @param accept - File type filter (e.g., ".json")
       * @returns Promise resolving to an array of selected files
       */
      function pick(accept: string): Promise<File[]>;
    }
  }
  
  namespace Plugin {
    /**
     * Base plugin class that all plugins must extend
     */
    export { IPlugin };
    
    /**
     * Registers a plugin with the HSApp plugin system
     * @param pluginId - Unique identifier for the plugin
     * @param pluginClass - Plugin class constructor
     */
    function registerPlugin(pluginId: string, pluginClass: typeof FileDropPlugin): void;
  }
}

/**
 * Plugin registration
 * Registers the FileDropPlugin with the unique identifier "hsw.plugin.filedrop.Plugin"
 */
declare const registeredPlugin: void;

export { FileDropPlugin, IFileOpener, IPluginActivationContext, IPluginMetadata, IPlugin };