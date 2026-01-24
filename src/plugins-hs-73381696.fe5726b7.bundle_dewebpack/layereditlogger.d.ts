/**
 * Layer Edit Logger - User tracking and analytics for layer editing operations
 * Tracks user interactions with layer management features including rename, reorder, insert, delete, and switch operations
 */

/**
 * Log event types for layer editing operations
 */
declare const enum LayerEditLogEvent {
  /** Event type for layer rename operations */
  RENAME = "hsw.plugin.layeredit.rename",
  /** Event type for layer reorder operations */
  REORDER = "hsw.plugin.layeredit.reorder",
  /** Event type for layer insert operations */
  INSERT = "hsw.plugin.layeredit.insert",
  /** Event type for layer switch operations */
  SWITCH = "hsw.plugin.layeredit.switch",
  /** Event type for layer delete operations */
  DELETE = "hsw.plugin.layeredit.delete",
  /** Event type for show all layers operation */
  SHOW_ALL_LAYER = "hsw.plugin.layeredit.showAllLayer"
}

/**
 * Base tracking data structure for user events
 */
interface TrackingEventData {
  /** Human-readable description of the action */
  description: string;
  /** Active section identifier */
  activeSection: string;
  /** Display name of the active section */
  activeSectionName: string;
  /** Click ratio tracking information */
  clicksRatio: {
    /** Unique identifier for the event */
    id: string;
    /** Display name for the event */
    name: string;
  };
  /** Log group type classification */
  group: string;
}

/**
 * Additional metadata that can be attached to tracking events
 */
interface TrackingMetadata {
  /** Whether the action was committed/confirmed */
  commit?: boolean;
  /** Whether the action was committed */
  committed?: boolean;
  /** Whether "don't show again" was selected */
  dontShowAgain?: boolean;
  /** Whether layout design mode is active */
  isLayoutDesignMode?: boolean;
  /** Whether show all layers is enabled */
  showAllLayer?: boolean;
}

/**
 * Options for sending tracking events
 */
interface TrackingOptions {
  /** Whether to send the event immediately */
  sendNow: boolean;
}

/**
 * LayerEditLogger - Static utility class for logging layer editing operations
 * Provides methods to track user interactions with layer management features
 * All methods are static and track analytics events to the user tracking system
 */
export declare class LayerEditLogger {
  /**
   * Private constructor - this class should not be instantiated
   * All methods are static
   */
  private constructor();

  /**
   * Logs when user clicks the rename layer button
   * Tracks the current layout design mode state
   */
  static renameLayerClicked(): void;

  /**
   * Logs when user inputs a new name for a layer
   * @param commit - Whether the rename operation was committed (true) or cancelled (false)
   */
  static renameLayerInput(commit: boolean): void;

  /**
   * Logs when user clicks a layer selection button
   * Tracks layer switching interactions
   */
  static layerSelectionClicked(): void;

  /**
   * Logs when user clicks the reorder layer button
   * Initiates layer drag-and-drop reordering
   */
  static reorderLayerClicked(): void;

  /**
   * Logs when user completes a layer reordering operation
   * Fired after the layer order has been successfully changed
   */
  static reorderLayerCommitted(): void;

  /**
   * Logs when user confirms the reorder layer dialog
   * @param dontShowAgain - Whether user selected "don't show this again" option
   */
  static reorderLayerDialogConfirmed(dontShowAgain: boolean): void;

  /**
   * Logs when user cancels the reorder layer dialog
   * @param dontShowAgain - Whether user selected "don't show this again" option
   */
  static reorderLayerDialogCanceled(dontShowAgain: boolean): void;

  /**
   * Logs when user clicks to insert a new layer above the current layer
   */
  static insertLayerAboveClicked(): void;

  /**
   * Logs when user clicks to insert a new layer below the current layer
   */
  static insertLayerBelowClicked(): void;

  /**
   * Logs when user confirms the insert layer dialog
   * @param dontShowAgain - Whether user selected "don't show this again" option
   */
  static insertLayerDialogConfirmed(dontShowAgain: boolean): void;

  /**
   * Logs when user cancels the insert layer dialog
   * @param dontShowAgain - Whether user selected "don't show this again" option
   */
  static insertLayerDialogCanceled(dontShowAgain: boolean): void;

  /**
   * Logs when user clicks the delete layer button
   * @param committed - Whether the delete operation was committed (true) or cancelled (false)
   */
  static deleteLayerClicked(committed: boolean): void;

  /**
   * Logs when user clicks to switch the active layer
   * Tracks navigation between different layers
   */
  static layerSwitchClicked(): void;

  /**
   * Logs when user toggles the "show all layers" option
   * @param showAllLayer - Whether all layers are now visible (true) or not (false)
   */
  static showAllLayerClicked(showAllLayer: boolean): void;
}