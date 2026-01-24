/**
 * Array unscopables utility module
 * 
 * Adds properties to Array.prototype[Symbol.unscopables] to exclude them
 * from `with` statement scope. This prevents certain array methods from
 * being shadowed in legacy `with` blocks.
 * 
 * @module ArrayUnscopables
 */

/**
 * Well-known symbol for unscopables
 * Imported from module "2b4c" (typically returns Symbol.unscopables)
 */
declare const unscopablesSymbol: symbol;

/**
 * Property definition utility
 * Imported from module "32e9" (typically Object.defineProperty wrapper)
 */
declare function defineProperty<T extends object>(
  target: T,
  key: PropertyKey,
  descriptor: PropertyDescriptor
): void;

/**
 * Marks an array method as unscopable
 * 
 * When a method is marked as unscopable, it won't be accessible within
 * a `with(array)` statement, preventing potential naming conflicts.
 * 
 * @param methodName - The name of the Array.prototype method to mark as unscopable
 * 
 * @example
 *