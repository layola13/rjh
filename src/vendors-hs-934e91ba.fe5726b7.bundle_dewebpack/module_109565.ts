import { Buffer } from 'buffer';

/**
 * Checks if value is a Buffer.
 * @param value - The value to check
 * @returns Returns true if value is a buffer, else false
 */
function isBuffer(value: unknown): value is Buffer {
  return Buffer.isBuffer(value);
}

export default isBuffer;