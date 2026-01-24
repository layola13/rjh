/**
 * Module: module_6c20
 * Original ID: 6c20
 * Dependencies: 48b5, c8ba, dd40
 * 
 * This module provides a utility to determine and export the global object
 * in different JavaScript environments (Node.js, Browser, Web Worker).
 */

import { normalizeGlobalObject } from './48b5';
import { nodeGlobal } from './c8ba';
import { getModuleExports } from './dd40';

/**
 * Represents the global object in different JavaScript environments
 */
interface GlobalObject {
  [key: string]: unknown;
}

/**
 * Type definition for the self object (available in browsers and web workers)
 */
declare const self: GlobalObject | undefined;

/**
 * Type definition for the window object (available in browsers)
 */
declare const window: GlobalObject | undefined;

/**
 * Determines the appropriate global object based on the current environment.
 * Priority order: self > window > node global > fallback object
 */
declare const resolvedGlobalObject: GlobalObject;

/**
 * The normalized and exported global object that can be safely used across
 * different JavaScript runtime environments (Node.js, Browser, Web Worker).
 * 
 * @remarks
 * This is the result of detecting the current environment's global object
 * and applying normalization via the imported utility function.
 * 
 * @example
 *