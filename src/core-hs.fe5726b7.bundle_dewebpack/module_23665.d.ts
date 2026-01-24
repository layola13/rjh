/**
 * Module: module_23665
 * 
 * This module serves as an ES module marker.
 * Originally part of a webpack bundle, it sets the __esModule property
 * to indicate that this module uses ES module syntax.
 */

/**
 * ES Module marker interface
 * Indicates that a module exports object conforms to ES module specifications
 */
export interface ESModuleMarker {
  /** Flag indicating this is an ES module (non-enumerable, non-writable) */
  readonly __esModule: true;
}

/**
 * Module exports
 * This module doesn't export any functional members, only the ES module marker
 */
declare const moduleExports: ESModuleMarker;

export default moduleExports;