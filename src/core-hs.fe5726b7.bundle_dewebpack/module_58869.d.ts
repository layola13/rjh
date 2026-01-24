/**
 * Detects if the code is running in a browser environment.
 * 
 * This module checks for the presence of `window` and `document` global objects
 * to determine if the code is executing in a browser context, while ensuring
 * it's not in a non-browser environment detected by other checks.
 * 
 * @module BrowserEnvironmentDetection
 */

import type { IsNonBrowserEnvironment } from './module_60241';
import type { IsAlternativeEnvironment } from './module_28493';

/**
 * Indicates whether the current runtime environment is a browser.
 * 
 * Returns `true` if:
 * - Not in a non-browser environment (module 60241 check fails)
 * - Not in an alternative environment (module 28493 check fails)
 * - `window` object exists and is of type "object"
 * - `document` object exists and is of type "object"
 * 
 * @returns `true` if running in a browser environment, `false` otherwise
 */
export declare const isBrowserEnvironment: boolean;

export default isBrowserEnvironment;