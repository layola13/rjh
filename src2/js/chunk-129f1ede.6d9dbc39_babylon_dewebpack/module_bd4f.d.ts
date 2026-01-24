/**
 * Vue mixin for handling calculation error messages with i18n support
 * Provides methods to format error messages with dynamic parameter substitution
 */

/**
 * Error object structure containing error code and optional parameters
 */
interface CalculationError {
  /** Error code used for i18n translation key lookup */
  code: string | number;
  /** Optional parameters for message template substitution */
  params?: Record<string, string | number>;
}

/**
 * Vue component interface with i18n translation method
 */
interface VueI18nComponent {
  /** Vue i18n translation method */
  $t(key: string): string;
}

/**
 * Vue mixin for error message handling
 */
declare const ErrorMessageMixin: {
  methods: {
    /**
     * Retrieves and formats an error message with parameter substitution
     * 
     * @param error - The error object containing code and optional params
     * @returns Formatted error message with substituted parameters
     * 
     * @example
     *