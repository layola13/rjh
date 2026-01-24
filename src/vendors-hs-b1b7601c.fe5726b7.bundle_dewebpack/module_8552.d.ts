/**
 * DataView getter module
 * 
 * This module retrieves the native DataView constructor from the root object.
 * Typically used in polyfill scenarios or cross-environment compatibility layers.
 * 
 * @module DataViewGetter
 */

/**
 * Native DataView constructor reference.
 * 
 * DataView provides a low-level interface for reading and writing
 * multiple number types in a binary ArrayBuffer.
 * 
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView}
 */
declare const dataViewGetter: DataViewConstructor;

export = dataViewGetter;