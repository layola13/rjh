/**
 * RIPEMD-160 cryptographic hash function implementation
 * Based on the 2012 implementation by Cédric Mesnil
 */

interface WordArray {
  words: number[];
  sigBytes: number;
  create(values: number[]): WordArray;
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
  extend(config: Partial<RIPEMD160>): typeof RIPEMD160;
  _createHelper(hasher: typeof RIPEMD160): (message: any, key?: any) => WordArray;
  _createHmacHelper(hasher: typeof RIPEMD160): (message: any, key?: any) => WordArray;
}

interface CryptoLib {
  WordArray: WordArray;
  Hasher: Hasher;
}

interface CryptoAlgo {
  RIPEMD160?: typeof RIPEMD160;
}

interface CryptoJS {
  lib: CryptoLib;
  algo: CryptoAlgo;
  RIPEMD160?: WordArray;
  HmacRIPEMD160?: (message: any, key?: any) => WordArray;
}

const RIPEMD160_CONSTANTS = {
  INITIAL_HASH: [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
  LEFT_CONSTANTS: [0, 1518500249, 1859775393, 2400959708, 2840853838],
  RIGHT_CONSTANTS: [1352829926, 1548603684, 1836072691, 2053994217, 0],
  BYTE_SWAP_MASK_1: 16711935,
  BYTE_SWAP_MASK_2: 4278255360,
  PADDING_BIT: 128,
  ROTATION_AMOUNT: 10,
  BLOCK_SIZE: 16,
  ROUNDS: 80
};

const MESSAGE_SCHEDULE_LEFT = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
];

const MESSAGE_SCHEDULE_RIGHT = [
  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
];

const SHIFT_AMOUNTS_LEFT = [
  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
];

const SHIFT_AMOUNTS_RIGHT = [
  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
];

function bitwiseXor(x: number, y: number, z: number): number {
  return x ^ y ^ z;
}

function bitwiseChoice(x: number, y: number, z: number): number {
  return (x & y) | (~x & z);
}

function bitwiseOr(x: number, y: number, z: number): number {
  return (x | ~y) ^ z;
}

function bitwiseMajority(x: number, y: number, z: number): number {
  return (x & z) | (y & ~z);
}

function bitwiseParity(x: number, y: number, z: number): number {
  return x ^ (y | ~z);
}

function rotateLeft(value: number, shift: number): number {
  return (value << shift) | (value >>> (32 - shift));
}

function swapEndianness(value: number): number {
  return (
    (RIPEMD160_CONSTANTS.BYTE_SWAP_MASK_1 & ((value << 8) | (value >>> 24))) |
    (RIPEMD160_CONSTANTS.BYTE_SWAP_MASK_2 & ((value << 24) | (value >>> 8)))
  );
}

class RIPEMD160 implements Hasher {
  _hash!: WordArray;
  _data!: WordArray;
  _nDataBytes!: number;

  private static cryptoJS: CryptoJS;
  private static hasherBase: Hasher;
  private static wordArrayConstructor: WordArray;

  static initialize(cryptoJS: CryptoJS): void {
    RIPEMD160.cryptoJS = cryptoJS;
    RIPEMD160.hasherBase = cryptoJS.lib.Hasher;
    RIPEMD160.wordArrayConstructor = cryptoJS.lib.WordArray;
  }

  _doReset(): void {
    this._hash = RIPEMD160.wordArrayConstructor.create([...RIPEMD160_CONSTANTS.INITIAL_HASH]);
  }

