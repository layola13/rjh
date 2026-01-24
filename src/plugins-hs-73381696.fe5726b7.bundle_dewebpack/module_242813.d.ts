/**
 * Material update transaction request for handling undo/redo operations on material data
 * @module MaterialUpdateTransaction
 */

/**
 * Map structure for storing material data
 * Key is material identifier, value is the material configuration
 */
export type MaterialMap = Map<string, unknown> | Record<string, unknown>;

/**
 * Interface for content object that manages material data
 */
export interface IMaterialContent {
  /**
   * Sets the material data for the content
   * @param materialData - The material map to apply
   */
  setMaterialData(materialData: MaterialMap): void;
}

/**
 * Transaction request for material updates with undo/redo support
 * Extends the base HSCore.Transaction.Request class
 */
export default class MaterialUpdateTransactionRequest extends HSCore.Transaction.Request {
  /**
   * The content object being modified
   * @private
   */
  private readonly _content: IMaterialContent;

  /**
   * Original state of materials before the update
   * @private
   */
  private readonly _originalMaterialMap: MaterialMap;

  /**
   * Updated state of materials after the update
   * @private
   */
  private readonly _updatedMaterialMap: MaterialMap;

  /**
   * Creates a new material update transaction request
   * @param content - The content object to update
   * @param originalMaterialMap - The original material state
   * @param updatedMaterialMap - The new material state
   */
  constructor(
    content: IMaterialContent,
    originalMaterialMap: MaterialMap,
    updatedMaterialMap: MaterialMap
  );

  /**
   * Updates the materials on the content object
   * @param materialData - The material map to apply
   * @private
   */
  private _updateMaterials(materialData: MaterialMap): void;

  /**
   * Commits the transaction, applying the updated materials
   */
  onCommit(): void;

  /**
   * Undoes the transaction, restoring the original materials
   */
  onUndo(): void;

  /**
   * Redoes the transaction, reapplying the updated materials
   */
  onRedo(): void;
}