/**
 * ES6 Map polyfill implementation
 * Provides a standards-compliant Map constructor with get/set methods
 */

/**
 * Entry in the internal Map data structure
 */
interface MapEntry<K, V> {
  /** The key of the entry */
  k: K;
  /** The value of the entry */
  v: V;
  /** Pointer to next entry in the linked list */
  n?: MapEntry<K, V>;
  /** Pointer to previous entry in the linked list */
  p?: MapEntry<K, V>;
}

/**
 * Internal Map state management interface
 */
interface MapState<K, V> {
  /** First entry in the Map */
  first?: MapEntry<K, V>;
  /** Last entry in the Map */
  last?: MapEntry<K, V>;
  /** Number of entries */
  size: number;
}

/**
 * Collection helper utilities for internal Map operations
 */
interface CollectionHelpers {
  /**
   * Define or update an entry in the collection
   * @param context - The Map instance context
   * @param key - The key to set (normalized: -0 becomes +0)
   * @param value - The value to associate with the key
   * @returns The Map instance for chaining
   */
  def<K, V>(context: MapState<K, V>, key: K, value: V): Map<K, V>;
  
  /**
   * Get an entry from the collection
   * @param context - The Map instance context
   * @param key - The key to retrieve
   * @returns The entry if found, undefined otherwise
   */
  getEntry<K, V>(context: MapState<K, V>, key: K): MapEntry<K, V> | undefined;
}

/**
 * Validation helper for Map instances
 */
interface Validator {
  /**
   * Validates that the context is a Map instance of the specified type
   * @param context - The object to validate
   * @param typeName - Expected type name for error messages
   * @returns The validated context
   * @throws TypeError if context is not a valid Map instance
   */
  <K, V>(context: unknown, typeName: string): MapState<K, V>;
}

/**
 * ES6 Map polyfill factory
 * @param constructorName - The name of the collection type ('Map')
 * @param wrapper - Factory function that wraps the constructor
 * @param methods - Object containing get/set method implementations
 * @param helpers - Collection helper utilities
 * @param enumerable - Whether properties should be enumerable
 */
declare function createMapPolyfill(
  constructorName: 'Map',
  wrapper: (constructor: MapConstructor) => MapConstructor,
  methods: {
    /**
     * Retrieves the value associated with the specified key
     * @param key - The key whose value to retrieve
     * @returns The value associated with the key, or undefined if not found
     */
    get<K, V>(this: Map<K, V>, key: K): V | undefined;
    
    /**
     * Sets the value for the specified key in the Map
     * @param key - The key to set (treats -0 as +0)
     * @param value - The value to associate with the key
     * @returns The Map instance for method chaining
     */
    set<K, V>(this: Map<K, V>, key: K, value: V): Map<K, V>;
  },
  helpers: CollectionHelpers,
  enumerable: boolean
): void;

export = createMapPolyfill;