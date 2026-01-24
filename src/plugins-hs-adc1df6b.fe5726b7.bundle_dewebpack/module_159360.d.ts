/**
 * Molding Brush Plugin Module
 * Provides functionality to apply styles from one molding to another
 */

import { IPlugin } from 'HSApp.Plugin';
import { PluginType } from 'HSFPConstants';

/**
 * Plugin initialization context
 */
interface IPluginContext {
  /** Application instance */
  app: IApplication;
  /** Plugin dependencies */
  dependencies?: IPluginDependencies;
}

/**
 * Plugin activation event data
 */
interface IPluginActivationEvent {
  /** Application instance */
  app: IApplication;
}

/**
 * Plugin dependencies configuration
 */
interface IPluginDependencies {
  [key: string]: unknown;
}

/**
 * Application interface
 */
interface IApplication {
  [key: string]: unknown;
}

/**
 * Plugin metadata
 */
interface IPluginMetadata {
  /** Plugin display name */
  name: string;
  /** Plugin description */
  description: string;
  /** Required plugin dependencies */
  dependencies: PluginType[];
}

/**
 * Molding brush handler interface
 */
interface IMoldingBrushHandler {
  /**
   * Initialize the handler with application context
   * @param context Plugin initialization context
   */
  init(context: IPluginContext): void;

  /**
   * Cleanup and uninitialize the handler
   */
  uninit(): void;

  /**
   * Enter molding brush mode
   */
  enterMoldingBrush(): void;
}

/**
 * Molding Brush Plugin
 * Allows users to copy and apply molding styles between different moldings
 */
declare class MoldingBrushPlugin extends IPlugin {
  /**
   * Internal handler for molding brush operations
   * @private
   */
  private readonly _handler: IMoldingBrushHandler;

  /**
   * Creates a new MoldingBrushPlugin instance
   */
  constructor();

  /**
   * Called when the plugin is activated
   * @param event Activation event containing app instance
   * @param dependencies Plugin dependencies
   */
  onActive(event: IPluginActivationEvent, dependencies: IPluginDependencies): void;

  /**
   * Called when the plugin is deactivated
   */
  onDeactive(): void;

  /**
   * Enters molding brush mode, allowing style application
   */
  enterMoldingBrush(): void;
}

/**
 * Register the Molding Brush plugin with the application
 */
declare namespace HSApp.Plugin {
  /**
   * Register a plugin with the given type
   * @param pluginType Type identifier for the plugin
   * @param pluginClass Plugin class constructor
   */
  function registerPlugin(
    pluginType: PluginType.MoldingBrush,
    pluginClass: typeof MoldingBrushPlugin
  ): void;
}

declare namespace HSFPConstants {
  enum PluginType {
    ContextualTools = 'ContextualTools',
    Toolbar = 'Toolbar',
    LeftMenu = 'LeftMenu',
    MoldingBrush = 'MoldingBrush'
  }
}

export { MoldingBrushPlugin, IMoldingBrushHandler, IPluginContext, IPluginActivationEvent };