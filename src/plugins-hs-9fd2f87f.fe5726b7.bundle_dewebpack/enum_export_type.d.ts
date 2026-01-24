/**
 * Export type enumeration and configuration utilities
 * @module ExportTypes
 */

/**
 * Types of export formats supported by the application
 */
export enum ENUM_EXPORT_TYPE {
  /** Full page export with complete details */
  FullPage = 0,
  /** 2D page thumbnail export */
  Thumbnail2DPage = 1,
  /** Minimap export (smaller overview) */
  Minimap = 2
}

/**
 * Opening (door/window) asset file names
 */
export enum OpeningName {
  /** Double swinging door variant 1 */
  DoubleSwingingDoor1 = "double_swinging_door1.svg",
  /** Sliding double door */
  SlidingDoubleDoor = "sliding_double_door.svg",
  /** Standard swinging door */
  SwingingDoor = "swinging_door.svg",
  /** 2-2 folding door */
  FoldingDoor2_2 = "folding_door2-2.svg",
  /** Double swinging door variant 2 */
  DoubleSwingingDoor2 = "double_swinging_door2.svg",
  /** Door with window */
  DoorWindow = "door_window.svg",
  /** Single window */
  SingleWindow = "single_window.svg",
  /** Bay window */
  BayWindow = "bay_window.svg",
  /** Transparent bay window */
  BayWindowTransparent = "bay_window_transparent.svg",
  /** Sliding triple door */
  SlidingTripleDoor = "sliding_triple_door.svg",
  /** Sliding quad door */
  SlidingQuadDoor = "sliding_quad_door.svg",
  /** Core model hole identifier */
  HSCoreModelHole = "HSCore.Model.Hole"
}

/**
 * Room type text size configuration
 */
export interface RoomTypeTextSize {
  /** List of font sizes */
  sizelist: number[];
}

/**
 * Room rendering settings
 */
export interface RoomSettings {
  /** Text size configuration for room type labels */
  typeTextSize: RoomTypeTextSize;
}

/**
 * Wall rendering settings
 */
export interface WallSettings {
  /** Inner wall line width */
  innerWidth: number;
  /** Outer wall line width */
  outerWidth: number;
}

/**
 * Window rendering settings
 */
export interface WindowSettings {
  /** Window line width */
  lineWidth: number;
}

/**
 * Entry rendering settings
 */
export interface EntrySettings {
  /** Entry line width */
  lineWidth: number;
}

/**
 * Door rendering settings
 */
export interface DoorSettings {
  /** Door line width */
  lineWidth: number;
}

/**
 * Export configuration settings
 */
export interface ExportSettings {
  /** Full export width in pixels */
  fullWidth: number;
  /** Full export height in pixels */
  fullHeight: number;
  /** Room-specific settings */
  room: RoomSettings;
  /** Wall-specific settings */
  wall: WallSettings;
  /** Window-specific settings */
  window: WindowSettings;
  /** Entry-specific settings */
  entry: EntrySettings;
  /** Door-specific settings */
  door: DoorSettings;
}

/**
 * Retrieves the export settings configuration for the specified export type.
 * Returns a deep clone to prevent mutation of the original configuration.
 * 
 * @param exportType - The type of export to get settings for
 * @returns A deep cloned export settings object
 */
export declare function getExportSetting(exportType: ENUM_EXPORT_TYPE): ExportSettings;