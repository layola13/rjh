/**
 * Outdoor drawing environment for 2D sketch editing
 * Manages the lifecycle of outdoor drawing mode including canvas, UI, and interaction handlers
 */
export declare class OutdoorDrawingEnvironment extends HSApp.Environment.CommonEnvironment {
  /**
   * Toolbar instance for drawing tools
   */
  toolbar: Toolbar | undefined;

  /**
   * Event handler for outdoor drawing interactions
   */
  handler: OutdoorDrawingHandler;

  /**
   * The outdoor layer being edited
   */
  layer: HSCore.Model.OutdoorLayer | undefined;

  /**
   * Controller for managing different interaction modes
   */
  modeController: ModeController | undefined;

  /**
   * Reference to the catalog plugin
   */
  catalogPlugin: CatalogPlugin;

  /**
   * Reference to the resize widget plugin
   */
  resizeWidgetPlugin: ResizeWidgetPlugin;

  /**
   * Reference to the view switch plugin
   */
  viewSwitchPlugin: ViewSwitchPlugin;

  /**
   * Property bar for editing object properties
   */
  propertyBar: PropertyBarPlugin;

  /**
   * ID of the previously active toolbar before entering outdoor drawing mode
   */
  oldToolbarId: string | undefined;

  /**
   * Gizmo for interactive manipulation
   */
  gizmo: unknown | undefined;

  /**
   * The sketch view instance for rendering
   */
  private _sketchView: Sketch | undefined;

  /**
   * Builder for constructing the 2D sketch model
   */
  private _sketchBuilder: HSCore.Model.OutdoorDrawingSketch2dBuilder | undefined;

  /**
   * Factory for creating gizmos in sketch view
   */
  private _sketchGizmoFactory: GizmoFactory | undefined;

  /**
   * Reference to the main application instance
   */
  private _app: Application;

  /**
   * Hook for managing signal connections
   */
  private _signalHook: HSCore.Util.SignalHook | undefined;

  /**
   * UI manager for outdoor drawing interface
   */
  private _ui: UI | undefined;

  /**
   * Wrapper for managing canvas instances
   */
  private _canvasWrapper: CanvasWrapper | undefined;

  /**
   * Transaction manager for undo/redo operations
   */
  private _transaction: OutdoorDrawingTransaction | undefined;

  /**
   * Creates a new outdoor drawing environment
   * @param config - Configuration object
   * @param config.app - The main application instance
   * @param config.handler - Event handler for outdoor drawing
   * @param config.dependencies - Plugin dependencies including PropertyBar
   */
  constructor(config: {
    app: Application;
    handler: OutdoorDrawingHandler;
    dependencies: Record<string, unknown>;
  });

  /**
   * Called when the environment is activated
   * Initializes canvas, UI, sketch view, and registers event handlers
   * @param data - Activation data
   */
  onActivate(data: unknown): void;

  /**
   * Called when the environment is deactivated
   * Cleans up resources, unregisters handlers, and restores previous state
   */
  onDeactivate(): void;

  /**
   * Gets the current sketch view instance
   * @returns The active sketch view
   */
  getSketchView(): Sketch | undefined;

  /**
   * Creates the sketch builder for outdoor drawing
   * @private
   */
  private _createSketch(): void;

  /**
   * Clears the sketch and associated resources
   * @private
   */
  private _clearSketch(): void;

  /**
   * Gets the sketch builder instance
   * @returns The sketch builder
   */
  getSketchBuilder(): HSCore.Model.OutdoorDrawingSketch2dBuilder | undefined;

  /**
   * Sets up signal listeners for environment events
   * @private
   */
  private _listenSignals(): void;

  /**
   * Creates the auxiliary 2D canvas for sketch rendering
   * @param container - DOM container element for the canvas
   * @private
   */
  private _createCanvas(container: HTMLElement): void;

  /**
   * Destroys the auxiliary canvas and cleans up resources
   * @private
   */
  private _destroyCanvas(): void;

  /**
   * Creates the interactive sketch view on the canvas
   * @private
   */
  private _createSketchView(): void;

  /**
   * Destroys the sketch view and removes it from the canvas
   * @private
   */
  private _destroySketchView(): void;

  /**
   * Initializes the UI for outdoor drawing mode
   * @private
   */
  private _initUI(): void;

