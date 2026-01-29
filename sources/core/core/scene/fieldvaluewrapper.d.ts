import { Logger } from './Logger';
import { Entity } from './Entity';
import { FieldValueType } from './FieldValueType';

/**
 * Wrapper class for field values with type information.
 * Provides serialization and deserialization capabilities for various field value types.
 */
export class FieldValueWrapper<T = unknown> {
  /** The type of the wrapped field value */
  public type: FieldValueType = FieldValueType.Generic;
  
  /** The actual value being wrapped */
  public value: T;

  /**
   * Creates a new FieldValueWrapper instance.
   * @param value - The value to wrap
   * @param type - The type of the field value (defaults to Generic)
   */
  constructor(value: T, type: FieldValueType = FieldValueType.Generic) {
    this.type = type;
    this.value = value;
  }

  /**
   * Serializes a value into a FieldValueWrapper for storage or transmission.
   * @param value - The value to serialize
   * @param valueType - The type classification of the value
   * @param context - Optional context object for material/state dumping
   * @returns A new FieldValueWrapper containing the serialized value
   */
  static dumpValue<T = unknown>(
    value: unknown,
    valueType: FieldValueType,
    context?: unknown
  ): FieldValueWrapper<T> {
    let serializedValue: unknown;
    const primitiveType = typeof value;

    // Validate entity type consistency
    if (value instanceof Entity) {
      Logger.console.assert(
        valueType === FieldValueType.Entity,
        'unexpected value type!'
      );
    }

    // Handle null and primitive types
    if (
      value == null ||
      ['number', 'string', 'boolean'].includes(primitiveType)
    ) {
      serializedValue = value;
    } 
    // Handle Entity reference
    else if (valueType === FieldValueType.Entity) {
      serializedValue = value && (value as Entity).id;
    } 
    // Handle array of entities
    else if (valueType === FieldValueType.EntityArray) {
      serializedValue = (value as Entity[] || []).map((entity: Entity) => entity.id);
    } 
    // Handle entity map (ID -> Entity)
    else if (valueType === FieldValueType.EntityMap) {
      serializedValue = Object.keys((value as Record<string, Entity>) || {});
    } 
    // Handle keyed entity map (arbitrary key -> Entity)
    else if (valueType === FieldValueType.KeyEntityMap) {
      serializedValue = {};
      const entityMap = (value as Record<string, Entity>) || {};
      Object.keys(entityMap).forEach((key: string) => {
        (serializedValue as Record<string, string>)[key] = entityMap[key].id;
      });
    } 
    // Handle MaterialData field reference
    else if (valueType === FieldValueType.MaterialDataField) {
      serializedValue = value && (value as { id: string }).id;
      if (value) {
        HSCore.Material.MaterialData.dumpMaterialData(value, context);
      }
    } 
    // Handle State field reference
    else if (valueType === FieldValueType.StateField) {
      serializedValue = value && (value as { id: string }).id;
      if (value) {
        HSCore.State.State.dumpState(value, context);
      }
    } 
    // Handle complex MaterialData, State, or Metadata objects
    else if (
      valueType === FieldValueType.MaterialData ||
      valueType === FieldValueType.State ||
      valueType === FieldValueType.Metadata
    ) {
      serializedValue = value;
    } 
    // Handle arrays (create shallow copy)
    else if (Array.isArray(value)) {
      serializedValue = value.slice();
    } 
    // Handle Map instances
    else if (value instanceof Map) {
      serializedValue = new Map(value);
    } 
    // Handle plain objects
    else if (primitiveType === 'object') {
      serializedValue = value;
    } 
    // Unsupported type
    else {
      Logger.console.assert(false, 'value type not supported yet!');
    }

    return new FieldValueWrapper<T>(serializedValue as T, valueType);
  }

