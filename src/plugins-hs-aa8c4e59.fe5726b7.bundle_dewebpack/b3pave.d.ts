import { B3Entity } from './B3Entity';
import { B3Region } from './B3Region';

/**
 * B3Pave class - Represents a pave entity in the B3 system
 * 
 * This class extends B3Entity and provides functionality to build BOM3 data
 * from pave entities by converting child entities into a structured region format.
 */
export declare class B3Pave extends B3Entity {
  /**
   * Creates an instance of B3Pave
   * 
   * @param context - The context object passed to the parent B3Entity constructor
   */
  constructor(context: unknown);

  /**
   * Builds BOM3 (Bill of Materials 3) data from the given entity
   * 
   * This method retrieves children from the provided entity, creates a new B3Region
   * with the current context, and transforms the pave entity structure into BOM3 data format.
   * 
   * @param entity - The source entity containing children to be converted
   * @returns The converted BOM3 data structure in B3Region format
   */
  buildBom3Data(entity: B3Entity): B3Region;
}