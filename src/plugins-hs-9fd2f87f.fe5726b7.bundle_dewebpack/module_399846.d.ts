/**
 * Export Assembly Plugin for HSApp
 * Provides functionality to export assembly data from the floorplan
 */

/**
 * Configuration object for hotkey registration
 */
interface HotkeyConfig {
  /** Windows/Linux keyboard shortcut */
  win: string;
  /** macOS keyboard shortcut */
  mac: string;
}

/**
 * Application parameters containing debug flag
 */
interface AppParams {
  /** Debug mode flag */
  debug: boolean;
}

/**
 * Hotkey manager for registering keyboard shortcuts
 */
interface HotkeyManager {
  /**
   * Registers a keyboard shortcut
   * @param config - Hotkey configuration for different platforms
   * @param callback - Function to execute when hotkey is triggered
   */
  registerHotkey(config: HotkeyConfig, callback: () => void): void;
}

/**
 * Selection manager for canvas elements
 */
interface SelectionManager {
  /** Clears all current selections */
  unselectAll(): void;
}

/**
 * Floorplan content item
 */
interface FloorplanContent {
  // Base content properties (extend as needed)
  [key: string]: unknown;
}

/**
 * Floorplan manager
 */
interface Floorplan {
  /**
   * Iterates over each content item in the floorplan
   * @param callback - Function called for each content item
   */
  forEachContent(callback: (content: FloorplanContent) => void): void;
}

/**
 * Main application instance
 */
interface App {
  /** Selection manager instance */
  selectionManager: SelectionManager;
  /** Floorplan instance */
  floorplan: Floorplan;
  /** Hotkey manager instance */
  hotkey: HotkeyManager;
  /** Application parameters */
  appParams: AppParams;
}

/**
 * Plugin activation context
 */
interface PluginContext {
  /** Application instance */
  app: App;
}

/**
 * Plugin metadata
 */
interface PluginMetadata {
  /** Plugin display name */
  name: string;
  /** Plugin description */
  description: string;
}

/**
 * Assembly data builder
 */
declare class AssemblyBuilder {
  /**
   * Builds assembly data from content items
   * @param contents - Array of floorplan content items
   * @returns Serialized JSON string of assembly data
   */
  buildAssemblyData(contents: FloorplanContent[]): string;
}

/**
 * Base plugin interface
 */
declare abstract class IPlugin {
  /**
   * Creates a plugin instance
   * @param metadata - Plugin metadata
   */
  constructor(metadata: PluginMetadata);

  /**
   * Called when plugin is activated
   * @param context - Plugin activation context
   */
  onActive(context: PluginContext): void;

  /**
   * Called when plugin is deactivated
   */
  onDeactive(): void;
}

/**
 * Export Assembly Plugin
 * Enables exporting floorplan assembly data as JSON files via drag-and-drop or hotkey
 */
declare class ExportAssemblyPlugin extends IPlugin {
  /** Assembly data builder instance */
  private builder: AssemblyBuilder;

  constructor();

  /**
   * Exports all floorplan content as assembly JSON file
   * Generates a timestamped filename and triggers download
   */
  exportAssembly(): void;

  /**
   * Activates the plugin and registers export hotkey in debug mode
   * @param context - Plugin activation context
   */
  onActive(context: PluginContext): void;

  /**
   * Deactivates the plugin
   */
  onDeactive(): void;
}

/**
 * HSApp global namespace
 */
declare namespace HSApp {
  namespace App {
    /**
     * Gets the current application instance
     * @returns The active application instance
     */
    function getApp(): App;
  }

  namespace Plugin {
    export { IPlugin };

    /**
     * Registers a plugin with the application
     * @param id - Unique plugin identifier (e.g., "hsw.plugin.exportassembly.Plugin")
     * @param pluginClass - Plugin class constructor
     */
    function registerPlugin(
      id: string,
      pluginClass: new () => IPlugin
    ): void;
  }
}

/**
 * FileSaver.js global function for saving blobs
 * @param blob - Data blob to save
 * @param filename - Target filename
 */
declare function saveAs(blob: Blob, filename: string): void;