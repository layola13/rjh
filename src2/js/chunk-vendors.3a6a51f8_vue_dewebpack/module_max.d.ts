/**
 * Module: module_max
 * Handles maximum value validation for input fields
 */

/**
 * Validates and updates the internal value if the new value is less than current value
 * @param value - The new value to validate (will be parsed as float)
 * @emits input - Emits the new value if it's less than the current internal value
 */
declare function handleMaxValue(value: string | number): void;

/**
 * Component context interface for max value handler
 */
interface MaxValueContext {
  /** The current internal value to compare against */
  internalValue: number;
  
  /**
   * Emits an event to the parent component
   * @param event - Event name
   * @param value - Value to emit
   */
  $emit(event: 'input', value: number): void;
}

/**
 * Max value handler bound to component context
 */
type MaxValueHandler = (this: MaxValueContext, value: string | number) => void;