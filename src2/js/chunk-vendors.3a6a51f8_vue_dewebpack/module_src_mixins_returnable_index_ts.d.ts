/**
 * Returnable mixin for Vue components
 * Provides functionality to manage temporary values that can be reverted
 * @module Returnable
 */

import Vue from 'vue';

/**
 * Returnable mixin interface
 * Manages active state and original value restoration
 */
export interface ReturnableMixin extends Vue {
  /** Current return value passed from parent */
  returnValue: any;
  
  /** Whether the component is currently active */
  isActive: boolean;
  
  /** Stores the original value for restoration */
  originalValue: any | null;
  
  /**
   * Saves a value and deactivates the component
   * @param value - The value to save as original
   */
  save(value: any): void;
}

/**
 * Data structure returned by the mixin's data function
 */
export interface ReturnableData {
  /** Whether the component is currently active */
  isActive: boolean;
  
  /** Stores the original value for potential restoration */
  originalValue: any | null;
}

/**
 * Props definition for the Returnable mixin
 */
export interface ReturnableProps {
  /** Value that can be returned/reverted to original state */
  returnValue?: any;
}

/**
 * Returnable mixin
 * Provides save/revert functionality for component values
 */
declare const Returnable: ReturnableMixin;

export default Returnable;