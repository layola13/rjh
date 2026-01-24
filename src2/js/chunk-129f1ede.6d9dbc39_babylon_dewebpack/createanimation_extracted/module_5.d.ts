/**
 * Represents an object with y and z coordinates/values
 */
interface Point2D {
  /** Y-axis value */
  y: number;
  /** Z-axis value */
  z: number;
}

/**
 * Calculates the product of y and z properties
 * @param point - Object containing y and z numeric properties
 * @returns The product of y * z
 */
declare function calculateProduct(point: Point2D): number;

export { Point2D, calculateProduct };