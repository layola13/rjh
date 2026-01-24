/**
 * Door opening plugin for HS application.
 * Provides functionality to open/close doors and apply operations to all doors in the floorplan.
 */

/**
 * Interface for property bar item configuration
 */
interface PropertyBarItem {
  /** Localized label for the property bar section */
  label: string;
  /** Array of control items to display */
  items: PropertyBarControlItem[];
}

/**
 * Interface for individual property bar control items
 */
interface PropertyBarControlItem {
  /** Unique identifier for the control */
  id: string;
  /** Type of control (toggleButton, imgbtn, etc.) */
  type: PropertyBarControlTypeEnum;
  /** Display order in the property bar */
  order: number;
  /** Configuration data specific to the control type */
  data: ToggleButtonData | ImageButtonData;
}

/**
 * Configuration data for toggle button controls
 */
interface ToggleButtonData {
  /** Current toggle state */
  value: boolean;
  /** Label text when toggle is on */
  onLabel: string;
  /** Label text when toggle is off */
  offLabel: string;
  /** Callback invoked when toggle value changes */
  onValueChange: (newValue: boolean) => void;
}

/**
 * Configuration data for image button controls
 */
interface ImageButtonData {
  /** CSS class name for styling */
  className: string;
  /** Path to button icon image */
  icon: string;
  /** Label text displayed on the right side */
  rightlabel: string;
  /** Click event handler */
  onclick: () => void;
}

/**
 * Enumeration of property bar control types
 */
declare enum PropertyBarControlTypeEnum {
  toggleButton = 'toggleButton',
  imgbtn = 'imgbtn'
}

/**
 * Interface for status bar population event data
 */
interface StatusBarEvent {
  data: {
    /** Currently selected entities */
    selection: Array<{ entity: HSCore.Model.Entity }>;
  };
}

/**
 * Interface for plugin initialization context
 */
interface PluginContext {
  /** Main application instance */
  app: HSApp.App;
}

/**
 * Interface for available plugins map
 */
interface PluginsMap {
  [HSFPConstants.PluginType.ContextualTools]: ContextualToolsPlugin;
}

/**
 * Interface for contextual tools plugin
 */
interface ContextualToolsPlugin {
  /** Updates property bar with new items */
  update(items: PropertyBarItem[]): void;
  /** Checks if property bar items should be shown in web context */
  willShowPropertyBarItemsForWeb(): boolean;
}

/**
 * Interface for door/opening entity metadata
 */
interface OpeningMetadata {
  /** Whether the opening has a pocket */
  hasPocket?: boolean;
  /** Extended object information */
  extension?: {
    objInfo?: {
      /** Rotation axis information for animation */
      axis?: unknown;
    };
  };
}

/**
 * Interface for tween animation configuration
 */
interface TweenConfig {
  /** Target animation value */
  value: number;
}

/**
 * Plugin class for managing door opening/closing functionality.
 * Integrates with HSCore to provide interactive door controls in the property bar.
 */
declare class DoorOpeningPlugin {
  /** Signal hook for general entity events */
  private _signalHook: HSCore.Util.SignalHook;
  
  /** Signal hook specifically for opening entity events */
  private _openingSignalHook: HSCore.Util.SignalHook;
  
  /** Reference to main application instance */
  private app: HSApp.App;
  
  /** Reference to contextual tools plugin for property bar integration */
  private contextualToolsPlugin: ContextualToolsPlugin;
  
  /** Currently selected opening/door entity */
  private entity: HSCore.Model.Opening;

  /**
   * Initializes the plugin with application context and available plugins.
   * @param context - Plugin initialization context containing app reference
   * @param plugins - Map of available plugins by type
   */
  init(context: PluginContext, plugins: PluginsMap): void;

  /**
   * Cleans up plugin resources and event listeners.
   * Called when plugin is being destroyed or disabled.
   */
  uninit(): void;

  /**
   * Generates property bar items for door open/close controls.
   * @returns Array of property bar item configurations
   */
  private _getPropertyBarItems(): PropertyBarItem[];

  /**
   * Updates the property bar with current door state.
   * Refreshes UI controls based on entity changes.
   */
  private _updatePropertyBar(): void;

  /**
   * Called when status bar is being populated with entity information.
   * Adds door controls if a valid opening entity is selected.
   * @param event - Status bar population event containing selection data
   */
  onPopulateStatusBar(event: StatusBarEvent): void;

  /**
   * Opens a single door with animation.
   * @param entity - Door entity to open
   */
  private _onOpenDoor(entity: HSCore.Model.Opening): void;

  /**
   * Closes a single door with animation.
   * @param entity - Door entity to close
   */
  private _onCloseDoor(entity: HSCore.Model.Opening): void;

  /**
   * Opens all doors in the current floorplan.
   * Shows a notification when complete.
   */
  private _onOpenAllDoors(): void;

  /**
   * Closes all doors in the current floorplan.
   * Shows a notification when complete.
   */
  private _onCloseAllDoors(): void;

  /**
   * Collects all door entities from the current floorplan.
   * Excludes doors with pockets.
   * @returns Array of door entities
   */
  private _collectDoors(): HSCore.Model.Door[];

  /**
   * Executes door animation between two rotation values.
   * @param fromValue - Starting rotation angle in degrees
   * @param toValue - Target rotation angle in degrees
   * @param entity - Door entity to animate
   */
  private _execute(fromValue: number, toValue: number, entity: HSCore.Model.Opening): void;

  /**
   * Checks if a door entity has a valid rotation axis for animation.
   * @param entity - Door entity to check
   * @returns True if entity has valid axis data
   */
  private _hasAxis(entity: HSCore.Model.Opening): boolean;
}

export default DoorOpeningPlugin;