/**
 * Represents a 3D vector with additional interaction information.
 * Extends the base Vector3 class to include button index data for user input handling.
 * 
 * @module Vector3WithInfo
 */

import { Vector3 } from 'core/Misc/observable';

/**
 * A Vector3 that includes information about which button was used during interaction.
 * Useful for tracking mouse or touch input in 3D space.
 */
export declare class Vector3WithInfo extends Vector3 {
  /**
   * The index of the button that triggered this vector's creation.
   * Typically represents mouse button (0 = left, 1 = middle, 2 = right).
   */
  buttonIndex: number;

  /**
   * Creates a new Vector3WithInfo instance.
   * 
   * @param source - The source vector containing x, y, z coordinates
   * @param buttonIndex - The button index associated with this vector (default: 0)
   */
  constructor(source: Vector3, buttonIndex?: number);
}