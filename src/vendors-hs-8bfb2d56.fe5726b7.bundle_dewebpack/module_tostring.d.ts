/**
 * Converts a URL object to its string representation
 * @param encoder - Optional custom query string encoder function. Defaults to standard stringify.
 * @returns The complete URL as a string
 */
function toString(encoder?: (query: unknown) => string): string;

/**
 * URL component interface representing a parsed URL structure
 */
interface URLComponents {
  /** Protocol scheme (e.g., 'http', 'https', 'file') */
  protocol?: string;
  
  /** Whether to use slashes after protocol (e.g., 'http://') */
  slashes?: boolean;
  
  /** Username for authentication */
  username?: string;
  
  /** Password for authentication */
  password?: string;
  
  /** Hostname or IP address */
  hostname?: string;
  
  /** Port number */
  port?: string;
  
  /** Combined host (hostname:port) */
  host?: string;
  
  /** URL path */
  pathname?: string;
  
  /** Query string or query object */
  query?: string | Record<string, unknown>;
  
  /** URL hash/fragment (including '#') */
  hash?: string;
}

/**
 * Checks if a protocol requires special authority formatting (e.g., http, https, ftp)
 * @param protocol - The protocol to check
 * @returns True if the protocol requires special handling
 */
declare function isSpecialProtocol(protocol: string): boolean;

/**
 * Regular expression to test for IPv6 hostnames
 */
declare const IPV6_PATTERN: RegExp;

/**
 * Default query string encoder
 */
declare const defaultStringify: {
  stringify(query: Record<string, unknown>): string;
};