const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

const ENCODE_LOOKUP: string[] = [];
const DECODE_LOOKUP: number[] = [];

const BYTES_PER_CHUNK = 16383;
const BITS_PER_BYTE = 8;
const BITS_PER_BASE64 = 6;

for (let i = 0; i < 64; ++i) {
    ENCODE_LOOKUP[i] = BASE64_CHARS[i];
    DECODE_LOOKUP[BASE64_CHARS.charCodeAt(i)] = i;
}

DECODE_LOOKUP["-".charCodeAt(0)] = 62;
DECODE_LOOKUP["_".charCodeAt(0)] = 63;

/**
 * Validates and extracts base64 string metadata
 * @param input - Base64 encoded string
 * @returns Tuple of [contentLength, paddingLength]
 */
function getBase64Metadata(input: string): [number, number] {
    const length = input.length;
    
    if (length % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
    }
    
    const paddingIndex = input.indexOf("=");
    const contentLength = paddingIndex === -1 ? length : paddingIndex;
    const paddingLength = contentLength === length ? 0 : 4 - contentLength % 4;
    
    return [contentLength, paddingLength];
}

/**
 * Encodes a single 24-bit chunk to base64
 * @param chunk - 24-bit integer value
 * @returns Base64 encoded string (4 characters)
 */
function encodeChunk(chunk: number): string {
    return ENCODE_LOOKUP[chunk >> 18 & 63] +
           ENCODE_LOOKUP[chunk >> 12 & 63] +
           ENCODE_LOOKUP[chunk >> 6 & 63] +
           ENCODE_LOOKUP[63 & chunk];
}

/**
 * Encodes a byte range to base64
 * @param bytes - Source byte array
 * @param start - Start index
 * @param end - End index
 * @returns Base64 encoded string
 */
function encodeRange(bytes: Uint8Array | number[], start: number, end: number): string {
    const chunks: string[] = [];
    
    for (let index = start; index < end; index += 3) {
        const chunk = (bytes[index] << 16 & 16711680) +
                     (bytes[index + 1] << 8 & 65280) +
                     (255 & bytes[index + 2]);
        chunks.push(encodeChunk(chunk));
    }
    
    return chunks.join("");
}

/**
 * Calculates the byte length of a base64 encoded string
 * @param input - Base64 encoded string
 * @returns Decoded byte length
 */
export function byteLength(input: string): number {
    const [contentLength, paddingLength] = getBase64Metadata(input);
    return 3 * (contentLength + paddingLength) / 4 - paddingLength;
}

/**
 * Decodes a base64 string to byte array
 * @param input - Base64 encoded string
 * @returns Decoded byte array
 */
export function toByteArray(input: string): Uint8Array {
    const [contentLength, paddingLength] = getBase64Metadata(input);
    const ArrayType = typeof Uint8Array !== "undefined" ? Uint8Array : Array as any;
    const output = new ArrayType(3 * (contentLength + paddingLength) / 4 - paddingLength);
    
    const lastFullIndex = paddingLength > 0 ? contentLength - 4 : contentLength;
    let outputIndex = 0;
    let decodedValue: number;
    
    for (let inputIndex = 0; inputIndex < lastFullIndex; inputIndex += 4) {
        decodedValue = DECODE_LOOKUP[input.charCodeAt(inputIndex)] << 18 |
                      DECODE_LOOKUP[input.charCodeAt(inputIndex + 1)] << 12 |
                      DECODE_LOOKUP[input.charCodeAt(inputIndex + 2)] << 6 |
                      DECODE_LOOKUP[input.charCodeAt(inputIndex + 3)];
        
        output[outputIndex++] = decodedValue >> 16 & 255;
        output[outputIndex++] = decodedValue >> 8 & 255;
        output[outputIndex++] = 255 & decodedValue;
    }
    
    if (paddingLength === 2) {
        decodedValue = DECODE_LOOKUP[input.charCodeAt(lastFullIndex)] << 2 |
                      DECODE_LOOKUP[input.charCodeAt(lastFullIndex + 1)] >> 4;
        output[outputIndex++] = 255 & decodedValue;
    }
    
    if (paddingLength === 1) {
        decodedValue = DECODE_LOOKUP[input.charCodeAt(lastFullIndex)] << 10 |
                      DECODE_LOOKUP[input.charCodeAt(lastFullIndex + 1)] << 4 |
                      DECODE_LOOKUP[input.charCodeAt(lastFullIndex + 2)] >> 2;
        output[outputIndex++] = decodedValue >> 8 & 255;
        output[outputIndex++] = 255 & decodedValue;
    }
    
    return output;
}

/**
 * Encodes a byte array to base64 string
 * @param bytes - Source byte array
 * @returns Base64 encoded string
 */
export function fromByteArray(bytes: Uint8Array | number[]): string {
    const length = bytes.length;
    const remainder = length % 3;
    const mainLength = length - remainder;
    const chunks: string[] = [];
    
    for (let start = 0; start < mainLength; start += BYTES_PER_CHUNK) {
        const end = start + BYTES_PER_CHUNK > mainLength ? mainLength : start + BYTES_PER_CHUNK;
        chunks.push(encodeRange(bytes, start, end));
    }
    
    if (remainder === 1) {
        const lastByte = bytes[length - 1];
        chunks.push(ENCODE_LOOKUP[lastByte >> 2] +
                   ENCODE_LOOKUP[lastByte << 4 & 63] +
                   "==");
    } else if (remainder === 2) {
        const lastTwoBytes = (bytes[length - 2] << 8) + bytes[length - 1];
        chunks.push(ENCODE_LOOKUP[lastTwoBytes >> 10] +
                   ENCODE_LOOKUP[lastTwoBytes >> 4 & 63] +
                   ENCODE_LOOKUP[lastTwoBytes << 2 & 63] +
                   "=");
    }
    
    return chunks.join("");
}