/**
 * Weak collection constructor factory module
 * Provides internal implementation for WeakMap and WeakSet
 */

/**
 * Entry stored in frozen fallback storage
 */
interface FrozenEntry<K, V> {
  0: K;
  1: V;
}

/**
 * Fallback storage for frozen objects that cannot have weak references
 */
interface FrozenStorage<K = any, V = any> {
  entries: Array<[K, V]>;
  get(key: K): V | undefined;
  has(key: K): boolean;
  set(key: K, value: V): void;
  delete(key: K): boolean;
}

/**
 * Internal state for weak collection instances
 */
interface WeakCollectionState {
  /** Collection type identifier (e.g., 'WeakMap', 'WeakSet') */
  type: string;
  /** Unique ID for this collection instance */
  id: number;
  /** Fallback storage for frozen objects */
  frozen: FrozenStorage | undefined;
}

/**
 * Options for iterating over weak collection entries
 */
interface IterationOptions {
  /** The collection instance */
  that: any;
  /** Whether to iterate as entries [key, value] */
  AS_ENTRIES: boolean;
}

/**
 * Constructor factory configuration
 */
interface ConstructorConfig<K, V> {
  /**
   * Factory function that creates weak collection constructors
   * @param wrapper - Constructor wrapper function
   * @param typeName - Name of the collection type
   * @param isMap - Whether this is a Map (true) or Set (false)
   * @param methodName - Name of the initialization method
   * @returns Constructor function for the weak collection
   */
  getConstructor<T>(
    wrapper: (
      constructor: (instance: T, iterable?: Iterable<any>) => void
    ) => any,
    typeName: string,
    isMap: boolean,
    methodName: string
  ): new (iterable?: Iterable<any>) => T;
}

/**
 * Weak collection prototype with delete and has methods
 */
interface WeakCollectionPrototype {
  /**
   * Remove a key from the collection
   * @param key - The key to delete
   * @returns true if the key existed and was deleted
   */
  delete(key: object): boolean;

  /**
   * Check if a key exists in the collection
   * @param key - The key to check
   * @returns true if the key exists
   */
  has(key: object): boolean;
}

/**
 * WeakMap-specific prototype methods
 */
interface WeakMapPrototype<K extends object, V> extends WeakCollectionPrototype {
  /**
   * Get the value associated with a key
   * @param key - The key to look up
   * @returns The associated value, or undefined if not found
   */
  get(key: K): V | undefined;

  /**
   * Set a key-value pair in the map
   * @param key - The key to set
   * @param value - The value to associate with the key
   * @returns The WeakMap instance
   */
  set(key: K, value: V): this;
}

/**
 * WeakSet-specific prototype methods
 */
interface WeakSetPrototype<T extends object> extends WeakCollectionPrototype {
  /**
   * Add a value to the set
   * @param value - The value to add
   * @returns The WeakSet instance
   */
  add(value: T): this;
}

/**
 * Module exports
 */
declare const weakCollectionConstructorFactory: {
  /**
   * Creates a constructor for WeakMap or WeakSet
   * @param wrapper - Function that wraps the constructor logic
   * @param typeName - Type name for internal tracking ('WeakMap' or 'WeakSet')
   * @param isMap - true for WeakMap, false for WeakSet
   * @param methodName - Initialization method name ('set' or 'add')
   * @returns Constructor function for the weak collection
   */
  getConstructor<K extends object, V>(
    wrapper: (
      constructor: (instance: any, iterable?: Iterable<any>) => void
    ) => any,
    typeName: string,
    isMap: true,
    methodName: string
  ): new (iterable?: Iterable<[K, V]>) => WeakMapPrototype<K, V>;

  getConstructor<T extends object>(
    wrapper: (
      constructor: (instance: any, iterable?: Iterable<any>) => void
    ) => any,
    typeName: string,
    isMap: false,
    methodName: string
  ): new (iterable?: Iterable<T>) => WeakSetPrototype<T>;
};

export = weakCollectionConstructorFactory;