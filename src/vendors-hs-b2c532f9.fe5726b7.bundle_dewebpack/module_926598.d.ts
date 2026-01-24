/**
 * Query String Stringify Module
 * Converts objects into URL query strings with extensive configuration options
 */

/**
 * Type helper for getting the type of a value
 */
type TypeOfResult = 'string' | 'number' | 'boolean' | 'symbol' | 'bigint' | 'undefined' | 'object' | 'function';

/**
 * Array format strategies for serializing arrays in query strings
 */
export type ArrayFormat = 'indices' | 'brackets' | 'repeat' | 'comma';

/**
 * Character set encoding options
 */
export type Charset = 'utf-8' | 'iso-8859-1';

/**
 * Output format for the query string
 */
export type Format = 'RFC1738' | 'RFC3986';

/**
 * Filter function to process or exclude keys/values during stringification
 */
export type Filter = (prefix: string, value: unknown) => unknown;

/**
 * Array-based filter specifying which keys to include
 */
export type FilterArray = Array<string | number>;

/**
 * Encoder function for encoding keys and values
 */
export type Encoder = (
  str: string,
  defaultEncoder: Encoder,
  charset: Charset,
  type: 'key' | 'value',
  format: Format
) => string;

/**
 * Sort function for ordering object keys
 */
export type SortFunction = (a: string, b: string) => number;

/**
 * Date serialization function
 */
export type SerializeDateFunction = (date: Date) => string;

/**
 * Array format function that generates the bracket notation
 */
export interface ArrayFormatFunction {
  (prefix: string, key: string): string;
}

/**
 * Comprehensive options for stringifying objects into query strings
 */
export interface StringifyOptions {
  /**
   * Whether to prepend a question mark (?) to the query string
   * @default false
   */
  addQueryPrefix?: boolean;

  /**
   * Allow dots in keys to represent nested objects
   * @default false
   */
  allowDots?: boolean;

  /**
   * Allow serialization of empty arrays
   * @default false
   */
  allowEmptyArrays?: boolean;

  /**
   * Format for serializing arrays
   * @default 'indices'
   */
  arrayFormat?: ArrayFormat;

  /**
   * Character encoding to use
   * @default 'utf-8'
   */
  charset?: Charset;

  /**
   * Include charset sentinel in output
   * @default false
   */
  charsetSentinel?: boolean;

  /**
   * Enable round-trip preservation for comma-separated arrays
   * @default false
   */
  commaRoundTrip?: boolean;

  /**
   * Delimiter between key-value pairs
   * @default '&'
   */
  delimiter?: string;

  /**
   * Whether to encode output
   * @default true
   */
  encode?: boolean;

  /**
   * Encode dots in keys
   * @default false
   */
  encodeDotInKeys?: boolean;

  /**
   * Custom encoder function
   */
  encoder?: Encoder;

  /**
   * Only encode values, not keys
   * @default false
   */
  encodeValuesOnly?: boolean;

  /**
   * Filter function or array to include/transform specific keys
   */
  filter?: Filter | FilterArray;

  /**
   * Output format standard
   */
  format?: Format;

  /**
   * Formatter for the specified format
   */
  formatter?: (value: string) => string;

  /**
   * Legacy option, use arrayFormat instead
   * @deprecated
   */
  indices?: boolean;

  /**
   * Function to serialize Date objects
   */
  serializeDate?: SerializeDateFunction;

  /**
   * Skip null values instead of serializing them
   * @default false
   */
  skipNulls?: boolean;

  /**
   * Sort function for object keys
   */
  sort?: SortFunction;

  /**
   * Distinguish between null and undefined/empty string
   * @default false
   */
  strictNullHandling?: boolean;
}

/**
 * Object types that can be stringified
 */
export type StringifiableValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | StringifiableValue[]
  | { [key: string]: StringifiableValue };

/**
 * Input object for stringification
 */
export type StringifiableObject = Record<string, StringifiableValue>;

/**
 * Default stringification options used when not specified
 */
export const defaults: Required<StringifyOptions>;

/**
 * Array format strategies
 */
export const formats: {
  /**
   * Format: key[]=value1&key[]=value2
   */
  brackets: ArrayFormatFunction;
  
  /**
   * Format: key=value1,value2
   */
  comma: 'comma';
  
  /**
   * Format: key[0]=value1&key[1]=value2
   */
  indices: ArrayFormatFunction;
  
  /**
   * Format: key=value1&key=value2
   */
  repeat: ArrayFormatFunction;
};

/**
 * Stringify an object into a query string
 * 
 * @param obj - The object to stringify
 * @param options - Configuration options for stringification
 * @returns The query string representation
 * 
 * @example
 *