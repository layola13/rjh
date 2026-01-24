/**
 * Tooltip/Popover placement configuration presets
 * Defines alignment points, overflow behavior, and offsets for various positioning options
 */

/**
 * Overflow adjustment configuration
 * Controls how the popup adjusts when it overflows the viewport
 */
interface OverflowConfig {
  /** Adjust horizontal position when overflow occurs */
  adjustX: 1 | 0;
  /** Adjust vertical position when overflow occurs */
  adjustY: 1 | 0;
}

/**
 * Offset tuple representing [horizontal, vertical] pixel offsets
 */
type OffsetTuple = [number, number];

/**
 * Alignment point identifier
 * - t: top, b: bottom, c: center
 * - l: left, r: right
 * Examples: "tl" = top-left, "bc" = bottom-center
 */
type AlignmentPoint = 
  | "tl" | "tc" | "tr"
  | "bl" | "bc" | "br"
  | "cl" | "cc" | "cr";

/**
 * Placement configuration for a single position
 */
interface PlacementConfig {
  /** [sourcePoint, targetPoint] alignment configuration */
  points: [AlignmentPoint, AlignmentPoint];
  /** Overflow adjustment behavior */
  overflow: OverflowConfig;
  /** Offset relative to the calculated position [x, y] */
  offset: OffsetTuple;
  /** Offset applied to the target element [x, y] */
  targetOffset: OffsetTuple;
}

/**
 * All available placement positions for tooltips/popovers
 */
interface PlacementPresets {
  /** Position above target, aligned to left edge */
  topLeft: PlacementConfig;
  /** Position above target, centered horizontally */
  topCenter: PlacementConfig;
  /** Position above target, aligned to right edge */
  topRight: PlacementConfig;
  /** Position below target, aligned to left edge */
  bottomLeft: PlacementConfig;
  /** Position below target, centered horizontally */
  bottomCenter: PlacementConfig;
  /** Position below target, aligned to right edge */
  bottomRight: PlacementConfig;
}

/**
 * Default placement configuration presets
 * Used by tooltip/popover components for consistent positioning
 */
declare const placementPresets: PlacementPresets;

export default placementPresets;