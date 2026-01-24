/**
 * Breakpoint service for responsive design
 * Monitors viewport dimensions and provides breakpoint state
 */

/**
 * Breakpoint threshold configuration
 */
export interface BreakpointThresholds {
  /** Extra small breakpoint (default: 600px) */
  xs: number;
  /** Small breakpoint (default: 960px) */
  sm: number;
  /** Medium breakpoint (default: 1264px) */
  md: number;
  /** Large breakpoint (default: 1904px) */
  lg: number;
  /** Extra large breakpoint */
  xl: number;
}

/**
 * Breakpoint configuration options
 */
export interface BreakpointOptions {
  /** Mobile breakpoint threshold (number or breakpoint name) */
  mobileBreakpoint: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Scrollbar width in pixels for accurate breakpoint calculation */
  scrollBarWidth: number;
  /** Breakpoint threshold values */
  thresholds: BreakpointThresholds;
}

/**
 * Service configuration containing breakpoint settings
 */
export interface ServiceConfig {
  breakpoint: BreakpointOptions;
}

/**
 * Base service class
 */
export declare class Service {
  constructor();
}

/**
 * Breakpoint service for responsive layout management
 * Tracks viewport size and provides reactive breakpoint state
 */
export declare class Breakpoint extends Service {
  /** Service property identifier */
  static readonly property: 'breakpoint';

  /** Current viewport height in pixels */
  height: number;
  
  /** Current viewport width in pixels */
  width: number;

  /** True when viewport is at xs breakpoint (< xs threshold) */
  xs: boolean;
  
  /** True when viewport is at sm breakpoint (>= xs, < sm threshold) */
  sm: boolean;
  
  /** True when viewport is at md breakpoint (>= sm, < md threshold) */
  md: boolean;
  
  /** True when viewport is at lg breakpoint (>= md, < lg threshold) */
  lg: boolean;
  
  /** True when viewport is at xl breakpoint (>= lg threshold) */
  xl: boolean;

  /** True only when at xs breakpoint */
  xsOnly: boolean;
  
  /** True only when at sm breakpoint */
  smOnly: boolean;
  
  /** True when at sm breakpoint or smaller */
  smAndDown: boolean;
  
  /** True when at sm breakpoint or larger */
  smAndUp: boolean;
  
  /** True only when at md breakpoint */
  mdOnly: boolean;
  
  /** True when at md breakpoint or smaller */
  mdAndDown: boolean;
  
  /** True when at md breakpoint or larger */
  mdAndUp: boolean;
  
  /** True only when at lg breakpoint */
  lgOnly: boolean;
  
  /** True when at lg breakpoint or smaller */
  lgAndDown: boolean;
  
  /** True when at lg breakpoint or larger */
  lgAndUp: boolean;
  
  /** True only when at xl breakpoint */
  xlOnly: boolean;

  /** Current breakpoint name ('xs' | 'sm' | 'md' | 'lg' | 'xl') */
  name: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /** True when viewport is considered mobile based on mobileBreakpoint setting */
  mobile: boolean;

  /** Mobile breakpoint threshold configuration */
  mobileBreakpoint: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /** Scrollbar width for breakpoint calculations */
  scrollBarWidth: number;
  
  /** Breakpoint threshold values */
  thresholds: BreakpointThresholds;

  /** Resize debounce timeout handle */
  resizeTimeout: number;

  /**
   * Creates a new Breakpoint service instance
   * @param config - Service configuration containing breakpoint options
   */
  constructor(config: ServiceConfig);

  /**
   * Initialize the breakpoint service
   * Sets up resize listener and performs initial update
   */
  init(): void;

  /**
   * Update breakpoint state based on current viewport dimensions
   * @param reset - If true, resets dimensions to 0 (used for SSR)
   */
  update(reset?: boolean): void;

  /**
   * Resize event handler with debouncing
   * Delays update call by 200ms to avoid excessive recalculation
   */
  onResize(): void;

  /**
   * Get current client viewport width
   * @returns Viewport width in pixels, or 0 if document is unavailable
   */
  getClientWidth(): number;

  /**
   * Get current client viewport height
   * @returns Viewport height in pixels, or 0 if document is unavailable
   */
  getClientHeight(): number;
}