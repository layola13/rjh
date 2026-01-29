/**
 * Floor Plan Collection Plugin Module
 * Provides floor plan collection functionality for design initialization
 */

import { IPlugin } from 'HSApp.Plugin';
import { PluginType, LogGroupTypes } from 'HSFPConstants';
import { EventGroupEnum, EventTrack } from 'HSApp.Util';

/**
 * Track data for analytics logging
 */
interface TrackData {
  /** Unique identifier for the entry point */
  id: string;
  /** Human-readable description of the action */
  description: string;
}

/**
 * Options for showing the floor plan collection dialog
 */
interface ShowOptions {
  /** Entry point identifier (e.g., 'toolbar', 'catalog', 'welcomePanel') */
  entry?: 'toolbar' | 'catalog' | 'welcomePanel' | string;
}

/**
 * Dependencies required by the floor plan collection plugin
 */
interface PluginDependencies {
  [PluginType.Toolbar]: ToolbarPlugin;
}

/**
 * Toolbar plugin interface
 */
interface ToolbarPlugin {
  /**
   * Get a toolbar item by name
   * @param name - The name of the toolbar item
   */
  getItem(name: string): ToolbarItem;
}

/**
 * Toolbar item interface
 */
interface ToolbarItem {
  /**
   * Add a new menu item to the toolbar
   * @param config - Menu item configuration
   */
  add(config: MenuItemConfig): void;
}

/**
 * Menu item configuration
 */
interface MenuItemConfig {
  /** Display label for the menu item */
  label: string;
  /** Internal name identifier */
  name: string;
  /** Icon file path */
  icon: string;
  /** Display order priority */
  order: number;
  /** Whether the item is enabled */
  enable: boolean;
  /** Click event handler */
  onclick: () => void;
}

/**
 * User track logger entry data
 */
interface UserTrackLogEntry {
  /** Description of the user action */
  description: string;
  /** Log group type */
  group: string;
  /** Operation type */
  type: string;
  /** Active section identifier */
  activeSection?: string;
  /** Active section display name */
  activeSectionName?: string;
  /** Click ratio tracking data */
  clicksRatio?: {
    id: string;
    name: string;
  };
  /** Whether the operation was valid */
  validOperation?: boolean;
}

/**
 * Floor Plan Collection Plugin
 * Provides a collection of floor plans for users to choose from when starting a new design
 * @extends {IPlugin}
 */
declare class FloorPlanCollectionPlugin extends IPlugin {
  /** Reference to the toolbar plugin */
  private toolbarPlugin: ToolbarPlugin;
  
  /** Reference to the main application instance */
  private app: HSApp.App;

  /**
   * Creates a new FloorPlanCollectionPlugin instance
   */
  constructor();

  /**
   * Called when the plugin is activated
   * @param context - Plugin activation context
   * @param dependencies - Map of required plugin dependencies
   */
  onActive(context: unknown, dependencies: PluginDependencies): void;

  /**
   * Injects floor plan collection menu item into the toolbar
   * Only injects for 'ezhome' tenant and non-HXRR environments
   */
  private injectToolbar(): void;

  /**
   * Shows the floor plan collection dialog
   * @param options - Options specifying the entry point
   */
  show(options: ShowOptions): void;

  /**
   * Generates tracking data based on the entry point
   * @param options - Options containing the entry point identifier
   * @returns Track data object with id and description
   */
  private getTrackData(options: ShowOptions): TrackData;

  /**
   * Logs tracking information for analytics
   * @param trackData - The tracking data to log
   */
  private _trackLogger(trackData: TrackData): void;

  /**
   * Hides the floor plan collection dialog
   * @param event - Optional event object
   */
  hide(event?: Event): void;

  /**
   * Handler for closing the floor plan collection form
   * Cleans up DOM elements and logs user tracking data
   * @param event - Optional event object to stop propagation
   */
  private onCloseFormHandler(event?: Event): void;
}

/**
 * Plugin registration
 * Registers the FloorPlanCollectionPlugin with the plugin system
 */
export declare function registerFloorPlanCollectionPlugin(): void;

export default FloorPlanCollectionPlugin;