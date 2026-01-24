/**
 * Mitre module - Handles mitre joints for wall moldings
 * Represents corner joints between two faces with calculated sweep paths
 */

import type { WallMolding, WallMolding_IO } from './WallMolding';
import type { MoldingTypeEnum } from './MoldingTypeEnum';
import type { Entity } from './Entity';
import type { Face } from './Face';
import type { Vector3 } from './Vector3';
import type { Curve } from './Curve';

/**
 * IO handler for serializing and deserializing Mitre entities
 */
export declare class Mitre_IO extends WallMolding_IO {
  /**
   * Serializes a Mitre entity to a plain object
   * @param entity - The Mitre entity to serialize
   * @param callback - Optional callback to process the serialized data
   * @param includeMetadata - Whether to include metadata in the output
   * @param options - Additional serialization options
   * @returns Serialized representation of the entity
   */
  dump(
    entity: Mitre,
    callback?: (data: any[], entity: Mitre) => void,
    includeMetadata?: boolean,
    options?: Record<string, any>
  ): any[];

  /**
   * Deserializes a plain object into a Mitre entity
   * @param entity - The target Mitre entity to populate
   * @param data - The serialized data to load from
   * @param context - Deserialization context
   */
  load(entity: Mitre, data: any, context: any): void;

  /**
   * Gets the singleton instance of Mitre_IO
   */
  static instance(): Mitre_IO;
}

/**
 * Represents a mitre joint between two wall faces
 * Calculates corner geometry and sweep paths for molding profiles
 */
export declare class Mitre extends WallMolding {
  /**
   * Type identifier for this molding
   */
  type: MoldingTypeEnum.Mitre;

  /**
   * Array of face IDs that this mitre joint connects
   * Should contain exactly 2 face IDs for valid mitre
   */
  relatedFaceIds: string[];

  /**
   * Creates a new Mitre instance
   * @param id - Unique identifier for the entity
   * @param parent - Parent entity containing this mitre
   */
  constructor(id?: string, parent?: any);

  /**
   * Gets the first face of the mitre joint
   * @returns The first face, or undefined if relatedFaceIds is invalid
   */
  get face1(): Face | undefined;

  /**
   * Gets the second face of the mitre joint
   * @returns The second face, or undefined if relatedFaceIds is invalid
   */
  get face2(): Face | undefined;

  /**
   * Calculates the normalized surface normal of face1 at the sweep start point
   * @returns Normal vector, or undefined if face1 or sweep paths are unavailable
   */
  get face1normal(): Vector3 | undefined;

  /**
   * Calculates the normalized surface normal of face2 at the sweep start point
   * @returns Normal vector, or undefined if face2 or sweep paths are unavailable
   */
  get face2normal(): Vector3 | undefined;

  /**
   * Calculates sweep paths for the mitre joint
   * Uses positive corner calculation between the two faces
   * @returns Array of curve paths, or empty array if faces are invalid
   */
  get sweepPaths(): Curve[];

  /**
   * Calculates the vertical direction line for the mitre joint
   * Determines correct orientation by testing cross products against face normals
   * @returns Vertical direction vector, or undefined if calculation fails
   */
  get verticalLine(): Vector3 | undefined;

  /**
   * Gets the IO handler for this entity type
   * @returns Singleton Mitre_IO instance
   */
  getIO(): Mitre_IO;

  /**
   * Creates a deep copy of this Mitre entity
   * @returns New Mitre instance with copied properties
   */
  clone(): Mitre;

  /**
   * Internal method to copy properties from another Mitre
   * @param source - Source entity to copy from
   */
  protected _copyFrom(source: Mitre): void;

  /**
   * Parent entity containing face data
   */
  parent: {
    faces: Record<string, Face>;
  };
}