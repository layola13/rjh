/**
 * Query string parsing and stringification utilities
 * 
 * This module provides functions for converting between objects and query strings,
 * along with format configurations for different serialization styles.
 * 
 * @module QueryStringUtils
 */

/**
 * Format configuration options for query string serialization
 * Defines how different data types should be encoded in query strings
 */
export const formats: QueryStringFormats;

/**
 * Parses a query string into an object representation
 * 
 * @param queryString - The URL query string to parse (with or without leading '?')
 * @param options - Optional parsing configuration
 * @returns Parsed object representation of the query string
 * 
 * @example
 *