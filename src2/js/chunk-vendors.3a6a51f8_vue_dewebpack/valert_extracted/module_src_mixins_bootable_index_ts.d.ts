/**
 * Bootable mixin for Vue components
 * Provides lazy content rendering functionality with eager loading option
 * 
 * @module Bootable
 */

import Vue from 'vue';

/**
 * Props interface for Bootable mixin
 */
export interface BootableProps {
  /**
   * Whether to render content immediately without waiting for isActive
   * @default false
   */
  eager: boolean;
}

/**
 * Data interface for Bootable mixin
 */
export interface BootableData {
  /**
   * Indicates if component has been activated at least once
   * Used to preserve rendered content after initial activation
   */
  isBooted: boolean;
}

/**
 * Computed properties interface for Bootable mixin
 */
export interface BootableComputed {
  /**
   * Determines if content should be rendered
   * Returns true if component is booted, eager, or currently active
   */
  hasContent: boolean;
}

/**
 * Methods interface for Bootable mixin
 */
export interface BootableMethods {
  /**
   * Conditionally renders lazy content based on hasContent state
   * 
   * @param contentRenderer - Optional function that returns VNode array
   * @returns VNode array - either rendered content or empty placeholder
   */
  showLazyContent(contentRenderer?: () => Vue.VNode[]): Vue.VNode[];
}

/**
 * Complete Bootable mixin type definition
 * Combines props, data, computed properties and methods
 */
declare const Bootable: Vue.VueConstructor<
  Vue & BootableData & BootableComputed & BootableMethods & BootableProps
>;

export default Bootable;