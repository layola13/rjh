/**
 * Floor module
 * Provides floor and room surface functionality for 3D models
 */

import type { Face_IO, Face } from './Face';
import type { Entity } from './Entity';
import type { Version } from './Version';
import type { MaterialIdEnum } from './MaterialIdEnum';

/**
 * Room flag enumeration for controlling room display properties
 */
export enum RoomFlagEnum {
  /** Disable ceiling rendering */
  ceilingOff = 256,
  /** Enable hover interaction */
  hoverOn = 512,
  /** Enable click interaction */
  clickOn = 1024,
  /** Disable dimension display */
  dimensionOff = 2048,
  /** Disable room type display */
  roomtypeOff = 4096
}

/**
 * Room surface type enumeration
 */
export enum RoomSurfaceTypeEnum {
  /** Floor surface */
  floor = "floor",
  /** Ceiling surface */
  ceiling = "ceiling"
}

/**
 * Floor input/output handler for serialization and deserialization
 */
export class Floor_IO extends Face_IO {
  /**
   * Load floor data from serialized format
   * @param entity - Target floor entity to populate
   * @param data - Serialized floor data
   * @param context - Loading context containing version info
   * @param options - Additional loading options
   */
  load(
    entity: Floor,
    data: any,
    context: { version: string; data?: Record<string, any> },
    options: any
  ): void;
}

/**
 * Floor entity representing a room floor surface in the 3D model
 */
export class Floor extends Face {
  /**
   * Internal room type identifier
   * @internal
   */
  private __roomType: string;

  /**
   * Internal room type display name
   * @internal
   */
  private __roomTypeDisplayName: string;

  /**
   * Room type identifier
   */
  roomType: string;

  /**
   * Display name for the room type
   */
  roomTypeDisplayName: string;

  /**
   * Creates a new Floor instance
   * @param id - Optional unique identifier for the floor
   */
  constructor(id?: string);

  /**
   * Get the IO handler for this floor entity
   * @returns Floor_IO instance for serialization
   */
  getIO(): Floor_IO;

  /**
   * Iterate over each surface of the floor
   * @param callback - Function to call for each surface type
   * @param context - Optional execution context for the callback
   */
  forEachSurface(
    callback: (surfaceType: RoomSurfaceTypeEnum) => void,
    context?: any
  ): void;
}