interface WordArray {
  words: number[];
  sigBytes: number;
  init(words: number[]): WordArray;
  clone(): WordArray;
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
  extend(overrides: Partial<Hasher>): typeof Hasher;
  _createHelper(hasher: typeof Hasher): (message: any, key?: any) => WordArray;
  _createHmacHelper(hasher: typeof Hasher): (message: any, key: any) => WordArray;
}

interface CryptoLib {
  WordArray: {
    init(words: number[]): WordArray;
  };
  Hasher: Hasher & {
    extend(overrides: Partial<Hasher>): typeof Hasher;
    _createHelper(hasher: any): (message: any, key?: any) => WordArray;
    _createHmacHelper(hasher: any): (message: any, key: any) => WordArray;
  };
}

interface CryptoJS {
  lib: CryptoLib;
  algo: {
    SHA1?: any;
  };
  SHA1?: any;
  HmacSHA1?: any;
}

const INITIAL_HASH_VALUES = [1732584193, 4023233417, 2562383102, 271733878, 3285377520] as const;

const K_CONSTANTS = {
  ROUND_0_19: 1518500249,
  ROUND_20_39: 1859775393,
  ROUND_40_59: -1894007588,
  ROUND_60_79: -899497514
} as const;

const BITS_PER_BYTE = 8;
const PADDING_BIT = 128;
const BITS_IN_UINT32 = 32;
const MAX_UINT32 = 4294967296;
const BYTES_PER_WORD = 4;

export function createSHA1(cryptoJS: CryptoJS): any {
  const lib = cryptoJS.lib;
  const WordArray = lib.WordArray;
  const Hasher = lib.Hasher;
  const algo = cryptoJS.algo;

  const wordSchedule: number[] = [];

  const SHA1 = Hasher.extend({
    _doReset(): void {
      this._hash = WordArray.init([...INITIAL_HASH_VALUES]);
    },

    _doProcessBlock(words: number[], offset: number): void {
      const hashWords = this._hash.words;
      let a = hashWords[0];
      let b = hashWords[1];
      let c = hashWords[2];
      let d = hashWords[3];
      let e = hashWords[4];

      for (let round = 0; round < 80; round++) {
        if (round < 16) {
          wordSchedule[round] = words[offset + round] | 0;
        } else {
          const xorResult = wordSchedule[round - 3] ^ wordSchedule[round - 8] ^ wordSchedule[round - 14] ^ wordSchedule[round - 16];
          wordSchedule[round] = (xorResult << 1) | (xorResult >>> 31);
        }

        let temp = ((a << 5) | (a >>> 27)) + e + wordSchedule[round];

        if (round < 20) {
          temp += K_CONSTANTS.ROUND_0_19 + ((b & c) | (~b & d));
        } else if (round < 40) {
          temp += K_CONSTANTS.ROUND_20_39 + (b ^ c ^ d);
        } else if (round < 60) {
          temp += K_CONSTANTS.ROUND_40_59 + ((b & c) | (b & d) | (c & d));
        } else {
          temp += K_CONSTANTS.ROUND_60_79 + (b ^ c ^ d);
        }

        e = d;
        d = c;
        c = (b << 30) | (b >>> 2);
        b = a;
        a = temp;
      }

      hashWords[0] = (hashWords[0] + a) | 0;
      hashWords[1] = (hashWords[1] + b) | 0;
      hashWords[2] = (hashWords[2] + c) | 0;
      hashWords[3] = (hashWords[3] + d) | 0;
      hashWords[4] = (hashWords[4] + e) | 0;
    },

    _doFinalize(): WordArray {
      const data = this._data;
      const dataWords = data.words;
      const nBitsTotal = this._nDataBytes * BITS_PER_BYTE;
      const nBitsLeft = data.sigBytes * BITS_PER_BYTE;

      dataWords[nBitsLeft >>> 5] |= PADDING_BIT << (24 - (nBitsLeft % BITS_IN_UINT32));

      const blockCount = ((nBitsLeft + 64) >>> 9) << 4;
      dataWords[blockCount + 14] = Math.floor(nBitsTotal / MAX_UINT32);
      dataWords[blockCount + 15] = nBitsTotal;

      data.sigBytes = dataWords.length * BYTES_PER_WORD;

      this._process();

      return this._hash;
    },

    clone(): Hasher {
      const cloned = Hasher.clone.call(this);
      cloned._hash = this._hash.clone();
      return cloned;
    }
  });

  cryptoJS.SHA1 = Hasher._createHelper(SHA1);
  cryptoJS.HmacSHA1 = Hasher._createHmacHelper(SHA1);

  return cryptoJS.SHA1;
}