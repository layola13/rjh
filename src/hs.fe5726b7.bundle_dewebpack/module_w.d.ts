/**
 * Calculates the new position and size when resizing from the left edge.
 * Used in UI resize operations where the left boundary moves while maintaining the right edge.
 * 
 * @param e - Event or context parameter (unused in this implementation)
 * @param t - The horizontal delta/offset from the original left position (positive = moved right)
 * @returns An object containing the new left position and adjusted width
 */
declare function resizeFromLeft(
  e: unknown,
  t: number
): {
  /** The new left position after applying the offset */
  left: number;
  /** The new width after accounting for the left edge movement */
  width: number;
};

/**
 * Context object containing the original dimensions and position.
 * Should be bound as 'this' when calling resizeFromLeft.
 */
interface ResizeContext {
  /** Original position coordinates before resize operation */
  originalPosition: {
    /** Original left coordinate in pixels */
    left: number;
  };
  
  /** Original dimensions before resize operation */
  originalSize: {
    /** Original width in pixels */
    width: number;
  };
}

/**
 * Result of a left-edge resize operation.
 */
interface ResizeResult {
  /** New left position after resize */
  left: number;
  /** New width after resize (decreases when left edge moves right) */
  width: number;
}

export type { ResizeContext, ResizeResult };
export { resizeFromLeft };