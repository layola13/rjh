/**
 * Represents the size dimensions of an element
 */
interface Size {
  width: number;
  height: number;
}

/**
 * Represents a 2D position with coordinates
 */
interface Position {
  left: number;
  top: number;
}

/**
 * Result of a resize operation containing new position and dimensions
 */
interface ResizeResult {
  /** The new left position after resize */
  left: number;
  /** The new width after resize */
  width: number;
}

/**
 * Context interface for resize operations
 * Contains original state before resize began
 */
interface ResizeContext {
  /** Original size before resize started */
  originalSize: Size;
  /** Original position before resize started */
  originalPosition: Position;
}

/**
 * Calculates the new position and width when resizing from the left edge
 * 
 * When dragging the left edge, the element moves horizontally and its width changes inversely:
 * - Moving left (negative delta) increases width
 * - Moving right (positive delta) decreases width
 * 
 * @param this - The resize context containing original state
 * @param event - The resize event (unused in this implementation)
 * @param leftDelta - The horizontal distance moved from the original left position
 * @returns The new left position and width after applying the delta
 * 
 * @example
 * // Original: left=100, width=200
 * // After dragging left edge 20px to the right:
 * resizeFromLeft(event, 20) // Returns: { left: 120, width: 180 }
 */
declare function resizeFromLeft(
  this: ResizeContext,
  event: unknown,
  leftDelta: number
): ResizeResult;