interface WordArray {
  words: number[];
  sigBytes: number;
  clamp(): void;
}

interface CryptoLib {
  lib: {
    WordArray: {
      create(words: number[], sigBytes: number): WordArray;
    };
  };
  enc: {
    Base64?: Base64Encoder;
  };
}

interface Base64Encoder {
  stringify(wordArray: WordArray): string;
  parse(base64String: string): WordArray;
  _map: string;
  _reverseMap?: number[];
}

const BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const BITS_PER_BYTE = 8;
const BITS_PER_CHAR = 6;
const BYTES_PER_GROUP = 3;
const CHARS_PER_GROUP = 4;
const BYTE_MASK = 255;
const CHAR_MASK = 63;
const PADDING_CHAR_INDEX = 64;

export function createBase64Encoder(cryptoLib: CryptoLib): Base64Encoder {
  const WordArrayConstructor = cryptoLib.lib.WordArray;

  const base64Encoder: Base64Encoder = {
    stringify(wordArray: WordArray): string {
      const words = wordArray.words;
      const sigBytes = wordArray.sigBytes;
      const map = this._map;

      wordArray.clamp();

      const result: string[] = [];

      for (let byteIndex = 0; byteIndex < sigBytes; byteIndex += BYTES_PER_GROUP) {
        const byte1 = (words[byteIndex >>> 2] >>> (24 - (byteIndex % 4) * BITS_PER_BYTE)) & BYTE_MASK;
        const byte2 = (words[(byteIndex + 1) >>> 2] >>> (24 - ((byteIndex + 1) % 4) * BITS_PER_BYTE)) & BYTE_MASK;
        const byte3 = (words[(byteIndex + 2) >>> 2] >>> (24 - ((byteIndex + 2) % 4) * BITS_PER_BYTE)) & BYTE_MASK;
        
        const triplet = (byte1 << 16) | (byte2 << 8) | byte3;

        for (let charIndex = 0; charIndex < CHARS_PER_GROUP && byteIndex + 0.75 * charIndex < sigBytes; charIndex++) {
          const charCode = (triplet >>> (BITS_PER_CHAR * (3 - charIndex))) & CHAR_MASK;
          result.push(map.charAt(charCode));
        }
      }

      const paddingChar = map.charAt(PADDING_CHAR_INDEX);
      if (paddingChar) {
        while (result.length % CHARS_PER_GROUP) {
          result.push(paddingChar);
        }
      }

      return result.join("");
    },

    parse(base64String: string): WordArray {
      let length = base64String.length;
      const map = this._map;
      let reverseMap = this._reverseMap;

      if (!reverseMap) {
        reverseMap = this._reverseMap = [];
        for (let index = 0; index < map.length; index++) {
          reverseMap[map.charCodeAt(index)] = index;
        }
      }

      const paddingChar = map.charAt(PADDING_CHAR_INDEX);
      if (paddingChar) {
        const paddingIndex = base64String.indexOf(paddingChar);
        if (paddingIndex !== -1) {
          length = paddingIndex;
        }
      }

      return parseBase64String(base64String, length, reverseMap, WordArrayConstructor);
    },

    _map: BASE64_MAP
  };

  cryptoLib.enc.Base64 = base64Encoder;
  return base64Encoder;
}

function parseBase64String(
  base64String: string,
  length: number,
  reverseMap: number[],
  WordArrayConstructor: { create(words: number[], sigBytes: number): WordArray }
): WordArray {
  const words: number[] = [];
  let byteIndex = 0;

  for (let charIndex = 0; charIndex < length; charIndex++) {
    if (charIndex % CHARS_PER_GROUP) {
      const bits1 = reverseMap[base64String.charCodeAt(charIndex - 1)] << ((charIndex % CHARS_PER_GROUP) * 2);
      const bits2 = reverseMap[base64String.charCodeAt(charIndex)] >>> (BITS_PER_CHAR - (charIndex % CHARS_PER_GROUP) * 2);
      
      words[byteIndex >>> 2] |= (bits1 | bits2) << (24 - (byteIndex % 4) * BITS_PER_BYTE);
      byteIndex++;
    }
  }

  return WordArrayConstructor.create(words, byteIndex);
}