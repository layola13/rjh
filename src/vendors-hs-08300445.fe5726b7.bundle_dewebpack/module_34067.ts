/**
 * Tooltip placement configuration for positioning UI elements relative to their targets.
 * Defines alignment points, overflow behavior, and offset values for various positions.
 */

/**
 * Overflow adjustment configuration.
 * Controls how the element adjusts its position when it overflows the viewport.
 */
interface OverflowConfig {
  /** Enable horizontal adjustment (1 = enabled, 0 = disabled) */
  adjustX: 1 | 0;
  /** Enable vertical adjustment (1 = enabled, 0 = disabled) */
  adjustY: 1 | 0;
}

/**
 * Offset tuple representing [horizontal, vertical] pixel offsets.
 */
type Offset = [number, number];

/**
 * Alignment point codes:
 * - 't' = top, 'b' = bottom, 'c' = center
 * - 'l' = left, 'r' = right
 * Combined as: 'tl' (top-left), 'bc' (bottom-center), etc.
 */
type AlignmentPoint = 'tl' | 'tc' | 'tr' | 'bl' | 'bc' | 'br';

/**
 * Configuration for a single placement position.
 */
interface PlacementConfig {
  /** 
   * Alignment points [source, target].
   * First point is on the popup element, second is on the target element.
   */
  points: [AlignmentPoint, AlignmentPoint];
  
  /** Overflow adjustment behavior */
  overflow: OverflowConfig;
  
  /** Offset from the calculated position [x, y] */
  offset: Offset;
  
  /** Additional offset applied to the target element [x, y] */
  targetOffset: Offset;
}

/**
 * Complete set of placement configurations for all supported positions.
 */
interface PlacementConfigs {
  /** Position at top-left relative to target */
  topLeft: PlacementConfig;
  
  /** Position at top-center relative to target */
  topCenter: PlacementConfig;
  
  /** Position at top-right relative to target */
  topRight: PlacementConfig;
  
  /** Position at bottom-left relative to target */
  bottomLeft: PlacementConfig;
  
  /** Position at bottom-center relative to target */
  bottomCenter: PlacementConfig;
  
  /** Position at bottom-right relative to target */
  bottomRight: PlacementConfig;
}

/**
 * Default placement configurations for tooltip/popover positioning.
 * Includes 6 standard positions with consistent overflow handling and spacing.
 */
declare const placements: PlacementConfigs;

export default placements;