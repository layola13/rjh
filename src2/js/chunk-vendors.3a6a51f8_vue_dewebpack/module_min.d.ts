/**
 * Emits an input event when the provided value is greater than the internal value.
 * This function is typically used in Vue.js components for handling numeric input validation.
 * 
 * @param value - The numeric value to compare (accepts number or string that can be parsed to float)
 * @returns void - No return value, only emits an event
 * 
 * @remarks
 * - The function parses the input value to a float
 * - Compares it with `this.internalValue`
 * - Emits an "input" event with the parsed value if it's greater
 * 
 * @module module_min
 * @originalId min
 */
declare function handleMinimumValue(this: {
  /**
   * The current internal numeric value used for comparison
   */
  internalValue: number;
  
  /**
   * Vue.js $emit method for triggering events
   * @param eventName - The name of the event to emit
   * @param value - The value to pass with the event
   */
  $emit(eventName: string, value: number): void;
}, value: string | number): void;

export default handleMinimumValue;