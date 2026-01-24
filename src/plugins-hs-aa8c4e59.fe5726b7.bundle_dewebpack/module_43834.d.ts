/**
 * Background Setting Popup Plugin
 * Provides background configuration functionality for canvas elements
 */

import { IPlugin } from 'HSApp.Plugin';
import { PluginType } from 'HSFPConstants';

/**
 * Plugin activation context containing app instance
 */
interface PluginContext {
  /** Application instance */
  app: any;
}

/**
 * Plugin dependencies container
 */
interface PluginDependencies {
  [key: string]: any;
}

/**
 * Background setting handler configuration
 */
interface HandlerConfig {
  /** Application instance */
  app: any;
  /** Plugin dependencies */
  dependencies: PluginDependencies;
}

/**
 * Background setting handler for managing canvas backgrounds
 */
declare class BackgroundSettingHandler {
  /**
   * Initialize the handler with app and dependencies
   * @param config - Handler configuration
   */
  init(config: HandlerConfig): void;

  /**
   * Toggle background setting visibility or state
   * @param state - Target state to toggle to
   * @returns Current state after toggle
   */
  toggle(state: boolean): boolean;
}

/**
 * Plugin for managing canvas background settings
 * Provides UI and logic for configuring background properties
 */
declare class BackgroundSettingPopupPlugin extends IPlugin {
  /** Internal handler instance */
  private _handler: BackgroundSettingHandler;

  /**
   * Creates an instance of BackgroundSettingPopupPlugin
   */
  constructor();

  /**
   * Called when the plugin is activated
   * @param context - Plugin activation context
   * @param dependencies - Plugin dependencies
   */
  onActive(context: PluginContext, dependencies: PluginDependencies): void;

  /**
   * Called when the plugin is deactivated
   */
  onDeactive(): void;

  /**
   * Toggle the background setting popup
   * @param state - Desired visibility state
   * @returns Resulting state after toggle
   */
  toggle(state: boolean): boolean;
}

export default BackgroundSettingPopupPlugin;