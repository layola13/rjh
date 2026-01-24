/**
 * Operation module for saving design layouts
 * @module OpSaveDesign
 */

/**
 * Execution context for the save design operation
 */
export interface SaveDesignContext {
  /**
   * Flag indicating if the operation is in question tone mode
   * When set to 1, the operation completes immediately with a reply message
   */
  isQuestionTone: number;

  /**
   * Reply message to be used when operation completes
   */
  reply: string;

  /**
   * Additional context data passed through the operation
   */
  [key: string]: unknown;
}

/**
 * Result status of the save operation
 */
export type SaveOperationStatus = 'success' | 'fail';

/**
 * Plugin interface for persistence operations
 */
export interface PersistencePlugin {
  /**
   * Signal emitted when the save operation is cancelled by the user
   */
  signalSaveCancel: {
    /**
     * Register a listener for the cancel signal
     * @param callback - Function to be called when save is cancelled
     */
    listen(callback: (context: SaveDesignContext) => void): void;

    /**
     * Unregister a listener from the cancel signal
     * @param callback - Function to be removed from listeners
     */
    unlisten(callback: (context: SaveDesignContext) => void): void;
  };

  /**
   * Persist the current design to storage
   * @param param1 - Reserved parameter (typically false)
   * @param param2 - Force save flag (typically true)
   * @param param3 - Include all data flag (typically true)
   * @returns Promise that resolves when save completes
   */
  save(param1: boolean, param2: boolean, param3: boolean): Promise<void>;
}

/**
 * Plugin manager interface for accessing application plugins
 */
export interface PluginManager {
  /**
   * Retrieve a plugin instance by its type identifier
   * @param pluginType - The type/ID of the plugin to retrieve
   * @returns The requested plugin instance
   */
  getPlugin(pluginType: string): PersistencePlugin;
}

/**
 * Application instance interface
 */
export interface Application {
  /**
   * Plugin manager for accessing various application plugins
   */
  pluginManager: PluginManager;
}

/**
 * Base operation class that all operations must extend
 */
export declare abstract class BaseOperation {
  /**
   * Application instance reference
   */
  protected app: Application;

  /**
   * Complete the operation with a result
   * @param status - Success or failure status
   * @param message - User-facing message describing the result
   * @param context - Original execution context
   */
  protected onFinish(
    status: SaveOperationStatus,
    message: string,
    context: SaveDesignContext
  ): void;
}

/**
 * Enumeration of operation identifiers
 */
export declare enum OperationId {
  SaveDesign = 'SaveDesign',
  // Other operation IDs...
}

/**
 * Operation for saving the current design/room layout
 * 
 * This operation handles persisting the current design state to storage.
 * It performs validation checks before saving:
 * - Skips save if in question tone mode
 * - Validates that at least one room exists in the design
 * - Handles save cancellation by the user
 * - Provides user feedback through localized messages
 * 
 * @example
 *