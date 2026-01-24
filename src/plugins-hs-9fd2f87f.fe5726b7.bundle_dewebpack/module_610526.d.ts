/**
 * Entity elevation transaction module
 * Handles undo/redo operations for entity elevation parameter changes
 */

declare module 'module_610526' {
  import { HSCore } from '@hscore/types';

  /**
   * Interface representing entity parameters with spatial coordinates and elevation
   */
  interface EntityParameters {
    /** X-axis coordinate position */
    x: number;
    /** Y-axis coordinate position */
    y: number;
    /** Elevation/height value */
    elevation: number;
    /** Additional dynamic parameters */
    [key: string]: unknown;
  }

  /**
   * Entity interface with mutable parameters
   */
  interface Entity {
    /** Entity configuration parameters */
    parameters: EntityParameters;
  }

  /**
   * Template entity containing reference parameters for batch updates
   */
  interface TemplateEntity extends Entity {
    /** Reference parameters to apply to target entities */
    parameters: EntityParameters;
  }

  /**
   * State request for managing entity elevation transactions
   * Extends the base StateRequest class to provide undo/redo functionality
   * for elevation parameter changes across multiple entities
   */
  class ElevationStateRequest extends HSCore.Transaction.Common.StateRequest {
    /**
     * Template entity containing the target elevation value
     */
    protected templateEntity: TemplateEntity;

    /**
     * Collection of entities to apply elevation changes to
     */
    protected entities: Entity[];

    /**
     * Cached elevation value for transaction operations
     * @private
     */
    private _elevation: number;

    /**
     * Creates a new elevation state request transaction
     * @param templateEntity - Entity containing the target parameters (elevation, x, y)
     * @param entities - Array of entities to be modified
     */
    constructor(templateEntity: TemplateEntity, entities: Entity[]);

    /**
     * Commits the transaction, storing the elevation value and applying changes
     * Called when the transaction is first executed
     */
    onCommit(): void;

    /**
     * Determines if this transaction can handle field-level changes
     * @returns Always returns true for this transaction type
     */
    canTransactField(): boolean;

    /**
     * Reverts entities to their previous elevation state
     * Applies the cached elevation value and notifies parent of undo completion
     * @param args - Optional arguments passed to parent undo handler
     */
    onUndo(...args: unknown[]): void;

    /**
     * Reapplies the elevation changes to entities
     * Applies the cached elevation value and notifies parent of redo completion
     * @param args - Optional arguments passed to parent redo handler
     */
    onRedo(...args: unknown[]): void;

    /**
     * Internal method that applies elevation and position parameters to all entities
     * Performs a deep clone of existing parameters before merging template values
     * @private
     */
    private _apply(): void;
  }

  /**
   * Factory function that returns the ElevationStateRequest class
   * @param baseClass - The base StateRequest class to extend
   * @returns The configured ElevationStateRequest class
   */
  export default function createElevationStateRequest(
    baseClass: typeof HSCore.Transaction.Common.StateRequest
  ): typeof ElevationStateRequest;
}

/**
 * Global HSCore namespace extensions
 */
declare namespace HSCore {
  namespace Transaction {
    namespace Common {
      /**
       * Base class for state-based transaction requests
       * Provides foundation for undo/redo operations
       */
      abstract class StateRequest {
        /**
         * Called when transaction is committed
         */
        abstract onCommit(): void;

        /**
         * Called when transaction is undone
         */
        abstract onUndo(...args: unknown[]): void;

        /**
         * Called when transaction is redone
         */
        abstract onRedo(...args: unknown[]): void;

        /**
         * Determines if this transaction can handle field-level changes
         */
        abstract canTransactField(): boolean;
      }
    }
  }
}