/**
 * Calculates the number of 32-bit words needed for MD5 padding
 * @param length - The length of the input data in bits
 * @returns The number of 32-bit words required
 */
function calculatePaddedLength(length: number): number {
  return 14 + (((length + 64) >>> 9) << 4) + 1;
}

/**
 * Adds two 32-bit integers with proper overflow handling
 * @param a - First integer
 * @param b - Second integer
 * @returns Sum of a and b as a 32-bit integer
 */
function add32(a: number, b: number): number {
  const lowerBitsSum = (65535 & a) + (65535 & b);
  return (((a >> 16) + (b >> 16) + (lowerBitsSum >> 16)) << 16) | (65535 & lowerBitsSum);
}

/**
 * Core MD5 operation with circular left shift
 * @param func - The result of the MD5 function (F, G, H, or I)
 * @param state - Current state value
 * @param buffer - Buffer value
 * @param data - Input data value
 * @param shift - Number of bits to shift
 * @param constant - MD5 constant
 * @returns Updated state value
 */
function md5Operation(
  func: number,
  state: number,
  buffer: number,
  data: number,
  shift: number,
  constant: number
): number {
  const temp = add32(add32(buffer, func), add32(data, constant));
  return add32((temp << shift) | (temp >>> (32 - shift)), state);
}

/**
 * MD5 auxiliary function F: (B & C) | (~B & D)
 */
function md5F(
  state: number,
  b: number,
  c: number,
  d: number,
  data: number,
  shift: number,
  constant: number
): number {
  return md5Operation((b & c) | (~b & d), state, b, data, shift, constant);
}

/**
 * MD5 auxiliary function G: (B & D) | (C & ~D)
 */
function md5G(
  state: number,
  b: number,
  c: number,
  d: number,
  data: number,
  shift: number,
  constant: number
): number {
  return md5Operation((b & d) | (c & ~d), state, b, data, shift, constant);
}

/**
 * MD5 auxiliary function H: B ^ C ^ D
 */
function md5H(
  state: number,
  b: number,
  c: number,
  d: number,
  data: number,
  shift: number,
  constant: number
): number {
  return md5Operation(b ^ c ^ d, state, b, data, shift, constant);
}

/**
 * MD5 auxiliary function I: C ^ (B | ~D)
 */
function md5I(
  state: number,
  b: number,
  c: number,
  d: number,
  data: number,
  shift: number,
  constant: number
): number {
  return md5Operation(c ^ (b | ~d), state, b, data, shift, constant);
}

/**
 * Converts a byte array to an array of 32-bit words
 * @param input - Input byte array
 * @returns Array of 32-bit words
 */
function bytesToWords(input: Uint8Array): Uint32Array {
  if (input.length === 0) {
    return new Uint32Array(0);
  }

  const bitLength = 8 * input.length;
  const words = new Uint32Array(calculatePaddedLength(bitLength));

  for (let i = 0; i < bitLength; i += 8) {
    words[i >> 5] |= (255 & input[i / 8]) << (i % 32);
  }

  return words;
}

/**
 * Performs the MD5 hash computation
 * @param words - Input data as 32-bit words
 * @param bitLength - Length of input in bits
 * @returns Array of four 32-bit words representing the MD5 hash
 */
