/**
 * Module: Ceiling
 * Ceiling component for room/space management with split ceiling support and material handling
 */

import { Signal } from '../signal';
import { Face, Face_IO } from './Face';
import { Entity } from './Entity';
import { Wall } from './Wall';
import { RoomSurfaceTypeEnum } from './RoomSurface';
import { MaterialUtil } from '../MaterialUtil';

/**
 * Room information interface containing structures and faces
 */
export interface RoomInfo {
  /** Array of structural elements (walls, etc.) in the room */
  structures: Entity[];
  /** Array of face elements in the room */
  faces: Face[];
}

/**
 * Ceiling divide information structure
 */
export interface CeilingDivideInfo {
  [key: string]: unknown;
}

/**
 * Serialization options for ceiling dump operations
 */
export interface CeilingDumpOptions {
  /** Whether to save design-specific data */
  saveDesign?: boolean;
  /** Version string for migration compatibility */
  version?: string;
  [key: string]: unknown;
}

/**
 * Serialized ceiling data structure
 */
export interface SerializedCeilingData {
  /** Ceiling division information */
  divideInfo?: CeilingDivideInfo;
  /** Whether this is a split ceiling */
  isSplitCeiling?: boolean;
  /** Material data including mixpaint */
  __material?: {
    mixpaint?: {
      transform(matrix: unknown): void;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * IO handler for Ceiling entity serialization/deserialization
 * Manages ceiling-specific data including split ceiling info and material migration
 */
export declare class Ceiling_IO extends Face_IO {
  /**
   * Serialize ceiling entity to transferable format
   * @param entity - The ceiling entity to serialize
   * @param callback - Optional callback to process serialized data
   * @param includeGeometry - Whether to include geometry data
   * @param options - Serialization options
   * @returns Array of serialized data objects
   */
  dump(
    entity: Ceiling,
    callback?: (data: SerializedCeilingData[], entity: Ceiling) => void,
    includeGeometry?: boolean,
    options?: CeilingDumpOptions
  ): SerializedCeilingData[];

  /**
   * Deserialize ceiling data into entity
   * Handles material migration for versions earlier than 0.14
   * @param entity - Target ceiling entity
   * @param data - Serialized ceiling data
   * @param options - Load options including version info
   */
  load(
    entity: Ceiling,
    data: SerializedCeilingData,
    options?: CeilingDumpOptions
  ): void;

  /**
   * Migration-aware deserialization for legacy ceiling data
   * Applies RCP material transformations for pre-0.14 versions
   * @param entity - Target ceiling entity
   * @param data - Legacy serialized data
   * @param options - Migration options including version
   */
  migrateLoad(
    entity: Ceiling,
    data: SerializedCeilingData,
    options?: CeilingDumpOptions
  ): void;

  /**
   * Get singleton instance of Ceiling_IO
   */
  static instance(): Ceiling_IO;
}

/**
 * Ceiling entity representing the top surface of a room/space
 * Supports split ceilings, material management, and room structure relationships
 */
export declare class Ceiling extends Face {
  /** Signal emitted when content is added to the ceiling */
  readonly signalContentAdded: Signal<Ceiling>;
  
  /** Signal emitted when content is removed from the ceiling */
  readonly signalContentRemoved: Signal<Ceiling>;
  
  /** Whether this ceiling is split into multiple sections */
  isSplitCeiling: boolean;
  
  /** Internal division information for ceiling layout */
  divideInfo?: CeilingDivideInfo;
  
  /** Internal divide info storage used during deserialization */
  __divideInfo?: CeilingDivideInfo;
  
  /** Internal material storage */
  __material?: SerializedCeilingData['__material'];

  /**
   * Create a new Ceiling instance
   * @param id - Optional entity identifier
   * @param document - Parent document reference
   */
  constructor(id?: string, document?: unknown);

  /**
   * Factory method to create and initialize a ceiling
   * @param point1 - First corner point of ceiling
   * @param point2 - Second corner point of ceiling
   * @param point3 - Third corner point of ceiling
   * @param document - Parent document reference
   * @returns Initialized Ceiling instance
   */
  static create(
    point1: unknown,
    point2: unknown,
    point3: unknown,
    document?: unknown
  ): Ceiling;

  /**
   * Get the IO handler for this ceiling
   * @returns Ceiling_IO instance
   */
  getIO(): Ceiling_IO;

  /**
   * Iterate over all walls associated with this ceiling
   * @param callback - Function to call for each wall
   * @param context - Context for callback execution
   */
  forEachWall(
    callback: (wall: Wall) => void,
    context?: unknown
  ): void;

  /**
   * Iterate over surfaces of this ceiling
   * @param callback - Function to call for each surface type
   * @param context - Context for callback execution
   */
  forEachSurface(
    callback: (surfaceType: RoomSurfaceTypeEnum) => void,
    context?: unknown
  ): void;

  /**
   * Get all room information objects associated with this ceiling
   * @returns Array of room info objects
   */
  get roomInfos(): RoomInfo[];

  /**
   * Iterate over all structural faces in rooms associated with this ceiling
   * @param callback - Function to call for each face
   * @param context - Context for callback execution
   */
  forEachStructureFace(
    callback: (face: Face) => void,
    context?: unknown
  ): void;

  /**
   * Get all unique structural faces from associated rooms
   * @returns Array of unique Face instances
   */
  get structureFaces(): Face[];
}