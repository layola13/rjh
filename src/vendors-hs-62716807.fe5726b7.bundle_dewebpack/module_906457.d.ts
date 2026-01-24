/**
 * Iterator factory function that creates standard iterators for objects.
 * This module provides a utility to define iterable protocols on custom objects.
 */

/**
 * Configuration object for iterator methods (keys, values, entries)
 */
interface IteratorMethods<T> {
  /** Iterator for values */
  values: () => Iterator<T>;
  /** Iterator for keys */
  keys: () => Iterator<string | number | symbol>;
  /** Iterator for entries (key-value pairs) */
  entries: () => Iterator<[string | number | symbol, T]>;
}

/**
 * Defines an iterator protocol on a constructor's prototype.
 * 
 * @template TInstance - The instance type of the constructor
 * @template TValue - The value type yielded by the iterator
 * 
 * @param Constructor - The constructor function whose prototype will receive iterator methods
 * @param name - The name of the collection (e.g., 'Array', 'Map', 'Set')
 * @param IteratorConstructor - Constructor for the iterator object
 * @param iteratorMethod - The specific iterator method being defined ('keys', 'values', 'entries')
 * @param defaultIteratorKind - The default iteration kind when using Symbol.iterator
 * @param isEnumerableIterator - Whether the iterator should be enumerable
 * @param isOverridingNativeIterator - Whether this overrides a native iterator implementation
 * 
 * @returns An object containing the created iterator methods (values, keys, entries)
 * 
 * @remarks
 * This function handles:
 * - Creating iterator methods on prototypes
 * - Fixing BUGGY_SAFARI_ITERATORS behavior
 * - Properly setting up Symbol.iterator
 * - Managing prototype chain for IteratorPrototype
 * - Handling name conflicts with native implementations
 */
declare function defineIterator<TInstance = any, TValue = any>(
  Constructor: new (...args: any[]) => TInstance,
  name: string,
  IteratorConstructor: new (instance: TInstance, kind: string) => Iterator<TValue>,
  iteratorMethod: string,
  defaultIteratorKind?: string,
  isEnumerableIterator?: boolean,
  isOverridingNativeIterator?: boolean
): IteratorMethods<TValue>;

export = defineIterator;