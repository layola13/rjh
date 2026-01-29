/**
 * Iterator methods definition module
 * @description Defines standard iterator methods (keys, values, entries) for constructors
 * @module IteratorMethods
 * @example
 * class MyCollection {
 *   constructor(items) { this.items = items; }
 * }
 * defineIterator(MyCollection, 'MyCollection', MyIterator, 'values');
 */

/**
 * Iterator kind type
 */
type IteratorKind = 'keys' | 'values' | 'entries';

/**
 * Iterator methods interface
 */
interface IteratorMethods<T> {
  keys(): Iterator<number>;
  values(): Iterator<T>;
  entries(): Iterator<[number, T]>;
}

/**
 * Defines iterator methods for a constructor
 * @template T - The type of elements being iterated
 * @template TConstructor - The target constructor type
 * @param Constructor - The constructor to add iterators to
 * @param constructorName - The constructor name for debugging
 * @param IteratorConstructor - Custom iterator constructor
 * @param defaultIteratorKind - Default iterator type
 * @returns Object containing all iterator methods
 */
declare function defineIterator<T, TConstructor extends new (...args: any[]) => any>(
  Constructor: TConstructor,
  constructorName: string,
  IteratorConstructor: new (target: any, kind: IteratorKind) => Iterator<T>,
  defaultIteratorKind: IteratorKind
): IteratorMethods<T>;

export { IteratorKind, IteratorMethods, defineIterator };