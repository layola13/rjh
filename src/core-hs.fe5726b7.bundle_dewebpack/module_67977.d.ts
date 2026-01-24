/**
 * Detects if Function.prototype.bind is properly implemented.
 * 
 * Tests whether the bind() method:
 * 1. Returns a function
 * 2. Does not carry over the "prototype" property (bound functions should not have prototype)
 * 
 * Returns true if bind() works correctly, false if the implementation is broken.
 * 
 * @module BindSupport
 */

/**
 * Checks if the native Function.prototype.bind implementation is correct.
 * 
 * A proper bind() implementation should:
 * - Return a callable function
 * - Not preserve the prototype property on the bound function
 * 
 * @returns {boolean} True if bind() is correctly implemented, false otherwise
 */
declare function hasCorrectBindSupport(): boolean;

export default hasCorrectBindSupport;