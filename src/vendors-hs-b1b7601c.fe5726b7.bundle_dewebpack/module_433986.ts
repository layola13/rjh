import { createHash } from 'crypto';

/**
 * Generate a UUID v5 (name-based using SHA-1)
 * @param name - The name to hash
 * @param namespace - The namespace UUID
 * @returns The generated UUID v5 string
 */
function v5(name: string | Uint8Array, namespace: string | Uint8Array): string {
  const NAMESPACE_DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
  const NAMESPACE_URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
  
  const namespaceBytes = typeof namespace === 'string' 
    ? parseUUID(namespace) 
    : namespace;
  
  const nameBytes = typeof name === 'string'
    ? new TextEncoder().encode(name)
    : name;
  
  const hash = createHash('sha1');
  hash.update(new Uint8Array([...namespaceBytes, ...nameBytes]));
  const bytes = new Uint8Array(hash.digest());
  
  bytes[6] = (bytes[6] & 0x0f) | 0x50;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  
  return stringifyUUID(bytes);
}

function parseUUID(uuid: string): Uint8Array {
  const hex = uuid.replace(/-/g, '');
  const bytes = new Uint8Array(16);
  for (let i = 0; i < 16; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

function stringifyUUID(bytes: Uint8Array): string {
  const hex = Array.from(bytes.slice(0, 16))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  return [
    hex.slice(0, 8),
    hex.slice(8, 12),
    hex.slice(12, 16),
    hex.slice(16, 20),
    hex.slice(20, 32)
  ].join('-');
}

export default v5;