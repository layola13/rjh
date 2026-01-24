/**
 * Opening Styler Manager
 * Manages the selection and styling of door, window, and hole openings in the application.
 */

/**
 * Configuration options for initializing the OpeningStyler
 */
interface OpeningStylerConfig {
  /** Application instance */
  app: HSCore.Application;
  /** Handler for styler operations */
  handler: OpeningStylerHandler;
  /** Toolbar plugin instance */
  toolbarPlugin: ToolbarPlugin;
  /** Display list for rendering entities */
  displayList: DisplayList;
}

/**
 * Handler interface for opening styler operations
 */
interface OpeningStylerHandler {
  /** Get the template entity being used for styling */
  getTemplateEntity(): OpeningEntity;
  /** Exit the styler mode */
  exitStyler(): void;
}

/**
 * Entity representing an opening (door, window, or hole)
 */
interface OpeningEntity extends HSCore.Model.Content {
  /** Entity class type */
  Class: HSConstants.ModelClass;
  /** Unique identifier */
  ID: string;
  /** Check if entity is instance of specified class */
  instanceOf(className: HSConstants.ModelClass): boolean;
  /** Enable a flag on the entity */
  setFlagOn(flag: HSCore.Model.ContentFlagEnum, update: boolean): void;
  /** Disable a flag on the entity */
  setFlagOff(flag: HSCore.Model.ContentFlagEnum, update: boolean): void;
}

/**
 * Toolbar plugin for managing UI toolbar elements
 */
interface ToolbarPlugin {
  /** Add a toolbar with specified items */
  addToolbar(toolbarId: string, items: ToolbarItem[]): void;
  /** Activate a toolbar by ID */
  activateToolbar(toolbarId: string): void;
}

/**
 * Toolbar item configuration
 */
interface ToolbarItem {
  /** Type of toolbar item */
  type: "button" | "divider";
  /** Display label */
  label?: string;
  /** Item name/identifier */
  name: string;
  /** Icon class name */
  icon?: string;
  /** Tooltip text */
  tooltip?: string;
  /** Display order */
  order: number;
  /** Click handler */
  onclick?(event: Event): void;
}

/**
 * Display list for managing entity rendering
 */
interface DisplayList {
  /** Get display object by entity ID */
  get(entityId: string): DisplayObject;
}

/**
 * Display object for rendering entities
 */
interface DisplayObject {
  /** Redraw the display object */
  draw(): void;
}

/**
 * Selection manager for handling entity selection
 */
interface SelectionManager {
  /** Signal emitted when selection changes */
  signalSelectionChanged: HSCore.Util.Signal;
  /** Get currently selected entities */
  selected(): OpeningEntity[];
  /** Unselect all entities */
  unselectAll(): void;
}

/**
 * Opening Styler class
 * Manages the workflow for selecting and replacing opening entities (doors, windows, holes)
 * with a template entity.
 */
declare class OpeningStyler {
  /** Application instance */
  private _app: HSCore.Application;
  
  /** Handler for styler operations */
  private _handler: OpeningStylerHandler;
  
  /** Toolbar plugin instance */
  private _toolbarPlugin: ToolbarPlugin;
  
  /** Display list for rendering */
  private _displayList: DisplayList;
  
  /** Selection manager */
  private _selectionMgr: SelectionManager;
  
  /** Set of currently selected entities for styling */
  private _selectedEntities: Set<OpeningEntity>;
  
  /** Toolbar identifier */
  private _toolbarId: string;
  
  /** Signal hook for managing event listeners */
  private _signalHook: HSCore.Util.SignalHook;

  /**
   * Create an OpeningStyler instance
   * @param config - Configuration options
   */
  constructor(config: OpeningStylerConfig);

  /**
   * Enter styler mode
   * Activates the toolbar, clears selection, and shows live hints
   */
  enterStyler(): void;

  /**
   * Exit styler mode
   * Removes event listeners and clears selection
   */
  exitStyler(): void;

  /**
   * Show live hint message based on template entity type
   * Displays appropriate message for door, window, or hole selection
   */
  showLiveHint(): void;

  /**
   * Hide the live hint message
   */
  hideLiveHint(): void;

  /**
   * Initialize the toolbar with cancel button and divider
   */
  initToolbar(): void;

  /**
   * Activate the styler toolbar
   */
  activateToolbar(): void;

  /**
   * Get array of currently selected target entities
   * @returns Array of selected opening entities
   */
  getTargetEntities(): OpeningEntity[];

  /**
   * Check if entity is an opening content type
   * @param entity - Entity to check
   * @returns True if entity is an opening
   */
  isOpeningContent(entity: OpeningEntity): boolean;

  /**
   * Check if entity is valid for opening styler
   * Must match template class but have different ID
   * @param entity - Entity to check
   * @returns True if entity can be styled
   */
  isOpeningStylerContent(entity: OpeningEntity): boolean;

  /**
   * Handle selection change events
   * Toggles replace flag and updates display for selected entities
   * @private
   */
  private _onSelectionChanged(): void;
}

export default OpeningStyler;