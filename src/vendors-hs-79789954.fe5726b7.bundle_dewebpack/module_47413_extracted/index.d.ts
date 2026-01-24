/**
 * Webpack Bundle Index - Type Definitions
 * 
 * This module provides type definitions for the core bundle functionality
 * including getter operations, value management, resource cleanup, and content loading.
 */

/**
 * Retrieves a value from a data source or collection.
 * 
 * @template T - The type of value to retrieve
 * @param key - The identifier or key to locate the value
 * @param defaultValue - Optional default value to return if key is not found
 * @returns The retrieved value or default value
 */
export function get<T = unknown>(key: string, defaultValue?: T): T;

/**
 * Retrieves a value with path traversal support.
 * 
 * @template T - The expected return type
 * @param target - The object to query
 * @param path - The path of the property to get (supports dot notation)
 * @param defaultValue - The value returned if the resolved value is undefined
 * @returns The resolved value
 */
export function get<T = unknown>(
  target: Record<string, unknown>,
  path: string | string[],
  defaultValue?: T
): T;

/**
 * Represents a value container with metadata and accessor methods.
 * 
 * @template T - The type of the contained value
 */
export interface Value<T = unknown> {
  /** The actual stored value */
  readonly data: T;
  
  /** Timestamp when the value was created or last modified */
  readonly timestamp: number;
  
  /** Indicates if the value is valid/initialized */
  readonly isValid: boolean;
  
  /**
   * Retrieves the stored value
   * @returns The contained value
   */
  getValue(): T;
  
  /**
   * Updates the stored value
   * @param newValue - The new value to store
   */
  setValue(newValue: T): void;
  
  /**
   * Clears the stored value
   */
  clear(): void;
}

/**
 * Creates a new value container instance.
 * 
 * @template T - The type of value to store
 * @param initialValue - The initial value to store
 * @returns A new Value instance
 */
export function value<T>(initialValue: T): Value<T>;

/**
 * Options for resource destruction.
 */
export interface DestroyOptions {
  /** Force destruction even if there are active references */
  force?: boolean;
  
  /** Recursively destroy nested resources */
  recursive?: boolean;
  
  /** Timeout in milliseconds before forcing destruction */
  timeout?: number;
}

/**
 * Callback invoked before resource destruction.
 * 
 * @param resource - The resource about to be destroyed
 * @returns False to cancel destruction, true or void to proceed
 */
export type BeforeDestroyCallback = (resource: unknown) => boolean | void;

/**
 * Destroys a resource and cleans up associated memory/references.
 * 
 * @param resource - The resource to destroy
 * @param options - Optional destruction configuration
 * @returns True if destruction was successful, false otherwise
 */
export function destroy(resource: unknown, options?: DestroyOptions): boolean;

/**
 * Registers a cleanup callback to be invoked before destruction.
 * 
 * @param resource - The resource to monitor
 * @param callback - Function to call before destroying the resource
 */
export function destroy(resource: unknown, callback: BeforeDestroyCallback): void;

/**
 * Options for content loading operations.
 */
export interface LoadContentsOptions {
  /** Text encoding to use when loading content */
  encoding?: BufferEncoding;
  
  /** Maximum file size to load in bytes */
  maxSize?: number;
  
  /** Whether to cache the loaded content */
  cache?: boolean;
  
  /** Timeout for the load operation in milliseconds */
  timeout?: number;
}

/**
 * Result of a content loading operation.
 * 
 * @template T - The type of loaded content
 */
export interface LoadContentsResult<T = string> {
  /** The loaded content data */
  content: T;
  
  /** Size of the loaded content in bytes */
  size: number;
  
  /** Content MIME type if detected */
  mimeType?: string;
  
  /** Timestamp when content was loaded */
  loadedAt: number;
}

/**
 * Loads the contents from a specified source.
 * 
 * @param source - The source path, URL, or identifier
 * @param options - Optional loading configuration
 * @returns Promise resolving to the loaded content result
 * @throws Error if loading fails or source is invalid
 */
export function loadContentsOf(
  source: string,
  options?: LoadContentsOptions
): Promise<LoadContentsResult<string>>;

/**
 * Loads the contents as a specific type.
 * 
 * @template T - The expected content type
 * @param source - The source to load from
 * @param options - Loading configuration with encoding/parsing hints
 * @returns Promise resolving to typed content result
 */
export function loadContentsOf<T>(
  source: string,
  options?: LoadContentsOptions & { parse?: boolean }
): Promise<LoadContentsResult<T>>;