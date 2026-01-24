/**
 * Placement configuration for positioning elements relative to a target.
 * Commonly used in tooltips, popovers, dropdowns, and other overlay components.
 */

/**
 * Overflow adjustment configuration.
 * Determines how the element should adjust its position when it overflows the viewport.
 */
export interface OverflowConfig {
  /** Whether to adjust position on the X axis when overflow occurs (1 = enabled, 0 = disabled) */
  adjustX: 1 | 0;
  /** Whether to adjust position on the Y axis when overflow occurs (1 = enabled, 0 = disabled) */
  adjustY: 1 | 0;
}

/**
 * Offset tuple representing [horizontal, vertical] pixel offsets.
 */
export type Offset = [number, number];

/**
 * Alignment points for positioning.
 * Format: two-character string where:
 * - First character: horizontal alignment (t=top, c=center, b=bottom, l=left, r=right)
 * - Second character: vertical alignment (t=top, c=center, b=bottom, l=left, r=right)
 * 
 * Common combinations:
 * - 'tl': top-left, 'tc': top-center, 'tr': top-right
 * - 'cl': center-left, 'cr': center-right
 * - 'bl': bottom-left, 'bc': bottom-center, 'br': bottom-right
 */
export type AlignmentPoint = string;

/**
 * Configuration for a single placement option.
 */
export interface PlacementConfig {
  /** 
   * Alignment points: [sourcePoint, targetPoint]
   * The source element's point will align with the target element's point
   */
  points: [AlignmentPoint, AlignmentPoint];
  
  /** Overflow adjustment behavior */
  overflow: OverflowConfig;
  
  /** Pixel offset from the aligned position [x, y] */
  offset: Offset;
  
  /** Additional offset applied to the target element [x, y] */
  targetOffset: Offset;
}

/**
 * All available placement configurations.
 * Each placement defines how an element should be positioned relative to its target.
 */
export interface Placements {
  /** Position element to the left of target, center-aligned */
  left: PlacementConfig;
  
  /** Position element to the right of target, center-aligned */
  right: PlacementConfig;
  
  /** Position element above target, center-aligned */
  top: PlacementConfig;
  
  /** Position element below target, center-aligned */
  bottom: PlacementConfig;
  
  /** Position element above-left of target */
  topLeft: PlacementConfig;
  
  /** Position element to the left-top of target */
  leftTop: PlacementConfig;
  
  /** Position element above-right of target */
  topRight: PlacementConfig;
  
  /** Position element to the right-top of target */
  rightTop: PlacementConfig;
  
  /** Position element below-right of target */
  bottomRight: PlacementConfig;
  
  /** Position element to the right-bottom of target */
  rightBottom: PlacementConfig;
  
  /** Position element below-left of target */
  bottomLeft: PlacementConfig;
  
  /** Position element to the left-bottom of target */
  leftBottom: PlacementConfig;
}

/**
 * Predefined placement configurations for all common positioning scenarios.
 * @public
 */
export const placements: Placements;

/**
 * Default export of all placement configurations.
 * @public
 */
export default placements;