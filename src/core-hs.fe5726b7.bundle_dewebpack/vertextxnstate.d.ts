import { EntityTxnState } from './EntityTxnState';
import { EntityTransactionType } from './EntityTransactionType';
import type { TransactionContext } from './TransactionContext';
import type { Vertex } from './Vertex';

/**
 * Transaction state handler for Vertex entities.
 * Manages the state of vertex modifications within a transaction,
 * including restoration and parent geometry invalidation.
 */
export declare class VertexTxnState extends EntityTxnState {
  /**
   * Creates a new vertex transaction state.
   * 
   * @param entity - The vertex entity this transaction state tracks
   * @param transactionType - Type of transaction (defaults to Modification)
   */
  constructor(
    entity: Vertex,
    transactionType?: EntityTransactionType
  );

  /**
   * Called after restoring a vertex from transaction state.
   * Invalidates geometry of all parent entities to ensure proper rendering updates.
   * 
   * @param context - The transaction context containing entity references
   * @param data - Additional restoration data
   */
  postRestore(
    context: TransactionContext,
    data: unknown
  ): void;

  /**
   * Retrieves the vertex entity from the transaction context.
   * 
   * @param context - The transaction context
   * @returns The vertex entity or undefined if not found
   * @protected
   */
  protected _getEntityFromContext(context: TransactionContext): Vertex | undefined;
}