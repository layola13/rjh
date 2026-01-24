import { B3Entity } from './B3Entity';
import { Bom3Entity, EntityParameterMap } from './types';

/**
 * B3Stone class represents a stone entity in the B3 system.
 * Extends B3Entity to provide specialized functionality for stone objects.
 */
export declare class B3Stone extends B3Entity {
  /**
   * Builds BOM3 (Bill of Materials 3) data structure from an entity.
   * 
   * @param entity - The source entity to convert into BOM3 format
   * @returns A BOM3 data object containing the converted entity and its parameters
   * 
   * @remarks
   * This method performs the following transformations:
   * - Converts the entity to BOM3 entity format
   * - Maps physical properties (length, width, side, area)
   * - Extracts and formats material information
   * - Sets material category attribute ID if material data exists
   */
  buildBom3Data(entity: unknown): Bom3Data;
}

/**
 * Represents the BOM3 data structure for a stone entity
 */
export interface Bom3Data {
  /** The converted BOM3 entity */
  entity: Bom3Entity;
  
  /** Length dimension of the stone */
  length?: number | string;
  
  /** Width dimension of the stone */
  width?: number | string;
  
  /** Side dimension or identifier of the stone */
  side?: number | string;
  
  /** Calculated or measured area of the stone */
  area?: number | string;
  
  /** Material information for the stone */
  material?: {
    /** Material category details */
    category?: {
      /** Attribute identifier for quantity calculation material */
      attributeId: string;
    };
    [key: string]: unknown;
  };
  
  [key: string]: unknown;
}