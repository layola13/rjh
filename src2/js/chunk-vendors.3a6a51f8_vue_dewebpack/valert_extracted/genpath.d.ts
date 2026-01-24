/**
 * Point interface representing a coordinate in 2D space
 */
export interface Point {
  x: number;
  y: number;
}

/**
 * Generates an SVG path string from an array of points with optional smooth curves
 * 
 * @param points - Array of points to generate the path from
 * @param smoothing - The smoothing factor for curved segments (default: 75)
 * @param fill - Whether to close the path and fill it (default: false)
 * @param height - The height value used for fill calculations (default: 75)
 * @returns An SVG path string (e.g., "M10 20 L30 40...")
 * 
 * @example
 *