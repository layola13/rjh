/**
 * VWindow component module
 * Provides a window/carousel container and window item components
 */

import type { Component } from 'vue';

/**
 * VWindow - A container component for creating slideable window/carousel interfaces
 * Manages transitions between multiple VWindowItem children
 */
export declare const VWindow: Component;

/**
 * VWindowItem - An individual item/slide within a VWindow container
 * Represents a single pane in the window carousel
 */
export declare const VWindowItem: Component;

/**
 * Default export containing Vuetify subcomponent registry
 */
declare const _default: {
  /**
   * Internal Vuetify subcomponents registry
   * Used by Vuetify's component resolution system
   */
  $_vuetify_subcomponents: {
    VWindow: Component;
    VWindowItem: Component;
  };
};

export default _default;