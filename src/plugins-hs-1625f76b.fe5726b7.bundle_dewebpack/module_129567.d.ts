/**
 * Status bar and property bar management module
 * Handles UI controls, tooltips, and context-sensitive toolbars based on selection, commands, and environment state
 */

import type { Application } from './Application';
import type { CommandManager } from './CommandManager';
import type { SelectionManager } from './SelectionManager';
import type { TransactionManager } from './TransactionManager';
import type { PluginManager } from './PluginManager';
import type { EnvironmentManager } from './EnvironmentManager';
import type { Floorplan } from './Floorplan';
import type { Layer } from './Layer';
import type { Entity } from './Entity';
import type { Command } from './Command';
import type { Environment } from './Environment';
import type { View } from './View';
import type { Signal } from './Signal';

/**
 * Property bar control types
 */
export enum PropertyBarControlTypeEnum {
  divider = 'divider',
  toggleButton = 'toggleButton',
  lengthInput = 'lengthInput',
  ImageTextButton = 'ImageTextButton',
  dropdownlist = 'dropdownlist',
  image = 'image',
  arrowdivider = 'arrowdivider',
  label = 'label'
}

/**
 * Refresh options for UI updates
 */
export interface RefreshOptions {
  /** Whether to refresh the status bar */
  refreshStatusBar?: boolean;
  /** Whether to refresh the layer edit bar */
  refreshLayerEditBar?: boolean;
  /** Whether to update height controls */
  updateHeight?: boolean;
}

/**
 * Status bar item descriptor
 */
export interface StatusBarItem {
  /** Unique identifier for the control */
  id?: string;
  /** Control type */
  type: PropertyBarControlTypeEnum | string;
  /** Display order (lower numbers appear first) */
  order?: number;
  /** Control-specific configuration data */
  data?: Record<string, unknown>;
}

/**
 * Toggle button control data
 */
export interface ToggleButtonData {
  label: string;
  checkedChildren: string;
  unCheckedChildren: string;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  disabled: boolean;
}

/**
 * Length input control data
 */
export interface LengthInputData {
  label: string;
  labelPosition: 'left' | 'right';
  name: string;
  className: string;
  value: number;
  options: {
    displayDigits: number;
    rules: {
      range: {
        min: number;
        max: number;
      };
      positiveOnly: boolean;
    };
    includeUnit: boolean;
    readOnly: boolean;
  };
  onValueChange: (event: { detail: { value: number } }) => void;
}

/**
 * Image text button control data
 */
export interface ImageTextButtonData {
  className: string;
  label: string;
  normalSrc: string;
  hoverSrc: string;
  clickSrc: string;
  tooltips: string;
  labelPosition: 'left' | 'right';
  onclick: () => void;
}

/**
 * Event data for status bar population
 */
export interface PopulateStatusBarEventData {
  menuItems: StatusBarItem[];
  leftItems: StatusBarItem[];
  rightItems: StatusBarItem[];
  rightPropertyItems: StatusBarItem[];
  ignoredItemIds: Array<string | RegExp>;
  view: View;
  selection?: Array<{ entity: Entity }>;
  selectedEntities?: Entity[];
  sourceEvt?: boolean;
  cmd?: Command;
  environment?: Environment;
  option?: RefreshOptions;
}

/**
 * Selection change event data
 */
export interface SelectionChangedEventData {
  data?: {
    newEntities?: Entity[];
  };
}

/**
 * Command termination event data
 */
export interface CommandTerminatedEventData {
  data?: {
    cmd?: Command & {
      type: string;
      subs?: Array<{ type: string }>;
    };
  };
}

/**
 * Undo/Redo event data
 */
export interface UndoRedoEventData {
  data?: {
    request?: {
      type: string;
    };
  };
}

/**
 * Highlight change event data
 */
export interface HighlightChangedEventData {
  // Extend based on actual highlight data structure
  [key: string]: unknown;
}

/**
 * Status bar control interface
 */
export interface StatusBarControl {
  update?(data: unknown): void;
  // Add other common control methods as needed
}

/**
 * Tooltip handler interface
 */
export interface TooltipHandler {
  handleHighlight(event: HighlightChangedEventData): void;
  handleSelection(event: SelectionChangedEventData): void;
  handleCmdTerminate(event: CommandTerminatedEventData): void;
  getHelpTipsItem(tip?: string): StatusBarItem;
  setTip(tip: string, source?: unknown): void;
  getTip(): string | undefined;
  clearTip(source?: unknown): void;
}

/**
 * Signal API object containing all signals
 */
