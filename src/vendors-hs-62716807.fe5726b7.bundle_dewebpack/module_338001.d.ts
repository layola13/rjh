/**
 * Feature detection utility module for checking native vs polyfill implementations.
 * 
 * This module provides functionality to detect whether a given feature is natively
 * supported, requires a polyfill, or has a specific implementation status.
 * 
 * @module FeatureDetection
 */

/**
 * Status indicating a native implementation exists
 */
export const NATIVE = "N";

/**
 * Status indicating a polyfill is required
 */
export const POLYFILL = "P";

/**
 * Storage for feature detection results
 */
export const data: Record<string, string>;

/**
 * Normalizes a feature name by replacing hash symbols and prototype references
 * with dots, then converting to lowercase.
 * 
 * @param featureName - The feature name to normalize
 * @returns The normalized feature name
 * 
 * @example
 * normalize("Array#map") // "array.map"
 * normalize("Object.prototype.toString") // "object.prototype.tostring"
 */
export function normalize(featureName: string): string;

/**
 * Detects whether a feature is natively implemented or requires a polyfill.
 * 
 * This function checks the feature detection data store and determines the
 * implementation status based on stored results or by testing the provided detector.
 * 
 * @param featureName - The name of the feature to check
 * @param detector - Either a function to test the feature or a boolean indicating support
 * @returns `true` if the feature is native/supported, `false` if it requires a polyfill
 * 
 * @remarks
 * - If the feature is marked as NATIVE ("N"), returns true
 * - If the feature is marked as POLYFILL ("P"), evaluates the detector
 * - If detector is a function, attempts to execute it safely
 * - If detector is a boolean, returns it directly
 */
export default function featureDetection(
  featureName: string,
  detector: (() => unknown) | boolean
): boolean;

/**
 * Feature detection function with additional static properties
 */
export interface FeatureDetectionFunction {
  (featureName: string, detector: (() => unknown) | boolean): boolean;
  normalize: typeof normalize;
  data: typeof data;
  NATIVE: typeof NATIVE;
  POLYFILL: typeof POLYFILL;
}