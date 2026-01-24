import { B3Entity } from './B3Entity';
import { Bom3Entity, EntityParameter } from './types';

/**
 * Represents a parametric pocket entity with dimensional and material properties.
 * Extends B3Entity to provide BOM (Bill of Materials) data generation capabilities.
 */
export declare class B3ParametricPocket extends B3Entity {
  /**
   * Constructs a new B3ParametricPocket instance.
   */
  constructor();

  /**
   * Builds BOM3 data structure from the given entity.
   * Extracts geometric dimensions (length, width, thickness), side orientation,
   * and material information, formatting them for BOM system integration.
   * 
   * @param entity - The source entity containing parametric pocket data
   * @returns A BOM3-compatible data object with entity reference, dimensions, and material attributes
   * 
   * @remarks
   * - Automatically sets material category attribute ID to "attr-Quantity-Calculation-Material"
   * - Parameter mapping preserves original property names (length, thickness, width, side, material)
   */
  buildBom3Data(entity: EntityParameter): Bom3Data;
}

/**
 * BOM3 data structure for parametric pocket entities.
 */
export interface Bom3Data {
  /** Reference to the converted BOM3 entity */
  entity: Bom3Entity;
  
  /** Length dimension of the pocket */
  length?: number;
  
  /** Thickness dimension of the pocket */
  thickness?: number;
  
  /** Width dimension of the pocket */
  width?: number;
  
  /** Side orientation identifier */
  side?: string;
  
  /** Material specification with category attributes */
  material?: {
    /** Material category with quantity calculation attribute */
    category?: {
      /** Fixed attribute ID for material quantity calculations */
      attributeId: string;
    };
    [key: string]: unknown;
  };
}