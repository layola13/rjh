/**
 * Internal options sort-by update handler
 * Compares new and old sort values and emits an update event when they differ
 * 
 * @module internalOptions.sortBy
 */

/**
 * Sort value type - can be a string identifier or a complex sort descriptor
 */
export type SortValue = string | SortDescriptor;

/**
 * Sort descriptor object for complex sorting configurations
 */
export interface SortDescriptor {
  /** The field name to sort by */
  key: string;
  /** Sort order: ascending or descending */
  order?: 'asc' | 'desc';
}

/**
 * Handler function that updates the sort-by property when values change
 * 
 * @param newValue - The new sort value(s) to apply
 * @param oldValue - The previous sort value(s)
 * 
 * @remarks
 * This function is typically used as a watcher callback in Vue components.
 * It performs a deep equality check before emitting an update event.
 * 
 * @example
 *