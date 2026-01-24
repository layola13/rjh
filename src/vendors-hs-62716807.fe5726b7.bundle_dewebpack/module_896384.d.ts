/**
 * Feature detection for Object.getPrototypeOf with constructor property
 * 
 * Checks whether Object.getPrototypeOf correctly returns the prototype
 * when the constructor property is set to null.
 * 
 * This module exports a boolean indicating if the JavaScript engine
 * properly handles prototype chain lookups even when constructor is nullified.
 * 
 * @module PrototypeDetection
 */

/**
 * Result of the prototype detection test.
 * 
 * - `true`: Engine correctly handles getPrototypeOf (feature supported)
 * - `false`: Engine has issues with getPrototypeOf when constructor is null
 */
declare const supportsGetPrototypeOf: boolean;

export default supportsGetPrototypeOf;