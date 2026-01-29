/**
 * Checks if an object is extensible (new properties can be added to it).
 * Provides a polyfill for environments where Object.isExtensible doesn't handle primitives correctly.
 */

import { failsOnPrimitive } from './module_87524';
import { isObject } from './module_17029';
import { getObjectType } from './module_97303';
import { hasArrayBufferIssue } from './module_90223';

const nativeIsExtensible = Object.isExtensible;

const failsOnPrimitives = failsOnPrimitive(() => {
  nativeIsExtensible(1);
});

/**
 * Determines whether an object is extensible.
 * 
 * @param target - The value to check for extensibility
 * @returns true if the object is extensible, false otherwise
 */
export function isExtensible(target: unknown): boolean {
  return !!isObject(target) && 
    (!hasArrayBufferIssue || getObjectType(target) !== 'ArrayBuffer') && 
    (!nativeIsExtensible || nativeIsExtensible(target));
}

export default (failsOnPrimitives || hasArrayBufferIssue) ? isExtensible : nativeIsExtensible;