/**
 * Webpack Bundle Index - Type Definitions
 * Collection of utility modules for data manipulation and iteration
 */

/**
 * Adds an element to a collection
 * @param collection - The target collection
 * @param item - The item to add
 * @returns The updated collection or void
 */
export function add<T>(collection: T[], item: T): T[];
export function add<K, V>(collection: Map<K, V>, key: K, value: V): Map<K, V>;
export function add<T>(collection: Set<T>, item: T): Set<T>;

/**
 * Removes and returns the last element from a collection
 * @param collection - The target collection
 * @returns The removed element or undefined if empty
 */
export function pop<T>(collection: T[]): T | undefined;

/**
 * Retrieves an element from a collection by key or index
 * @param collection - The target collection
 * @param key - The key or index to retrieve
 * @returns The element at the specified position or undefined
 */
export function get<T>(collection: T[], index: number): T | undefined;
export function get<K, V>(collection: Map<K, V>, key: K): V | undefined;
export function get<T extends Record<string, unknown>>(collection: T, key: keyof T): T[keyof T] | undefined;

/**
 * Checks if a collection is empty
 * @param collection - The collection to check
 * @returns True if the collection is empty, false otherwise
 */
export function isEmpty<T>(collection: T[] | Set<T> | Map<unknown, unknown> | Record<string, unknown> | string | null | undefined): boolean;

/**
 * Initializes or starts a process/iterator
 * @param target - The target to start
 * @returns An iterator or initial state
 */
export function start<T>(target: Iterable<T>): Iterator<T>;
export function start<T>(target: T): T;

/**
 * Retrieves all keys from a collection
 * @param collection - The target collection
 * @returns An array of keys
 */
export function keys<K>(collection: Map<K, unknown>): K[];
export function keys<T extends Record<string, unknown>>(collection: T): Array<keyof T>;
export function keys<T>(collection: Set<T>): T[];

/**
 * Increments a numeric value
 * @param value - The value to increment
 * @param step - The increment step (default: 1)
 * @returns The incremented value
 */
export function inc(value: number, step?: number): number;

/**
 * Advances to the next element in an iteration
 * @param iterator - The iterator to advance
 * @returns The next element or iteration result
 */
export function next<T>(iterator: Iterator<T>): IteratorResult<T>;

/**
 * Sets a value in a collection at the specified key or index
 * @param collection - The target collection
 * @param key - The key or index
 * @param value - The value to set
 * @returns The updated collection
 */
export function set<T>(collection: T[], index: number, value: T): T[];
export function set<K, V>(collection: Map<K, V>, key: K, value: V): Map<K, V>;
export function set<T extends Record<string, unknown>, K extends keyof T>(collection: T, key: K, value: T[K]): T;

/**
 * Checks if an iterator has more elements
 * @param iterator - The iterator to check
 * @returns True if there are more elements, false otherwise
 */
export function hasNext<T>(iterator: Iterator<T>): boolean;

/**
 * Completes or finalizes an iteration/process
 * @param target - The target to end
 * @returns The final state or void
 */
export function end<T>(target: Iterator<T>): void;
export function end<T>(target: T): T;