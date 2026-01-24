/**
 * VForm Component Type Definitions
 * Vuetify Form component for validation and input management
 */

/**
 * Input watcher object returned by watchInput method
 */
interface InputWatcher {
  /** Unique identifier of the watched input */
  _uid: number;
  /** Function to unwatch the valid state */
  valid: () => void;
  /** Function to unwatch the shouldValidate state */
  shouldValidate: () => void;
}

/**
 * Error bag record mapping input UIDs to their error states
 */
interface ErrorBag {
  [uid: number]: boolean;
}

/**
 * Registrable input component interface
 */
interface FormInput extends Vue {
  /** Unique component identifier */
  _uid: number;
  /** Whether the input has validation errors */
  hasError: boolean;
  /** Whether the input should validate */
  shouldValidate: boolean;
  /**
   * Validates the input
   * @param force - Force validation regardless of interaction state
   * @returns True if validation passes
   */
  validate(force: boolean): boolean;
  /** Resets the input to initial state */
  reset(): void;
  /** Resets validation state without clearing value */
  resetValidation(): void;
}

/**
 * VForm component props
 */
interface VFormProps {
  /** Disables all form inputs */
  disabled?: boolean;
  /** Delays validation until first user interaction */
  lazyValidation?: boolean;
  /** Makes all form inputs readonly */
  readonly?: boolean;
  /** Controls form valid state (v-model) */
  value?: boolean;
}

/**
 * VForm component data
 */
interface VFormData {
  /** Array of registered form inputs */
  inputs: FormInput[];
  /** Array of active input watchers */
  watchers: InputWatcher[];
  /** Map of input UIDs to their error states */
  errorBag: ErrorBag;
}

/**
 * VForm component methods
 */
interface VFormMethods {
  /**
   * Creates and returns watcher for input validation state
   * @param input - The input component to watch
   * @returns Watcher object with cleanup functions
   */
  watchInput(input: FormInput): InputWatcher;

  /**
   * Validates all registered inputs
   * @returns True if all inputs are valid
   */
  validate(): boolean;

  /**
   * Resets all inputs to initial state and clears error bag
   */
  reset(): void;

  /**
   * Clears the error bag (used internally)
   */
  resetErrorBag(): void;

  /**
   * Resets validation state without clearing input values
   */
  resetValidation(): void;

  /**
   * Registers an input component with the form
   * @param input - The input component to register
   */
  register(input: FormInput): void;

  /**
   * Unregisters an input component from the form
   * @param input - The input component to unregister
   */
  unregister(input: FormInput): void;
}

/**
 * VForm component computed properties
 */
interface VFormComputed {
  // Inherits attrs$ from binds-attrs mixin
}

/**
 * VForm component instance
 */
interface VForm extends Vue, VFormMethods, VFormComputed {
  // Props
  disabled: boolean;
  lazyValidation: boolean;
  readonly: boolean;
  value: boolean;

  // Data
  inputs: FormInput[];
  watchers: InputWatcher[];
  errorBag: ErrorBag;
}

/**
 * VForm component definition
 * Provides form validation and input management functionality
 */
declare const VForm: VueConstructor<VForm>;

export default VForm;