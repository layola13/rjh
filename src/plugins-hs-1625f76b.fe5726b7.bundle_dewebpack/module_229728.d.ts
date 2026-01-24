/**
 * Material transaction state request module
 * Handles material state changes and rollback operations for entities
 */

import { HSCore } from './core-types';

/**
 * Map structure for storing material references by key
 */
export type MaterialMap = Map<string, unknown>;

/**
 * Array of material identifier keys
 */
export type MaterialKeys = string[];

/**
 * Transaction class for managing material state changes on entities.
 * Extends the base StateRequest transaction class to provide material-specific
 * rollback and commit functionality.
 */
export default class MaterialStateTransaction extends HSCore.Transaction.Common.StateRequest {
  /**
   * The entity whose materials are being transacted
   */
  entity: unknown;

  /**
   * Backup of the original material mappings before transaction
   */
  oldMaterialMap: MaterialMap;

  /**
   * Array of material keys that are affected by this transaction
   */
  materialKeys: MaterialKeys;

  /**
   * Creates a new material state transaction
   * 
   * @param entity - The target entity to apply material changes to
   * @param oldMaterialMap - Map of original materials for rollback purposes
   * @param materialKeys - Array of material keys to track in this transaction
   */
  constructor(entity: unknown, oldMaterialMap: MaterialMap, materialKeys: MaterialKeys);

  /**
   * Resets materials on the entity to values from the provided material map.
   * Iterates through all material keys and applies corresponding materials from the map.
   * 
   * @param materialMap - Map containing material references to apply to the entity
   */
  resetMaterial(materialMap: MaterialMap): void;

  /**
   * Commits the transaction by resetting materials to their old state.
   * Called when the transaction is being finalized.
   * Invokes the parent class onCommit with an empty array parameter.
   */
  onCommit(): void;

  /**
   * Determines if this transaction can handle field-level operations.
   * 
   * @returns Always returns true, indicating field transactions are supported
   */
  canTransactField(): boolean;
}

/**
 * Entity interface with material management capabilities
 */
export interface MaterialEntity {
  /**
   * Sets a material on the entity for a given material key
   * 
   * @param key - The material slot/key identifier
   * @param material - The material to assign
   */
  setMaterial(key: string, material: unknown): void;
}

/**
 * Core namespace type definitions (reference to external types)
 */
declare module './core-types' {
  export namespace HSCore {
    export namespace Transaction {
      export namespace Common {
        /**
         * Base class for state-based transaction requests
         */
        export class StateRequest {
          /**
           * Commits the transaction with optional parameters
           * @param params - Transaction commit parameters
           */
          onCommit(params: unknown[]): void;
        }
      }
    }
  }
}