/**
 * Toolbar Module
 * 
 * Manages toolbar functionality for the RoofsDrawing environment,
 * including button actions, guidelines, measurements, and drawing tools.
 * 
 * @module Toolbar
 */

import type { HSCore } from '@/core';
import type { HSApp } from '@/app';
import type { HSFPConstants } from '@/constants';

/**
 * Configuration for adding toolbar items
 */
interface ToolbarAddConfig {
  /** Items to add to the toolbar */
  addItems: ToolbarItemGroup[];
  /** Items to include from existing toolbar */
  includeItems: string[];
}

/**
 * A group of toolbar items, where each element is a tuple of [item config, parent name]
 */
type ToolbarItemGroup = Array<[ToolbarItem, string]>;

/**
 * Base interface for all toolbar items
 */
interface ToolbarItemBase {
  /** Type of the toolbar item */
  type: 'button' | 'folder' | 'divider';
  /** Unique identifier for the item */
  name: string;
  /** Display order in the toolbar */
  order: number;
}

/**
 * Toolbar button configuration
 */
interface ToolbarButton extends ToolbarItemBase {
  type: 'button';
  /** Display label for the button */
  label: string;
  /** Icon identifier */
  icon?: string;
  /** Tooltip text */
  tooltip?: string;
  /** Whether the button is locked */
  lock?: boolean;
  /** Keyboard shortcut configuration */
  hotkey?: string | { win: string[]; mac: string[] };
  /** Associated command type */
  command?: string;
  /** Log group for analytics */
  logGroup?: string;
  /** Type of line for second toolbar */
  lineType?: 'second';
  /** Click event handler */
  onclick?: () => void | Promise<void>;
}

/**
 * Toolbar folder (dropdown) configuration
 */
interface ToolbarFolder extends ToolbarItemBase {
  type: 'folder';
  /** Display label for the folder */
  label: string;
  /** Icon identifier */
  icon: string;
}

/**
 * Toolbar divider configuration
 */
interface ToolbarDivider extends ToolbarItemBase {
  type: 'divider';
}

/**
 * Union type for all toolbar item types
 */
type ToolbarItem = ToolbarButton | ToolbarFolder | ToolbarDivider;

/**
 * Toolbar changed event data
 */
interface ToolbarChangedEvent {
  data: {
    /** Previous toolbar ID */
    oldId?: string;
    /** New active toolbar ID */
    newId: string;
  };
}

/**
 * Page header complete button render configuration
 */
interface PageHeaderRenderConfig {
  /** Function to get the rendered React element */
  getRenderItem: () => React.ReactElement;
}

/**
 * Plugin interface for toolbar management
 */
interface ToolbarPlugin {
  /** Enum of toolbar IDs */
  ToolbarIdEnum: {
    DEFAULT_TOOLBAR_ID: string;
  };
  /** Signal dispatched when toolbar changes */
  signalToolbarChanged: HSCore.Util.Signal<ToolbarChangedEvent>;
  
  /**
   * Get the currently active toolbar ID
   * @returns The active toolbar ID
   */
  getActiveToolbarId(): string | undefined;
  
  /**
   * Activate a specific toolbar
   * @param toolbarId - ID of the toolbar to activate
   */
  activateToolbar(toolbarId: string): void;
  
  /**
   * Show or hide the second toolbar
   * @param visible - Whether to show the second toolbar
   */
  showSecondToolbar(visible: boolean): void;
  
  /**
   * Add a linked toolbar configuration
   * @param toolbarId - ID for the new toolbar
   * @param parentToolbarId - Parent toolbar ID to link to
   * @param config - Configuration for toolbar items
   */
  addLinkedToolbar(
    toolbarId: string,
    parentToolbarId: string,
    config: ToolbarAddConfig
  ): void;
}

/**
 * Plugin interface for page header management
 */
interface PageHeaderPlugin {
  /**
   * Execute actions before entering an environment
   * @param config - Configuration for the page header button
   * @param position - Position of the button ('left' | 'right')
   */
  beforeEnterEnv(config: PageHeaderRenderConfig, position: string): void;
  
  /**
   * Execute cleanup actions after leaving an environment
   */
  afterOuterEnv(): void;
}

/**
 * Plugin interface for status bar management
 */
interface StatusBarPlugin {
  /**
   * Update the status bar items
   * @param leftItems - Items for the left section
   * @param menuItems - Items for the menu section
   * @param rightItems - Items for the right section
   */
  update(
    leftItems: unknown,
    menuItems: unknown,
    rightItems: unknown
  ): void;
}

/**
 * Plugin manager interface
 */
interface PluginManager {
  /**
   * Get a plugin by type
   * @param pluginType - Type of plugin to retrieve
   * @returns The requested plugin instance
   */
  getPlugin(pluginType: string): any;
}

/**
 * Command manager interface
 */
