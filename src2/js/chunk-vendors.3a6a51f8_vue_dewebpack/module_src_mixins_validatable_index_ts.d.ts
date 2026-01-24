/**
 * Validatable mixin for Vue components
 * Provides validation functionality with error handling, rules, and state management
 */

import { VueConstructor } from 'vue';
import Colorable from '../colorable';
import Themeable from '../themeable';
import { Registrable } from '../registrable';

/**
 * Validation rule function type
 * @param value - The value to validate
 * @returns true if valid, false or error message string if invalid
 */
type ValidationRule<T = any> = (value: T) => boolean | string;

/**
 * Form interface for registration
 */
interface FormInterface {
  /** Whether the form is disabled */
  disabled: boolean;
  /** Whether the form is readonly */
  readonly: boolean;
  /** Register a validatable component */
  register(component: ValidatableInstance): void;
  /** Unregister a validatable component */
  unregister(component: ValidatableInstance): void;
}

/**
 * Validatable component instance interface
 */
interface ValidatableInstance {
  /** Validate the component */
  validate(force?: boolean, value?: any): boolean;
  /** Reset the component value */
  reset(): void;
  /** Reset validation state without changing value */
  resetValidation(): void;
}

/**
 * Validatable component props
 */
interface ValidatableProps {
  /** Whether the component is disabled */
  disabled: boolean;
  /** Force error state */
  error: boolean;
  /** Maximum number of errors to display */
  errorCount: number | string;
  /** Error messages to display */
  errorMessages: string | string[];
  /** General messages to display */
  messages: string | string[];
  /** Whether the component is readonly */
  readonly: boolean;
  /** Validation rules array */
  rules: ValidationRule[];
  /** Force success state */
  success: boolean;
  /** Success messages to display */
  successMessages: string | string[];
  /** Validate only on blur event */
  validateOnBlur: boolean;
  /** The component value */
  value: any;
}

/**
 * Validatable component data
 */
interface ValidatableData {
  /** Array of validation error messages */
  errorBucket: string[];
  /** Whether the component has color applied */
  hasColor: boolean;
  /** Whether the component has been focused */
  hasFocused: boolean;
  /** Whether the component has received input */
  hasInput: boolean;
  /** Whether the component is currently focused */
  isFocused: boolean;
  /** Whether the component is resetting */
  isResetting: boolean;
  /** Internal lazy value storage */
  lazyValue: any;
  /** Whether the component is valid */
  valid: boolean;
}

/**
 * Validatable component computed properties
 */
interface ValidatableComputed {
  /** Computed color based on theme and state */
  computedColor: string | undefined;
  /** Whether the component has errors */
  hasError: boolean;
  /** Whether the component has success state */
  hasSuccess: boolean;
  /** Whether there are external errors */
  externalError: boolean;
  /** Whether there are any messages to display */
  hasMessages: boolean;
  /** Whether the component should display state (success/error) */
  hasState: boolean;
  /** Internal error messages array */
  internalErrorMessages: string[];
  /** Internal general messages array */
  internalMessages: string[];
  /** Internal success messages array */
  internalSuccessMessages: string[];
  /** Internal value with getter/setter */
  internalValue: any;
  /** Whether the component is disabled */
  isDisabled: boolean;
  /** Whether the component can be interacted with */
  isInteractive: boolean;
  /** Whether the component is readonly */
  isReadonly: boolean;
  /** Whether validation should run */
  shouldValidate: boolean;
  /** Validation messages to display (limited by errorCount) */
  validations: string[];
  /** Current validation state */
  validationState: 'error' | 'success' | string | undefined;
  /** Target messages for validation display */
  validationTarget: string[];
}

/**
 * Validatable component methods
 */
interface ValidatableMethods {
  /**
   * Convert messages prop to array format
   * @param messages - String or array of messages
   * @returns Array of messages
   */
  genInternalMessages(messages: string | string[]): string[];
  
  /**
   * Reset the component value to initial state
   */
  reset(): void;
  
  /**
   * Reset validation state without changing value
   */
  resetValidation(): void;
  
  /**
   * Validate the component value against rules
   * @param force - Force validation even if not normally required
   * @param value - Optional value to validate (defaults to internalValue)
   * @returns Whether validation passed
   */
  validate(force?: boolean, value?: any): boolean;
}

/**
 * Validatable mixin declaration
 * Combines Colorable, Themeable, and form registration functionality
 * Provides comprehensive validation with rules, error handling, and state management
 */
declare const Validatable: VueConstructor<
  Vue & 
  Colorable & 
  Themeable & 
  Registrable<FormInterface> &
  ValidatableProps &
  ValidatableData &
  ValidatableComputed &
  ValidatableMethods
>;

export default Validatable;