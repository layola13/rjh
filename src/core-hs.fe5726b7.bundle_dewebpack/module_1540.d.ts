/**
 * Internal metadata management for object tracking and weak references.
 * Provides utilities for assigning unique IDs to objects and managing weak data storage.
 */

/**
 * Metadata structure attached to objects for tracking purposes.
 */
interface ObjectMetadata {
  /** Unique object identifier string (format: "O" + incrementing number) */
  objectID: string;
  /** Storage for weak reference data associated with this object */
  weakData: Record<string, unknown>;
}

/**
 * Options for the fastKey function.
 */
interface FastKeyOptions {
  /** Whether to create metadata if it doesn't exist */
  createIfMissing?: boolean;
}

/**
 * Internal metadata management module exports.
 */
interface InternalMetadataModule {
  /**
   * Enables enhanced property enumeration filtering to hide metadata properties.
   * Patches Object.getOwnPropertyNames to exclude internal metadata symbols.
   * This function can only be called once; subsequent calls are no-ops.
   */
  enable(): void;

  /**
   * Generates a fast lookup key for an object or primitive value.
   * 
   * @param value - The value to generate a key for
   * @param createMetadata - Whether to create metadata for extensible objects that lack it
   * @returns A string key:
   *   - For symbols: returns the symbol itself
   *   - For strings: "S" + the string value
   *   - For other primitives: "P" + the primitive value
   *   - For frozen objects: "F"
   *   - For extensible objects without metadata (when createMetadata=false): "E"
   *   - For objects with metadata: their unique objectID
   */
  fastKey(value: unknown, createMetadata?: boolean): string | symbol;

  /**
   * Retrieves the weak data storage for an object.
   * 
   * @param target - The object to get weak data for
   * @param createMetadata - Whether to create metadata if it doesn't exist
   * @returns The weak data storage object, or:
   *   - `true` if the object is frozen (non-extensible)
   *   - `false` if the object is extensible but lacks metadata and createMetadata=false
   */
  getWeakData(target: object, createMetadata?: boolean): Record<string, unknown> | boolean;

  /**
   * Callback to invoke when an object is frozen.
   * Ensures metadata is attached before the object becomes non-extensible.
   * 
   * @param target - The object being frozen
   * @returns The same object (for chaining)
   */
  onFreeze<T extends object>(target: T): T;
}

/**
 * Internal metadata management system.
 * Not intended for public use - implementation detail of WeakMap/WeakSet polyfills.
 */
export const InternalMetadata: InternalMetadataModule;