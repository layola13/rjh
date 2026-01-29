/**
 * Constructor detection utility
 * Provides functionality to determine if a value is a constructor function
 */

/**
 * Checks if a given value is a constructor function
 * 
 * @param value - The value to test
 * @returns true if the value is a constructor function, false otherwise
 * 
 * @remarks
 * A constructor is a function that can be called with the 'new' operator to create objects.
 * This utility distinguishes between:
 * - Regular functions (can be constructors)
 * - Arrow functions (cannot be constructors)
 * - Class constructors (are constructors)
 * - Built-in constructors (Array, Object, etc.)
 * - Non-function values (return false)
 * 
 * Detection methods:
 * 1. Check if value is a function
 * 2. Verify it has a prototype property
 * 3. Ensure it's not an arrow function (no prototype)
 * 4. Test if it can be used with 'new' operator
 * 
 * @example
 * ```typescript
 * // Regular function (constructor)
 * function RegularFunction() {}
 * console.log(isConstructor(RegularFunction)); // true
 * 
 * // Arrow function (not a constructor)
 * const arrowFunc = () => {};
 * console.log(isConstructor(arrowFunc)); // false
 * 
 * // Class constructor
 * class MyClass {}
 * console.log(isConstructor(MyClass)); // true
 * 
 * // Built-in constructors
 * console.log(isConstructor(Array)); // true
 * console.log(isConstructor(Object)); // true
 * console.log(isConstructor(Date)); // true
 * 
 * // Non-function values
 * console.log(isConstructor({})); // false
 * console.log(isConstructor(null)); // false
 * console.log(isConstructor(undefined)); // false
 * console.log(isConstructor(42)); // false
 * 
 * // Bound functions (may lose constructor ability)
 * function MyConstructor() {}
 * const boundFunc = MyConstructor.bind(null);
 * console.log(isConstructor(boundFunc)); // depends on implementation
 * 
 * // Generator functions (not constructors)
 * function* generatorFunc() { yield 1; }
 * console.log(isConstructor(generatorFunc)); // false
 * 
 * // Async functions (not constructors)
 * async function asyncFunc() {}
 * console.log(isConstructor(asyncFunc)); // false
 * ```
 */
declare function isConstructor(value: any): value is new (...args: any[]) => any;

/**
 * Type guard for constructor functions
 * Narrows the type to a constructor signature
 */
type Constructor<T = any> = new (...args: any[]) => T;

/**
 * Checks if a value is callable (function or constructor)
 * 
 * @param value - The value to test
 * @returns true if the value is a function, false otherwise
 */
declare function isCallable(value: any): value is Function;

export { isConstructor, Constructor, isCallable };