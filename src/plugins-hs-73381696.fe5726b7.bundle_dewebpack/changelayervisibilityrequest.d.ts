/**
 * Layer visibility change request for managing layer display states
 * Handles both single and multi-layer visibility modes
 */

/**
 * Represents a layer entity in the scene
 */
interface Layer {
  /** Parent document containing this layer */
  doc: Document;
  
  /**
   * Sets entity flag to OFF state
   * @param flag - The entity flag to modify
   * @param notify - Whether to notify observers of the change
   */
  setFlagOff(flag: EntityFlagEnum, notify: boolean): void;
  
  /**
   * Sets entity flag to ON state
   * @param flag - The entity flag to modify
   * @param notify - Whether to notify observers of the change
   */
  setFlagOn(flag: EntityFlagEnum, notify: boolean): void;
  
  /**
   * Checks if the specified flag is in OFF state
   * @param flag - The entity flag to check
   * @returns True if flag is OFF, false otherwise
   */
  isFlagOff(flag: EntityFlagEnum): boolean;
}

/**
 * Scene containing layers and layer management
 */
interface Scene {
  /** Collection of all layers in the scene, indexed by layer ID */
  layers: Record<string, Layer>;
  
  /** Currently active/selected layer */
  activeLayer: Layer;
  
  /**
   * Iterates over all layers in the scene
   * @param callback - Function to execute for each layer
   */
  forEachLayer(callback: (layer: Layer) => void): void;
}

/**
 * Document containing a scene
 */
interface Document {
  /** The scene associated with this document */
  scene: Scene;
}

/**
 * Document manager for accessing documents
 */
interface DocumentManager {
  /** The currently active document */
  activeDocument: Document;
}

/**
 * Entity flag enumeration for controlling layer states
 */
declare enum EntityFlagEnum {
  /** Flag indicating the entity is hidden from view */
  hidden = 'hidden'
}

/**
 * Base state request class from HSCore transaction system
 */
declare class StateRequest {
  constructor();
}

/**
 * Global HSCore namespace
 */
declare namespace HSCore {
  namespace Doc {
    /**
     * Gets the global document manager instance
     * @returns The document manager
     */
    function getDocManager(): DocumentManager;
  }
  
  namespace Model {
    export { EntityFlagEnum };
  }
  
  namespace Transaction {
    namespace Common {
      export { StateRequest };
    }
  }
}

/**
 * Request to change layer visibility in the scene
 * Supports both single-layer and multi-layer visibility modes
 * 
 * @example
 * // Hide a specific layer
 * const request = new ChangeLayerVisibilityRequest(layer, false);
 * 
 * @example
 * // Show only the active layer (single layer mode)
 * const request = new ChangeLayerVisibilityRequest(null, true, true);
 */
export declare class ChangeLayerVisibilityRequest extends StateRequest {
  /** The target layer to modify (null for scene-wide operations) */
  private _layer: Layer | null;
  
  /** Desired visibility state */
  visible: boolean;
  
  /** Whether to show only one layer and hide all others */
  singleLayerMode: boolean;
  
  /** List of layers that were visible before the operation */
  visibleLayers: Layer[];
  
  /**
   * Creates a new layer visibility change request
   * 
   * @param layer - The layer to modify, or null for scene-wide operations
   * @param visible - The desired visibility state
   * @param singleLayerMode - If true, hides all layers except the active one (default: false)
   */
  constructor(layer: Layer | null, visible: boolean, singleLayerMode?: boolean);
  
  /**
   * Commits the visibility changes to the scene
   * Records currently visible layers and applies the new visibility state
   */
  onCommit(): void;
  
  /**
   * Indicates whether this request can participate in field transactions
   * @returns Always true for visibility requests
   */
  canTransactField(): boolean;
}