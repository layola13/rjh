/**
 * Error constructor polyfill with cause support
 * Provides standardized error cause property across all error types
 */

/**
 * Imports utilities for error handling and polyfilling
 */
import type { ExportFunction } from './79227'; // i - export/polyfill utility
import type { GlobalObject } from './81482'; // n - global object reference
import type { ApplyConstructor } from './95888'; // r - constructor application helper
import type { CreateErrorConstructor } from './30742'; // a - error constructor factory

/**
 * Configuration for exporting error constructors globally
 */
interface GlobalExportOptions {
  /** Export to global scope */
  global: boolean;
  /** Mark as constructor */
  constructor: boolean;
  /** Number of expected arguments */
  arity: number;
  /** Force polyfill even if native exists */
  forced: boolean;
}

/**
 * Configuration for exporting WebAssembly error constructors
 */
interface TargetExportOptions {
  /** Target namespace (e.g., "WebAssembly") */
  target: string;
  /** Static member export */
  stat: boolean;
  /** Mark as constructor */
  constructor: boolean;
  /** Number of expected arguments */
  arity: number;
  /** Force polyfill even if native exists */
  forced: boolean;
}

/**
 * Factory function that creates error constructor wrappers
 * @param originalConstructor - The native error constructor to wrap
 * @returns Wrapped constructor that applies arguments correctly
 * 
 * @example
 * ```typescript
 * const factory: ErrorConstructorFactory = (OriginalError) => {
 *   return function(message?: string) {
 *     const error = new OriginalError(message);
 *     error.cause = { details: 'Additional context' };
 *     return error;
 *   };
 * };
 * 
 * const CustomTypeError = factory(TypeError);
 * const err = CustomTypeError('Invalid input');
 * ```
 */
type ErrorConstructorFactory = (
  originalConstructor: ErrorConstructor
) => (message?: string) => Error;

/**
 * WebAssembly-specific error constructor factory
 */
type WebAssemblyErrorConstructorFactory = (
  originalConstructor: ErrorConstructor
) => (message?: string) => Error;

/**
 * Check if native Error supports 'cause' property (ES2022 feature)
 * Returns true if cause is properly supported (value should be 7)
 */
const NATIVE_ERROR_CAUSE_SUPPORTED: boolean = 
  7 === new Error('e', { cause: 7 }).cause;

/**
 * Polyfill a global error constructor with cause support
 * @param errorName - Name of the error type (e.g., "TypeError")
 * @param constructorFactory - Factory function to create the wrapper
 */
declare function polyfillGlobalError(
  errorName: string,
  constructorFactory: ErrorConstructorFactory
): void;

/**
 * Polyfill a WebAssembly error constructor with cause support
 * @param errorName - Name of the WebAssembly error (e.g., "CompileError")
 * @param constructorFactory - Factory function to create the wrapper
 */
declare function polyfillWebAssemblyError(
  errorName: string,
  constructorFactory: WebAssemblyErrorConstructorFactory
): void;

/**
 * Standard JavaScript Error types polyfilled with cause support
 */
declare global {
  interface ErrorOptions {
    cause?: unknown;
  }

  interface Error {
    cause?: unknown;
  }
}

/**
 * WebAssembly error types with cause support
 */
declare namespace WebAssembly {
  interface CompileError extends Error {
    cause?: unknown;
  }
  
  interface LinkError extends Error {
    cause?: unknown;
  }
  
  interface RuntimeError extends Error {
    cause?: unknown;
  }
}

/**
 * Module exports - polyfills all error constructors
 * Ensures consistent 'cause' property support across:
 * - Standard errors: Error, EvalError, RangeError, ReferenceError, SyntaxError, TypeError, URIError
 * - WebAssembly errors: CompileError, LinkError, RuntimeError
 */
export {};