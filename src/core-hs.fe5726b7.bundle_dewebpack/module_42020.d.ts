/**
 * Object.assign polyfill module
 * 
 * This module extends the Object constructor with the assign method
 * if the native implementation is missing or differs from the polyfill.
 * 
 * @module ObjectAssignPolyfill
 */

/**
 * Configuration options for exporting a method to a target object
 */
interface ExportConfig {
  /** The target object to extend (e.g., 'Object', 'Array', 'String') */
  target: string;
  
  /** Whether this is a static method on the constructor */
  stat: boolean;
  
  /** The expected number of arguments (arity) for the method */
  arity: number;
  
  /** Whether to force override the existing implementation */
  forced: boolean;
}

/**
 * Export utility function that adds methods to global constructors
 * 
 * @param config - Configuration specifying target and behavior
 * @param methods - Object containing method implementations to export
 */
declare function exportToGlobal(
  config: ExportConfig,
  methods: Record<string, (...args: any[]) => any>
): void;

/**
 * Copies all enumerable own properties from one or more source objects to a target object
 * 
 * @param target - The target object to copy properties to
 * @param sources - One or more source objects to copy properties from
 * @returns The modified target object
 * 
 * @example
 * const obj1 = { a: 1 };
 * const obj2 = { b: 2 };
 * const result = Object.assign(obj1, obj2); // { a: 1, b: 2 }
 */
declare function objectAssign<T extends object, U extends object[]>(
  target: T,
  ...sources: U
): T & U[number];

declare global {
  interface ObjectConstructor {
    /**
     * Copy the values of all enumerable own properties from one or more source objects to a target object
     * @param target The target object to copy to
     * @param sources One or more source objects from which to copy properties
     */
    assign<T extends object, U extends object[]>(target: T, ...sources: U): T & U[number];
  }
}

export { exportToGlobal, objectAssign };