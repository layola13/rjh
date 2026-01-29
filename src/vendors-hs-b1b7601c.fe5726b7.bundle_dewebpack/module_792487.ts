/**
 * Calculates the padded length for MD5 algorithm
 */
function calculatePaddedLength(length: number): number {
  return 14 + ((length + 64 >>> 9) << 4) + 1;
}

/**
 * Adds two 32-bit integers safely handling overflow
 */
function safeAdd(a: number, b: number): number {
  const lowBits = (65535 & a) + (65535 & b);
  return ((a >> 16) + (b >> 16) + (lowBits >> 16)) << 16 | (65535 & lowBits);
}

/**
 * Bitwise rotate left operation
 */
function rotateLeft(value: number, base: number, shift: number, addValue: number, rotateAmount: number, constant: number): number {
  const sum = safeAdd(safeAdd(base, value), safeAdd(addValue, constant));
  return safeAdd((sum << rotateAmount | sum >>> (32 - rotateAmount)), shift);
}

/**
 * MD5 auxiliary function F
 */
function md5F(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
  return rotateLeft((b & c) | (~b & d), a, b, x, s, t);
}

/**
 * MD5 auxiliary function G
 */
function md5G(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
  return rotateLeft((b & d) | (c & ~d), a, b, x, s, t);
}

/**
 * MD5 auxiliary function H
 */
function md5H(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
  return rotateLeft(b ^ c ^ d, a, b, x, s, t);
}

/**
 * MD5 auxiliary function I
 */
function md5I(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
  return rotateLeft(c ^ (b | ~d), a, b, x, s, t);
}

/**
 * Converts byte array to word array for MD5 processing
 */
function bytesToWords(bytes: Uint8Array): Uint32Array {
  if (bytes.length === 0) return new Uint32Array([]);
  
  const bitLength = 8 * bytes.length;
  const words = new Uint32Array(calculatePaddedLength(bitLength));
  
  for (let i = 0; i < bitLength; i += 8) {
    words[i >> 5] |= (255 & bytes[i / 8]) << (i % 32);
  }
  
  return words;
}

/**
 * Performs MD5 hash computation on word array
 */
