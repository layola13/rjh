/**
 * UUID v3/v5 namespace constants and generator factory
 * Original Module ID: 863825
 */

/**
 * DNS namespace UUID for UUID v3/v5 generation
 * Used when creating UUIDs from DNS domain names
 * @constant
 */
export const DNS: string = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";

/**
 * URL namespace UUID for UUID v3/v5 generation
 * Used when creating UUIDs from URLs
 * @constant
 */
export const URL: string = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";

/**
 * Options for UUID generation
 */
export interface UUIDOptions {
  /**
   * Optional buffer to write the generated UUID bytes into
   */
  buffer?: Uint8Array;
  
  /**
   * Offset in the buffer to start writing at
   * @default 0
   */
  offset?: number;
}

/**
 * UUID generator function type
 * Generates a UUID from a name and namespace using a specified hash algorithm
 * 
 * @param name - The name string or byte array to generate UUID from
 * @param namespace - The namespace UUID (16-byte array or string)
 * @param buffer - Optional buffer to write UUID bytes into
 * @param offset - Optional offset in buffer to start writing
 * @returns The generated UUID string, or the buffer if provided
 */
export type UUIDGenerator = {
  (name: string | Uint8Array, namespace: string | Uint8Array): string;
  (name: string | Uint8Array, namespace: string | Uint8Array, buffer: Uint8Array, offset?: number): Uint8Array;
  
  /**
   * DNS namespace constant attached to the generator
   */
  readonly DNS: string;
  
  /**
   * URL namespace constant attached to the generator
   */
  readonly URL: string;
};

/**
 * Hash function type for UUID generation
 * Takes input bytes and returns hashed bytes
 */
export type HashFunction = (input: Uint8Array) => Uint8Array;

/**
 * Creates a UUID generator function using the specified hash algorithm and version
 * 
 * @param name - Name identifier for the generator function
 * @param version - UUID version bits (0x30 for v3, 0x50 for v5)
 * @param hashFunc - Hash function to use (MD5 for v3, SHA-1 for v5)
 * @returns A configured UUID generator function with DNS and URL namespace constants
 */
export default function createUUIDGenerator(
  name: string,
  version: number,
  hashFunc: HashFunction
): UUIDGenerator;