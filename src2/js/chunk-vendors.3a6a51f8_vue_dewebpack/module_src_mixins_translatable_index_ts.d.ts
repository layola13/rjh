/**
 * Translatable mixin for Vue components with parallax scrolling effect
 * Provides scroll-based translation calculations for creating parallax animations
 */

import Vue from 'vue';

/**
 * Data structure for the translatable mixin state
 */
interface TranslatableData {
  /** Offset from the top of the page to the element */
  elOffsetTop: number;
  /** Current parallax offset value */
  parallax: number;
  /** Maximum parallax distance based on image and container height difference */
  parallaxDist: number;
  /** Percentage of the element that has been scrolled (0-1) */
  percentScrolled: number;
  /** Current scroll position from the top of the page */
  scrollTop: number;
  /** Current window/viewport height */
  windowHeight: number;
  /** Scroll position of the bottom edge of the viewport */
  windowBottom: number;
}

/**
 * Props for the translatable mixin
 */
interface TranslatableProps {
  /** Height of the container element in pixels */
  height?: number;
}

/**
 * Computed properties for the translatable mixin
 */
interface TranslatableComputed {
  /** Calculated height of the image/content to be translated */
  imgHeight: number;
}

/**
 * Methods for the translatable mixin
 */
interface TranslatableMethods {
  /**
   * Calculates dimensions and scroll positions for parallax effect
   * Updates: scrollTop, parallaxDist, elOffsetTop, windowHeight, windowBottom
   */
  calcDimensions(): void;
  
  /**
   * Attaches scroll and resize event listeners to the window
   */
  listeners(): void;
  
  /**
   * Returns the height of the object to be translated
   * Must be implemented by the component using this mixin
   * @throws {Error} When not implemented by the consuming component
   */
  objHeight(): number;
  
  /**
   * Translates the element based on current scroll position
   * Calculates percentScrolled and parallax offset values
   */
  translate(): void;
}

/**
 * Vue mixin that provides parallax scrolling functionality
 * 
 * @example
 *