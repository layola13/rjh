import { Vector3 } from "core/Misc/observable";

/**
 * Represents a 3D vector with additional interaction information.
 * Extends the base Vector3 class to include mouse button index data.
 */
export interface Vector3WithInfo extends Vector3 {
  /**
   * The mouse button index associated with this vector.
   * Typically: 0 = left button, 1 = middle button, 2 = right button
   */
  buttonIndex: number;
}

/**
 * Constructor for Vector3WithInfo.
 * Creates a new 3D vector with button index information.
 * 
 * @param vector - The source Vector3 containing x, y, z coordinates
 * @param buttonIndex - The mouse button index (default: 0)
 * @returns A new Vector3WithInfo instance
 */
export declare class Vector3WithInfo extends Vector3 {
  /**
   * The mouse button index associated with this vector.
   * @defaultValue 0
   */
  buttonIndex: number;

  /**
   * Creates a new Vector3WithInfo instance.
   * @param vector - Source vector containing x, y, z coordinates
   * @param buttonIndex - Mouse button index (default: 0)
   */
  constructor(vector: Vector3, buttonIndex?: number);
}