function computeMD5(words: Uint32Array, bitLength: number): number[] {
  words[bitLength >> 5] |= 0x80 << (bitLength % 32);
  words[calculatePaddedLength(bitLength) - 1] = bitLength;
  
  const INITIAL_A = 1732584193;
  const INITIAL_B = -271733879;
  const INITIAL_C = -1732584194;
  const INITIAL_D = 271733878;
  
  let a = INITIAL_A;
  let b = INITIAL_B;
  let c = INITIAL_C;
  let d = INITIAL_D;
  
  for (let blockStart = 0; blockStart < words.length; blockStart += 16) {
    const savedA = a;
    const savedB = b;
    const savedC = c;
    const savedD = d;
    
    a = md5F(a, b, c, d, words[blockStart], 7, -680876936);
    d = md5F(d, a, b, c, words[blockStart + 1], 12, -389564586);
    c = md5F(c, d, a, b, words[blockStart + 2], 17, 606105819);
    b = md5F(b, c, d, a, words[blockStart + 3], 22, -1044525330);
    a = md5F(a, b, c, d, words[blockStart + 4], 7, -176418897);
    d = md5F(d, a, b, c, words[blockStart + 5], 12, 1200080426);
    c = md5F(c, d, a, b, words[blockStart + 6], 17, -1473231341);
    b = md5F(b, c, d, a, words[blockStart + 7], 22, -45705983);
    a = md5F(a, b, c, d, words[blockStart + 8], 7, 1770035416);
    d = md5F(d, a, b, c, words[blockStart + 9], 12, -1958414417);
    c = md5F(c, d, a, b, words[blockStart + 10], 17, -42063);
    b = md5F(b, c, d, a, words[blockStart + 11], 22, -1990404162);
    a = md5F(a, b, c, d, words[blockStart + 12], 7, 1804603682);
    d = md5F(d, a, b, c, words[blockStart + 13], 12, -40341101);
    c = md5F(c, d, a, b, words[blockStart + 14], 17, -1502002290);
    b = md5F(b, c, d, a, words[blockStart + 15], 22, 1236535329);
    
    a = md5G(a, b, c, d, words[blockStart + 1], 5, -165796510);
    d = md5G(d, a, b, c, words[blockStart + 6], 9, -1069501632);
    c = md5G(c, d, a, b, words[blockStart + 11], 14, 643717713);
    b = md5G(b, c, d, a, words[blockStart], 20, -373897302);
    a = md5G(a, b, c, d, words[blockStart + 5], 5, -701558691);
    d = md5G(d, a, b, c, words[blockStart + 10], 9, 38016083);
    c = md5G(c, d, a, b, words[blockStart + 15], 14, -660478335);
    b = md5G(b, c, d, a, words[blockStart + 4], 20, -405537848);
    a = md5G(a, b, c, d, words[blockStart + 9], 5, 568446438);
    d = md5G(d, a, b, c, words[blockStart + 14], 9, -1019803690);
    c = md5G(c, d, a, b, words[blockStart + 3], 14, -187363961);
    b = md5G(b, c, d, a, words[blockStart + 8], 20, 1163531501);
    a = md5G(a, b, c, d, words[blockStart + 13], 5, -1444681467);
    d = md5G(d, a, b, c, words[blockStart + 2], 9, -51403784);
    c = md5G(c, d, a, b, words[blockStart + 7], 14, 1735328473);
    b = md5G(b, c, d, a, words[blockStart + 12], 20, -1926607734);
    
    a = md5H(a, b, c, d, words[blockStart + 5], 4, -378558);
    d = md5H(d, a, b, c, words[blockStart + 8], 11, -2022574463);
    c = md5H(c, d, a, b, words[blockStart + 11], 16, 1839030562);
    b = md5H(b, c, d, a, words[blockStart + 14], 23, -35309556);
    a = md5H(a, b, c, d, words[blockStart + 1], 4, -1530992060);
    d = md5H(d, a, b, c, words[blockStart + 4], 11, 1272893353);
    c = md5H(c, d, a, b, words[blockStart + 7], 16, -155497632);
    b = md5H(b, c, d, a, words[blockStart + 10], 23, -1094730640);
    a = md5H(a, b, c, d, words[blockStart + 13], 4, 681279174);
    d = md5H(d, a, b, c, words[blockStart], 11, -358537222);
    c = md5H(c, d, a, b, words[blockStart + 3], 16, -722521979);
    b = md5H(b, c, d, a, words[blockStart + 6], 23, 76029189);
    a = md5H(a, b, c, d, words[blockStart + 9], 4, -640364487);
    d = md5H(d, a, b, c, words[blockStart + 12], 11, -421815835);
    c = md5H(c, d, a, b, words[blockStart + 15], 16, 530742520);
    b = md5H(b, c, d, a, words[blockStart + 2], 23, -995338651);
    
    a = md5I(a, b, c, d, words[blockStart], 6, -198630844);
    d = md5I(d, a, b, c, words[blockStart + 7], 10, 1126891415);
    c = md5I(c, d, a, b, words[blockStart + 14], 15, -1416354905);
    b = md5I(b, c, d, a, words[blockStart + 5], 21, -57434055);
    a = md5I(a, b, c, d, words[blockStart + 12], 6, 1700485571);
    d = md5I(d, a, b, c, words[blockStart + 3], 10, -1894986606);
    c = md5I(c, d, a, b, words[blockStart + 10], 15, -1051523);
    b = md5I(b, c, d, a, words[blockStart + 1], 21, -2054922799);
    a = md5I(a, b, c, d, words[blockStart + 8], 6, 1873313359);
    d = md5I(d, a, b, c, words[blockStart + 15], 10, -30611744);
    c = md5I(c, d, a, b, words[blockStart + 6], 15, -1560198380);
    b = md5I(b, c, d, a, words[blockStart + 13], 21, 1309151649);
    a = md5I(a, b, c, d, words[blockStart + 4], 6, -145523070);
    d = md5I(d, a, b, c, words[blockStart + 11], 10, -1120210379);
    c = md5I(c, d, a, b, words[blockStart + 2], 15, 718787259);
    b = md5I(b, c, d, a, words[blockStart + 9], 21, -343485551);
    
    a = safeAdd(a, savedA);
    b = safeAdd(b, savedB);
    c = safeAdd(c, savedC);
    d = safeAdd(d, savedD);
  }
  
  return [a, b, c, d];
}

/**
 * Converts MD5 digest to byte array
 */
function digestToBytes(digest: number[]): number[] {
  const result: number[] = [];
  const bitLength = 32 * digest.length;
  const hexChars = "0123456789abcdef";
  
  for (let i = 0; i < bitLength; i += 8) {
    const byte = (digest[i >> 5] >>> (i % 32)) & 255;
    const hex = parseInt(hexChars.charAt((byte >>> 4) & 15) + hexChars.charAt(15 & byte), 16);
    result.push(hex);
  }
  
  return result;
}

/**
 * Computes MD5 hash of input data
 */
export default function md5(input: string | Uint8Array): number[] {
  let bytes: Uint8Array;
  
  if (typeof input === "string") {
    const encoded = unescape(encodeURIComponent(input));
    bytes = new Uint8Array(encoded.length);
    for (let i = 0; i < encoded.length; ++i) {
      bytes[i] = encoded.charCodeAt(i);
    }
  } else {
    bytes = input;
  }
  
  const words = bytesToWords(bytes);
  const digest = computeMD5(words, 8 * bytes.length);
  return digestToBytes(digest);
}