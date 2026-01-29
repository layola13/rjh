import { EntityTransactionType } from './EntityTransactionType';
import { TransactionStateEnum } from './TransactionStateEnum';
import { FieldValueType } from './FieldValueType';
import { FieldValueWrapper } from './FieldValueWrapper';
import { Entity } from './Entity';
import { Logger } from './Logger';

const ENTITY_DUMP_KEY = "entity_dump";

interface EntityDumpData {
  id: string;
  c?: any;
  [key: string]: any;
}

interface TransactionContext {
  before?: {
    data: Record<string, any>;
    materialsData?: Map<any, any>;
  };
  after?: {
    data: Record<string, any>;
  };
  materialsData: Map<any, any>;
  txnStates: Map<string, EntityTxnState>;
  data: Record<string, any>;
  getEntityById?: (id: string) => Entity | undefined;
  entities?: Record<string, Entity>;
  canTransactField(): boolean;
}

interface RestoreOptions {
  before?: {
    data: Record<string, any>;
    materialsData: Map<any, any>;
  };
  canTransactField(): boolean;
}

export class EntityTxnState {
  public currentState: TransactionStateEnum = TransactionStateEnum.default;
  public entity: Entity;
  public type: EntityTransactionType;
  public lastType: EntityTransactionType;
  public dataBefore?: Map<string, any> | EntityDumpData;
  public dataAfter?: Map<string, any> | EntityDumpData;

  constructor(entity: Entity, type: EntityTransactionType = EntityTransactionType.Modification) {
    this.entity = entity;
    this.type = type;
    this.lastType = type;
  }

  private _getEntityFromContext(context: TransactionContext, entityId: string = ""): Entity | undefined {
    const id = entityId || (this.entity ? this.entity.id : "");
    
    if (!id) {
      Logger.console.assert(false, "invalid id!");
      return undefined;
    }

    if (context.getEntityById) {
      const foundEntity = context.getEntityById(id);
      if (foundEntity) {
        return foundEntity;
      }
    } else if (context.entities) {
      return context.entities[id];
    }

    return HSCore.Doc.getDocManager().activeDocument.getEntityById(id) || undefined;
  }

  public transact(
    fieldName: string = "",
    transactionType: EntityTransactionType,
    fieldDescriptor: any,
    options: RestoreOptions
  ): void {
    const entity = this.entity;
    if (!entity) {
      return;
    }

    this.lastType = transactionType;

    if (
      this.type === EntityTransactionType.Creation ||
      (this.type === EntityTransactionType.Recycling && this.type === this.lastType)
    ) {
      return;
    }

    if (this.dataBefore && (Entity.isEntityDumpData(this.dataBefore) || this.dataBefore.get(ENTITY_DUMP_KEY))) {
      return;
    }

    const beforeData = options.before?.data;
    if (!beforeData) {
      Logger.console.assert(false, "undefined 'before' data!");
      return;
    }

    const beforeMaterialsData = options.before!.materialsData;

    if (
      !options.canTransactField() ||
      !entity.canTransactField() ||
      !fieldName ||
      this.lastType === EntityTransactionType.Deletion
    ) {
      options.materialsData = new Map(beforeMaterialsData);
      const dumpedEntities = EntityTxnState._dumpEntity(entity, options as any, beforeData, true) || [];
      
      dumpedEntities.forEach((dumpedEntity: EntityDumpData) => {
        if (dumpedEntity.id && !beforeData[dumpedEntity.id]) {
          beforeData[dumpedEntity.id] = dumpedEntity;
        }
      });

      for (const [key, value] of options.materialsData) {
        if (!beforeMaterialsData.has(key)) {
          beforeMaterialsData.set(key, value);
        }
      }

      options.materialsData.clear();
      
      if (this.dataBefore) {
        (this.dataBefore as Map<string, any>).set(ENTITY_DUMP_KEY, dumpedEntities[0]);
      } else {
        this.dataBefore = dumpedEntities[0];
      }
      return;
    }

    if (!this.dataBefore) {
      this.dataBefore = new Map<string, any>();
      this.dataBefore.set("id", entity.id);
      beforeData[entity.id] = this.dataBefore;
    }

    if (this.dataBefore.has(fieldName)) {
      return;
    }

    const fieldValueType = entity[fieldName] instanceof HSCore.Model.Entity
      ? FieldValueType.Entity
      : fieldDescriptor.fieldValueType || FieldValueType.Generic;

    this.dataBefore.set(fieldName, EntityTxnState._dumpFieldValue(entity[fieldName], fieldValueType, options as any));
  }

