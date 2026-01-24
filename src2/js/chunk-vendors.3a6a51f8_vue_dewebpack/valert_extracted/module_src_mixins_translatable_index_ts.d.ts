import type { PropType } from 'vue';

/**
 * Translatable mixin data interface
 * @description Manages parallax scrolling calculations and element positioning
 */
interface TranslatableData {
  /** The offset from the top of the page to the element */
  elOffsetTop: number;
  /** Current parallax offset value */
  parallax: number;
  /** Total distance available for parallax effect */
  parallaxDist: number;
  /** Percentage of element scrolled through viewport (0-1) */
  percentScrolled: number;
  /** Current scroll position from top of page */
  scrollTop: number;
  /** Current window/viewport height */
  windowHeight: number;
  /** Current bottom position of viewport (scrollTop + windowHeight) */
  windowBottom: number;
}

/**
 * Translatable mixin computed properties
 */
interface TranslatableComputed {
  /** Calculated image height from objHeight method */
  imgHeight: number;
}

/**
 * Translatable mixin methods
 */
interface TranslatableMethods {
  /**
   * Calculate and update element dimensions and scroll positions
   * @description Recalculates all positioning values based on current scroll and element position
   */
  calcDimensions(): void;

  /**
   * Attach scroll and resize event listeners to window
   */
  listeners(): void;

  /**
   * Get the object/image height for parallax calculations
   * @throws {Error} Must be implemented by component using this mixin
   * @returns The height of the parallax object
   */
  objHeight(): number;

  /**
   * Main translation function for parallax effect
   * @description Updates parallax position based on scroll percentage through viewport
   */
  translate(): void;
}

/**
 * Translatable mixin props
 */
interface TranslatableProps {
  /** Height of the container element for parallax calculation */
  height?: number;
}

/**
 * Vue mixin providing parallax scrolling functionality
 * @description Enables smooth parallax translation effects based on scroll position.
 * Components using this mixin must implement the `objHeight()` method.
 * 
 * @example
 *