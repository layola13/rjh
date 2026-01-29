/**
 * Transaction state management for customized feature models.
 * Handles transaction operations and post-restore logic for feature model entities.
 */

import { ContentTxnState } from './ContentTxnState';
import { EntityTransactionType } from './EntityTransactionType';

/**
 * Interface representing a customized feature model entity with rebuild capabilities.
 */
interface ICustomizedFeatureModel {
  /**
   * Rebuilds the feature model after loading from persisted state.
   */
  rebuildAfterLoad(): void;
}

/**
 * Transaction state for customized feature models.
 * Extends ContentTxnState to provide specialized behavior for feature model transactions.
 */
export declare class CustomizedFeatureModelTxnState extends ContentTxnState {
  /**
   * Creates a new CustomizedFeatureModelTxnState instance.
   * 
   * @param entity - The entity associated with this transaction state
   * @param transactionType - The type of transaction (defaults to Modification)
   */
  constructor(
    entity: unknown,
    transactionType?: EntityTransactionType
  );

  /**
   * Called after restoring a transaction state from persistence.
   * Rebuilds the feature model if the entity exists in the context.
   * 
   * @param context - The transaction context
   * @param additionalData - Additional restoration data
   */
  postRestore(context: unknown, additionalData: unknown): void;

  /**
   * Retrieves the entity from the transaction context.
   * 
   * @param context - The transaction context
   * @returns The feature model entity or null if not found
   * @protected
   */
  protected _getEntityFromContext(context: unknown): ICustomizedFeatureModel | null;
}