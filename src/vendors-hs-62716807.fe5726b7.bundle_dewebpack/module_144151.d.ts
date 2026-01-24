/**
 * Determines if the current runtime environment is Node.js by checking
 * for the existence of the global `process` object and verifying its type.
 * 
 * @module EnvironmentDetection
 * @returns {boolean} True if running in Node.js environment, false otherwise
 */

import classof from './classof';

/**
 * Checks whether the code is executing in a Node.js environment.
 * 
 * This function performs two checks:
 * 1. Verifies that the `process` global variable is defined
 * 2. Confirms that the internal class type of `process` is "process"
 * 
 * @example
 *