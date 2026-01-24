/**
 * Iterator and toString tag polyfill module
 * Adds iterator and toStringTag symbols to DOM prototypes for cross-browser compatibility
 */

import type { GlobalObject } from './types/global';
import type { IterableCollections } from './types/collections';
import type { DOMTokenListConstructor } from './types/dom';

/**
 * Well-known symbols for iteration and string representation
 */
declare const ITERATOR_SYMBOL: unique symbol;
declare const TO_STRING_TAG_SYMBOL: unique symbol;

/**
 * Configuration mapping for iterable collection types
 * Maps collection names to their iteration behavior
 */
interface IterableCollectionsConfig {
  [key: string]: boolean;
}

/**
 * Array iterator methods interface
 */
interface ArrayIteratorMethods<T> {
  values(): IterableIterator<T>;
  keys(): IterableIterator<number>;
  entries(): IterableIterator<[number, T]>;
  [Symbol.iterator](): IterableIterator<T>;
}

/**
 * Adds iterator and toStringTag properties to a prototype
 * 
 * @param target - The prototype object to enhance
 * @param tagName - The value for Symbol.toStringTag
 * 
 * @remarks
 * This function ensures DOM prototypes have proper iterator support and
 * string tag identification across different JavaScript environments
 */
declare function addIteratorSupport(
  target: object | undefined,
  tagName: string
): void;

/**
 * Global object reference (typically window in browsers)
 */
declare const global: GlobalObject;

/**
 * Iterable collections configuration
 */
declare const iterableCollections: IterableCollectionsConfig;

/**
 * DOMTokenList constructor reference
 */
declare const DOMTokenList: DOMTokenListConstructor;

/**
 * Collection of array iterator methods
 */
declare const arrayIterators: ArrayIteratorMethods<unknown>;

/**
 * Creates a non-enumerable property on an object
 * 
 * @param target - The object to define the property on
 * @param key - The property key (string or symbol)
 * @param value - The property value
 */
declare function createNonEnumerableProperty(
  target: object,
  key: PropertyKey,
  value: unknown
): void;

/**
 * Retrieves a well-known symbol by name
 * 
 * @param name - The symbol name (e.g., 'iterator', 'toStringTag')
 * @returns The corresponding symbol
 */
declare function getWellKnownSymbol(name: string): symbol;

export type {
  GlobalObject,
  IterableCollections,
  DOMTokenListConstructor,
  ArrayIteratorMethods,
  IterableCollectionsConfig
};

export {
  addIteratorSupport,
  createNonEnumerableProperty,
  getWellKnownSymbol,
  ITERATOR_SYMBOL,
  TO_STRING_TAG_SYMBOL
};