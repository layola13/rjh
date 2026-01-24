/**
 * Promise.prototype.catch polyfill
 * 
 * This module provides a polyfill for the Promise.prototype.catch method,
 * ensuring compatibility across different environments and fixing potential
 * inconsistencies in native implementations.
 */

/**
 * Promise constructor interface
 */
interface PromiseConstructor {
  prototype: Promise<any>;
}

/**
 * Options for exporting/defining methods
 */
interface ExportOptions {
  /** The target object or namespace to export to */
  target: string;
  /** Whether to define on the prototype */
  proto?: boolean;
  /** Whether to force override existing implementation */
  forced?: boolean;
  /** Whether this is a real/native method */
  real?: boolean;
}

/**
 * Options for redefining properties
 */
interface RedefineOptions {
  /** Whether the redefinition is unsafe (may cause side effects) */
  unsafe?: boolean;
}

/**
 * Exports a method to a target object/namespace
 * @param options - Export configuration
 * @param methods - Methods to export
 */
declare function exportMethod(
  options: ExportOptions,
  methods: Record<string, Function>
): void;

/**
 * Checks if the code is running in a non-native (polyfilled) environment
 */
declare const isNonNativeEnvironment: boolean;

/**
 * Checks if a value is callable (function)
 * @param value - Value to check
 */
declare function isCallable(value: any): value is Function;

/**
 * Gets a built-in constructor or object by name
 * @param name - Name of the built-in
 */
declare function getBuiltin<T = any>(name: string): T;

/**
 * Redefines a property on an object
 * @param target - Target object
 * @param propertyKey - Property key to redefine
 * @param value - New value
 * @param options - Redefinition options
 */
declare function redefineProperty(
  target: object,
  propertyKey: string | symbol,
  value: any,
  options?: RedefineOptions
): void;

/**
 * Flag indicating if Promise constructor needs polyfilling
 */
declare const PROMISE_CONSTRUCTOR_NEEDS_POLYFILL: boolean;

/**
 * Native or polyfilled Promise constructor
 */
declare const PromiseImplementation: PromiseConstructor | undefined;

/**
 * Promise prototype
 */
declare const promisePrototype: Promise<any> | undefined;

/**
 * Catch handler type
 * @template T - The type of the rejection reason
 * @template TResult - The type of the result after handling rejection
 */
type CatchHandler<T = any, TResult = never> = (reason: T) => TResult | PromiseLike<TResult>;

/**
 * Promise.prototype.catch implementation
 * @template T - The type of the value the promise resolves to
 * @template TResult - The type of the result after handling rejection
 * @param onRejected - Callback to handle rejection
 * @returns A new promise
 */
declare function promiseCatch<T = any, TResult = never>(
  this: Promise<T>,
  onRejected?: CatchHandler<any, TResult> | undefined | null
): Promise<T | TResult>;

// Export the catch method on Promise.prototype
exportMethod(
  {
    target: "Promise",
    proto: true,
    forced: PROMISE_CONSTRUCTOR_NEEDS_POLYFILL,
    real: true
  },
  {
    catch: promiseCatch
  }
);

// Fix inconsistencies in non-native environments
if (isNonNativeEnvironment && isCallable(PromiseImplementation)) {
  const builtinPromiseCatch = getBuiltin<PromiseConstructor>("Promise").prototype.catch;
  
  if (promisePrototype?.catch !== builtinPromiseCatch) {
    redefineProperty(promisePrototype!, "catch", builtinPromiseCatch, {
      unsafe: true
    });
  }
}