  _doProcessBlock(words: number[], offset: number): void {
    for (let i = 0; i < RIPEMD160_CONSTANTS.BLOCK_SIZE; i++) {
      const index = offset + i;
      const word = words[index];
      words[index] = swapEndianness(word);
    }

    const hashWords = this._hash.words;
    const leftConstants = RIPEMD160_CONSTANTS.LEFT_CONSTANTS;
    const rightConstants = RIPEMD160_CONSTANTS.RIGHT_CONSTANTS;

    let leftA = hashWords[0];
    let leftB = hashWords[1];
    let leftC = hashWords[2];
    let leftD = hashWords[3];
    let leftE = hashWords[4];

    let rightA = hashWords[0];
    let rightB = hashWords[1];
    let rightC = hashWords[2];
    let rightD = hashWords[3];
    let rightE = hashWords[4];

    for (let round = 0; round < RIPEMD160_CONSTANTS.ROUNDS; round++) {
      let temp = (leftA + words[offset + MESSAGE_SCHEDULE_LEFT[round]]) | 0;

      if (round < 16) {
        temp += bitwiseXor(leftB, leftC, leftD) + leftConstants[0];
      } else if (round < 32) {
        temp += bitwiseChoice(leftB, leftC, leftD) + leftConstants[1];
      } else if (round < 48) {
        temp += bitwiseOr(leftB, leftC, leftD) + leftConstants[2];
      } else if (round < 64) {
        temp += bitwiseMajority(leftB, leftC, leftD) + leftConstants[3];
      } else {
        temp += bitwiseParity(leftB, leftC, leftD) + leftConstants[4];
      }

      temp = rotateLeft(temp | 0, SHIFT_AMOUNTS_LEFT[round]);
      temp = (temp + leftE) | 0;

      leftA = leftE;
      leftE = leftD;
      leftD = rotateLeft(leftC, RIPEMD160_CONSTANTS.ROTATION_AMOUNT);
      leftC = leftB;
      leftB = temp;

      temp = (rightA + words[offset + MESSAGE_SCHEDULE_RIGHT[round]]) | 0;

      if (round < 16) {
        temp += bitwiseParity(rightB, rightC, rightD) + rightConstants[0];
      } else if (round < 32) {
        temp += bitwiseMajority(rightB, rightC, rightD) + rightConstants[1];
      } else if (round < 48) {
        temp += bitwiseOr(rightB, rightC, rightD) + rightConstants[2];
      } else if (round < 64) {
        temp += bitwiseChoice(rightB, rightC, rightD) + rightConstants[3];
      } else {
        temp += bitwiseXor(rightB, rightC, rightD) + rightConstants[4];
      }

      temp = rotateLeft(temp | 0, SHIFT_AMOUNTS_RIGHT[round]);
      temp = (temp + rightE) | 0;

      rightA = rightE;
      rightE = rightD;
      rightD = rotateLeft(rightC, RIPEMD160_CONSTANTS.ROTATION_AMOUNT);
      rightC = rightB;
      rightB = temp;
    }

    const temp = (hashWords[1] + leftC + rightD) | 0;
    hashWords[1] = (hashWords[2] + leftD + rightE) | 0;
    hashWords[2] = (hashWords[3] + leftE + rightA) | 0;
    hashWords[3] = (hashWords[4] + leftA + rightB) | 0;
    hashWords[4] = (hashWords[0] + leftB + rightC) | 0;
    hashWords[0] = temp;
  }

  _doFinalize(): WordArray {
    const data = this._data;
    const dataWords = data.words;
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = data.sigBytes * 8;

    dataWords[nBitsLeft >>> 5] |= RIPEMD160_CONSTANTS.PADDING_BIT << (24 - (nBitsLeft % 32));
    dataWords[14 + (((nBitsLeft + 64) >>> 9) << 4)] = swapEndianness(nBitsTotal);
    data.sigBytes = (dataWords.length + 1) * 4;

    this._process();

    const hash = this._hash;
    const hashWords = hash.words;

    for (let i = 0; i < 5; i++) {
      hashWords[i] = swapEndianness(hashWords[i]);
    }

    return hash;
  }

  _process(): void {
    // Implementation provided by parent Hasher class
  }

  clone(): RIPEMD160 {
    const cloned = RIPEMD160.hasherBase.clone.call(this) as RIPEMD160;
    cloned._hash = this._hash.clone();
    return cloned;
  }

  static extend(config: Partial<RIPEMD160>): typeof RIPEMD160 {
    return RIPEMD160.hasherBase.extend(config);
  }
}

export function initializeRIPEMD160(cryptoJS: CryptoJS): WordArray {
  RIPEMD160.initialize(cryptoJS);

  const hasher = cryptoJS.lib.Hasher;
  const ripemd160Class = hasher.extend({
    _doReset: RIPEMD160.prototype._doReset,
    _doProcessBlock: RIPEMD160.prototype._doProcessBlock,
    _doFinalize: RIPEMD160.prototype._doFinalize,
    clone: RIPEMD160.prototype.clone
  });

  cryptoJS.algo.RIPEMD160 = ripemd160Class;
  cryptoJS.RIPEMD160 = hasher._createHelper(ripemd160Class);
  cryptoJS.HmacRIPEMD160 = hasher._createHmacHelper(ripemd160Class);

  return cryptoJS.RIPEMD160;
}

export { RIPEMD160 };