/**
 * DeleteSlabRequest module
 * Handles the deletion of slab entities with transaction support (undo/redo)
 */

/**
 * Represents a slab entity with parent layers
 */
interface Slab {
  /** Parent layers that contain this slab */
  parents: Record<string, Layer>;
}

/**
 * Represents a layer that can contain slabs
 */
interface Layer {
  /**
   * Removes a child slab from this layer
   * @param slab - The slab to remove
   */
  removeChild(slab: Slab): void;
}

/**
 * Entity data snapshot for transaction history
 */
type EntityData = Record<string, unknown>;

/**
 * Transaction utilities for saving and restoring entity states
 */
declare namespace HSCore.Util.Transaction {
  /**
   * Saves the current state of entities to a data object
   * @param entities - The entities to save
   * @param data - The data object to save to
   */
  function saveEntityToData(entities: Layer[], data: EntityData): void;

  /**
   * Restores entities from a previously saved data object
   * @param entities - The entities to restore
   * @param data - The data object to restore from
   */
  function restoreEntityFromData(entities: Layer[], data: EntityData): void;
}

/**
 * Base class for transaction requests
 */
declare namespace HSCore.Transaction {
  /**
   * Abstract base class for transactional operations
   */
  abstract class Request {
    /** Executes the request */
    abstract doRequest(): void;
    /** Called when the transaction is committed */
    abstract onCommit(): void;
    /** Called when the transaction is undone */
    abstract onUndo(): void;
    /** Called when the transaction is redone */
    abstract onRedo(): void;
  }
}

/**
 * Request for deleting a slab entity with full transaction support
 * Supports undo/redo operations by maintaining before/after snapshots
 */
export declare class DeleteSlabRequest extends HSCore.Transaction.Request {
  /** The slab to be deleted */
  private readonly _slab: Slab;

  /** Parent layers containing the slab */
  private readonly _layers: Layer[];

  /** Entity state before deletion */
  private readonly _beforeData: EntityData;

  /** Entity state after deletion */
  private readonly _afterData: EntityData;

  /**
   * Creates a new delete slab request
   * @param slab - The slab entity to delete
   */
  constructor(slab: Slab);

  /**
   * Executes the deletion by removing the slab from all parent layers
   */
  doRequest(): void;

  /**
   * Commits the deletion transaction
   * Saves before/after states and performs the deletion
   */
  onCommit(): void;

  /**
   * Undoes the deletion by restoring the before state
   */
  onUndo(): void;

  /**
   * Redoes the deletion by restoring the after state
   */
  onRedo(): void;
}