  /**
   * Deserializes the wrapped value back to its original form.
   * @param dataSource - The data source containing entity definitions
   * @param options - Additional options for entity restoration
   * @returns The deserialized value
   */
  loadValue(dataSource: DataSource, options?: RestoreOptions): T | null {
    const storedValue = this.value;

    if (storedValue == null) {
      return storedValue;
    }

    // Handle single Entity reference
    if (this.type === FieldValueType.Entity) {
      return this._loadEntity(
        storedValue as string,
        dataSource,
        dataSource.data[storedValue as string],
        options
      ) as T;
    }

    // Handle Entity array
    if (this.type === FieldValueType.EntityArray) {
      const entities: Entity[] = [];
      ((storedValue as string[]) || []).forEach((entityId: string) => {
        const entity = this._loadEntity(
          entityId,
          dataSource,
          dataSource.data[entityId],
          options
        );
        if (entity) {
          entities.push(entity);
        }
      });
      return entities as T;
    }

    // Handle Entity map
    if (this.type === FieldValueType.EntityMap) {
      const entityMap: Record<string, Entity> = {};
      ((storedValue as string[]) || []).forEach((entityId: string) => {
        const entity = this._loadEntity(
          entityId,
          dataSource,
          dataSource.data[entityId],
          options
        );
        if (entity) {
          entityMap[entityId] = entity;
        }
      });
      return entityMap as T;
    }

    // Handle keyed Entity map
    if (this.type === FieldValueType.KeyEntityMap) {
      const keys = Object.keys((storedValue as Record<string, string>) || {});
      const entityMap: Record<string, Entity> = {};
      keys.forEach((key: string) => {
        const entityId = (storedValue as Record<string, string>)[key];
        const entity = this._loadEntity(
          entityId,
          dataSource,
          dataSource.data[entityId],
          options
        );
        if (entity) {
          entityMap[key] = entity;
        }
      });
      return entityMap as T;
    }

    // Handle MaterialData field
    if (this.type === FieldValueType.MaterialDataField) {
      return HSCore.Material.MaterialData.loadFromDumpById(
        storedValue as string,
        dataSource,
        true
      ) as T;
    }

    // Handle State field
    if (this.type === FieldValueType.StateField) {
      return HSCore.State.State.loadFromDumpById(
        storedValue as string,
        dataSource,
        true
      ) as T;
    }

    // Handle arrays (create shallow copy)
    if (Array.isArray(storedValue)) {
      return storedValue.slice() as T;
    }

    // Handle Map instances
    if (storedValue instanceof Map) {
      return new Map(storedValue) as T;
    }

    // Return value as-is for other types
    return storedValue;
  }

  /**
   * Internal method to load an entity from serialized data.
   * @param entityId - The ID of the entity to load
   * @param dataSource - The data source containing entity data
   * @param entityData - The raw entity data
   * @param options - Restoration options
   * @returns The loaded Entity instance or null
   */
  private _loadEntity(
    entityId: string,
    dataSource: DataSource,
    entityData: unknown,
    options?: RestoreOptions
  ): Entity | null {
    // Check if entity is in transaction state
    const transactionState = dataSource.txnStates.get(entityId);
    if (transactionState) {
      transactionState.restore(dataSource, entityData, options);
      return dataSource.getEntityById(entityId);
    }

    // Try to get existing entity
    let entity = dataSource.getEntityById(entityId);
    
    // Load entity from dump if not found
    if (!entity) {
      entity = Entity.loadFromDumpById(entityId, dataSource, true);
    }

    // Assert if entity still not found
    if (!entity) {
      Logger.console.assert(false, `failed to restore entity ${entityId}`);
    }

    return entity;
  }
}

/**
 * Data source interface for entity loading operations.
 */
interface DataSource {
  /** Map of entity IDs to entity data */
  data: Record<string, unknown>;
  
  /** Transaction states for entities */
  txnStates: Map<string, TransactionState>;
  
  /**
   * Retrieves an entity by its ID.
   * @param id - The entity ID
   * @returns The entity or null if not found
   */
  getEntityById(id: string): Entity | null;
}

/**
 * Transaction state for entity restoration.
 */
interface TransactionState {
  /**
   * Restores the entity from dumped data.
   * @param dataSource - The data source
   * @param data - The entity data
   * @param options - Restoration options
   */
  restore(dataSource: DataSource, data: unknown, options?: RestoreOptions): void;
}

/**
 * Options for entity restoration operations.
 */
interface RestoreOptions {
  [key: string]: unknown;
}

/**
 * Global HSCore namespace (expected to be available in runtime environment).
 */
declare global {
  const HSCore: {
    Material: {
      MaterialData: {
        dumpMaterialData(data: unknown, context?: unknown): void;
        loadFromDumpById(id: string, dataSource: DataSource, flag: boolean): unknown;
      };
    };
    State: {
      State: {
        dumpState(state: unknown, context?: unknown): void;
        loadFromDumpById(id: string, dataSource: DataSource, flag: boolean): unknown;
      };
    };
  };
}