import { unsafeStringify } from './stringify';
import parseNamespace from './parse';

export const DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
export const URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";

type Namespace = string | number[];
type OutputBuffer = number[] | Uint8Array;
type HashFunction = (data: Uint8Array) => Uint8Array;

function stringToBytes(str: string): number[] {
  const unescaped = unescape(encodeURIComponent(str));
  const bytes: number[] = [];
  for (let i = 0; i < unescaped.length; ++i) {
    bytes.push(unescaped.charCodeAt(i));
  }
  return bytes;
}

export default function createUuidGenerator(
  name: string,
  version: number,
  hashFn: HashFunction
) {
  function generateUuid(
    value: string | number[],
    namespace: Namespace,
    outputBuffer?: OutputBuffer,
    offset?: number
  ): string | OutputBuffer {
    let valueBytes: number[];
    if (typeof value === "string") {
      valueBytes = stringToBytes(value);
    } else {
      valueBytes = value;
    }

    let namespaceBytes: number[];
    if (typeof namespace === "string") {
      namespaceBytes = parseNamespace(namespace);
    } else {
      namespaceBytes = namespace;
    }

    if (namespaceBytes?.length !== 16) {
      throw new TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }

    const buffer = new Uint8Array(16 + valueBytes.length);
    buffer.set(namespaceBytes);
    buffer.set(valueBytes, namespaceBytes.length);

    const hash = hashFn(buffer);
    hash[6] = (hash[6] & 0x0f) | version;
    hash[8] = (hash[8] & 0x3f) | 0x80;

    if (outputBuffer) {
      const bufferOffset = offset ?? 0;
      for (let i = 0; i < 16; ++i) {
        outputBuffer[bufferOffset + i] = hash[i];
      }
      return outputBuffer;
    }

    return unsafeStringify(hash);
  }

  try {
    generateUuid.name = name;
  } catch (e) {
    // Name assignment may fail in some environments
  }

  generateUuid.DNS = DNS;
  generateUuid.URL = URL;

  return generateUuid;
}