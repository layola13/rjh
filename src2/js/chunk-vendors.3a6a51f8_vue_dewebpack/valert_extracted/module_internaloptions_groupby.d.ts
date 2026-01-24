/**
 * Handles changes to the group-by configuration.
 * Emits an update event when the new groupBy value differs from the current one.
 * 
 * @param newValue - The new group-by value(s), can be a single string or array of strings
 * @param currentValue - The current group-by value(s) for comparison
 * @emits update:group-by - Emitted when groupBy changes, with normalized value based on current type
 */
function handleGroupByChange(
  newValue: string | string[],
  currentValue: string | string[]
): void {
  // Only emit update if values are not deeply equal
  if (!deepEqual(newValue, currentValue)) {
    // Normalize emitted value based on current groupBy type:
    // - If currently an array, emit the new value as-is
    // - If currently a single value, emit only the first element
    const normalizedValue = Array.isArray(this.groupBy) 
      ? newValue 
      : (Array.isArray(newValue) ? newValue[0] : newValue);
    
    this.$emit("update:group-by", normalizedValue);
  }
}

/**
 * Deep equality comparison utility
 * @param a - First value to compare
 * @param b - Second value to compare
 * @returns True if values are deeply equal, false otherwise
 */
declare function deepEqual(a: unknown, b: unknown): boolean;

/**
 * Vue component context interface for group-by functionality
 */
interface GroupByComponentContext {
  /** Current group-by configuration (single value or array) */
  groupBy: string | string[];
  
  /** Vue event emitter */
  $emit(event: "update:group-by", value: string | string[]): void;
}