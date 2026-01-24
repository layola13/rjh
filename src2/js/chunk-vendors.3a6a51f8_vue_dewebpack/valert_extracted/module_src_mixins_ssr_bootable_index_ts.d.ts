import Vue from 'vue';

/**
 * SSR Bootable Mixin
 * 
 * A Vue mixin that handles server-side rendering (SSR) boot state.
 * This mixin tracks when a component has been fully mounted and booted on the client side,
 * which is useful for progressive enhancement and avoiding hydration mismatches.
 */
export interface SSRBootable extends Vue {
  /**
   * Indicates whether the component has completed its client-side boot process.
   * Initially false, becomes true after the first animation frame post-mount.
   */
  isBooted: boolean;
}

/**
 * SSR Bootable Mixin
 * 
 * Provides functionality to track component boot state after SSR hydration.
 * Sets `isBooted` to true and adds a `data-booted="true"` attribute to the root element
 * after the component is mounted on the client side.
 * 
 * @example
 *