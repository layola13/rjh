/**
 * Represents a 2D point with x and y coordinates
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Generates an SVG path string from an array of points
 * 
 * @param points - Array of points to convert into an SVG path
 * @param smoothing - Smoothing radius for curves between points (default: 75)
 * @param fillArea - Whether to create a closed filled area path (default: false)
 * @param height - Height value used for filling area when fillArea is true (default: 75)
 * @returns SVG path string (e.g., "M10 20 L30 40...")
 * 
 * @example
 *