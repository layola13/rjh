/**
 * Creates a function that assigns properties from source objects to a destination object.
 * This is typically used to implement utility functions like `assign`, `defaults`, or `merge`.
 * 
 * @module AssignCreator
 */

/**
 * Callback function that performs the actual property assignment logic.
 * 
 * @param target - The destination object to assign properties to
 * @param source - The source object to copy properties from
 * @param sourceIndex - The index of the current source object in the sources array
 * @param customizer - Optional function to customize assigned values
 */
type AssignerCallback = (
  target: object,
  source: object,
  sourceIndex: number,
  customizer?: CustomizerFunction
) => void;

/**
 * Optional customizer function to modify how values are assigned.
 * 
 * @param objValue - The destination object's existing value
 * @param srcValue - The source object's value
 * @param key - The property key being assigned
 * @param object - The destination object
 * @param source - The source object
 * @returns The value to assign, or undefined to use default assignment
 */
type CustomizerFunction = (
  objValue: unknown,
  srcValue: unknown,
  key: string | number | symbol,
  object: object,
  source: object
) => unknown;

/**
 * Function that assigns properties from multiple source objects to a target object.
 * 
 * @param target - The destination object
 * @param sources - Source objects to copy properties from
 * @returns The modified target object
 */
type AssignFunction = <T extends object>(
  target: T,
  ...sources: Array<Partial<T> | undefined>
) => T;

/**
 * Creates an assigner function that merges properties from source objects into a target object.
 * 
 * @param assigner - The callback function that defines how properties are assigned
 * @returns A function that accepts a target object and source objects, returning the modified target
 * 
 * @example
 *