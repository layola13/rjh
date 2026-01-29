/**
 * Module: Floor
 * Original ID: 47264
 * 
 * This module defines floor-related types, enums, and classes for 3D room modeling.
 * It provides functionality for managing room surfaces, walls, and room type information.
 */

import type { Face, Face_IO } from './Face';
import type { Entity } from './Entity';
import type { Wall } from './Wall';
import type { Layer } from './Layer';
import type { RoomInfo } from '../geometry/RoomInfo';

/**
 * Room flag bit masks for controlling various room display and interaction properties.
 */
export enum RoomFlagEnum {
  /** Hide ceiling rendering */
  ceilingOff = 256,
  /** Enable hover interaction */
  hoverOn = 512,
  /** Enable click interaction */
  clickOn = 1024,
  /** Hide dimension annotations */
  dimensionOff = 2048,
  /** Hide room type label */
  roomtypeOff = 4096
}

/**
 * Enum defining the types of room surfaces (floor or ceiling).
 */
export enum RoomSurfaceTypeEnum {
  /** Floor surface */
  floor = "floor",
  /** Ceiling surface */
  ceiling = "ceiling"
}

/**
 * IO handler for serializing and deserializing Floor entities.
 * Handles versioned data migration and material reference updates.
 */
export declare class Floor_IO extends Face_IO {
  /**
   * Serialize a Floor entity to a plain object representation.
   * 
   * @param entity - The Floor entity to serialize
   * @param callback - Optional callback invoked after serialization
   * @param includeMetadata - Whether to include metadata in output
   * @param context - Serialization context object
   * @returns Array containing serialized data
   */
  dump(
    entity: Floor,
    callback?: (data: unknown[], entity: Floor) => void,
    includeMetadata?: boolean,
    context?: Record<string, unknown>
  ): unknown[];

  /**
   * Deserialize data into a Floor entity.
   * Handles version migration for material references.
   * 
   * @param target - The Floor entity to populate
   * @param data - Serialized data object
   * @param options - Deserialization options including version info
   */
  load(
    target: Floor,
    data: FloorSerializedData,
    options: LoadOptions
  ): void;

  /**
   * Legacy deserialization method for migrating old data formats.
   * 
   * @param target - The Floor entity to populate
   * @param data - Legacy serialized data
   * @param options - Migration options including version info
   */
  migrateLoad(
    target: Floor,
    data: FloorSerializedData,
    options: LoadOptions
  ): void;
}

/**
 * Serialized representation of Floor data.
 */
interface FloorSerializedData {
  /** Room type identifier */
  roomType?: string;
  /** Human-readable room type name */
  roomTypeDisplayName?: string;
  /** Material reference ID */
  material?: string;
  [key: string]: unknown;
}

/**
 * Options for deserialization operations.
 */
interface LoadOptions {
  /** Version string of the serialized data */
  version: string;
  /** Additional context data keyed by reference ID */
  data?: Record<string, { seekId?: string; [key: string]: unknown }>;
  [key: string]: unknown;
}

/**
 * Represents a floor surface in a 3D room model.
 * Manages room type information, associated walls, and surface properties.
 */
export declare class Floor extends Face {
  /**
   * Internal storage for room type identifier.
   */
  private __roomType?: string;

  /**
   * Internal storage for human-readable room type name.
   */
  private __roomTypeDisplayName: string;

  /**
   * Room type identifier (e.g., "bedroom", "kitchen").
   */
  roomType?: string;

  /**
   * Human-readable display name for the room type.
   */
  roomTypeDisplayName?: string;

  /**
   * Constructs a new Floor instance.
   * 
   * @param id - Optional unique identifier
   * @param document - Optional parent document reference
   */
  constructor(id?: string, document?: unknown);

  /**
   * Factory method to create and initialize a Floor entity.
   * 
   * @param vertices - Array of 3D points defining the floor boundary
   * @param normal - Normal vector of the floor surface
   * @param material - Material reference or ID
   * @param document - Parent document reference
   * @returns Newly created and initialized Floor instance
   */
  static create(
    vertices: unknown[],
    normal: unknown,
    material: unknown,
    document: unknown
  ): Floor;

  /**
   * Returns the IO handler for this entity type.
   * 
   * @returns Singleton Floor_IO instance
   */
  getIO(): Floor_IO;

  /**
   * Iterates over all walls associated with this floor.
   * 
   * @param callback - Function called for each wall
   * @param context - Optional `this` context for the callback
   */
  forEachWall(
    callback: ((wall: Wall) => void) | null | undefined,
    context?: unknown
  ): void;

  /**
   * Iterates over all surfaces (floor/ceiling) of this room.
   * 
   * @param callback - Function called for each surface type
   * @param context - Optional `this` context for the callback
   */
  forEachSurface(
    callback: ((surfaceType: RoomSurfaceTypeEnum) => void) | null | undefined,
    context?: unknown
  ): void;

  /**
   * Gets the 3D height of the ceiling above this floor.
   * Returns the height of the parent layer if available.
   * 
   * @returns Ceiling height in 3D units, or 0 if not in a layer
   */
  get ceilingHeight3d(): number;

  /**
   * Gets all RoomInfo objects associated with this floor.
   * 
   * @returns Array of RoomInfo instances
   */
  get roomInfos(): RoomInfo[];

  /**
   * Iterates over all structure faces (walls, openings) connected to this floor.
   * 
   * @param callback - Function called for each structure face
   * @param context - Optional `this` context for the callback
   */
  forEachStructureFace(
    callback: ((face: Face) => void) | null | undefined,
    context?: unknown
  ): void;

  /**
   * Gets all unique structure faces associated with this floor's room infos.
   * 
   * @returns Deduplicated array of Face instances
   */
  get structureFaces(): Face[];

  /**
   * Gets the unique parent entity of this floor.
   * 
   * @returns Parent entity (typically a Layer)
   */
  getUniqueParent(): Entity | Layer | null;
}