/**
 * Stackable mixin for managing z-index layers in Vue components
 * Provides functionality to stack elements (dialogs, menus, etc.) with proper z-index management
 */

import Vue from 'vue';

/**
 * Data structure for stackable component state
 */
interface StackableData {
  /** The HTML element to be stacked, if different from $refs.content */
  stackElement: HTMLElement | null;
  /** Elements to exclude when calculating max z-index */
  stackExclude: HTMLElement | null;
  /** Minimum z-index value for this stackable element */
  stackMinZIndex: number;
  /** Whether this stackable element is currently active */
  isActive: boolean;
}

/**
 * Computed properties for stackable component
 */
interface StackableComputed {
  /** 
   * Dynamically calculated z-index based on active state
   * Returns the current z-index or max z-index + 2 when active
   */
  activeZIndex: number | null;
}

/**
 * Methods for stackable component
 */
interface StackableMethods {
  /**
   * Calculate the maximum z-index among active menu/dialog content elements
   * @param exclude - Array of elements to exclude from z-index calculation
   * @returns The maximum z-index value found
   */
  getMaxZIndex(exclude?: HTMLElement[]): number;
}

/**
 * Stackable Vue mixin
 * Manages z-index stacking for overlays, dialogs, and menus
 * Ensures newly activated elements appear above existing ones
 */
declare const Stackable: Vue.VueConstructor<
  Vue & StackableData & StackableComputed & StackableMethods
>;

export default Stackable;