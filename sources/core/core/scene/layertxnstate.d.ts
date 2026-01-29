/**
 * Module: LayerTxnState
 * 
 * Manages transaction state for layer entities, extending the base entity transaction state
 * to handle layer-specific restoration operations.
 */

import { EntityTxnState } from './EntityTxnState';

/**
 * Context object passed during transaction operations
 */
interface TransactionContext {
  [key: string]: unknown;
}

/**
 * Entity representing a layer in the application
 */
interface LayerEntity {
  id: string;
  [key: string]: unknown;
}

/**
 * Global HSCore utility namespace
 */
declare global {
  namespace HSCore {
    namespace Util {
      namespace Layer {
        /**
         * Marks layer information as dirty/invalidated, triggering necessary updates
         * @param layer - The layer entity to mark as dirty
         */
        function dirtyLayerInfo(layer: LayerEntity): void;
      }
    }
  }
}

/**
 * Transaction state handler specifically for layer entities.
 * 
 * Extends EntityTxnState to provide specialized post-restoration logic
 * that invalidates layer information cache after transaction restore operations.
 */
export class LayerTxnState extends EntityTxnState {
  /**
   * Creates a new layer transaction state instance
   * 
   * @param entity - The layer entity associated with this transaction state
   * @param transactionData - Additional transaction-specific data
   */
  constructor(entity: LayerEntity, transactionData: unknown);

  /**
   * Post-restoration hook called after a transaction is restored.
   * 
   * This method extends the base restoration logic to ensure layer information
   * is properly invalidated, triggering UI updates or recalculations as needed.
   * 
   * @param context - The transaction context containing restoration information
   * @param additionalData - Additional data passed during restoration
   */
  postRestore(context: TransactionContext, additionalData: unknown): void;

  /**
   * Retrieves the entity from the given context
   * 
   * @param context - The transaction context
   * @returns The layer entity if found, undefined otherwise
   * @internal
   */
  protected _getEntityFromContext(context: TransactionContext): LayerEntity | undefined;
}