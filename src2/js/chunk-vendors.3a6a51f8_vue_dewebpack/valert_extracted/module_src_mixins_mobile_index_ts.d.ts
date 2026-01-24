import Vue, { VueConstructor } from 'vue';

/**
 * Breakpoint name type representing Vuetify's responsive breakpoints
 */
export type BreakpointName = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/**
 * Mobile breakpoint value - either a pixel width or breakpoint name
 */
export type MobileBreakpointValue = number | BreakpointName;

/**
 * Vuetify breakpoint object structure
 */
export interface VuetifyBreakpoint {
  /** Current responsive breakpoint name */
  name: BreakpointName;
  /** Current viewport width in pixels */
  width: number;
  /** Whether current viewport is considered mobile */
  mobile: boolean;
  /** Default mobile breakpoint threshold */
  mobileBreakpoint: MobileBreakpointValue;
  /** Breakpoint thresholds configuration */
  thresholds: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
}

/**
 * Vuetify instance interface
 */
export interface VuetifyInstance {
  breakpoint: VuetifyBreakpoint;
}

/**
 * Mobile mixin props interface
 */
export interface MobileMixinProps {
  /**
   * Custom mobile breakpoint threshold
   * Can be a pixel value (e.g. 960) or breakpoint name (e.g. 'md')
   * @default Uses $vuetify.breakpoint.mobileBreakpoint if available
   */
  mobileBreakpoint?: MobileBreakpointValue;
}

/**
 * Mobile mixin computed properties
 */
export interface MobileMixinComputed {
  /**
   * Whether the current viewport is considered mobile based on the mobileBreakpoint
   * @returns true if viewport width is below the mobile breakpoint threshold
   */
  isMobile: boolean;
}

/**
 * Mobile mixin component instance
 */
export interface MobileMixin extends Vue {
  /** Vuetify instance */
  $vuetify: VuetifyInstance;
  /** Mobile breakpoint prop */
  mobileBreakpoint?: MobileBreakpointValue;
  /** Computed mobile state */
  readonly isMobile: boolean;
}

/**
 * Mobile mixin for detecting mobile viewport state
 * 
 * Provides reactive mobile detection based on viewport width or breakpoint names.
 * Integrates with Vuetify's breakpoint system.
 * 
 * @example
 *