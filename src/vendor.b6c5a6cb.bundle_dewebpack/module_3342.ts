interface WordArray {
  init(words: number[]): WordArray;
  sigBytes: number;
}

interface Hasher {
  _doFinalize(): WordArray;
  _createHelper(hasher: any): any;
  _createHmacHelper(hasher: any): any;
  extend(config: HasherConfig): any;
}

interface HasherConfig {
  _doReset(): void;
  _doFinalize(): WordArray;
}

interface CryptoLib {
  WordArray: {
    init(words: number[]): WordArray;
  };
}

interface AlgoNamespace {
  SHA256: Hasher;
  SHA224?: any;
}

interface CryptoJS {
  lib: CryptoLib;
  algo: AlgoNamespace;
  SHA224?: any;
  HmacSHA224?: any;
}

export function createSHA224(cryptoJS: CryptoJS): any {
  const WordArray = cryptoJS.lib.WordArray;
  const algo = cryptoJS.algo;
  const SHA256 = algo.SHA256;

  const SHA224 = SHA256.extend({
    _doReset(): void {
      this._hash = WordArray.init([
        3238371032,
        914150663,
        812702999,
        4144912697,
        4290775857,
        1750603025,
        1694076839,
        3204075428
      ]);
    },

    _doFinalize(): WordArray {
      const hash = SHA256._doFinalize.call(this);
      hash.sigBytes -= 4;
      return hash;
    }
  });

  cryptoJS.SHA224 = SHA256._createHelper(SHA224);
  cryptoJS.HmacSHA224 = SHA256._createHmacHelper(SHA224);

  return cryptoJS.SHA224;
}