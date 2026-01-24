/**
 * Represents a 3D vector with x, y, and z components.
 * Provides common vector operations for 3D mathematics.
 */
declare class Vector3 {
  /** The x-component of the vector */
  x: number;
  
  /** The y-component of the vector */
  y: number;
  
  /** The z-component of the vector */
  z: number;

  /**
   * Creates a new 3D vector.
   * @param x - The x-component or a vector-like object or an array
   * @param y - The y-component (optional if first parameter is object/array)
   * @param z - The z-component (optional if first parameter is object/array)
   */
  constructor(x: number, y: number, z: number);
  constructor(vector: { x: number; y: number; z: number });
  constructor(array: [number, number, number]);

  /**
   * Creates a copy of this vector.
   * @returns A new vector with the same x, y, z values
   */
  clone(): Vector3;

  /**
   * Returns a new vector with all components negated.
   * @returns A new vector with negated components
   */
  negated(): Vector3;

  /**
   * Adds another vector to this vector.
   * @param vector - The vector to add
   * @returns A new vector representing the sum
   */
  plus(vector: Vector3): Vector3;

  /**
   * Subtracts another vector from this vector.
   * @param vector - The vector to subtract
   * @returns A new vector representing the difference
   */
  minus(vector: Vector3): Vector3;

  /**
   * Multiplies this vector by a scalar value.
   * @param scalar - The scalar value to multiply by
   * @returns A new scaled vector
   */
  times(scalar: number): Vector3;

  /**
   * Divides this vector by a scalar value.
   * @param scalar - The scalar value to divide by
   * @returns A new scaled vector
   */
  dividedBy(scalar: number): Vector3;

  /**
   * Computes the dot product with another vector.
   * @param vector - The vector to compute dot product with
   * @returns The dot product (scalar value)
   */
  dot(vector: Vector3): number;

  /**
   * Performs linear interpolation between this vector and another.
   * @param vector - The target vector to interpolate towards
   * @param t - The interpolation factor (0 = this vector, 1 = target vector)
   * @returns A new interpolated vector
   */
  lerp(vector: Vector3, t: number): Vector3;

  /**
   * Calculates the length (magnitude) of this vector.
   * @returns The length of the vector
   */
  length(): number;

  /**
   * Returns a normalized (unit length) version of this vector.
   * @returns A new unit vector in the same direction
   */
  unit(): Vector3;

  /**
   * Computes the cross product with another vector.
   * @param vector - The vector to compute cross product with
   * @returns A new vector perpendicular to both input vectors
   */
  cross(vector: Vector3): Vector3;
}

export = Vector3;