  public commit(context: TransactionContext): void {
    const entity = this.entity;
    if (!entity) {
      return;
    }

    if (this.lastType === EntityTransactionType.Deletion || this.type === EntityTransactionType.Recycling) {
      entity.resetTempFlag();
      return;
    }

    const afterData = context.after?.data;
    if (!afterData) {
      Logger.console.assert(false, "undefined 'after' data!");
      return;
    }

    if (
      this.type === EntityTransactionType.Creation ||
      !this.dataBefore ||
      Entity.isEntityDumpData(this.dataBefore)
    ) {
      const dumpedEntities = EntityTxnState._dumpEntity(entity, context, afterData, false) || [];
      dumpedEntities.forEach((dumpedEntity: EntityDumpData) => {
        if (dumpedEntity.id) {
          afterData[dumpedEntity.id] = dumpedEntity;
        }
      });
      this.dataAfter = dumpedEntities[0];
      return;
    }

    if (this.dataBefore instanceof Map) {
      this.dataAfter = new Map<string, any>();
      afterData[entity.id] = this.dataAfter;
      this.dataAfter.set("id", entity.id);

      this.dataBefore.forEach((value, key) => {
        if (value instanceof FieldValueWrapper) {
          this.dataAfter!.set(key, EntityTxnState._dumpFieldValue(entity[key], value.type, context));
        }
      });
    } else {
      Logger.console.assert(false, "unexpected 'before' data!");
    }
  }

  public restore(context: TransactionContext, restoreData: any, state: TransactionStateEnum): void {
    if (!this.entity) {
      Logger.console.assert(false, "undefined entity!");
      return;
    }

    if (this.currentState === state) {
      return;
    }

    this.currentState = state;

    if (this.type === EntityTransactionType.Recycling) {
      return;
    }

    if (
      (this.type === EntityTransactionType.Creation && this.currentState === TransactionStateEnum.undo) ||
      (this.lastType === EntityTransactionType.Deletion && this.currentState === TransactionStateEnum.redo)
    ) {
      return;
    }

    const targetEntity = this._getEntityFromContext(context, this.entity.id);
    if (!targetEntity) {
      return;
    }

    if (!restoreData) {
      if (this.type !== EntityTransactionType.Creation && this.type !== EntityTransactionType.Deletion) {
        assert(false, `undefined restore data for ${this.entity.tag}.`, "HSCore.Transaction");
      }
      return;
    }

    const isEntityDump = Entity.isEntityDumpData(restoreData);
    let children: any;

    if (isEntityDump) {
      children = restoreData.c;
    } else if (restoreData.has(ENTITY_DUMP_KEY)) {
      children = restoreData.get(ENTITY_DUMP_KEY).c;
    } else {
      const childrenValue = EntityTxnState.getFieldValue(restoreData, "children");
      Logger.console.assert(!childrenValue || childrenValue instanceof FieldValueWrapper, "invalid value!");
      children = childrenValue?.loadValue(context, state);
    }

    const childrenKeys = children && (Array.isArray(children) ? children : Object.keys(children));
    let dataToRestore = restoreData;

    this.preLoadEntity(targetEntity, dataToRestore, context);

    if (childrenKeys) {
      childrenKeys.forEach((childId: string) => {
        EntityTxnState._restoreEntity(childId, context, this.currentState);
      });
    }

    if (isEntityDump) {
      targetEntity.load(dataToRestore, context);
    } else if (restoreData instanceof Map) {
      if (restoreData.has(ENTITY_DUMP_KEY)) {
        dataToRestore = restoreData.get(ENTITY_DUMP_KEY);
        targetEntity.load(dataToRestore, context);
      }

      restoreData.forEach((value, key) => {
        if (key !== ENTITY_DUMP_KEY) {
          EntityTxnState._loadFieldValue(targetEntity, key, context, value, state);
        }
      });
    } else {
      Logger.console.assert(false, "unexpected data!");
    }
  }