export interface SignalAPIObject {
  signalContralPopup: Signal<Record<string, never>>;
  signalRetiringStatusBar: Signal<void>;
  signalPopulateCommandStatusBar: Signal<PopulateStatusBarEventData>;
  signalPopulateStatusBar: Signal<PopulateStatusBarEventData>;
}

/**
 * UI component for rendering status bar controls
 */
export interface StatusBarUI {
  signalSizeGrow: Signal<void>;
  getStatusBarControlById_(id: string): StatusBarControl | undefined;
  show_(): void;
  hide_(): void;
  redraw_(items: StatusBarItem[]): void;
}

/**
 * Status bar plugin interface
 */
export interface StatusBarPlugin {
  signalSizeGrow: Signal<void>;
  getItemById(id: string): StatusBarControl | undefined;
  show(): void;
  hide(): void;
  update(leftItems: StatusBarItem[], menuItems: StatusBarItem[], rightItems: StatusBarItem[]): void;
}

/**
 * Plugin collection type
 */
export interface PluginCollection {
  [key: string]: StatusBarPlugin;
}

/**
 * Processor interface for status bar items
 */
export interface StatusBarProcessor {
  init_(app: Application, signalAPIObject: SignalAPIObject, plugins: PluginCollection): void;
  uninit_(): void;
  generateUnitDropDownItm_?(): StatusBarItem;
}

/**
 * Contextual toolbar manager
 * Manages dynamic UI controls in the status bar and property bar based on application state
 */
export default class ContextualToolbarManager {
  private _app: Application;
  private _signalAPIObject: SignalAPIObject;
  private _statusBarPlugin: StatusBarPlugin;
  private _cmdMgr: CommandManager;
  private _selectionMgr: SelectionManager;
  private _ui: StatusBarUI;
  private _signalHook: HSCore.Util.SignalHook;
  private _isHidden: boolean;
  private _needRefresh: boolean;
  private _enabledRefresh: boolean;
  private _updatingItemsMap: Map<string, StatusBarItem>;
  private _tooltipHandler: TooltipHandler;
  private _cacheEntityID: string | undefined;
  private _showingItems: Array<{ id?: string; type: string; order?: number }> | undefined;
  private _customizedModelingEnvironment: boolean;

  /** Whether to hide property bar items for web */
  public hidePropertyBarItemsForWeb: boolean;
  /** Whether to hide status bar items for web */
  public hideStatusBarItemsForWeb: boolean;
  /** Force refresh flag */
  public mustRefresh: boolean;

  /**
   * Initialize the contextual toolbar manager
   * @param app - Main application instance
   * @param signalAPIObject - Signal dispatcher for UI events
   * @param plugins - Collection of available plugins
   */
  public init_(app: Application, signalAPIObject: SignalAPIObject, plugins: PluginCollection): void;

  /**
   * Clean up resources and unhook signals
   */
  public uninit_(): void;

  /**
   * Handle document opened event
   */
  public onDocumentOpened(): void;

  /**
   * Update toolbar state when customized modeling environment changes
   * @param isCustomized - Whether customized modeling is active
   */
  public onCustomizedModelingEnvironmentChanged(isCustomized: boolean): void;

  /**
   * Get a status bar control by its ID
   * @param id - Control identifier
   * @returns The control instance or undefined if not found
   */
  public getStatusBarControlById_(id: string): StatusBarControl | undefined;

  /**
   * Queue items for update
   * @param items - Array of items to update
   */
  public update_(items?: StatusBarItem[]): void;

  /**
   * Show the toolbar
   */
  public show_(): void;

  /**
   * Hide the toolbar
   * @param enableFlag - Whether to disable refresh when hiding (default: true)
   */
  public hide_(enableFlag?: boolean): void;

  /**
   * Check if property bar items should be shown for web
   * @returns True if items should be shown
   */
  public willShowPropertyBarItemsForWeb_(): boolean;

  /**
   * Enable display of status bar items for web
   */
  public showStatusBarItemsForWeb_(): void;

  /**
   * Disable display of status bar items for web
   */
  public hideStatusBarItemsForWeb_(): void;

  /**
   * Check if status bar items should be shown for web
   * @returns True if items should be shown
   */
  public willShowStatusBarItemsForWeb_(): boolean;

  /**
   * Debug method to get currently showing items
   * @returns Array of currently displayed items
   */
  public debugGetStatusBarShowingItems_(): Array<{ id?: string; type: string; order?: number }> | undefined;

  /**
   * Get help tips status bar item
   * @param tip - Optional tip text
   * @returns Status bar item for help tips
   */
  public getHelpTipsItem(tip?: string): StatusBarItem;

  /**
   * Set tooltip text
   * @param tip - Tooltip content
   * @param source - Source object triggering the tooltip
   */
  public setTip(tip: string, source?: unknown): void;

