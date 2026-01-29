const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

const ENCODING_TABLE: string[] = [];
const DECODING_TABLE: number[] = [];

const TypedArray = typeof Uint8Array !== "undefined" ? Uint8Array : Array;

for (let i = 0; i < 64; ++i) {
  ENCODING_TABLE[i] = BASE64_CHARS[i];
  DECODING_TABLE[BASE64_CHARS.charCodeAt(i)] = i;
}

DECODING_TABLE["-".charCodeAt(0)] = 62;
DECODING_TABLE["_".charCodeAt(0)] = 63;

interface PaddingInfo {
  validLength: number;
  paddingLength: number;
}

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

function encodeChunk(bytes: Uint8Array | number[], start: number, end: number): string {
  const result: string[] = [];
  
  for (let index = start; index < end; index += 3) {
    const triplet = 
      ((bytes[index] << 16) & 0xFF0000) + 
      ((bytes[index + 1] << 8) & 0xFF00) + 
      (bytes[index + 2] & 0xFF);
    
    result.push(
      ENCODING_TABLE[(triplet >> 18) & 0x3F] +
      ENCODING_TABLE[(triplet >> 12) & 0x3F] +
      ENCODING_TABLE[(triplet >> 6) & 0x3F] +
      ENCODING_TABLE[triplet & 0x3F]
    );
  }
  
  return result.join("");
}

export function byteLength(base64String: string): number {
  const [validLength, paddingLength] = getLengthInfo(base64String);
  return (3 * (validLength + paddingLength)) / 4 - paddingLength;
}

export function toByteArray(base64String: string): Uint8Array | number[] {
  const [validLength, paddingLength] = getLengthInfo(base64String);
  const byteArrayLength = (3 * (validLength + paddingLength)) / 4 - paddingLength;
  const result = new TypedArray(byteArrayLength);
  
  let byteIndex = 0;
  const endIndex = paddingLength > 0 ? validLength - 4 : validLength;
  
  for (let i = 0; i < endIndex; i += 4) {
    const encoded = 
      (DECODING_TABLE[base64String.charCodeAt(i)] << 18) |
      (DECODING_TABLE[base64String.charCodeAt(i + 1)] << 12) |
      (DECODING_TABLE[base64String.charCodeAt(i + 2)] << 6) |
      DECODING_TABLE[base64String.charCodeAt(i + 3)];
    
    result[byteIndex++] = (encoded >> 16) & 0xFF;
    result[byteIndex++] = (encoded >> 8) & 0xFF;
    result[byteIndex++] = encoded & 0xFF;
  }
  
  if (paddingLength === 2) {
    const encoded = 
      (DECODING_TABLE[base64String.charCodeAt(endIndex)] << 2) |
      (DECODING_TABLE[base64String.charCodeAt(endIndex + 1)] >> 4);
    result[byteIndex++] = encoded & 0xFF;
  }
  
  if (paddingLength === 1) {
    const encoded = 
      (DECODING_TABLE[base64String.charCodeAt(endIndex)] << 10) |
      (DECODING_TABLE[base64String.charCodeAt(endIndex + 1)] << 4) |
      (DECODING_TABLE[base64String.charCodeAt(endIndex + 2)] >> 2);
    result[byteIndex++] = (encoded >> 8) & 0xFF;
    result[byteIndex++] = encoded & 0xFF;
  }
  
  return result;
}

export function fromByteArray(bytes: Uint8Array | number[]): string {
  const length = bytes.length;
  const remainder = length % 3;
  const chunks: string[] = [];
  const maxChunkSize = 16383;
  const mainLength = length - remainder;
  
  for (let i = 0; i < mainLength; i += maxChunkSize) {
    const chunkEnd = i + maxChunkSize > mainLength ? mainLength : i + maxChunkSize;
    chunks.push(encodeChunk(bytes, i, chunkEnd));
  }
  
  if (remainder === 1) {
    const lastByte = bytes[length - 1];
    chunks.push(
      ENCODING_TABLE[lastByte >> 2] +
      ENCODING_TABLE[(lastByte << 4) & 0x3F] +
      "=="
    );
  } else if (remainder === 2) {
    const lastTwoBytes = (bytes[length - 2] << 8) + bytes[length - 1];
    chunks.push(
      ENCODING_TABLE[lastTwoBytes >> 10] +
      ENCODING_TABLE[(lastTwoBytes >> 4) & 0x3F] +
      ENCODING_TABLE[(lastTwoBytes << 2) & 0x3F] +
      "="
    );
  }
  
  return chunks.join("");
}