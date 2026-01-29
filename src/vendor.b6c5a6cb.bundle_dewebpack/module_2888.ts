interface CryptoLib {
  lib: {
    BlockCipher: any;
  };
  algo: Record<string, any>;
  AES: any;
}

interface BlockCipher {
  extend(definition: CipherDefinition): any;
  _createHelper(cipher: any): any;
}

interface CipherDefinition {
  _doReset(): void;
  encryptBlock(words: number[], offset: number): void;
  decryptBlock(words: number[], offset: number): void;
  _doCryptBlock(
    words: number[],
    offset: number,
    keySchedule: number[],
    table0: number[],
    table1: number[],
    table2: number[],
    table3: number[],
    sBox: number[]
  ): void;
  keySize: number;
  _nRounds?: number;
  _keyPriorReset?: any;
  _key?: any;
  _keySchedule?: number[];
  _invKeySchedule?: number[];
}

const GALOIS_FIELD_MODULUS = 283;
const SBOX_INITIAL_P_VALUE = 99;
const SBOX_P_MASK = 255;

const ROUND_CONSTANTS = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];

const TABLE_MULTIPLIER_257 = 257;
const TABLE_MULTIPLIER_65537 = 65537;
const TABLE_MULTIPLIER_16843008 = 16843008;
const TABLE_MULTIPLIER_16843009 = 16843009;

const BITS_PER_BYTE = 8;
const BITS_PER_WORD = 24;
const BITS_PER_WORD_16 = 16;

const BYTE_MASK = 255;
const EXTENDED_KEY_SIZE_THRESHOLD = 6;
const BLOCK_SIZE = 4;
const MIN_ROUNDS_FOR_INV_MIX = 4;

