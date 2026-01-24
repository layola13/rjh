/**
 * SSR Bootable Mixin
 * 
 * A Vue mixin that handles server-side rendering (SSR) boot state.
 * After component mounting, it marks the component as booted using requestAnimationFrame
 * to ensure proper hydration timing.
 * 
 * @module SsrBootable
 */

import Vue from 'vue';

/**
 * Data structure for SSR bootable state
 */
interface SsrBootableData {
  /** Indicates whether the component has completed client-side boot */
  isBooted: boolean;
}

/**
 * SSR Bootable Mixin
 * 
 * Provides functionality to track and mark component boot state after SSR hydration.
 * Sets a data-booted attribute on the root element when the component is fully mounted.
 */
declare const SsrBootable: import('vue').VueConstructor<
  Vue & {
    /** Whether the component has finished booting on the client */
    isBooted: boolean;
  }
>;

export default SsrBootable;