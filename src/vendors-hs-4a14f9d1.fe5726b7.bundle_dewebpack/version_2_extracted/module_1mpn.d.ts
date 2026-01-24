/**
 * Represents a 2D point or vector with x and y coordinates.
 * Used for geometric calculations and triangulation algorithms.
 */
export interface Point {
  /** X coordinate of the point */
  x: number;
  
  /** Y coordinate of the point */
  y: number;
  
  /** Internal edge list used by poly2tri triangulation algorithm */
  _p2t_edge_list: unknown | null;
  
  /**
   * Converts the point to a string representation.
   * @returns String representation of the point
   */
  toString(): string;
  
  /**
   * Converts the point to a JSON-serializable object.
   * @returns Object containing x and y coordinates
   */
  toJSON(): { x: number; y: number };
  
  /**
   * Creates a deep copy of the point.
   * @returns New Point instance with the same coordinates
   */
  clone(): Point;
  
  /**
   * Sets both coordinates to zero.
   * @returns This point instance for method chaining
   */
  set_zero(): this;
  
  /**
   * Sets the coordinates of the point.
   * @param x - New x coordinate
   * @param y - New y coordinate
   * @returns This point instance for method chaining
   */
  set(x: number, y: number): this;
  
  /**
   * Negates both coordinates (multiplies by -1).
   * @returns This point instance for method chaining
   */
  negate(): this;
  
  /**
   * Adds another point's coordinates to this point.
   * @param other - Point to add
   * @returns This point instance for method chaining
   */
  add(other: Point): this;
  
  /**
   * Subtracts another point's coordinates from this point.
   * @param other - Point to subtract
   * @returns This point instance for method chaining
   */
  sub(other: Point): this;
  
  /**
   * Multiplies both coordinates by a scalar value.
   * @param scalar - Scalar multiplier
   * @returns This point instance for method chaining
   */
  mul(scalar: number): this;
  
  /**
   * Calculates the Euclidean length (magnitude) of the vector.
   * @returns Length of the vector
   */
  length(): number;
  
  /**
   * Normalizes the vector to unit length.
   * @returns The original length before normalization
   */
  normalize(): number;
  
  /**
   * Checks if this point has the same coordinates as another point.
   * @param other - Point to compare with
   * @returns True if coordinates are equal
   */
  equals(other: Point): boolean;
}

/**
 * Point/Vector class constructor and static utility methods.
 */
export interface PointConstructor {
  /**
   * Creates a new Point instance.
   * @param x - X coordinate (defaults to 0)
   * @param y - Y coordinate (defaults to 0)
   */
  new(x?: number, y?: number): Point;
  
  /**
   * Creates a new point with negated coordinates.
   * @param point - Source point
   * @returns New point with negated coordinates
   */
  negate(point: Point): Point;
  
  /**
   * Adds two points and returns a new point.
   * @param a - First point
   * @param b - Second point
   * @returns New point representing the sum
   */
  add(a: Point, b: Point): Point;
  
  /**
   * Subtracts second point from first and returns a new point.
   * @param a - First point
   * @param b - Second point
   * @returns New point representing the difference
   */
  sub(a: Point, b: Point): Point;
  
  /**
   * Multiplies a point by a scalar and returns a new point.
   * @param scalar - Scalar multiplier
   * @param point - Point to multiply
   * @returns New scaled point
   */
  mul(scalar: number, point: Point): Point;
  
  /**
   * Computes the cross product of two vectors.
   * Supports scalar-vector and vector-vector cross products.
   * @param a - Scalar or first vector
   * @param b - Scalar or second vector
   * @returns Scalar result for vector-vector cross product, or new Point for scalar-vector
   */
  cross(a: number, b: number): number;
  cross(a: number, b: Point): Point;
  cross(a: Point, b: number): Point;
  cross(a: Point, b: Point): number;
  
  /**
   * Computes the dot product of two vectors.
   * @param a - First vector
   * @param b - Second vector
   * @returns Scalar dot product result
   */
  dot(a: Point, b: Point): number;
  
  /**
   * Converts a point to string representation.
   * @param point - Point to convert
   * @returns String representation
   */
  toString(point: Point): string;
  
  /**
   * Compares two points for ordering.
   * @param a - First point
   * @param b - Second point
   * @returns Negative if a < b, positive if a > b, zero if equal
   */
  compare(a: Point, b: Point): number;
  
  /**
   * Alias for compare method.
   * @param a - First point
   * @param b - Second point
   * @returns Negative if a < b, positive if a > b, zero if equal
   */
  cmp(a: Point, b: Point): number;
  
  /**
   * Checks if two points are equal.
   * @param a - First point
   * @param b - Second point
   * @returns True if points are equal
   */
  equals(a: Point, b: Point): boolean;
}

declare const Point: PointConstructor;
export default Point;