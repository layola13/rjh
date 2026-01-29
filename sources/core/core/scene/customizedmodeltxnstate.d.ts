import { EntityTxnState } from './EntityTxnState';

/**
 * Transaction state manager for customized models.
 * Extends EntityTxnState to handle model-specific transaction operations
 * and dispatches WebCAD document change signals after restore operations.
 */
export declare class CustomizedModelTxnState extends EntityTxnState {
  /**
   * Creates a new CustomizedModelTxnState instance.
   * @param entity - The entity associated with this transaction state
   * @param transactionData - Initial transaction data
   */
  constructor(entity: unknown, transactionData: unknown);

  /**
   * Called after a transaction restore operation completes.
   * Signals that the WebCAD document has changed if the entity exists in context.
   * @param context - The context containing entity information
   * @param restoreData - Data used during the restore operation
   */
  postRestore(context: unknown, restoreData: unknown): void;

  /**
   * Internal method to retrieve the entity from the given context.
   * @param context - The context to query for the entity
   * @returns The entity if found, undefined otherwise
   * @internal
   */
  protected _getEntityFromContext(context: unknown): { signalWebCADDocChanged: { dispatch(): void } } | undefined;
}