/**
 * Transaction request for managing light band operations with undo/redo support.
 * Extends the base HSCore.Transaction.Request to provide entity state management.
 */

/**
 * Entity interface representing objects with geometry that can be marked as dirty
 */
interface IEntity {
  dirtyGeometry(): void;
  getHost?(): IEntity[];
}

/**
 * Content interface providing access to light band entities
 */
interface IContent extends IEntity {
  /**
   * Retrieves a light band entity by its unique identifier
   * @param lightBandId - The unique identifier of the light band
   * @returns The light band entity if found, undefined otherwise
   */
  getLightBandEntityById(lightBandId: string): IEntity | undefined;
  
  /**
   * Gets the host entities associated with this content
   * @returns Array of host entities
   */
  getHost(): IEntity[];
}

/**
 * Data structure for storing entity state snapshots
 */
interface IEntityData {
  [key: string]: unknown;
}

/**
 * Base transaction request class from HSCore framework
 */
declare class TransactionRequest {
  onCommit(): void;
  onUndo(): void;
  onRedo(): void;
}

/**
 * Transaction utilities for entity state management
 */
declare namespace HSCore {
  namespace Util {
    namespace Transaction {
      /**
       * Saves the current state of entities to a data object
       * @param entities - Array of entities to save
       * @param data - Target data object to store entity state
       */
      function saveEntityToData(entities: IEntity[], data: IEntityData): void;
      
      /**
       * Restores entity state from a previously saved data object
       * @param entities - Array of entities to restore
       * @param data - Source data object containing saved entity state
       */
      function restoreEntityFromData(entities: IEntity[], data: IEntityData): void;
    }
  }
  
  namespace Transaction {
    class Request extends TransactionRequest {}
  }
}

/**
 * Light band transaction request for managing content modifications with full undo/redo support.
 * Captures entity state before and after changes to enable transaction rollback and replay.
 */
export default class LightBandTransactionRequest extends HSCore.Transaction.Request {
  /** The primary content entity being modified */
  private readonly _content: IContent;
  
  /** Unique identifier of the light band being manipulated */
  private readonly _lightBandId: string;
  
  /** Snapshot of entity state before the transaction */
  private readonly _beforeData: IEntityData;
  
  /** Snapshot of entity state after the transaction */
  private readonly _afterData: IEntityData;
  
  /** All entities involved in this transaction (content + hosts) */
  private readonly _transEntities: IEntity[];

  /**
   * Creates a new light band transaction request
   * @param content - The content entity containing the light band
   * @param lightBandId - Unique identifier of the light band to modify
   */
  constructor(content: IContent, lightBandId: string);

  /**
   * Commits the transaction by applying changes and saving the after state
   */
  onCommit(): void;

  /**
   * Undoes the transaction by restoring entities to their before state
   * and marking geometry as dirty if applicable
   */
  onUndo(): void;

  /**
   * Redoes the transaction by restoring entities to their after state
   * and marking geometry as dirty if applicable
   */
  onRedo(): void;

  /**
   * Applies the actual changes to the entities.
   * This method should be overridden by subclasses to implement specific logic.
   * @protected
   */
  protected _apply(): void;
}