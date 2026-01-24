/**
 * URL utility functions for parameter manipulation and data URL handling
 */

/**
 * Adds a single parameter to a URL
 * @param url - The base URL to add the parameter to
 * @param paramName - The name of the parameter to add
 * @param paramValue - The value of the parameter to add
 * @returns The URL with the added parameter
 */
export function addParam(url: string, paramName: string, paramValue: string | number): string;

/**
 * Adds multiple parameters to a URL
 * @param url - The base URL to add parameters to
 * @param params - An object containing key-value pairs of parameters to add
 * @returns The URL with all parameters added
 */
export function addParams(url: string, params: Record<string, string | number>): string;

/**
 * Removes all query parameters from a URL
 * @param url - The URL to clear parameters from
 * @returns The URL without any query parameters
 */
export function clearParams(url: string): string;

/**
 * Checks if a URL is a data URL (starts with "data:")
 * @param url - The URL to check
 * @returns True if the URL is a data URL, false otherwise
 */
export function isDataUrl(url: string | null | undefined): boolean;

/**
 * Adds a timestamp parameter to a URL with the current time
 * @param url - The URL to add the timestamp to
 * @returns The URL with the timestamp parameter added
 */
export function addTimestamp(url: string): string;

/**
 * Gets the current date and time formatted as YYYY-MM-DD-HH-mm-ss
 * @returns The formatted timestamp string
 */
export function getFormatTime(): string;