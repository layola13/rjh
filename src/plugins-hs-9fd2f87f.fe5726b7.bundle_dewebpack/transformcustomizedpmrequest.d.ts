/**
 * Transform customized parametric modeling request handler
 * Manages transformation operations on customized PM instances with undo/redo support
 */

import { HSCore } from 'HSCore';

/**
 * Represents a transformed instance with its new matrix
 */
interface TransformedInstance {
  /** Instance identifier */
  id: string;
  /** Transformation matrix */
  matrix: HSMath.Matrix4;
}

/**
 * Request handler for transforming customized parametric modeling entities
 * Extends the base state request to provide transaction support
 */
export declare class TransformCustomizedPMRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * The root entity being transformed
   */
  private _rootEntity: HSCore.Model.CustomizedPMInstanceModel;

  /**
   * The transformation matrix to apply
   */
  private _matrix4: HSMath.Matrix4;

  /**
   * Document state before transformation (for undo)
   */
  private _beforeDoc: unknown;

  /**
   * Document state after transformation (for redo)
   */
  private _afterDoc: unknown;

  /**
   * Creates a new transform customized PM request
   * @param rootEntity - The root entity to transform
   * @param matrix4 - The transformation matrix to apply
   */
  constructor(rootEntity: HSCore.Model.CustomizedPMInstanceModel, matrix4: HSMath.Matrix4);

  /**
   * Executes the transformation operation
   * - Applies the transformation matrix to all child instances
   * - Updates instance metadata from the modeling document
   * - Saves the document state for undo/redo
   */
  onCommit(): void;

  /**
   * Reverts the transformation by restoring the previous document state
   * @returns Promise that resolves when undo is complete
   */
  onUndo(): Promise<void>;

  /**
   * Reapplies the transformation by restoring the after-transformation document state
   * @returns Promise that resolves when redo is complete
   */
  onRedo(): Promise<void>;
}