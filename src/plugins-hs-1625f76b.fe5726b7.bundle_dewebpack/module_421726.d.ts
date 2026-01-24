/**
 * Room type management plugin for floor plan application
 * Handles room type changes, status bar population, and ceiling status toggles
 */

/**
 * Room type option structure
 */
export interface RoomTypeOption {
  /** Unique identifier for the room type */
  id: string;
  /** Localized display label for the room type */
  label: string;
}

/**
 * Command parameters for changing room type
 */
export interface ChangeRoomTypeParams {
  /** New room type identifier */
  roomType: string;
  /** Reference to another room (if applicable) */
  otherRoom?: unknown;
}

/**
 * Room type change plugin class
 * Extends base plugin functionality to manage room type operations
 */
export default class RoomTypeChangePlugin {
  /** Reference to the main application instance */
  private _app: unknown;
  
  /** Signal API object for event communication */
  private _signalAPIObject: unknown;
  
  /** Available room type options */
  private _roomTypeOptions: RoomTypeOption[];
  
  /** Signal hook for status bar events */
  private _signalHook: unknown;
  
  /** Signal hook for room-specific events */
  private _roomHook: unknown;
  
  /** Currently selected entities */
  private _entities: unknown[];

  /**
   * Initialize the plugin
   * @param app - Main application instance
   * @param signalAPIObject - Signal API for event handling
   */
  init_(app: unknown, signalAPIObject: unknown): void;

  /**
   * Clean up plugin resources
   */
  uninit_(): void;

  /**
   * Handle status bar population event
   * @param event - Population event data
   */
  private _onPopulateStatusBar(event: unknown): void;

  /**
   * Handle status bar retirement event
   */
  private _onRetiringStatusBar(): void;

  /**
   * Handle room type change interaction
   * @param roomType - New room type identifier
   * @param otherRoom - Related room entity (optional)
   */
  private _roomTypeChangeHandler(roomType: string, otherRoom: unknown): void;

  /**
   * Handle delete button click event
   */
  private _deleteBtnClkHandler(): void;

  /**
   * Handle room ceiling status change
   * @param status - New ceiling status
   */
  private _onRoomCeilStatusChangeHandler(status: boolean): void;
}