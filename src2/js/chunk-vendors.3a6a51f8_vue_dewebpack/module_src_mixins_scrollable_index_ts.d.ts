import { VueConstructor } from 'vue';
import { DirectiveOptions } from 'vue/types/options';

/**
 * Scrollable mixin interface
 * Provides scroll tracking and threshold detection functionality
 */
export interface ScrollableMixin {
  /** Target CSS selector for scroll container */
  scrollTarget?: string;
  /** Scroll distance threshold to trigger events (in pixels) */
  scrollThreshold?: string | number;
  
  /** Current scroll position */
  currentScroll: number;
  /** Current distance from threshold */
  currentThreshold: number;
  /** Whether the scrollable component is active */
  isActive: boolean;
  /** Whether user is currently scrolling upward */
  isScrollingUp: boolean;
  /** Previous scroll position for comparison */
  previousScroll: number;
  /** Saved scroll position when state changes */
  savedScroll: number;
  /** DOM element reference for scroll target */
  target: HTMLElement | null;
  
  /** Whether scrolling is supported in current environment */
  readonly canScroll: boolean;
  /** Computed numeric threshold value (default: 300) */
  readonly computedScrollThreshold: number;
  
  /**
   * Scroll event handler
   * Updates scroll position and determines scroll direction
   */
  onScroll(): void;
  
  /**
   * Called when scroll threshold is exceeded
   * Override this method to implement custom threshold behavior
   */
  thresholdMet(): void;
}

/**
 * Scrollable mixin
 * Adds scroll tracking, direction detection, and threshold-based event handling
 * 
 * @example
 *