/**
 * HTTP header parser module
 * Parses raw HTTP header strings into a structured object
 * @module HeaderParser
 */

/**
 * List of HTTP headers that should not be duplicated/merged
 * These headers will only retain their first occurrence
 */
type NonMergeableHeaders = 
  | 'age'
  | 'authorization'
  | 'content-length'
  | 'content-type'
  | 'etag'
  | 'expires'
  | 'from'
  | 'host'
  | 'if-modified-since'
  | 'if-unmodified-since'
  | 'last-modified'
  | 'location'
  | 'max-forwards'
  | 'proxy-authorization'
  | 'referer'
  | 'retry-after'
  | 'user-agent';

/**
 * Parsed HTTP headers object
 * Header names are normalized to lowercase
 * Set-Cookie headers are collected in an array
 * Other duplicate headers are comma-separated
 */
export interface ParsedHeaders {
  [headerName: string]: string | string[];
  'set-cookie'?: string[];
}

/**
 * Parses raw HTTP header string into a structured object
 * 
 * @param rawHeaders - Raw HTTP headers as a newline-delimited string
 * @returns Parsed headers object with normalized header names
 * 
 * @example
 *