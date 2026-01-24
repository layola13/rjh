/**
 * Feature detection utility for determining if a feature is natively supported or polyfilled.
 * Checks whether a given feature exists natively in the environment or requires a polyfill.
 * 
 * @module FeatureDetection
 */

/**
 * Status indicating the feature is natively supported by the environment.
 */
export const NATIVE = "N";

/**
 * Status indicating the feature requires a polyfill.
 */
export const POLYFILL = "P";

/**
 * Storage for feature detection results.
 * Maps normalized feature names to their support status (NATIVE or POLYFILL).
 */
export const data: Record<string, string>;

/**
 * Normalizes a feature name by converting it to lowercase and replacing
 * hash symbols (#) and ".prototype." patterns with dots.
 * 
 * @param featureName - The feature name to normalize
 * @returns The normalized feature name
 * 
 * @example
 * normalize("Array.prototype.map") // returns "array.map"
 * normalize("Object#keys") // returns "object.keys"
 */
export function normalize(featureName: string): string;

/**
 * Checks if a feature is supported natively or requires a polyfill.
 * 
 * @param featureName - The name of the feature to check
 * @param implementation - Either a function to test or a boolean indicating support
 * @returns `true` if the feature is natively supported (status === NATIVE),
 *          `false` if it requires a polyfill (status === POLYFILL),
 *          or the result of testing the implementation
 * 
 * @example
 * // Check if Array.prototype.includes is supported
 * featureDetection("Array.prototype.includes", Array.prototype.includes)
 * 
 * @example
 * // Test with a function
 * featureDetection("fetch", () => typeof fetch !== "undefined")
 */
declare function featureDetection(
  featureName: string,
  implementation: (() => boolean | unknown) | boolean
): boolean;

export default featureDetection;