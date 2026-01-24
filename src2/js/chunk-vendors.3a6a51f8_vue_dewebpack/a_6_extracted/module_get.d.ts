/**
 * Module: module_get
 * Original module ID: get
 * 
 * Gets and returns a value. The exact type depends on the runtime context.
 * 
 * @returns The retrieved value
 */
declare function get<T = unknown>(): T;

export default get;