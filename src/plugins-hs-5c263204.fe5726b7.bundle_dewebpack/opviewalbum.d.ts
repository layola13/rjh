/**
 * Operation module for viewing album functionality
 * @module OpViewAlbum
 */

import { BaseOperation, OperationId } from './BaseOperation';
import type { PluginManager } from './PluginManager';

/**
 * Execution context interface for operation execution
 */
interface ExecutionContext {
  /** Response message from the operation */
  reply: string;
  /** Array of recommended operation types to be executed after this operation */
  recommendedOperationTypes?: string[];
  /** Additional context data */
  [key: string]: unknown;
}

/**
 * Application interface containing plugin manager
 */
interface App {
  /** Plugin manager instance for managing application plugins */
  pluginManager: PluginManager;
}

/**
 * Render plugin interface for handling result display
 */
interface RenderPlugin {
  /**
   * Get the handler for this plugin
   * @returns Handler object with showResult method
   */
  getHandler(): {
    /** Display the result to the user */
    showResult(): void;
  };
}

/**
 * Plugin manager interface for managing plugins
 */
interface PluginManager {
  /**
   * Retrieve a plugin by its identifier
   * @param pluginId - Unique identifier of the plugin (e.g., "hsw.plugin.render.Plugin")
   * @returns Plugin instance or null if not found
   */
  getPlugin(pluginId: string): RenderPlugin | null;
}

/**
 * Operation class for viewing album
 * Extends BaseOperation to handle album viewing functionality
 */
export declare class OpViewAlbum extends BaseOperation {
  /** Application instance reference */
  protected app: App;

  /**
   * Creates an instance of OpViewAlbum
   */
  constructor();

  /**
   * Execute the view album operation
   * Triggers render plugin to show results and configures recommended operations
   * @param context - Execution context containing operation data
   */
  onExecute(context: ExecutionContext): void;

  /**
   * Finish the operation with status and message
   * @param status - Operation status (e.g., "success", "error")
   * @param message - Status message
   * @param context - Execution context data
   */
  protected onFinish(
    status: string,
    message: string,
    context: ExecutionContext
  ): void;

  /**
   * Get the unique identifier for this operation
   * @returns The operation ID for ViewAlbum
   */
  static getId(): OperationId.ViewAlbum;

  /**
   * Get recommended operation types for a given operation ID
   * @param operationId - The operation identifier
   * @returns Array of recommended operation type identifiers
   */
  static getRecommendedOperationTypes(operationId: OperationId): string[];
}

/**
 * Base operation abstract class
 */
declare abstract class BaseOperation {
  /** Application instance */
  protected app: App;

  /**
   * Execute the operation
   * @param context - Execution context
   */
  abstract onExecute(context: ExecutionContext): void;

  /**
   * Finish operation with status
   * @param status - Operation status
   * @param message - Status message
   * @param context - Context data
   */
  protected abstract onFinish(
    status: string,
    message: string,
    context: ExecutionContext
  ): void;
}

/**
 * Enumeration of operation identifiers
 */
declare enum OperationId {
  /** View album operation identifier */
  ViewAlbum = 'ViewAlbum',
}