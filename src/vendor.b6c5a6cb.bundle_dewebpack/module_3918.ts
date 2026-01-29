interface WordArray {
  words: number[];
  sigBytes: number;
  clamp(): void;
}

interface PaddingStrategy {
  pad(data: WordArray, blockSize: number): void;
  unpad(data: WordArray): void;
}

interface CryptoJSStatic {
  pad: {
    AnsiX923: PaddingStrategy;
    Ansix923: PaddingStrategy;
  };
}

const AnsiX923: PaddingStrategy = {
  pad(data: WordArray, blockSize: number): void {
    const dataBytes = data.sigBytes;
    const blockSizeBytes = 4 * blockSize;
    const paddingLength = blockSizeBytes - (dataBytes % blockSizeBytes);
    const lastByteIndex = dataBytes + paddingLength - 1;

    data.clamp();
    data.words[lastByteIndex >>> 2] |= paddingLength << (24 - (lastByteIndex % 4) * 8);
    data.sigBytes += paddingLength;
  },

  unpad(data: WordArray): void {
    const paddingLength = 255 & data.words[(data.sigBytes - 1) >>> 2];
    data.sigBytes -= paddingLength;
  }
};

export { AnsiX923, AnsiX923 as Ansix923, PaddingStrategy, WordArray };