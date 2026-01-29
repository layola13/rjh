export function isBuffer(value: unknown): value is Buffer {
  if (typeof Buffer !== 'undefined' && Buffer.isBuffer) {
    return Buffer.isBuffer(value);
  }
  return false;
}

export default isBuffer;