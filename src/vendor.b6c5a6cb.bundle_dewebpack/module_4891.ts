interface CryptoLib {
  lib: {
    StreamCipher: any;
  };
  algo: Record<string, any>;
}

interface CipherConfig {
  iv?: WordArray;
}

interface WordArray {
  words: number[];
}

interface RabbitLegacyInstance {
  _key: WordArray;
  cfg: CipherConfig;
  _X: number[];
  _C: number[];
  _b: number;
  _doReset(): void;
  _doProcessBlock(words: number[], offset: number): void;
  blockSize: number;
  ivSize: number;
}

const CONSTANT_1295307597 = 1295307597;
const CONSTANT_3545052371 = 3545052371;
const CONSTANT_886263092 = 886263092;
const MASK_HIGH_16 = 4294901760;
const MASK_LOW_16 = 65535;
const MASK_BYTE_SWAP_1 = 16711935;
const MASK_BYTE_SWAP_2 = 4278255360;
const BLOCK_SIZE = 4;
const IV_SIZE = 2;
const ITERATIONS_INIT = 4;
const STATE_SIZE = 8;

const keyStreamBuffer: number[] = [];
const counterBackup: number[] = [];
const gFunctionOutput: number[] = [];

/**
 * Updates the internal state of the cipher using the next-state function.
 * Implements the counter update and G-function computation.
 */
function nextState(this: RabbitLegacyInstance): void {
  const state = this._X;
  const counter = this._C;

  // Backup counter values
  for (let i = 0; i < STATE_SIZE; i++) {
    counterBackup[i] = counter[i];
  }

  // Update counters with carry propagation
  counter[0] = (counter[0] + CONSTANT_1295307597 + this._b) | 0;
  counter[1] = (counter[1] + CONSTANT_3545052371 + (counter[0] >>> 0 < counterBackup[0] >>> 0 ? 1 : 0)) | 0;
  counter[2] = (counter[2] + CONSTANT_886263092 + (counter[1] >>> 0 < counterBackup[1] >>> 0 ? 1 : 0)) | 0;
  counter[3] = (counter[3] + CONSTANT_1295307597 + (counter[2] >>> 0 < counterBackup[2] >>> 0 ? 1 : 0)) | 0;
  counter[4] = (counter[4] + CONSTANT_3545052371 + (counter[3] >>> 0 < counterBackup[3] >>> 0 ? 1 : 0)) | 0;
  counter[5] = (counter[5] + CONSTANT_886263092 + (counter[4] >>> 0 < counterBackup[4] >>> 0 ? 1 : 0)) | 0;
  counter[6] = (counter[6] + CONSTANT_1295307597 + (counter[5] >>> 0 < counterBackup[5] >>> 0 ? 1 : 0)) | 0;
  counter[7] = (counter[7] + CONSTANT_3545052371 + (counter[6] >>> 0 < counterBackup[6] >>> 0 ? 1 : 0)) | 0;
  this._b = counter[7] >>> 0 < counterBackup[7] >>> 0 ? 1 : 0;

  // Apply G-function to each state element
  for (let i = 0; i < STATE_SIZE; i++) {
    const sum = state[i] + counter[i];
    const low = MASK_LOW_16 & sum;
    const high = sum >>> 16;
    const squareSum = ((low * low >>> 17) + low * high >>> 15) + high * high;
    const product = ((MASK_HIGH_16 & sum) * sum | 0) + ((MASK_LOW_16 & sum) * sum | 0);
    gFunctionOutput[i] = squareSum ^ product;
  }

  // Update state variables
  state[0] = (gFunctionOutput[0] + (gFunctionOutput[7] << 16 | gFunctionOutput[7] >>> 16) + (gFunctionOutput[6] << 16 | gFunctionOutput[6] >>> 16)) | 0;
  state[1] = (gFunctionOutput[1] + (gFunctionOutput[0] << 8 | gFunctionOutput[0] >>> 24) + gFunctionOutput[7]) | 0;
  state[2] = (gFunctionOutput[2] + (gFunctionOutput[1] << 16 | gFunctionOutput[1] >>> 16) + (gFunctionOutput[0] << 16 | gFunctionOutput[0] >>> 16)) | 0;
  state[3] = (gFunctionOutput[3] + (gFunctionOutput[2] << 8 | gFunctionOutput[2] >>> 24) + gFunctionOutput[1]) | 0;
  state[4] = (gFunctionOutput[4] + (gFunctionOutput[3] << 16 | gFunctionOutput[3] >>> 16) + (gFunctionOutput[2] << 16 | gFunctionOutput[2] >>> 16)) | 0;
  state[5] = (gFunctionOutput[5] + (gFunctionOutput[4] << 8 | gFunctionOutput[4] >>> 24) + gFunctionOutput[3]) | 0;
  state[6] = (gFunctionOutput[6] + (gFunctionOutput[5] << 16 | gFunctionOutput[5] >>> 16) + (gFunctionOutput[4] << 16 | gFunctionOutput[4] >>> 16)) | 0;
  state[7] = (gFunctionOutput[7] + (gFunctionOutput[6] << 8 | gFunctionOutput[6] >>> 24) + gFunctionOutput[5]) | 0;
}

