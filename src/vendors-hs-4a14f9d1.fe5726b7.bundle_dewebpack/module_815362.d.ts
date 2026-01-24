/**
 * HSMath Module
 * 
 * Mathematical utilities module originally loaded from module ID 29959.
 * This module is exposed globally as HSMath.
 * 
 * @module HSMath
 */

/**
 * HSMath namespace containing mathematical utility functions and classes.
 * 
 * Note: The actual implementation details are in the source module (29959).
 * This declaration file should be updated once the actual module structure is known.
 */
declare namespace HSMath {
  // Add specific type declarations here based on the actual HSMath module content
}

/**
 * Global HSMath export
 */
export = HSMath;

/**
 * Global namespace augmentation for browser environment
 */
declare global {
  interface Window {
    HSMath: typeof HSMath;
  }
}