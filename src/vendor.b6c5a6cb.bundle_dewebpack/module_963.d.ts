/**
 * SHA1 Cryptographic Hash Algorithm Implementation
 * Implements the SHA-1 hashing algorithm as defined in FIPS PUB 180-1
 */

/** Initial hash values for SHA-1 algorithm (first 32 bits of fractional parts of square roots) */
const INITIAL_HASH_VALUES = [
  0x67452301, // 1732584193
  0xEFCDAB89, // 4023233417
  0x98BADCFE, // 2562383102
  0x10325476, // 271733878
  0xC3D2E1F0  // 3285377520
] as const;

/** Round constants for SHA-1 algorithm */
const ROUND_CONSTANTS = {
  ROUND_1: 0x5A827999, // 1518500249 (0 <= t <= 19)
  ROUND_2: 0x6ED9EBA1, // 1859775393 (20 <= t <= 39)
  ROUND_3: 0x8F1BBCDC, // -1894007588 as unsigned (40 <= t <= 59)
  ROUND_4: 0xCA62C1D6  // -899497514 as unsigned (60 <= t <= 79)
} as const;

const BITS_PER_BYTE = 8;
const BLOCK_SIZE_WORDS = 16;
const TOTAL_ROUNDS = 80;
const MAX_32BIT = 0xFFFFFFFF;
const BITS_IN_32BIT = 32;

interface WordArray {
  words: number[];
  sigBytes: number;
  init(words: number[]): WordArray;
  clone(): WordArray;
}

interface Hasher {
  extend(options: HasherExtension): typeof SHA1;
  clone(): Hasher;
  _createHelper(hasher: typeof SHA1): (message: unknown, key?: unknown) => unknown;
  _createHmacHelper(hasher: typeof SHA1): (message: unknown, key?: unknown) => unknown;
}

interface HasherExtension {
  _doReset(): void;
  _doProcessBlock(words: number[], offset: number): void;
  _doFinalize(): WordArray;
  clone(): SHA1;
}

interface CryptoJSLib {
  WordArray: WordArray;
  Hasher: Hasher;
}

interface CryptoJS {
  lib: CryptoJSLib;
  algo: {
    SHA1?: typeof SHA1;
  };
  SHA1?: (message: unknown, key?: unknown) => unknown;
  HmacSHA1?: (message: unknown, key?: unknown) => unknown;
}

/**
 * SHA1 Hasher Class
 * Extends the base Hasher to implement SHA-1 specific logic
 */
class SHA1 {
  private _hash!: WordArray;
  private _data!: WordArray;
  private _nDataBytes!: number;

  /** Message schedule array for 80 rounds */
  private readonly messageSchedule: number[] = [];

  /**
   * Resets the hasher to initial state
   * Initializes the hash buffer with SHA-1 initial values
   */
  _doReset(): void {
    this._hash = new (this.constructor as any).lib.WordArray.init([...INITIAL_HASH_VALUES]);
  }

