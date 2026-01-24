/**
 * Material change transaction request module
 * Handles material updates with undo/redo support
 */

/**
 * Represents material metadata that can be converted to NgMaterial
 */
interface MaterialMeta {
  /**
   * Checks if this material is an instance of a specific class
   * @param modelClass The model class to check against
   */
  instanceOf?(modelClass: unknown): boolean;
}

/**
 * Represents a material in the scene
 */
interface NgMaterial {
  // Material properties would be defined here
}

/**
 * Content interface that manages materials for components
 */
interface Content {
  /**
   * Gets the material assigned to a component
   * @param component The component to query
   * @returns The material assigned to the component
   */
  getMaterial(component: unknown): NgMaterial | null;

  /**
   * Sets the material for a component
   * @param component The component to update
   * @param material The material to assign
   */
  setMaterial(component: unknown, material: NgMaterial | null): void;
}

/**
 * Base class for transaction requests in HSCore
 */
declare class Request {
  constructor();
}

/**
 * Transaction request for changing material on a component
 * 
 * This class implements the Command pattern to support undo/redo
 * functionality for material changes in the scene.
 * 
 * @extends HSCore.Transaction.Request
 */
declare class MaterialChangeRequest extends Request {
  /**
   * The content/scene that owns the component
   */
  private readonly _content: Content;

  /**
   * The component whose material is being changed
   */
  private readonly _component: unknown;

  /**
   * The new material metadata to apply
   */
  private readonly _materialMeta: MaterialMeta;

  /**
   * The saved material for undo/redo operations
   */
  private _savedMaterial: NgMaterial | null;

  /**
   * Creates a new material change request
   * 
   * @param content The content/scene containing the component
   * @param component The component to modify
   * @param materialMeta The material metadata to apply (will be converted to NgMaterial if needed)
   */
  constructor(content: Content, component: unknown, materialMeta: MaterialMeta);

  /**
   * Called when the transaction is committed
   * 
   * Converts the material metadata to an NgMaterial instance if needed,
   * then applies the material change to the component.
   */
  onCommit(): void;

  /**
   * Called when the transaction is undone
   * 
   * Restores the previously saved material state.
   */
  onUndo(): void;

  /**
   * Called when the transaction is redone
   * 
   * Reapplies the saved material state.
   */
  onRedo(): void;

  /**
   * Internal method to apply a material change
   * 
   * Saves the current material state before applying the new material.
   * 
   * @param material The material to apply
   */
  private _changeMaterial(material: NgMaterial | null): void;
}

/**
 * Global HSCore namespace
 */
declare namespace HSCore {
  namespace Material {
    /**
     * Factory class for creating materials
     */
    class Material {
      /**
       * Creates a material from metadata
       * @param meta The material metadata
       * @returns A new NgMaterial instance
       */
      static create(meta: MaterialMeta): NgMaterial;
    }
  }

  namespace Transaction {
    export { Request };
  }

  namespace ModelClass {
    /**
     * NgMaterial model class identifier
     */
    const NgMaterial: unknown;
  }
}

/**
 * Global HSConstants namespace
 */
declare namespace HSConstants {
  namespace ModelClass {
    /**
     * NgMaterial model class constant
     */
    const NgMaterial: unknown;
  }
}

export default MaterialChangeRequest;