  /**
   * Get current tooltip text
   * @returns Current tooltip or undefined
   */
  public getTip(): string | undefined;

  /**
   * Clear tooltip
   * @param source - Source object to clear tooltip for
   */
  public clearTip(source?: unknown): void;

  /**
   * Disable all signal hookups
   */
  public disableAllHookups(): void;

  /**
   * Re-enable all signal hookups
   */
  public enableAllHookups(): void;

  /**
   * Generate wall setting status bar items
   * @returns Array of wall-related control items
   * @private
   */
  private _setWallSettingItems(): StatusBarItem[];

  /**
   * Generate unit dropdown item
   * @returns Unit dropdown status bar item
   * @private
   */
  private _generateUnitDropDownItm(): StatusBarItem;

  /**
   * Add signal listeners
   * @private
   */
  private _addSignalHooks(): void;

  /**
   * Handle highlight change events
   * @param event - Highlight event data
   * @private
   */
  private _onHighlightChanged(event: HighlightChangedEventData): void;

  /**
   * Handle selection change events
   * @param event - Selection event data
   * @private
   */
  private _onSelectionChanged(event: SelectionChangedEventData): void;

  /**
   * Handle pave selection change events
   * @param event - Pave selection event data
   * @private
   */
  private _onPaveSelectionChanged(event: unknown): void;

  /**
   * Handle command termination events
   * @param event - Command termination event data
   * @private
   */
  private _onCommandTerminated(event: CommandTerminatedEventData): void;

  /**
   * Handle undo/redo completion events
   * @param event - Undo/redo event data
   * @private
   */
  private _onUndoRedoRequestDone(event: UndoRedoEventData): void;

  /**
   * Handle new document open event
   * @private
   */
  private _onOpenNewDocument(): void;

  /**
   * Handle environment activation events
   * @param event - Environment event data
   * @private
   */
  private _onEnvironmentActivated(event: unknown): void;

  /**
   * Handle view change events
   * @private
   */
  private _onViewChanged(): void;

  /**
   * Schedule a refresh (debounced via UI thread)
   * @param needRefresh - Whether refresh is needed
   * @param options - Refresh options
   * @private
   */
  private _refresh(needRefresh?: boolean, options?: RefreshOptions): void;

  /**
   * Perform immediate refresh
   * @param needRefresh - Whether refresh is needed
   * @param options - Refresh options
   * @private
   */
  private _refreshImmediate(needRefresh?: boolean, options?: RefreshOptions): void;

  /**
   * Execute full refresh logic
   * @param sourceEvt - Source event triggering refresh
   * @param options - Refresh options
   * @private
   */
  private _doRefresh(sourceEvt: boolean, options?: RefreshOptions): void;

  /**
   * Process and sort bottom menu items
   * @param menuItems - Menu items
   * @param leftItems - Left-aligned items
   * @param rightItems - Right-aligned items
   * @param ignoredItemIds - IDs/patterns of items to ignore
   * @returns Processed menu items
   * @private
   */
  private _dealBottomMenuItems(
    menuItems: StatusBarItem[],
    leftItems: StatusBarItem[],
    rightItems: StatusBarItem[],
    ignoredItemIds: Array<string | RegExp>
  ): StatusBarItem[];

  /**
   * Filter and sort items by ignored IDs
   * @param items - Items to filter
   * @param ignoredItemIds - IDs/patterns to exclude
   * @returns Filtered and sorted items
   * @private
   */
  private _filterAndSortItems(items: StatusBarItem[], ignoredItemIds: Array<string | RegExp>): StatusBarItem[];

  /**
   * Display bottom menu items
   * @param menuItems - Menu items
   * @param leftItems - Left-aligned items
   * @param rightItems - Right-aligned items
   * @param ignoredItemIds - IDs/patterns of items to ignore
   * @private
   */
  private _showBottomMenuItems(
    menuItems: StatusBarItem[],
    leftItems: StatusBarItem[],
    rightItems: StatusBarItem[],
    ignoredItemIds: Array<string | RegExp>
  ): void;

  /**
   * Conditionally show menu items
   * @param menuItems - Menu items
   * @param leftItems - Left-aligned items
   * @param rightItems - Right-aligned items
   * @param ignoredItemIds - IDs/patterns of items to ignore
   * @param options - Refresh options
   * @private
   */
  private _showMenuItems(
    menuItems: StatusBarItem[],
    leftItems: StatusBarItem[],
    rightItems: StatusBarItem[],
    ignoredItemIds: Array<string | RegExp>,
    options?: RefreshOptions
  ): void;

  /**
   * Update existing controls with new data
   * @param items - Items to update
   * @private
   */
  private _doUpdate(items: StatusBarItem[]): void;
}