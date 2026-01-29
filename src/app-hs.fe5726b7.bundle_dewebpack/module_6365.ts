const BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

const encodeTable: string[] = [];
const decodeTable: number[] = [];

for (let index = 0; index < 64; ++index) {
  encodeTable[index] = BASE64_CHARS[index];
  decodeTable[BASE64_CHARS.charCodeAt(index)] = index;
}

decodeTable["-".charCodeAt(0)] = 62;
decodeTable["_".charCodeAt(0)] = 63;

const TypedArray = typeof Uint8Array !== "undefined" ? Uint8Array : Array;

interface Base64LengthInfo {
  validLength: number;
  paddingLength: number;
}

function getBase64LengthInfo(encodedString: string): [number, number] {
  const totalLength = encodedString.length;
  
  if (totalLength % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  
  const paddingIndex = encodedString.indexOf("=");
  const validLength = paddingIndex === -1 ? totalLength : paddingIndex;
  const paddingLength = validLength === totalLength ? 0 : 4 - validLength % 4;
  
  return [validLength, paddingLength];
}

function encodeChunk(bytes: ArrayLike<number>, start: number, end: number): string {
  const result: string[] = [];
  
  for (let position = start; position < end; position += 3) {
    const triplet = 
      (bytes[position] << 16 & 0xFF0000) + 
      (bytes[position + 1] << 8 & 0xFF00) + 
      (bytes[position + 2] & 0xFF);
    
    result.push(
      encodeTable[triplet >> 18 & 63] + 
      encodeTable[triplet >> 12 & 63] + 
      encodeTable[triplet >> 6 & 63] + 
      encodeTable[triplet & 63]
    );
  }
  
  return result.join("");
}

export function byteLength(encodedString: string): number {
  const [validLength, paddingLength] = getBase64LengthInfo(encodedString);
  return 3 * (validLength + paddingLength) / 4 - paddingLength;
}

export function toByteArray(encodedString: string): Uint8Array | number[] {
  const [validLength, paddingLength] = getBase64LengthInfo(encodedString);
  
  const byteArray = new TypedArray(
    3 * (validLength + paddingLength) / 4 - paddingLength
  );
  
  let outputIndex = 0;
  const loopEnd = paddingLength > 0 ? validLength - 4 : validLength;
  
  for (let inputIndex = 0; inputIndex < loopEnd; inputIndex += 4) {
    const quartet = 
      decodeTable[encodedString.charCodeAt(inputIndex)] << 18 | 
      decodeTable[encodedString.charCodeAt(inputIndex + 1)] << 12 | 
      decodeTable[encodedString.charCodeAt(inputIndex + 2)] << 6 | 
      decodeTable[encodedString.charCodeAt(inputIndex + 3)];
    
    byteArray[outputIndex++] = quartet >> 16 & 255;
    byteArray[outputIndex++] = quartet >> 8 & 255;
    byteArray[outputIndex++] = quartet & 255;
  }
  
  if (paddingLength === 2) {
    const doublet = 
      decodeTable[encodedString.charCodeAt(loopEnd)] << 2 | 
      decodeTable[encodedString.charCodeAt(loopEnd + 1)] >> 4;
    byteArray[outputIndex++] = doublet & 255;
  }
  
  if (paddingLength === 1) {
    const triplet = 
      decodeTable[encodedString.charCodeAt(loopEnd)] << 10 | 
      decodeTable[encodedString.charCodeAt(loopEnd + 1)] << 4 | 
      decodeTable[encodedString.charCodeAt(loopEnd + 2)] >> 2;
    byteArray[outputIndex++] = triplet >> 8 & 255;
    byteArray[outputIndex++] = triplet & 255;
  }
  
  return byteArray;
}

export function fromByteArray(bytes: ArrayLike<number>): string {
  const length = bytes.length;
  const remainder = length % 3;
  const chunks: string[] = [];
  const MAX_CHUNK_SIZE = 16383;
  
  const mainLength = length - remainder;
  for (let position = 0; position < mainLength; position += MAX_CHUNK_SIZE) {
    const chunkEnd = position + MAX_CHUNK_SIZE > mainLength ? mainLength : position + MAX_CHUNK_SIZE;
    chunks.push(encodeChunk(bytes, position, chunkEnd));
  }
  
  if (remainder === 1) {
    const lastByte = bytes[length - 1];
    chunks.push(
      encodeTable[lastByte >> 2] + 
      encodeTable[lastByte << 4 & 63] + 
      "=="
    );
  } else if (remainder === 2) {
    const lastTwoBytes = (bytes[length - 2] << 8) + bytes[length - 1];
    chunks.push(
      encodeTable[lastTwoBytes >> 10] + 
      encodeTable[lastTwoBytes >> 4 & 63] + 
      encodeTable[lastTwoBytes << 2 & 63] + 
      "="
    );
  }
  
  return chunks.join("");
}