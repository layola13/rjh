/**
 * Module: ConcealedWorkLightLogic_IO
 * Handles serialization/deserialization and logic for concealed work light entities
 */

import { Entity, Entity_IO } from './Entity';
import { EntityField } from './decorators';
import { Content } from './Content';

/**
 * Serialized data structure for ConcealedWorkLightLogic entity
 */
export interface ConcealedWorkLightLogicData {
  /** Relations to other entities */
  rlts?: string[];
  /** Display name */
  dpn?: string;
  [key: string]: unknown;
}

/**
 * IO handler for ConcealedWorkLightLogic entity
 * Manages serialization and deserialization of concealed work light data
 */
export class ConcealedWorkLightLogic_IO extends Entity_IO {
  /**
   * Serialize entity to plain object
   * @param entity - Entity to serialize
   * @param target - Serialization target (unused in base implementation)
   * @param includeMetadata - Whether to include metadata in output
   * @param options - Additional serialization options
   * @returns Tuple containing serialized data and metadata
   */
  dump(
    entity: ConcealedWorkLightLogic,
    target?: unknown,
    includeMetadata: boolean = true,
    options: Record<string, unknown> = {}
  ): [ConcealedWorkLightLogicData, unknown] {
    const result = super.dump(entity, undefined, includeMetadata, options);
    const data = result[0] as ConcealedWorkLightLogicData;

    // Serialize relations if present
    if (entity.relations.length) {
      data.rlts = entity.relations.map(relation => relation);
    }

    // Serialize display name if present
    if (entity.displayName) {
      data.dpn = entity.displayName;
    }

    return result as [ConcealedWorkLightLogicData, unknown];
  }

  /**
   * Deserialize plain object to entity
   * @param entity - Target entity to populate
   * @param data - Serialized data
   * @param context - Deserialization context
   */
  load(
    entity: ConcealedWorkLightLogic,
    data: ConcealedWorkLightLogicData,
    context: unknown
  ): void {
    super.load(entity, data, context);

    // Restore relations if present
    if (data.rlts) {
      Entity_IO.setEntityFields(entity, {
        relations: data.rlts
      });
    }

    // Restore display name if present
    if (data.dpn) {
      Entity_IO.setEntityFields(entity, {
        displayName: data.dpn
      });
    }
  }

  /**
   * Get singleton instance of IO handler
   */
  static instance(): ConcealedWorkLightLogic_IO {
    // Singleton implementation should be provided by base class
    return new ConcealedWorkLightLogic_IO();
  }
}

/**
 * Represents a concealed work light logic entity
 * Manages relationships and display properties for concealed lighting systems
 */
export class ConcealedWorkLightLogic extends Entity {
  /** Display name for the concealed work light */
  @EntityField()
  displayName: string = "";

  /** Array of entity IDs this light is related to */
  @EntityField()
  relations: string[] = [];

  /**
   * Get all content entities referenced by this light's relations
   * @returns Array of Content entities, filtering out invalid references
   */
  get contents(): Content[] {
    return this.relations
      .map(relationId => {
        const entity = this.doc.getEntityById(relationId);
        return entity instanceof Content ? entity : undefined;
      })
      .filter((entity): entity is Content => entity !== undefined);
  }

  /**
   * Get the parent light control system
   * @returns Parent entity if exists
   */
  get lightControlSystem(): Entity | undefined {
    const parent = this.getUniqueParent();
    if (parent) {
      return parent;
    }
    return undefined;
  }

  /**
   * Get the IO handler for this entity type
   * @returns IO handler instance
   */
  getIO(): ConcealedWorkLightLogic_IO {
    return ConcealedWorkLightLogic_IO.instance();
  }
}

// Register the class with the entity system
Entity.registerClass(
  HSConstants.ModelClass.ConcealedWorkLightLogic,
  ConcealedWorkLightLogic
);