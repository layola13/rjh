/**
 * ES Module marker module
 * 
 * This module was originally compiled by webpack as module 19533.
 * It serves as an ES module marker, defining the __esModule property
 * on the exports object to indicate this is an ES6 module transpiled to CommonJS.
 * 
 * @module module_19533
 */

/**
 * Exports interface for the ES module marker.
 * This interface is empty as the module only sets the __esModule flag.
 */
export interface ESModuleMarker {
  /**
   * Standard property added by TypeScript/Babel to indicate
   * this module was originally an ES6 module.
   */
  readonly __esModule: true;
}

/**
 * This module doesn't export any runtime values or types.
 * It exists solely to mark the module as an ES6 module in the CommonJS context.
 */
declare const _default: ESModuleMarker;
export default _default;