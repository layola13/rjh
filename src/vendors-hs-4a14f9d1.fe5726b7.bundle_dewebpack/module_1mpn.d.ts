/**
 * Represents a 2D point or vector with x and y coordinates.
 * Used for geometric calculations and poly2tri edge list management.
 */
export interface Point {
  /** X coordinate */
  x: number;
  
  /** Y coordinate */
  y: number;
  
  /** Internal reference for poly2tri triangulation edge list */
  _p2t_edge_list: unknown | null;
  
  /**
   * Returns a string representation of the point.
   * @returns String representation using the base formatter
   */
  toString(): string;
  
  /**
   * Serializes the point to a JSON-compatible object.
   * @returns Object containing x and y coordinates
   */
  toJSON(): { x: number; y: number };
  
  /**
   * Creates a deep copy of the point.
   * @returns New point instance with same coordinates
   */
  clone(): Point;
  
  /**
   * Sets both coordinates to zero (mutates).
   * @returns This point for chaining
   */
  set_zero(): this;
  
  /**
   * Sets the x and y coordinates (mutates).
   * @param x - New x coordinate
   * @param y - New y coordinate
   * @returns This point for chaining
   */
  set(x: number, y: number): this;
  
  /**
   * Negates both coordinates (mutates).
   * @returns This point for chaining
   */
  negate(): this;
  
  /**
   * Adds another point's coordinates to this point (mutates).
   * @param other - Point to add
   * @returns This point for chaining
   */
  add(other: Point): this;
  
  /**
   * Subtracts another point's coordinates from this point (mutates).
   * @param other - Point to subtract
   * @returns This point for chaining
   */
  sub(other: Point): this;
  
  /**
   * Multiplies both coordinates by a scalar (mutates).
   * @param scalar - Scalar multiplier
   * @returns This point for chaining
   */
  mul(scalar: number): this;
  
  /**
   * Calculates the Euclidean length/magnitude of the vector.
   * @returns Length of the vector
   */
  length(): number;
  
  /**
   * Normalizes the vector to unit length (mutates).
   * @returns The original length before normalization
   */
  normalize(): number;
  
  /**
   * Checks equality with another point.
   * @param other - Point to compare
   * @returns True if both x and y coordinates are equal
   */
  equals(other: Point): boolean;
}

/**
 * Point constructor interface.
 */
export interface PointConstructor {
  /**
   * Creates a new Point instance.
   * @param x - X coordinate (defaults to 0)
   * @param y - Y coordinate (defaults to 0)
   */
  new(x?: number, y?: number): Point;
  
  /**
   * Returns a new point with negated coordinates (immutable).
   * @param point - Source point
   * @returns New negated point
   */
  negate(point: Point): Point;
  
  /**
   * Returns a new point that is the sum of two points (immutable).
   * @param a - First point
   * @param b - Second point
   * @returns New point with summed coordinates
   */
  add(a: Point, b: Point): Point;
  
  /**
   * Returns a new point that is the difference of two points (immutable).
   * @param a - First point
   * @param b - Second point
   * @returns New point with subtracted coordinates
   */
  sub(a: Point, b: Point): Point;
  
  /**
   * Returns a new point scaled by a scalar (immutable).
   * @param scalar - Scalar multiplier
   * @param point - Point to scale
   * @returns New scaled point
   */
  mul(scalar: number, point: Point): Point;
  
  /**
   * Calculates the cross product of two vectors or scalars.
   * - scalar × scalar → scalar result
   * - scalar × vector → perpendicular vector
   * - vector × scalar → perpendicular vector
   * - vector × vector → scalar (z-component of 3D cross product)
   * 
   * @param a - First operand (number or Point)
   * @param b - Second operand (number or Point)
   * @returns Cross product result
   */
  cross(a: number, b: number): number;
  cross(a: number, b: Point): Point;
  cross(a: Point, b: number): Point;
  cross(a: Point, b: Point): number;
  
  /**
   * Calculates the dot product of two vectors.
   * @param a - First vector
   * @param b - Second vector
   * @returns Dot product (scalar)
   */
  dot(a: Point, b: Point): number;
  
  /**
   * Converts a point to a string representation.
   * @param point - Point to convert
   * @returns String representation
   */
  toString(point: Point): string;
  
  /**
   * Compares two points for ordering.
   * @param a - First point
   * @param b - Second point
   * @returns Comparison result
   */
  compare(a: Point, b: Point): number;
  
  /**
   * Alias for compare method.
   * @param a - First point
   * @param b - Second point
   * @returns Comparison result
   */
  cmp(a: Point, b: Point): number;
  
  /**
   * Checks equality between two points.
   * @param a - First point
   * @param b - Second point
   * @returns True if points are equal
   */
  equals(a: Point, b: Point): boolean;
}

declare const Point: PointConstructor;
export default Point;