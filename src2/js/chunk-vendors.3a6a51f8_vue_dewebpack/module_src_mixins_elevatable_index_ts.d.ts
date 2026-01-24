/**
 * Elevatable mixin module
 * Provides elevation functionality for Vuetify components
 * Original source: ./src/mixins/elevatable/index.ts
 */

import Vue, { VueConstructor } from 'vue';

/**
 * Props interface for the Elevatable mixin
 */
export interface ElevatableProps {
  /**
   * Designates an elevation applied to the component between 0 and 24.
   * You can find more information on the elevation page.
   */
  elevation?: number | string;
}

/**
 * Computed properties interface for the Elevatable mixin
 */
export interface ElevatableComputed {
  /**
   * Computed elevation value from props
   * @returns The elevation value or undefined
   */
  computedElevation: number | string | undefined;

  /**
   * Generates elevation classes based on the computed elevation value
   * @returns Object containing elevation CSS class names
   */
  elevationClasses: Record<string, boolean>;
}

/**
 * Elevatable mixin interface
 * Combines props and computed properties
 */
export interface Elevatable extends Vue {
  elevation?: number | string;
  computedElevation: number | string | undefined;
  elevationClasses: Record<string, boolean>;
}

/**
 * Elevatable mixin
 * Adds elevation (shadow depth) functionality to components
 */
declare const Elevatable: VueConstructor<
  Vue & ElevatableProps & ElevatableComputed
>;

export default Elevatable;