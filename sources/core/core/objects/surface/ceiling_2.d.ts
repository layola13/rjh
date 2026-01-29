/**
 * Module: Ceiling
 * Original ID: 70190
 * Exports: Ceiling_IO, Ceiling
 */

import { MaterialUtil } from '../material-util';
import { Face, Face_IO } from './face';
import { Entity } from '../entity';
import { EntityField, isValidNumber } from '../decorators';
import { Signal } from '../signal';
import { RoomSurfaceTypeEnum } from '../room-surface-type';

/**
 * Interface for ceiling division information
 */
export interface DivideInfo {
  // Define specific properties based on your domain model
  [key: string]: unknown;
}

/**
 * Options for loading ceiling data
 */
export interface LoadOptions {
  /** Version string for migration compatibility */
  version?: string;
  [key: string]: unknown;
}

/**
 * Serialized ceiling data structure
 */
export interface CeilingData {
  /** Division configuration for the ceiling */
  divideInfo?: DivideInfo;
  /** Vertical offset height in 3D space */
  offsetHeight3D?: number;
  /** Whether the ceiling is split into multiple sections */
  isSplitCeiling?: boolean;
  [key: string]: unknown;
}

/**
 * IO handler for Ceiling entity serialization/deserialization
 */
export declare class Ceiling_IO extends Face_IO {
  /**
   * Load ceiling data into an entity instance
   * @param entity - The ceiling entity to populate
   * @param data - Serialized ceiling data
   * @param options - Load options including version info
   * @param context - Additional loading context
   */
  load(
    entity: Ceiling,
    data: CeilingData,
    options?: LoadOptions,
    context?: unknown
  ): void;
}

/**
 * Ceiling entity representing a room's ceiling surface
 * Extends Face to provide ceiling-specific functionality including
 * material management, surface iteration, and split ceiling support
 */
export declare class Ceiling extends Face {
  /**
   * Division configuration for ceiling segments
   */
  divideInfo?: DivideInfo;

  /**
   * Vertical offset height in 3D coordinate system
   * @private
   */
  private __offsetHeight3D: number;

  /**
   * Vertical offset height in 3D coordinate system (accessor)
   */
  offsetHeight3D: number;

  /**
   * Signal emitted when content is added to the ceiling
   */
  readonly signalContentAdded: Signal<Ceiling>;

  /**
   * Signal emitted when content is removed from the ceiling
   */
  readonly signalContentRemoved: Signal<Ceiling>;

  /**
   * Indicates whether this ceiling is split into multiple sections
   */
  isSplitCeiling: boolean;

  /**
   * Creates a new Ceiling instance
   * @param id - Optional entity identifier
   */
  constructor(id?: string);

  /**
   * Get the IO handler for this entity type
   * @returns Singleton instance of Ceiling_IO
   */
  getIO(): Ceiling_IO;

  /**
   * Iterate over surfaces associated with this ceiling
   * @param callback - Function called for each surface type
   * @param context - Context for callback execution
   */
  forEachSurface(
    callback: (surfaceType: RoomSurfaceTypeEnum) => void,
    context?: unknown
  ): void;
}