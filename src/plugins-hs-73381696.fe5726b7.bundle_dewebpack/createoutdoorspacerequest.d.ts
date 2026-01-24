/**
 * Request for creating outdoor space in the application.
 * Handles the creation and management of outdoor space edges with transaction support.
 */
export declare class CreateOutdoorSpaceRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * Temporary edges associated with the outdoor space being created.
   */
  protected tempEdges: unknown;

  /**
   * Creates a new outdoor space request.
   * @param edges - The temporary edges to be used for creating the outdoor space
   */
  constructor(edges: unknown);

  /**
   * Called when the transaction is committed.
   * Updates the outdoor layer slabs based on the temporary edges.
   */
  onCommit(): void;

  /**
   * Called when the transaction is undone.
   * Reverts the outdoor space creation.
   */
  onUndo(): void;

  /**
   * Called when the transaction is redone.
   * Reapplies the outdoor space creation.
   */
  onRedo(): void;

  /**
   * Determines if this request can participate in field transactions.
   * @returns Always returns true, indicating this request supports field transactions
   */
  canTransactField(): boolean;
}

/**
 * Global namespace for HomeStyler core functionality.
 */
declare namespace HSCore {
  namespace Transaction {
    namespace Common {
      /**
       * Base class for state-based transaction requests.
       */
      class StateRequest {
        onCommit(args: unknown[]): void;
        onUndo(args: unknown[]): void;
        onRedo(args: unknown[]): void;
      }
    }
  }

  namespace Util {
    namespace Slab {
      /**
       * Updates the outdoor layer slabs based on provided edges.
       * @param edges - The edges to use for updating outdoor slabs
       */
      function updateOutdoorLayerSlabs(edges: unknown): void;
    }
  }
}