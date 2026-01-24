/**
 * Query string parsing utilities
 * Provides functionality to parse URL query strings into JavaScript objects
 */

/**
 * Character set options for decoding
 */
type Charset = 'utf-8' | 'iso-8859-1';

/**
 * Strategy for handling duplicate keys in query strings
 * - 'combine': merge values into an array
 * - 'first': keep only the first occurrence
 * - 'last': keep only the last occurrence
 */
type DuplicatesStrategy = 'combine' | 'first' | 'last';

/**
 * Decoder function type for custom value decoding
 * @param value - The string value to decode
 * @param defaultDecoder - The default decoder function
 * @param charset - Character encoding to use
 * @param type - Whether decoding a 'key' or 'value'
 * @returns The decoded value
 */
type DecoderFunction = (
  value: string,
  defaultDecoder: DecoderFunction,
  charset: Charset,
  type: 'key' | 'value'
) => unknown;

/**
 * Options for parsing query strings
 */
interface ParseOptions {
  /**
   * Allow parsing of dot notation in keys (e.g., 'a.b.c')
   * @default false
   */
  allowDots?: boolean;

  /**
   * Allow empty arrays in the parsed result
   * @default false
   */
  allowEmptyArrays?: boolean;

  /**
   * Allow parsing keys that would override Object.prototype properties
   * @default false
   */
  allowPrototypes?: boolean;

  /**
   * Allow sparse arrays (arrays with empty indices)
   * @default false
   */
  allowSparse?: boolean;

  /**
   * Maximum index for array parsing
   * @default 20
   */
  arrayLimit?: number;

  /**
   * Character encoding for decoding values
   * @default 'utf-8'
   */
  charset?: Charset;

  /**
   * Detect charset from special 'utf8' parameter in query string
   * @default false
   */
  charsetSentinel?: boolean;

  /**
   * Parse comma-separated values as arrays
   * @default false
   */
  comma?: boolean;

  /**
   * Decode dots in keys that were encoded as %2E
   * @default false
   */
  decodeDotInKeys?: boolean;

  /**
   * Custom decoder function for values
   */
  decoder?: DecoderFunction;

  /**
   * Delimiter for separating key-value pairs (string or RegExp)
   * @default '&'
   */
  delimiter?: string | RegExp;

  /**
   * Maximum depth for nested object parsing (false to disable limit)
   * @default 5
   */
  depth?: number | false;

  /**
   * Strategy for handling duplicate keys
   * @default 'combine'
   */
  duplicates?: DuplicatesStrategy;

  /**
   * Ignore leading '?' in query string
   * @default false
   */
  ignoreQueryPrefix?: boolean;

  /**
   * Interpret HTML numeric entities (e.g., &#100;) in ISO-8859-1 charset
   * @default false
   */
  interpretNumericEntities?: boolean;

  /**
   * Maximum number of parameters to parse
   * @default 1000
   */
  parameterLimit?: number;

  /**
   * Parse bracketed keys as arrays (e.g., 'a[]=1')
   * @default true
   */
  parseArrays?: boolean;

  /**
   * Create objects without prototype (Object.create(null))
   * @default false
   */
  plainObjects?: boolean;

  /**
   * Throw RangeError when depth limit is exceeded
   * @default false
   */
  strictDepth?: boolean;

  /**
   * Distinguish between null and empty string values
   * @default false
   */
  strictNullHandling?: boolean;

  /**
   * Throw RangeError when arrayLimit or parameterLimit is exceeded
   * @default false
   */
  throwOnLimitExceeded?: boolean;
}

/**
 * Parsed query string result
 * Can be a plain object or an object without prototype depending on options
 */
type ParsedQuery = Record<string, unknown>;

/**
 * Parse a query string into an object
 * @param queryString - The query string to parse (with or without leading '?')
 * @param options - Parsing options to customize behavior
 * @returns Parsed object representation of the query string
 * @throws {TypeError} If options are invalid
 * @throws {RangeError} If limits are exceeded and throwOnLimitExceeded is true
 */
export function parse(queryString: string, options?: ParseOptions): ParsedQuery;

/**
 * Internal utilities module reference
 */
interface UtilsModule {
  /**
   * Decode a URI component value
   */
  decode: DecoderFunction;

  /**
   * Check if value is a RegExp
   */
  isRegExp: (value: unknown) => value is RegExp;

  /**
   * Map over value if it exists
   */
  maybeMap: <T, R>(value: T, fn: (val: T) => R) => R | undefined;

  /**
   * Combine two values (merge arrays, assign objects)
   */
  combine: (target: unknown, source: unknown) => unknown;

  /**
   * Merge two objects recursively
   */
  merge: (target: ParsedQuery, source: unknown, options: ParseOptions) => ParsedQuery;

  /**
   * Remove sparse array indices
   */
  compact: (value: ParsedQuery) => ParsedQuery;
}