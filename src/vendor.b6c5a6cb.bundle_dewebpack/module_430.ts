/**
 * Counter block mode compatible with Dr Brian Gladman fileenc.c
 * derived from CryptoJS.mode.CTR
 * Jan Hruby jhruby.web@gmail.com
 */

interface WordArray {
  words: number[];
  sigBytes: number;
}

interface Cipher {
  blockSize: number;
  encryptBlock(words: number[], offset: number): void;
  decryptBlock(words: number[], offset: number): void;
}

interface BlockCipherMode {
  Encryptor: typeof ModeEncryptor;
  Decryptor: typeof ModeEncryptor;
  extend(overrides?: Partial<BlockCipherMode>): BlockCipherMode;
}

interface ModeInstance {
  _cipher: Cipher;
  _iv?: number[];
  _counter?: number[];
  processBlock(words: number[], offset: number): void;
}

class ModeEncryptor implements ModeInstance {
  _cipher!: Cipher;
  _iv?: number[];
  _counter?: number[];

  processBlock(words: number[], offset: number): void {
    const cipher = this._cipher;
    const blockSize = cipher.blockSize;
    const iv = this._iv;
    let counter = this._counter;

    if (iv) {
      counter = this._counter = iv.slice(0);
      this._iv = undefined;
    }

    incrementCounter(counter!);

    const counterCopy = counter!.slice(0);
    cipher.encryptBlock(counterCopy, 0);

    for (let i = 0; i < blockSize; i++) {
      words[offset + i] ^= counterCopy[i];
    }
  }
}

/**
 * Increments a 64-bit counter stored in a 2-element array
 * @param counter - Counter array to increment
 */
function incrementCounter(counter: number[]): void {
  if ((counter[0] = incrementWord(counter[0])) === 0) {
    counter[1] = incrementWord(counter[1]);
  }
}

/**
 * Increments a 32-bit word following Dr Brian Gladman's specification
 * @param word - 32-bit word to increment
 * @returns Incremented word value
 */
function incrementWord(word: number): number {
  const byte3 = (word >> 24) & 0xff;

  if (byte3 === 0xff) {
    let byte2 = (word >> 16) & 0xff;
    let byte1 = (word >> 8) & 0xff;
    let byte0 = word & 0xff;

    if (byte2 === 0xff) {
      byte2 = 0;
      if (byte1 === 0xff) {
        byte1 = 0;
        if (byte0 === 0xff) {
          byte0 = 0;
        } else {
          ++byte0;
        }
      } else {
        ++byte1;
      }
    } else {
      ++byte2;
    }

    word = 0;
    word += byte2 << 16;
    word += byte1 << 8;
    word += byte0;
  } else {
    word += 1 << 24;
  }

  return word;
}

export function createCTRGladmanMode(BlockCipherMode: BlockCipherMode): BlockCipherMode {
  const mode = BlockCipherMode.extend();
  
  mode.Encryptor = ModeEncryptor;
  mode.Decryptor = ModeEncryptor;

  return mode;
}