export function initializeRabbitLegacy(cryptoLib: CryptoLib): any {
  const StreamCipher = cryptoLib.lib.StreamCipher;
  const algo = cryptoLib.algo;

  const RabbitLegacy = StreamCipher.extend({
    /**
     * Initializes the cipher state from the encryption key and optional IV.
     */
    _doReset(this: RabbitLegacyInstance): void {
      const keyWords = this._key.words;
      const iv = this.cfg.iv;

      // Initialize state variables from key
      const state = this._X = [
        keyWords[0],
        (keyWords[3] << 16 | keyWords[3] >>> 16),
        keyWords[1],
        (keyWords[0] << 16 | keyWords[0] >>> 16),
        keyWords[2],
        (keyWords[1] << 16 | keyWords[1] >>> 16),
        keyWords[3],
        (keyWords[2] << 16 | keyWords[2] >>> 16)
      ];

      // Initialize counter variables from key
      const counter = this._C = [
        (keyWords[2] << 16 | keyWords[2] >>> 16),
        (MASK_HIGH_16 & keyWords[0] | MASK_LOW_16 & keyWords[1]),
        (keyWords[3] << 16 | keyWords[3] >>> 16),
        (MASK_HIGH_16 & keyWords[1] | MASK_LOW_16 & keyWords[2]),
        (keyWords[0] << 16 | keyWords[0] >>> 16),
        (MASK_HIGH_16 & keyWords[2] | MASK_LOW_16 & keyWords[3]),
        (keyWords[1] << 16 | keyWords[1] >>> 16),
        (MASK_HIGH_16 & keyWords[3] | MASK_LOW_16 & keyWords[0])
      ];

      this._b = 0;

      // Iterate system four times
      for (let i = 0; i < ITERATIONS_INIT; i++) {
        nextState.call(this);
      }

      // Modify counters
      for (let i = 0; i < STATE_SIZE; i++) {
        counter[i] ^= state[(i + 4) & 7];
      }

      // Apply IV if present
      if (iv) {
        const ivWords = iv.words;
        const iv0 = ivWords[0];
        const iv1 = ivWords[1];

        // Endian swap
        const iv0Swapped = (MASK_BYTE_SWAP_1 & (iv0 << 8 | iv0 >>> 24)) | (MASK_BYTE_SWAP_2 & (iv0 << 24 | iv0 >>> 8));
        const iv1Swapped = (MASK_BYTE_SWAP_1 & (iv1 << 8 | iv1 >>> 24)) | (MASK_BYTE_SWAP_2 & (iv1 << 24 | iv1 >>> 8));

        // Split and recombine IV words
        const ivMix0 = (iv0Swapped >>> 16) | (MASK_HIGH_16 & iv1Swapped);
        const ivMix1 = (iv1Swapped << 16) | (MASK_LOW_16 & iv0Swapped);

        // XOR counter with IV
        counter[0] ^= iv0Swapped;
        counter[1] ^= ivMix0;
        counter[2] ^= iv1Swapped;
        counter[3] ^= ivMix1;
        counter[4] ^= iv0Swapped;
        counter[5] ^= ivMix0;
        counter[6] ^= iv1Swapped;
        counter[7] ^= ivMix1;

        // Iterate system four times more
        for (let i = 0; i < ITERATIONS_INIT; i++) {
          nextState.call(this);
        }
      }
    },

    /**
     * Processes a block of data by XORing with the keystream.
     */
    _doProcessBlock(this: RabbitLegacyInstance, words: number[], offset: number): void {
      const state = this._X;

      // Generate keystream
      nextState.call(this);

      keyStreamBuffer[0] = state[0] ^ (state[5] >>> 16) ^ (state[3] << 16);
      keyStreamBuffer[1] = state[2] ^ (state[7] >>> 16) ^ (state[5] << 16);
      keyStreamBuffer[2] = state[4] ^ (state[1] >>> 16) ^ (state[7] << 16);
      keyStreamBuffer[3] = state[6] ^ (state[3] >>> 16) ^ (state[1] << 16);

      // Endian swap and XOR with input
      for (let i = 0; i < BLOCK_SIZE; i++) {
        keyStreamBuffer[i] = (MASK_BYTE_SWAP_1 & (keyStreamBuffer[i] << 8 | keyStreamBuffer[i] >>> 24)) |
                              (MASK_BYTE_SWAP_2 & (keyStreamBuffer[i] << 24 | keyStreamBuffer[i] >>> 8));
        words[offset + i] ^= keyStreamBuffer[i];
      }
    },

    blockSize: BLOCK_SIZE,
    ivSize: IV_SIZE
  });

  algo.RabbitLegacy = StreamCipher._createHelper(RabbitLegacy);

  return cryptoLib.RabbitLegacy;
}