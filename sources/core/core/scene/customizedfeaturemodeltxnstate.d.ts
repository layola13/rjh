/**
 * Transaction state handler for customized feature models.
 * Manages the transaction lifecycle for feature model entities, including
 * restoration and rebuilding after load operations.
 * 
 * @module CustomizedFeatureModelTxnState
 */

import { ContentTxnState } from './ContentTxnState';
import { EntityTransactionType } from './EntityTransactionType';

/**
 * Interface representing a customized feature model entity.
 * Entities must implement a rebuild method to reconstruct state after loading.
 */
interface ICustomizedFeatureModel {
  /**
   * Rebuilds the entity's internal state after being loaded from storage.
   * This method is called during the post-restore phase of a transaction.
   */
  rebuildAfterLoad(): void;
}

/**
 * Transaction context interface used during restore operations.
 */
interface ITransactionContext {
  [key: string]: unknown;
}

/**
 * Transaction state manager for customized feature model entities.
 * Extends the base ContentTxnState to provide specialized handling for
 * feature models that require rebuilding after restoration.
 * 
 * @extends ContentTxnState
 */
export class CustomizedFeatureModelTxnState extends ContentTxnState {
  /**
   * Creates a new CustomizedFeatureModelTxnState instance.
   * 
   * @param entity - The entity instance being tracked by this transaction state
   * @param transactionType - The type of transaction (defaults to Modification)
   */
  constructor(
    entity: unknown,
    transactionType: EntityTransactionType = EntityTransactionType.Modification
  ) {
    super(entity, transactionType);
  }

  /**
   * Post-restoration hook called after an entity is restored from a transaction.
   * Retrieves the entity from the context and triggers its rebuild process.
   * 
   * @param context - The transaction context containing entity data
   * @param additionalData - Additional data passed during restoration
   */
  postRestore(context: ITransactionContext, additionalData: unknown): void {
    super.postRestore(context, additionalData);
    
    const entity = this._getEntityFromContext(context) as ICustomizedFeatureModel | null;
    
    entity?.rebuildAfterLoad();
  }
}