/**
 * Module: module_update_options
 * Original ID: update:options
 * 
 * Checks if options have changed and emits an update event if they differ.
 * Commonly used in Vue.js components to sync prop changes with parent components.
 */

/**
 * External dependency for deep equality comparison
 */
interface DeepEqualUtility {
  /**
   * Performs deep equality comparison between two values
   * @param a - First value to compare
   * @param b - Second value to compare
   * @returns true if values are deeply equal, false otherwise
   */
  deepEqual<T>(a: T, b: T): boolean;
}

/**
 * Event emitter interface (typically Vue component instance)
 */
interface EventEmitter {
  /**
   * Emits a named event with optional payload
   * @param eventName - Name of the event to emit
   * @param payload - Data to send with the event
   */
  $emit(eventName: string, payload?: unknown): void;
}

/**
 * Options type - can be any serializable configuration object
 */
type Options = Record<string, unknown>;

/**
 * Updates component options if they have changed
 * @param currentOptions - Current options to check
 * @param previousOptions - Previous options to compare against
 * @returns false if options are equal (no update), otherwise emits event and returns result
 */
declare function updateOptions(
  currentOptions: Options,
  previousOptions: Options
): boolean | void;

export { updateOptions, Options, EventEmitter, DeepEqualUtility };