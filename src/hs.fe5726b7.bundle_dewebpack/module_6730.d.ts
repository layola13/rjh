/**
 * Module: module_6730
 * Original ID: 6730
 * 
 * Factory function that creates a class extending a base class with static factory method.
 */

/**
 * Base class type that the returned class extends from.
 * Typically represents a component or service base class.
 */
import BaseClass from './715061';

/**
 * Default export type that is passed as third parameter to constructor.
 * Likely represents configuration or default settings.
 */
import defaultConfig from './425995';

/**
 * Class constructor signature for the dynamically created class.
 * 
 * @template T - The type of the first constructor parameter
 * @template N - The type of the second constructor parameter
 */
export interface DynamicClassConstructor<T = unknown, N = unknown> {
  /**
   * Creates a new instance of the class.
   * 
   * @param firstParam - First constructor parameter
   * @param secondParam - Second constructor parameter
   */
  new(firstParam: T, secondParam: N): DynamicClassInstance;

  /**
   * Static factory method to create instances.
   * 
   * @param firstParam - First constructor parameter
   * @param secondParam - Second constructor parameter
   * @returns A new instance of the class
   */
  create(firstParam: T, secondParam: N): DynamicClassInstance;
}

/**
 * Instance type of the dynamically created class.
 * Extends from the base class type.
 */
export interface DynamicClassInstance extends BaseClass {
  // Instance properties and methods inherited from BaseClass
}

/**
 * Factory function that creates a new class extending the provided base class.
 * The created class includes a static `create` factory method.
 * 
 * @param baseClass - The base class to extend from (defaults to u.default from module 715061)
 * @returns A constructor function for the new class with static create method
 * 
 * @example
 *