  public preLoadEntity(entity: Entity, data: any, context: TransactionContext): void {
    // Hook for subclasses
  }

  public postRestore(context: TransactionContext, data: any): void {
    const entity = this._getEntityFromContext(context, this.entity ? this.entity.id : "");
    if (entity) {
      entity.dirtyGeometry();
      entity.dirtyPosition();
    }
  }

  private static _dumpFieldValue(value: any, valueType: FieldValueType, context: TransactionContext): any {
    return FieldValueWrapper.dumpValue(value, valueType, context);
  }

  private static _dumpEntity(
    entity: Entity,
    context: TransactionContext,
    dataStore: Record<string, any>,
    useExisting: boolean
  ): EntityDumpData[] | undefined {
    if (!entity) {
      return undefined;
    }

    const existingData = dataStore[entity.id];
    const existingDump = useExisting && Entity.isEntityDumpData(existingData) ? existingData : undefined;

    if (existingDump) {
      return [existingDump];
    }

    Logger.console.assert(Boolean(context.materialsData), "context.materialsData is missing!");
    return entity.dump(undefined, true, context);
  }

  private static _restoreEntity(
    entityId: string,
    context: TransactionContext,
    state: TransactionStateEnum
  ): Entity | undefined {
    const txnState = context.txnStates.get(entityId);
    if (txnState) {
      txnState.restore(context, context.data[entityId], state);
      return txnState.entity;
    }

    let entity = context.getEntityById?.(entityId);
    if (!entity) {
      const dumpData = context.data[entityId];
      if (!Entity.isEntityDumpData(dumpData)) {
        Logger.console.assert(false, `no dump data for entity ${entityId}!`);
        return undefined;
      }
      entity = Entity.loadFromDump(dumpData, context, true);
    }

    return entity;
  }

  private static _loadFieldValue(
    entity: Entity,
    fieldName: string,
    context: TransactionContext,
    value: any,
    state: TransactionStateEnum
  ): void {
    if (!entity) {
      return;
    }

    const currentValue = entity[fieldName];
    if (currentValue === value) {
      return;
    }

    if (value instanceof FieldValueWrapper) {
      const loadedValue = value.loadValue(context, state);
      if (fieldName === "children") {
        entity.restoreChildren(loadedValue, context);
      } else if (fieldName === "parents") {
        entity.restoreParents(loadedValue, context);
      } else {
        entity[fieldName] = loadedValue;
      }
      return;
    }

    const valueType = currentValue ? typeof currentValue : typeof value;

    if (value == null || ["number", "string", "boolean"].includes(valueType)) {
      entity[fieldName] = value;
    } else if (Entity.isEntityDumpData(value)) {
      entity[fieldName] = EntityTxnState._restoreEntity(value.id, context, state);
    } else if (Array.isArray(currentValue) || Array.isArray(value)) {
      if (Array.isArray(currentValue)) {
        currentValue.length = 0;
        currentValue.xPushCollection(value);
      } else {
        entity[fieldName] = value;
      }
    } else if (currentValue && typeof currentValue === "object" || valueType === "object") {
      if (currentValue && typeof currentValue.load === "function" && currentValue.id === value.id) {
        currentValue.load(value, context);
      } else {
        entity[fieldName] = valueType === "object" ? Object.assign({}, value) : value;
      }
    } else {
      Logger.console.assert(false, "unexpected value type!");
    }
  }

  public static getFieldValue(data: Map<string, any> | Record<string, any> | undefined, fieldName: string): any {
    if (!data) {
      return undefined;
    }
    return data instanceof Map ? data.get(fieldName) : data[fieldName];
  }
}