function createAES(cryptoLib: CryptoLib): any {
  const lib = cryptoLib;
  const BlockCipher = lib.lib.BlockCipher;
  const algo = lib.algo;

  const sBox: number[] = [];
  const invSBox: number[] = [];
  const encryptTable0: number[] = [];
  const encryptTable1: number[] = [];
  const encryptTable2: number[] = [];
  const encryptTable3: number[] = [];
  const decryptTable0: number[] = [];
  const decryptTable1: number[] = [];
  const decryptTable2: number[] = [];
  const decryptTable3: number[] = [];

  function initializeTables(): void {
    const galoisMultiplicationTable: number[] = [];
    
    for (let i = 0; i < 256; i++) {
      galoisMultiplicationTable[i] = i < 128 
        ? i << 1 
        : (i << 1) ^ GALOIS_FIELD_MODULUS;
    }

    let sBoxIndex = 0;
    let inverseIndex = 0;

    for (let i = 0; i < 256; i++) {
      let sBoxValue = inverseIndex ^ (inverseIndex << 1) ^ (inverseIndex << 2) ^ (inverseIndex << 3) ^ (inverseIndex << 4);
      sBoxValue = (sBoxValue >>> BITS_PER_BYTE) ^ (SBOX_P_MASK & sBoxValue) ^ SBOX_INITIAL_P_VALUE;
      
      sBox[sBoxIndex] = sBoxValue;
      invSBox[sBoxValue] = sBoxIndex;

      const galois2 = galoisMultiplicationTable[sBoxIndex];
      const galois4 = galoisMultiplicationTable[galois2];
      const galois8 = galoisMultiplicationTable[galois4];

      const encryptTableValue = 
        (TABLE_MULTIPLIER_257 * galoisMultiplicationTable[sBoxValue]) ^ 
        (TABLE_MULTIPLIER_16843008 * sBoxValue);
      
      encryptTable0[sBoxIndex] = (encryptTableValue << BITS_PER_WORD) | (encryptTableValue >>> BITS_PER_BYTE);
      encryptTable1[sBoxIndex] = (encryptTableValue << BITS_PER_WORD_16) | (encryptTableValue >>> BITS_PER_WORD_16);
      encryptTable2[sBoxIndex] = (encryptTableValue << BITS_PER_BYTE) | (encryptTableValue >>> BITS_PER_WORD);
      encryptTable3[sBoxIndex] = encryptTableValue;

      const decryptTableValue = 
        (TABLE_MULTIPLIER_16843009 * galois8) ^ 
        (TABLE_MULTIPLIER_65537 * galois4) ^ 
        (TABLE_MULTIPLIER_257 * galois2) ^ 
        (TABLE_MULTIPLIER_16843008 * sBoxIndex);
      
      decryptTable0[sBoxValue] = (decryptTableValue << BITS_PER_WORD) | (decryptTableValue >>> BITS_PER_BYTE);
      decryptTable1[sBoxValue] = (decryptTableValue << BITS_PER_WORD_16) | (decryptTableValue >>> BITS_PER_WORD_16);
      decryptTable2[sBoxValue] = (decryptTableValue << BITS_PER_BYTE) | (decryptTableValue >>> BITS_PER_WORD);
      decryptTable3[sBoxValue] = decryptTableValue;

      if (sBoxIndex) {
        sBoxIndex = galois2 ^ galoisMultiplicationTable[galoisMultiplicationTable[galoisMultiplicationTable[galois8 ^ galois2]]];
        inverseIndex ^= galoisMultiplicationTable[galoisMultiplicationTable[inverseIndex]];
      } else {
        sBoxIndex = inverseIndex = 1;
      }
    }
  }

  initializeTables();

  const AES = BlockCipher.extend({
    _doReset(): void {
      if (!this._nRounds || this._keyPriorReset !== this._key) {
        const key = this._keyPriorReset = this._key;
        const keyWords = key.words;
        const keySize = key.sigBytes / BLOCK_SIZE;
        const rounds = this._nRounds = keySize + EXTENDED_KEY_SIZE_THRESHOLD;
        const keyScheduleLength = BLOCK_SIZE * (rounds + 1);
        const keySchedule = this._keySchedule = [];

        for (let i = 0; i < keyScheduleLength; i++) {
          if (i < keySize) {
            keySchedule[i] = keyWords[i];
          } else {
            let temp = keySchedule[i - 1];
            
            if (i % keySize === 0) {
              temp = (temp << BITS_PER_BYTE) | (temp >>> BITS_PER_WORD);
              temp = (sBox[temp >>> BITS_PER_WORD] << BITS_PER_WORD) | 
                     (sBox[(temp >>> BITS_PER_WORD_16) & BYTE_MASK] << BITS_PER_WORD_16) | 
                     (sBox[(temp >>> BITS_PER_BYTE) & BYTE_MASK] << BITS_PER_BYTE) | 
                     sBox[BYTE_MASK & temp];
              temp ^= ROUND_CONSTANTS[(i / keySize) | 0] << BITS_PER_WORD;
            } else if (keySize > EXTENDED_KEY_SIZE_THRESHOLD && i % keySize === BLOCK_SIZE) {
              temp = (sBox[temp >>> BITS_PER_WORD] << BITS_PER_WORD) | 
                     (sBox[(temp >>> BITS_PER_WORD_16) & BYTE_MASK] << BITS_PER_WORD_16) | 
                     (sBox[(temp >>> BITS_PER_BYTE) & BYTE_MASK] << BITS_PER_BYTE) | 
                     sBox[BYTE_MASK & temp];
            }
            
            keySchedule[i] = keySchedule[i - keySize] ^ temp;
          }
        }

        const invKeySchedule = this._invKeySchedule = [];
        
        for (let i = 0; i < keyScheduleLength; i++) {
          const roundIndex = keyScheduleLength - i;
          const temp = (i % BLOCK_SIZE) ? keySchedule[roundIndex] : keySchedule[roundIndex - BLOCK_SIZE];
          
          if (i < MIN_ROUNDS_FOR_INV_MIX || roundIndex <= MIN_ROUNDS_FOR_INV_MIX) {
            invKeySchedule[i] = temp;
          } else {
            invKeySchedule[i] = 
              decryptTable0[sBox[temp >>> BITS_PER_WORD]] ^ 
              decryptTable1[sBox[(temp >>> BITS_PER_WORD_16) & BYTE_MASK]] ^ 
              decryptTable2[sBox[(temp >>> BITS_PER_BYTE) & BYTE_MASK]] ^ 
              decryptTable3[sBox[BYTE_MASK & temp]];
          }
        }
      }
    },

    encryptBlock(words: number[], offset: number): void {
      this._doCryptBlock(words, offset, this._keySchedule, encryptTable0, encryptTable1, encryptTable2, encryptTable3, sBox);
    },

    decryptBlock(words: number[], offset: number): void {
      const temp = words[offset + 1];
      words[offset + 1] = words[offset + 3];
      words[offset + 3] = temp;
      
      this._doCryptBlock(words, offset, this._invKeySchedule, decryptTable0, decryptTable1, decryptTable2, decryptTable3, invSBox);
      
      const temp2 = words[offset + 1];
      words[offset + 1] = words[offset + 3];
      words[offset + 3] = temp2;
    },

    _doCryptBlock(
      words: number[],
      offset: number,
      keySchedule: number[],
      table0: number[],
      table1: number[],
      table2: number[],
      table3: number[],
      sBoxTable: number[]
    ): void {
      const rounds = this._nRounds;
      
      let state0 = words[offset] ^ keySchedule[0];
      let state1 = words[offset + 1] ^ keySchedule[1];
      let state2 = words[offset + 2] ^ keySchedule[2];
      let state3 = words[offset + 3] ^ keySchedule[3];
      
      let keyScheduleIndex = BLOCK_SIZE;

      for (let round = 1; round < rounds; round++) {
        const temp0 = table0[state0 >>> BITS_PER_WORD] ^ table1[(state1 >>> BITS_PER_WORD_16) & BYTE_MASK] ^ table2[(state2 >>> BITS_PER_BYTE) & BYTE_MASK] ^ table3[BYTE_MASK & state3] ^ keySchedule[keyScheduleIndex++];
        const temp1 = table0[state1 >>> BITS_PER_WORD] ^ table1[(state2 >>> BITS_PER_WORD_16) & BYTE_MASK] ^ table2[(state3 >>> BITS_PER_BYTE) & BYTE_MASK] ^ table3[BYTE_MASK & state0] ^ keySchedule[keyScheduleIndex++];
        const temp2 = table0[state2 >>> BITS_PER_WORD] ^ table1[(state3 >>> BITS_PER_WORD_16) & BYTE_MASK] ^ table2[(state0 >>> BITS_PER_BYTE) & BYTE_MASK] ^ table3[BYTE_MASK & state1] ^ keySchedule[keyScheduleIndex++];
        const temp3 = table0[state3 >>> BITS_PER_WORD] ^ table1[(state0 >>> BITS_PER_WORD_16) & BYTE_MASK] ^ table2[(state1 >>> BITS_PER_BYTE) & BYTE_MASK] ^ table3[BYTE_MASK & state2] ^ keySchedule[keyScheduleIndex++];
        
        state0 = temp0;
        state1 = temp1;
        state2 = temp2;
        state3 = temp3;
      }

      const finalState0 = ((sBoxTable[state0 >>> BITS_PER_WORD] << BITS_PER_WORD) | (sBoxTable[(state1 >>> BITS_PER_WORD_16) & BYTE_MASK] << BITS_PER_WORD_16) | (sBoxTable[(state2 >>> BITS_PER_BYTE) & BYTE_MASK] << BITS_PER_BYTE) | sBoxTable[BYTE_MASK & state3]) ^ keySchedule[keyScheduleIndex++];
      const finalState1 = ((sBoxTable[state1 >>> BITS_PER_WORD] << BITS_PER_WORD) | (sBoxTable[(state2 >>> BITS_PER_WORD_16) & BYTE_MASK] << BITS_PER_WORD_16) | (sBoxTable[(state3 >>> BITS_PER_BYTE) & BYTE_MASK] << BITS_PER_BYTE) | sBoxTable[BYTE_MASK & state0]) ^ keySchedule[keyScheduleIndex++];
      const finalState2 = ((sBoxTable[state2 >>> BITS_PER_WORD] << BITS_PER_WORD) | (sBoxTable[(state3 >>> BITS_PER_WORD_16) & BYTE_MASK] << BITS_PER_WORD_16) | (sBoxTable[(state0 >>> BITS_PER_BYTE) & BYTE_MASK] << BITS_PER_BYTE) | sBoxTable[BYTE_MASK & state1]) ^ keySchedule[keyScheduleIndex++];
      const finalState3 = ((sBoxTable[state3 >>> BITS_PER_WORD] << BITS_PER_WORD) | (sBoxTable[(state0 >>> BITS_PER_WORD_16) & BYTE_MASK] << BITS_PER_WORD_16) | (sBoxTable[(state1 >>> BITS_PER_BYTE) & BYTE_MASK] << BITS_PER_BYTE) | sBoxTable[BYTE_MASK & state2]) ^ keySchedule[keyScheduleIndex++];
      
      words[offset] = finalState0;
      words[offset + 1] = finalState1;
      words[offset + 2] = finalState2;
      words[offset + 3] = finalState3;
    },

    keySize: 8
  });

  lib.AES = BlockCipher._createHelper(AES);
  
  return lib.AES;
}

export { createAES };
export type { CryptoLib, BlockCipher, CipherDefinition };