/**
 * Hook for managing sticky header behavior in tables or lists
 * @module useStickyOffsets
 */

/**
 * Configuration options for sticky header behavior
 */
interface StickyOffsetOptions {
  /**
   * Offset from the top of the viewport for the sticky header (in pixels)
   * @default 0
   */
  offsetHeader?: number;

  /**
   * Offset for scroll position calculations (in pixels)
   * @default 0
   */
  offsetScroll?: number;

  /**
   * Function that returns the container element for sticky positioning
   * @default () => window
   */
  getContainer?: () => HTMLElement | Window | null;
}

/**
 * Return value from the useStickyOffsets hook
 */
interface StickyOffsetResult {
  /**
   * Whether sticky positioning is enabled
   */
  isSticky: boolean;

  /**
   * CSS class name to apply when sticky header is active
   */
  stickyClassName: string;

  /**
   * Offset from the top of the viewport (in pixels)
   */
  offsetHeader: number;

  /**
   * Scroll offset for calculations (in pixels)
   */
  offsetScroll: number;

  /**
   * The container element for sticky positioning
   */
  container: HTMLElement | Window | null;
}

/**
 * Custom React hook for calculating sticky header offsets and configuration
 * 
 * @param options - Configuration options (boolean for simple enable/disable, or object for detailed config)
 * @param prefixCls - CSS class prefix for generating sticky class names
 * @returns Sticky header configuration object
 * 
 * @example
 *