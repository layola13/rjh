/**
 * Property Bar Plugin Module
 * 
 * This module defines the Property Bar Plugin for HSApp, which manages
 * the property panel UI component for displaying and editing object properties.
 * 
 * @module PropertyBarPlugin
 */

import { Handler } from './handler';

/**
 * Plugin initialization context containing the application instance and dependencies
 */
interface PluginContext {
  /** The main application instance */
  app: unknown;
  /** Array of dependent plugins or services */
  dependencies: unknown[];
}

/**
 * Plugin metadata configuration
 */
interface PluginMetadata {
  /** Display name of the plugin */
  name: string;
  /** Brief description of plugin functionality */
  description: string;
  /** List of plugin dependencies */
  dependencies: string[];
}

/**
 * Property Bar Plugin class
 * 
 * Manages the property panel UI, allowing users to view and edit properties
 * of selected objects. Supports auto-updates, read-only mode, tabs, and
 * custom property widgets.
 * 
 * @extends HSApp.Plugin.IPlugin
 */
declare class PropertyBarPlugin extends HSApp.Plugin.IPlugin {
  /**
   * Internal handler instance that manages property bar logic
   * @private
   */
  private handler: Handler;

  /**
   * Signal emitted when property bar needs to be populated with data
   * @public
   */
  public signalPopulatePropertyBar: Handler['signalPopulatePropertyBar'];

  /**
   * Signal emitted when property bar population is completed
   * @public
   */
  public signalPopulatePropertyBarTeminated: Handler['signalPopulatePropertyBarTeminated'];

  /**
   * Signal emitted when property bar tab is switched
   * @public
   */
  public signalSwitchPropertyBarTab: Handler['signalSwitchPropertyBarTab'];

  /**
   * Creates a new PropertyBarPlugin instance
   * 
   * Initializes the plugin with default metadata and creates internal handler
   */
  constructor();

  /**
   * Called when plugin is activated
   * 
   * @param context - Plugin initialization context
   * @param dependencies - Resolved dependency plugins
   */
  onActive(context: PluginContext, dependencies: unknown[]): void;

  /**
   * Called when plugin is deactivated
   * 
   * Cleanup method for plugin shutdown
   */
  onDeactive(): void;

  /**
   * Shows the property bar panel
   */
  show(): void;

  /**
   * Hides the property bar panel
   */
  hide(): void;

  /**
   * Updates the property bar with current selection data
   * 
   * Refreshes all property values displayed in the panel
   */
  update(): void;

  /**
   * Displays properties for a specific object
   * 
   * @param target - The object whose properties should be displayed
   */
  showProperty(target: unknown): void;

  /**
   * Switches property bar to read-only mode
   * 
   * Disables all editing controls, making properties view-only
   */
  setPropertyBarReadonlyMode(): void;

  /**
   * Switches property bar to edit mode
   * 
   * Enables editing controls for property modification
   */
  setPropertyBarEditMode(): void;

  /**
   * Enables automatic updates of property values
   * 
   * Property bar will automatically refresh when selection changes
   */
  enableAutoUpdate(): void;

  /**
   * Disables automatic updates of property values
   * 
   * Property bar will only update when manually triggered
   */
  disableAutoUpate(): void;

  /**
   * Creates the default property bar DOM node
   * 
   * @returns The default property bar HTML element
   */
  createDefaultPropertyBarNode(): HTMLElement;

  /**
   * Retrieves all widgets of a specific type from the property bar
   * 
   * @param widgetType - The type identifier of widgets to retrieve
   * @returns Array of widgets matching the specified type
   */
  getWidgetsByType(widgetType: string): unknown[];

  /**
   * Switches the active tab in the property bar
   * 
   * @param tabId - Identifier of the tab to switch to
   */
  switchPropertyBarTab(tabId: string): void;

  /**
   * Collapses/folds the property bar panel
   * 
   * Minimizes the property bar to save screen space
   */
  foldPropertybar(): void;
}

/**
 * Global HSApp namespace
 */
declare namespace HSApp {
  namespace Plugin {
    /**
     * Base plugin interface that all plugins must implement
     */
    interface IPlugin {
      /** Called when plugin is activated */
      onActive(context: unknown, dependencies: unknown[]): void;
      /** Called when plugin is deactivated */
      onDeactive(): void;
    }

    /**
     * Registers a plugin with the HSApp plugin system
     * 
     * @param pluginType - Type identifier from HSFPConstants.PluginType
     * @param pluginClass - Plugin class constructor
     */
    function registerPlugin(
      pluginType: string,
      pluginClass: new () => IPlugin
    ): void;
  }
}

/**
 * Global constants for HSApp
 */
declare namespace HSFPConstants {
  namespace PluginType {
    /** Property Bar plugin type identifier */
    const PropertyBar: string;
  }
}

export { PropertyBarPlugin };