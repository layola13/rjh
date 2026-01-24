import { EntityTransactionType } from './EntityTransactionType';
import { TransactionStateEnum } from './TransactionStateEnum';
import { FieldValueType } from './FieldValueType';
import { FieldValueWrapper } from './FieldValueWrapper';
import { Entity, EntityDumpData } from './Entity';
import { Logger } from './Logger';

/**
 * Entity dump key constant used to identify entity dump data in transaction state
 */
declare const ENTITY_DUMP_KEY = "entity_dump";

/**
 * Context interface for entity transactions
 */
interface TransactionContext {
  /** Get entity by its unique identifier */
  getEntityById?(id: string): Entity | undefined;
  /** Map of entities keyed by ID */
  entities?: Record<string, Entity>;
  /** Transaction states map */
  txnStates: Map<string, EntityTxnState>;
  /** Transaction data storage */
  data: Record<string, EntityDumpData | Map<string, unknown>>;
  /** Materials data for entity rendering */
  materialsData: Map<string, unknown>;
  /** Before-state transaction data */
  before?: {
    data: Record<string, EntityDumpData | Map<string, unknown>>;
    materialsData: Map<string, unknown>;
  };
  /** After-state transaction data */
  after?: {
    data: Record<string, EntityDumpData | Map<string, unknown>>;
  };
  /** Check if field can be transacted */
  canTransactField(): boolean;
}

/**
 * Field descriptor for transaction tracking
 */
interface FieldDescriptor {
  /** Type of the field value */
  fieldValueType?: FieldValueType;
}

/**
 * Transaction restore options
 */
interface RestoreOptions {
  /** Before-state snapshot */
  before?: {
    data: Record<string, EntityDumpData | Map<string, unknown>>;
    materialsData: Map<string, unknown>;
  };
  /** After-state snapshot */
  after?: unknown;
  /** Check if field can be transacted */
  canTransactField(): boolean;
}

/**
 * Manages transaction state for a single entity, tracking changes for undo/redo operations.
 * Handles serialization and restoration of entity state across transaction boundaries.
 */
export declare class EntityTxnState {
  /** Current transaction state (default/undo/redo) */
  currentState: TransactionStateEnum;
  
  /** The entity being tracked */
  entity: Entity;
  
  /** Type of transaction (Creation/Modification/Deletion/Recycling) */
  type: EntityTransactionType;
  
  /** Previous transaction type */
  lastType: EntityTransactionType;
  
  /** Snapshot of entity data before transaction */
  dataBefore?: EntityDumpData | Map<string, unknown>;
  
  /** Snapshot of entity data after transaction */
  dataAfter?: EntityDumpData | Map<string, unknown>;

  /**
   * Creates a new entity transaction state tracker
   * @param entity - The entity to track
   * @param type - Type of transaction (defaults to Modification)
   */
  constructor(entity: Entity, type?: EntityTransactionType);

  /**
   * Retrieves entity from context by ID, with fallback to active document
   * @param context - Transaction context containing entity registry
   * @param entityId - Optional entity ID (defaults to tracked entity's ID)
   * @returns The found entity or undefined
   */
  private _getEntityFromContext(
    context: TransactionContext,
    entityId?: string
  ): Entity | undefined;

  /**
   * Records a field change as part of the current transaction
   * @param fieldName - Name of the field being changed
   * @param transactionType - Type of transaction triggering the change
   * @param fieldDescriptor - Metadata about the field
   * @param context - Transaction context
   */
  transact(
    fieldName: string,
    transactionType: EntityTransactionType,
    fieldDescriptor: FieldDescriptor,
    context: RestoreOptions
  ): void;

  /**
   * Commits the transaction, capturing the after-state of the entity
   * @param context - Transaction context with after-state data
   */
  commit(context: TransactionContext): void;

  /**
   * Restores entity to a specific transaction state (undo/redo)
   * @param context - Transaction context
   * @param restoreData - Snapshot data to restore from
   * @param targetState - Target state to restore to
   */
  restore(
    context: TransactionContext,
    restoreData: EntityDumpData | Map<string, unknown> | undefined,
    targetState: TransactionStateEnum
  ): void;

  /**
   * Hook called before entity restoration begins
   * @param entity - Entity being restored
   * @param data - Restoration data
   * @param context - Transaction context
   */
  preLoadEntity(
    entity: Entity,
    data: EntityDumpData | Map<string, unknown>,
    context: TransactionContext
  ): void;

  /**
   * Hook called after entity restoration completes
   * @param context - Transaction context
   * @param data - Restoration data
   */
  postRestore(
    context: TransactionContext,
    data: EntityDumpData | Map<string, unknown> | undefined
  ): void;

  /**
   * Serializes a field value for storage in transaction log
   * @param value - The value to serialize
   * @param valueType - Type classification of the value
   * @param context - Transaction context
   * @returns Serialized field value wrapper
   */
  private static _dumpFieldValue(
    value: unknown,
    valueType: FieldValueType,
    context: RestoreOptions
  ): FieldValueWrapper;

  /**
   * Serializes an entire entity and its hierarchy
   * @param entity - Entity to serialize
   * @param context - Transaction context
   * @param dataStore - Storage for serialized data
   * @param includeChildren - Whether to recursively dump child entities
   * @returns Array of serialized entity data
   */
  private static _dumpEntity(
    entity: Entity,
    context: RestoreOptions,
    dataStore: Record<string, EntityDumpData | Map<string, unknown>>,
    includeChildren: boolean
  ): EntityDumpData[] | undefined;

  /**
   * Deserializes and restores an entity from transaction log
   * @param entityId - ID of entity to restore
   * @param context - Transaction context
   * @param targetState - Target state to restore to
   * @returns Restored entity instance
   */
  private static _restoreEntity(
    entityId: string,
    context: TransactionContext,
    targetState: TransactionStateEnum
  ): Entity | undefined;

  /**
   * Restores a single field value on an entity
   * @param entity - Entity to restore field on
   * @param fieldName - Name of the field
   * @param context - Transaction context
   * @param value - Value to restore
   * @param targetState - Target state
   */
  private static _loadFieldValue(
    entity: Entity,
    fieldName: string,
    context: TransactionContext,
    value: unknown,
    targetState: TransactionStateEnum
  ): void;

  /**
   * Retrieves a field value from transaction data
   * @param data - Transaction data (Map or object)
   * @param fieldName - Name of the field to retrieve
   * @returns The field value or undefined
   */
  static getFieldValue(
    data: EntityDumpData | Map<string, unknown> | undefined,
    fieldName: string
  ): unknown;
}