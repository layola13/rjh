/**
 * Handler module for store smart layout functionality
 * Manages smart layout operations, permissions, and task polling
 */

/**
 * Design information interface
 */
interface DesignInfo {
  designId: string;
  designVersion: string;
}

/**
 * Valid area result from backend
 */
interface ValidAreaResult {
  area: number;
  [key: string]: unknown;
}

/**
 * Task result from smart layout query
 */
interface TaskResult {
  taskStatus?: SmartLayoutState;
  [key: string]: unknown;
}

/**
 * MTOP API response structure
 */
interface MtopResponse<T = unknown> {
  ret: string[];
  data: T;
}

/**
 * Valid area data structure
 */
interface ValidAreaData {
  area: number;
  [key: string]: unknown;
}

/**
 * Toolbar item configuration
 */
interface ToolbarItemConfig {
  name: string;
  order: number;
  type: string;
  label: string;
  icon: string;
  onclick: () => void;
}

/**
 * Toolbar item update options
 */
interface ToolbarUpdateOptions {
  hasDot?: boolean;
}

/**
 * Smart layout dialog options
 */
interface SmartLayoutDialogOptions {
  checkCondition: () => boolean;
  MAX_TIME: number;
  getDesignInfo: () => DesignInfo;
  getTaskResult: () => Promise<TaskResult>;
  submitCallback: () => void;
}

/**
 * Error details for save failures
 */
interface SaveErrorDetails {
  error: unknown;
  errType: string;
  errMsg: {
    msg: string;
  };
}

/**
 * Smart layout state enumeration
 */
enum SmartLayoutState {
  Success = 'SUCCESS',
  Error = 'ERROR',
  Processing = 'PROCESSING'
}

/**
 * Handler class for managing smart layout functionality
 * Handles permissions, document operations, and layout polling
 */
declare class Handler {
  /**
   * Signal hook for event management
   */
  signalHook: HSCore.Util.SignalHook | undefined;

  /**
   * Reference to the main application instance
   */
  private _app: HSApp.App;

  /**
   * Cached valid area result from backend
   */
  private _validAreaResult: ValidAreaResult | undefined;

  /**
   * Toolbar plugin instance
   */
  toolbarPlugin: HSFPConstants.Plugin.Toolbar | undefined;

  /**
   * Maximum polling time in milliseconds (192 seconds)
   */
  readonly MAX_TIME: number;

  /**
   * Interval ID for polling tasks
   */
  intervalId: number | null;

  /**
   * Number of retry attempts
   */
  retryNum: number;

  /**
   * Creates a new Handler instance
   * @param app - The main application instance
   */
  constructor(app: HSApp.App);

  /**
   * Initializes the handler, sets up event listeners and permissions
   */
  init(): void;

  /**
   * Checks and ensures the current document is saved
   * @returns Promise that resolves to true if save is successful
   * @throws {SaveErrorDetails} If save operation fails
   */
  checkSave(): Promise<boolean>;

  /**
   * Handles permissions check completion event
   * Sets up toolbar items and environment listeners if store smart layout is enabled
   */
  private _onPermissionsCompleted(): void;

  /**
   * Handles document opened event
   * Starts polling for layout results if smart layout is enabled
   */
  private _onDesignOpened(): void;

  /**
   * Handles environment activation event
   * Shows/hides valid area bar based on active environment
   * @param event - Environment activation event data
   */
  private _onEnvironmentActivated(event: { data: { newEnvironmentId: string } }): void;

  /**
   * Formats area value to 2 decimal places
   * @param area - Raw area value
   * @returns Formatted area rounded to 2 decimal places
   */
  formatArea(area: number): number;

  /**
   * Fetches valid area data from backend
   * @param assetId - Asset identifier for the floorplan
   * @returns Promise resolving to formatted area value
   */
  getValidArea(assetId: string): Promise<number>;

  /**
   * Checks if conditions are met for smart layout
   * Validates that there are rooms and entry doors present
   * @returns True if conditions are satisfied
   */
  checkCondition(): boolean;

  /**
   * Gets all entry doors in the active layer
   * Entry doors are openings with at least one face not connected to any space
   * @returns Array of entry door objects
   */
  getEntryDoors(): Array<HSCore.Model.Door | HSCore.Model.ParametricDoor | HSCore.Model.Hole>;

  /**
   * Previews the valid area visualization
   */
  previewValidArea(): void;

  /**
   * Opens the smart layout dialog
   * Configures and displays the dialog with necessary callbacks
   */
  smartLayout(): void;

  /**
   * Polls for layout task completion
   * Sets up interval to check task status periodically
   * @returns Promise that resolves when polling is set up
   */
  getPollingLayout(): Promise<void>;

  /**
   * Retrieves current design information
   * @returns Design ID and version from metadata
   */
  getDesignInfo(): DesignInfo;

  /**
   * Gets the current task result from backend
   * @returns Promise resolving to task result or empty object on error
   */
  getTaskResult(): Promise<TaskResult>;

  /**
   * Fetches task result from backend API
   * @returns Promise resolving to task data
   */
  private fetchResult(): Promise<TaskResult>;
}

export { Handler };