/**
 * Species Pattern Module
 * 
 * Adds the well-known `Symbol.species` accessor to built-in constructors.
 * This allows subclasses to override the constructor used when creating derived objects.
 * 
 * @module SpeciesDefinition
 */

/**
 * Global object reference (window in browsers, global in Node.js)
 */
declare const global: Record<string, any>;

/**
 * Object property descriptor utilities
 */
declare const defineProperty: {
  /**
   * Defines a new property directly on an object
   * @param target - The object on which to define the property
   * @param key - The name or Symbol of the property to be defined
   * @param descriptor - The descriptor for the property being defined
   */
  f(target: any, key: string | symbol, descriptor: PropertyDescriptor): void;
};

/**
 * Feature detection for descriptor support
 */
declare const descriptorsSupported: boolean;

/**
 * Well-known Symbol.species
 */
declare const speciesSymbol: symbol;

/**
 * Defines the `Symbol.species` getter on a constructor if not already present.
 * The species pattern allows derived classes to specify the constructor to use
 * when creating new instances in methods like map, filter, etc.
 * 
 * @param constructorName - The name of the global constructor (e.g., 'Array', 'Map', 'Promise')
 * 
 * @example
 *