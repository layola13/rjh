/**
 * Polyfill/dependency aggregation module
 * 
 * This module imports a collection of polyfills, shims, or feature modules
 * to ensure compatibility across different environments.
 * 
 * @module PolyfillAggregator
 * @remarks
 * The original webpack module (945535) served as an entry point to load
 * multiple dependencies. Each numeric import represents a separate module
 * that extends browser APIs, adds missing features, or configures the runtime.
 */

/**
 * Module loader function type
 * @param exports - The exports object to be populated by this module
 * @param module - The module metadata object
 * @param require - The module require function for loading dependencies
 */
type ModuleLoaderFunction = (
  exports: Record<string, unknown>,
  module: { exports: Record<string, unknown> },
  require: (moduleId: number) => unknown
) => void;

/**
 * Polyfill module IDs that this module depends on
 * @internal
 */
declare const POLYFILL_MODULE_IDS: readonly [
  767776, 354638, 467185, 727525, 951454, 771480, 579684, 59104,
  621867, 680905, 727456, 645535, 807296, 30905, 607790, 791158,
  584638, 996370, 899401, 81655, 554819, 382753, 373791, 549809,
  728364, 209208, 512935, 549577, 596953, 526557, 114252, 582258,
  815524, 921105, 159360, 354614, 533754, 494562, 152044, 57129,
  968352, 730968, 572294, 694694, 230123, 678933, 571058, 7726,
  477332, 270509, 946903, 958083, 151072, 167809, 804909, 284121,
  228359, 763200
];

/**
 * Initializes all required polyfills and feature modules
 * 
 * @param require - Module require function for loading dependencies
 * @returns void
 * 
 * @remarks
 * This function sequentially imports all polyfill modules to ensure
 * they are executed and their side effects (global augmentations,
 * prototype extensions, etc.) are applied before application code runs.
 * 
 * Common polyfills typically include:
 * - ES6+ language features (Promise, Symbol, Array methods)
 * - DOM APIs (fetch, IntersectionObserver, CustomEvent)
 * - Browser compatibility shims
 */
declare function initializePolyfills(require: (moduleId: number) => void): void;

export type { ModuleLoaderFunction, POLYFILL_MODULE_IDS };
export { initializePolyfills };