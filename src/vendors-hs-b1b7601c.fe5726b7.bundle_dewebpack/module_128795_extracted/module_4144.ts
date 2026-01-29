/**
 * Checks if a value is a Buffer instance.
 * 
 * @param value - The value to check
 * @returns True if the value is a Buffer, false otherwise
 */
function isBuffer(value: unknown): value is Buffer {
  if (typeof Buffer !== 'undefined' && Buffer.isBuffer) {
    return Buffer.isBuffer(value);
  }
  return false;
}

export default isBuffer;