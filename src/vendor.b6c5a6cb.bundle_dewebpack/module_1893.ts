import { BlockCipherMode, BlockCipher, WordArray } from './crypto-types';

interface CFBMode extends BlockCipherMode {
  Encryptor: CFBEncryptor;
  Decryptor: CFBDecryptor;
}

interface CFBEncryptor {
  processBlock(words: number[], offset: number): void;
  _cipher: BlockCipher;
  _iv?: WordArray;
  _prevBlock?: number[];
}

interface CFBDecryptor {
  processBlock(words: number[], offset: number): void;
  _cipher: BlockCipher;
  _iv?: WordArray;
  _prevBlock?: number[];
}

/**
 * Cipher Feedback (CFB) block cipher mode implementation
 */
export function createCFBMode(cryptoLib: any): CFBMode {
  const baseCipherMode = cryptoLib.lib.BlockCipherMode.extend();

  function xorBlock(
    targetWords: number[],
    targetOffset: number,
    blockSize: number,
    cipher: BlockCipher,
    context: CFBEncryptor | CFBDecryptor
  ): void {
    let blockToEncrypt: number[];

    if (context._iv) {
      blockToEncrypt = context._iv.slice(0);
      context._iv = undefined;
    } else {
      blockToEncrypt = context._prevBlock ?? [];
    }

    cipher.encryptBlock(blockToEncrypt, 0);

    for (let i = 0; i < blockSize; i++) {
      targetWords[targetOffset + i] ^= blockToEncrypt[i];
    }
  }

  const Encryptor = baseCipherMode.extend({
    processBlock(words: number[], offset: number): void {
      const cipher = this._cipher;
      const blockSize = cipher.blockSize;

      xorBlock(words, offset, blockSize, cipher, this);
      this._prevBlock = words.slice(offset, offset + blockSize);
    }
  });

  const Decryptor = baseCipherMode.extend({
    processBlock(words: number[], offset: number): void {
      const cipher = this._cipher;
      const blockSize = cipher.blockSize;
      const originalBlock = words.slice(offset, offset + blockSize);

      xorBlock(words, offset, blockSize, cipher, this);
      this._prevBlock = originalBlock;
    }
  });

  return {
    ...baseCipherMode,
    Encryptor,
    Decryptor
  };
}