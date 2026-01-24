/**
 * Groupable mixin factory for creating components that can be part of a group
 * @module groupable
 */

/**
 * Props configuration for groupable components
 */
interface GroupableProps {
  /** CSS class to apply when the item is active */
  activeClass?: string;
  /** Whether the item is disabled */
  disabled?: boolean;
}

/**
 * Data structure for groupable component state
 */
interface GroupableData {
  /** Whether this item is currently active within its group */
  isActive: boolean;
}

/**
 * Computed properties returned by the groupable mixin
 */
interface GroupableComputed {
  /** CSS classes object for the group item */
  groupClasses: Record<string, boolean>;
}

/**
 * Methods provided by the groupable mixin
 */
interface GroupableMethods {
  /** Toggle the active state and emit change event */
  toggle(): void;
}

/**
 * Interface for the group parent component that manages groupable items
 */
interface GroupParent {
  /** CSS class to apply to active items */
  activeClass?: string;
  /** Register a groupable item with the group */
  register(item: unknown): void;
  /** Unregister a groupable item from the group */
  unregister(item: unknown): void;
}

/**
 * Vue component instance with groupable functionality
 */
interface GroupableInstance {
  /** Reference to the parent group component */
  [key: string]: GroupParent | unknown;
  /** Emit Vue events */
  $emit(event: string, ...args: unknown[]): void;
}

/**
 * Factory function to create a groupable mixin
 * 
 * @param groupName - The property name used to access the parent group (e.g., "itemGroup")
 * @param childName - Optional name for the child component type
 * @param namespace - Optional namespace for scoping
 * @returns A Vue mixin that adds groupable functionality to components
 * 
 * @example
 *