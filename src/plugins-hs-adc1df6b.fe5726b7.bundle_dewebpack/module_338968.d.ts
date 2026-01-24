/**
 * Help menu toolbar plugin module
 * Provides functionality for help, guides, tutorials and shortcuts
 */

/**
 * User input plugin interface
 */
interface UserInputPlugin {
  // Add specific properties based on actual usage
  [key: string]: unknown;
}

/**
 * Plugin initialization parameters
 */
interface ToolbarHelpParams {
  /** User input plugin instance */
  userInputPlugin: UserInputPlugin;
}

/**
 * Event tracking instance from HSApp
 */
interface EventTrackInstance {
  track(group: string, event: string, data?: Record<string, unknown>): void;
}

/**
 * Plugin instance with guide functionality
 */
interface GuidePlugin {
  firstStepGuide(): void;
  resetGuideStorage(): void;
  showCardViewer(): void;
}

/**
 * Persistence plugin for checking save status
 */
interface PersistencePlugin {
  execteActionWithCheckSavingStatus(callback: (success: boolean) => void): void;
}

/**
 * Plugin manager interface
 */
interface PluginManager {
  getPlugin(pluginType: string): GuidePlugin | PersistencePlugin | unknown;
}

/**
 * Application instance interface
 */
interface AppInstance {
  /** Whether the floorplan has unsaved changes */
  isFloorplanDirty: boolean;
  /** Plugin manager instance */
  pluginManager: PluginManager;
}

/**
 * Toolbar help menu handler
 * Manages all help-related toolbar actions including guides, videos, shortcuts and about
 */
interface ToolbarHelpHandler {
  /** Event tracking instance */
  eventTrack?: EventTrackInstance;
  
  /** User input plugin reference */
  userInputPlugin?: UserInputPlugin;

  /**
   * Initialize the handler with required dependencies
   * @param params - Configuration parameters including user input plugin
   */
  setParams(params: ToolbarHelpParams): void;

  /**
   * Handle quick guide button click
   * Restarts the user guide from the first step
   * Checks for unsaved changes before proceeding
   */
  toolBar_quickguide_Click(): void;

  /**
   * Handle operate guide button click
   * Shows the interactive user guide cards
   * Tracks the help active tips event
   */
  toolBar_operateguide_Click(): void;

  /**
   * Handle new video tutorial button click
   * Opens the help center videos in a new tab
   * Different URLs for floorplan (fp) vs other tenants
   */
  toolBar_guidNewVideo_Click(): void;

  /**
   * Handle DIY guide button click
   * Opens the main help center in a new tab
   * Tracks the update log event
   */
  toolBar_guidfordiy_Click(): void;

  /**
   * Handle about us button click
   * Displays a modal with application information and copyright
   */
  toolBar_aboutus_Click(): void;

  /**
   * Handle keyboard shortcut button click
   * Shows the hotkey reference modal
   */
  toolBar_shortcut_Click(): void;

  /**
   * Handle help settings button click
   * Opens the user settings panel at tab 0
   */
  toolBar_help_Click(): void;
}

/**
 * Default export: Toolbar help handler implementation
 */
declare const toolbarHelpHandler: ToolbarHelpHandler;

export default toolbarHelpHandler;