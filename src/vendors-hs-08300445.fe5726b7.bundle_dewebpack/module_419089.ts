/**
 * Alignment configuration for positioning elements relative to their triggers.
 * Commonly used in dropdown, tooltip, and popover components.
 */

/**
 * Point alignment tuple
 * Format: [triggerPoint, targetPoint]
 * Points: 'tl' (top-left), 'tr' (top-right), 'bl' (bottom-left), 'br' (bottom-right)
 */
type AlignPoints = [string, string];

/**
 * Offset configuration [horizontal, vertical]
 */
type Offset = [number, number];

/**
 * Overflow adjustment configuration
 */
interface OverflowConfig {
  /** Whether to adjust horizontal position when overflow occurs */
  adjustX: 0 | 1;
  /** Whether to adjust vertical position when overflow occurs */
  adjustY: 0 | 1;
}

/**
 * Alignment configuration for a single position
 */
interface AlignConfig {
  /** Alignment points [triggerPoint, targetPoint] */
  points: AlignPoints;
  /** Position offset [horizontal, vertical] in pixels */
  offset: Offset;
  /** Overflow handling configuration */
  overflow: OverflowConfig;
}

/**
 * Complete alignment configuration object with predefined positions
 */
interface AlignmentConfig {
  /** Align target's top-left to trigger's bottom-left */
  bottomLeft: AlignConfig;
  /** Align target's bottom-left to trigger's top-left */
  topLeft: AlignConfig;
  /** Align target's top-right to trigger's bottom-right */
  bottomRight: AlignConfig;
  /** Align target's bottom-right to trigger's top-right */
  topRight: AlignConfig;
}

/**
 * Default alignment configurations for common positioning scenarios.
 * 
 * @example
 *