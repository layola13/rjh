/**
 * Breakpoint service for responsive layout detection
 * Monitors viewport dimensions and provides breakpoint state information
 */

/**
 * Breakpoint threshold configuration
 */
export interface BreakpointThresholds {
  /** Extra small breakpoint threshold (default: 600px) */
  xs: number;
  /** Small breakpoint threshold (default: 960px) */
  sm: number;
  /** Medium breakpoint threshold (default: 1264px) */
  md: number;
  /** Large breakpoint threshold (default: 1904px) */
  lg: number;
  /** Extra large breakpoint threshold */
  xl: number;
}

/**
 * Mobile breakpoint configuration type
 * Can be a specific breakpoint name or a numeric pixel value
 */
export type MobileBreakpoint = keyof BreakpointThresholds | number;

/**
 * Breakpoint service configuration options
 */
export interface BreakpointOptions {
  breakpoint: {
    /** Mobile breakpoint threshold configuration */
    mobileBreakpoint: MobileBreakpoint;
    /** Scrollbar width for offset calculations (default: 16px) */
    scrollBarWidth: number;
    /** Breakpoint threshold values */
    thresholds: BreakpointThresholds;
  };
}

/**
 * Breakpoint service for responsive design
 * Tracks viewport size and provides breakpoint state flags
 * 
 * @example
 *