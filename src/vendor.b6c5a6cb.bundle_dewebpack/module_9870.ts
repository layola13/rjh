interface BlockCipher {
  blockSize: number;
  encryptBlock(data: number[], offset: number): void;
}

interface BlockCipherMode {
  _cipher: BlockCipher;
  _iv?: number[];
  _keystream?: number[];
  processBlock(data: number[], offset: number): void;
}

interface BlockCipherModeStatic {
  extend(overrides?: Partial<BlockCipherMode>): BlockCipherModeStatic;
  Encryptor?: BlockCipherModeStatic;
  Decryptor?: BlockCipherModeStatic;
}

interface CryptoLib {
  lib: {
    BlockCipherMode: BlockCipherModeStatic;
  };
  mode: {
    OFB?: BlockCipherModeStatic;
  };
}

export function createOFBMode(crypto: CryptoLib): BlockCipherModeStatic {
  const baseMode = crypto.lib.BlockCipherMode.extend();
  
  const encryptor = baseMode.extend({
    processBlock(data: number[], offset: number): void {
      const cipher = this._cipher;
      const blockSize = cipher.blockSize;
      const iv = this._iv;
      let keystream = this._keystream;

      if (iv) {
        keystream = this._keystream = iv.slice(0);
        this._iv = undefined;
      }

      cipher.encryptBlock(keystream!, 0);

      for (let i = 0; i < blockSize; i++) {
        data[offset + i] ^= keystream![i];
      }
    }
  });

  baseMode.Encryptor = encryptor;
  baseMode.Decryptor = encryptor;

  crypto.mode.OFB = baseMode;

  return baseMode;
}