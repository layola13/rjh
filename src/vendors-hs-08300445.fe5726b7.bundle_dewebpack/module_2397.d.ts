/**
 * Canvas-based checkerboard pattern generator module.
 * Creates and caches checkerboard patterns as data URLs.
 */

/**
 * Cache storage for generated checkerboard patterns.
 * Key format: "{color1}-{color2}-{size}[-server]"
 */
interface PatternCache {
  [key: string]: string | null;
}

/**
 * Canvas constructor type for server-side rendering compatibility.
 */
type CanvasConstructor = new () => HTMLCanvasElement;

/**
 * Renders a 2x2 checkerboard pattern to a data URL.
 * 
 * @param primaryColor - Fill color for the primary squares (top-left and bottom-right)
 * @param secondaryColor - Fill color for the secondary squares (top-right and bottom-left)
 * @param size - Size of each checker square in pixels
 * @param canvasConstructor - Optional canvas constructor for server-side rendering
 * @returns Data URL of the generated checkerboard pattern, or null if rendering fails
 * 
 * @example
 *