/**
 * Module: ConcealedWorkCircuit_IO
 * Provides I/O serialization and entity definition for concealed work circuits.
 */

import { Entity, Entity_IO } from './Entity';
import { ConcealedWorkCompEntity, ConcealedWorkCompEntity_IO } from './ConcealedWorkCompEntity';
import { Content } from './Content';

/**
 * I/O handler for ConcealedWorkCircuit entities.
 * Manages serialization and deserialization of circuit data including relationships.
 */
export class ConcealedWorkCircuit_IO extends ConcealedWorkCompEntity_IO {
  /**
   * Serializes a ConcealedWorkCircuit entity to a transferable format.
   * @param entity - The circuit entity to serialize
   * @param target - Optional target object for serialization
   * @param includeMetadata - Whether to include metadata in the dump
   * @param options - Additional serialization options
   * @returns Serialized representation of the entity
   */
  dump(
    entity: ConcealedWorkCircuit,
    target?: unknown,
    includeMetadata?: boolean,
    options?: Record<string, unknown>
  ): [Record<string, unknown>, ...unknown[]];

  /**
   * Deserializes data into a ConcealedWorkCircuit entity.
   * @param entity - The target entity to populate
   * @param data - Serialized data containing entity state
   * @param context - Deserialization context
   */
  load(
    entity: ConcealedWorkCircuit,
    data: ConcealedWorkCircuitData,
    context?: unknown
  ): void;

  /**
   * Returns the singleton instance of this I/O handler.
   */
  static instance(): ConcealedWorkCircuit_IO;
}

/**
 * Represents a concealed work circuit entity.
 * Manages relationships between circuit components and their contents.
 */
export class ConcealedWorkCircuit extends ConcealedWorkCompEntity {
  /**
   * Array of entity IDs representing related components in the circuit.
   */
  relations: string[];

  /**
   * Gets the content entities associated with this circuit.
   * Filters out invalid or non-Content entities.
   */
  readonly contents: Content[];

  /**
   * Gets the parent power system containing this circuit.
   * @returns The parent power system entity, if it exists
   */
  readonly powerSystem: Entity | undefined;

  /**
   * Returns the I/O handler instance for this entity type.
   */
  getIO(): ConcealedWorkCircuit_IO;
}

/**
 * Serialized data structure for ConcealedWorkCircuit.
 */
interface ConcealedWorkCircuitData {
  /** Serialized relations array */
  rlts?: string[];
  [key: string]: unknown;
}

/**
 * Global constants namespace.
 */
declare namespace HSConstants {
  enum ModelClass {
    ConcealedWorkCircuit = 'ConcealedWorkCircuit'
  }
}

/**
 * Decorator for marking entity fields.
 * @returns Property decorator
 */
export function EntityField(): PropertyDecorator;