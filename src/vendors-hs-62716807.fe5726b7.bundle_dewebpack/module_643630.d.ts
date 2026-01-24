/**
 * Feature detection for Object.defineProperty support in non-ES5 environments.
 * 
 * This module tests whether the JavaScript engine properly supports Object.defineProperty
 * on DOM elements. It's commonly used for polyfill decisions in legacy browser support.
 * 
 * @module PropertyDescriptorDetection
 * @returns {boolean} True if Object.defineProperty is NOT natively supported or fails the test
 */

/**
 * Checks if the environment is a descriptor-capable environment.
 * Returns true when Object.defineProperty does NOT work correctly.
 */
declare const isDescriptorBuggy: boolean;

export default isDescriptorBuggy;

/**
 * Internal implementation (for reference):
 * 
 * import isNativeSupported from './module_907253';
 * import fails from './module_679594';
 * import createElement from './module_957118';
 * 
 * const isDescriptorBuggy: boolean = !isNativeSupported && !fails(() => {
 *   return Object.defineProperty(createElement("div"), "a", {
 *     get(): number {
 *       return 7;
 *     }
 *   }).a !== 7;
 * });
 */