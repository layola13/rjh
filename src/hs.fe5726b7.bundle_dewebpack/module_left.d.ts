/**
 * Position collision detection module for left positioning
 * Adjusts element position to prevent overflow outside the container boundaries
 * @module module_left
 * @originalId left
 */

/**
 * Represents the containing element or window that constrains positioning
 */
interface WithinBounds {
  /** Whether the container is the browser window */
  isWindow: boolean;
  /** Horizontal scroll position (for window) */
  scrollLeft: number;
  /** Offset position from document origin */
  offset: {
    left: number;
  };
  /** Width of the container */
  width: number;
}

/**
 * Position configuration for collision detection
 */
interface CollisionPosition {
  /** Left margin of the positioned element */
  marginLeft: number;
}

/**
 * Position adjustment options passed to the collision handler
 */
interface PositionOptions {
  /** Container bounds information */
  within: WithinBounds;
  /** Current collision position data */
  collisionPosition: CollisionPosition;
  /** Width of the element being positioned */
  collisionWidth: number;
}

/**
 * Current position coordinates being adjusted
 */
interface ElementPosition {
  /** Left coordinate of the element */
  left: number;
}

/**
 * Clamps a value between two bounds (implementation needed)
 * @param value1 - First value to compare
 * @param value2 - Second value to compare
 * @returns The clamped value
 */
declare function i(value1: number, value2: number): number;

/**
 * Adjusts the left position of an element to handle collision with container boundaries.
 * Ensures the element stays within visible bounds by recalculating position when overflow occurs.
 * 
 * @param elementPosition - The current position object to be modified in place
 * @param options - Configuration containing container bounds and collision data
 */
declare function adjustLeftPosition(
  elementPosition: ElementPosition,
  options: PositionOptions
): void;