  /**
   * Destroys the UI and restores previous state
   * @private
   */
  private _destroyUI(): void;

  /**
   * Indicates whether this environment supports single room mode
   * @returns false - outdoor drawing does not support single room mode
   */
  supportSingleRoomMode(): boolean;

  /**
   * Indicates whether this environment supports view options
   * @returns true - outdoor drawing supports view options
   */
  supportViewOptions(): boolean;

  /**
   * Initializes toolbar and catalog panels
   * @private
   */
  private _initPanels(): void;

  /**
   * Restores previous panel configuration
   * @private
   */
  private _restorePanels(): void;

  /**
   * Gets the 2D view options configuration
   * @returns Array of view option configurations including plane view mode
   */
  get2DViewOptions(): Array<{
    type: string;
    id: string;
    order: number;
    data: {
      options: Array<{
        id: HSApp.View.ViewModeEnum;
        icons: Array<{ id: string; fieldName: string }>;
        strings: Array<{ id: string; fieldName: string; hotKey: string }>;
      }>;
      defaultKey: HSApp.View.ViewModeEnum;
    };
  }>;

  /**
   * Gets the 2D canvas instance
   * @returns The auxiliary 2D canvas
   */
  getCanvas2d(): Canvas2D;

  /**
   * Recovers all operations by canceling current command and reverting transaction
   */
  onRecoverAll(): void;
}

/**
 * Type definitions for dependencies
 */
interface Application {
  pluginManager: PluginManager;
  floorplan: {
    scene: {
      outdoorLayer: HSCore.Model.OutdoorLayer;
    };
  };
  selectionManager: SelectionManager;
  cmdManager: CommandManager;
  primaryViewMode: HSApp.View.ViewModeEnum;
  getActive2DView(): View2D;
}

interface PluginManager {
  getPlugin(type: string): unknown;
}

interface CatalogPlugin {
  toggleCatalog(show: boolean): void;
}

interface ResizeWidgetPlugin {
  // Plugin methods
}

interface ViewSwitchPlugin {
  // Plugin methods
}

interface PropertyBarPlugin {
  // Plugin methods
}

interface SelectionManager {
  unselectAll(): void;
}

interface CommandManager {
  cancel(): void;
}

interface View2D {
  freeze(): void;
  unfreeze(): void;
  hide(): void;
  show(): void;
}

interface OutdoorDrawingHandler {
  registerHotkeys(): void;
  unregisterHotkeys(): void;
  registerLeftMenuMouseEvent(mouse: Mouse): void;
  unregisterLeftMenuMouseEvent(mouse: Mouse): void;
  dependencies: Record<string, unknown>;
}

interface Mouse {
  // Mouse event properties
}

interface Canvas2D {
  mouse: Mouse;
  context: CanvasRenderingContext2D;
  displayLayers: {
    mask: unknown;
  };
  registerGizmoFactory(factory: GizmoFactory): void;
  unregisterGizmoFactory(factory: GizmoFactory): void;
  getDisplayObjectByID(id: string): DisplayObject;
  removeDisplayObject(obj: DisplayObject): void;
}

interface DisplayObject {
  addChild(child: unknown): void;
  removeChild(child: unknown): void;
}

/**
 * Constants for plugin types
 */
declare namespace HSFPConstants {
  enum PluginType {
    Catalog = "Catalog",
    ResizeWidget = "ResizeWidget",
    ViewSwitch = "ViewSwitch",
    PropertyBar = "PropertyBar"
  }
}

/**
 * HSCore namespace declarations
 */
declare namespace HSCore {
  namespace Util {
    class SignalHook {
      constructor(owner: unknown);
      dispose(): void;
    }
  }

  namespace Model {
    class OutdoorDrawingSketch2dBuilder {
      constructor(layer: OutdoorLayer);
      getSketch(): unknown;
    }

    interface OutdoorLayer {
      id: string;
      slabeditor: unknown;
    }
  }
}

/**
 * HSApp namespace declarations
 */
declare namespace HSApp {
  namespace Environment {
    class CommonEnvironment {
      constructor(app: Application);
    }
  }

  namespace ExtraordinarySketch2d {
    class InteractiveSketch {
      constructor(sketch: unknown, builder: HSCore.Model.OutdoorDrawingSketch2dBuilder);
    }
  }

  namespace View {
    enum ViewModeEnum {
      Plane = "plane"
    }
  }
}