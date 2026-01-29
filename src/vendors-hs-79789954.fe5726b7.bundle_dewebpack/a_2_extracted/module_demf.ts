const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const BYTE_MASK_255 = 255;
const BYTE_MASK_63 = 63;
const CHUNK_SIZE = 16383;

const encodeMap: string[] = [];
const decodeMap: number[] = [];

for (let i = 0; i < 64; ++i) {
  encodeMap[i] = BASE64_CHARS[i];
  decodeMap[BASE64_CHARS.charCodeAt(i)] = i;
}

decodeMap["-".charCodeAt(0)] = 62;
decodeMap["_".charCodeAt(0)] = 63;

const ByteArrayType = typeof Uint8Array !== "undefined" ? Uint8Array : Array;

/**
 * Get base64 string length info
 */
function getLengthInfo(base64String: string): [number, number] {
  const length = base64String.length;
  if (length % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  const paddingIndex = base64String.indexOf("=");
  const validLength = paddingIndex === -1 ? length : paddingIndex;
  const paddingLength = validLength === length ? 0 : 4 - validLength % 4;
  return [validLength, paddingLength];
}

/**
 * Encode 3-byte chunk to base64
 */
function encodeChunk(value: number): string {
  return (
    encodeMap[value >> 18 & BYTE_MASK_63] +
    encodeMap[value >> 12 & BYTE_MASK_63] +
    encodeMap[value >> 6 & BYTE_MASK_63] +
    encodeMap[BYTE_MASK_63 & value]
  );
}

/**
 * Encode byte array slice to base64 string
 */
function encodeSlice(bytes: number[] | Uint8Array, start: number, end: number): string {
  const chunks: string[] = [];
  for (let i = start; i < end; i += 3) {
    const value =
      (bytes[i] << 16 & 16711680) +
      (bytes[i + 1] << 8 & 65280) +
      (BYTE_MASK_255 & bytes[i + 2]);
    chunks.push(encodeChunk(value));
  }
  return chunks.join("");
}

/**
 * Calculate byte length from base64 string
 */
export function byteLength(base64String: string): number {
  const [validLength, paddingLength] = getLengthInfo(base64String);
  return 3 * (validLength + paddingLength) / 4 - paddingLength;
}

/**
 * Decode base64 string to byte array
 */
export function toByteArray(base64String: string): Uint8Array | number[] {
  const [validLength, paddingLength] = getLengthInfo(base64String);
  const byteArray = new ByteArrayType(
    3 * (validLength + paddingLength) / 4 - paddingLength
  );
  
  const decodeEnd = paddingLength > 0 ? validLength - 4 : validLength;
  let byteIndex = 0;
  
  for (let i = 0; i < decodeEnd; i += 4) {
    const value =
      decodeMap[base64String.charCodeAt(i)] << 18 |
      decodeMap[base64String.charCodeAt(i + 1)] << 12 |
      decodeMap[base64String.charCodeAt(i + 2)] << 6 |
      decodeMap[base64String.charCodeAt(i + 3)];
    byteArray[byteIndex++] = value >> 16 & BYTE_MASK_255;
    byteArray[byteIndex++] = value >> 8 & BYTE_MASK_255;
    byteArray[byteIndex++] = BYTE_MASK_255 & value;
  }
  
  if (paddingLength === 2) {
    const value =
      decodeMap[base64String.charCodeAt(decodeEnd)] << 2 |
      decodeMap[base64String.charCodeAt(decodeEnd + 1)] >> 4;
    byteArray[byteIndex++] = BYTE_MASK_255 & value;
  }
  
  if (paddingLength === 1) {
    const value =
      decodeMap[base64String.charCodeAt(decodeEnd)] << 10 |
      decodeMap[base64String.charCodeAt(decodeEnd + 1)] << 4 |
      decodeMap[base64String.charCodeAt(decodeEnd + 2)] >> 2;
    byteArray[byteIndex++] = value >> 8 & BYTE_MASK_255;
    byteArray[byteIndex++] = BYTE_MASK_255 & value;
  }
  
  return byteArray;
}

/**
 * Encode byte array to base64 string
 */
export function fromByteArray(bytes: number[] | Uint8Array): string {
  const length = bytes.length;
  const remainder = length % 3;
  const chunks: string[] = [];
  const mainLength = length - remainder;
  
  for (let i = 0; i < mainLength; i += CHUNK_SIZE) {
    const end = i + CHUNK_SIZE > mainLength ? mainLength : i + CHUNK_SIZE;
    chunks.push(encodeSlice(bytes, i, end));
  }
  
  if (remainder === 1) {
    const value = bytes[length - 1];
    chunks.push(
      encodeMap[value >> 2] +
      encodeMap[value << 4 & BYTE_MASK_63] +
      "=="
    );
  } else if (remainder === 2) {
    const value = (bytes[length - 2] << 8) + bytes[length - 1];
    chunks.push(
      encodeMap[value >> 10] +
      encodeMap[value >> 4 & BYTE_MASK_63] +
      encodeMap[value << 2 & BYTE_MASK_63] +
      "="
    );
  }
  
  return chunks.join("");
}