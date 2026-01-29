/**
 * Module: NCustomizedRiser_IO
 * Provides IO operations and structure definition for customized riser components
 */

import { Line2d, Transform2D } from './geometry';
import { NCustomizedStructure_IO, NCustomizedStructure, StructureMode } from './customized-structure';
import { Entity } from './entity';

/**
 * User data attached to curve segments for identification
 */
interface CurveUserData {
  /** Identifier for the curve side (e.g., 'left', 'right', 'front', 'back') */
  curveid: 'left' | 'right' | 'front' | 'back';
  /** Index of the curve segment */
  index: number;
}

/**
 * Options for dump operations
 */
interface DumpOptions {
  [key: string]: unknown;
}

/**
 * Options for load operations
 */
interface LoadOptions {
  [key: string]: unknown;
}

/**
 * Callback function type for post-dump processing
 */
type DumpCallback<T = unknown> = (dumpedData: T, source: unknown) => void;

/**
 * IO handler for NCustomizedRiser
 * Manages serialization and deserialization of riser data
 */
export declare class NCustomizedRiser_IO extends NCustomizedStructure_IO {
  /**
   * Serialize riser data to a storable format
   * @param entity - The entity to serialize
   * @param callback - Optional callback for post-processing dumped data
   * @param includeMetadata - Whether to include metadata in the output
   * @param options - Additional dump options
   * @returns Serialized data representation
   */
  dump<T = unknown>(
    entity: unknown,
    callback?: DumpCallback<T>,
    includeMetadata?: boolean,
    options?: DumpOptions
  ): T;

  /**
   * Deserialize data and populate the entity
   * @param data - The serialized data to load
   * @param target - The target entity to populate
   * @param options - Additional load options
   */
  load(data: unknown, target: unknown, options?: LoadOptions): void;

  /**
   * Get singleton instance of the IO handler
   */
  static instance(): NCustomizedRiser_IO;
}

/**
 * Represents a customized riser structure component
 * A riser is a vertical structural element, typically part of a wall system
 */
export declare class NCustomizedRiser extends NCustomizedStructure {
  /**
   * Structure mode - fixed as wallpart for risers
   */
  structureMode: StructureMode;

  /**
   * Create a new customized riser instance
   * @param id - Optional identifier for the riser
   */
  constructor(id?: string);

  /**
   * Initialize the riser from metadata definition
   * @param metadata - Metadata object containing riser properties
   */
  initByMeta(metadata: unknown): void;

  /**
   * Get the primary path profile of the riser
   * Returns the first profile curve array
   */
  get path(): Line2d[];

  /**
   * Get the 3D height of the riser (Z dimension with scale applied)
   */
  get height3d(): number;

  /**
   * Set the 3D height of the riser
   * Automatically adjusts ZLength based on ZScale
   */
  set height3d(value: number);

  /**
   * Get the center curve of the riser
   * Returns a horizontal line at the center, transformed to world coordinates
   */
  get curve(): Line2d;

  /**
   * Set the structure mode (no-op for risers as mode is fixed)
   * @param mode - The structure mode to set
   */
  setStructureMode(mode: StructureMode): void;

  /**
   * Calculate the profile curves of the riser
   * Generates four lines representing the rectangular cross-section
   * @param applyTransform - Whether to apply 2D transformation to the curves
   * @returns Array containing profile curve arrays with user data for identification
   */
  calcProfile(applyTransform?: boolean): Line2d[][];

  /**
   * Get the left side path of the riser
   * Filters the profile for curves marked as 'left'
   */
  get leftPath(): Line2d | undefined;

  /**
   * Get the right side path of the riser
   * Filters the profile for curves marked as 'right'
   */
  get rightPath(): Line2d | undefined;

  /**
   * Create a new instance of the same type
   * @returns New NCustomizedRiser instance
   */
  newSelf(): NCustomizedRiser;

  /**
   * Get the IO handler for this riser type
   * @returns Singleton instance of NCustomizedRiser_IO
   */
  getIO(): NCustomizedRiser_IO;
}

/**
 * Register NCustomizedRiser class with the entity system
 * Allows the framework to instantiate risers by class name
 */
declare module './constants' {
  interface HSConstants {
    ModelClass: {
      NCustomizedRiser: string;
    };
  }
}