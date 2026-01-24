/**
 * URL encoding format standards module
 * Provides utilities for encoding URLs according to different RFC specifications
 */

/**
 * RFC 1738 standard - Uses '+' for space encoding (legacy format)
 */
export type RFC1738 = 'RFC1738';

/**
 * RFC 3986 standard - Uses '%20' for space encoding (modern format)
 */
export type RFC3986 = 'RFC3986';

/**
 * Supported RFC encoding standards
 */
export type RFCStandard = RFC1738 | RFC3986;

/**
 * Formatter function type that encodes a string according to a specific RFC standard
 */
export type FormatterFunction = (value: string) => string;

/**
 * Collection of formatter functions for different RFC standards
 */
export interface Formatters {
  /**
   * RFC 1738 formatter - Converts '%20' spaces to '+' characters
   * @param value - The string to format
   * @returns The formatted string with '+' instead of '%20'
   */
  RFC1738: FormatterFunction;
  
  /**
   * RFC 3986 formatter - Returns the string as-is (standard URI encoding)
   * @param value - The string to format
   * @returns The unmodified string value
   */
  RFC3986: FormatterFunction;
}

/**
 * URL encoding formats module export
 */
export interface URLEncodingFormats {
  /**
   * The default RFC standard to use (RFC3986)
   */
  readonly default: RFC3986;
  
  /**
   * Available formatter functions for each RFC standard
   */
  readonly formatters: Formatters;
  
  /**
   * RFC 1738 constant identifier
   */
  readonly RFC1738: RFC1738;
  
  /**
   * RFC 3986 constant identifier
   */
  readonly RFC3986: RFC3986;
}

declare const urlEncodingFormats: URLEncodingFormats;

export default urlEncodingFormats;