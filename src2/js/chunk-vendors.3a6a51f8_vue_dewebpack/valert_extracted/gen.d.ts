/**
 * Sparkline chart point coordinates and data
 */
export interface SparklinePoint {
  /** X coordinate in the render space */
  x: number;
  /** Y coordinate in the render space */
  y: number;
  /** Original data value */
  value: number;
}

/**
 * Sparkline bar coordinates and dimensions
 */
export interface SparklineBar {
  /** X coordinate (left edge of bar) */
  x: number;
  /** Y coordinate (top edge of bar) */
  y: number;
  /** Bar height in pixels */
  height: number;
  /** Original data value */
  value: number;
}

/**
 * Bounds defining the rendering viewport
 */
export interface SparklineBounds {
  /** Minimum X coordinate */
  minX: number;
  /** Maximum X coordinate */
  maxX: number;
  /** Minimum Y coordinate */
  minY: number;
  /** Maximum Y coordinate */
  maxY: number;
}

/**
 * Generates point coordinates for a line sparkline chart
 * 
 * Maps data values to pixel coordinates within the specified bounds,
 * normalizing values to fit the available space.
 * 
 * @param values - Array of numeric data values to plot
 * @param bounds - Viewport boundaries for rendering
 * @returns Array of point objects with x, y coordinates and original values
 */
export declare function genPoints(
  values: number[],
  bounds: SparklineBounds
): SparklinePoint[];

/**
 * Generates bar coordinates and dimensions for a bar sparkline chart
 * 
 * Maps data values to bars with x, y positions and heights, handling
 * both positive and negative values with a baseline at zero.
 * 
 * @param values - Array of numeric data values to plot as bars
 * @param bounds - Viewport boundaries for rendering
 * @returns Array of bar objects with position, height, and original values
 */
export declare function genBars(
  values: number[],
  bounds: SparklineBounds
): SparklineBar[];