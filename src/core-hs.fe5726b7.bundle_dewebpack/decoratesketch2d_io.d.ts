/**
 * Module: DecorateSketch2d_IO
 * Provides IO serialization and extended functionality for 3D decorative sketch entities
 */

import { Sketch2d, Sketch2d_IO } from './Sketch2d';
import { Sketch2dBuilder } from './Sketch2dBuilder';
import { Entity } from './Entity';
import * as THREE from 'three';

/**
 * IO handler for DecorateSketch2d serialization/deserialization
 * Handles extrusion value mapping and 3D transformation matrix persistence
 */
export class DecorateSketch2d_IO extends Sketch2d_IO {
  private static _DecorateSketch2d_IO_instance?: DecorateSketch2d_IO;

  /**
   * Returns the singleton instance of DecorateSketch2d_IO
   */
  static instance(): DecorateSketch2d_IO;

  /**
   * Serializes a DecorateSketch2d instance to JSON format
   * @param entity - The DecorateSketch2d entity to serialize
   * @param callback - Optional callback for post-processing serialized data
   * @param includeMetadata - Whether to include metadata in output
   * @param options - Additional serialization options
   * @returns Serialized data array
   */
  dump(
    entity: DecorateSketch2d,
    callback?: (data: unknown[], entity: DecorateSketch2d) => void,
    includeMetadata?: boolean,
    options?: Record<string, unknown>
  ): unknown[];

  /**
   * Deserializes JSON data into a DecorateSketch2d instance
   * @param entity - The target DecorateSketch2d entity to populate
   * @param data - Serialized data object
   * @param options - Deserialization options including idGenerator and idMap
   */
  load(
    entity: DecorateSketch2d,
    data: SerializedDecorateSketch2d,
    options?: LoadOptions
  ): void;
}

/**
 * Builder for DecorateSketch2d entities
 * Handles face copying with extrusion value preservation
 */
declare class DecorateSketch2dBuilder extends Sketch2dBuilder {
  protected sketch2d: DecorateSketch2d;

  /**
   * Copies properties from source face to target face
   * Preserves extrusion values during copy operation
   * @param sourceFace - Source face to copy from
   * @param targetFace - Target face to copy to
   */
  copyFaceProps(sourceFace: Face, targetFace: Face): void;
}

/**
 * Extended Sketch2d entity with 3D decoration capabilities
 * Supports extrusion values per face and 3D transformation matrix
 */
export class DecorateSketch2d extends Sketch2d {
  /**
   * Maps face IDs to their extrusion depth values
   * @internal
   */
  _extrusionValueMap: Map<string, number>;

  /**
   * 4x4 transformation matrix for converting 2D sketch to 3D space
   */
  convert3dMatrix: THREE.Matrix4;

  /**
   * Internal flag indicating geometry bounds need recalculation
   * @internal
   */
  protected _boundDirty: boolean;

  /**
   * Creates a new DecorateSketch2d instance
   * @param name - Optional entity name
   * @param options - Optional initialization options
   */
  constructor(name?: string, options?: unknown);

  /**
   * Returns the IO handler instance for this entity type
   */
  getIO(): DecorateSketch2d_IO;

  /**
   * Retrieves the extrusion depth value for a specific face
   * @param faceId - The face identifier
   * @returns The extrusion value, or 0 if not set
   */
  getExtrusionValue(faceId: string): number;

  /**
   * Sets the extrusion depth value for a specific face
   * Marks affected face and geometry as dirty for re-rendering
   * @param faceId - The face identifier
   * @param value - The extrusion depth value
   */
  setExtrusionValue(faceId: string, value: number): void;

  /**
   * Creates a builder instance for constructing this sketch
   */
  createBuilder(): DecorateSketch2dBuilder;

  /**
   * Copies a face with all associated properties including extrusion values
   * @param sourceFaceId - Source face identifier
   * @param sourceFace - Source face object
   * @param options - Copy options
   * @returns The newly created face
   */
  copyFace(sourceFaceId: string, sourceFace: Face, options?: unknown): Face;

  /**
   * Internal handler for field change events
   * @param fieldName - Name of the changed field
   * @internal
   */
  protected _processFieldChanged(fieldName: string): void;
}

/**
 * Serialized representation of DecorateSketch2d
 */
interface SerializedDecorateSketch2d {
  /** Serialized extrusion value map as array of [faceId, value] tuples */
  extrusionValueMap?: Array<[string, number]>;
  /** Legacy property name for extrusion map */
  _extrusionValueMap?: Array<[string, number]>;
  /** Serialized 3D transformation matrix */
  convert3dMatrix?: {
    elements: number[];
  } | number[];
}

/**
 * Options for deserialization operations
 */
interface LoadOptions {
  /** Optional ID generator for remapping entity IDs */
  idGenerator?: unknown;
  /** Optional map for translating old IDs to new IDs */
  idMap?: Map<string, string>;
  [key: string]: unknown;
}

/**
 * Represents a face within a sketch
 */
interface Face {
  /** Unique identifier for the face */
  id: string;
  /** Marks the face as needing re-rendering */
  dirty(options?: unknown): void;
  [key: string]: unknown;
}