/**
 * Roundable mixin for Vue components
 * Provides rounded corner styling functionality through computed classes
 */

import Vue, { VueConstructor } from 'vue';

/**
 * Props interface for the Roundable mixin
 */
interface RoundableProps {
  /**
   * Controls rounded corners styling
   * - true: applies default rounded class
   * - string: applies specific rounded variants (e.g., "t-lg b-sm")
   * - false: no rounding applied
   */
  rounded?: boolean | string;
  
  /**
   * When true, removes all rounded corners (sets rounded-0)
   */
  tile?: boolean;
}

/**
 * Computed properties interface for the Roundable mixin
 */
interface RoundableComputed {
  /**
   * Computed classes object for rounded corners
   * Generates appropriate CSS classes based on rounded and tile props
   * @returns Object with class names as keys and true as values
   */
  roundedClasses: Record<string, boolean>;
}

/**
 * Vue mixin that adds rounded corner functionality to components
 * Supports multiple rounded variants and tile mode
 */
declare const Roundable: VueConstructor<
  Vue & RoundableProps & RoundableComputed
>;

export default Roundable;