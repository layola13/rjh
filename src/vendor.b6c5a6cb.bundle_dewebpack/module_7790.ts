interface CryptoJS {
  lib: {
    StreamCipher: StreamCipherConstructor;
  };
  algo: AlgorithmNamespace;
}

interface StreamCipherConstructor {
  extend(overrides: Partial<StreamCipher>): typeof StreamCipher;
  _createHelper(cipher: typeof StreamCipher): any;
}

interface StreamCipher {
  _key: { words: number[] };
  cfg: { iv?: { words: number[] } };
  _X: number[];
  _C: number[];
  _b: number;
  _doReset(): void;
  _doProcessBlock(words: number[], offset: number): void;
  blockSize: number;
  ivSize: number;
}

interface AlgorithmNamespace {
  Rabbit?: typeof StreamCipher;
}

const COUNTER_INCREMENT_0 = 1295307597;
const COUNTER_INCREMENT_1 = 3545052371;
const COUNTER_INCREMENT_2 = 886263092;

const MASK_LOW_16 = 0x0000ffff;
const MASK_HIGH_16 = 0xffff0000;
const BYTE_SWAP_MASK_1 = 0x00ff00ff;
const BYTE_SWAP_MASK_2 = 0xff00ff00;

const stateBuffer: number[] = [];
const counterBuffer: number[] = [];
const gBuffer: number[] = [];

function nextState(this: StreamCipher): void {
  const state = this._X;
  const counter = this._C;

  for (let i = 0; i < 8; i++) {
    counterBuffer[i] = counter[i];
  }

  counter[0] = (counter[0] + COUNTER_INCREMENT_0 + this._b) | 0;
  counter[1] = (counter[1] + COUNTER_INCREMENT_1 + (counter[0] >>> 0 < counterBuffer[0] >>> 0 ? 1 : 0)) | 0;
  counter[2] = (counter[2] + COUNTER_INCREMENT_2 + (counter[1] >>> 0 < counterBuffer[1] >>> 0 ? 1 : 0)) | 0;
  counter[3] = (counter[3] + COUNTER_INCREMENT_0 + (counter[2] >>> 0 < counterBuffer[2] >>> 0 ? 1 : 0)) | 0;
  counter[4] = (counter[4] + COUNTER_INCREMENT_1 + (counter[3] >>> 0 < counterBuffer[3] >>> 0 ? 1 : 0)) | 0;
  counter[5] = (counter[5] + COUNTER_INCREMENT_2 + (counter[4] >>> 0 < counterBuffer[4] >>> 0 ? 1 : 0)) | 0;
  counter[6] = (counter[6] + COUNTER_INCREMENT_0 + (counter[5] >>> 0 < counterBuffer[5] >>> 0 ? 1 : 0)) | 0;
  counter[7] = (counter[7] + COUNTER_INCREMENT_1 + (counter[6] >>> 0 < counterBuffer[6] >>> 0 ? 1 : 0)) | 0;
  this._b = counter[7] >>> 0 < counterBuffer[7] >>> 0 ? 1 : 0;

  for (let i = 0; i < 8; i++) {
    const stateCounterSum = state[i] + counter[i];
    const low16 = stateCounterSum & MASK_LOW_16;
    const high16 = stateCounterSum >>> 16;
    const square = ((low16 * low16 >>> 17) + low16 * high16 >>> 15) + high16 * high16;
    const squareMod = ((stateCounterSum & MASK_HIGH_16) * stateCounterSum | 0) + ((stateCounterSum & MASK_LOW_16) * stateCounterSum | 0);
    gBuffer[i] = square ^ squareMod;
  }

  state[0] = (gBuffer[0] + (gBuffer[7] << 16 | gBuffer[7] >>> 16) + (gBuffer[6] << 16 | gBuffer[6] >>> 16)) | 0;
  state[1] = (gBuffer[1] + (gBuffer[0] << 8 | gBuffer[0] >>> 24) + gBuffer[7]) | 0;
  state[2] = (gBuffer[2] + (gBuffer[1] << 16 | gBuffer[1] >>> 16) + (gBuffer[0] << 16 | gBuffer[0] >>> 16)) | 0;
  state[3] = (gBuffer[3] + (gBuffer[2] << 8 | gBuffer[2] >>> 24) + gBuffer[1]) | 0;
  state[4] = (gBuffer[4] + (gBuffer[3] << 16 | gBuffer[3] >>> 16) + (gBuffer[2] << 16 | gBuffer[2] >>> 16)) | 0;
  state[5] = (gBuffer[5] + (gBuffer[4] << 8 | gBuffer[4] >>> 24) + gBuffer[3]) | 0;
  state[6] = (gBuffer[6] + (gBuffer[5] << 16 | gBuffer[5] >>> 16) + (gBuffer[4] << 16 | gBuffer[4] >>> 16)) | 0;
  state[7] = (gBuffer[7] + (gBuffer[6] << 8 | gBuffer[6] >>> 24) + gBuffer[5]) | 0;
}

