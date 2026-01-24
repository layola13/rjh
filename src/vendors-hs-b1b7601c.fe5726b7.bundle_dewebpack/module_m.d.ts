/**
 * Creates an SVG path "M" (moveTo) command from coordinate array.
 * Updates both output position objects and returns the path command array.
 * 
 * @param coordinates - Array containing [x, y] coordinates
 * @param currentPosition - Object to store the current pen position
 * @param startPosition - Object to store the path start position
 * @returns SVG path command array: ["M", x, y]
 */
declare function createMoveToCommand(
  coordinates: readonly [number, number],
  currentPosition: { x: number; y: number },
  startPosition: { x: number; y: number }
): ["M", number, number];

/**
 * Represents a 2D point with x and y coordinates.
 */
interface Point {
  x: number;
  y: number;
}

/**
 * SVG "M" (moveTo) command type.
 * Format: ["M", x-coordinate, y-coordinate]
 */
type MoveToCommand = ["M", number, number];

/**
 * Creates an SVG path "M" (moveTo) command from coordinate array.
 * Updates both output position objects and returns the path command array.
 * 
 * @param coordinates - Array containing [x, y] coordinates
 * @param currentPosition - Object to store the current pen position
 * @param startPosition - Object to store the path start position
 * @returns SVG path command array: ["M", x, y]
 */
declare function createMoveToCommand(
  coordinates: readonly [number, number],
  currentPosition: Point,
  startPosition: Point
): MoveToCommand;