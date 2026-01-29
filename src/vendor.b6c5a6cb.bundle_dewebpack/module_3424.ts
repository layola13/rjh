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
  _process(): void;
  clone(): Hasher;
  extend(config: HasherConfig): any;
  _createHelper(hasher: any): any;
  _createHmacHelper(hasher: any): any;
}

interface HasherConfig {
  _doReset(): void;
  _doProcessBlock(words: number[], offset: number): void;
  _doFinalize(): WordArray;
  clone(): Hasher;
}

interface CryptoLib {
  lib: {
    WordArray: {
      init(words: number[]): WordArray;
    };
    Hasher: Hasher;
  };
  algo: Record<string, any>;
  SHA256?: any;
  HmacSHA256?: any;
}

const FIRST_EIGHT_PRIMES_SQRT: number[] = [];
const FIRST_SIXTY_FOUR_PRIMES_CBRT: number[] = [];

function isPrime(num: number): boolean {
  const sqrtNum = Math.sqrt(num);
  for (let divisor = 2; divisor <= sqrtNum; divisor++) {
    if (num % divisor === 0) {
      return false;
    }
  }
  return true;
}

function getFractionalBits(value: number): number {
  return ((value - (value | 0)) * 4294967296) | 0;
}

function initializeConstants(): void {
  let primeCandidate = 2;
  let primeCount = 0;
  
  while (primeCount < 64) {
    if (isPrime(primeCandidate)) {
      if (primeCount < 8) {
        FIRST_EIGHT_PRIMES_SQRT[primeCount] = getFractionalBits(
          Math.pow(primeCandidate, 0.5)
        );
      }
      FIRST_SIXTY_FOUR_PRIMES_CBRT[primeCount] = getFractionalBits(
        Math.pow(primeCandidate, 1 / 3)
      );
      primeCount++;
    }
    primeCandidate++;
  }
}

initializeConstants();

const MESSAGE_SCHEDULE: number[] = [];

export function createSHA256(cryptoLib: CryptoLib): any {
  const { lib, algo } = cryptoLib;
  const { WordArray, Hasher } = lib;

  const SHA256 = Hasher.extend({
    _doReset(): void {
      this._hash = WordArray.init(FIRST_EIGHT_PRIMES_SQRT.slice(0));
    },

    _doProcessBlock(words: number[], offset: number): void {
      const hashWords = this._hash.words;
      let a = hashWords[0];
      let b = hashWords[1];
      let c = hashWords[2];
      let d = hashWords[3];
      let e = hashWords[4];
      let f = hashWords[5];
      let g = hashWords[6];
      let h = hashWords[7];

      for (let round = 0; round < 64; round++) {
        if (round < 16) {
          MESSAGE_SCHEDULE[round] = words[offset + round] | 0;
        } else {
          const word15 = MESSAGE_SCHEDULE[round - 15];
          const sigma0 =
            ((word15 << 25) | (word15 >>> 7)) ^
            ((word15 << 14) | (word15 >>> 18)) ^
            (word15 >>> 3);

          const word2 = MESSAGE_SCHEDULE[round - 2];
          const sigma1 =
            ((word2 << 15) | (word2 >>> 17)) ^
            ((word2 << 13) | (word2 >>> 19)) ^
            (word2 >>> 10);

          MESSAGE_SCHEDULE[round] =
            sigma0 + MESSAGE_SCHEDULE[round - 7] + sigma1 + MESSAGE_SCHEDULE[round - 16];
        }

        const maj = (a & b) ^ (a & c) ^ (b & c);
        const sigma0A =
          ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
        const sigma1E =
          ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7) | (e >>> 25));
        const ch = (e & f) ^ (~e & g);
        const temp1 =
          h + sigma1E + ch + FIRST_SIXTY_FOUR_PRIMES_CBRT[round] + MESSAGE_SCHEDULE[round];

        h = g;
        g = f;
        f = e;
        e = (d + temp1) | 0;
        d = c;
        c = b;
        b = a;
        a = (temp1 + (sigma0A + maj)) | 0;
      }

      hashWords[0] = (hashWords[0] + a) | 0;
      hashWords[1] = (hashWords[1] + b) | 0;
      hashWords[2] = (hashWords[2] + c) | 0;
      hashWords[3] = (hashWords[3] + d) | 0;
      hashWords[4] = (hashWords[4] + e) | 0;
      hashWords[5] = (hashWords[5] + f) | 0;
      hashWords[6] = (hashWords[6] + g) | 0;
      hashWords[7] = (hashWords[7] + h) | 0;
    },

    _doFinalize(): WordArray {
      const data = this._data;
      const dataWords = data.words;
      const nBitsTotal = this._nDataBytes * 8;
      const nBitsLeft = data.sigBytes * 8;

      dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - (nBitsLeft % 32));
      dataWords[14 + (((nBitsLeft + 64) >>> 9) << 4)] = Math.floor(nBitsTotal / 4294967296);
      dataWords[15 + (((nBitsLeft + 64) >>> 9) << 4)] = nBitsTotal;
      data.sigBytes = dataWords.length * 4;

      this._process();

      return this._hash;
    },

    clone(): Hasher {
      const cloned = Hasher.clone.call(this);
      cloned._hash = this._hash.clone();
      return cloned;
    },
  });

  algo.SHA256 = SHA256;
  cryptoLib.SHA256 = Hasher._createHelper(SHA256);
  cryptoLib.HmacSHA256 = Hasher._createHmacHelper(SHA256);

  return cryptoLib.SHA256;
}