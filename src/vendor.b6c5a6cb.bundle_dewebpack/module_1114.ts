interface WordArray {
  words: number[];
  sigBytes: number;
}

interface WordArrayStatic {
  create(words: number[], sigBytes: number): WordArray;
}

interface Utf16Encoder {
  stringify(wordArray: WordArray): string;
  parse(str: string): WordArray;
}

interface EncodingNamespace {
  Utf16: Utf16Encoder;
  Utf16BE: Utf16Encoder;
  Utf16LE: Utf16Encoder;
}

interface CryptoLib {
  lib: {
    WordArray: WordArrayStatic;
  };
  enc: EncodingNamespace;
}

function swapEndianness(value: number): number {
  return ((value << 8) & 0xff00ff00) | ((value >>> 8) & 0x00ff00ff);
}

export function createUtf16Encoding(crypto: CryptoLib): Utf16Encoder {
  const WordArray = crypto.lib.WordArray;
  const encodings = crypto.enc;

  const utf16BE: Utf16Encoder = {
    stringify(wordArray: WordArray): string {
      const words = wordArray.words;
      const sigBytes = wordArray.sigBytes;
      const chars: string[] = [];

      for (let i = 0; i < sigBytes; i += 2) {
        const wordIndex = i >>> 2;
        const shift = 16 - (i % 4) * 8;
        const charCode = (words[wordIndex] >>> shift) & 0xffff;
        chars.push(String.fromCharCode(charCode));
      }

      return chars.join('');
    },

    parse(str: string): WordArray {
      const length = str.length;
      const words: number[] = [];

      for (let i = 0; i < length; i++) {
        const wordIndex = i >>> 1;
        const shift = 16 - (i % 2) * 16;
        words[wordIndex] |= str.charCodeAt(i) << shift;
      }

      return WordArray.create(words, 2 * length);
    }
  };

  const utf16LE: Utf16Encoder = {
    stringify(wordArray: WordArray): string {
      const words = wordArray.words;
      const sigBytes = wordArray.sigBytes;
      const chars: string[] = [];

      for (let i = 0; i < sigBytes; i += 2) {
        const wordIndex = i >>> 2;
        const shift = 16 - (i % 4) * 8;
        const charCode = swapEndianness((words[wordIndex] >>> shift) & 0xffff);
        chars.push(String.fromCharCode(charCode));
      }

      return chars.join('');
    },

    parse(str: string): WordArray {
      const length = str.length;
      const words: number[] = [];

      for (let i = 0; i < length; i++) {
        const wordIndex = i >>> 1;
        const shift = 16 - (i % 2) * 16;
        words[wordIndex] |= swapEndianness(str.charCodeAt(i) << shift);
      }

      return WordArray.create(words, 2 * length);
    }
  };

  encodings.Utf16 = utf16BE;
  encodings.Utf16BE = utf16BE;
  encodings.Utf16LE = utf16LE;

  return encodings.Utf16;
}