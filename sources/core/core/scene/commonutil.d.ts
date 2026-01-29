/**
 * Common utility functions for processing mass properties and geometric data.
 * @module CommonUtil
 */

/**
 * Represents a point or coordinate in 2D space.
 */
export interface MassProperty {
  /** X coordinate */
  x?: number;
  /** Y coordinate */
  y?: number;
  /** Optional additional properties */
  [key: string]: unknown;
}

/**
 * Logger interface for console operations.
 */
interface Logger {
  console: {
    /**
     * Assertion method that logs when condition is false.
     * @param condition - Condition to assert
     * @param message - Message to display if assertion fails
     */
    assert(condition: boolean, message: string): void;
  };
}

/**
 * Utility class providing common operations for mass properties and geometric calculations.
 */
export declare class CommonUtil {
  /**
   * Parses a mass property object and generates a unique key string.
   * 
   * Combines the block's local ID with the x and y coordinates from the mass property
   * to create a unique identifier in the format: "blockLocalId-x-y"
   * 
   * @param massProperty - The mass property object containing x and y coordinates
   * @param blockLocalId - The local identifier of the block
   * @returns A formatted key string combining block ID and coordinates, or empty string if invalid
   * 
   * @example
   *