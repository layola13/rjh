interface WordArray {
  words: number[];
  sigBytes: number;
  concat(wordArray: WordArray): WordArray;
}

interface Hasher {
  create(): HasherInstance;
}

interface HasherInstance {
  update(message: WordArray | string): HasherInstance;
  finalize(message?: WordArray | string): WordArray;
  reset(): void;
}

interface EvpKDFConfig {
  keySize: number;
  hasher: Hasher;
  iterations: number;
}

interface BaseClass {
  extend(overrides: Partial<any>): any;
}

interface AlgoNamespace {
  MD5: Hasher;
  EvpKDF?: EvpKDFClass;
}

interface LibNamespace {
  Base: BaseClass;
  WordArray: {
    create(): WordArray;
  };
}

interface CryptoJSNamespace {
  lib: LibNamespace;
  algo: AlgoNamespace;
  EvpKDF?: (password: WordArray | string, salt: WordArray | string, config?: Partial<EvpKDFConfig>) => WordArray;
}

interface EvpKDFClass {
  create(config?: Partial<EvpKDFConfig>): EvpKDFInstance;
}

interface EvpKDFInstance {
  cfg: EvpKDFConfig;
  init(config?: Partial<EvpKDFConfig>): void;
  compute(password: WordArray | string, salt: WordArray | string): WordArray;
}

export function initializeEvpKDF(cryptoJS: CryptoJSNamespace): typeof EvpKDF {
  const base = cryptoJS.lib.Base;
  const wordArrayFactory = cryptoJS.lib.WordArray;
  const md5Hasher = cryptoJS.algo.MD5;

  const defaultKeySize = 4;
  const defaultIterations = 1;

  const EvpKDFAlgorithm = base.extend({
    cfg: base.extend({
      keySize: defaultKeySize,
      hasher: md5Hasher,
      iterations: defaultIterations
    }),

    init(config?: Partial<EvpKDFConfig>): void {
      this.cfg = this.cfg.extend(config);
    },

    compute(password: WordArray | string, salt: WordArray | string): WordArray {
      const config = this.cfg as EvpKDFConfig;
      const hasher = config.hasher.create();
      const derivedKey = wordArrayFactory.create();
      const derivedKeyWords = derivedKey.words;
      const keySize = config.keySize;
      const iterations = config.iterations;

      let block: WordArray | undefined;

      while (derivedKeyWords.length < keySize) {
        if (block) {
          hasher.update(block);
        }

        block = hasher.update(password).finalize(salt);
        hasher.reset();

        for (let iteration = 1; iteration < iterations; iteration++) {
          block = hasher.finalize(block);
          hasher.reset();
        }

        derivedKey.concat(block);
      }

      derivedKey.sigBytes = 4 * keySize;
      return derivedKey;
    }
  }) as EvpKDFClass;

  const EvpKDF = (
    password: WordArray | string,
    salt: WordArray | string,
    config?: Partial<EvpKDFConfig>
  ): WordArray => {
    return EvpKDFAlgorithm.create(config).compute(password, salt);
  };

  cryptoJS.algo.EvpKDF = EvpKDFAlgorithm;
  cryptoJS.EvpKDF = EvpKDF;

  return EvpKDF;
}

export default initializeEvpKDF;