/**
 * PropTypes factory module for production environments.
 * This module provides stub validators that do nothing in production builds.
 * @module prop-types
 */

/**
 * Secret token used to identify legitimate PropTypes calls.
 * In production, validators are disabled but the shape is preserved.
 */
declare const SECRET_TOKEN: unique symbol;

/**
 * Resets the warning cache for PropTypes.
 * No-op in production builds.
 */
declare function resetWarningCache(): void;

/**
 * Checks PropTypes definitions against provided props.
 * No-op in production builds.
 */
declare function checkPropTypes(): void;

/**
 * Base validator function type.
 * @template T - The expected prop type
 */
declare type Validator<T> = {
  (
    props: { [key: string]: unknown },
    propName: string,
    componentName: string,
    location: string,
    propFullName: string,
    secret: typeof SECRET_TOKEN
  ): Error | null;
  isRequired: Validator<NonNullable<T>>;
};

/**
 * Validator factory that returns a validator for a specific type.
 * @template T - The expected prop type
 */
declare type ValidatorFactory<T> = () => Validator<T>;

/**
 * PropTypes validation interface.
 * Provides runtime type checking for React component props.
 */
export interface PropTypes {
  /** Validates that prop is an array */
  array: Validator<unknown[]>;
  
  /** Validates that prop is a bigint */
  bigint: Validator<bigint>;
  
  /** Validates that prop is a boolean */
  bool: Validator<boolean>;
  
  /** Validates that prop is a function */
  func: Validator<Function>;
  
  /** Validates that prop is a number */
  number: Validator<number>;
  
  /** Validates that prop is an object */
  object: Validator<object>;
  
  /** Validates that prop is a string */
  string: Validator<string>;
  
  /** Validates that prop is a symbol */
  symbol: Validator<symbol>;
  
  /** Accepts any prop type */
  any: Validator<unknown>;
  
  /** Validates that prop is an array of a specific type */
  arrayOf: ValidatorFactory<unknown[]>;
  
  /** Validates that prop is a React element */
  element: Validator<React.ReactElement>;
  
  /** Validates that prop is a React element type */
  elementType: Validator<React.ElementType>;
  
  /** Validates that prop is an instance of a specific class */
  instanceOf: ValidatorFactory<object>;
  
  /** Validates that prop is a renderable React node */
  node: Validator<React.ReactNode>;
  
  /** Validates that prop is an object with values of a specific type */
  objectOf: ValidatorFactory<{ [key: string]: unknown }>;
  
  /** Validates that prop is one of specific values */
  oneOf: ValidatorFactory<unknown>;
  
  /** Validates that prop matches one of several types */
  oneOfType: ValidatorFactory<unknown>;
  
  /** Validates that prop is an object with a specific shape */
  shape: ValidatorFactory<{ [key: string]: unknown }>;
  
  /** Validates that prop exactly matches a specific shape (no extra properties) */
  exact: ValidatorFactory<{ [key: string]: unknown }>;
  
  /** Manually checks PropTypes definitions against props */
  checkPropTypes: typeof checkPropTypes;
  
  /** Resets the internal warning cache */
  resetWarningCache: typeof resetWarningCache;
  
  /** Self-reference to PropTypes for legacy compatibility */
  PropTypes: PropTypes;
}

/**
 * Creates a production-safe PropTypes object.
 * All validators are no-ops that only throw errors when called without the secret token.
 * @returns PropTypes validation object with stub implementations
 */
export default function createPropTypesFactory(): PropTypes;