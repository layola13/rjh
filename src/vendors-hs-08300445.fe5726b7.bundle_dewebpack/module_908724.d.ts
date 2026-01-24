/**
 * Form validation rules executor module
 * Provides functions to validate form fields using async-validator
 */

/**
 * Validation rule configuration
 */
export interface ValidationRule {
  /** Field type (e.g., 'string', 'number', 'array', 'object', etc.) */
  type?: string;
  /** Whether the field is required */
  required?: boolean;
  /** Custom validator function */
  validator?: ValidatorFunction;
  /** Default validation rule for array items */
  defaultField?: ValidationRule;
  /** Allowed enum values */
  enum?: string[];
  /** Custom error message */
  message?: string;
  /** Additional rule properties */
  [key: string]: unknown;
}

/**
 * Custom validator function signature
 * @param rule - The validation rule being applied
 * @param value - The value being validated
 * @param callback - Callback to invoke with validation result (deprecated, return Promise instead)
 * @returns Promise that resolves on success or rejects with error message
 */
export type ValidatorFunction = (
  rule: ValidationRule,
  value: unknown,
  callback: (error?: string | Error) => void
) => void | Promise<void>;

/**
 * Validation options
 */
export interface ValidateOptions {
  /** Whether to stop validation on first error */
  first?: boolean;
  /** Whether to validate all rules in parallel */
  parallel?: boolean;
  /** Custom validation messages */
  validateMessages?: ValidateMessages;
  /** Additional options */
  [key: string]: unknown;
}

/**
 * Validation messages configuration
 */
export interface ValidateMessages {
  /** Default error message */
  default?: string;
  /** Type-specific error messages */
  types?: Record<string, string>;
  /** Rule-specific error messages */
  [key: string]: unknown;
}

/**
 * Validates a form field using the provided rules
 * 
 * @param namePath - Field name path as array (e.g., ['user', 'email'])
 * @param value - The value to validate
 * @param rules - Array of validation rules to apply
 * @param options - Validation options
 * @param validateMessages - Custom validation messages
 * @param locale - Locale-specific message interpolation context
 * @returns Promise that resolves with empty array on success, or array of error messages on failure
 * 
 * @example
 *