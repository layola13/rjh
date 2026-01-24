/**
 * Handler module for managing layout design mode and related UI interactions.
 * Handles menu item clicks, environment activation, and toolbar/property bar state management.
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * Plugin initialization configuration interface
 */
interface HandlerInitConfig {
  /** Main application instance */
  app: HSApp.App.Application;
  /** Plugin dependencies map */
  dependencies: {
    [HSFPConstants.PluginType.Toolbar]: ToolbarPlugin;
    [HSFPConstants.PluginType.PropertyBar]: PropertyBarPlugin;
  };
}

/**
 * Menu item click event data structure
 */
interface MenuItemClickEvent {
  data: {
    /** Submenu information, may be undefined */
    subMenu?: {
      /** Submenu identifier */
      id: string;
    };
  };
}

/**
 * Toolbar plugin interface for managing toolbar item states
 */
interface ToolbarPlugin {
  /** Disable a specific toolbar item by path */
  disableItem(itemPath: string): void;
  /** Enable a specific toolbar item by path */
  enableItem(itemPath: string): void;
}

/**
 * Property bar plugin interface for UI property updates
 */
interface PropertyBarPlugin {
  /** Trigger property bar UI update */
  update(): void;
}

/**
 * Main handler class for layout design mode management.
 * Coordinates between application state, toolbar, and property bar plugins.
 */
export declare class Handler {
  /** Signal hook utility for event listening and management */
  signalHook: HSCore.Util.SignalHook<Handler>;
  
  /** Reference to the main application instance */
  app: HSApp.App.Application;
  
  /** Toolbar plugin instance for controlling toolbar items */
  toolbarPlugin: ToolbarPlugin;
  
  /** Property bar plugin instance for property panel updates */
  propertybarPlugin: PropertyBarPlugin;
  
  /** Cached rendering mode before entering layout design mode */
  currentRenderingMode: HSApp.App.RenderingMode;

  /**
   * Initialize the handler with application and plugin dependencies.
   * Sets up signal listeners for menu clicks and environment activation.
   * @param config Configuration object containing app and plugin dependencies
   */
  init(config: HandlerInitConfig): void;

  /**
   * Handle menu item click events.
   * Toggles layout design mode and adjusts toolbar/rendering settings accordingly.
   * 
   * When entering layout design mode:
   * - Disables material brush toolbar item
   * - Switches rendering mode to ShadingWithEdges
   * - Updates property bar
   * 
   * When exiting layout design mode:
   * - Enables material brush toolbar item
   * - Restores previous rendering mode
   * 
   * @param event Menu click event containing submenu identification data
   */
  handleClick(event: MenuItemClickEvent): void;

  /**
   * Handle environment activation events.
   * Automatically navigates to the draw category page if layout design mode is active.
   */
  handleEnvironmentActivating(): void;
}