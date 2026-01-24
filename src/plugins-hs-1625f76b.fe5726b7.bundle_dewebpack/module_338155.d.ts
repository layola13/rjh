/**
 * Corner window creation transaction for handling corner window operations
 * in the HSApp floorplan editor.
 */

/**
 * Metadata interface for corner window configuration
 */
interface CornerWindowMeta {
  /** Creates a deep copy of the metadata */
  clone(): CornerWindowMeta;
  /** User-defined free-form data including models */
  userFreeData: {
    /** Child models associated with the corner window */
    models?: unknown[];
    [key: string]: unknown;
  };
}

/**
 * Specification for corner window creation and management
 */
interface CornerWindowSpec {
  /** The corner window model instance */
  cornerWindow: HSCore.Model.CornerWindow;
  /** Host element for the corner window */
  host: unknown;
  /** Parent layer containing the corner window */
  parent: HSCore.Scene.Layer;
  /** Associated child models */
  models: unknown[];
}

/**
 * Corner window model with creation and management capabilities
 */
interface CornerWindow {
  /**
   * Creates child models from the provided model data
   * @param models - Array of model definitions to instantiate
   * @returns Array of created child model instances
   */
  createChildModels(models: unknown[]): unknown[];
}

/**
 * Transaction class for adding corner windows to the floorplan scene.
 * Extends the composite request pattern to support undo/redo operations.
 */
declare class AddCornerWindowTransaction extends HSCore.Transaction.Common.CompositeRequest {
  /** Metadata containing corner window configuration */
  private readonly _meta: CornerWindowMeta;
  
  /** Host element reference */
  private readonly _host: unknown;
  
  /** Cached specification used for undo/redo operations */
  private _spec: CornerWindowSpec;

  /**
   * Creates a new corner window transaction
   * @param meta - Corner window metadata and configuration
   * @param param1 - Unused parameter (legacy)
   * @param param2 - Unused parameter (legacy)
   * @param param3 - Unused parameter (legacy)
   * @param host - Host element for the corner window
   */
  constructor(
    meta: CornerWindowMeta,
    param1: unknown,
    param2: unknown,
    param3: unknown,
    host: unknown
  );

  /**
   * Executes the transaction by creating and adding a corner window to the scene.
   * Clones metadata, creates the corner window model, adds it to the active layer,
   * and instantiates all child models.
   * @returns The created corner window model instance
   */
  onCommit(): CornerWindow;

  /**
   * Reverts the transaction by removing the corner window from the scene.
   * Calls parent class undo with empty array parameter.
   */
  onUndo(): void;

  /**
   * Re-applies the transaction by re-adding the corner window to the scene.
   * Calls parent class redo with empty array parameter.
   */
  onRedo(): void;
}

export default AddCornerWindowTransaction;