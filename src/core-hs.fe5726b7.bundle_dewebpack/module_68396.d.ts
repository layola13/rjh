/**
 * Array.prototype.includes polyfill module
 * Adds the includes method to Array prototype for compatibility with older environments
 */

/**
 * Configuration object for defining polyfills on prototypes
 */
interface PolyfillConfig {
  /** Target object (e.g., "Array", "String") */
  target: string;
  /** Whether to add to prototype */
  proto: boolean;
  /** Whether this polyfill is forced to run */
  forced: boolean;
}

/**
 * Registers a polyfill for a built-in JavaScript object
 * @param config - Configuration object specifying target, prototype, and forced status
 * @param methods - Object containing method implementations to add
 */
declare function registerPolyfill(
  config: PolyfillConfig,
  methods: Record<string, Function>
): void;

/**
 * Internal implementation of Array.prototype.includes
 * @param thisArg - The array-like object to search within
 * @param searchElement - The element to search for
 * @param fromIndex - Optional starting index for the search
 * @returns true if the element is found, false otherwise
 */
declare function includesImplementation<T>(
  thisArg: ArrayLike<T>,
  searchElement: T,
  fromIndex?: number
): boolean;

/**
 * Checks if a given operation throws an error
 * @param fn - Function to test for errors
 * @returns true if function throws, false otherwise
 */
declare function shouldForcePolyfill(fn: () => void): boolean;

/**
 * Marks a method name as added to the prototype for well-known symbols
 * @param methodName - Name of the method to mark
 */
declare function markMethodAsAdded(methodName: string): void;

/**
 * Polyfill for Array.prototype.includes
 * Determines whether an array includes a certain element, returning true or false as appropriate
 */
declare global {
  interface Array<T> {
    /**
     * Determines whether an array includes a certain element, returning true or false
     * @param searchElement - The element to search for
     * @param fromIndex - The position in this array at which to begin searching (default: 0)
     * @returns true if searchElement is found in the array, false otherwise
     */
    includes(searchElement: T, fromIndex?: number): boolean;
  }

  interface ReadonlyArray<T> {
    /**
     * Determines whether an array includes a certain element, returning true or false
     * @param searchElement - The element to search for
     * @param fromIndex - The position in this array at which to begin searching (default: 0)
     * @returns true if searchElement is found in the array, false otherwise
     */
    includes(searchElement: T, fromIndex?: number): boolean;
  }
}

export {};