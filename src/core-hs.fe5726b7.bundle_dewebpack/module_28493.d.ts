/**
 * Detects if the current environment has a Node.js process object.
 * 
 * This module checks whether the global `process` object exists and
 * is actually a process object (not a polyfill or mock).
 * 
 * @module ProcessDetection
 */

import { getObjectType } from './object-type-checker';

/**
 * Determines if the code is running in a Node.js environment.
 * 
 * Checks two conditions:
 * 1. The `process` global variable is defined
 * 2. The internal type of `process` is 'process' (verified via type checker)
 * 
 * @returns {boolean} `true` if running in Node.js environment, `false` otherwise
 * 
 * @example
 *