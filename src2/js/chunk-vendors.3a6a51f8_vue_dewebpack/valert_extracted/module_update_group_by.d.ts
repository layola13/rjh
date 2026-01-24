/**
 * Module: module_update_group_by
 * Original ID: update:group-by
 * 
 * Emits an update event for group-by changes.
 * Typically used in Vue.js components to notify parent components of grouping configuration changes.
 */

/**
 * Group-by configuration type
 * Represents how data should be grouped
 */
type GroupByValue = string | string[] | Record<string, unknown> | null | undefined;

/**
 * Event emitter interface for group-by updates
 */
interface GroupByEventEmitter {
  /**
   * Emits an event to update the group-by configuration
   * @param event - Event name, should be 'update:group-by'
   * @param value - The new group-by configuration value
   */
  $emit(event: 'update:group-by', value: GroupByValue): void;
}

/**
 * Updates the group-by configuration by emitting an event
 * 
 * @param emitter - Object with $emit method (typically a Vue component instance)
 * @param value - The new group-by value to emit
 * 
 * @example
 *