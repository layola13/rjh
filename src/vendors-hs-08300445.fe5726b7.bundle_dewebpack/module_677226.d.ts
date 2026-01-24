/**
 * Tooltip/Popover placement configuration presets
 * Defines alignment points, overflow behavior, and offset positioning for different placements
 */

/**
 * Overflow adjustment configuration
 * Controls how the tooltip adjusts its position when overflowing viewport boundaries
 */
interface OverflowConfig {
  /** Enable horizontal adjustment when overflowing */
  adjustX: 0 | 1;
  /** Enable vertical adjustment when overflowing */
  adjustY: 0 | 1;
}

/**
 * Offset tuple representing [horizontal, vertical] pixel offsets
 */
type Offset = [number, number];

/**
 * Alignment point identifiers
 * - t: top, b: bottom, c: center, l: left, r: right
 * - Examples: "tl" = top-left, "bc" = bottom-center, "tr" = top-right
 */
type AlignmentPoint = 
  | "tl" | "tc" | "tr"  // top-left, top-center, top-right
  | "bl" | "bc" | "br"  // bottom-left, bottom-center, bottom-right
  | "cl" | "cc" | "cr"; // center-left, center-center, center-right

/**
 * Placement configuration for a single positioning strategy
 */
interface PlacementConfig {
  /** 
   * Alignment points: [source point, target point]
   * First element: point on the popup element
   * Second element: point on the target element
   */
  points: [AlignmentPoint, AlignmentPoint];
  
  /** Overflow adjustment behavior */
  overflow: OverflowConfig;
  
  /** Pixel offset from the calculated position [x, y] */
  offset: Offset;
  
  /** Additional offset applied to the target element [x, y] */
  targetOffset: Offset;
}

/**
 * Complete placement configuration map
 * Maps placement names to their respective configuration objects
 */
interface PlacementConfigMap {
  /** Align popup's bottom-left to target's top-left */
  topLeft: PlacementConfig;
  
  /** Align popup's bottom-center to target's top-center */
  topCenter: PlacementConfig;
  
  /** Align popup's bottom-right to target's top-right */
  topRight: PlacementConfig;
  
  /** Align popup's top-left to target's bottom-left */
  bottomLeft: PlacementConfig;
  
  /** Align popup's top-center to target's bottom-center */
  bottomCenter: PlacementConfig;
  
  /** Align popup's top-right to target's bottom-right */
  bottomRight: PlacementConfig;
}

/**
 * Default placement configurations for tooltip/popover components
 * Provides 6 common placement strategies with 4px vertical spacing
 */
declare const placementConfigs: PlacementConfigMap;

export default placementConfigs;