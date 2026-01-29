/**
 * Checks if a value is a Buffer instance.
 * @param value - The value to check
 * @returns True if the value is a Buffer, false otherwise
 */
function isBuffer(value: unknown): value is Buffer {
  const globalBuffer = (typeof Buffer !== 'undefined') ? Buffer : undefined;
  
  if (globalBuffer && typeof globalBuffer.isBuffer === 'function') {
    return globalBuffer.isBuffer(value);
  }
  
  return false;
}

export default isBuffer;