/**
 * Position collision detection handler for vertical "top" positioning.
 * Adjusts element position to prevent overflow within a scrollable container.
 * 
 * @module CollisionHandlerTop
 */

/**
 * Represents the dimensions and scroll state of a container element.
 */
interface WithinElement {
  /** Whether the container is the window object */
  isWindow: boolean;
  /** Current vertical scroll position */
  scrollTop: number;
  /** Container offset position */
  offset: {
    top: number;
  };
  /** Container height */
  height: number;
}

/**
 * Position data for collision calculation.
 */
interface CollisionPosition {
  /** Top margin of the positioned element */
  marginTop: number;
}

/**
 * Configuration object for collision detection.
 */
interface CollisionOptions {
  /** Container element information */
  within: WithinElement;
  /** Current collision position data */
  collisionPosition: CollisionPosition;
  /** Height of the element being positioned */
  collisionHeight: number;
}

/**
 * Position object that will be modified by collision detection.
 */
interface Position {
  /** Vertical top position to be adjusted */
  top: number;
}

/**
 * Handles vertical collision detection and adjustment for "top" positioning.
 * Ensures the positioned element stays within the visible area of its container.
 * 
 * @param position - The position object to be modified
 * @param options - Collision detection configuration options
 */
declare function handleTopCollision(
  position: Position,
  options: CollisionOptions
): void;

/**
 * Helper function referenced but not defined in the original module.
 * Likely clamps or normalizes position values.
 * 
 * @param value1 - First comparison value
 * @param value2 - Second comparison value
 * @returns Adjusted position value
 */
declare function i(value1: number, value2: number): number;