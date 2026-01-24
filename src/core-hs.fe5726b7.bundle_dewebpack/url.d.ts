/**
 * URL utility module providing functions for URL manipulation and validation.
 * @module Url
 */

/**
 * URL utility interface providing methods for URL operations including
 * parameter manipulation, CDN URL generation, and data URL validation.
 */
export interface Url {
  /**
   * Adds query parameters to a URL.
   * @param url - The base URL to add parameters to
   * @param params - The parameters to add to the URL (key-value pairs)
   * @returns The URL with added parameters
   */
  addParams(url: string, params: Record<string, string | number | boolean>): string;

  /**
   * Gets a CDN CNAME URL for a given resource.
   * @param resource - The resource path or identifier
   * @param options - Optional configuration for CDN URL generation
   * @returns The CDN CNAME URL for the resource
   */
  getCNameURL(resource: string, options?: unknown): string;

  /**
   * Checks if a URL is a data URL (starts with "data:").
   * @param url - The URL string to validate
   * @returns True if the URL is a data URL, false otherwise
   */
  isDataUrl(url: string | null | undefined): boolean;
}

/**
 * URL utility object instance.
 */
export declare const Url: Url;