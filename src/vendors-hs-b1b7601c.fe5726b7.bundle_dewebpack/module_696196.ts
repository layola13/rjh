import crypto from 'crypto';
import rng from './rng';
import { unsafeStringify } from './stringify';

interface V4Options {
  random?: number[];
  rng?: () => number[];
}

/**
 * Generate a version 4 (random) UUID
 * @param options - Options for UUID generation
 * @param buffer - Optional buffer to write UUID bytes into
 * @param offset - Offset in buffer to start writing at
 * @returns UUID string or buffer with UUID bytes
 */
export default function v4(
  options?: V4Options,
  buffer?: number[],
  offset?: number
): string | number[] {
  if (crypto.randomUUID && !buffer && !options) {
    return crypto.randomUUID();
  }

  const opts = options ?? {};
  const randomBytes = opts.random ?? (opts.rng ?? rng)();

  // Set version (4) and variant bits
  randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40;
  randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80;

  if (buffer) {
    const startOffset = offset ?? 0;
    for (let i = 0; i < 16; ++i) {
      buffer[startOffset + i] = randomBytes[i];
    }
    return buffer;
  }

  return unsafeStringify(randomBytes);
}