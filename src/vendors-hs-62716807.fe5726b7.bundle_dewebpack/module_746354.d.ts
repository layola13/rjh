/**
 * Checks if a given URL is absolute (has a protocol and is protocol-relative).
 * 
 * An absolute URL is defined as having:
 * - An optional protocol/scheme (e.g., "http:", "https:", "ftp:")
 * - Followed by "//" (protocol-relative indicator)
 * 
 * @param url - The URL string to validate
 * @returns True if the URL is absolute, false otherwise
 * 
 * @example
 *