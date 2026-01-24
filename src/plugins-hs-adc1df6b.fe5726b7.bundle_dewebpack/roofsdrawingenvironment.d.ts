import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * Signal hook for managing event listeners lifecycle
 */
interface SignalHook {
  listen(signal: any, handler: Function): void;
  dispose(): void;
}

/**
 * Mode controller for managing drawing modes
 */
interface ModeController {
  on(): void;
  off(): void;
}

/**
 * Plugin interface for catalog functionality
 */
interface CatalogPlugin {
  toggleCatalog(visible: boolean): void;
}

/**
 * Plugin interface for resize widget functionality
 */
interface ResizeWidgetPlugin {
  // Add specific methods as needed
}

/**
 * Plugin interface for view switching functionality
 */
interface ViewSwitchPlugin {
  // Add specific methods as needed
}

/**
 * Plugin interface for property bar functionality
 */
interface PropertyBarPlugin {
  // Add specific methods as needed
}

/**
 * Plugin interface for layer editing functionality
 */
interface LayerEditPlugin {
  setlayerEditBarParams(params?: LayerEditBarParams): void;
  show(): void;
}

/**
 * Parameters for layer edit bar configuration
 */
interface LayerEditBarParams {
  includedLayers: HSCore.Model.Layer[];
  switchLayerConfirm?: () => boolean | Promise<boolean>;
}

/**
 * Toolbar for roofs drawing environment
 */
interface Toolbar {
  activate(): string | undefined;
  restore(toolbarId: string | undefined): void;
}

/**
 * UI manager for roofs drawing environment
 */
interface UI {
  renderAux2D(): void;
  destroy(): void;
  showSwitchLayerConfirm(): boolean | Promise<boolean>;
  showAutoGeneratePlaneRoofsConfirm(): boolean | Promise<boolean>;
  aux2DContainer: HTMLElement;
}

/**
 * Canvas wrapper for managing 2D rendering canvas
 */
interface CanvasWrapper {
  aux2DCanvas: HSApp.Canvas.Canvas2D;
  createAux2D(): void;
  destroyAux2D(): void;
  updatelayer(layer: HSCore.Model.Layer): void;
}

/**
 * Factory for creating gizmos in the sketch view
 */
interface GizmoFactory {
  // Add specific methods as needed
}

/**
 * Display object for roofs drawing visualization
 */
interface RoofsDrawingDisplayObject {
  init(): void;
  // Inherits from display object base
}

/**
 * Transaction manager for roofs drawing operations
 */
interface RoofsDrawingTransaction {
  enter(): void;
  exit(): void;
  abort(): void;
  recover(): void;
}

/**
 * Dependencies required for RoofsDrawingEnvironment initialization
 */
export interface RoofsDrawingEnvironmentDependencies {
  [HSFPConstants.PluginType.PropertyBar]: PropertyBarPlugin;
}

/**
 * Options for initializing RoofsDrawingEnvironment
 */
export interface RoofsDrawingEnvironmentOptions {
  /** Application instance */
  app: HSApp.Application;
  /** Handler for roofs drawing operations */
  handler: any; // Replace with specific handler type
  /** Plugin dependencies */
  dependencies: RoofsDrawingEnvironmentDependencies;
}

/**
 * Event data for active layer change
 */
interface ActiveLayerChangedEventData {
  data: {
    oldValue: HSCore.Model.Layer;
  };
}

/**
 * Event data for command lifecycle events
 */
interface CommandEventData {
  data?: {
    cmd?: {
      type: string;
    };
  };
}

/**
 * Options for 2D view mode dropdown
 */
interface ViewModeOption {
  id: HSApp.View.ViewModeEnum;
  icons: Array<{ id: string; fieldName: string }>;
  strings: Array<{ id: string; fieldName: string; hotKey?: string }>;
}

/**
 * 2D view option configuration
 */
interface View2DOption {
  type: string;
  id: string;
  order: number;
  data: {
    options: ViewModeOption[];
    defaultKey: HSApp.View.ViewModeEnum;
  };
}

/**
 * Environment for drawing and editing roofs in 2D view.
 * Provides tools and UI for creating roof structures through sketching.
 * 
 * @extends HSApp.Environment.CommonEnvironment
 */
export declare class RoofsDrawingEnvironment extends HSApp.Environment.CommonEnvironment {
  /** Toolbar instance for drawing tools */
  toolbar: Toolbar | undefined;
  
  /** Handler for roofs drawing operations */
  handler: any;
  
  /** Current active layer being edited */
  layer: HSCore.Model.Layer | undefined;
  
  /** Previous layer reference for switching operations */
  private _previousLayer: HSCore.Model.Layer | undefined;
  
  /** Controller for managing drawing modes */
  modeController: ModeController | undefined;
  
  /** Plugin for catalog functionality */
  catalogPlugin: CatalogPlugin;
  
  /** Plugin for resize widget functionality */
  resizeWidgetPlugin: ResizeWidgetPlugin;
  
