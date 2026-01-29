interface CryptoJSStatic {
  lib: {
    StreamCipher: any;
  };
  algo: Record<string, any>;
}

interface WordArray {
  words: number[];
  sigBytes: number;
}

interface RC4Config {
  drop: number;
}

interface RC4Instance {
  _key: WordArray;
  _S: number[];
  _i: number;
  _j: number;
  cfg: RC4Config;
  _doReset(): void;
  _doProcessBlock(data: number[], offset: number): void;
}

interface StreamCipherConstructor {
  extend(proto: any): any;
  _createHelper(cipher: any): any;
}

const PERMUTATION_TABLE_SIZE = 256;
const BITS_PER_BYTE = 8;
const WORD_SIZE_BITS = 32;
const BYTES_PER_WORD = 4;
const DEFAULT_DROP_ROUNDS = 192;
const OUTPUT_BLOCK_SIZE = 4;

/**
 * RC4 stream cipher implementation
 */
export function createRC4Module(CryptoJS: CryptoJSStatic): any {
  const { lib, algo } = CryptoJS;
  const StreamCipher: StreamCipherConstructor = lib.StreamCipher;

  /**
   * Generates the next keystream word
   */
  function generateKeystreamWord(this: RC4Instance): number {
    const table = this._S;
    let indexI = this._i;
    let indexJ = this._j;
    let keystreamWord = 0;

    for (let bytePos = 0; bytePos < OUTPUT_BLOCK_SIZE; bytePos++) {
      indexI = (indexI + 1) % PERMUTATION_TABLE_SIZE;
      indexJ = (indexJ + table[indexI]) % PERMUTATION_TABLE_SIZE;

      const temp = table[indexI];
      table[indexI] = table[indexJ];
      table[indexJ] = temp;

      const outputIndex = (table[indexI] + table[indexJ]) % PERMUTATION_TABLE_SIZE;
      keystreamWord |= table[outputIndex] << (WORD_SIZE_BITS - BITS_PER_BYTE - BITS_PER_BYTE * bytePos);
    }

    this._i = indexI;
    this._j = indexJ;

    return keystreamWord;
  }

  const RC4 = StreamCipher.extend({
    /**
     * Initializes the cipher with the key
     */
    _doReset(this: RC4Instance): void {
      const key = this._key;
      const keyWords = key.words;
      const keyBytes = key.sigBytes;
      const permutationTable: number[] = [];

      // Initialize permutation table
      for (let i = 0; i < PERMUTATION_TABLE_SIZE; i++) {
        permutationTable[i] = i;
      }

      // Key scheduling algorithm
      let swapIndex = 0;
      for (let i = 0; i < PERMUTATION_TABLE_SIZE; i++) {
        const keyByteIndex = i % keyBytes;
        const wordIndex = keyByteIndex >>> 2;
        const byteShift = WORD_SIZE_BITS - BITS_PER_BYTE - (keyByteIndex % BYTES_PER_WORD) * BITS_PER_BYTE;
        const keyByte = (keyWords[wordIndex] >>> byteShift) & 0xff;

        swapIndex = (swapIndex + permutationTable[i] + keyByte) % PERMUTATION_TABLE_SIZE;

        const temp = permutationTable[i];
        permutationTable[i] = permutationTable[swapIndex];
        permutationTable[swapIndex] = temp;
      }

      this._S = permutationTable;
      this._i = 0;
      this._j = 0;
    },

    /**
     * Processes a single block by XORing with keystream
     */
    _doProcessBlock(this: RC4Instance, data: number[], offset: number): void {
      data[offset] ^= generateKeystreamWord.call(this);
    },

    keySize: 8,
    ivSize: 0
  });

  CryptoJS.RC4 = StreamCipher._createHelper(RC4);

  const RC4Drop = RC4.extend({
    cfg: {
      ...RC4.cfg,
      drop: DEFAULT_DROP_ROUNDS
    },

    /**
     * Initializes RC4Drop by discarding initial keystream bytes
     */
    _doReset(this: RC4Instance): void {
      RC4._doReset.call(this);

      const dropRounds = this.cfg.drop;
      for (let i = 0; i < dropRounds; i++) {
        generateKeystreamWord.call(this);
      }
    }
  });

  CryptoJS.RC4Drop = StreamCipher._createHelper(RC4Drop);

  return CryptoJS.RC4;
}