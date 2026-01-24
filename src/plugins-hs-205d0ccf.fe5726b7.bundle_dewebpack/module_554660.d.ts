/**
 * Size Limit Plugin Module
 * Provides size limit functionality for the HSApp plugin system
 */

import { HSApp } from './HSApp';
import { Handler } from './Handler';

/**
 * Plugin initialization context
 */
interface PluginContext {
  /** Application context data */
  [key: string]: unknown;
}

/**
 * Plugin dependencies map
 */
interface PluginDependencies {
  /** Dependency plugins indexed by type */
  [pluginType: string]: HSApp.Plugin.IPlugin;
}

/**
 * Plugin metadata configuration
 */
interface PluginMetadata {
  /** Display name of the plugin */
  name: string;
  /** Human-readable description */
  description: string;
  /** List of required plugin dependencies */
  dependencies: string[];
}

/**
 * Size Limit Plugin
 * Manages size constraints and validation in the application
 * @extends {HSApp.Plugin.IPlugin}
 */
export declare class SizeLimitPlugin extends HSApp.Plugin.IPlugin {
  /**
   * Handler instance for processing size limit operations
   */
  private handler: Handler;

  /**
   * Creates a new SizeLimitPlugin instance
   * Initializes with metadata and creates a Handler
   */
  constructor();

  /**
   * Lifecycle hook called when plugin becomes active
   * @param context - Application context for the plugin
   * @param dependencies - Map of dependency plugins
   */
  onActive(context: PluginContext, dependencies: PluginDependencies): void;

  /**
   * Lifecycle hook called when plugin is deactivated
   * Performs cleanup operations
   */
  onDeactive(): void;
}

/**
 * Global plugin registration
 * Registers SizeLimitPlugin with the application's plugin manager
 */
declare global {
  namespace HSFPConstants {
    enum PluginType {
      /** Contextual tools plugin type */
      ContextualTools = 'contextual-tools',
      /** Size limit plugin type */
      SizeLimitPlugin = 'size-limit-plugin'
    }
  }
}

/**
 * Handler class for size limit operations
 */
export declare namespace Handler {
  /**
   * Handler initialization options
   */
  interface InitOptions {
    /** Plugin execution context */
    context: PluginContext;
    /** Available plugin dependencies */
    dependencies: PluginDependencies;
  }

  /**
   * Handler for processing size limit logic
   */
  export class Handler {
    /**
     * Initializes the handler with context and dependencies
     * @param options - Configuration options
     */
    init(options: InitOptions): void;
  }
}