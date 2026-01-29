interface WordArray {
  words: number[];
  sigBytes: number;
  concat(wordArray: WordArray): WordArray;
}

interface WordArrayStatic {
  random(nBytes: number): WordArray;
  create(words: number[], sigBytes: number): WordArray;
}

interface CryptoLib {
  WordArray: WordArrayStatic;
}

interface CryptoJS {
  lib: CryptoLib;
  pad: {
    Iso10126?: Iso10126Padding;
    [key: string]: unknown;
  };
}

interface Iso10126Padding {
  pad(data: WordArray, blockSize: number): void;
  unpad(data: WordArray): void;
}

/**
 * ISO 10126 padding strategy implementation.
 * Pads data with random bytes and appends the padding length as the last byte.
 */
export function createIso10126Padding(crypto: CryptoJS): Iso10126Padding {
  const BLOCK_SIZE_MULTIPLIER = 4;
  const BYTE_SHIFT = 24;
  const BYTE_MASK = 0xff;

  const iso10126: Iso10126Padding = {
    /**
     * Pads the data to a multiple of blockSize.
     * @param data - The word array to pad
     * @param blockSize - The block size in words
     */
    pad(data: WordArray, blockSize: number): void {
      const blockSizeBytes = BLOCK_SIZE_MULTIPLIER * blockSize;
      const paddingLength = blockSizeBytes - (data.sigBytes % blockSizeBytes);

      data
        .concat(crypto.lib.WordArray.random(paddingLength - 1))
        .concat(crypto.lib.WordArray.create([paddingLength << BYTE_SHIFT], 1));
    },

    /**
     * Removes ISO 10126 padding from the data.
     * @param data - The padded word array
     */
    unpad(data: WordArray): void {
      const lastByteIndex = (data.sigBytes - 1) >>> 2;
      const paddingLength = BYTE_MASK & data.words[lastByteIndex];
      data.sigBytes -= paddingLength;
    }
  };

  crypto.pad.Iso10126 = iso10126;
  return iso10126;
}