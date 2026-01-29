import { Request } from './Request';
import { TxnStateFactory } from './TxnStateFactory';
import { EntityTransactionType } from './EntityTransactionType';
import { TransactionStateEnum } from './TransactionStateEnum';
import { Logger } from './Logger';

interface EntityData {
  [entityId: string]: any;
}

interface TransactionSnapshot {
  data: EntityData;
  materialsData: Map<string, any>;
  associations: any;
}

interface TransactionData {
  before: EntityData;
  after: EntityData;
  beforeMaterialsData: Map<string, any>;
  afterMaterialsData: Map<string, any>;
}

interface TransactionOptions {
  [key: string]: any;
}

interface RestoreContext {
  txnStates: Map<string, TxnState>;
  data: EntityData;
  materialsData: Map<string, any>;
  entities: { [entityId: string]: Entity };
  materials: Map<string, any>;
  states: any;
  constraints: any;
  productsMap: Map<string, any>;
  dispatchEvent: boolean;
  duringRestore: boolean;
  recycleEntity: (entity: Entity) => void;
  getEntityById: (entityId: string) => Entity | undefined;
}

interface Entity {
  id: string;
  isOrphan(): boolean;
  isRoot(): boolean;
  dump(options?: any, deep?: boolean): any[];
  load(data: any, context: RestoreContext): void;
  forEachChild(callback: (child: Entity) => void): void;
  getProxyObject(): ProxyObject | undefined;
}

interface TxnState {
  entity: Entity;
  type: EntityTransactionType;
  lastType: EntityTransactionType;
  dataAfter: any;
  transact(field: string, type: EntityTransactionType, options: TransactionOptions, request: StateRequest): void;
  commit(request: StateRequest): void;
  restore(context: RestoreContext, data: any, state: TransactionStateEnum): void;
  postRestore(context: RestoreContext, data: any): void;
}

interface ProxyObject {
  prepareUndoData(entity: Entity): ProxyUndoRedoObject | undefined;
}

interface ProxyUndoRedoObject {
  prepareRedo(): void;
  undo(): void;
  redo(): void;
}

export class StateRequest extends Request {
  private txnStates: Map<string, TxnState>;
  private before: TransactionSnapshot;
  private after: TransactionSnapshot;
  private materialsData: Map<string, any>;
  private productsMap: Map<string, any>;
  private isTransacting: boolean;
  private isDuringRestore: boolean;
  private entityMapDuringTransacting: { [entityId: string]: Entity };
  private needRestoreAssociation: boolean;
  private proxyUndoRedoObjs: Set<ProxyUndoRedoObject>;
  private __onCommitInvoked: boolean = false;
  public data: TransactionData;

  constructor() {
    super();
    this.txnStates = new Map();
    this.before = {
      data: {},
      materialsData: new Map(),
      associations: undefined
    };
    this.after = {
      data: {},
      materialsData: new Map(),
      associations: undefined
    };
    this.materialsData = new Map();
    this.productsMap = new Map();
    this.isTransacting = false;
    this.isDuringRestore = false;
    this.entityMapDuringTransacting = {};
    this.needRestoreAssociation = false;
    this.proxyUndoRedoObjs = new Set();
    this.data = {
      before: this.before.data,
      after: this.after.data,
      beforeMaterialsData: this.before.materialsData,
      afterMaterialsData: this.after.materialsData
    };
    this.before.associations = HSCore.Doc.getDocManager().associationManager.dump();
  }

  canTransact(): boolean {
    return true;
  }

  canTransactField(): boolean {
    return false;
  }

  transact(
    entity: Entity,
    field: string = "",
    type: EntityTransactionType = EntityTransactionType.Modification,
    options: TransactionOptions = {}
  ): void {
    if (this.isDuringRestore) {
      return;
    }

    const entityId = entity.id;
    let txnState = this.txnStates.get(entityId);

    if (this.isTransacting) {
      Logger.console.error(`${entity} is transacting!`);
      this.isTransacting = false;
    }

    if (this.isTransacting || (txnState && type === txnState.type && !field)) {
      return;
    }

    this.isTransacting = true;

    if (!txnState) {
      txnState = TxnStateFactory.createTxnState(entity, type);
      this.txnStates.set(entityId, txnState);
    }

    if (type !== EntityTransactionType.Creation) {
      txnState.transact(field, type, options, this);
    }

    this.isTransacting = false;
    this.entityMapDuringTransacting[entityId] = entity;
  }

