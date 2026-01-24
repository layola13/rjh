/**
 * Symbol polyfill installer module
 * Ensures Symbol properties are properly defined on the global Symbol object
 */

import type { PropertyDescriptor } from './property-descriptor';

/**
 * Global runtime environment interface
 */
interface GlobalRuntime {
  Symbol?: SymbolConstructor;
}

/**
 * Internal library state container
 */
interface LibraryState {
  Symbol?: SymbolConstructor;
}

/**
 * Well-known symbol registry
 */
interface WellKnownSymbolRegistry {
  /**
   * Gets a well-known symbol descriptor for the given key
   * @param key - The symbol key (e.g., 'iterator', 'toStringTag')
   */
  f(key: string): symbol;
}

/**
 * Object property definition utilities
 */
interface ObjectDefineProperty {
  /**
   * Defines a new property directly on an object
   * @param target - The object on which to define the property
   * @param propertyKey - The name of the property to be defined
   * @param descriptor - The descriptor for the property being defined
   */
  f<T extends object>(
    target: T,
    propertyKey: PropertyKey,
    descriptor: PropertyDescriptor
  ): void;
}

/**
 * Installs a well-known Symbol property if it doesn't exist
 * 
 * This function ensures that built-in Symbol properties (like Symbol.iterator)
 * are available on the Symbol constructor, even in environments that don't
 * natively support them. It skips private symbols (those starting with "_").
 * 
 * @param symbolKey - The name of the Symbol property to install (e.g., 'iterator', 'hasInstance')
 * 
 * @example
 *