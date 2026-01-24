/**
 * Returnable Mixin
 * 
 * A Vue mixin that provides functionality for managing and restoring return values.
 * Useful for components that need to track original values and restore them when deactivated.
 * 
 * @module Returnable
 */

import Vue from 'vue';

/**
 * Props interface for the Returnable mixin
 */
interface ReturnableProps {
  /**
   * The value that can be returned/restored
   * Accepts any type of value
   */
  returnValue: any;
}

/**
 * Data interface for the Returnable mixin
 */
interface ReturnableData {
  /**
   * Indicates whether the component is currently active
   */
  isActive: boolean;
  
  /**
   * Stores the original value before any modifications
   */
  originalValue: any;
}

/**
 * Methods interface for the Returnable mixin
 */
interface ReturnableMethods {
  /**
   * Saves the provided value and deactivates the component asynchronously
   * 
   * @param value - The value to be saved as the original value
   */
  save(value: any): void;
}

/**
 * Computed properties interface for the Returnable mixin
 */
interface ReturnableComputed {}

/**
 * Returnable Mixin Declaration
 * 
 * Provides state management for return values with activation tracking.
 * When activated, stores the current returnValue. When deactivated, 
 * emits an event to restore the original value.
 */
declare const Returnable: Vue.VueConstructor<
  Vue & ReturnableData & ReturnableMethods & ReturnableComputed
> & {
  props: {
    returnValue: {
      type: null;
      default: null;
    };
  };
};

export default Returnable;

/**
 * Usage Example:
 * 
 * @example
 *