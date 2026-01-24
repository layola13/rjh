/**
 * VWindow Component Module
 * Provides window/carousel container and item components for Vuetify
 */

import { VueConstructor } from 'vue';

/**
 * VWindow - Container component for creating sliding window transitions
 * Typically used for carousels, steppers, and tabbed content
 */
export declare const VWindow: VueConstructor;

/**
 * VWindowItem - Individual slide/panel within a VWindow container
 * Represents a single transition-able content panel
 */
export declare const VWindowItem: VueConstructor;

/**
 * Default export containing all VWindow subcomponents
 * Used for plugin registration in Vuetify
 */
declare const _default: {
  /**
   * Internal Vuetify property for registering child components
   * @internal
   */
  $_vuetify_subcomponents: {
    /** VWindow container component */
    VWindow: VueConstructor;
    /** VWindowItem slide component */
    VWindowItem: VueConstructor;
  };
};

export default _default;