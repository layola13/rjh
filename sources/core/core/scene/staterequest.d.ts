/**
 * State Request Module
 * Manages entity state transactions for undo/redo operations
 */

import { Request } from './Request';
import { TxnState } from './TxnState';
import { Entity } from './Entity';

/**
 * Entity transaction type enumeration
 */
export enum EntityTransactionType {
  Creation = 'Creation',
  Modification = 'Modification',
  Deletion = 'Deletion'
}

/**
 * Transaction state enumeration
 */
export enum TransactionStateEnum {
  undo = 'undo',
  redo = 'redo'
}

/**
 * Materials data type
 */
export type MaterialsData = Map<string, unknown>;

/**
 * Association data structure
 */
export interface AssociationData {
  [key: string]: unknown;
}

/**
 * Entity data structure
 */
export interface EntityData {
  [entityId: string]: unknown;
}

/**
 * State snapshot containing entity and material data
 */
export interface StateSnapshot {
  /** Entity data snapshot */
  data: EntityData;
  /** Materials data snapshot */
  materialsData: MaterialsData;
  /** Association data snapshot */
  associations: AssociationData | undefined;
}

/**
 * Transaction data structure for undo/redo operations
 */
export interface TransactionData {
  /** Entity data before transaction */
  before: EntityData;
  /** Entity data after transaction */
  after: EntityData;
  /** Materials data before transaction */
  beforeMaterialsData: MaterialsData;
  /** Materials data after transaction */
  afterMaterialsData: MaterialsData;
}

/**
 * Transaction options
 */
export interface TransactionOptions {
  [key: string]: unknown;
}

/**
 * Proxy undo/redo object interface
 */
export interface ProxyUndoRedoObject {
  /** Prepare redo operation */
  prepareRedo(): void;
  /** Execute undo operation */
  undo(): void;
  /** Execute redo operation */
  redo(): void;
}

/**
 * Restore context for entity restoration
 */
export interface RestoreContext {
  /** Transaction states map */
  txnStates: Map<string, TxnState>;
  /** Entity data */
  data: EntityData;
  /** Materials data */
  materialsData: MaterialsData;
  /** Entities being restored */
  entities: { [entityId: string]: Entity };
  /** Materials map */
  materials: Map<string, unknown>;
  /** All states */
  states: unknown[];
  /** All constraints */
  constraints: unknown[];
  /** Products metadata map */
  productsMap: Map<string, unknown>;
  /** Whether to dispatch events */
  dispatchEvent: boolean;
  /** Flag indicating during restore */
  duringRestore: boolean;
  /** Recycle entity callback */
  recycleEntity(entity: Entity): void;
  /** Get entity by ID callback */
  getEntityById(entityId: string): Entity | undefined;
}

/**
 * State Request class for managing entity state transactions
 * Supports undo/redo operations and entity state tracking
 */
export declare class StateRequest extends Request {
  /** Transaction states map keyed by entity ID */
  protected txnStates: Map<string, TxnState>;
  
  /** State snapshot before transaction */
  protected before: StateSnapshot;
  
  /** State snapshot after transaction */
  protected after: StateSnapshot;
  
  /** Current materials data */
  protected materialsData: MaterialsData;
  
  /** Products metadata map */
  protected productsMap: Map<string, unknown>;
  
  /** Flag indicating if currently transacting */
  protected isTransacting: boolean;
  
  /** Flag indicating if during restore operation */
  protected isDuringRestore: boolean;
  
  /** Map of entities being transacted */
  protected entityMapDuringTransacting: { [entityId: string]: Entity };
  
  /** Flag indicating if association restore is needed */
  protected needRestoreAssociation: boolean;
  
  /** Set of proxy undo/redo objects */
  protected proxyUndoRedoObjs: Set<ProxyUndoRedoObject>;
  
  /** Transaction data for undo/redo */
  public data: TransactionData;
  
  /** Internal flag for commit invocation */
  private __onCommitInvoked: boolean;

  constructor();

  /**
   * Check if transaction is allowed
   * @returns True if transaction can proceed
   */
  canTransact(): boolean;

  /**
   * Check if field-level transaction is allowed
   * @returns False, field-level transactions not supported
   */
  canTransactField(): boolean;

  /**
   * Start a transaction for an entity
   * @param entity - The entity to transact
   * @param fieldName - Optional field name for field-level transaction
   * @param type - Transaction type (Creation, Modification, Deletion)
   * @param options - Additional transaction options
   */
  transact(
    entity: Entity,
    fieldName?: string,
    type?: EntityTransactionType,
    options?: TransactionOptions
  ): void;

  /**
   * Try to create a proxy undo/redo object for entity
   * @param entity - The entity to create proxy for
   */
  tryCreateEntityProxyUndoRedoObject(entity: Entity): void;

  /**
   * Pre-commit hook, called before transaction commit
   */
  onPreCommit(): void;

  /**
   * Commit hook, finalizes transaction
   */
  onCommit(): void;

  /**
   * Post-commit hook, called after transaction commit
   */
  onPostCommit(): void;

  /**
   * Restore state from snapshot
   * @param snapshot - The state snapshot to restore
   * @param state - Transaction state (undo/redo)
   */
  restore(snapshot: StateSnapshot, state: TransactionStateEnum): void;

  /**
   * Undo operation
   */
  onUndo(): void;

  /**
   * Redo operation
   */
  onRedo(): void;

  /**
   * Compose with another request
   * @param currentRequest - Current request
   * @param nextRequest - Next request to compose
   * @returns True if composition successful
   */
  onCompose(currentRequest: Request, nextRequest: Request): boolean;

  /**
   * Check if currently restoring state
   * @returns True if during restore operation
   */
  get isRestoring(): boolean;
}