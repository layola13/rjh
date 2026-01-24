/**
 * Iterator/Collection utility module type definitions
 */

/**
 * Checks if there are more elements to iterate
 * @returns true if there are more elements, false otherwise
 */
export function hasNext(): boolean;

/**
 * Moves to and returns the next element in the iteration
 * @returns The next element
 */
export function next<T>(): T;

/**
 * Adds an element to the collection
 * @param value - The value to add
 * @returns The updated collection or void
 */
export function add<T>(value: T): void;

/**
 * Starts or initializes the iteration/collection
 * @param initialValue - Optional initial value or configuration
 */
export function start<T>(initialValue?: T): void;

/**
 * Sets a value at a specific key or index
 * @param key - The key or index
 * @param value - The value to set
 */
export function set<K, V>(key: K, value: V): void;

/**
 * Gets a value by key or index
 * @param key - The key or index to retrieve
 * @returns The value at the specified key
 */
export function get<K, V>(key: K): V | undefined;

/**
 * Ends the iteration or resets to the end position
 */
export function end(): void;

/**
 * Removes and returns the last element
 * @returns The removed element
 */
export function pop<T>(): T | undefined;

/**
 * Returns all keys in the collection
 * @returns Array of keys
 */
export function keys<K>(): K[];

/**
 * Checks if the collection is empty
 * @returns true if empty, false otherwise
 */
export function isEmpty(): boolean;

/**
 * Increments a numeric value
 * @param key - Optional key for the value to increment
 * @param delta - The amount to increment by (default: 1)
 * @returns The new value after incrementing
 */
export function inc(key?: string | number, delta?: number): number;