  /**
   * Processes a single 512-bit block of data
   * @param words - The data words array
   * @param offset - Starting position in the words array
   */
  _doProcessBlock(words: number[], offset: number): void {
    const hashWords = this._hash.words;
    let [a, b, c, d, e] = hashWords;

    // 80 rounds of SHA-1 processing
    for (let round = 0; round < TOTAL_ROUNDS; round++) {
      // Prepare message schedule
      if (round < BLOCK_SIZE_WORDS) {
        this.messageSchedule[round] = words[offset + round] | 0;
      } else {
        // XOR and rotate for rounds 16-79
        const xorResult = 
          this.messageSchedule[round - 3] ^
          this.messageSchedule[round - 8] ^
          this.messageSchedule[round - 14] ^
          this.messageSchedule[round - 16];
        this.messageSchedule[round] = (xorResult << 1) | (xorResult >>> 31);
      }

      // Calculate temporary value: ROTL5(a) + f(b,c,d) + e + K(t) + W(t)
      let temp = this.rotateLeft(a, 5) + e + this.messageSchedule[round];

      // Apply round-specific function and constant
      if (round < 20) {
        // f(b,c,d) = (b AND c) OR ((NOT b) AND d)
        temp += ROUND_CONSTANTS.ROUND_1 + ((b & c) | (~b & d));
      } else if (round < 40) {
        // f(b,c,d) = b XOR c XOR d
        temp += ROUND_CONSTANTS.ROUND_2 + (b ^ c ^ d);
      } else if (round < 60) {
        // f(b,c,d) = (b AND c) OR (b AND d) OR (c AND d)
        temp += ROUND_CONSTANTS.ROUND_3 + ((b & c) | (b & d) | (c & d));
      } else {
        // f(b,c,d) = b XOR c XOR d
        temp += ROUND_CONSTANTS.ROUND_4 + (b ^ c ^ d);
      }

      // Update working variables
      e = d;
      d = c;
      c = this.rotateLeft(b, 30);
      b = a;
      a = temp;
    }

    // Add this chunk's hash to result so far
    hashWords[0] = (hashWords[0] + a) | 0;
    hashWords[1] = (hashWords[1] + b) | 0;
    hashWords[2] = (hashWords[2] + c) | 0;
    hashWords[3] = (hashWords[3] + d) | 0;
    hashWords[4] = (hashWords[4] + e) | 0;
  }

  /**
   * Finalizes the hash computation
   * Adds padding and length information, then processes the final block
   * @returns The final hash as a WordArray
   */
  _doFinalize(): WordArray {
    const data = this._data;
    const dataWords = data.words;
    const nBitsTotal = this._nDataBytes * BITS_PER_BYTE;
    const nBitsLeft = data.sigBytes * BITS_PER_BYTE;

    // Add padding bit (0x80)
    dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - (nBitsLeft % BITS_IN_32BIT));

    // Add length in bits as 64-bit big-endian integer
    const blockIndex = ((nBitsLeft + 64) >>> 9) << 4;
    dataWords[blockIndex + 14] = Math.floor(nBitsTotal / (MAX_32BIT + 1));
    dataWords[blockIndex + 15] = nBitsTotal;

    data.sigBytes = dataWords.length * 4;

    // Process final blocks
    (this as any)._process();

    return this._hash;
  }

  /**
   * Creates a copy of the hasher
   * @returns A cloned SHA1 instance
   */
  clone(): SHA1 {
    const clone = Object.create(Object.getPrototypeOf(this)) as SHA1;
    Object.assign(clone, this);
    clone._hash = this._hash.clone();
    return clone;
  }

  /**
   * Rotates a 32-bit integer left by n bits
   * @param value - The value to rotate
   * @param bits - Number of bits to rotate
   * @returns The rotated value
   */
  private rotateLeft(value: number, bits: number): number {
    return (value << bits) | (value >>> (BITS_IN_32BIT - bits));
  }
}

/**
 * Initializes and exports the SHA1 algorithm to CryptoJS
 * @param cryptoJS - The CryptoJS library instance
 * @returns The SHA1 class
 */
export function initializeSHA1(cryptoJS: CryptoJS): typeof SHA1 {
  const { lib } = cryptoJS;
  const { Hasher } = lib;

  // Extend base Hasher
  const SHA1Extended = Hasher.extend({
    _doReset: SHA1.prototype._doReset,
    _doProcessBlock: SHA1.prototype._doProcessBlock,
    _doFinalize: SHA1.prototype._doFinalize,
    clone: SHA1.prototype.clone
  });

  // Register algorithm
  cryptoJS.algo.SHA1 = SHA1Extended;
  cryptoJS.SHA1 = Hasher._createHelper(SHA1Extended);
  cryptoJS.HmacSHA1 = Hasher._createHmacHelper(SHA1Extended);

  return SHA1Extended;
}

export default SHA1;