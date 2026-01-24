/**
 * Alignment configuration for positioning elements relative to a target.
 * Commonly used in dropdown menus, tooltips, and popovers.
 */

/**
 * Point alignment tuple representing source and target alignment positions.
 * Format: [sourcePoint, targetPoint]
 * 
 * Possible values:
 * - 'tl': top-left
 * - 'tr': top-right
 * - 'bl': bottom-left
 * - 'br': bottom-right
 */
type AlignmentPoint = 'tl' | 'tr' | 'bl' | 'br';

/**
 * Offset configuration for adjusting element position.
 * Format: [horizontal, vertical] in pixels
 */
type AlignmentOffset = [number, number];

/**
 * Overflow adjustment configuration.
 * Controls how the element adjusts when it exceeds viewport boundaries.
 */
interface OverflowConfig {
  /**
   * Whether to adjust horizontal position when overflowing.
   * 1 = enabled, 0 = disabled
   */
  adjustX: 0 | 1;
  
  /**
   * Whether to adjust vertical position when overflowing.
   * 1 = enabled, 0 = disabled
   */
  adjustY: 0 | 1;
}

/**
 * Configuration for a single alignment strategy.
 */
interface AlignmentConfig {
  /**
   * Alignment points: [source element point, target element point]
   */
  points: [AlignmentPoint, AlignmentPoint];
  
  /**
   * Position offset: [horizontal offset, vertical offset] in pixels
   */
  offset: AlignmentOffset;
  
  /**
   * Overflow adjustment behavior
   */
  overflow: OverflowConfig;
}

/**
 * Complete alignment configuration object containing predefined alignment strategies.
 * Used for positioning UI elements relative to their targets.
 */
interface AlignmentPresets {
  /**
   * Align element to bottom-left of target.
   * Source top-left aligns with target bottom-left.
   */
  bottomLeft: AlignmentConfig;
  
  /**
   * Align element to top-left of target.
   * Source bottom-left aligns with target top-left.
   */
  topLeft: AlignmentConfig;
  
  /**
   * Align element to bottom-right of target.
   * Source top-right aligns with target bottom-right.
   */
  bottomRight: AlignmentConfig;
  
  /**
   * Align element to top-right of target.
   * Source bottom-right aligns with target top-right.
   */
  topRight: AlignmentConfig;
}

/**
 * Default alignment presets for common positioning scenarios.
 * Includes 4px vertical spacing and automatic overflow adjustment.
 */
declare const alignmentPresets: AlignmentPresets;

export default alignmentPresets;