function computeMD5(words: Uint32Array, bitLength: number): number[] {
  words[bitLength >> 5] |= 128 << (bitLength % 32);
  words[calculatePaddedLength(bitLength) - 1] = bitLength;

  const INITIAL_A = 1732584193;
  const INITIAL_B = -271733879;
  const INITIAL_C = -1732584194;
  const INITIAL_D = 271733878;

  let a = INITIAL_A;
  let b = INITIAL_B;
  let c = INITIAL_C;
  let d = INITIAL_D;

  for (let blockIndex = 0; blockIndex < words.length; blockIndex += 16) {
    const savedA = a;
    const savedB = b;
    const savedC = c;
    const savedD = d;

    a = md5F(a, b, c, d, words[blockIndex], 7, -680876936);
    d = md5F(d, a, b, c, words[blockIndex + 1], 12, -389564586);
    c = md5F(c, d, a, b, words[blockIndex + 2], 17, 606105819);
    b = md5F(b, c, d, a, words[blockIndex + 3], 22, -1044525330);
    a = md5F(a, b, c, d, words[blockIndex + 4], 7, -176418897);
    d = md5F(d, a, b, c, words[blockIndex + 5], 12, 1200080426);
    c = md5F(c, d, a, b, words[blockIndex + 6], 17, -1473231341);
    b = md5F(b, c, d, a, words[blockIndex + 7], 22, -45705983);
    a = md5F(a, b, c, d, words[blockIndex + 8], 7, 1770035416);
    d = md5F(d, a, b, c, words[blockIndex + 9], 12, -1958414417);
    c = md5F(c, d, a, b, words[blockIndex + 10], 17, -42063);
    b = md5F(b, c, d, a, words[blockIndex + 11], 22, -1990404162);
    a = md5F(a, b, c, d, words[blockIndex + 12], 7, 1804603682);
    d = md5F(d, a, b, c, words[blockIndex + 13], 12, -40341101);
    c = md5F(c, d, a, b, words[blockIndex + 14], 17, -1502002290);
    b = md5F(b, c, d, a, words[blockIndex + 15], 22, 1236535329);

    a = md5G(a, b, c, d, words[blockIndex + 1], 5, -165796510);
    d = md5G(d, a, b, c, words[blockIndex + 6], 9, -1069501632);
    c = md5G(c, d, a, b, words[blockIndex + 11], 14, 643717713);
    b = md5G(b, c, d, a, words[blockIndex], 20, -373897302);
    a = md5G(a, b, c, d, words[blockIndex + 5], 5, -701558691);
    d = md5G(d, a, b, c, words[blockIndex + 10], 9, 38016083);
    c = md5G(c, d, a, b, words[blockIndex + 15], 14, -660478335);
    b = md5G(b, c, d, a, words[blockIndex + 4], 20, -405537848);
    a = md5G(a, b, c, d, words[blockIndex + 9], 5, 568446438);
    d = md5G(d, a, b, c, words[blockIndex + 14], 9, -1019803690);
    c = md5G(c, d, a, b, words[blockIndex + 3], 14, -187363961);
    b = md5G(b, c, d, a, words[blockIndex + 8], 20, 1163531501);
    a = md5G(a, b, c, d, words[blockIndex + 13], 5, -1444681467);
    d = md5G(d, a, b, c, words[blockIndex + 2], 9, -51403784);
    c = md5G(c, d, a, b, words[blockIndex + 7], 14, 1735328473);
    b = md5G(b, c, d, a, words[blockIndex + 12], 20, -1926607734);

    a = md5H(a, b, c, d, words[blockIndex + 5], 4, -378558);
    d = md5H(d, a, b, c, words[blockIndex + 8], 11, -2022574463);
    c = md5H(c, d, a, b, words[blockIndex + 11], 16, 1839030562);
    b = md5H(b, c, d, a, words[blockIndex + 14], 23, -35309556);
    a = md5H(a, b, c, d, words[blockIndex + 1], 4, -1530992060);
    d = md5H(d, a, b, c, words[blockIndex + 4], 11, 1272893353);
    c = md5H(c, d, a, b, words[blockIndex + 7], 16, -155497632);
    b = md5H(b, c, d, a, words[blockIndex + 10], 23, -1094730640);
    a = md5H(a, b, c, d, words[blockIndex + 13], 4, 681279174);
    d = md5H(d, a, b, c, words[blockIndex], 11, -358537222);
    c = md5H(c, d, a, b, words[blockIndex + 3], 16, -722521979);
    b = md5H(b, c, d, a, words[blockIndex + 6], 23, 76029189);
    a = md5H(a, b, c, d, words[blockIndex + 9], 4, -640364487);
    d = md5H(d, a, b, c, words[blockIndex + 12], 11, -421815835);
    c = md5H(c, d, a, b, words[blockIndex + 15], 16, 530742520);
    b = md5H(b, c, d, a, words[blockIndex + 2], 23, -995338651);

    a = md5I(a, b, c, d, words[blockIndex], 6, -198630844);
    d = md5I(d, a, b, c, words[blockIndex + 7], 10, 1126891415);
    c = md5I(c, d, a, b, words[blockIndex + 14], 15, -1416354905);
    b = md5I(b, c, d, a, words[blockIndex + 5], 21, -57434055);
    a = md5I(a, b, c, d, words[blockIndex + 12], 6, 1700485571);
    d = md5I(d, a, b, c, words[blockIndex + 3], 10, -1894986606);
    c = md5I(c, d, a, b, words[blockIndex + 10], 15, -1051523);
    b = md5I(b, c, d, a, words[blockIndex + 1], 21, -2054922799);
    a = md5I(a, b, c, d, words[blockIndex + 8], 6, 1873313359);
    d = md5I(d, a, b, c, words[blockIndex + 15], 10, -30611744);
    c = md5I(c, d, a, b, words[blockIndex + 6], 15, -1560198380);
    b = md5I(b, c, d, a, words[blockIndex + 13], 21, 1309151649);
    a = md5I(a, b, c, d, words[blockIndex + 4], 6, -145523070);
    d = md5I(d, a, b, c, words[blockIndex + 11], 10, -1120210379);
    c = md5I(c, d, a, b, words[blockIndex + 2], 15, 718787259);
    b = md5I(b, c, d, a, words[blockIndex + 9], 21, -343485551);

    a = add32(a, savedA);
    b = add32(b, savedB);
    c = add32(c, savedC);
    d = add32(d, savedD);
  }

  return [a, b, c, d];
}

/**
 * Converts MD5 hash words to byte array
 * @param hashWords - Array of four 32-bit words representing MD5 hash
 * @returns Byte array representation of the hash
 */
function wordsToBytes(hashWords: number[]): number[] {
  const result: number[] = [];
  const bitLength = 32 * hashWords.length;
  const hexChars = "0123456789abcdef";

  for (let i = 0; i < bitLength; i += 8) {
    const byte = (hashWords[i >> 5] >>> (i % 32)) & 255;
    const hexByte = parseInt(
      hexChars.charAt((byte >>> 4) & 15) + hexChars.charAt(15 & byte),
      16
    );
    result.push(hexByte);
  }

  return result;
}

/**
 * Computes MD5 hash of input data
 * @param input - Input string or byte array
 * @returns MD5 hash as byte array
 */
export default function md5(input: string | Uint8Array): number[] {
  let bytes: Uint8Array;

  if (typeof input === "string") {
    const utf8String = unescape(encodeURIComponent(input));
    bytes = new Uint8Array(utf8String.length);
    for (let i = 0; i < utf8String.length; ++i) {
      bytes[i] = utf8String.charCodeAt(i);
    }
  } else {
    bytes = input;
  }

  const words = bytesToWords(bytes);
  const hashWords = computeMD5(words, 8 * bytes.length);
  return wordsToBytes(hashWords);
}