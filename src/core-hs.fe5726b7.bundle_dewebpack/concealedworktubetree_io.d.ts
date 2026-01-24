/**
 * Module: ConcealedWorkTubeTree_IO
 * Provides I/O serialization and entity management for concealed work tube tree structures.
 * 
 * This module handles the serialization/deserialization of tube tree data and manages
 * the hierarchical relationship between tubes and nodes in concealed work systems.
 */

import type { Entity, Entity_IO } from './Entity';
import type { ConcealedWorkTree, ConcealedWorkTree_IO } from './ConcealedWorkTree';
import type { ConcealedWorkTube } from './ConcealedWorkTube';

/**
 * Serialized representation of a ConcealedWorkTubeTree
 */
interface SerializedTubeTree {
  /** Diameter of the tube tree (optional) */
  dia?: number;
  [key: string]: unknown;
}

/**
 * Options for dump operation
 */
interface DumpOptions {
  [key: string]: unknown;
}

/**
 * I/O handler for ConcealedWorkTubeTree serialization and deserialization.
 * Extends the base ConcealedWorkTree_IO to add diameter field handling.
 */
export declare class ConcealedWorkTubeTree_IO extends ConcealedWorkTree_IO {
  /**
   * Get singleton instance of the I/O handler
   */
  static instance(): ConcealedWorkTubeTree_IO;

  /**
   * Serialize a ConcealedWorkTubeTree entity to a data structure
   * @param entity - The tube tree entity to serialize
   * @param parent - Parent entity reference (optional)
   * @param includeChildren - Whether to include child entities in serialization
   * @param options - Additional serialization options
   * @returns Array containing the serialized data structure
   */
  dump(
    entity: ConcealedWorkTubeTree,
    parent?: unknown,
    includeChildren?: boolean,
    options?: DumpOptions
  ): [SerializedTubeTree, ...unknown[]];

  /**
   * Deserialize data into a ConcealedWorkTubeTree entity
   * @param entity - The target entity to populate
   * @param data - Serialized tube tree data
   * @param context - Deserialization context
   */
  load(
    entity: ConcealedWorkTubeTree,
    data: SerializedTubeTree,
    context: unknown
  ): void;
}

/**
 * Represents a concealed work tube tree structure.
 * Manages a collection of tubes and their hierarchical relationships.
 */
export declare class ConcealedWorkTubeTree extends ConcealedWorkTree {
  /**
   * Diameter of the tube tree (optional)
   * Decorated with @EntityField for automatic serialization
   */
  diameter?: number;

  /**
   * Internal storage for child entities
   * @internal
   */
  protected _children: Record<string, Entity>;

  /**
   * Get the I/O handler instance for this entity type
   * @returns The I/O handler for serialization/deserialization
   */
  getIO(): ConcealedWorkTubeTree_IO;

  /**
   * Get all tubes in this tree
   * Filters child entities to return only ConcealedWorkTube instances
   * @returns Array of tube entities
   */
  get tubes(): ConcealedWorkTube[];

  /**
   * Find a tube by matching its node sequence
   * @param nodes - Array of node identifiers to match
   * @returns The matching tube entity, or undefined if not found
   */
  findTube(nodes: unknown[]): ConcealedWorkTube | undefined;

  /**
   * Add a tube to this tree
   * @param tube - The tube entity to add
   */
  addTube(tube: ConcealedWorkTube): void;

  /**
   * Remove a tube from this tree
   * @param tube - The tube entity to remove
   */
  removeTube(tube: ConcealedWorkTube): void;

  /**
   * Get a tube by identifier
   * @param identifier - The tube identifier
   * @returns The tube entity, or undefined if not found
   */
  getTube(identifier: unknown): ConcealedWorkTube | undefined;

  /**
   * Internal method to add a concealed work entity
   * @internal
   */
  protected _addCWEntity(collection: unknown[], entity: Entity): void;

  /**
   * Internal method to remove a concealed work entity
   * @internal
   */
  protected _removeCWEntity(collection: unknown[], entity: Entity): void;

  /**
   * Internal method to get a concealed work entity
   * @internal
   */
  protected _getCWEntity(collection: unknown[], identifier: unknown): Entity | undefined;
}

/**
 * Global constants namespace
 */
declare global {
  const HSConstants: {
    ModelClass: {
      ConcealedWorkTubeTree: string;
    };
  };
}