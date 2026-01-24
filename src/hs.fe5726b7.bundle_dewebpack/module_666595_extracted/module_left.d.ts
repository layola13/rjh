/**
 * Position collision detection module for left alignment
 * Adjusts element position to handle viewport boundary collisions on the horizontal axis
 * @module CollisionLeft
 */

/**
 * Represents the containing element or window context
 */
interface Within {
  /** Whether the container is the browser window */
  isWindow: boolean;
  /** Horizontal scroll position (for window) */
  scrollLeft: number;
  /** Container's left offset position */
  offset: {
    left: number;
  };
  /** Width of the containing element */
  width: number;
}

/**
 * Position collision configuration and state
 */
interface CollisionPosition {
  /** Left margin of the element being positioned */
  marginLeft: number;
}

/**
 * Collision detection options and state
 */
interface CollisionOptions {
  /** The containing element context */
  within: Within;
  /** Current collision position settings */
  collisionPosition: CollisionPosition;
  /** Width of the element including collision boundaries */
  collisionWidth: number;
}

/**
 * Element position configuration
 */
interface PositionConfig {
  /** Left position coordinate to be adjusted */
  left: number;
}

/**
 * Handles left-side collision detection and position adjustment
 * Ensures the element stays within viewport boundaries by adjusting its left position
 * 
 * @param position - Element position configuration to be modified
 * @param options - Collision detection options including container and dimensions
 * @param clampFunction - Function to clamp a value between two bounds
 */
declare function collisionLeft(
  position: PositionConfig,
  options: CollisionOptions,
  clampFunction: (min: number, value: number) => number
): void;

export { collisionLeft, Within, CollisionPosition, CollisionOptions, PositionConfig };