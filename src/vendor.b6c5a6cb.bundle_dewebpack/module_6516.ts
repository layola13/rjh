interface WordArray {
  words: number[];
  sigBytes: number;
  clone(): WordArray;
  clamp(): void;
  concat(wordArray: WordArray): WordArray;
}

interface HasherStatic {
  init: new () => Hasher;
  blockSize: number;
}

interface Hasher {
  blockSize: number;
  reset(): void;
  update(messageUpdate: WordArray | string): Hasher;
  finalize(messageUpdate?: WordArray | string): WordArray;
}

interface Encoder {
  parse(str: string): WordArray;
}

interface CryptoLib {
  lib: {
    Base: {
      extend(overrides: Record<string, unknown>): unknown;
    };
  };
  enc: {
    Utf8: Encoder;
  };
  algo: {
    HMAC?: HMACStatic;
  };
}

interface HMACStatic {
  new (): HMAC;
}

interface HMAC {
  _hasher: Hasher;
  _oKey: WordArray;
  _iKey: WordArray;
  init(hasher: HasherStatic, message: WordArray | string): void;
  reset(): void;
  update(messageUpdate: WordArray | string): HMAC;
  finalize(messageUpdate?: WordArray | string): WordArray;
}

const OPAD_CONSTANT = 0x5c5c5c5c;
const IPAD_CONSTANT = 0x36363636;
const BLOCK_SIZE_MULTIPLIER = 4;

export function initializeHMAC(cryptoJS: CryptoLib): CryptoLib {
  const baseExtend = cryptoJS.lib.Base;
  const utf8Encoder = cryptoJS.enc.Utf8;

  cryptoJS.algo.HMAC = baseExtend.extend({
    init(hasher: HasherStatic, message: WordArray | string): void {
      this._hasher = new hasher.init();
      
      let parsedMessage: WordArray = typeof message === 'string' 
        ? utf8Encoder.parse(message) 
        : message;

      const blockSize = this._hasher.blockSize;
      const blockSizeBytes = BLOCK_SIZE_MULTIPLIER * blockSize;

      if (parsedMessage.sigBytes > blockSizeBytes) {
        parsedMessage = this._hasher.finalize(parsedMessage);
      }
      
      parsedMessage.clamp();

      const outerKey = this._oKey = parsedMessage.clone();
      const innerKey = this._iKey = parsedMessage.clone();
      const outerKeyWords = outerKey.words;
      const innerKeyWords = innerKey.words;

      for (let i = 0; i < blockSize; i++) {
        outerKeyWords[i] ^= OPAD_CONSTANT;
        innerKeyWords[i] ^= IPAD_CONSTANT;
      }

      outerKey.sigBytes = innerKey.sigBytes = blockSizeBytes;
      this.reset();
    },

    reset(): void {
      const hasher = this._hasher;
      hasher.reset();
      hasher.update(this._iKey);
    },

    update(messageUpdate: WordArray | string): HMAC {
      this._hasher.update(messageUpdate);
      return this;
    },

    finalize(messageUpdate?: WordArray | string): WordArray {
      const hasher = this._hasher;
      const innerHash = hasher.finalize(messageUpdate);
      
      hasher.reset();
      return hasher.finalize(this._oKey.clone().concat(innerHash));
    }
  }) as unknown as HMACStatic;

  return cryptoJS;
}