/**
 * B3Entity class - Base entity class for B3 system
 * Original Module ID: 440000
 */

/**
 * Context interface for B3Entity
 * Represents the execution context passed to the entity
 */
export interface B3Context {
  [key: string]: unknown;
}

/**
 * B3Entity - Base entity class for building and managing BOM3 data structures
 * 
 * This class serves as a foundation for B3 system entities, providing
 * context management and BOM3 data building capabilities.
 */
export declare class B3Entity {
  /**
   * The context object containing runtime configuration and state
   */
  readonly context: B3Context;

  /**
   * Creates a new B3Entity instance
   * 
   * @param context - The execution context for this entity
   */
  constructor(context: B3Context);

  /**
   * Builds BOM3 (Bill of Materials 3) data structure
   * 
   * @param data - The input data to be transformed into BOM3 format
   * @returns void
   */
  buildBom3Data(data: unknown): void;
}