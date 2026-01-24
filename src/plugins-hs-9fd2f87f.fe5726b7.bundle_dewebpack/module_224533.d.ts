/**
 * Light slot removal transaction handler for customized models.
 * Manages undo/redo operations when removing light slots from a model.
 */
declare class RemoveLightSlotTransaction extends HSCore.Transaction.Request {
  /**
   * The light slot being removed
   */
  private readonly _lightSlot: HSCore.Model.LightSlot;

  /**
   * Entities that were appended to this light slot
   */
  private readonly _appendedEntities: HSCore.Model.Entity[];

  /**
   * Parent customized model containing the light slot
   */
  private readonly _parentCustomizedModel: HSCore.Model.CustomizedModel;

  /**
   * Serialized WebCAD document state before removal
   */
  private _webcadDocBefore: string;

  /**
   * Serialized WebCAD document state after removal
   */
  private _webcadDocAfter: string;

  /**
   * Material state before removal (for affected faces)
   */
  private _materialBefore: unknown;

  /**
   * Material state after removal (for affected faces)
   */
  private _materialAfter: unknown;

  /**
   * Specification data for recreating the light slot
   */
  private _spec: unknown;

  /**
   * Utility for managing material brush operations
   */
  private readonly MaterialBrushUtil: typeof HSApp.PaintPluginHelper.Util.MaterialBrushUtil;

  /**
   * Creates a new light slot removal transaction
   * @param lightSlot - The light slot to be removed
   */
  constructor(lightSlot: HSCore.Model.LightSlot);

  /**
   * Commits the light slot removal operation.
   * Captures material and document state, removes the light slot, and updates face materials.
   */
  onCommit(): void;

  /**
   * Reverts the light slot removal.
   * Restores the light slot, appended entities, document state, and face materials.
   */
  onUndo(): void;

  /**
   * Re-applies the light slot removal.
   * Removes the light slot again and restores the post-removal state.
   */
  onRedo(): void;
}

export default RemoveLightSlotTransaction;