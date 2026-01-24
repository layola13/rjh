/**
 * Utility functions module
 * Provides common helper methods for array operations and mathematical calculations
 */

/**
 * Utility interface containing helper methods
 */
export interface Util {
  /**
   * Computes the symmetric difference between two arrays
   * Returns elements that are in either array but not in both
   * 
   * @param firstArray - The first array to compare
   * @param secondArray - The second array to compare
   * @returns An array containing elements present in only one of the input arrays
   * 
   * @example
   *