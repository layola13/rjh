/**
 * UUID v3/v5 namespace identifiers and generator function
 * @module UUID
 */

/**
 * DNS namespace UUID for RFC 4122
 * Used for generating UUIDs from domain names
 */
export const DNS: string = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";

/**
 * URL namespace UUID for RFC 4122
 * Used for generating UUIDs from URLs
 */
export const URL: string = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";

/**
 * Input value type for UUID generation
 * Can be a string or byte array
 */
export type UUIDInput = string | number[] | Uint8Array;

/**
 * Namespace identifier type
 * Must be a valid UUID string or 16-byte array
 */
export type Namespace = string | number[] | Uint8Array;

/**
 * Hash function type for UUID generation
 * Takes a byte array and returns a hashed byte array
 */
export type HashFunction = (data: Uint8Array) => Uint8Array;

/**
 * UUID generator function type
 */
export interface UUIDGeneratorFunction {
  /**
   * Generate a UUID from a name and namespace
   * 
   * @param value - The name/value to generate UUID from
   * @param namespace - The namespace UUID (must be 16 bytes)
   * @param buffer - Optional output buffer to write UUID bytes
   * @param offset - Optional offset in the output buffer
   * @returns UUID string or the provided buffer
   * @throws {TypeError} If namespace is not 16 bytes
   */
  (value: UUIDInput, namespace: Namespace, buffer?: undefined, offset?: number): string;
  (value: UUIDInput, namespace: Namespace, buffer: number[] | Uint8Array, offset?: number): number[] | Uint8Array;
  
  /** DNS namespace constant */
  readonly DNS: string;
  
  /** URL namespace constant */
  readonly URL: string;
  
  /** Function name (v3 or v5) */
  readonly name?: string;
}

/**
 * Create a UUID generator function (v3 with MD5 or v5 with SHA-1)
 * 
 * @param name - Name of the UUID version ("v3" or "v5")
 * @param version - Version number (0x30 for v3, 0x50 for v5)
 * @param hashFunction - Hash function to use (MD5 for v3, SHA-1 for v5)
 * @returns UUID generator function with DNS and URL namespace properties
 */
export default function createUUIDGenerator(
  name: string,
  version: number,
  hashFunction: HashFunction
): UUIDGeneratorFunction;