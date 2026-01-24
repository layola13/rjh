/**
 * Global namespace initialization module
 * Ensures the NWTK global object is defined on the global scope
 */

/**
 * NWTK global namespace
 * This namespace serves as the root container for the application's global API
 */
declare global {
  /**
   * The main NWTK namespace object
   * Initialized to undefined if not already present
   */
  var NWTK: undefined | unknown;
}

/**
 * Initializes the NWTK global namespace if it doesn't exist
 * Sets it to undefined as the initial value
 */
export function initializeNWTKNamespace(): void;

export {};