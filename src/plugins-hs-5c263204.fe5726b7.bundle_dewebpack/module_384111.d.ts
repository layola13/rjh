/**
 * String utility for checking if a string starts with a specific prefix.
 * @param str - The string to check
 * @param prefix - The prefix to search for at the start of the string
 * @returns True if the string starts with the prefix, false otherwise
 */
export function stringStartsWith(str: string, prefix: string): boolean;

/**
 * Retrieves the unique asset/design identifier from the HSApp application instance.
 * @returns The design ID string from the application's design metadata
 */
export function getAssetId(): string;