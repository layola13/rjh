/**
 * Group description update handler for Vue component
 * 
 * Compares the new group description with the current one and emits an update event if they differ.
 * Handles both single and array group description formats.
 * 
 * @module module_internalOptions_groupDesc
 * @original-id internalOptions.groupDesc
 */

/**
 * Deep equality comparison utility
 */
interface DeepEqualUtil {
  /**
   * Performs deep equality comparison between two values
   * @param a - First value to compare
   * @param b - Second value to compare
   * @returns True if values are deeply equal, false otherwise
   */
  deepEqual<T>(a: T, b: T): boolean;
}

/**
 * Group description value type - can be a single item or an array
 */
type GroupDescValue<T = unknown> = T | T[];

/**
 * Vue component instance with group-desc functionality
 */
interface GroupDescComponent<T = unknown> {
  /**
   * Current group description value
   */
  groupDesc: GroupDescValue<T>;

  /**
   * Emits Vue component events
   * @param event - Event name
   * @param payload - Event payload
   */
  $emit(event: string, payload: unknown): void;

  /**
   * Handles group description updates
   * 
   * Compares the new description value with the current one using deep equality.
   * If different, emits an 'update:group-desc' event with the appropriate format:
   * - If groupDesc is an array, emits the new value as-is
   * - If groupDesc is a single value, emits only the first element of the new value
   * 
   * @param this - Component instance context
   * @param newValue - New group description value to be set
   * @param currentValue - Current group description value for comparison
   */
  handleGroupDescUpdate(
    this: GroupDescComponent<T>,
    newValue: GroupDescValue<T>,
    currentValue: GroupDescValue<T>
  ): void;
}

/**
 * Group description update handler implementation
 * 
 * @param newValue - New group description value
 * @param currentValue - Current group description value for comparison
 */
declare function handleGroupDescUpdate<T = unknown>(
  this: GroupDescComponent<T>,
  newValue: GroupDescValue<T>,
  currentValue: GroupDescValue<T>
): void;

export { GroupDescComponent, GroupDescValue, DeepEqualUtil, handleGroupDescUpdate };