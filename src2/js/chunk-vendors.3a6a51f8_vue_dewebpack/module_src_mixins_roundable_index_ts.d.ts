/**
 * Roundable Mixin
 * Provides rounded corner styling capabilities for Vue components
 */

import Vue, { VueConstructor } from 'vue';

/**
 * Props interface for the Roundable mixin
 */
interface RoundableProps {
  /**
   * Controls rounded corners styling
   * - Boolean: true enables default rounding, false disables
   * - String: space-separated values for specific corner rounding (e.g., "t-lg b-sm")
   */
  rounded?: boolean | string;
  
  /**
   * When true, removes all border radius (sharp corners)
   * Takes precedence over rounded prop
   */
  tile?: boolean;
}

/**
 * Computed properties interface for the Roundable mixin
 */
interface RoundableComputed {
  /**
   * Generates CSS class object for rounded corner styling
   * @returns Object with rounded classes as keys and true as values
   */
  roundedClasses(): Record<string, boolean>;
}

/**
 * Roundable Mixin Type
 */
type RoundableMixin = VueConstructor<Vue & RoundableProps & RoundableComputed>;

/**
 * Mixin that adds rounded corner styling functionality to components
 * 
 * @example
 *