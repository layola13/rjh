/**
 * RegExp polyfill module
 * Provides cross-browser compatible RegExp implementation with modern features
 */

/** Type definitions for internal state management */
interface RegExpInternalState {
  /** Whether the 's' (dotAll) flag is enabled */
  dotAll?: boolean;
  /** Raw RegExp instance without dotAll transformation */
  raw?: RegExp;
  /** Whether the 'y' (sticky) flag is enabled */
  sticky?: boolean;
  /** Named capture groups mapping [groupName, groupIndex][] */
  groups?: Array<[string, number]>;
}

/** Type for object property descriptors iterator */
type PropertyDescriptorNames = string[];

/** Type for internal utility functions */
type NativeFunction<T extends (...args: any[]) => any> = T;

/**
 * Checks if an object is a RegExp instance
 * @param value - The value to check
 * @returns True if value is a RegExp
 */
declare function isRegExp(value: unknown): value is RegExp;

/**
 * Gets the RegExp flags string from a RegExp instance
 * @param regexp - The RegExp instance
 * @returns The flags string (e.g., "gi", "myu")
 */
declare function getRegExpFlags(regexp: RegExp): string;

/**
 * Converts a value to a string
 * @param value - The value to convert
 * @returns String representation
 */
declare function toString(value: unknown): string;

/**
 * Checks if the current object is an instance of the specified prototype
 * @param prototype - The prototype to check against
 * @param instance - The instance to check
 * @returns True if instance inherits from prototype
 */
declare function isPrototypeOf(prototype: object, instance: unknown): boolean;

/**
 * Creates a hidden property on an object
 * @param target - The target object
 * @param key - The property key
 * @param value - The property value
 */
declare function createNonEnumerableProperty(
  target: object,
  key: string | symbol,
  value: unknown
): void;

/**
 * Inherits from a parent constructor
 * @param child - Child constructor
 * @param parent - Parent constructor
 * @param statics - Static properties to copy
 */
declare function inherits(
  child: Function,
  parent: Function,
  statics: object
): void;

/**
 * Gets internal state for an object
 * @param obj - The object
 * @returns Internal state object
 */
declare function getInternalState(obj: object): RegExpInternalState;

/**
 * Enforces internal state on an object
 * @param obj - The object
 * @returns Internal state object
 */
declare function enforceInternalState(obj: object): RegExpInternalState;

/**
 * Checks if a key exists in an object
 * @param obj - The object to check
 * @param key - The key to look for
 * @returns True if key exists
 */
declare function hasOwn(obj: object, key: string): boolean;

/**
 * Parses named capture groups from RegExp source
 * @param source - RegExp source string
 * @returns Tuple of [transformedSource, captureGroups]
 */
declare function parseNamedCaptureGroups(
  source: string
): [string, Array<[string, number]>];

/**
 * Transforms RegExp source to support dotAll flag
 * @param source - Original RegExp source
 * @returns Transformed source with dotAll support
 */
declare function transformDotAllSource(source: string): string;

/**
 * Well-known symbol for species pattern
 */
declare const MATCH_SYMBOL: unique symbol;

/**
 * RegExp pattern for validating named capture group syntax
 * Format: (?<groupName>...)
 */
declare const NAMED_GROUP_PATTERN: RegExp;

/**
 * Configuration flags for RegExp polyfill
 */
declare const enum RegExpPolyfillFlags {
  /** Whether native RegExp has buggy sticky flag implementation */
  MISSED_STICKY = 1,
  /** Whether sticky flag is unsupported */
  UNSUPPORTED_Y = 2,
  /** Whether dotAll flag needs polyfill */
  NEEDS_DOTALL_POLYFILL = 4,
  /** Whether named groups need polyfill */
  NEEDS_NAMED_GROUPS_POLYFILL = 8,
}

/**
 * Polyfilled RegExp constructor with extended features
 * Supports dotAll (s), sticky (y), and named capture groups across all browsers
 */
declare class PolyfillRegExp extends RegExp {
  /**
   * Creates a new RegExp instance with polyfilled features
   * @param pattern - The pattern string or RegExp instance
   * @param flags - RegExp flags (g, i, m, s, u, y)
   * @throws {SyntaxError} If named capture group names are invalid or duplicated
   */
  constructor(pattern: string | RegExp, flags?: string);

  /** Internal state for polyfilled features */
  private readonly __internalState?: RegExpInternalState;
}

/**
 * Export type for the polyfilled RegExp constructor
 */
export type { PolyfillRegExp };

/**
 * Export internal state interface for advanced usage
 */
export type { RegExpInternalState };