/**
 * Module Bundle Type Definitions
 * 
 * This declaration file provides type definitions for the bundled modules.
 * It includes type-safe interfaces for set and get operations.
 */

/**
 * Sets a value in the storage or data structure
 * @param key - The key identifier for the value
 * @param value - The value to be stored
 * @returns True if the operation was successful, false otherwise
 */
export function set<T = unknown>(key: string, value: T): boolean;

/**
 * Retrieves a value from the storage or data structure
 * @param key - The key identifier for the value to retrieve
 * @returns The stored value, or undefined if the key doesn't exist
 */
export function get<T = unknown>(key: string): T | undefined;

/**
 * Configuration options for module operations
 */
export interface ModuleOptions {
  /** Enable strict mode validation */
  strict?: boolean;
  /** Default expiration time in milliseconds */
  ttl?: number;
  /** Enable automatic serialization */
  serialize?: boolean;
}

/**
 * Result type for operations that may fail
 */
export interface OperationResult<T> {
  /** Indicates if the operation was successful */
  success: boolean;
  /** The result data if successful */
  data?: T;
  /** Error message if operation failed */
  error?: string;
}