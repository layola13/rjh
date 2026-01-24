/**
 * Async Validator - A rule-based form validation library
 * Provides schema-based validation with support for synchronous and asynchronous rules
 */

/**
 * Validation error details
 */
export interface ValidateError {
  /** Error message */
  message: string;
  /** Field name that failed validation */
  field: string;
  /** Original field path */
  fullField?: string;
}

/**
 * Validation rule configuration
 */
export interface RuleItem {
  /** Rule type */
  type?: RuleType;
  /** Whether the field is required */
  required?: boolean;
  /** Custom error message */
  message?: string | (() => string);
  /** Pattern for regex validation */
  pattern?: RegExp | string;
  /** Minimum value/length */
  min?: number;
  /** Maximum value/length */
  max?: number;
  /** Exact length */
  len?: number;
  /** Enum values */
  enum?: Array<string | number | boolean | null | undefined>;
  /** Whether to trim whitespace */
  whitespace?: boolean;
  /** Nested field rules for objects */
  fields?: Record<string, RuleItem | RuleItem[]>;
  /** Default field rule for all object properties */
  defaultField?: RuleItem | RuleItem[];
  /** Transform function applied before validation */
  transform?: (value: unknown) => unknown;
  /** Custom validator function */
  validator?: ValidatorFunction;
  /** Custom async validator function */
  asyncValidator?: AsyncValidatorFunction;
  /** Validation options */
  options?: ValidateOption;
  /** Full field path (internal use) */
  fullField?: string;
  /** Field name (internal use) */
  field?: string;
}

/**
 * Supported validation types
 */
export type RuleType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'method'
  | 'regexp'
  | 'integer'
  | 'float'
  | 'array'
  | 'object'
  | 'enum'
  | 'date'
  | 'url'
  | 'hex'
  | 'email'
  | 'pattern'
  | 'any';

/**
 * Validation options
 */
export interface ValidateOption {
  /** Whether to stop validation on first error */
  first?: boolean;
  /** Fields to validate on first error */
  firstFields?: boolean | string[];
  /** Custom error messages */
  messages?: Partial<ValidateMessages>;
  /** Keys to validate (defaults to all rule keys) */
  keys?: string[];
  /** Custom error formatter */
  error?: (rule: RuleItem, message: string) => ValidateError;
  /** Suppress internal warnings */
  suppressWarning?: boolean;
}

/**
 * Validation callback function
 */
export type ValidateCallback = (errors: ValidateError[] | null, fields?: Record<string, ValidateError[]>) => void;

/**
 * Synchronous validator function
 */
export type ValidatorFunction = (
  rule: RuleItem,
  value: unknown,
  callback: (error?: string | Error | string[]) => void,
  source: Record<string, unknown>,
  options: ValidateOption
) => boolean | void | Error | string | string[];

/**
 * Asynchronous validator function
 */
export type AsyncValidatorFunction = (
  rule: RuleItem,
  value: unknown,
  callback: (error?: string | Error | string[]) => void,
  source: Record<string, unknown>,
  options: ValidateOption
) => Promise<void>;

/**
 * Validation error messages configuration
 */
export interface ValidateMessages {
  /** Default validation error message */
  default: string;
  /** Required field error message */
  required: string;
  /** Enum validation error message */
  enum: string;
  /** Whitespace validation error message */
  whitespace: string;
  /** Date validation messages */
  date: {
    format: string;
    parse: string;
    invalid: string;
  };
  /** Type validation messages */
  types: {
    string: string;
    method: string;
    array: string;
    object: string;
    number: string;
    date: string;
    boolean: string;
    integer: string;
    float: string;
    regexp: string;
    email: string;
    url: string;
    hex: string;
  };
  /** String length validation messages */
  string: {
    len: string;
    min: string;
    max: string;
    range: string;
  };
  /** Number range validation messages */
  number: {
    len: string;
    min: string;
    max: string;
    range: string;
  };
  /** Array length validation messages */
  array: {
    len: string;
    min: string;
    max: string;
    range: string;
  };
  /** Pattern validation messages */
  pattern: {
    mismatch: string;
  };
  /** Clone the messages object */
  clone(): ValidateMessages;
}

/**
 * Schema validation rules
 */
export type Rules = Record<string, RuleItem | RuleItem[]>;

/**
 * Values to validate
 */
export type Values = Record<string, unknown>;

/**
 * Async Validator Schema Class
 * Main class for defining and executing validation rules
 */
export default class Schema {
  /** Validation rules */
  rules: Rules | null;
  
  /** Private validation messages */
  private _messages: ValidateMessages;

  /**
   * Create a new schema validator
   * @param descriptor - Validation rules descriptor
   */
  constructor(descriptor: Rules);

  /**
   * Get or set validation messages
   * @param messages - Optional custom messages to merge
   * @returns Current messages object
   */
  messages(messages?: Partial<ValidateMessages>): ValidateMessages;

  /**
   * Define validation rules
   * @param rules - Validation rules object
   */
  define(rules: Rules): void;

  /**
   * Validate data against schema rules
   * @param source - Data to validate
   * @param options - Validation options or callback
   * @param callback - Validation callback
   * @returns Promise that resolves with validation results
   */
  validate(
    source: Values,
    options?: ValidateOption,
    callback?: ValidateCallback
  ): Promise<void>;
  validate(
    source: Values,
    callback: ValidateCallback
  ): Promise<void>;

  /**
   * Get the validation type for a rule
   * @param rule - Rule item
   * @returns Rule type
   */
  getType(rule: RuleItem): RuleType;

  /**
   * Get the validation method for a rule
   * @param rule - Rule item
   * @returns Validation function or false
   */
  getValidationMethod(rule: RuleItem): ValidatorFunction | false;

  /**
   * Register a custom validator for a type
   * @param type - Validation type name
   * @param validator - Validator function
   */
  static register(type: string, validator: ValidatorFunction): void;

  /**
   * Set warning function (for debugging)
   * @param args - Warning arguments
   */
  static warning(...args: unknown[]): void;

  /** Default validation messages */
  static messages: ValidateMessages;

  /** Built-in validators by type */
  static validators: Record<string, ValidatorFunction>;
}