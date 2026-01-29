interface BlockCipher {
  blockSize: number;
  encryptBlock(block: number[], offset: number): void;
}

interface BlockCipherModeInstance {
  _cipher: BlockCipher;
  _iv?: number[];
  _counter?: number[];
  processBlock(words: number[], offset: number): void;
}

interface BlockCipherModeConstructor {
  extend(overrides?: Partial<BlockCipherModeInstance>): BlockCipherModeConstructor;
  create(cipher: BlockCipher, iv?: number[]): BlockCipherModeInstance;
}

interface CryptoLib {
  lib: {
    BlockCipherMode: BlockCipherModeConstructor;
  };
  mode: {
    CTR?: BlockCipherModeConstructor;
  };
}

/**
 * CTR (Counter) mode implementation for block ciphers.
 * Encrypts by XORing plaintext with encrypted counter values.
 */
export function initializeCTRMode(crypto: CryptoLib): BlockCipherModeConstructor {
  const baseMode = crypto.lib.BlockCipherMode.extend();

  const encryptor = baseMode.extend({
    processBlock(words: number[], offset: number): void {
      const cipher = this._cipher;
      const blockSize = cipher.blockSize;
      let counter = this._counter;

      if (this._iv !== undefined) {
        counter = this._counter = this._iv.slice(0);
        this._iv = undefined;
      }

      const counterCopy = counter!.slice(0);
      cipher.encryptBlock(counterCopy, 0);

      counter![blockSize - 1] = (counter![blockSize - 1] + 1) | 0;

      for (let i = 0; i < blockSize; i++) {
        words[offset + i] ^= counterCopy[i];
      }
    }
  });

  const ctrMode = baseMode;
  (ctrMode as any).Encryptor = encryptor;
  (ctrMode as any).Decryptor = encryptor;

  crypto.mode.CTR = ctrMode;

  return crypto.mode.CTR;
}