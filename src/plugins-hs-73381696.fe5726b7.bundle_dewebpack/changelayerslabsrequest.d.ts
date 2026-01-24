/**
 * Request class for handling layer slab changes with undo/redo support
 * @module ChangeLayerSlabsRequest
 */

import { Transaction } from './Transaction';
import { Layer } from './Layer';
import { FloorSlab } from './FloorSlab';

/**
 * Serialized data structure for storing slab states
 */
interface SlabData {
  /** Serialized entity data from transaction system */
  [entityId: string]: unknown;
}

/**
 * Transaction request for changing layer slabs properties
 * Supports undo/redo operations by storing before/after states
 */
export declare class ChangeLayerSlabsRequest extends Transaction.Request {
  /**
   * The layer containing the slabs being modified
   */
  readonly layer: Layer;

  /**
   * Serialized slab data before changes
   * @private
   */
  private readonly _beforeData: SlabData;

  /**
   * Serialized slab data after changes
   * @private
   */
  private readonly _afterData: SlabData;

  /**
   * Creates a new change layer slabs request
   * @param layer - The layer whose slabs are being modified
   * @param beforeData - Serialized state before the change
   * @param afterData - Serialized state after the change
   */
  constructor(layer: Layer, beforeData: SlabData, afterData: SlabData);

  /**
   * Marks layer information as dirty and refreshes related rendering
   * Updates both the target layer and its underlying layer if present
   * @private
   */
  private dirtyLayerInfo(): void;

  /**
   * Applies the given data state to the layer's slabs
   * @param data - The serialized slab data to restore
   * @private
   */
  private doRequest(data: SlabData): void;

  /**
   * Commits the transaction, applying the after-state
   * Called when the transaction is first executed
   */
  onCommit(): void;

  /**
   * Reverts the transaction, restoring the before-state
   * Called when undoing the transaction
   */
  onUndo(): void;

  /**
   * Reapplies the transaction, restoring the after-state
   * Called when redoing the transaction
   */
  onRedo(): void;

  /**
   * Serializes the current state of all slabs in a layer
   * @param layer - The layer whose slabs to serialize
   * @param data - The output data object to populate
   * @static
   */
  static saveToData(layer: Layer, data: SlabData): void;

  /**
   * Restores slab states from serialized data
   * @param layer - The layer whose slabs to restore
   * @param data - The serialized data to restore from
   * @static
   */
  static restoreFromData(layer: Layer, data: SlabData): void;
}