/**
 * Metadata management module for object tracking and weak reference handling.
 * Provides utilities for assigning unique identifiers and weak reference storage to objects.
 */

/**
 * Metadata storage structure attached to tracked objects.
 */
interface MetaData {
  /** Unique identifier for the object (format: "O" + counter) */
  i: string;
  /** Weak reference storage map */
  w: WeakMap<object, any> | Record<string, any>;
}

/**
 * Module exports interface for metadata operations.
 */
interface MetaModule {
  /** Symbol/string key used to store metadata on objects */
  KEY: symbol | string;
  
  /** Flag indicating whether metadata operations are required */
  NEED: boolean;
  
  /**
   * Generates a fast lookup key for the given value.
   * 
   * @param target - The value to generate a key for
   * @param create - Whether to create metadata if it doesn't exist
   * @returns A string key: 
   *   - For symbols: returns the symbol itself
   *   - For strings: "S" + string
   *   - For primitives: "P" + string representation
   *   - For non-extensible objects: "F" (frozen)
   *   - For extensible objects without metadata: "E" (empty)
   *   - For objects with metadata: the unique identifier
   */
  fastKey(target: any, create?: boolean): string | symbol;
  
  /**
   * Retrieves the weak reference storage for an object.
   * 
   * @param target - The object to get weak storage from
   * @param create - Whether to create metadata if it doesn't exist
   * @returns The weak reference storage, true for non-extensible objects, 
   *          or false if metadata doesn't exist and create is false
   */
  getWeak(target: object, create?: boolean): WeakMap<object, any> | Record<string, any> | boolean;
  
  /**
   * Callback to attach metadata before an object is frozen/sealed.
   * 
   * @param target - The object being frozen
   * @returns The same object (for chaining)
   */
  onFreeze<T extends object>(target: T): T;
}

/**
 * Attaches metadata to an object for tracking purposes.
 * 
 * @param target - The object to attach metadata to
 */
declare function attachMetadata(target: object): void;

/**
 * Exported metadata management module.
 */
declare const metaModule: MetaModule;

export default metaModule;
export { MetaData, MetaModule, attachMetadata };