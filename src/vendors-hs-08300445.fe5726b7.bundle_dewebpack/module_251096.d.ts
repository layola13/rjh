/**
 * Action map utility types and functions for Redux-style action creators.
 * Provides functionality to flatten and unflatten action creator hierarchies.
 */

/**
 * Default namespace separator used for flattening/unflattening action paths.
 * @default "/"
 */
export const defaultNamespace: string;

/**
 * Flattened action map where keys are namespace-separated paths.
 * @example { "user/profile/update": Function, "user/logout": Function }
 */
export interface FlattenedActionMap {
  [key: string]: Function;
}

/**
 * Nested action map structure where actions are organized hierarchically.
 * @example { user: { profile: { update: Function }, logout: Function } }
 */
export interface NestedActionMap {
  [key: string]: Function | NestedActionMap;
}

/**
 * Flattens a nested action map into a single-level object with namespaced keys.
 * 
 * @param actionMap - The nested action creator map to flatten
 * @param namespace - The separator to use between namespace levels (default: "/")
 * @param result - Accumulator object for recursion (default: {})
 * @param prefix - Current namespace prefix for recursion (default: "")
 * @returns A flattened action map with namespaced keys
 * 
 * @example
 * const nested = {
 *   user: {
 *     login: () => {},
 *     logout: () => {}
 *   }
 * };
 * flattenActionMap(nested);
 * // Returns: { "user/login": Function, "user/logout": Function }
 */
export function flattenActionMap(
  actionMap: NestedActionMap,
  namespace?: string,
  result?: FlattenedActionMap,
  prefix?: string
): FlattenedActionMap;

/**
 * Unflattens a flat action creator map into a nested object structure.
 * 
 * @param flatActionMap - The flattened action creator map with namespaced keys
 * @param namespace - The separator used between namespace levels (default: "/")
 * @returns A nested action map organized hierarchically
 * 
 * @example
 * const flat = {
 *   "user/login": () => {},
 *   "user/logout": () => {}
 * };
 * unflattenActionCreators(flat);
 * // Returns: { user: { login: Function, logout: Function } }
 */
export function unflattenActionCreators(
  flatActionMap: FlattenedActionMap,
  namespace?: string
): NestedActionMap;