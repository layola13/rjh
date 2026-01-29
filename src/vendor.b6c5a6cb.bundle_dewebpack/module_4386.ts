interface WordArray {
  words: number[];
  sigBytes: number;
  clamp(): void;
}

interface PaddingStrategy {
  pad(data: WordArray, blockSize: number): void;
  unpad(data: WordArray): void;
}

interface CryptoModule {
  pad: {
    ZeroPadding?: PaddingStrategy;
  };
}

const ZeroPadding: PaddingStrategy = {
  pad(data: WordArray, blockSize: number): void {
    const blockSizeBytes = 4 * blockSize;
    data.clamp();
    data.sigBytes += blockSizeBytes - (data.sigBytes % blockSizeBytes || blockSizeBytes);
  },

  unpad(data: WordArray): void {
    const words = data.words;
    let lastByteIndex = data.sigBytes - 1;
    
    while (!(words[lastByteIndex >>> 2] >>> (24 - (lastByteIndex % 4) * 8) & 255)) {
      lastByteIndex--;
    }
    
    data.sigBytes = lastByteIndex + 1;
  }
};

export function initializeZeroPadding(cryptoModule: CryptoModule): PaddingStrategy {
  cryptoModule.pad.ZeroPadding = ZeroPadding;
  return cryptoModule.pad.ZeroPadding;
}

export { ZeroPadding };
export default ZeroPadding;