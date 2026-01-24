/**
 * Object.getPrototypeOf polyfill for older browsers
 * 
 * Provides a cross-browser compatible way to retrieve the prototype of an object.
 * Falls back to various detection methods when the native method is unavailable.
 * 
 * @module ObjectGetPrototypeOf
 * @dependencies
 * - 69a8: hasOwnProperty check utility
 * - 4bf8: toObject conversion utility
 * - 613b: shared key generator (IE_PROTO)
 */

import hasOwnProperty from '69a8';
import toObject from '4bf8';
import sharedKey from '613b';

/**
 * Retrieves the prototype of the specified object
 * 
 * @param target - The object whose prototype is to be retrieved
 * @returns The prototype of the given object, or null if no prototype exists
 * 
 * @example
 *