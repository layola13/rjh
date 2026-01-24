/**
 * Stackable Mixin
 * 
 * A Vue mixin that manages z-index stacking for overlays, dialogs, and menus.
 * Automatically calculates and applies appropriate z-index values to ensure
 * proper layering of active components.
 * 
 * @module Stackable
 */

import Vue from 'vue';

/**
 * Data structure for the Stackable mixin
 */
interface StackableData {
  /**
   * The DOM element to use for z-index calculations.
   * If null, falls back to this.$refs.content
   */
  stackElement: HTMLElement | null;

  /**
   * Array of elements to exclude from z-index calculations
   */
  stackExclude: HTMLElement | null;

  /**
   * Minimum z-index value to use as a baseline
   * @default 0
   */
  stackMinZIndex: number;

  /**
   * Whether the component is currently active/visible
   * @default false
   */
  isActive: boolean;
}

/**
 * Computed properties for the Stackable mixin
 */
interface StackableComputed {
  /**
   * Calculates the appropriate z-index for the active element.
   * 
   * When active: returns max z-index of all active overlays + 2
   * When inactive: returns the current z-index of the element
   * 
   * @returns The calculated z-index value, or 0 if running on server
   */
  activeZIndex: number;
}

/**
 * Methods for the Stackable mixin
 */
interface StackableMethods {
  /**
   * Finds the maximum z-index among all active menu and dialog content elements,
   * excluding specified elements.
   * 
   * @param excludeElements - Array of elements to exclude from the calculation
   * @returns The maximum z-index value found
   */
  getMaxZIndex(excludeElements?: HTMLElement[]): number;
}

/**
 * Stackable mixin type definition
 * 
 * Provides z-index management for overlay components like dialogs, menus, and modals.
 * Ensures proper stacking order by dynamically calculating z-index values based on
 * currently active overlay elements.
 * 
 * @example
 *