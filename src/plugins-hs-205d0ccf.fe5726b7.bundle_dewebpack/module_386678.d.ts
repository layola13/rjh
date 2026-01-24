/**
 * Snapshot button container module for managing aspect ratio selection and snapshot controls
 */

/**
 * Aspect ratio types supported by the snapshot tool
 */
export type RatioType = 'FREE' | 'ORIGIN' | 'R_1_1' | 'R_4_3' | 'R_16_9';

/**
 * Initialization configuration for the snapshot button container
 */
export interface SnapshotButtonContainerConfig {
  /**
   * Callback invoked when user selects a different aspect ratio
   * @param ratio - The selected ratio type
   */
  onRatioSelectorHandler: (ratio: RatioType) => void;

  /**
   * Callback invoked when user clicks the "Take Snapshot" button
   */
  onTakeSnapshotBtnClk: () => void;

  /**
   * Callback invoked when user clicks the "Cancel" button
   */
  onCancelBtnClk: () => void;
}

/**
 * Labels for each aspect ratio option (localizable)
 */
export interface RatioLabels {
  FREE: string;
  ORIGIN: string;
  R_1_1: string;
  R_4_3: string;
  R_16_9: string;
}

/**
 * Snapshot button container controller
 * Manages UI for aspect ratio selection, snapshot capture, and cancel actions
 */
export interface SnapshotButtonContainer {
  /**
   * Localized labels for ratio options
   */
  RATIO_LABEL: RatioLabels;

  /**
   * Default aspect ratio applied on initialization
   */
  defaultRatio: RatioType;

  /**
   * Handler for ratio selection changes
   */
  onRatioSelectorHandler?: (ratio: RatioType) => void;

  /**
   * Handler for take snapshot button clicks
   */
  onTakeSnapshotBtnClk?: () => void;

  /**
   * Handler for cancel button clicks
   */
  onCancelBtnClk?: () => void;

  /**
   * Initialize the snapshot button container
   * @param config - Configuration with event handlers
   */
  init(config: SnapshotButtonContainerConfig): void;

  /**
   * Populate the dropdown menu with aspect ratio options
   */
  initOptionsInDropdown(): void;

  /**
   * Update the UI to reflect the selected aspect ratio
   * @param ratio - The ratio type to display
   */
  updateUIByData(ratio: RatioType): void;

  /**
   * Attach event listeners to UI elements
   */
  initEvent(): void;

  /**
   * jQuery selector helper scoped to the snapshot button container
   * @param selector - CSS selector (returns container root if empty)
   * @returns jQuery object
   */
  _$(selector?: string): JQuery;

  /**
   * Load localized strings for all UI text elements
   */
  initString(): void;

  /**
   * Show the snapshot button container
   */
  show(): void;

  /**
   * Hide the snapshot button container and its dropdown menu
   */
  hide(): void;

  /**
   * Check if the "save snapshot" checkbox is checked and visible
   * @returns true if save option is enabled
   */
  getSnapshotSaveStatus(): boolean;
}

declare const snapshotButtonContainer: SnapshotButtonContainer;

export default snapshotButtonContainer;