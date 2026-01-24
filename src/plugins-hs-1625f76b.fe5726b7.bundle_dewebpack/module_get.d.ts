/**
 * Returns the base API manager instance.
 * 
 * This getter method provides access to the underlying API manager
 * that handles communication with the backend services.
 * 
 * @returns The base API manager instance
 */
declare function moduleGet<T = unknown>(): T;

export = moduleGet;