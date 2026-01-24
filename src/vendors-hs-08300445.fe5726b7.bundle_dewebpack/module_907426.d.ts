/**
 * Tooltip/Popover placement configuration module.
 * Defines positioning strategies for UI overlays relative to target elements.
 */

/**
 * Overflow adjustment configuration.
 * Controls how the positioned element adjusts when it would overflow the viewport.
 */
export interface OverflowConfig {
  /**
   * Enable horizontal (X-axis) adjustment.
   * 1 = enabled, 0 = disabled
   */
  adjustX: 0 | 1;
  
  /**
   * Enable vertical (Y-axis) adjustment.
   * 1 = enabled, 0 = disabled
   */
  adjustY: 0 | 1;
}

/**
 * Offset tuple: [horizontal, vertical] in pixels.
 */
export type OffsetTuple = readonly [number, number];

/**
 * Alignment point codes used for positioning.
 * 
 * Format: [vertical][horizontal]
 * - Vertical: t (top), c (center), b (bottom)
 * - Horizontal: l (left), c (center), r (right)
 * 
 * Examples:
 * - "tl" = top-left
 * - "cr" = center-right
 * - "bc" = bottom-center
 */
export type AlignmentPoint = 
  | "tl" | "tc" | "tr"
  | "cl" | "cc" | "cr"
  | "bl" | "bc" | "br";

/**
 * Configuration for a single placement strategy.
 */
export interface PlacementConfig {
  /**
   * Alignment points: [elementPoint, targetPoint].
   * Defines which point of the element aligns with which point of the target.
   */
  points: readonly [AlignmentPoint, AlignmentPoint];
  
  /**
   * Overflow adjustment behavior when element extends beyond viewport.
   */
  overflow: OverflowConfig;
  
  /**
   * Position offset from the calculated alignment point [x, y] in pixels.
   */
  offset: OffsetTuple;
  
  /**
   * Additional offset applied to the target element [x, y] in pixels.
   */
  targetOffset: OffsetTuple;
}

/**
 * All available placement positions for tooltips/popovers.
 */
export type PlacementType =
  | "left" | "right" | "top" | "bottom"
  | "topLeft" | "topRight" | "bottomLeft" | "bottomRight"
  | "leftTop" | "leftBottom" | "rightTop" | "rightBottom";

/**
 * Complete mapping of placement names to their configuration.
 */
export type PlacementsConfig = Record<PlacementType, PlacementConfig>;

/**
 * Predefined placement configurations for positioning elements relative to a target.
 * 
 * Includes 12 standard positions:
 * - Cardinal directions: top, right, bottom, left
 * - Corner alignments: topLeft, topRight, bottomLeft, bottomRight
 * - Edge alignments: leftTop, leftBottom, rightTop, rightBottom
 * 
 * @example
 *