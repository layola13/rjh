/**
 * Material data change transaction request for HSCore
 * Handles undo/redo operations for material property modifications
 */

import { HSCore } from './path/to/HSCore';

/**
 * Represents material data properties
 */
export interface MaterialData {
  [key: string]: unknown;
}

/**
 * Interface for entity with material management capabilities
 */
export interface MaterialEntity {
  /**
   * Gets material by component name
   * @param componentName - Name of the material component
   * @returns Material instance or null if not found
   */
  getMaterial(componentName: string): Material | null;
}

/**
 * Interface for material with data management
 */
export interface Material {
  /**
   * Gets current material data
   * @returns Current material data snapshot
   */
  getMaterialData(): MaterialData;
  
  /**
   * Sets new material data
   * @param data - Material data to apply
   */
  set(data: MaterialData): void;
}

/**
 * Transaction request for changing material data with undo/redo support
 * Extends HSCore.Transaction.Request to enable command pattern for material modifications
 */
export default class MaterialDataChangeRequest extends HSCore.Transaction.Request {
  /** Entity containing the material */
  private entity: MaterialEntity;
  
  /** Name of the material component */
  private componentName: string;
  
  /** Material data snapshot (toggles between old and new state) */
  private materialData: MaterialData;

  /**
   * Creates a material data change transaction
   * @param entity - Entity that owns the material
   * @param componentName - Name of the material component to modify
   * @param materialData - New material data to apply
   */
  constructor(
    entity: MaterialEntity,
    componentName: string,
    materialData: MaterialData
  ) {
    super();
    this.entity = entity;
    this.componentName = componentName;
    this.materialData = materialData;
  }

  /**
   * Swaps current material data with stored data
   * Used internally for undo/redo operations
   * @private
   */
  private changeData(): void {
    const material = this.entity.getMaterial(this.componentName);
    
    if (material) {
      const currentData = material.getMaterialData();
      material.set(this.materialData);
      this.materialData = currentData;
    }
  }

  /**
   * Executes the transaction (applies new material data)
   */
  onCommit(): void {
    this.changeData();
  }

  /**
   * Reverts the transaction (restores previous material data)
   */
  onUndo(): void {
    this.changeData();
  }

  /**
   * Re-applies the transaction (applies new material data again)
   */
  onRedo(): void {
    this.changeData();
  }
}