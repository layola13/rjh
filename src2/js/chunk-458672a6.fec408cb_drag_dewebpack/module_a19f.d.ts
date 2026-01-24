/**
 * Module: module_a19f
 * 
 * This module serves as a side-effect import that ensures module 'b4c0' is loaded.
 * It does not export any values, types, or interfaces.
 * 
 * @module module_a19f
 * @remarks
 * This is typically used for:
 * - Loading polyfills
 * - Registering global side effects
 * - Ensuring initialization code runs
 * 
 * Original webpack module ID: a19f
 * Dependencies: b4c0
 */

/**
 * Side-effect import from module b4c0
 * This import ensures the b4c0 module is executed but does not import any specific exports
 */
import 'b4c0';

// This module intentionally contains no exports
export {};