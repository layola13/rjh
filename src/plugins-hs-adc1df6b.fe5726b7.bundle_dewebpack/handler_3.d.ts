/**
 * Property bar handler module
 * Manages property bar UI state, updates, and interactions with the application
 */

import type { HSCore } from './635589';
import type { UI } from './220717';
import type { PropertyBarNode } from './616799';

/**
 * Command types that trigger immediate updates
 */
type ImmediateUpdateCommandType =
  | typeof HSFPConstants.CommandType.MoveCamera3D
  | typeof HSFPConstants.CommandType.MoveContent
  | typeof HSFPConstants.CommandType.PlaceProduct
  | typeof HSFPConstants.CommandType.PointSelect
  | typeof HSFPConstants.CommandType.ResizeContents
  | typeof HSFPConstants.CommandType.ResizeWalls
  | typeof HSFPConstants.CommandType.MixPaint.MoveWaterJetTile
  | typeof HSFPConstants.CommandType.TileProcess.ChangeChamfer
  | typeof HSFPConstants.CommandType.MoveContents
  | typeof HSFPConstants.CommandType.RotateContents;

/**
 * Command types for wall creation that trigger updates on start
 */
type WallCreationCommandType =
  | typeof HSFPConstants.CommandType.CreateTgWall
  | typeof HSFPConstants.CommandType.CreateRectTgWall
  | typeof HSFPConstants.CommandType.CreatePolygonTgWall
  | typeof HSFPConstants.CommandType.CreateFreeformNGWall;

/**
 * Application interface with core managers and signals
 */
interface IApplication {
  /** Selection state manager */
  selectionManager: ISelectionManager;
  /** Command execution manager */
  cmdManager: ICommandManager;
  /** Transaction/undo-redo manager */
  transManager: ITransactionManager;
  /** Signal fired when property bar needs refresh */
  signalPropertyBarRefresh: HSCore.Util.Signal;
  /** Signal fired when environment is activated */
  signalEnvironmentActivated: HSCore.Util.Signal;
  /** Signal fired when primary view mode changes */
  signalPrimaryViewModeChanged: HSCore.Util.Signal;
  /** Signal fired when opening a new document */
  signalOpenNewDocument: HSCore.Util.Signal;
  /** Signal fired when document is fully opened */
  signalDocumentOpened: HSCore.Util.Signal;
}

/**
 * Selection manager interface
 */
interface ISelectionManager {
  /** Signal dispatched when selection changes */
  signalSelectionChanged: HSCore.Util.Signal<ISelectionChangedData>;
  /** Returns currently selected entities */
  selected(): IEntity[];
}

/**
 * Selection change event data
 */
interface ISelectionChangedData {
  /** Newly selected entities */
  newEntities?: IEntity[];
}

/**
 * Entity interface
 */
interface IEntity {
  /** Unique entity identifier */
  id?: string;
  /** Signal fired when entity host changes */
  signalHostChanged?: HSCore.Util.Signal;
}

/**
 * Command manager interface
 */
interface ICommandManager {
  /** Signal dispatched when command starts */
  signalCommandStarted: HSCore.Util.Signal<ICommandEventData>;
  /** Signal dispatched when command terminates */
  signalCommandTerminated: HSCore.Util.Signal<ICommandEventData>;
}

/**
 * Command event data structure
 */
interface ICommandEventData {
  /** Command instance */
  cmd: ICommand;
}

/**
 * Command interface
 */
interface ICommand {
  /** Command type identifier */
  type: string;
  /** Sub-commands for composite commands */
  subs?: ICommand[];
}

/**
 * Transaction manager interface for undo/redo operations
 */
interface ITransactionManager {
  /** Signal dispatched when undo is performed */
  signalUndone: HSCore.Util.Signal;
  /** Signal dispatched when redo is performed */
  signalRedone: HSCore.Util.Signal;
}

/**
 * Initialization configuration
 */
interface IHandlerInitConfig {
  /** Application instance */
  app: IApplication;
  /** Module dependencies */
  dependencies?: unknown;
}

