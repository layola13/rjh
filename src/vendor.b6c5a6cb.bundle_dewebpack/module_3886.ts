interface WordArray {
  concat(wordArray: WordArray): WordArray;
  sigBytes: number;
}

interface Padding {
  pad(data: WordArray, blockSize: number): void;
  unpad(data: WordArray): void;
}

interface CryptoLib {
  WordArray: {
    create(words: number[], sigBytes: number): WordArray;
  };
}

interface CryptoJS {
  lib: CryptoLib;
  pad: {
    ZeroPadding: Padding;
    Iso97971?: Padding;
  };
}

const ISO_97971_PADDING_BYTE = 2147483648;
const PADDING_BYTE_LENGTH = 1;

const Iso97971Padding: Padding = {
  /**
   * Pads the data block using ISO/IEC 9797-1 padding scheme.
   * Appends a single bit '1' followed by zero padding.
   */
  pad(data: WordArray, blockSize: number): void {
    const cryptoJS = (globalThis as unknown as { CryptoJS?: CryptoJS }).CryptoJS;
    if (!cryptoJS) {
      throw new Error('CryptoJS library not found');
    }

    const paddingByte = cryptoJS.lib.WordArray.create(
      [ISO_97971_PADDING_BYTE],
      PADDING_BYTE_LENGTH
    );
    data.concat(paddingByte);
    cryptoJS.pad.ZeroPadding.pad(data, blockSize);
  },

  /**
   * Removes ISO/IEC 9797-1 padding from the data block.
   */
  unpad(data: WordArray): void {
    const cryptoJS = (globalThis as unknown as { CryptoJS?: CryptoJS }).CryptoJS;
    if (!cryptoJS) {
      throw new Error('CryptoJS library not found');
    }

    cryptoJS.pad.ZeroPadding.unpad(data);
    data.sigBytes--;
  }
};

export default Iso97971Padding;