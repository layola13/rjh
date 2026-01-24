/**
 * Transaction state manager for RoomBuilder entities.
 * Handles transaction lifecycle and entity restoration for room building operations.
 */

import { EntityTxnState } from './EntityTxnState';

/**
 * RoomBuilderTxnState manages the transactional state of RoomBuilder entities.
 * Extends EntityTxnState to provide specialized behavior for room building operations,
 * ensuring entities are properly marked as dirty after restoration.
 */
export class RoomBuilderTxnState extends EntityTxnState {
  /**
   * Creates a new RoomBuilderTxnState instance.
   * 
   * @param entity - The entity associated with this transaction state
   * @param transactionId - Unique identifier for the transaction
   */
  constructor(entity: unknown, transactionId: unknown) {
    super(entity, transactionId);
  }

  /**
   * Hook called after a transaction is restored.
   * Marks the associated entity as dirty to ensure proper synchronization.
   * 
   * @param context - The restoration context containing entity references
   * @param data - Additional restoration data
   */
  postRestore(context: unknown, data: unknown): void {
    super.postRestore(context, data);
    
    const entity = this._getEntityFromContext(context);
    
    if (entity) {
      entity.dirty();
    }
  }
}