/**
 * Floor utility module for geometric operations on floor objects.
 * Provides methods to determine spatial relationships between points and floor geometries.
 */

/**
 * Represents a floor entity with a unique identifier.
 */
export interface Floor {
  /** Unique identifier for the floor */
  id: string | number;
}

/**
 * Represents a 2D or 3D point in space.
 */
export type Point = [number, number] | [number, number, number];

/**
 * Utility class for floor-related geometric calculations.
 */
export declare const FloorUtil: {
  /**
   * Determines whether a given point lies inside the boundaries of a floor.
   * 
   * @param floor - The floor entity to check against
   * @param point - The point coordinates to test
   * @returns `true` if the point is inside the floor polygon, `false` otherwise
   * 
   * @remarks
   * This method uses polygon point-in-polygon testing with a tolerance of 1e-4.
   * It retrieves the floor's face path from the document geometry manager.
   * 
   * @example
   *