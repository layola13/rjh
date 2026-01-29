interface WordLike {
  high: number;
  low: number;
  clone(): WordLike;
}

interface BaseConstructor {
  extend(obj: any): any;
  clone?: any;
}

interface WordArrayLike {
  words: number[];
  sigBytes: number;
  create(words: number[], sigBytes: number): WordArrayLike;
}

interface CryptoLib {
  lib: {
    Base: BaseConstructor;
    WordArray: WordArrayLike;
  };
  x64?: X64Namespace;
}

interface X64Namespace {
  Word: X64WordConstructor;
  WordArray: X64WordArrayConstructor;
}

interface X64WordConstructor {
  new (high: number, low: number): X64Word;
}

interface X64Word extends WordLike {
  high: number;
  low: number;
}

interface X64WordArrayConstructor {
  new (words?: WordLike[], sigBytes?: number): X64WordArray;
}

interface X64WordArray {
  words: WordLike[];
  sigBytes: number;
  toX32(): WordArrayLike;
  clone(): X64WordArray;
}

export function initializeX64Module(cryptoLib: CryptoLib): CryptoLib {
  const lib = cryptoLib.lib;
  const Base = lib.Base;
  const WordArray = lib.WordArray;

  const x64: X64Namespace = {} as X64Namespace;

  x64.Word = Base.extend({
    init(high: number, low: number): void {
      this.high = high;
      this.low = low;
    }
  });

  x64.WordArray = Base.extend({
    init(words?: WordLike[], sigBytes?: number): void {
      const initialWords = words ?? [];
      this.words = initialWords;
      this.sigBytes = sigBytes ?? (8 * initialWords.length);
    },

    toX32(): WordArrayLike {
      const words = this.words;
      const wordCount = words.length;
      const result: number[] = [];

      for (let i = 0; i < wordCount; i++) {
        const word = words[i];
        result.push(word.high);
        result.push(word.low);
      }

      return WordArray.create(result, this.sigBytes);
    },

    clone(): X64WordArray {
      const cloned = Base.clone.call(this);
      const clonedWords = this.words.slice(0);
      const wordCount = clonedWords.length;

      for (let i = 0; i < wordCount; i++) {
        clonedWords[i] = clonedWords[i].clone();
      }

      cloned.words = clonedWords;
      return cloned;
    }
  });

  cryptoLib.x64 = x64;
  return cryptoLib;
}