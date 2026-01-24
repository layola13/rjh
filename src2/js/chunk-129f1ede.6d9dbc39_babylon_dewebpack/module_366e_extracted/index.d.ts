/**
 * Webpack Bundle Index
 * 
 * This module serves as the main entry point for bundled utilities.
 * It re-exports functionality from the following modules:
 * - set: Collection/object setter utilities
 * - get: Collection/object getter utilities  
 * - fn: Function utilities
 */

/**
 * Module for setting values in collections or objects
 */
export * from './module_set';

/**
 * Module for getting values from collections or objects
 */
export * from './module_get';

/**
 * Module for function utilities and helpers
 */
export * from './module_fn';