/**
 * Position collision detection module for "top" axis
 * Adjusts element position to keep it within viewport boundaries
 * @module CollisionTop
 */

/**
 * Position data including element coordinates and dimensions
 */
interface PositionData {
  /** Current top position of the element */
  top: number;
  /** Height of the element being positioned */
  collisionHeight: number;
  /** Position data for collision calculations */
  collisionPosition: {
    /** Top margin of the element */
    marginTop: number;
  };
}

/**
 * Container/viewport information for collision detection
 */
interface WithinContainer {
  /** Whether the container is the window object */
  isWindow: boolean;
  /** Current scroll position (for window) or undefined */
  scrollTop?: number;
  /** Container offset from document top */
  offset: {
    top: number;
  };
  /** Height of the container/viewport */
  height: number;
}

/**
 * Options for collision detection calculation
 */
interface CollisionOptions {
  /** Container within which the element should be positioned */
  within: WithinContainer;
  /** Height of the within container (redundant with within.height) */
  height: number;
  /** Height of the element being positioned */
  collisionHeight: number;
  /** Position data for margin calculations */
  collisionPosition: {
    marginTop: number;
  };
}

/**
 * Adjusts element position to handle "top" axis collision with container boundaries
 * Ensures the element stays visible within the viewport by repositioning it when overflow occurs
 * 
 * @param position - Mutable position object to be adjusted
 * @param options - Configuration including container bounds and element dimensions
 */
export declare function handleTopCollision(
  position: PositionData,
  options: CollisionOptions
): void;

/**
 * Utility function to clamp a value between two bounds
 * Returns the value closest to the target within the given range
 * 
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @returns The clamped value
 */
declare function clamp(min: number, max: number): number;