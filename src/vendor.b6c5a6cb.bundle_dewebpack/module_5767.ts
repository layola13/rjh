interface WordArray {
  words: number[];
  sigBytes: number;
  concat(wordArray: WordArray): this;
  create(words?: number[]): WordArray;
}

interface HasherStatic {
  create(...args: unknown[]): Hasher;
}

interface Hasher {
  update(messageUpdate: WordArray | string): this;
  finalize(messageUpdate?: WordArray | string): WordArray;
  reset(): this;
}

interface HMACStatic {
  create(hasher: HasherStatic, key: WordArray | string): Hasher;
}

interface PBKDF2Config {
  keySize?: number;
  hasher?: HasherStatic;
  iterations?: number;
}

interface PBKDF2Instance {
  cfg: Required<PBKDF2Config>;
  init(config: PBKDF2Config): void;
  compute(password: WordArray | string, salt: WordArray | string): WordArray;
}

interface PBKDF2Static {
  create(config?: PBKDF2Config): PBKDF2Instance;
}

interface CryptoJSLib {
  Base: {
    extend(overrides: Record<string, unknown>): any;
  };
  WordArray: {
    create(words?: number[], sigBytes?: number): WordArray;
  };
}

interface CryptoJSAlgo {
  SHA1: HasherStatic;
  HMAC: HMACStatic;
  PBKDF2?: PBKDF2Static & ((password: WordArray | string, salt: WordArray | string, config?: PBKDF2Config) => WordArray);
}

interface CryptoJS {
  lib: CryptoJSLib;
  algo: CryptoJSAlgo;
  PBKDF2?: (password: WordArray | string, salt: WordArray | string, config?: PBKDF2Config) => WordArray;
}

const DEFAULT_KEY_SIZE = 4;
const DEFAULT_ITERATIONS = 1;
const INITIAL_BLOCK_INDEX = 1;
const WORD_SIZE_BYTES = 4;

export function initializePBKDF2(cryptoJS: CryptoJS): ((password: WordArray | string, salt: WordArray | string, config?: PBKDF2Config) => WordArray) {
  const Base = cryptoJS.lib.Base;
  const WordArray = cryptoJS.lib.WordArray;
  const SHA1 = cryptoJS.algo.SHA1;
  const HMAC = cryptoJS.algo.HMAC;

  const PBKDF2: PBKDF2Static = Base.extend({
    cfg: Base.extend({
      keySize: DEFAULT_KEY_SIZE,
      hasher: SHA1,
      iterations: DEFAULT_ITERATIONS
    }),

    init(config: PBKDF2Config): void {
      this.cfg = this.cfg.extend(config);
    },

    compute(password: WordArray | string, salt: WordArray | string): WordArray {
      const config = this.cfg;
      const hmac = HMAC.create(config.hasher, password);
      const derivedKey = WordArray.create();
      const blockIndex = WordArray.create([INITIAL_BLOCK_INDEX]);
      const derivedKeyWords = derivedKey.words;
      const blockIndexWords = blockIndex.words;
      const keySize = config.keySize;
      const iterations = config.iterations;

      while (derivedKeyWords.length < keySize) {
        const block = hmac.update(salt).finalize(blockIndex);
        hmac.reset();

        const blockWords = block.words;
        const blockWordCount = blockWords.length;
        let intermediateBlock = block;

        for (let iteration = 1; iteration < iterations; iteration++) {
          intermediateBlock = hmac.finalize(intermediateBlock);
          hmac.reset();

          const intermediateWords = intermediateBlock.words;
          for (let wordIndex = 0; wordIndex < blockWordCount; wordIndex++) {
            blockWords[wordIndex] ^= intermediateWords[wordIndex];
          }
        }

        derivedKey.concat(block);
        blockIndexWords[0]++;
      }

      derivedKey.sigBytes = WORD_SIZE_BYTES * keySize;
      return derivedKey;
    }
  }) as PBKDF2Static;

  cryptoJS.algo.PBKDF2 = PBKDF2;

  const pbkdf2Function = (password: WordArray | string, salt: WordArray | string, config?: PBKDF2Config): WordArray => {
    return PBKDF2.create(config).compute(password, salt);
  };

  cryptoJS.PBKDF2 = pbkdf2Function;

  return pbkdf2Function;
}