  /** Plugin for view switching functionality */
  viewSwitchPlugin: ViewSwitchPlugin;
  
  /** Property bar plugin instance */
  propertyBar: PropertyBarPlugin;
  
  /** Previous toolbar ID for restoration */
  oldToolbarId: string | undefined;
  
  /** Gizmo for interactive manipulation */
  gizmo: any | undefined;
  
  /** Sketch view display object */
  private _sketchView: RoofsDrawingDisplayObject | undefined;
  
  /** Factory for creating sketch gizmos */
  private _sketchGizmoFactory: GizmoFactory | undefined;
  
  /** Application instance reference */
  private _app: HSApp.Application;
  
  /** Signal hook for event management */
  private _signalHook: SignalHook | undefined;
  
  /** UI manager instance */
  private _ui: UI | undefined;
  
  /** Canvas wrapper for 2D rendering */
  private _canvasWrapper: CanvasWrapper | undefined;
  
  /** Transaction for undo/redo operations */
  private _transaction: RoofsDrawingTransaction | undefined;
  
  /** Original roof IDs before editing for tracking changes */
  private _originalRoofIds: string[] | undefined;

  /**
   * Creates a new RoofsDrawingEnvironment instance
   * @param options - Configuration options including app, handler and dependencies
   */
  constructor(options: RoofsDrawingEnvironmentOptions);

  /**
   * Called when the environment is activated
   * @param context - Activation context
   */
  onActivate(context: any): void;

  /**
   * Called when the environment is deactivated
   */
  onDeactivate(): void;

  /**
   * Creates roofs drawing model on the current layer
   * Initializes drawing regions from existing drawn roofs
   * @private
   */
  private _createRoofsDrawing(): void;

  /**
   * Clears roofs drawing model from specified layer
   * @param layer - Layer to clear roofs drawing from
   * @private
   */
  private _clearRoofsDrawing(layer: HSCore.Model.Layer | undefined): void;

  /**
   * Sets up signal listeners for layer and command events
   * @private
   */
  private _listenSignals(): void;

  /**
   * Handles active layer change event
   * @param event - Event data containing old and new layer
   * @private
   */
  private _onActiveLayerChanged(event: ActiveLayerChangedEventData): void;

  /**
   * Handles layer switching logic
   * Recreates sketch view and updates canvas for new layer
   * @private
   */
  private _onSwitchLayer(): void;

  /**
   * Handles command starting event
   * Aborts transaction if switching active layer
   * @param event - Command event data
   * @private
   */
  private _onCommandStarting(event: CommandEventData): void;

  /**
   * Handles command terminated event
   * Switches layer if layer visibility was toggled
   * @param event - Command event data
   * @private
   */
  private _onCommandTerminated(event: CommandEventData): void;

  /**
   * Creates auxiliary 2D canvas for sketch drawing
   * @param container - HTML container element for canvas
   * @private
   */
  private _createCanvas(container: HTMLElement): void;

  /**
   * Destroys auxiliary 2D canvas and cleanup
   * @private
   */
  private _destroyCanvas(): void;

  /**
   * Updates display objects for all layers in the 2D canvas
   * @private
   */
  private _updateAllLayers2d(): void;

  /**
   * Creates sketch view display object for roofs drawing
   * @private
   */
  private _createSketchView(): void;

  /**
   * Destroys sketch view display object
   * @private
   */
  private _destroySketchView(): void;

  /**
   * Initializes UI components for roofs drawing
   * @private
   */
  private _initUI(): void;

  /**
   * Destroys UI components
   * @private
   */
  private _destroyUI(): void;

  /**
   * Indicates whether single room mode is supported
   * @returns Always false for roofs drawing environment
   */
  supportSingleRoomMode(): boolean;

  /**
   * Indicates whether view options are supported
   * @returns Always true for roofs drawing environment
   */
  supportViewOptions(): boolean;

  /**
   * Initializes toolbar and layer edit panels
   * @private
   */
  private _initPanels(): void;

  /**
   * Restores original panels state
   * @private
   */
  private _restorePanels(): void;

  /**
   * Gets 2D view options configuration
   * @returns Array of view option configurations
   */
  get2DViewOptions(): View2DOption[];

  /**
   * Gets the auxiliary 2D canvas instance
   * @returns 2D canvas for drawing
   */
  getCanvas2d(): HSApp.Canvas.Canvas2D;

  /**
   * Recovers all changes and resets to initial state
   */
  onRecoverAll(): void;

  /**
   * Shows confirmation dialog for auto-generating plane roofs
   * @returns Promise or boolean indicating user confirmation
   */
  showAutoGeneratePlaneRoofsConfirm(): boolean | Promise<boolean> | undefined;

  /**
   * Collects all roof IDs of drawn type from all layers
   * @returns Array of roof IDs
   * @private
   */
  private _getAllRoofIds(): string[];

  /**
   * Tracks roof drawing statistics for analytics
   * Compares original and final roof IDs to count creates/deletes
   * @private
   */
  private _trackRoofDrawCount(): void;
}