  tryCreateEntityProxyUndoRedoObject(entity: Entity): void {
    const proxyObject = entity.getProxyObject();
    if (proxyObject) {
      const undoRedoObj = proxyObject.prepareUndoData(entity);
      if (undoRedoObj) {
        this.proxyUndoRedoObjs.add(undoRedoObj);
      }
    }
  }

  onPreCommit(): void {
    for (const [key, value] of this.materialsData) {
      this.before.materialsData.set(key, value);
    }
    this.materialsData.clear();
  }

  onCommit(): void {
    this.proxyUndoRedoObjs.forEach((obj) => {
      obj.prepareRedo();
    });

    this.after.associations = HSCore.Doc.getDocManager().associationManager.dump();
    this.needRestoreAssociation = 
      JSON.stringify(this.before.associations) !== JSON.stringify(this.after.associations);
    this.__onCommitInvoked = true;

    if (!HSCore.Doc.getDocManager().transManager.activeRequest) {
      if (DEBUG) {
        Logger.console.error("no active request!");
      }
      this.onPostCommit();
    }
  }

  onPostCommit(): void {
    if (!this.__onCommitInvoked) {
      return;
    }

    this.__onCommitInvoked = false;
    const validTxnStates = new Map<string, TxnState>();

    this.txnStates.forEach((txnState, stateId) => {
      const entity = this.entityMapDuringTransacting[txnState.entity.id];

      if (entity) {
        if (entity.isOrphan() && !entity.isRoot()) {
          if (txnState.type !== EntityTransactionType.Creation) {
            txnState.type = txnState.lastType = EntityTransactionType.Deletion;
            validTxnStates.set(entity.id, txnState);
          }
        } else {
          validTxnStates.set(entity.id, txnState);
        }
      } else {
        assert(false, `entity not found for ${txnState.entity.id}`, "HSCore.Transaction");
      }
    });

    this.txnStates = validTxnStates;

    this.txnStates.forEach((txnState, stateId) => {
      txnState.commit(this);
    });

    for (const [key, value] of this.materialsData) {
      this.after.materialsData.set(key, value);
    }

    this.entityMapDuringTransacting = {};
  }

