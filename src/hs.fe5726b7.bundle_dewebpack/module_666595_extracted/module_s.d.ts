/**
 * Module: module_s
 * Resizing utility module
 */

/**
 * Represents an object with size dimensions
 */
interface Size {
  /** Width in pixels */
  width: number;
  /** Height in pixels */
  height: number;
}

/**
 * Context object that contains original size information
 */
interface ResizableContext {
  /** The original size before any modifications */
  originalSize: Size;
}

/**
 * Calculates new height based on original size and offset
 * @param e - First parameter (currently unused in implementation)
 * @param t - Second parameter (currently unused in implementation)
 * @param n - Height offset to add to original height
 * @returns Object containing the calculated height
 */
declare function calculateHeight(
  this: ResizableContext,
  e: unknown,
  t: unknown,
  n: number
): { height: number };

export { Size, ResizableContext, calculateHeight };