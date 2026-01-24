/**
 * Utility functions for working with slab paths
 * @module SlabUtil
 */

/**
 * Represents a 2D or 3D coordinate point
 */
export type Point = [number, number] | [number, number, number];

/**
 * Represents a path as an array of points
 */
export type Path = Point[];

/**
 * Utility object providing helper functions for slab path manipulation
 */
export declare const SlabUtil: {
  /**
   * Removes the last point from a path if it's identical to the first point,
   * effectively converting a closed path to an unclosed one.
   * 
   * @param path - The input path (array of points) to process
   * @returns The unclosed path with duplicate endpoint removed, or the original input if:
   *          - Input is not an array
   *          - Path has fewer than 3 points
   *          - Path is already unclosed (first and last points differ)
   * 
   * @example
   *