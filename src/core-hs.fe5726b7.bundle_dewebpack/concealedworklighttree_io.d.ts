/**
 * Module: ConcealedWorkLightTree_IO
 * Provides I/O operations and tree structure management for concealed work light entities.
 */

import { Entity } from './Entity';
import { ConcealedWorkTree_IO, ConcealedWorkTree } from './ConcealedWorkTree';
import { ConcealedWorkLightWire } from './ConcealedWorkLightWire';

/**
 * I/O handler for ConcealedWorkLightTree.
 * Manages serialization and deserialization of light tree data.
 */
export declare class ConcealedWorkLightTree_IO extends ConcealedWorkTree_IO {
  /**
   * Serializes the light tree entity to a data format.
   * @param entity - The entity to serialize
   * @param type - Optional type parameter (unused, always undefined)
   * @param includeChildren - Whether to include child entities in the dump
   * @param options - Additional serialization options
   * @returns Serialized representation of the entity
   */
  dump(
    entity: unknown,
    type?: undefined,
    includeChildren?: boolean,
    options?: Record<string, unknown>
  ): unknown;

  /**
   * Deserializes data into a light tree entity.
   * @param entity - The target entity to populate
   * @param data - Source data to load from
   * @param context - Loading context information
   */
  load(entity: unknown, data: unknown, context: unknown): void;

  /**
   * Returns the singleton instance of this I/O handler.
   */
  static instance(): ConcealedWorkLightTree_IO;
}

/**
 * Represents a tree structure for managing concealed work light entities.
 * Extends the base ConcealedWorkTree with light wire specific functionality.
 */
export declare class ConcealedWorkLightTree extends ConcealedWorkTree {
  /**
   * Internal storage for child entities.
   * @internal
   */
  protected _children: Record<string, unknown>;

  /**
   * Returns the I/O handler instance for this tree type.
   * @returns The singleton ConcealedWorkLightTree_IO instance
   */
  getIO(): ConcealedWorkLightTree_IO;

  /**
   * Gets all light wire entities in this tree.
   * Filters child entities to return only ConcealedWorkLightWire instances.
   */
  get lightWires(): ConcealedWorkLightWire[];

  /**
   * Adds a light wire entity to the tree.
   * @param lightWire - The light wire entity to add
   */
  addLightWire(lightWire: ConcealedWorkLightWire): void;

  /**
   * Removes a light wire entity from the tree.
   * @param lightWire - The light wire entity to remove
   */
  removeLightWire(lightWire: ConcealedWorkLightWire): void;

  /**
   * Retrieves a specific light wire entity by identifier.
   * @param identifier - The identifier of the light wire to retrieve
   * @returns The matching light wire entity, if found
   */
  getLightWire(identifier: unknown): ConcealedWorkLightWire | undefined;

  /**
   * Internal method to add a concealed work entity.
   * @internal
   */
  protected _addCWEntity(
    collection: ConcealedWorkLightWire[],
    entity: ConcealedWorkLightWire
  ): void;

  /**
   * Internal method to remove a concealed work entity.
   * @internal
   */
  protected _removeCWEntity(
    collection: ConcealedWorkLightWire[],
    entity: ConcealedWorkLightWire
  ): void;

  /**
   * Internal method to get a concealed work entity.
   * @internal
   */
  protected _getCWEntity(
    collection: ConcealedWorkLightWire[],
    identifier: unknown
  ): ConcealedWorkLightWire | undefined;
}

/**
 * Global HSConstants namespace for model class registration.
 */
declare global {
  namespace HSConstants {
    enum ModelClass {
      ConcealedWorkLightTree = 'ConcealedWorkLightTree'
    }
  }
}