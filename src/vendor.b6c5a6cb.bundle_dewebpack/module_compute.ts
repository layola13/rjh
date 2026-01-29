interface ComputeConfig {
  hasher: {
    create(): Hasher;
  };
  keySize: number;
  iterations: number;
}

interface Hasher {
  update(data: any): Hasher;
  finalize(data: any): WordArray;
  reset(): void;
}

interface WordArray {
  words: number[];
  sigBytes: number;
  concat(wordArray: WordArray): void;
  create?(): WordArray;
}

class WordArrayImpl {
  words: number[] = [];
  sigBytes: number = 0;

  static create(): WordArray {
    return new WordArrayImpl();
  }

  concat(wordArray: WordArray): void {
    this.words.push(...wordArray.words);
  }
}

function computeHash(password: any, salt: any, cfg: ComputeConfig): WordArray {
  const hasher = cfg.hasher.create();
  const derivedKey: WordArray = WordArrayImpl.create();
  const derivedKeyWords = derivedKey.words;
  const keySize = cfg.keySize;
  const iterations = cfg.iterations;

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

export { computeHash, ComputeConfig, Hasher, WordArray };