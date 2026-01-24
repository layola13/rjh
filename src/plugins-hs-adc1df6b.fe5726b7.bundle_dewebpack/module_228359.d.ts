import { HSApp } from './518193';
import { Handler } from './350938';
import { OutdoorDrawingUtil } from './378394';

declare global {
  namespace HSFPConstants {
    enum PluginType {
      Toolbar = 'Toolbar',
      ContextualTools = 'ContextualTools',
      PropertyBar = 'PropertyBar',
      LeftMenu = 'LeftMenu',
      RightMenu = 'RightMenu',
      PageHeader = 'PageHeader',
      OutdoorDrawing = 'OutdoorDrawing'
    }
  }
}

/**
 * Plugin configuration interface for outdoor drawing
 */
interface IPluginConfig {
  /** Plugin name identifier */
  name: string;
  /** Plugin description */
  description: string;
  /** Array of plugin type dependencies required for this plugin to function */
  dependencies: HSFPConstants.PluginType[];
}

/**
 * Outdoor drawing plugin class
 * Manages outdoor drawing functionality including environment entry/exit and face deletion
 */
declare class OutdoorDrawingPlugin extends HSApp.Plugin.IPlugin {
  /** Internal handler for outdoor drawing operations */
  private _handler?: Handler;

  /**
   * Creates an instance of OutdoorDrawingPlugin
   * Initializes with required dependencies on Toolbar, ContextualTools, PropertyBar, LeftMenu, RightMenu, and PageHeader
   */
  constructor();

  /**
   * Called when the plugin is activated
   * Initializes the handler with the application context
   * @param context - Plugin activation context containing the app instance
   * @param options - Additional options for plugin activation
   */
  onActive(context: { app: HSApp.App }, options: unknown): void;

  /**
   * Called when the plugin is deactivated
   * Performs cleanup operations
   */
  onDeactive(): void;

  /**
   * Enters outdoor drawing mode
   * Activates the outdoor drawing environment using the root layer of the scene
   */
  enterOutdoorDrawing(): void;

  /**
   * Exits outdoor drawing mode
   * Deactivates the outdoor drawing environment
   */
  exitOutdoorDrawing(): void;

  /**
   * Checks if an outdoor face can be deleted
   * @param face - The outdoor face element to check for deletion eligibility
   * @returns True if the face can be deleted, false otherwise
   */
  couldDeleteOutdoorFace(face: unknown): boolean;
}

export { OutdoorDrawingPlugin };