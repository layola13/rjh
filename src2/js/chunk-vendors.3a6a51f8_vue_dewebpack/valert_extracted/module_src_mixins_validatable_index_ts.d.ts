/**
 * Validatable Mixin Type Definitions
 * Provides form validation functionality for Vue components
 */

import Vue from 'vue';
import { VueConstructor } from 'vue';

/**
 * Validation rule function type
 * @param value - The value to validate
 * @returns True if valid, false or error message string if invalid
 */
export type ValidationRule = (value: any) => string | boolean;

/**
 * Validation state enum
 */
export type ValidationState = 'error' | 'success' | string | undefined;

/**
 * Props interface for Validatable mixin
 */
interface ValidatableProps {
  /** Disables the input */
  disabled?: boolean;
  
  /** Puts the input in a manual error state */
  error?: boolean;
  
  /** The total number of errors that should display at once */
  errorCount?: number | string;
  
  /** Puts the input in an error state and passes through custom error messages */
  errorMessages?: string | string[];
  
  /** Displays a list of messages or message */
  messages?: string | string[];
  
  /** Puts input in readonly state */
  readonly?: boolean;
  
  /** Array of validation rules */
  rules?: ValidationRule[];
  
  /** Puts the input in a manual success state */
  success?: boolean;
  
  /** Puts the input in a success state and passes through custom success messages */
  successMessages?: string | string[];
  
  /** Delays validation until blur event */
  validateOnBlur?: boolean;
  
  /** The input's value */
  value?: any;
}

/**
 * Data interface for Validatable mixin
 */
interface ValidatableData {
  /** Array of current error messages */
  errorBucket: string[];
  
  /** Whether the component has color applied */
  hasColor: boolean;
  
  /** Whether the input has been focused */
  hasFocused: boolean;
  
  /** Whether the input has received input */
  hasInput: boolean;
  
  /** Whether the input is currently focused */
  isFocused: boolean;
  
  /** Whether the input is currently resetting */
  isResetting: boolean;
  
  /** Lazy value for internal state management */
  lazyValue: any;
  
  /** Whether the input is valid */
  valid: boolean;
}

/**
 * Computed properties interface for Validatable mixin
 */
interface ValidatableComputed {
  /** Computed color value based on state */
  computedColor?: string;
  
  /** Whether the input has an error */
  hasError: boolean;
  
  /** Whether the input has success state */
  hasSuccess: boolean;
  
  /** Whether there is an external error */
  externalError: boolean;
  
  /** Whether there are any messages to display */
  hasMessages: boolean;
  
  /** Whether the input has a state (success or error) */
  hasState: boolean;
  
  /** Internal error messages array */
  internalErrorMessages: string[];
  
  /** Internal messages array */
  internalMessages: string[];
  
  /** Internal success messages array */
  internalSuccessMessages: string[];
  
  /** Internal value with getter/setter */
  internalValue: any;
  
  /** Whether the input is disabled */
  isDisabled: boolean;
  
  /** Whether the input is interactive (not disabled or readonly) */
  isInteractive: boolean;
  
  /** Whether the input is readonly */
  isReadonly: boolean;
  
  /** Whether validation should be performed */
  shouldValidate: boolean;
  
  /** Array of validation messages to display (limited by errorCount) */
  validations: string[];
  
  /** Current validation state */
  validationState?: ValidationState;
  
  /** Target array of validation messages to display */
  validationTarget: string[];
}

/**
 * Methods interface for Validatable mixin
 */
interface ValidatableMethods {
  /**
   * Converts messages to internal array format
   * @param messages - String or array of messages
   * @returns Array of message strings
   */
  genInternalMessages(messages: string | string[]): string[];
  
  /**
   * Resets the input value and validation state
   */
  reset(): void;
  
  /**
   * Resets validation state without clearing the value
   */
  resetValidation(): void;
  
  /**
   * Validates the input value against rules
   * @param force - Force validation regardless of shouldValidate state
   * @param value - Optional value to validate (defaults to internalValue)
   * @returns True if valid, false otherwise
   */
  validate(force?: boolean, value?: any): boolean;
}

/**
 * Form injected interface
 */
interface FormInjectable {
  form?: {
    /** Whether the form is disabled */
    disabled: boolean;
    
    /** Whether the form is readonly */
    readonly: boolean;
    
    /**
     * Register a validatable component with the form
     * @param component - The component to register
     */
    register(component: Vue): void;
    
    /**
     * Unregister a validatable component from the form
     * @param component - The component to unregister
     */
    unregister(component: Vue): void;
  };
}

/**
 * Validatable mixin interface combining all type definitions
 */
export interface Validatable extends Vue, ValidatableData, ValidatableComputed, ValidatableMethods, FormInjectable {
  // Props are accessed as instance properties
  disabled: boolean;
  error: boolean;
  errorCount: number | string;
  errorMessages: string | string[];
  messages: string | string[];
  readonly: boolean;
  rules: ValidationRule[];
  success: boolean;
  successMessages: string | string[];
  validateOnBlur: boolean;
  value: any;
}

/**
 * Validatable mixin providing form validation capabilities
 * 
 * Features:
 * - Rule-based validation with custom error messages
 * - Support for success/error states
 * - Integration with form component
 * - Blur or immediate validation modes
 * - Colorable and themeable support
 */
declare const Validatable: VueConstructor<Validatable>;

export default Validatable;