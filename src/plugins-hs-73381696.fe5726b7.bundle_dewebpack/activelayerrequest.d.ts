/**
 * Active layer state management request.
 * Handles setting a layer as active in the document scene.
 */
export declare class ActiveLayerRequest extends HSCore.Transaction.Common.StateRequest {
  /**
   * The layer to be set as active.
   * @private
   */
  private _layer: Layer | null;

  /**
   * Creates a new ActiveLayerRequest instance.
   * @param layer - The layer to set as active in the document scene
   */
  constructor(layer: Layer);

  /**
   * Commits the transaction by setting the layer as active in its document scene.
   * Called when the request is applied to update the application state.
   */
  onCommit(): void;

  /**
   * Determines whether this request can participate in field-level transactions.
   * @returns Always returns true, indicating this request supports field transactions
   */
  canTransactField(): boolean;
}

/**
 * Represents a layer in the document.
 * Contains reference to parent document and scene hierarchy.
 */
interface Layer {
  /**
   * The document that contains this layer.
   */
  doc?: Document | null;
}

/**
 * Represents a document containing layers and scene hierarchy.
 */
interface Document {
  /**
   * The scene graph associated with this document.
   */
  scene?: Scene | null;
}

/**
 * Represents the scene graph that manages layer hierarchy.
 */
interface Scene {
  /**
   * The currently active layer in the scene.
   * Setting this property changes which layer is active for editing operations.
   */
  activeLayer: Layer | null;
}