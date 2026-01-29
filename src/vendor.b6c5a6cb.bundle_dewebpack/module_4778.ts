/**
 * MD5 hash algorithm implementation
 */

interface WordArray {
  words: number[];
  sigBytes: number;
  init(words: number[]): WordArray;
}

interface Hasher {
  _hash: WordArray;
  _data: WordArray;
  _nDataBytes: number;
  _doReset(): void;
  _doProcessBlock(words: number[], offset: number): void;
  _doFinalize(): WordArray;
  _process(): void;
  clone(): Hasher;
  extend(overrides: Partial<MD5Hasher>): any;
  _createHelper(hasher: any): any;
  _createHmacHelper(hasher: any): any;
}

interface MD5Hasher extends Hasher {
  _doReset(): void;
  _doProcessBlock(words: number[], offset: number): void;
  _doFinalize(): WordArray;
  clone(): MD5Hasher;
}

interface CryptoLib {
  lib: {
    WordArray: {
      init(words: number[]): WordArray;
    };
    Hasher: Hasher;
  };
  algo: Record<string, any>;
  MD5: any;
  HmacMD5: any;
}

const SINE_TABLE_SIZE = 64;
const INITIAL_HASH_VALUES = [1732584193, 4023233417, 2562383102, 271733878];
const MAX_32BIT = 4294967296;
const BYTE_MASK_LOW = 16711935;
const BYTE_MASK_HIGH = 4278255360;
const BITS_PER_BYTE = 8;
const FINALIZE_PADDING = 128;

/**
 * Initialize sine-based constant table for MD5
 */
function initializeSineTable(): number[] {
  const table: number[] = [];
  for (let i = 0; i < SINE_TABLE_SIZE; i++) {
    table[i] = (MAX_32BIT * Math.abs(Math.sin(i + 1))) | 0;
  }
  return table;
}

/**
 * MD5 round function F
 */
function roundF(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
  const temp = a + ((b & c) | (~b & d)) + x + t;
  return ((temp << s) | (temp >>> (32 - s))) + b;
}

/**
 * MD5 round function G
 */
function roundG(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
  const temp = a + ((b & d) | (c & ~d)) + x + t;
  return ((temp << s) | (temp >>> (32 - s))) + b;
}

/**
 * MD5 round function H
 */
function roundH(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
  const temp = a + (b ^ c ^ d) + x + t;
  return ((temp << s) | (temp >>> (32 - s))) + b;
}

/**
 * MD5 round function I
 */
function roundI(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
  const temp = a + (c ^ (b | ~d)) + x + t;
  return ((temp << s) | (temp >>> (32 - s))) + b;
}

/**
 * Swap bytes in 32-bit word
 */
function swapEndian(word: number): number {
  return (BYTE_MASK_LOW & ((word << 8) | (word >>> 24))) | 
         (BYTE_MASK_HIGH & ((word << 24) | (word >>> 8)));
}

/**
 * Create MD5 hasher
 */