  restore(snapshot: TransactionSnapshot, state: TransactionStateEnum): void {
    this.isDuringRestore = true;

    const transactionManager = HSCore.Doc.getDocManager().transManager;
    transactionManager.startBlockSignals();

    const activeDocument = HSCore.Doc.getDocManager().activeDocument;
    const snapshotData = snapshot.data;
    const snapshotMaterialsData = snapshot.materialsData;
    const productsMap = this.productsMap;
    const materials = new Map<string, any>();
    const states = activeDocument.stateManager.getAll();
    const constraints = activeDocument.constraintManager.getAll();
    const recycledEntityData: { [entityId: string]: any } = {};
    const recycledEntities: { [entityId: string]: Entity } = {};

    const context: RestoreContext = {
      txnStates: this.txnStates,
      data: snapshotData,
      materialsData: snapshotMaterialsData,
      entities: {},
      materials,
      states,
      constraints,
      productsMap,
      dispatchEvent: true,
      duringRestore: true,
      recycleEntity: (entity: Entity) => {
        delete context.entities[entity.id];
        recycledEntities[entity.id] = entity;
        recycledEntityData[entity.id] = entity.dump(undefined, false)[0];
      },
      getEntityById: (entityId: string) => {
        let entity = context.entities[entityId];
        if (entity) {
          return entity;
        }

        entity = recycledEntities[entityId];
        if (entity) {
          delete recycledEntities[entityId];
          context.entities[entityId] = entity;
          const entityData = recycledEntityData[entity.id];
          if (entityData) {
            entity.load(entityData, context);
          } else {
            entity.load(context.data[entityId], context);
          }
        }

        if (!entity) {
          entity = activeDocument.getEntityById(entityId);
        }

        return entity;
      }
    };

    const patterns = activeDocument.patternManager.getAll();
    Object.values(patterns).forEach((pattern: any) => {
      HSCore.Util.Entity.saveMetadata(pattern, productsMap);
      pattern.forEachChild((child: Entity) => HSCore.Util.Entity.saveMetadata(child, productsMap));
    });

    this.txnStates.forEach((txnState, stateId) => {
      const entity = txnState.entity;
      if (!context.entities[entity.id]) {
        context.entities[entity.id] = entity;
      }
    });

    for (const entityId in context.entities) {
      const entity = context.entities[entityId];
      HSCore.Util.Entity.saveMetadata(entity, productsMap);
      entity.forEachChild((child: Entity) => HSCore.Util.Entity.saveMetadata(child, productsMap));
    }

    this.txnStates.forEach((txnState, stateId) => {
      txnState.restore(context, snapshotData[txnState.entity.id], state);
    });

    this.txnStates.forEach((txnState, stateId) => {
      txnState.postRestore(context, snapshotData[txnState.entity.id]);
    });

    if (this.needRestoreAssociation) {
      HSCore.Doc.getDocManager().associationManager.clear();
      HSCore.Doc.getDocManager().associationManager.load(snapshot.associations, context, true);
    }

    transactionManager.stopBlockSignals();
    this.isDuringRestore = false;
    transactionManager.clearBlockedSignals();
  }

  onUndo(): void {
    this.restore(this.before, TransactionStateEnum.undo);
    this.proxyUndoRedoObjs.forEach((obj) => {
      obj.undo();
    });
  }

  onRedo(): void {
    this.proxyUndoRedoObjs.forEach((obj) => {
      obj.redo();
    });
    this.restore(this.after, TransactionStateEnum.redo);
  }

  onCompose(previousRequest: Request, nextRequest: Request): boolean {
    if (previousRequest.type !== this.type) {
      return false;
    }

    if (!nextRequest) {
      return false;
    }

    if (previousRequest.type !== nextRequest.type || !(nextRequest instanceof StateRequest)) {
      return false;
    }

    const nextStateRequest = nextRequest as StateRequest;

    for (const entityId in nextStateRequest.data.before) {
      if (!this.data.before[entityId]) {
        this.data.before[entityId] = nextStateRequest.data.before[entityId];
      }
    }

    nextStateRequest.data.beforeMaterialsData.forEach((value, key) => {
      if (!this.data.beforeMaterialsData.get(key)) {
        this.data.beforeMaterialsData.set(key, value);
      }
    });

    this.txnStates.forEach((txnState, stateId) => {
      const nextTxnState = nextStateRequest.txnStates.get(stateId);
      if (nextTxnState) {
        txnState.dataAfter = nextTxnState.dataAfter;
      }
    });

    nextStateRequest.txnStates.forEach((txnState, stateId) => {
      if (!this.txnStates.get(stateId)) {
        this.txnStates.set(stateId, txnState);
      }
    });

    for (const entityId in this.data.after) {
      if (!nextStateRequest.data.after[entityId]) {
        nextStateRequest.data.after[entityId] = this.data.after[entityId];
      }
    }

    this.data.after = nextStateRequest.data.after;

    this.data.afterMaterialsData.forEach((value, key) => {
      if (!nextStateRequest.data.afterMaterialsData.get(key)) {
        nextStateRequest.data.afterMaterialsData.set(key, value);
      }
    });

    this.data.afterMaterialsData = nextStateRequest.data.afterMaterialsData;

    nextStateRequest.productsMap.forEach((value, key) => {
      if (!this.productsMap.get(key)) {
        this.productsMap.set(key, value);
      }
    });

    this.after = nextStateRequest.after;

    return true;
  }

  get isRestoring(): boolean {
    return this.isDuringRestore;
  }
}