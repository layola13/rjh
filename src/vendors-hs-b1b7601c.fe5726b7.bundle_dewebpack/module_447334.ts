import parse from './parse';
import { unsafeStringify } from './stringify';

export default function convertUUID(input: string): string;
export default function convertUUID(input: Uint8Array): Uint8Array;
export default function convertUUID(input: string | Uint8Array): string | Uint8Array {
  const transform = (bytes: Uint8Array): Uint8Array => {
    return Uint8Array.of(
      ((bytes[3] & 0x0f) << 4) | ((bytes[4] >> 4) & 0x0f),
      ((bytes[4] & 0x0f) << 4) | ((bytes[5] & 0xf0) >> 4),
      ((bytes[5] & 0x0f) << 4) | (bytes[6] & 0x0f),
      bytes[7],
      ((bytes[1] & 0x0f) << 4) | ((bytes[2] & 0xf0) >> 4),
      ((bytes[2] & 0x0f) << 4) | ((bytes[3] & 0xf0) >> 4),
      0x10 | ((bytes[0] & 0xf0) >> 4),
      ((bytes[0] & 0x0f) << 4) | ((bytes[1] & 0xf0) >> 4),
      bytes[8],
      bytes[9],
      bytes[10],
      bytes[11],
      bytes[12],
      bytes[13],
      bytes[14],
      bytes[15]
    );
  };

  const transformed = transform(typeof input === 'string' ? parse(input) : input);
  
  return typeof input === 'string' ? unsafeStringify(transformed) : transformed;
}