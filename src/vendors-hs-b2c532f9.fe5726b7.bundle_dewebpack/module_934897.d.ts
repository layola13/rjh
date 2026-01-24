/**
 * Type definition for object inspection and stringification utility
 * Provides deep inspection of JavaScript values with customizable formatting
 */

/**
 * Quote style options for string values
 */
type QuoteStyle = 'single' | 'double';

/**
 * Custom inspection symbol type
 */
type InspectCustomSymbol = symbol | 'symbol';

/**
 * Indentation configuration
 */
type IndentOption = '\t' | number | null;

/**
 * Configuration options for the inspect function
 */
export interface InspectOptions {
  /**
   * Quote style for string values ('single' or 'double')
   * @default 'single'
   */
  quoteStyle?: QuoteStyle;

  /**
   * Maximum length for string values before truncation
   * Set to Infinity for no limit, null to disable truncation
   * @default Infinity
   */
  maxStringLength?: number | null;

  /**
   * Whether to use custom inspect methods on objects
   * @default true
   */
  customInspect?: boolean | 'symbol';

  /**
   * Indentation for nested structures
   * Can be '\t', a positive integer (number of spaces), or null (no indentation)
   * @default 2
   */
  indent?: IndentOption;

  /**
   * Whether to use numeric separators (underscores) in large numbers
   * @default false
   */
  numericSeparator?: boolean;

  /**
   * Maximum depth to traverse for nested objects
   * @default 5
   */
  depth?: number;
}

/**
 * Internal indentation state
 */
interface IndentState {
  /** Base indentation string */
  base: string;
  /** Previous level indentation */
  prev: string;
}

/**
 * Inspect and stringify any JavaScript value with detailed formatting
 * 
 * @param value - The value to inspect
 * @param options - Formatting options
 * @param depth - Current recursion depth (internal use)
 * @param seen - Array of already visited objects to detect circular references (internal use)
 * @returns String representation of the value
 * 
 * @example
 *