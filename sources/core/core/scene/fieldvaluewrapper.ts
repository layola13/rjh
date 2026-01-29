import { Logger } from './Logger';
import { Entity } from './Entity';
import { FieldValueType } from './FieldValueType';

type EntityId = string | number;

interface EntityData {
  id: EntityId;
  [key: string]: unknown;
}

interface Transaction {
  data: Record<EntityId, EntityData>;
  txnStates: Map<EntityId, EntityState>;
  getEntityById(id: EntityId): Entity | null;
}

interface EntityState {
  restore(transaction: Transaction, data: EntityData, context: unknown): void;
}

interface MaterialData {
  id: EntityId;
}

interface State {
  id: EntityId;
}

type FieldValue =
  | null
  | number
  | string
  | boolean
  | Entity
  | Entity[]
  | Record<string, Entity>
  | MaterialData
  | State
  | unknown[]
  | Map<unknown, unknown>
  | Record<string, unknown>;

export class FieldValueWrapper {
  type: FieldValueType = FieldValueType.Generic;
  value: FieldValue;

  constructor(value: FieldValue, type: FieldValueType = FieldValueType.Generic) {
    this.type = type;
    this.value = value;
  }

  static dumpValue(
    value: FieldValue,
    type: FieldValueType,
    context?: unknown
  ): FieldValueWrapper {
    let dumpedValue: FieldValue;
    const valueType = typeof value;

    if (value instanceof Entity) {
      Logger.console.assert(
        type === FieldValueType.Entity,
        'unexpected value type!'
      );
    }

    if (
      value == null ||
      ['number', 'string', 'boolean'].includes(valueType)
    ) {
      dumpedValue = value;
    } else if (type === FieldValueType.Entity) {
      dumpedValue = (value as Entity)?.id;
    } else if (type === FieldValueType.EntityArray) {
      dumpedValue = ((value as Entity[]) || []).map((entity) => entity.id);
    } else if (type === FieldValueType.EntityMap) {
      dumpedValue = Object.keys((value as Record<string, Entity>) || {});
    } else if (type === FieldValueType.KeyEntityMap) {
      dumpedValue = {};
      Object.keys((value as Record<string, Entity>) || {}).forEach((key) => {
        (dumpedValue as Record<string, EntityId>)[key] = (value as Record<string, Entity>)[key].id;
      });
    } else if (type === FieldValueType.MaterialDataField) {
      dumpedValue = (value as MaterialData)?.id;
      if (value) {
        HSCore.Material.MaterialData.dumpMaterialData(value as MaterialData, context);
      }
    } else if (type === FieldValueType.StateField) {
      dumpedValue = (value as State)?.id;
      if (value) {
        HSCore.State.State.dumpState(value as State, context);
      }
    } else if (
      type === FieldValueType.MaterialData ||
      type === FieldValueType.State ||
      type === FieldValueType.Metadata
    ) {
      dumpedValue = value;
    } else if (Array.isArray(value)) {
      dumpedValue = value.slice();
    } else if (value instanceof Map) {
      dumpedValue = new Map(value);
    } else if (valueType === 'object') {
      dumpedValue = value;
    } else {
      Logger.console.assert(false, 'value type not supported yet!');
      dumpedValue = null;
    }

    return new FieldValueWrapper(dumpedValue, type);
  }

  loadValue(transaction: Transaction, context?: unknown): FieldValue {
    const storedValue = this.value;

    if (storedValue == null) {
      return storedValue;
    }

    if (this.type === FieldValueType.Entity) {
      return this._loadEntity(
        storedValue as EntityId,
        transaction,
        transaction.data[storedValue as EntityId],
        context
      );
    }

    if (this.type === FieldValueType.EntityArray) {
      const entities: Entity[] = [];
      ((storedValue as EntityId[]) || []).forEach((entityId) => {
        const entity = this._loadEntity(
          entityId,
          transaction,
          transaction.data[entityId],
          context
        );
        if (entity) {
          entities.push(entity);
        }
      });
      return entities;
    }

    if (this.type === FieldValueType.EntityMap) {
      const entityMap: Record<string, Entity> = {};
      ((storedValue as EntityId[]) || []).forEach((entityId) => {
        const entity = this._loadEntity(
          entityId,
          transaction,
          transaction.data[entityId],
          context
        );
        if (entity) {
          entityMap[String(entityId)] = entity;
        }
      });
      return entityMap;
    }

    if (this.type === FieldValueType.KeyEntityMap) {
      const keys = Object.keys((storedValue as Record<string, EntityId>) || {});
      const entityMap: Record<string, Entity> = {};
      keys.forEach((key) => {
        const entityId = (storedValue as Record<string, EntityId>)[key];
        const entity = this._loadEntity(
          entityId,
          transaction,
          transaction.data[entityId],
          context
        );
        if (entity) {
          entityMap[key] = entity;
        }
      });
      return entityMap;
    }

    if (this.type === FieldValueType.MaterialDataField) {
      return HSCore.Material.MaterialData.loadFromDumpById(
        storedValue as EntityId,
        transaction,
        true
      );
    }

    if (this.type === FieldValueType.StateField) {
      return HSCore.State.State.loadFromDumpById(
        storedValue as EntityId,
        transaction,
        true
      );
    }

    if (Array.isArray(storedValue)) {
      return storedValue.slice();
    }

    if (storedValue instanceof Map) {
      return new Map(storedValue);
    }

    return storedValue;
  }

  private _loadEntity(
    entityId: EntityId,
    transaction: Transaction,
    data: EntityData,
    context?: unknown
  ): Entity | null {
    const entityState = transaction.txnStates.get(entityId);

    if (entityState) {
      entityState.restore(transaction, data, context);
      return transaction.getEntityById(entityId);
    }

    let entity = transaction.getEntityById(entityId);

    if (!entity) {
      entity = Entity.loadFromDumpById(entityId, transaction, true);
    }

    if (!entity) {
      Logger.console.assert(false, `failed to restore entity ${entityId}`);
    }

    return entity;
  }
}