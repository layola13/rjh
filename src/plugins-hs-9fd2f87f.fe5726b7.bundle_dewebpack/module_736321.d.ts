/**
 * Module: DoorStoneMaterialTransaction
 * 
 * Transaction for applying door stone materials to entity bottom faces.
 * Manages material state changes with support for undo/redo operations.
 */

import type { HSCore } from './core';

/**
 * Represents an entity that can have door stone materials applied
 */
interface DoorStoneEntity {
  /**
   * Flag indicating whether door stone material rendering is enabled
   */
  doorStoneMaterialEnabled: boolean;
  
  /**
   * Sets the material for the bottom face of the entity
   * @param material - The material to apply (must be a clone)
   */
  setBottomFaceMaterial(material: Material): void;
  
  /**
   * Retrieves the bottom face of the entity
   * @returns The bottom face object or null if not available
   */
  getBottomFace(): Face | null;
}

/**
 * Represents a 3D material that can be cloned and applied to faces
 */
interface Material {
  /**
   * Creates a deep copy of this material
   * @returns A new Material instance with identical properties
   */
  clone(): Material;
}

/**
 * Represents a face (surface) of a 3D entity
 */
interface Face {
  /**
   * Marks the face's material as requiring re-rendering
   * Forces material update in the next render cycle
   */
  dirtyMaterial(): void;
}

/**
 * Transaction class for applying door stone materials to multiple entities.
 * 
 * This transaction:
 * - Enables door stone material rendering on all target entities
 * - Applies a cloned material to each entity's bottom face
 * - Updates mix-paint properties on affected faces
 * - Supports full undo/redo functionality
 * 
 * @extends HSCore.Transaction.Common.StateRequest
 */
export default class DoorStoneMaterialTransaction extends HSCore.Transaction.Common.StateRequest {
  /**
   * Collection of entities to which the material will be applied
   */
  readonly entities: DoorStoneEntity[];
  
  /**
   * The source material to be cloned and applied to entities
   */
  readonly material: Material;
  
  /**
   * Creates a new door stone material transaction
   * 
   * @param entities - Array of entities to modify
   * @param material - Base material to apply (will be cloned for each entity)
   */
  constructor(entities: DoorStoneEntity[], material: Material);
  
  /**
   * Executes the transaction, applying materials to all entities.
   * Called when the transaction is first committed.
   * 
   * - Enables doorStoneMaterialEnabled flag
   * - Applies cloned material to bottom face
   * - Updates face mix-paint properties
   * - Marks materials as dirty for re-rendering
   * 
   * @param args - Transaction commit arguments (empty array)
   */
  onCommit(args: []): void;
  
  /**
   * Determines if this transaction can modify field state
   * 
   * @returns Always true - this transaction supports field modifications
   */
  canTransactField(): boolean;
  
  /**
   * Reverts the transaction effects.
   * Called when the user undoes this transaction.
   * 
   * Triggers material refresh on all affected faces.
   * 
   * @param args - Transaction undo arguments (empty array)
   */
  onUndo(args: []): void;
  
  /**
   * Reapplies the transaction effects.
   * Called when the user redoes this transaction after undoing.
   * 
   * Triggers material refresh on all affected faces.
   * 
   * @param args - Transaction redo arguments (empty array)
   */
  onRedo(args: []): void;
  
  /**
   * Internal helper that forces material updates on all entity faces.
   * 
   * Iterates through entities, updates mix-paint properties,
   * and marks materials as requiring re-rendering.
   * 
   * @internal
   */
  private dirtyMaterial(): void;
}

/**
 * Namespace for HSCore utilities used by this transaction
 */
declare namespace HSCore {
  namespace Paint {
    namespace PaintsUtil {
      /**
       * Updates the mix-paint properties for a given face
       * @param face - The face to update, or null
       */
      function updateFaceMixpaint(face: Face | null): void;
    }
  }
  
  namespace Transaction {
    namespace Common {
      /**
       * Base class for state-based transaction requests
       */
      abstract class StateRequest {
        /**
         * Called when transaction is committed
         */
        protected onCommit?(args: unknown[]): void;
        
        /**
         * Called when transaction is undone
         */
        protected onUndo?(args: unknown[]): void;
        
        /**
         * Called when transaction is redone
         */
        protected onRedo?(args: unknown[]): void;
        
        /**
         * Determines if transaction can modify fields
         */
        canTransactField?(): boolean;
      }
    }
  }
}