/**
 * Tab switch event data
 */
interface ITabSwitchData {
  /** Property bar nodes data */
  data: PropertyBarNode[];
  /** Target tab identifier */
  tabId: string;
}

/**
 * Property bar handler class
 * Coordinates property bar display, updates, and user interactions
 */
export declare class Handler {
  /**
   * Property bar UI instance
   */
  ui: UI;

  /**
   * Signal dispatched to populate property bar content
   */
  signalPopulatePropertyBar: HSCore.Util.Signal<PropertyBarNode[]>;

  /**
   * Signal dispatched to switch property bar tabs
   */
  signalSwitchPropertyBarTab: HSCore.Util.Signal<ITabSwitchData>;

  /**
   * Signal dispatched when property bar population is terminated
   */
  signalPopulatePropertyBarTeminated: HSCore.Util.Signal;

  /**
   * Reference to the main application instance
   */
  private _app: IApplication | undefined;

  /**
   * Flag controlling whether property bar can be shown
   */
  private _enableShow: boolean;

  /**
   * Cached entity ID to track selection changes
   */
  private _cacheEntityID: string | undefined;

  /**
   * Signal hook utility for managing event listeners
   */
  private _signalHook: HSCore.Util.SignalHook;

  /**
   * Flag controlling automatic property bar updates
   */
  private _enableAutoUpdate: boolean | undefined;

  /**
   * Flag indicating readonly mode state
   */
  private _isReadonly: boolean;

  /**
   * Creates a new Handler instance
   */
  constructor();

  /**
   * Initialize the handler with application context
   * @param config - Initialization configuration containing app instance
   */
  init(config: IHandlerInitConfig): void;

  /**
   * Register signal listeners for application events
   */
  private _addSignalHooks(): void;

  /**
   * Trigger property bar update with debouncing
   */
  update(): void;

  /**
   * Switch to a specific property bar tab
   * @param tabId - Target tab identifier
   */
  switchPropertyBarTab(tabId: string): void;

  /**
   * Perform immediate property bar update without debouncing
   */
  private _updateImmediate(): void;

  /**
   * Perform immediate tab switch without debouncing
   * @param tabId - Target tab identifier
   */
  private _updateTabImmediate(tabId: string): void;

  /**
   * Check if conditions allow property bar update
   * @returns True if update should proceed
   */
  private _checkBeforeUpdate(): boolean;

  /**
   * Show the property bar and trigger update
   */
  show(): void;

  /**
   * Hide the property bar
   */
  hide(): void;

  /**
   * Show property bar with custom property nodes
   * @param property - Property configuration object
   */
  showProperty(property: unknown): void;

  /**
   * Enable automatic property bar updates
   */
  enableAutoUpdate(): void;

  /**
   * Disable automatic property bar updates
   */
  disableAutoUpate(): void;

  /**
   * Create default property bar node based on current selection
   * @returns Property bar node configuration
   */
  createDefaultPropertyBarNode(): PropertyBarNode;

  /**
   * Handle selection change events
   * @param event - Selection changed event data
   */
  private _onSelectionChanged(event: { data: ISelectionChangedData }): void;

  /**
   * Handle command started events
   * @param event - Command event data
   */
  private _onCommandStarted(event: { data: ICommandEventData }): void;

  /**
   * Handle command terminated events
   * @param event - Command event data
   */
  private _onCommandTerminated(event: { data: ICommandEventData }): void;

  /**
   * Handle document open events
   */
  private _onOpenDocument(): void;

  /**
   * Get UI widgets by component type
   * @param type - Component type identifier
   * @returns Array of matching widgets
   */
  getWidgetsByType(type: string): unknown[];

  /**
   * Set property bar to readonly mode
   */
  setPropertyBarReadonlyMode(): void;

  /**
   * Set property bar to edit mode
   */
  setPropertyBarEditMode(): void;

  /**
   * Fold/collapse the property bar
   */
  foldPropertybar(): void;
}