export function createRabbitCipher(cryptoJS: CryptoJS): any {
  const StreamCipher = cryptoJS.lib.StreamCipher;

  const Rabbit = StreamCipher.extend({
    _doReset: function (this: StreamCipher): void {
      const keyWords = this._key.words;
      const iv = this.cfg.iv;

      for (let i = 0; i < 4; i++) {
        keyWords[i] = (BYTE_SWAP_MASK_1 & (keyWords[i] << 8 | keyWords[i] >>> 24)) | 
                      (BYTE_SWAP_MASK_2 & (keyWords[i] << 24 | keyWords[i] >>> 8));
      }

      const state = this._X = [
        keyWords[0],
        (keyWords[3] << 16) | (keyWords[2] >>> 16),
        keyWords[1],
        (keyWords[0] << 16) | (keyWords[3] >>> 16),
        keyWords[2],
        (keyWords[1] << 16) | (keyWords[0] >>> 16),
        keyWords[3],
        (keyWords[2] << 16) | (keyWords[1] >>> 16)
      ];

      const counter = this._C = [
        (keyWords[2] << 16) | (keyWords[2] >>> 16),
        (keyWords[0] & MASK_HIGH_16) | (keyWords[1] & MASK_LOW_16),
        (keyWords[3] << 16) | (keyWords[3] >>> 16),
        (keyWords[1] & MASK_HIGH_16) | (keyWords[2] & MASK_LOW_16),
        (keyWords[0] << 16) | (keyWords[0] >>> 16),
        (keyWords[2] & MASK_HIGH_16) | (keyWords[3] & MASK_LOW_16),
        (keyWords[1] << 16) | (keyWords[1] >>> 16),
        (keyWords[3] & MASK_HIGH_16) | (keyWords[0] & MASK_LOW_16)
      ];

      this._b = 0;

      for (let i = 0; i < 4; i++) {
        nextState.call(this);
      }

      for (let i = 0; i < 8; i++) {
        counter[i] ^= state[(i + 4) & 7];
      }

      if (iv) {
        const ivWords = iv.words;
        const iv0 = ivWords[0];
        const iv1 = ivWords[1];

        const ivSwapped0 = (BYTE_SWAP_MASK_1 & (iv0 << 8 | iv0 >>> 24)) | 
                           (BYTE_SWAP_MASK_2 & (iv0 << 24 | iv0 >>> 8));
        const ivSwapped1 = (BYTE_SWAP_MASK_1 & (iv1 << 8 | iv1 >>> 24)) | 
                           (BYTE_SWAP_MASK_2 & (iv1 << 24 | iv1 >>> 8));

        const ivMix0 = (ivSwapped0 >>> 16) | (ivSwapped1 & MASK_HIGH_16);
        const ivMix1 = (ivSwapped1 << 16) | (ivSwapped0 & MASK_LOW_16);

        counter[0] ^= ivSwapped0;
        counter[1] ^= ivMix0;
        counter[2] ^= ivSwapped1;
        counter[3] ^= ivMix1;
        counter[4] ^= ivSwapped0;
        counter[5] ^= ivMix0;
        counter[6] ^= ivSwapped1;
        counter[7] ^= ivMix1;

        for (let i = 0; i < 4; i++) {
          nextState.call(this);
        }
      }
    },

    _doProcessBlock: function (this: StreamCipher, words: number[], offset: number): void {
      const state = this._X;

      nextState.call(this);

      stateBuffer[0] = state[0] ^ (state[5] >>> 16) ^ (state[3] << 16);
      stateBuffer[1] = state[2] ^ (state[7] >>> 16) ^ (state[5] << 16);
      stateBuffer[2] = state[4] ^ (state[1] >>> 16) ^ (state[7] << 16);
      stateBuffer[3] = state[6] ^ (state[3] >>> 16) ^ (state[1] << 16);

      for (let i = 0; i < 4; i++) {
        stateBuffer[i] = (BYTE_SWAP_MASK_1 & (stateBuffer[i] << 8 | stateBuffer[i] >>> 24)) | 
                         (BYTE_SWAP_MASK_2 & (stateBuffer[i] << 24 | stateBuffer[i] >>> 8));
        words[offset + i] ^= stateBuffer[i];
      }
    },

    blockSize: 4,
    ivSize: 2
  });

  cryptoJS.algo.Rabbit = StreamCipher._createHelper(Rabbit);

  return Rabbit;
}