export function createMD5Hasher(cryptoLib: CryptoLib): any {
  const { lib, algo } = cryptoLib;
  const { WordArray, Hasher } = lib;
  
  const sineTable = initializeSineTable();

  const MD5 = Hasher.extend({
    _doReset(): void {
      this._hash = WordArray.init([...INITIAL_HASH_VALUES]);
    },

    _doProcessBlock(words: number[], offset: number): void {
      // Swap endianness for input block
      for (let i = 0; i < 16; i++) {
        const index = offset + i;
        const word = words[index];
        words[index] = swapEndian(word);
      }

      const hashWords = this._hash.words;
      const [x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, x15] = [
        words[offset + 0], words[offset + 1], words[offset + 2], words[offset + 3],
        words[offset + 4], words[offset + 5], words[offset + 6], words[offset + 7],
        words[offset + 8], words[offset + 9], words[offset + 10], words[offset + 11],
        words[offset + 12], words[offset + 13], words[offset + 14], words[offset + 15]
      ];

      let [a, b, c, d] = hashWords;

      // Round 1
      a = roundF(a, b, c, d, x0, 7, sineTable[0]);
      d = roundF(d, a, b, c, x1, 12, sineTable[1]);
      c = roundF(c, d, a, b, x2, 17, sineTable[2]);
      b = roundF(b, c, d, a, x3, 22, sineTable[3]);
      a = roundF(a, b, c, d, x4, 7, sineTable[4]);
      d = roundF(d, a, b, c, x5, 12, sineTable[5]);
      c = roundF(c, d, a, b, x6, 17, sineTable[6]);
      b = roundF(b, c, d, a, x7, 22, sineTable[7]);
      a = roundF(a, b, c, d, x8, 7, sineTable[8]);
      d = roundF(d, a, b, c, x9, 12, sineTable[9]);
      c = roundF(c, d, a, b, x10, 17, sineTable[10]);
      b = roundF(b, c, d, a, x11, 22, sineTable[11]);
      a = roundF(a, b, c, d, x12, 7, sineTable[12]);
      d = roundF(d, a, b, c, x13, 12, sineTable[13]);
      c = roundF(c, d, a, b, x14, 17, sineTable[14]);
      b = roundF(b, c, d, a, x15, 22, sineTable[15]);

      // Round 2
      a = roundG(a, b, c, d, x1, 5, sineTable[16]);
      d = roundG(d, a, b, c, x6, 9, sineTable[17]);
      c = roundG(c, d, a, b, x11, 14, sineTable[18]);
      b = roundG(b, c, d, a, x0, 20, sineTable[19]);
      a = roundG(a, b, c, d, x5, 5, sineTable[20]);
      d = roundG(d, a, b, c, x10, 9, sineTable[21]);
      c = roundG(c, d, a, b, x15, 14, sineTable[22]);
      b = roundG(b, c, d, a, x4, 20, sineTable[23]);
      a = roundG(a, b, c, d, x9, 5, sineTable[24]);
      d = roundG(d, a, b, c, x14, 9, sineTable[25]);
      c = roundG(c, d, a, b, x3, 14, sineTable[26]);
      b = roundG(b, c, d, a, x8, 20, sineTable[27]);
      a = roundG(a, b, c, d, x13, 5, sineTable[28]);
      d = roundG(d, a, b, c, x2, 9, sineTable[29]);
      c = roundG(c, d, a, b, x7, 14, sineTable[30]);
      b = roundG(b, c, d, a, x12, 20, sineTable[31]);

      // Round 3
      a = roundH(a, b, c, d, x5, 4, sineTable[32]);
      d = roundH(d, a, b, c, x8, 11, sineTable[33]);
      c = roundH(c, d, a, b, x11, 16, sineTable[34]);
      b = roundH(b, c, d, a, x14, 23, sineTable[35]);
      a = roundH(a, b, c, d, x1, 4, sineTable[36]);
      d = roundH(d, a, b, c, x4, 11, sineTable[37]);
      c = roundH(c, d, a, b, x7, 16, sineTable[38]);
      b = roundH(b, c, d, a, x10, 23, sineTable[39]);
      a = roundH(a, b, c, d, x13, 4, sineTable[40]);
      d = roundH(d, a, b, c, x0, 11, sineTable[41]);
      c = roundH(c, d, a, b, x3, 16, sineTable[42]);
      b = roundH(b, c, d, a, x6, 23, sineTable[43]);
      a = roundH(a, b, c, d, x9, 4, sineTable[44]);
      d = roundH(d, a, b, c, x12, 11, sineTable[45]);
      c = roundH(c, d, a, b, x15, 16, sineTable[46]);
      b = roundH(b, c, d, a, x2, 23, sineTable[47]);

      // Round 4
      a = roundI(a, b, c, d, x0, 6, sineTable[48]);
      d = roundI(d, a, b, c, x7, 10, sineTable[49]);
      c = roundI(c, d, a, b, x14, 15, sineTable[50]);
      b = roundI(b, c, d, a, x5, 21, sineTable[51]);
      a = roundI(a, b, c, d, x12, 6, sineTable[52]);
      d = roundI(d, a, b, c, x3, 10, sineTable[53]);
      c = roundI(c, d, a, b, x10, 15, sineTable[54]);
      b = roundI(b, c, d, a, x1, 21, sineTable[55]);
      a = roundI(a, b, c, d, x8, 6, sineTable[56]);
      d = roundI(d, a, b, c, x15, 10, sineTable[57]);
      c = roundI(c, d, a, b, x6, 15, sineTable[58]);
      b = roundI(b, c, d, a, x13, 21, sineTable[59]);
      a = roundI(a, b, c, d, x4, 6, sineTable[60]);
      d = roundI(d, a, b, c, x11, 10, sineTable[61]);
      c = roundI(c, d, a, b, x2, 15, sineTable[62]);
      b = roundI(b, c, d, a, x9, 21, sineTable[63]);

      hashWords[0] = (hashWords[0] + a) | 0;
      hashWords[1] = (hashWords[1] + b) | 0;
      hashWords[2] = (hashWords[2] + c) | 0;
      hashWords[3] = (hashWords[3] + d) | 0;
    },

    _doFinalize(): WordArray {
      const data = this._data;
      const dataWords = data.words;
      const nBitsTotal = this._nDataBytes * BITS_PER_BYTE;
      const nBitsLeft = data.sigBytes * BITS_PER_BYTE;

      dataWords[nBitsLeft >>> 5] |= FINALIZE_PADDING << (24 - (nBitsLeft % 32));

      const nBitsTotalHigh = Math.floor(nBitsTotal / MAX_32BIT);
      const nBitsTotalLow = nBitsTotal;

      dataWords[15 + (((nBitsLeft + 64) >>> 9) << 4)] = swapEndian(nBitsTotalHigh);
      dataWords[14 + (((nBitsLeft + 64) >>> 9) << 4)] = swapEndian(nBitsTotalLow);

      data.sigBytes = 4 * (dataWords.length + 1);
      this._process();

      const hash = this._hash;
      const hashWords = hash.words;

      for (let i = 0; i < 4; i++) {
        hashWords[i] = swapEndian(hashWords[i]);
      }

      return hash;
    },

    clone(): MD5Hasher {
      const clone = Hasher.clone.call(this);
      clone._hash = this._hash.clone();
      return clone;
    }
  });

  algo.MD5 = Hasher._createHelper(MD5);
  cryptoLib.HmacMD5 = Hasher._createHmacHelper(MD5);

  return cryptoLib.MD5;
}