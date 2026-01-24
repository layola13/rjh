/**
 * Represents a 2D rectangular measurement area with position and dimensions.
 * Used for measuring and transforming rectangular regions in 2D space.
 */
export interface Measure {
  /** The left coordinate of the rectangle */
  left: number;
  /** The top coordinate of the rectangle */
  top: number;
  /** The width of the rectangle */
  width: number;
  /** The height of the rectangle */
  height: number;

  /**
   * Copies all properties from another Measure instance.
   * @param source - The source Measure to copy from
   */
  copyFrom(source: Measure): void;

  /**
   * Sets the measure properties from individual float values.
   * @param left - The left coordinate
   * @param top - The top coordinate
   * @param width - The width dimension
   * @param height - The height dimension
   */
  copyFromFloats(left: number, top: number, width: number, height: number): void;

  /**
   * Adds offsets to the current measure and transforms it using a matrix,
   * then stores the result in the target measure.
   * @param transformMatrix - The transformation matrix to apply
   * @param offsetLeft - Offset to add to the left coordinate
   * @param offsetTop - Offset to add to the top coordinate
   * @param offsetWidth - Offset to add to the width
   * @param offsetHeight - Offset to add to the height
   * @param target - The target Measure to store the result
   */
  addAndTransformToRef(
    transformMatrix: Matrix2D,
    offsetLeft: number,
    offsetTop: number,
    offsetWidth: number,
    offsetHeight: number,
    target: Measure
  ): void;

  /**
   * Transforms the current measure using a matrix and stores the result.
   * @param transformMatrix - The transformation matrix to apply
   * @param target - The target Measure to store the transformed result
   */
  transformToRef(transformMatrix: Matrix2D, target: Measure): void;

  /**
   * Checks if this measure is exactly equal to another measure.
   * @param other - The other Measure to compare with
   * @returns True if all properties are equal, false otherwise
   */
  isEqualsTo(other: Measure): boolean;
}

/**
 * Measure class constructor interface.
 */
export interface MeasureConstructor {
  /**
   * Creates a new Measure instance.
   * @param left - The left coordinate
   * @param top - The top coordinate
   * @param width - The width dimension
   * @param height - The height dimension
   */
  new (left: number, top: number, width: number, height: number): Measure;

  /**
   * Combines two measures into a bounding rectangle that contains both.
   * @param measure1 - The first measure
   * @param measure2 - The second measure
   * @param target - The target Measure to store the combined result
   */
  CombineToRef(measure1: Measure, measure2: Measure, target: Measure): void;

  /**
   * Creates an empty measure with all properties set to zero.
   * @returns A new Measure instance with zero dimensions
   */
  Empty(): Measure;
}

/**
 * 2D transformation matrix interface with coordinate transformation capabilities.
 */
export interface Matrix2D {
  /**
   * Transforms 2D coordinates using this matrix.
   * @param x - The x coordinate to transform
   * @param y - The y coordinate to transform
   * @param result - The Vector2 to store the transformed coordinates
   */
  transformCoordinates(x: number, y: number, result: Vector2): void;
}

/**
 * 2D vector representing a point or direction in 2D space.
 */
export interface Vector2 {
  /** The x coordinate */
  x: number;
  /** The y coordinate */
  y: number;

  /**
   * Copies values from individual float coordinates.
   * @param x - The x coordinate
   * @param y - The y coordinate
   */
  copyFromFloats(x: number, y: number): void;
}

/**
 * The Measure class for 2D rectangular measurement and transformation operations.
 */
export declare const Measure: MeasureConstructor;