import parse from './parse';
import { unsafeStringify } from './stringify';

export default function v1ToV6(input: string): string;
export default function v1ToV6(input: Uint8Array): Uint8Array;
export default function v1ToV6(input: string | Uint8Array): string | Uint8Array {
  const convertBytes = (bytes: Uint8Array): Uint8Array => {
    return Uint8Array.of(
      ((bytes[6] & 0x0f) << 4) | ((bytes[7] >> 4) & 0x0f),
      ((bytes[7] & 0x0f) << 4) | ((bytes[4] & 0xf0) >> 4),
      ((bytes[4] & 0x0f) << 4) | ((bytes[5] & 0xf0) >> 4),
      ((bytes[5] & 0x0f) << 4) | ((bytes[0] & 0xf0) >> 4),
      ((bytes[0] & 0x0f) << 4) | ((bytes[1] & 0xf0) >> 4),
      ((bytes[1] & 0x0f) << 4) | ((bytes[2] & 0xf0) >> 4),
      0x60 | (bytes[2] & 0x0f),
      bytes[3],
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

  const inputBytes = typeof input === 'string' ? parse(input) : input;
  const converted = convertBytes(inputBytes);

  return typeof input === 'string' ? unsafeStringify(converted) : converted;
}