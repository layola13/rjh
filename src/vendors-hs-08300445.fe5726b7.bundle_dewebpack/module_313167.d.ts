/**
 * Alignment utility functions for popup placement
 * @module AlignmentUtils
 */

/**
 * Alignment configuration object
 */
export interface AlignConfig {
  /** Alignment points tuple [targetPoint, popupPoint] */
  points?: readonly [string, string];
  /** Additional alignment offset */
  offset?: readonly [number, number];
  /** Target offset */
  targetOffset?: readonly [number, number];
  /** Overflow adjustment configuration */
  overflow?: {
    adjustX?: boolean;
    adjustY?: boolean;
  };
  /** Use CSS right property */
  useCssRight?: boolean;
  /** Use CSS bottom property */
  useCssBottom?: boolean;
  /** Use CSS transform property */
  useCssTransform?: boolean;
  [key: string]: unknown;
}

/**
 * Placement to alignment configuration mapping
 */
export interface PlacementAlignMap {
  [placement: string]: AlignConfig;
}

/**
 * Get alignment configuration for a specific placement
 * Merges the base alignment config from placement map with additional overrides
 * 
 * @param placementAlignMap - Map of placement names to alignment configurations
 * @param placement - The placement key to retrieve alignment for
 * @param additionalAlign - Additional alignment config to merge
 * @returns Merged alignment configuration
 */
export declare function getAlignFromPlacement(
  placementAlignMap: PlacementAlignMap,
  placement: string,
  additionalAlign?: Partial<AlignConfig>
): AlignConfig;

/**
 * Get the CSS class name for the aligned popup based on its placement
 * Matches alignment points to determine the correct placement class
 * 
 * @param placementAlignMap - Map of placement names to alignment configurations
 * @param prefixCls - CSS class prefix
 * @param currentAlign - Current alignment configuration
 * @param matchAxisOnly - If true, only match the first point (axis), otherwise match both points
 * @returns CSS class name in format "{prefixCls}-placement-{placement}" or empty string if no match
 */
export declare function getAlignPopupClassName(
  placementAlignMap: PlacementAlignMap,
  prefixCls: string,
  currentAlign: AlignConfig,
  matchAxisOnly?: boolean
): string;