interface Word {
  init(high: number, low: number): Word;
}

interface WordArray {
  init(words: Word[]): WordArray;
  sigBytes: number;
}

interface SHA512Algorithm {
  extend(config: Partial<SHA384Algorithm>): SHA384Algorithm;
  _doFinalize(): WordArray;
  _createHelper(algorithm: SHA384Algorithm): (message: string, key?: string) => WordArray;
  _createHmacHelper(algorithm: SHA384Algorithm): (message: string, key: string) => WordArray;
}

interface SHA384Algorithm {
  _hash: WordArray;
  _doReset(): void;
  _doFinalize(): WordArray;
}

interface AlgorithmNamespace {
  SHA512: SHA512Algorithm;
  SHA384?: SHA384Algorithm;
}

interface X64Namespace {
  Word: Word;
  WordArray: WordArray;
}

interface CryptoJSNamespace {
  x64: X64Namespace;
  algo: AlgorithmNamespace;
  SHA384?: WordArray;
  HmacSHA384?: (message: string, key: string) => WordArray;
}

function initializeSHA384(cryptoJS: CryptoJSNamespace): WordArray {
  const x64 = cryptoJS.x64;
  const Word = x64.Word;
  const WordArray = x64.WordArray;
  const algo = cryptoJS.algo;
  const SHA512 = algo.SHA512;

  const SHA384 = SHA512.extend({
    _doReset(): void {
      this._hash = new WordArray.init([
        new Word.init(3418070365, 3238371032),
        new Word.init(1654270250, 914150663),
        new Word.init(2438529370, 812702999),
        new Word.init(355462360, 4144912697),
        new Word.init(1731405415, 4290775857),
        new Word.init(2394180231, 1750603025),
        new Word.init(3675008525, 1694076839),
        new Word.init(1203062813, 3204075428)
      ]);
    },

    _doFinalize(): WordArray {
      const hash = SHA512._doFinalize.call(this);
      hash.sigBytes -= 16;
      return hash;
    }
  });

  algo.SHA384 = SHA384;
  cryptoJS.SHA384 = SHA512._createHelper(SHA384);
  cryptoJS.HmacSHA384 = SHA512._createHmacHelper(SHA384);

  return cryptoJS.SHA384;
}

export { initializeSHA384, CryptoJSNamespace, SHA384Algorithm, WordArray };