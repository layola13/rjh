export default function generateUUID(
  options?: UUIDOptions,
  buffer?: number[],
  offset?: number
): string | number[] {
  const opts = options ?? {};
  const randomBytes = opts.random ?? (opts.rng ?? defaultRNG)();

  // Set version (4) - bits 4-7 of 7th byte
  randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40;
  
  // Set variant (RFC4122) - bits 6-7 of 9th byte
  randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80;

  if (buffer) {
    const startOffset = offset ?? 0;
    for (let i = 0; i < 16; ++i) {
      buffer[startOffset + i] = randomBytes[i];
    }
    return buffer;
  }

  return bytesToUUID(randomBytes);
}

interface UUIDOptions {
  random?: number[];
  rng?: () => number[];
}

declare function defaultRNG(): number[];
declare function bytesToUUID(bytes: number[]): string;