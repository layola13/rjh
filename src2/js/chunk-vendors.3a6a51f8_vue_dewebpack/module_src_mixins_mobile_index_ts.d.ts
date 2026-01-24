import Vue from 'vue';

/**
 * Mobile mixin for responsive breakpoint handling
 * Provides computed property to determine if current viewport is mobile
 */
export interface MobileMixin extends Vue {
  /** The breakpoint threshold for mobile detection */
  mobileBreakpoint: number | string;
  
  /** Computed property that returns true when viewport is considered mobile */
  readonly isMobile: boolean;
  
  /** Vuetify instance with breakpoint utilities */
  $vuetify: {
    breakpoint: {
      /** Default mobile breakpoint from Vuetify configuration */
      mobileBreakpoint: number | string;
      /** Whether current viewport matches Vuetify's mobile detection */
      mobile: boolean;
      /** Current viewport width in pixels */
      width: number;
      /** Current breakpoint name (xs, sm, md, lg, xl) */
      name: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    };
  };
}

/**
 * Props definition for mobile mixin
 */
export interface MobileMixinProps {
  /**
   * Breakpoint threshold for mobile detection
   * Can be a pixel value (number) or breakpoint name (xs, sm, md, lg, xl)
   * @default Uses $vuetify.breakpoint.mobileBreakpoint if available
   */
  mobileBreakpoint?: number | string;
}

/**
 * Mobile breakpoint mixin
 * Provides responsive mobile detection based on configurable breakpoints
 * 
 * @example
 *