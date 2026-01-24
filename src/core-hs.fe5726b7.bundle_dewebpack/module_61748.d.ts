/**
 * Utility for capturing and setting error stack traces in a cross-environment manner.
 * Handles stack trace initialization for custom error objects.
 */

/**
 * Defines a property on an object (typically for stack trace).
 */
type DefineProperty = (
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => void;

/**
 * Creates a property descriptor with getter/value configuration.
 */
type CreateDescriptor = (
  getter: () => string,
  value: string
) => PropertyDescriptor;

/**
 * Indicates if the environment supports property descriptors.
 */
type SupportsDescriptors = boolean;

/**
 * Captures or sets a stack trace on an error object.
 * 
 * @param error - The error object to attach the stack trace to
 * @param constructorOpt - The constructor function to omit from the stack trace
 * @param getterFunction - Optional function to lazily compute the stack trace
 * @param stackValue - Optional pre-computed stack trace string
 * 
 * @remarks
 * Uses native Error.captureStackTrace when available (V8 environments),
 * otherwise falls back to defining a 'stack' property manually if descriptors are supported.
 */
declare function captureStackTrace(
  error: Error,
  constructorOpt: Function,
  getterFunction?: () => string,
  stackValue?: string
): void;

export = captureStackTrace;