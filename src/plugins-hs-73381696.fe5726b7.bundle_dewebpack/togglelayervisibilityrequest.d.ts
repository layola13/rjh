/**
 * Toggle layer visibility request class
 * Handles showing/hiding layers in the scene with undo/redo support
 */

/**
 * Request to toggle the visibility state of a layer
 * @extends HSCore.Transaction.Common.StateRequest
 */
export declare class ToggleLayerVisibilityRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * The layer whose visibility is being toggled
   * @private
   */
  private _layer: HSCore.Model.Layer;

  /**
   * Target visibility state for the layer
   */
  visible: boolean;

  /**
   * Creates a new toggle layer visibility request
   * @param layer - The layer to toggle visibility for
   * @param visible - Whether the layer should be visible (true) or hidden (false)
   */
  constructor(layer: HSCore.Model.Layer, visible: boolean);

  /**
   * Commits the visibility change
   * Sets or clears the hidden flag on the layer and marks affected entities as dirty
   */
  onCommit(): void;

  /**
   * Undoes the visibility change
   * Reverts the layer to its previous visibility state
   */
  onUndo(): void;

  /**
   * Redoes the visibility change
   * Reapplies the visibility change after an undo
   */
  onRedo(): void;

  /**
   * Marks all entities affected by the visibility change as dirty
   * Marks all slabs in the layer and walls in the layer below as dirty for re-rendering
   * @private
   */
  private _dirtyEntities(): void;

  /**
   * Indicates whether this request can be transacted in a field
   * @returns Always returns true
   */
  canTransactField(): boolean;

  /**
   * Gets a human-readable description of this request
   * @returns Description text in Chinese: "多层切换到楼层-显示楼层操作"
   */
  getDescription(): string;

  /**
   * Gets the log category for this operation
   * @returns The wall operation category from HSFPConstants
   */
  getCategory(): HSFPConstants.LogGroupTypes;
}