/**
 * Iterator Constructor Polyfill Module
 * 
 * This module provides a polyfill for the global Iterator constructor,
 * ensuring compatibility across different JavaScript environments.
 * It conditionally defines the Iterator constructor if it's missing or incorrectly implemented.
 */

/**
 * Options for exporting to the global scope
 */
interface ExportOptions {
  /** Whether to export to the global scope */
  global: boolean;
  /** Whether this is a constructor export */
  constructor: boolean;
  /** Whether the polyfill is being forced */
  forced: boolean;
}

/**
 * Iterator prototype interface extending the base IteratorPrototype
 */
interface IteratorPrototype {
  /** Symbol.toStringTag property */
  [Symbol.toStringTag]?: string;
  /** Constructor reference */
  constructor?: Function;
}

/**
 * Base Iterator constructor interface
 */
interface IteratorConstructor {
  /** Constructor signature */
  new(): Iterator<unknown>;
  /** Prototype property */
  prototype: IteratorPrototype;
}

/**
 * Global exports object for registering polyfills
 * @param options - Configuration for how to export
 * @param exports - The values to export
 */
declare function exportToGlobal(
  options: ExportOptions,
  exports: Record<string, unknown>
): void;

/**
 * Checks if a value is callable (function-like)
 * @param value - The value to check
 * @returns True if the value is callable
 */
declare function isCallable(value: unknown): value is Function;

/**
 * Sets the prototype of an object
 * @param target - The object to modify
 * @param prototype - The new prototype
 */
declare function setPrototypeOf(target: object, prototype: object | null): void;

/**
 * Checks if an object has a property
 * @param target - The object to check
 * @param property - The property name
 * @returns True if the property exists
 */
declare function hasOwnProperty(target: object, property: PropertyKey): boolean;

/**
 * Defines a property on an object (non-configurable)
 * @param target - The object to modify
 * @param property - The property name
 * @param value - The property value
 */
declare function defineProperty(
  target: object,
  property: PropertyKey,
  value: unknown
): void;

/**
 * Attempts to execute a function and returns false if it throws
 * @param fn - The function to test
 * @returns True if the function executes without errors
 */
declare function tryToExecute(fn: () => void): boolean;

/**
 * Retrieves a well-known symbol
 * @param name - The symbol name (e.g., 'toStringTag', 'iterator')
 * @returns The corresponding symbol
 */
declare function getWellKnownSymbol(name: string): symbol;

/**
 * Global state object containing references to native constructors
 */
declare const globalState: {
  /** The native or polyfilled Iterator constructor */
  Iterator: IteratorConstructor;
};

/**
 * Iterator prototype object from the environment
 */
declare const iteratorPrototype: IteratorPrototype;

/**
 * Flag indicating whether the environment needs the Iterator polyfill
 * True if:
 * - Running in a pure environment (PURE flag set), OR
 * - Iterator constructor doesn't exist, OR
 * - Iterator.prototype is not the expected IteratorPrototype, OR
 * - Creating an Iterator with an empty object doesn't throw an error
 */
declare const needsPolyfill: boolean;

/**
 * Polyfill Iterator constructor
 * Ensures 'this' is an instance of IteratorPrototype
 */
declare class IteratorPolyfill {
  constructor();
}

/**
 * Module exports - registers the Iterator constructor globally if needed
 */
export {};