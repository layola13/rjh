/**
 * Content Material Replace Plugin
 * Provides functionality to reset and replace materials on 3D content meshes
 */

import { IPlugin } from 'HSApp.Plugin';
import { Signal } from 'HSCore.Util';
import { PluginType } from 'HSFPConstants';

/**
 * Plugin configuration options
 */
interface IPluginConfig {
  /** Plugin display name */
  name: string;
  /** Plugin description */
  description: string;
  /** List of required plugin dependencies */
  dependencies: string[];
}

/**
 * Plugin activation context
 */
interface IActivationContext {
  /** Application instance */
  app: IApplication;
  /** Additional context data */
  [key: string]: unknown;
}

/**
 * Handler initialization options
 */
interface IHandlerInitOptions {
  /** Application instance */
  app: IApplication;
  /** Resolved plugin dependencies */
  dependencies: Record<string, unknown>;
  /** Activation context */
  context: IActivationContext;
  /** Signal for mesh selection events */
  signalContentMeshSelected: Signal<unknown>;
}

/**
 * Application interface
 */
interface IApplication {
  [key: string]: unknown;
}

/**
 * Material replace handler class
 */
declare class MaterialReplaceHandler {
  /**
   * Initialize the handler with configuration
   * @param options - Initialization options
   */
  init(options: IHandlerInitOptions): void;

  /**
   * Clean up and dispose handler resources
   */
  dispose(): void;

  /**
   * Set the currently selected entity for material replacement
   * @param entity - The selected entity
   */
  setSelectedEntity(entity: unknown): void;

  /**
   * Start the material styler interface
   */
  startStyler(): void;

  /**
   * Exit the material styler interface
   */
  exitStyler(): void;
}

/**
 * Content Material Replace Plugin
 * Enables users to reset and replace materials on selected 3D meshes
 */
declare class ContentMaterialReplacePlugin extends IPlugin {
  /** Material replace handler instance */
  private handler: MaterialReplaceHandler;

  /** Signal emitted when a content mesh is selected */
  readonly signalContentMeshSelected: Signal<unknown>;

  /**
   * Creates a new instance of ContentMaterialReplacePlugin
   */
  constructor();

  /**
   * Called when the plugin is activated
   * @param context - Activation context containing app and configuration
   * @param dependencies - Resolved plugin dependencies
   */
  onActive(context: IActivationContext, dependencies: Record<string, unknown>): void;

  /**
   * Called when the plugin is deactivated
   * @param context - Deactivation context
   */
  onDeactive(context: IActivationContext): void;

  /**
   * Start the material styler for a specific entity
   * @param entity - The entity to apply material styling to
   */
  startStyler(entity: unknown): void;

  /**
   * Exit the material styler interface
   */
  exitStyler(): void;
}

/**
 * Plugin registration
 * Registers the ContentMaterialReplacePlugin with the plugin system
 */
declare module 'HSApp.Plugin' {
  function registerPlugin(
    pluginType: typeof PluginType.ContentMaterialReplace,
    pluginClass: typeof ContentMaterialReplacePlugin
  ): void;
}

export { ContentMaterialReplacePlugin, MaterialReplaceHandler, IHandlerInitOptions, IActivationContext };