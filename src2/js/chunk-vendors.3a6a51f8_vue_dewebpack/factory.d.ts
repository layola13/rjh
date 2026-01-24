/**
 * Groupable mixin factory for creating components that can be part of a group
 * @module mixins/groupable
 */

import { inject } from '../registrable';
import Vue, { VueConstructor } from 'vue';

/**
 * Options for a groupable component instance
 */
interface GroupableData {
  /** Whether this item is currently active in the group */
  isActive: boolean;
}

/**
 * Props interface for groupable components
 */
interface GroupableProps {
  /** CSS class to apply when the item is active */
  activeClass?: string;
  /** Whether the item is disabled */
  disabled: boolean;
}

/**
 * Computed properties for groupable components
 */
interface GroupableComputed {
  /** CSS classes to apply based on active state */
  groupClasses: Record<string, boolean>;
}

/**
 * Methods available on groupable components
 */
interface GroupableMethods {
  /** Toggle the item's state and emit a change event */
  toggle(): void;
}

/**
 * Parent group interface that manages groupable items
 */
interface GroupProvider {
  /** CSS class to apply to active items */
  activeClass?: string;
  /** Register a child item with the group */
  register(item: Vue): void;
  /** Unregister a child item from the group */
  unregister(item: Vue): void;
}

/**
 * Creates a mixin that makes a component groupable (able to be part of a group)
 * 
 * @param groupName - The property name used to inject the parent group (e.g., 'itemGroup')
 * @param itemName - The property name used by the parent to track items
 * @param childMixinName - Optional name for the child mixin
 * @returns A Vue mixin that adds groupable functionality
 * 
 * @example
 *