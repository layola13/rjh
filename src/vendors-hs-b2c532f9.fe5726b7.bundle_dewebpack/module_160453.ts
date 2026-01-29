const FAST_STRING_CONVERSION_SUPPORTED = (() => {
  try {
    String.fromCharCode.apply(null, new Uint8Array(1) as unknown as number[]);
    return true;
  } catch {
    return false;
  }
})();

const UTF8_BYTE_LENGTHS = new Uint8Array(256);
for (let i = 0; i < 256; i++) {
  UTF8_BYTE_LENGTHS[i] = 
    i >= 252 ? 6 :
    i >= 248 ? 5 :
    i >= 240 ? 4 :
    i >= 224 ? 3 :
    i >= 192 ? 2 : 1;
}
UTF8_BYTE_LENGTHS[254] = 1;
UTF8_BYTE_LENGTHS[255] = 1;

const HIGH_SURROGATE_MASK = 0xFC00;
const HIGH_SURROGATE_VALUE = 0xD800;
const LOW_SURROGATE_VALUE = 0xDC00;
const SURROGATE_OFFSET = 0x10000;
const HIGH_SURROGATE_SHIFT = 10;

const REPLACEMENT_CHAR = 0xFFFD;
const MAX_BASIC_MULTILINGUAL_PLANE = 0x10000;
const SURROGATE_HIGH_START = 0xD800;
const SURROGATE_LOW_START = 0xDC00;
const SURROGATE_MASK = 0x3FF;

const UTF8_1_BYTE_MAX = 128;
const UTF8_2_BYTE_MAX = 2048;
const UTF8_3_BYTE_MAX = 65536;

const UTF8_1_BYTE_HEADER = 0;
const UTF8_2_BYTE_HEADER = 0xC0;
const UTF8_3_BYTE_HEADER = 0xE0;
const UTF8_4_BYTE_HEADER = 0xF0;
const UTF8_CONTINUATION_HEADER = 0x80;
const UTF8_CONTINUATION_MASK = 0x3F;

const UTF8_2_BYTE_MASK = 31;
const UTF8_3_BYTE_MASK = 15;
const UTF8_4_BYTE_MASK = 7;

/**
 * Converts a string to a UTF-8 encoded Uint8Array buffer
 */
export function string2buf(str: string): Uint8Array {
  if (typeof TextEncoder === "function" && TextEncoder.prototype.encode) {
    return new TextEncoder().encode(str);
  }

  const length = str.length;
  let byteLength = 0;

  for (let i = 0; i < length; i++) {
    let codePoint = str.charCodeAt(i);

    if ((codePoint & HIGH_SURROGATE_MASK) === HIGH_SURROGATE_VALUE && i + 1 < length) {
      const nextCodePoint = str.charCodeAt(i + 1);
      if ((nextCodePoint & HIGH_SURROGATE_MASK) === LOW_SURROGATE_VALUE) {
        codePoint = SURROGATE_OFFSET + 
          ((codePoint - SURROGATE_HIGH_START) << HIGH_SURROGATE_SHIFT) + 
          (nextCodePoint - SURROGATE_LOW_START);
        i++;
      }
    }

    byteLength += 
      codePoint < UTF8_1_BYTE_MAX ? 1 :
      codePoint < UTF8_2_BYTE_MAX ? 2 :
      codePoint < UTF8_3_BYTE_MAX ? 3 : 4;
  }

  const buffer = new Uint8Array(byteLength);
  let bufferIndex = 0;

  for (let i = 0; i < length; i++) {
    let codePoint = str.charCodeAt(i);

    if ((codePoint & HIGH_SURROGATE_MASK) === HIGH_SURROGATE_VALUE && i + 1 < length) {
      const nextCodePoint = str.charCodeAt(i + 1);
      if ((nextCodePoint & HIGH_SURROGATE_MASK) === LOW_SURROGATE_VALUE) {
        codePoint = SURROGATE_OFFSET + 
          ((codePoint - SURROGATE_HIGH_START) << HIGH_SURROGATE_SHIFT) + 
          (nextCodePoint - SURROGATE_LOW_START);
        i++;
      }
    }

    if (codePoint < UTF8_1_BYTE_MAX) {
      buffer[bufferIndex++] = codePoint;
    } else if (codePoint < UTF8_2_BYTE_MAX) {
      buffer[bufferIndex++] = UTF8_2_BYTE_HEADER | (codePoint >>> 6);
      buffer[bufferIndex++] = UTF8_CONTINUATION_HEADER | (codePoint & UTF8_CONTINUATION_MASK);
    } else if (codePoint < UTF8_3_BYTE_MAX) {
      buffer[bufferIndex++] = UTF8_3_BYTE_HEADER | (codePoint >>> 12);
      buffer[bufferIndex++] = UTF8_CONTINUATION_HEADER | ((codePoint >>> 6) & UTF8_CONTINUATION_MASK);
      buffer[bufferIndex++] = UTF8_CONTINUATION_HEADER | (codePoint & UTF8_CONTINUATION_MASK);
    } else {
      buffer[bufferIndex++] = UTF8_4_BYTE_HEADER | (codePoint >>> 18);
      buffer[bufferIndex++] = UTF8_CONTINUATION_HEADER | ((codePoint >>> 12) & UTF8_CONTINUATION_MASK);
      buffer[bufferIndex++] = UTF8_CONTINUATION_HEADER | ((codePoint >>> 6) & UTF8_CONTINUATION_MASK);
      buffer[bufferIndex++] = UTF8_CONTINUATION_HEADER | (codePoint & UTF8_CONTINUATION_MASK);
    }
  }

  return buffer;
}

