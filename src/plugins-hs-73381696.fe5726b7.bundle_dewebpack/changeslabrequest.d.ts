import { HSCore } from './HSCore';
import { HSApp } from './HSApp';

/**
 * Represents a slab object with faces that can be validated
 */
interface Slab {
  /**
   * Gets the base layer associated with this slab
   */
  getBaseLayer(): Layer;
}

/**
 * Represents a layer in the structure
 */
interface Layer {
  // Layer properties would be defined based on the actual implementation
}

/**
 * Request class for handling slab changes in the layer structure
 * Extends the base LayerStructureEditRequest to provide slab-specific functionality
 */
declare class ChangeSlabRequest extends HSApp.Request.LayerStructureEditRequest {
  /**
   * The slab instance being modified by this request
   */
  readonly slab: Slab;

  /**
   * Creates a new ChangeSlabRequest instance
   * @param slab - The slab object to be changed
   */
  constructor(slab: Slab);

  /**
   * Called when the request is committed
   * Executes the parent class onCommit logic and returns success status
   * @returns Always returns true to indicate successful commit
   */
  onCommit(): boolean;

  /**
   * Executes the request to change the slab
   * Validates slab faces before performing the request operation
   */
  doRequest(): void;
}

export { ChangeSlabRequest };