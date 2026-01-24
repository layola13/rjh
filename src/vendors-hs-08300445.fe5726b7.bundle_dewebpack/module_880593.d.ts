/**
 * Form field utility functions for path-based value manipulation
 * Provides utilities for nested object/array access, cloning, and comparison
 */

/**
 * Represents a path segment in a nested structure
 * Can be a string key or numeric index
 */
export type NamePathSegment = string | number;

/**
 * A path to a nested value, expressed as an array of keys/indices
 * @example ['user', 'address', 0, 'street']
 */
export type NamePath = NamePathSegment[];

/**
 * Input that can be converted to a NamePath
 * Accepts single value or array of values
 */
export type NamePathInput = NamePathSegment | NamePath;

/**
 * Generic store object with unknown structure
 */
export type Store = Record<string, any>;

/**
 * Event-like object with a target property
 */
export interface TargetEvent {
  target?: Record<string, any>;
  [key: string]: any;
}

/**
 * Retrieves a value from a nested object/array using a path
 * @param store - The source object
 * @param namePath - Path to the target value
 * @returns The value at the specified path, or undefined if not found
 * @example getValue({ user: { name: 'Alice' } }, ['user', 'name']) // 'Alice'
 */
export declare function getValue<T = any>(store: Store, namePath: NamePath): T | undefined;

/**
 * Sets a value in a nested object/array at the specified path
 * Creates intermediate objects/arrays as needed
 * @param store - The target object
 * @param namePath - Path where the value should be set
 * @param value - The value to set
 * @returns A new object with the value set (immutable operation)
 * @example setValue({}, ['user', 'name'], 'Bob') // { user: { name: 'Bob' } }
 */
export declare function setValue<T = any>(store: Store, namePath: NamePath, value: T): Store;

/**
 * Sets multiple values in a store by merging update objects
 * Performs deep merge for nested plain objects
 * @param store - The base store object
 * @param updates - One or more partial objects to merge
 * @returns A new merged store
 * @example setValues({ a: 1 }, { b: 2 }, { c: 3 }) // { a: 1, b: 2, c: 3 }
 */
export declare function setValues(store: Store, ...updates: Partial<Store>[]): Store;

/**
 * Normalizes input to a NamePath array
 * @param input - Single segment or array of segments
 * @returns Normalized path array
 * @example getNamePath('user') // ['user']
 * @example getNamePath(['user', 'name']) // ['user', 'name']
 */
export declare function getNamePath(input: NamePathInput): NamePath;

/**
 * Clones specific fields from a source object by their name paths
 * @param source - The source object to clone from
 * @param namePathList - List of paths to clone
 * @returns A new object containing only the specified paths
 * @example cloneByNamePathList({ a: 1, b: 2 }, [['a']]) // { a: 1 }
 */
export declare function cloneByNamePathList(source: Store, namePathList: NamePath[]): Store;

/**
 * Checks if two name paths are identical
 * @param pathA - First path to compare
 * @param pathB - Second path to compare
 * @returns true if paths have same length and all segments match
 * @example matchNamePath(['user', 'name'], ['user', 'name']) // true
 */
export declare function matchNamePath(pathA: NamePath, pathB: NamePath): boolean;

/**
 * Checks if a path list contains a specific name path
 * @param pathList - List of paths to search
 * @param targetPath - Path to find
 * @returns true if targetPath exists in pathList
 */
export declare function containsNamePath(pathList: NamePath[] | undefined, targetPath: NamePath): boolean;

/**
 * Extracts value from an event object, handling form input events
 * If the event has a target with the specified property, returns that property's value
 * Otherwise returns the event itself (useful for custom onChange handlers)
 * @param valuePropName - Property name to extract (typically 'value' or 'checked')
 * @param event - The event object or direct value
 * @returns Extracted value or the event itself
 * @example defaultGetValueFromEvent('value', { target: { value: 'text' } }) // 'text'
 * @example defaultGetValueFromEvent('value', 'direct') // 'direct'
 */
export declare function defaultGetValueFromEvent(valuePropName: string, event?: TargetEvent | any): any;

/**
 * Checks if two objects are similar in structure
 * - Primitives: checks strict equality
 * - Objects: checks if all keys have equal values or both values are functions
 * - Useful for shallow comparison with function reference equality
 * @param objA - First object to compare
 * @param objB - Second object to compare
 * @returns true if objects are similar
 * @example isSimilar({ a: 1, fn: () => {} }, { a: 1, fn: () => {} }) // true (same keys/values)
 */
export declare function isSimilar(objA: any, objB: any): boolean;

/**
 * Moves an item in an array from one index to another
 * Returns a new array without mutating the original
 * @param array - The source array
 * @param fromIndex - Current index of the item
 * @param toIndex - Target index for the item
 * @returns A new array with the item moved, or original if indices are invalid
 * @example move(['a', 'b', 'c'], 0, 2) // ['b', 'c', 'a']
 */
export declare function move<T>(array: T[], fromIndex: number, toIndex: number): T[];