/**
 * Converts a value to an object by first validating it's not null/undefined.
 * This is typically used to safely convert primitives to their object wrappers.
 * 
 * @example
 * toObject('hello') // Returns String object wrapper
 * toObject(123) // Returns Number object wrapper
 * toObject(null) // Throws TypeError
 */

import type { ToObject } from './to-object';
import type { RequireObjectCoercible } from './require-object-coercible';

/**
 * Indexed object type - represents any object that can be indexed with string keys
 */
export type IndexedObject = Record<string, any>;

/**
 * Ensures the input is coercible to an object (not null/undefined),
 * then converts it to an object type.
 * 
 * @param value - The value to convert to an indexed object
 * @returns The value converted to an object with indexable properties
 * @throws {TypeError} If value is null or undefined
 */
declare function toIndexedObject<T>(value: T): IndexedObject;

export default toIndexedObject;