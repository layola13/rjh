/**
 * Core API Module Definitions
 * 
 * This module provides type declarations for a collection of HTTP and utility functions
 * used for data operations and activity tracking.
 */

/**
 * Sets or updates a resource with the provided data
 * @param resource - The resource identifier or path
 * @param data - The data to set
 * @returns Promise resolving to the operation result
 */
export function set<T = unknown>(resource: string, data: T): Promise<void>;

/**
 * Creates or updates a resource using PUT semantics
 * @param resource - The resource identifier or path
 * @param data - The data to put
 * @returns Promise resolving to the operation result
 */
export function put<T = unknown, R = unknown>(resource: string, data: T): Promise<R>;

/**
 * Deletes a specified resource
 * @param resource - The resource identifier or path to delete
 * @returns Promise resolving when deletion is complete
 */
export function del(resource: string): Promise<void>;

/**
 * Creates a new resource using POST semantics
 * @param resource - The resource identifier or path
 * @param data - The data to post
 * @returns Promise resolving to the created resource
 */
export function post<T = unknown, R = unknown>(resource: string, data: T): Promise<R>;

/**
 * Generic utility function for custom operations
 * @param args - Variable arguments for the function
 * @returns The result of the function execution
 */
export function fn<T = unknown>(...args: unknown[]): T;

/**
 * Retrieves activity information for a given identifier
 * @param activityId - The unique identifier for the activity
 * @returns Promise resolving to the activity data
 */
export function getActivity<T = unknown>(activityId: string): Promise<T>;

/**
 * Retrieves a resource by its identifier
 * @param resource - The resource identifier or path to retrieve
 * @returns Promise resolving to the resource data
 */
export function get<T = unknown>(resource: string): Promise<T>;

/**
 * Module exports
 */
export {
  set,
  put,
  del as delete,
  post,
  fn,
  getActivity,
  get
};

/**
 * Default export containing all module functions
 */
declare const api: {
  set: typeof set;
  put: typeof put;
  delete: typeof del;
  post: typeof post;
  fn: typeof fn;
  getActivity: typeof getActivity;
  get: typeof get;
};

export default api;