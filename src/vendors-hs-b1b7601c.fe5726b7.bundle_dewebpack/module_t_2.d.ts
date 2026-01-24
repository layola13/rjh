/**
 * Module: module_T
 * Transforms a coordinate array into an object and returns a tuple representation
 */

/**
 * Coordinate object with x and y properties
 */
interface Coordinate {
  x: number;
  y: number;
}

/**
 * Tuple type representing a coordinate transformation result
 * Format: [type identifier, x coordinate, y coordinate]
 */
type CoordinateTuple = readonly ["T", number, number];

/**
 * Transforms a coordinate array into a coordinate object and returns a tuple
 * @param coordinates - Array containing [x, y] coordinate values
 * @param target - Target coordinate object to populate with x and y values
 * @returns A tuple containing the type identifier "T" and the coordinate values
 * @example
 * const coord = { x: 0, y: 0 };
 * const result = transformCoordinate([10, 20], coord);
 * // result: ["T", 10, 20]
 * // coord: { x: 10, y: 20 }
 */
declare function transformCoordinate(
  coordinates: readonly [number, number],
  target: Coordinate
): CoordinateTuple;

export { Coordinate, CoordinateTuple, transformCoordinate };