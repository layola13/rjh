/**
 * Module: module_get
 * 
 * A getter module that retrieves the default export from an internal object.
 * 
 * @module module_get
 */

/**
 * Retrieves the default value from the module's internal state.
 * 
 * @returns The default export value
 */
declare function get<T = unknown>(): T;

export default get;