interface CommandManager {
  /**
   * Cancel the current command
   */
  cancel(): void;
}

/**
 * Application interface
 */
interface App {
  /** Command manager instance */
  cmdManager: CommandManager;
  /** Plugin manager instance */
  pluginManager: PluginManager;
  /** Signal for contextual toolbar refresh */
  signalContextualtoolRefresh: HSCore.Util.Signal<{ forceUpdate: boolean }>;
}

/**
 * RoofsDrawing environment handler interface
 */
interface RoofsDrawingHandler {
  /**
   * Check if all drawing regions are valid
   * @returns True if all regions are valid
   */
  isAllDrawingRegionsValid(): boolean;
  
  /**
   * Automatically generate plane roofs
   */
  autoGeneratePlaneRoofs(): void;
  
  /**
   * Handle save operation
   */
  onApplySave(): void;
  
  /**
   * Handle add guideline operation
   */
  onAddGuideLine(): void;
  
  /**
   * Handle clear guidelines operation
   */
  onClearGuideLines(): void;
  
  /**
   * Handle measure tool activation
   */
  onMeasureTool(): void;
  
  /**
   * Handle add line operation
   */
  onAddLine(): void;
  
  /**
   * Handle add rectangle operation
   */
  onAddRect(): void;
}

/**
 * RoofsDrawing environment interface
 */
interface RoofsDrawingEnvironment {
  /**
   * Show confirmation dialog for auto-generating plane roofs
   * @returns Promise resolving to user's confirmation
   */
  showAutoGeneratePlaneRoofsConfirm(): Promise<boolean>;
  
  /**
   * Recover all changes
   */
  onRecoverAll(): void;
}

/**
 * Plugin map type
 */
interface PluginMap {
  [HSFPConstants.PluginType.Toolbar]: ToolbarPlugin;
  [HSFPConstants.PluginType.PageHeader]: PageHeaderPlugin;
  [HSFPConstants.PluginType.StatusBar]: StatusBarPlugin;
  [HSFPConstants.PluginType.RoofsDrawing]: any;
}

/**
 * Toolbar class for managing RoofsDrawing environment toolbar
 * 
 * This class handles the initialization, activation, and restoration of the toolbar
 * specific to the RoofsDrawing environment. It manages toolbar items, event handlers,
 * and integrations with various plugins.
 */
export declare class Toolbar {
  /** Reference to the RoofsDrawing environment */
  private readonly _environment: RoofsDrawingEnvironment;
  
  /** Toolbar plugin instance */
  private toolbarPlugin: ToolbarPlugin;
  
  /** Page header plugin instance */
  private pageheaderPlugin: PageHeaderPlugin;
  
  /** RoofsDrawing handler instance */
  private handler: RoofsDrawingHandler;
  
  /** Application instance */
  private app: App;
  
  /** Command manager instance */
  private cmdMgr: CommandManager;
  
  /** Unique identifier for this toolbar */
  private toolbarId: string;
  
  /** Left section status bar items */
  private leftItems: unknown;
  
  /** Menu section status bar items */
  private menuItems: unknown;
  
  /** Right section status bar items */
  private rightItems: unknown;
  
  /** Signal hook for managing event listeners */
  private signalHook?: HSCore.Util.SignalHook;
  
  /**
   * Creates a new Toolbar instance
   * 
   * @param environment - The RoofsDrawing environment instance
   * @param handler - Handler for RoofsDrawing operations
   * @param plugins - Map of plugin instances
   */
  constructor(
    environment: RoofsDrawingEnvironment,
    handler: RoofsDrawingHandler,
    plugins: PluginMap
  );
  
  /**
   * Activate the toolbar
   * 
   * Initializes the toolbar, activates it in the plugin, sets up page header,
   * and registers event listeners.
   * 
   * @returns The previously active toolbar ID
   */
  activate(): string | undefined;
  
  /**
   * Restore the previous toolbar state
   * 
   * Restores the previous toolbar, cleans up page header, updates status bar,
   * and disposes event listeners.
   * 
   * @param previousToolbarId - ID of the toolbar to restore
   */
  restore(previousToolbarId: string | undefined): void;
  
  /**
   * Initialize toolbar configuration
   * 
   * Sets up all toolbar items including buttons, folders, and dividers
   * with their respective handlers and configurations.
   */
  private init(): void;
  
  /**
   * Handle toolbar changed event
   * 
   * Shows the second toolbar when this toolbar becomes active.
   * 
   * @param event - Toolbar changed event data
   */
  private _onToolbarChanged(event: ToolbarChangedEvent): void;
  
  /**
   * Get the page header complete button configuration
   * 
   * Creates and returns the configuration for the complete button
   * displayed in the page header, including its click handler.
   * 
   * @returns Page header render configuration
   */
  private _getPageHeaderCompleteBtn(): PageHeaderRenderConfig;
}