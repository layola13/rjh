/**
 * Validator module for validating various data types
 * @module module_validator
 * @packageDocumentation
 */

/**
 * Number validation result
 */
export interface ValidationResult {
  /** Whether the validation passed */
  valid: boolean;
  /** Error message if validation failed */
  error?: string;
  /** The validated value */
  value?: number;
}

/**
 * Validator instance interface
 */
export interface Validator {
  /**
   * Validates if the input is a valid number
   * @param value - The value to validate
   * @returns Validation result indicating success or failure
   */
  numberValidator(value: unknown): ValidationResult;
}

/**
 * Validates a value as a number
 * @param value - The value to validate
 * @returns Validation result
 * @example
 *