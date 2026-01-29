function get(this: Buffer): ArrayBuffer {
  if (Buffer.isBuffer(this)) {
    return this.buffer;
  }
  return undefined as any;
}