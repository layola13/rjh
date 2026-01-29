interface Vector3Like {
  x: number;
  y: number;
  z: number;
}

type Vector3Input = Vector3Like | [number, number, number];

/**
 * Represents a 3D vector with x, y, z components
 */
class Vector3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number);
  constructor(input: Vector3Input);
  constructor(xOrInput: number | Vector3Input, y?: number, z?: number) {
    if (arguments.length === 3) {
      this.x = xOrInput as number;
      this.y = y!;
      this.z = z!;
    } else if (typeof xOrInput === 'object' && 'x' in xOrInput) {
      this.x = xOrInput.x;
      this.y = xOrInput.y;
      this.z = xOrInput.z;
    } else {
      const arr = xOrInput as [number, number, number];
      this.x = arr[0];
      this.y = arr[1];
      this.z = arr[2];
    }
  }

  /**
   * Creates a copy of this vector
   */
  clone(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  /**
   * Returns a new vector with negated components
   */
  negated(): Vector3 {
    return new Vector3(-this.x, -this.y, -this.z);
  }

  /**
   * Adds another vector to this vector
   */
  plus(other: Vector3Like): Vector3 {
    return new Vector3(this.x + other.x, this.y + other.y, this.z + other.z);
  }

  /**
   * Subtracts another vector from this vector
   */
  minus(other: Vector3Like): Vector3 {
    return new Vector3(this.x - other.x, this.y - other.y, this.z - other.z);
  }

  /**
   * Multiplies this vector by a scalar
   */
  times(scalar: number): Vector3 {
    return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  /**
   * Divides this vector by a scalar
   */
  dividedBy(scalar: number): Vector3 {
    return new Vector3(this.x / scalar, this.y / scalar, this.z / scalar);
  }

  /**
   * Calculates the dot product with another vector
   */
  dot(other: Vector3Like): number {
    return this.x * other.x + this.y * other.y + this.z * other.z;
  }

  /**
   * Linear interpolation between this vector and another
   * @param other - Target vector
   * @param t - Interpolation factor (0-1)
   */
  lerp(other: Vector3Like, t: number): Vector3 {
    return this.plus(new Vector3(other).minus(this).times(t));
  }

  /**
   * Calculates the length (magnitude) of this vector
   */
  length(): number {
    return Math.sqrt(this.dot(this));
  }

  /**
   * Returns a normalized (unit length) version of this vector
   */
  unit(): Vector3 {
    return this.dividedBy(this.length());
  }

  /**
   * Calculates the cross product with another vector
   */
  cross(other: Vector3Like): Vector3 {
    return new Vector3(
      this.y * other.z - this.z * other.y,
      this.z * other.x - this.x * other.z,
      this.x * other.y - this.y * other.x
    );
  }
}

export default Vector3;