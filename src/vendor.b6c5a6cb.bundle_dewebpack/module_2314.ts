interface BlockCipherMode {
  extend(overrides?: any): BlockCipherMode;
}

interface Cipher {
  encryptBlock(words: number[], offset: number): void;
  decryptBlock(words: number[], offset: number): void;
}

interface ModeInstance {
  _cipher: Cipher;
  processBlock(words: number[], offset: number): void;
}

interface ECBMode extends BlockCipherMode {
  Encryptor: BlockCipherMode;
  Decryptor: BlockCipherMode;
}

interface CryptoLib {
  lib: {
    BlockCipherMode: BlockCipherMode;
  };
  mode: {
    ECB?: ECBMode;
  };
}

export function createECBMode(crypto: CryptoLib): ECBMode {
  const baseMode = crypto.lib.BlockCipherMode.extend();
  
  baseMode.Encryptor = baseMode.extend({
    processBlock(this: ModeInstance, words: number[], offset: number): void {
      this._cipher.encryptBlock(words, offset);
    }
  });
  
  baseMode.Decryptor = baseMode.extend({
    processBlock(this: ModeInstance, words: number[], offset: number): void {
      this._cipher.decryptBlock(words, offset);
    }
  });
  
  crypto.mode.ECB = baseMode as ECBMode;
  
  return crypto.mode.ECB;
}