/**
 * Proxyable Mixin Factory
 * Creates a Vue mixin that provides two-way data binding capabilities
 * by proxying a prop value through an internal state.
 */

import Vue, { VueConstructor } from 'vue';

/**
 * Configuration options for the proxyable mixin
 */
export interface ProxyableOptions {
  /** The name of the prop to proxy (default: 'value') */
  prop?: string;
  /** The name of the event to emit on changes (default: 'change') */
  event?: string;
}

/**
 * Data structure for the proxyable mixin instance
 */
export interface ProxyableData {
  /** Internal lazy value that stores the current state */
  internalLazyValue: any;
}

/**
 * Computed properties for the proxyable mixin
 */
export interface ProxyableComputed {
  /** 
   * Internal value getter/setter
   * Gets the current internal lazy value and emits events on changes
   */
  internalValue: any;
}

/**
 * Proxyable mixin instance type
 */
export interface ProxyableMixin extends Vue {
  /** Internal lazy value storage */
  internalLazyValue: any;
  /** Computed internal value with getter/setter */
  internalValue: any;
}

/**
 * Factory function to create a proxyable mixin
 * 
 * This mixin enables two-way binding by creating an internal state
 * that syncs with a prop and emits events when changed.
 * 
 * @param propName - The name of the prop to proxy (default: 'value')
 * @param eventName - The name of the event to emit on changes (default: 'change')
 * @returns A Vue mixin constructor with proxyable behavior
 * 
 * @example
 *