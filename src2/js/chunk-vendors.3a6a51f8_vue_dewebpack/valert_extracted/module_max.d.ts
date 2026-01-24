/**
 * Module: module_max
 * Original ID: max
 * 
 * Validates and emits a value if it's less than the internal maximum value.
 * Typically used in form components for maximum value validation.
 */

/**
 * Validates input against maximum value constraint
 * @param value - The numeric value to validate (string or number)
 * @emits input - Emitted with the parsed value when it's less than internalValue
 */
declare function validateMax(value: string | number): void;

/**
 * Component interface with max validation capability
 */
interface MaxValidationComponent {
  /**
   * Internal maximum value threshold
   */
  internalValue: number;

  /**
   * Event emitter for value changes
   * @param event - Event name
   * @param value - New value to emit
   */
  $emit(event: 'input', value: number): void;

  /**
   * Validates and emits a value if it's less than the internal maximum
   * @param value - The value to validate
   */
  validateMax(value: string | number): void;
}