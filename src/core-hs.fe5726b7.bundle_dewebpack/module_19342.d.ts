/**
 * Checks if Object.getPrototypeOf correctly returns the prototype of an instance
 * when the constructor property has been set to null.
 * 
 * This is a polyfill detection utility that tests whether the JavaScript engine
 * properly implements prototype chain traversal even when constructor is overridden.
 * 
 * @returns {boolean} true if Object.getPrototypeOf works correctly, false otherwise
 */
declare function checkPrototypeSupport(): boolean;

export = checkPrototypeSupport;