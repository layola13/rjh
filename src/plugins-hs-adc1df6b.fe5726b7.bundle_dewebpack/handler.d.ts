/**
 * Handler module for roofs drawing functionality
 * Manages the roofs drawing environment, commands, requests, and UI interactions
 */

import type { HSApp } from './app-types';
import type { HSCore } from './core-types';
import type { SignalHook } from './signal-hook';
import type { RoofsDrawingEnvironment } from './roofs-drawing-environment';
import type { Layer } from './layer-types';
import type { NCustomizedParametricRoof } from './roof-types';
import type { InteractiveModel } from './interactive-model-types';
import type { ExtraordinaryFace2d, ExtraordinaryGuideline } from './extraordinary-types';
import type { InteractiveExSketchable } from './sketchable-types';

/**
 * Dependencies required by the Handler
 */
interface HandlerDependencies {
  [HSFPConstants.PluginType.LeftMenu]?: LeftMenuPlugin;
  [HSFPConstants.PluginType.PropertyBar]?: PropertyBarPlugin;
  [HSFPConstants.PluginType.ContextualTools]?: ContextualToolsPlugin;
  [HSFPConstants.PluginType.ParametricRoof]?: ParametricRoofPlugin;
  [key: string]: unknown;
}

/**
 * Selection change event data
 */
interface SelectionChangedEventData {
  newEntities?: unknown[];
  event?: MouseEvent;
  data?: {
    newEntities?: unknown[];
    event?: MouseEvent;
  };
}

/**
 * Signal event wrapper
 */
interface SignalEvent<T = unknown> {
  data: T;
}

/**
 * Right menu customized data
 */
interface RightMenuCustomizedData {
  defaultItems: MenuItem[];
  customizedItems: MenuItem[];
}

/**
 * Menu item configuration
 */
interface MenuItem {
  label: string;
  id: string;
  src: string;
  order: number;
  uiMode: string[];
  disable?: boolean;
  onClick: () => void;
}

/**
 * Property bar populate event data
 */
interface PropertyBarPopulateData {
  push: (...items: unknown[]) => void;
  [key: string]: unknown;
}

/**
 * Status bar populate event data
 */
interface StatusBarPopulateData {
  ignoredItemIds: string[];
}

/**
 * Roof generation configuration
 */
interface RoofGenerationConfig {
  roofs: Array<{
    drawingRegion: unknown;
    meta: unknown;
    layer: Layer;
  }>;
}

/**
 * Roof meta info result
 */
interface RoofMetaInfoResult {
  meta?: unknown;
}

/**
 * Main handler class for roofs drawing module
 * Coordinates drawing operations, environment management, and user interactions
 */
export declare class Handler {
  private _signalHook?: SignalHook;
  private _app?: HSApp.Application;
  private _dependencies?: HandlerDependencies;
  private _fromEnvironmentId?: string;
  private _prevEnv2DViewMode?: HSApp.View.ViewModeEnum;

  /**
   * Get handler dependencies
   */
  get dependencies(): HandlerDependencies | undefined;

  /**
   * Initialize the handler with application and dependencies
   * @param app - The main application instance
   * @param dependencies - Plugin dependencies required by the handler
   */
  init(app: HSApp.Application, dependencies: HandlerDependencies): void;

  /**
   * Register all command handlers with the command manager
   */
  registerCommands(): void;

  /**
   * Register all request handlers with the transaction manager
   */
  registerRequests(): void;

  /**
   * Handle selection change events
   * @param event - Selection change event data
   */
  private _onSelectionChanged(event: SignalEvent<SelectionChangedEventData>): void;

  /**
   * Select roof entity when a roof region is selected
   * @param event - Selection event data
   */
  private _selectRoofByRoofRegion(event: SelectionChangedEventData): void;

  /**
   * Select roof region when a roof is selected
   * @param event - Selection event data
   */
  private _selectRoofRegionByRoof(event: SelectionChangedEventData): void;

  /**
   * Initialize the roofs drawing environment
   */
  private _initEnviroment(): void;

  /**
   * Enter the roofs drawing environment
   * @param layer - The layer to activate for roofs drawing
   */
  enterEnvironment(layer: Layer): void;

  /**
   * Exit the roofs drawing environment and restore previous state
   */
  exitEnvironment(): void;

  /**
   * Populate right-click context menu with customized items
   * @param event - Menu populate event
   */
  private _onPopulateRightmenuCustomized(event: SignalEvent<RightMenuCustomizedData>): void;

  /**
   * Populate property bar with roof-specific properties
   * @param event - Property bar populate event
   */
  private _onPopulatePropertyBar(event: SignalEvent<PropertyBarPopulateData>): void;

  /**
   * Populate status bar and configure ignored items
   * @param event - Status bar populate event
   */
  private _onPopulateStatusBar(event: SignalEvent<StatusBarPopulateData>): void;

  /**
   * Listen to transaction state changes (commit, undo, redo)
   */
  private _listenStateChanged(): void;

  /**
   * Cancel current command when root transaction session changes
   */
  private _cancelCmdOnRootTransSession(): void;

  /**
   * Register keyboard shortcuts for the handler
   */
  registerHotkeys(): void;

  /**
   * Unregister keyboard shortcuts
   */
  unregisterHotkeys(): void;

  /**
   * Register mouse event callback with left menu
   * @param callback - Mouse event handler
   */
  registerLeftMenuMouseEvent(callback: (event: MouseEvent) => void): void;

  /**
   * Unregister mouse event callback from left menu
   * @param callback - Mouse event handler
   */
  unregisterLeftMenuMouseEvent(callback: (event: MouseEvent) => void): void;

  /**
   * Save current drawing state
   */
  onApplySave(): void;

  /**
   * Handle delete key press - delete selected entities
   */
  onDelete(): void;

  /**
   * Start line drawing command
   */
  onAddLine(): void;

  /**
   * Start rectangle drawing command
   */
  onAddRect(): void;

  /**
   * Activate measure tool (2D or 3D based on view)
   */
  onMeasureTool(): void;

  /**
   * Add a guideline to assist drawing
   */
  onAddGuideLine(): void;

  /**
   * Clear all guidelines from the drawing
   */
  onClearGuideLines(): void;

  /**
   * Check if all drawing regions have valid roof assignments
   * @returns True if all regions are valid
   */
  isAllDrawingRegionsValid(): boolean;

  /**
   * Automatically generate plane roofs for unassigned drawing regions
   */
  autoGeneratePlaneRoofs(): void;

  /**
   * Check if roofs can be drawn (requires valid overground layers with paths)
   * @returns True if drawing is allowed
   */
  canDrawRoofs(): boolean;

  /**
   * Initialize UI components for roofs drawing mode
   */
  private _InitRoofUIs(): void;

  /**
   * Destroy UI components when exiting roofs drawing mode
   */
  private _destroyRoofUIs(): void;

  /**
   * Show layer selection dialog
   * @returns Promise resolving to true if layer selected, false if cancelled
   */
  showLayerChooseDialog(): Promise<boolean>;

  /**
   * Close the layer selection dialog
   */
  closeChooseDialog(): void;

  /**
   * Handle layer selection confirmation
   * @param layer - Selected layer to enter drawing mode
   */
  OnClickEnterBtn(layer: Layer): void;

  /**
   * Get currently selected roof region
   * @returns Selected roof region or undefined
   */
  getSelectedRoofRegion(): InteractiveExSketchable | undefined;

  /**
   * Get currently selected roof entity
   * @returns Selected roof or undefined
   */
  getSelectedRoof(): NCustomizedParametricRoof | undefined;
}