/**
 * Converts a UTF-8 encoded buffer to a string
 */
export function buf2string(buffer: Uint8Array, maxLength?: number): string {
  const length = maxLength ?? buffer.length;

  if (typeof TextDecoder === "function" && TextDecoder.prototype.decode) {
    return new TextDecoder().decode(buffer.subarray(0, maxLength));
  }

  const codePoints = new Array<number>(2 * length);
  let codePointIndex = 0;
  let bufferIndex = 0;

  while (bufferIndex < length) {
    let byte = buffer[bufferIndex++];

    if (byte < UTF8_1_BYTE_MAX) {
      codePoints[codePointIndex++] = byte;
      continue;
    }

    let byteCount = UTF8_BYTE_LENGTHS[byte];

    if (byteCount > 4) {
      codePoints[codePointIndex++] = REPLACEMENT_CHAR;
      bufferIndex += byteCount - 1;
      continue;
    }

    let codePoint = byte & (byteCount === 2 ? UTF8_2_BYTE_MASK : byteCount === 3 ? UTF8_3_BYTE_MASK : UTF8_4_BYTE_MASK);

    while (byteCount > 1 && bufferIndex < length) {
      codePoint = (codePoint << 6) | (buffer[bufferIndex++] & UTF8_CONTINUATION_MASK);
      byteCount--;
    }

    if (byteCount > 1) {
      codePoints[codePointIndex++] = REPLACEMENT_CHAR;
    } else if (codePoint < MAX_BASIC_MULTILINGUAL_PLANE) {
      codePoints[codePointIndex++] = codePoint;
    } else {
      codePoint -= SURROGATE_OFFSET;
      codePoints[codePointIndex++] = SURROGATE_HIGH_START | ((codePoint >> HIGH_SURROGATE_SHIFT) & SURROGATE_MASK);
      codePoints[codePointIndex++] = SURROGATE_LOW_START | (codePoint & SURROGATE_MASK);
    }
  }

  return arrayToString(codePoints, codePointIndex);
}

function arrayToString(codePoints: number[], length: number): string {
  const MAX_CHUNK_SIZE = 65534;

  if (length < MAX_CHUNK_SIZE && codePoints.subarray && FAST_STRING_CONVERSION_SUPPORTED) {
    const array = codePoints.length === length ? codePoints : codePoints.slice(0, length);
    return String.fromCharCode.apply(null, array as unknown as number[]);
  }

  let result = "";
  for (let i = 0; i < length; i++) {
    result += String.fromCharCode(codePoints[i]);
  }
  return result;
}

/**
 * Finds the safe boundary for UTF-8 truncation
 */
export function utf8border(buffer: Uint8Array, maxLength?: number): number {
  let length = maxLength ?? buffer.length;
  
  if (length > buffer.length) {
    length = buffer.length;
  }

  let position = length - 1;

  while (position >= 0 && (buffer[position] & 0xC0) === UTF8_CONTINUATION_HEADER) {
    position--;
  }

  if (position < 0 || position === 0) {
    return length;
  }

  return position + UTF8_BYTE_LENGTHS[buffer[position]] > length ? position : length;
}