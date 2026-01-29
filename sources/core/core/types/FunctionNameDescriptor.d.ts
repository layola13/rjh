/**
 * Function name descriptor utility module
 * Provides functionality to get function name property descriptors
 */

/**
 * Function name property descriptor
 * 
 * @remarks
 * This interface describes the property descriptor for a function's name property.
 * The name property is typically non-writable, non-enumerable, and configurable.
 */
interface FunctionNameDescriptor {
  /**
   * The name of the function
   */
  value: string;
  /**
   * Whether the name property can be changed
   */
  writable: boolean;
  /**
   * Whether the name appears in for-in loops
   */
  enumerable: boolean;
  /**
   * Whether the descriptor can be changed
   */
  configurable: boolean;
}

/**
 * Gets the name property descriptor of a function
 * 
 * @param fn - The function to inspect
 * @returns The property descriptor for the function's name property
 * 
 * @example
 * ```typescript
 * // Named function
 * function myFunction() {}
 * const desc = getFunctionNameDescriptor(myFunction);
 * // { value: 'myFunction', writable: false, enumerable: false, configurable: true }
 * 
 * // Anonymous function
 * const anon = function() {};
 * const anonDesc = getFunctionNameDescriptor(anon);
 * // { value: 'anon', writable: false, enumerable: false, configurable: true }
 * 
 * // Arrow function
 * const arrow = () => {};
 * const arrowDesc = getFunctionNameDescriptor(arrow);
 * // { value: 'arrow', writable: false, enumerable: false, configurable: true }
 * 
 * // Class
 * class MyClass {}
 * const classDesc = getFunctionNameDescriptor(MyClass);
 * // { value: 'MyClass', writable: false, enumerable: false, configurable: true }
 * ```
 */
declare function getFunctionNameDescriptor(fn: Function): FunctionNameDescriptor | undefined;

/**
 * Checks if a value is callable
 * 
 * @param value - The value to check
 * @returns true if the value is a function, false otherwise
 */
declare function isCallable(value: any): value is Function;

export { getFunctionNameDescriptor, FunctionNameDescriptor, isCallable };
