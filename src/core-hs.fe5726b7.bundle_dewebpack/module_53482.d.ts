/**
 * Feature detection module for Promise constructor behavior.
 * Tests whether the Promise implementation correctly handles the constructor pattern
 * and properly processes rejected promises in Promise.all().
 */

/**
 * Checks if the Promise constructor behaves correctly according to ES6 specification.
 * 
 * This module tests two specific behaviors:
 * 1. Whether Promise.all() properly handles rejection callbacks
 * 2. Whether the CONSTRUCTOR flag is set (indicating proper Promise implementation)
 * 
 * @module PromiseConstructorDetection
 */

import { all as promiseAll } from './promise-implementation';
import { testPromiseBehavior } from './promise-tester';
import { CONSTRUCTOR as PROMISE_CONSTRUCTOR_FLAG } from './promise-config';

/**
 * Determines if the current environment has a compliant Promise constructor.
 * 
 * The detection works by:
 * - First checking the PROMISE_CONSTRUCTOR_FLAG
 * - If false, testing whether Promise.all() correctly handles rejection callbacks
 * 
 * @returns {boolean} True if the Promise constructor is compliant, false otherwise
 */
const hasCompliantPromiseConstructor: boolean = 
  PROMISE_CONSTRUCTOR_FLAG || 
  !testPromiseBehavior((promise: Promise<unknown>): void => {
    promiseAll(promise)
      .then(undefined, (): void => {
        // Empty rejection handler - used only for feature detection
      });
  });

export default hasCompliantPromiseConstructor;