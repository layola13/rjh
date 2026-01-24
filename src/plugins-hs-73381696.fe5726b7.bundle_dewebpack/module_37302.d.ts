/**
 * Transaction for applying material data to mesh entities.
 * Handles undo/redo operations and manages transaction state.
 */

import type { Entity } from 'HSCore';
import type { StateRequest } from 'HSCore.Transaction.Common';

/**
 * Information about the target entity for material application.
 */
export interface TargetInfo {
  /** The entity to apply material to */
  entity: Entity;
  /** Additional target-specific properties */
  [key: string]: unknown;
}

/**
 * Material data structure containing rendering information.
 */
export interface Material {
  /** Material configuration data */
  materialData: MaterialData;
  /** Additional material properties */
  [key: string]: unknown;
}

/**
 * Material rendering data.
 */
export interface MaterialData {
  /** Material properties for rendering */
  [key: string]: unknown;
}

/**
 * Transaction data for undo/redo operations.
 */
export interface TransactionData {
  /** Prepares the redo operation */
  prepareRedo(): void;
  /** Executes the undo operation */
  undo(): void;
  /** Executes the redo operation */
  redo(): void;
}

/**
 * Proxy object for entity material operations.
 */
export interface EntityProxyObject {
  /**
   * Prepares undo data for the entity.
   * @param entity - The entity to prepare undo data for
   * @returns Transaction data for undo/redo
   */
  prepareUndoData(entity: Entity): TransactionData;
  
  /**
   * Applies material data to a mesh entity.
   * @param targetInfo - Target entity information
   * @param materialData - Material data to apply
   * @returns Promise that resolves when material is applied
   */
  applyMaterialDataForMesh(
    targetInfo: TargetInfo,
    materialData: MaterialData
  ): Promise<void>;
}

/**
 * Transaction status states.
 */
type TransactionStatus = '' | 'running';

/**
 * Transaction request for applying materials to mesh entities.
 * Extends HSCore.Transaction.Common.StateRequest to provide
 * material application functionality with full undo/redo support.
 */
export default class ApplyMaterialTransaction extends StateRequest {
  /** Current transaction execution status */
  private static _status: TransactionStatus;

  /** Information about the target entity */
  private readonly _targetInfo: TargetInfo;
  
  /** Material to be applied */
  private readonly _material: Material;
  
  /** Transaction data for undo/redo operations */
  private _transactionData?: TransactionData;

  /**
   * Creates a new material application transaction.
   * @param targetInfo - Information about the target entity
   * @param material - Material to apply to the target
   */
  constructor(targetInfo: TargetInfo, material: Material);

  /**
   * Commits the transaction asynchronously.
   * Applies the material to the target entity and prepares undo/redo data.
   * @returns Promise that resolves when the transaction is committed
   */
  onCommitAsync(): Promise<void>;

  /**
   * Undoes the material application.
   * Restores the entity to its previous state.
   */
  onUndo(): void;

  /**
   * Redoes the material application.
   * Re-applies the material to the entity.
   */
  onRedo(): void;
}