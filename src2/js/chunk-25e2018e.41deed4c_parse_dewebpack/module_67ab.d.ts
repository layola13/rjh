/**
 * Metadata management module for objects
 * Provides functionality for attaching and managing metadata to objects,
 * including weak reference tracking and extensibility checks.
 */

/**
 * Metadata object structure attached to tracked objects
 */
interface MetaData {
  /** Unique identifier for the object */
  i: string;
  /** Weak reference storage */
  w: WeakMap<object, any> | Record<string, any>;
}

/**
 * Module export interface
 */
interface MetaModule {
  /** Metadata property key symbol/string */
  KEY: string | symbol;
  /** Flag indicating if metadata is needed */
  NEED: boolean;
  /** 
   * Get a fast key for the given object
   * @param target - The object to get a key for
   * @param create - Whether to create metadata if it doesn't exist
   * @returns String key representation
   */
  fastKey(target: any, create?: boolean): string;
  /**
   * Get weak reference storage for an object
   * @param target - The object to get weak storage for
   * @param create - Whether to create metadata if it doesn't exist
   * @returns Weak storage object or boolean
   */
  getWeak(target: any, create?: boolean): WeakMap<object, any> | Record<string, any> | boolean;
  /**
   * Called when an object is frozen to ensure metadata is attached
   * @param target - The object being frozen
   * @returns The target object
   */
  onFreeze<T extends object>(target: T): T;
}

declare const metaModule: MetaModule;

export default metaModule;