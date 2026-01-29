export default function adler32(
  adler: number,
  buffer: Uint8Array,
  length: number,
  offset: number
): number {
  const ADLER32_BASE = 65521;
  const CHUNK_SIZE = 2000;
  const LOWER_MASK = 0xffff;

  let low: number = (adler & LOWER_MASK) | 0;
  let high: number = ((adler >>> 16) & LOWER_MASK) | 0;
  let remaining: number = length;

  while (remaining !== 0) {
    const chunkLength: number = remaining > CHUNK_SIZE ? CHUNK_SIZE : remaining;
    remaining -= chunkLength;

    let iterations: number = chunkLength;
    do {
      low = (low + buffer[offset++]) | 0;
      high = (high + low) | 0;
    } while (--iterations);

    low %= ADLER32_BASE;
    high %= ADLER32_BASE;
  }

  return (low | (high << 16)) | 0;
}