/**
 * B3ConcealedWorkTube module
 * Provides a specialized entity class for concealed work tube components in BIM3D system
 */

import { B3Entity } from './B3Entity';

/**
 * Interface representing BOM3 (Bill of Materials 3) data structure
 */
interface Bom3Data {
  /** The transformed entity in BOM3 format */
  entity: unknown;
}

/**
 * B3ConcealedWorkTube class extends B3Entity to represent concealed work tube entities
 * Used for managing hidden or embedded conduit/tube work in building models
 * 
 * @extends B3Entity
 */
export declare class B3ConcealedWorkTube extends B3Entity {
  /**
   * Constructs a new B3ConcealedWorkTube instance
   */
  constructor();

  /**
   * Builds BOM3 (Bill of Materials 3) data from an entity
   * Transforms the input entity into a BOM3-compatible data structure
   * 
   * @param entity - The source entity to be converted to BOM3 format
   * @returns BOM3 data object containing the transformed entity
   */
  buildBom3Data(entity: unknown): Bom3Data;
}