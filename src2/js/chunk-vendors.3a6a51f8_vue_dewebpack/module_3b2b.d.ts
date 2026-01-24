/**
 * RegExp Constructor Polyfill Module
 * 
 * This module provides a polyfill for the RegExp constructor to fix compatibility issues
 * in older browsers, particularly related to:
 * - Proper subclassing behavior
 * - Symbol.match property handling
 * - Constructor identity checks
 */

/**
 * RegExp constructor type that supports proper ES6+ behavior
 * 
 * @example
 * const regex1 = new RegExp(/abc/, 'i');
 * const regex2 = RegExp(/def/);
 */
declare interface RegExpConstructor {
  /**
   * Creates a new RegExp object
   * 
   * @param pattern - The pattern to match (string or RegExp)
   * @param flags - Optional flags (g, i, m, s, u, y)
   * @returns A new RegExp instance
   */
  new(pattern: string | RegExp, flags?: string): RegExp;
  
  /**
   * Creates a RegExp without new keyword
   * 
   * @param pattern - The pattern to match (string or RegExp)
   * @param flags - Optional flags
   * @returns A RegExp instance
   */
  (pattern: string | RegExp, flags?: string): RegExp;
  
  /** The prototype object for RegExp instances */
  readonly prototype: RegExp;
  
  /** The constructor name */
  readonly name: string;
  
  /** The length of the constructor (number of parameters) */
  readonly length: number;
}

/**
 * RegExp instance type with ES6+ features
 */
declare interface RegExp {
  /** The source pattern of the regular expression */
  readonly source: string;
  
  /** Global flag - matches all occurrences */
  readonly global: boolean;
  
  /** Ignore case flag */
  readonly ignoreCase: boolean;
  
  /** Multiline flag */
  readonly multiline: boolean;
  
  /** Sticky flag (ES6+) */
  readonly sticky: boolean;
  
  /** Unicode flag (ES6+) */
  readonly unicode: boolean;
  
  /** DotAll flag (ES2018+) */
  readonly dotAll: boolean;
  
  /** Flags string */
  readonly flags: string;
  
  /** Last matched index */
  lastIndex: number;
  
  /** The constructor reference */
  constructor: RegExpConstructor;
  
  /**
   * Executes a search for a match in a string
   * 
   * @param str - The string to search
   * @returns Match result array or null
   */
  exec(str: string): RegExpExecArray | null;
  
  /**
   * Tests whether the pattern matches a string
   * 
   * @param str - The string to test
   * @returns true if match found, false otherwise
   */
  test(str: string): boolean;
  
  /**
   * Returns the string representation of the RegExp
   */
  toString(): string;
  
  /**
   * Symbol.match method for pattern matching
   * Used by String.prototype.match()
   * 
   * @param str - The string to match against
   * @returns Match result or null
   */
  [Symbol.match](str: string): RegExpMatchArray | null;
  
  /**
   * Symbol.replace method for string replacement
   * Used by String.prototype.replace()
   */
  [Symbol.replace](str: string, replaceValue: string | ((substring: string, ...args: any[]) => string)): string;
  
  /**
   * Symbol.search method for searching
   * Used by String.prototype.search()
   */
  [Symbol.search](str: string): number;
  
  /**
   * Symbol.split method for splitting strings
   * Used by String.prototype.split()
   */
  [Symbol.split](str: string, limit?: number): string[];
}

/**
 * Extended match array with additional properties
 */
declare interface RegExpMatchArray extends Array<string> {
  /** The matched text */
  0: string;
  
  /** The 0-based index of the match in the string */
  index?: number;
  
  /** The original input string */
  input?: string;
  
  /** Named capture groups (ES2018+) */
  groups?: Record<string, string>;
}

/**
 * Result array from RegExp.exec()
 */
declare interface RegExpExecArray extends Array<string> {
  /** The matched text */
  0: string;
  
  /** The 0-based index of the match */
  index: number;
  
  /** The original input string */
  input: string;
  
  /** Named capture groups (ES2018+) */
  groups?: Record<string, string>;
}

/**
 * Global RegExp constructor
 */
declare var RegExp: RegExpConstructor;

/**
 * Module utilities for RegExp polyfill
 * @internal
 */
declare namespace RegExpPolyfill {
  /**
   * Checks if a value is a RegExp instance
   * 
   * @param value - Value to check
   * @returns true if value is RegExp
   */
  export function isRegExp(value: unknown): value is RegExp;
  
  /**
   * Gets the flags from a RegExp instance
   * 
   * @param regexp - RegExp instance
   * @returns Flags string (e.g., "gi")
   */
  export function getFlags(regexp: RegExp): string;
  
  /**
   * Defines properties on the RegExp constructor for compatibility
   * 
   * @param target - Target constructor
   * @param source - Source constructor
   * @internal
   */
  export function defineConstructorProperties(
    target: RegExpConstructor,
    source: RegExpConstructor
  ): void;
  
  /**
   * Configures Symbol.species for proper subclassing
   * 
   * @param constructor - RegExp constructor
   * @internal
   */
  export function configureSpecies(constructor: RegExpConstructor): void;
}

/**
 * Module export type
 */
declare module 'regexp-polyfill' {
  export = RegExp;
}