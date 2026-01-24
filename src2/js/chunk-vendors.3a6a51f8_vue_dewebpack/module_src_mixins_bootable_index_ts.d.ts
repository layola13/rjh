/**
 * Bootable Mixin
 * 
 * A Vue mixin that provides lazy content rendering capabilities.
 * Components using this mixin can defer rendering their content until
 * they become active, improving initial load performance.
 * 
 * @module Bootable
 */

import Vue, { VNode, CreateElement } from 'vue';

/**
 * Data structure for the Bootable mixin
 */
interface BootableData {
  /**
   * Indicates whether the component has been booted (activated) at least once.
   * Once true, content will always be rendered even if component becomes inactive.
   */
  isBooted: boolean;
}

/**
 * Computed properties for the Bootable mixin
 */
interface BootableComputed {
  /**
   * Determines if the component should render its content.
   * Content is rendered if:
   * - Component has been booted before (isBooted)
   * - Eager loading is enabled
   * - Component is currently active
   */
  hasContent: boolean;
}

/**
 * Props for the Bootable mixin
 */
interface BootableProps {
  /**
   * When true, content is rendered immediately regardless of active state.
   * When false, content rendering is deferred until component becomes active.
   * @default false
   */
  eager: boolean;
}

/**
 * Methods for the Bootable mixin
 */
interface BootableMethods {
  /**
   * Conditionally renders lazy content based on hasContent state.
   * 
   * @param contentFn - Optional function that returns VNode array when invoked
   * @returns Array of VNodes - either from contentFn or empty placeholder
   * 
   * @example
   *