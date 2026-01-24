import { Entity, Entity_IO } from './Entity';
import { EntityField } from './decorators';
import { Loader } from './Loader';

/**
 * I/O handler for ConcealedWorkLightWire entity serialization and deserialization
 */
export class ConcealedWorkLightWire_IO extends Entity_IO {
  /**
   * Serialize a ConcealedWorkLightWire entity to a plain object
   * @param entity - The entity to serialize
   * @param target - Optional target object to serialize into
   * @param includeDefaults - Whether to include default values
   * @param context - Additional serialization context
   * @returns Serialized entity data
   */
  dump(
    entity: ConcealedWorkLightWire,
    target?: unknown,
    includeDefaults: boolean = true,
    context: Record<string, unknown> = {}
  ): [Record<string, unknown>, unknown];

  /**
   * Deserialize a plain object into a ConcealedWorkLightWire entity
   * @param entity - The target entity to populate
   * @param data - The serialized data
   * @param context - Additional deserialization context
   */
  load(
    entity: ConcealedWorkLightWire,
    data: SerializedConcealedWorkLightWire,
    context?: unknown
  ): void;
}

/**
 * Represents a concealed work light wire entity with routing information
 * Contains node references and route geometry data
 */
export class ConcealedWorkLightWire extends Entity {
  /**
   * Array of node IDs that this wire connects
   */
  @EntityField()
  nodeIds: string[];

  /**
   * Array of route geometry points defining the wire path
   */
  @EntityField()
  route: unknown[];

  /**
   * Get the I/O handler instance for this entity type
   * @returns The singleton I/O handler
   */
  getIO(): ConcealedWorkLightWire_IO;

  /**
   * Get the parent tree containing this wire
   * @returns The parent tree entity or undefined if not found
   */
  get tree(): unknown | undefined;

  /**
   * Get the actual node entities referenced by nodeIds
   * @returns Array of node entities if all IDs resolve, otherwise empty array
   */
  get nodes(): unknown[];

  /**
   * Get the starting node of this wire
   * @returns The first node or undefined if no nodes exist
   */
  get startNode(): unknown | undefined;

  /**
   * Get the ending node of this wire
   * @returns The last node or undefined if no nodes exist
   */
  get endNode(): unknown | undefined;
}

/**
 * Serialized representation of ConcealedWorkLightWire
 */
interface SerializedConcealedWorkLightWire {
  /** Serialized node IDs */
  nds?: string[];
  /** Serialized route data */
  rte?: unknown[];
}