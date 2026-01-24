/**
 * Migration Service Plugin for HSApp
 * Provides functionality to migrate floorplan designs to the latest version
 * @module MigrationServicePlugin
 */

/**
 * Application context interface
 */
interface IAppContext {
  /** The main application instance */
  app: IApplication;
}

/**
 * Application interface providing document operations
 */
interface IApplication {
  /**
   * Opens a document for processing
   * @param document - The document data to open
   * @returns Promise that resolves when document is opened
   */
  openDocument(document: unknown): Promise<void>;

  /**
   * Saves the currently opened document
   * @returns Promise that resolves with the saved document data
   */
  saveDocument(): Promise<unknown>;
}

/**
 * Plugin configuration object
 */
interface IPluginConfig {
  /** The display name of the plugin */
  name: string;
  /** Description of plugin functionality */
  description: string;
  /** Array of plugin dependency identifiers */
  dependencies: string[];
}

/**
 * Web Worker interface for background migration processing
 */
interface IMigrationWorker extends Worker {
  /**
   * Sends data to the worker for processing
   * @param data - The data to be migrated
   */
  postMessage(data: unknown): void;

  /**
   * Handler for messages received from the worker
   * @param event - Message event containing the migrated data
   */
  onmessage: ((event: MessageEvent<unknown>) => void) | null;

  /**
   * Terminates the worker thread
   */
  terminate(): void;
}

/**
 * Base plugin interface from HSApp plugin system
 */
declare abstract class IPlugin {
  /**
   * Creates a new plugin instance
   * @param config - Plugin configuration object
   */
  constructor(config: IPluginConfig);

  /**
   * Called when the plugin is activated
   * @param context - Application context
   */
  abstract onActive(context: IAppContext): void;

  /**
   * Called when the plugin is deactivated
   */
  abstract onDeactive(): void;
}

/**
 * Migration Service Plugin
 * Handles migration of floorplan designs to newer versions
 */
declare class MigrationServicePlugin extends IPlugin {
  /** Internal reference to the application instance */
  private _app: IApplication;

  /**
   * Creates a new migration service plugin instance
   */
  constructor();

  /**
   * Activates the plugin and stores application reference
   * @param context - Application context containing the app instance
   */
  onActive(context: IAppContext): void;

  /**
   * Deactivates the plugin and performs cleanup
   */
  onDeactive(): void;

  /**
   * Migrates a design document to the latest version
   * Opens the document, processes it, and saves the updated version
   * @param document - The document data to migrate
   * @returns Promise that resolves with the migrated document data
   */
  migrateDesign(document: unknown): Promise<unknown>;

  /**
   * Migrates a design to version 2 using a web worker
   * Performs migration in a background thread to avoid blocking the UI
   * @param data - The design data to migrate to v2
   * @returns Promise that resolves with the v2-migrated data
   */
  migrateToV2(data: unknown): Promise<unknown>;
}

/**
 * HSApp global namespace
 */
declare namespace HSApp {
  /**
   * Plugin subsystem namespace
   */
  namespace Plugin {
    /**
     * Base plugin interface
     */
    export { IPlugin };

    /**
     * Registers a plugin with the HSApp plugin system
     * @param identifier - Unique plugin identifier (e.g., "hsw.plugin.migrationService.Plugin")
     * @param pluginClass - The plugin class constructor
     */
    export function registerPlugin(
      identifier: string,
      pluginClass: typeof IPlugin
    ): void;
  }
}

/**
 * Export the migration service plugin class
 */
export default MigrationServicePlugin;

/**
 * Export plugin types for external use
 */
export type {
  IAppContext,
  IApplication,
  IPluginConfig,
  IMigrationWorker,
  IPlugin
};