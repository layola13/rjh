export const DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
export const URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";

type HashFunction = (data: Uint8Array) => Uint8Array;

interface UUIDOptions {
  namespace: string | number[];
  name: string | number[];
  hashFunction: HashFunction;
  version: number;
}

/**
 * Converts a string to a byte array using UTF-8 encoding
 */
function stringToBytes(str: string): number[] {
  const encoded = unescape(encodeURIComponent(str));
  const bytes: number[] = [];
  for (let i = 0; i < encoded.length; ++i) {
    bytes.push(encoded.charCodeAt(i));
  }
  return bytes;
}

/**
 * Parses a namespace string into a byte array
 */
function parseNamespace(namespace: string): number[] {
  // This would typically parse a UUID string into bytes
  // Implementation depends on the actual parse function
  const bytes: number[] = [];
  // Parse logic here
  return bytes;
}

/**
 * Converts byte array to UUID string format
 */
function bytesToUUID(bytes: Uint8Array): string {
  const hex = Array.from(bytes)
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
  
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

/**
 * Generates a UUID based on a namespace and name
 */
export default function createUUIDGenerator(
  name: string,
  version: number,
  hashFunction: HashFunction
): {
  (name: string | number[], namespace: string | number[], buffer?: number[], offset?: number): string | number[];
  DNS: string;
  URL: string;
} {
  function generateUUID(
    name: string | number[],
    namespace: string | number[],
    buffer?: number[],
    offset?: number
  ): string | number[] {
    let nameBytes: number[];
    if (typeof name === "string") {
      nameBytes = stringToBytes(name);
    } else {
      nameBytes = name;
    }

    let namespaceBytes: number[];
    if (typeof namespace === "string") {
      namespaceBytes = parseNamespace(namespace);
    } else {
      namespaceBytes = namespace;
    }

    if (namespaceBytes.length !== 16) {
      throw new TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
    }

    const combined = new Uint8Array(16 + nameBytes.length);
    combined.set(namespaceBytes);
    combined.set(nameBytes, namespaceBytes.length);

    let hashed = hashFunction(combined);

    hashed[6] = (hashed[6] & 0x0f) | version;
    hashed[8] = (hashed[8] & 0x3f) | 0x80;

    if (buffer) {
      const bufferOffset = offset ?? 0;
      for (let i = 0; i < 16; ++i) {
        buffer[bufferOffset + i] = hashed[i];
      }
      return buffer;
    }

    return bytesToUUID(hashed);
  }

  generateUUID.DNS = DNS;
  generateUUID.URL = URL;

  return generateUUID;
}