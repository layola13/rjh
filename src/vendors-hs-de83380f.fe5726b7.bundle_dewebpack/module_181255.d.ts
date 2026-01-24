/**
 * Creates a helper function for extending ES6 classes with proper constructor invocation.
 * This utility handles the instantiation of derived classes, supporting both modern
 * Reflect.construct (when available) and legacy Function.prototype.apply patterns.
 * 
 * @module ClassConstructorHelper
 */

import type { Constructor, AnyConstructor } from './types';

/**
 * Gets the prototype of a constructor function.
 * 
 * @param ctor - The constructor function
 * @returns The prototype object of the constructor
 */
declare function getPrototypeOf(ctor: AnyConstructor): object;

/**
 * Checks if Reflect.construct is supported in the current environment.
 * 
 * @returns True if Reflect.construct is available, false otherwise
 */
declare function isReflectConstructSupported(): boolean;

/**
 * Ensures the return value from a constructor is properly typed.
 * Handles cases where constructor returns a non-object or undefined.
 * 
 * @param context - The 'this' context (instance being constructed)
 * @param result - The result returned from the parent constructor
 * @returns The properly typed instance
 */
declare function possibleConstructorReturn<T>(context: T, result: unknown): T;

/**
 * Creates a wrapper function that properly invokes a parent class constructor.
 * This helper is used during class inheritance to ensure the parent constructor
 * is called with the correct context and arguments.
 * 
 * When Reflect.construct is available (ES6+), it uses that for proper subclassing.
 * Otherwise, falls back to Function.prototype.apply for compatibility.
 * 
 * @template T - The type of the class being extended
 * @param ParentClass - The parent class constructor to wrap
 * @returns A function that correctly invokes the parent constructor
 * 
 * @example
 *