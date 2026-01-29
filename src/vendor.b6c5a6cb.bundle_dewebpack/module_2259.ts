interface Word64 {
  high: number;
  low: number;
  create(high: number, low: number): Word64;
  init(): Word64;
  clone(): Word64;
}

interface WordArray {
  words: number[];
  sigBytes: number;
  init(words: number[], sigBytes: number): WordArray;
}

interface Hasher {
  cfg: HasherConfig;
  _state: Word64[];
  _data: WordArray;
  _nDataBytes: number;
  blockSize: number;
  extend(config: Partial<SHA3Config>): typeof SHA3;
  clone(): Hasher;
  _createHelper(hasher: typeof SHA3): (message: unknown, config?: SHA3Config) => WordArray;
  _createHmacHelper(hasher: typeof SHA3): (message: unknown, key: unknown) => WordArray;
}

interface HasherConfig {
  outputLength?: number;
}

interface SHA3Config extends HasherConfig {
  outputLength: number;
}

interface CryptoLib {
  lib: {
    WordArray: {
      init(words: number[], sigBytes: number): WordArray;
    };
    Hasher: Hasher;
  };
  x64: {
    Word: {
      create(high: number, low: number): Word64;
      init(): Word64;
    };
  };
  algo: {
    SHA3?: typeof SHA3;
  };
  SHA3?: (message: unknown, config?: SHA3Config) => WordArray;
  HmacSHA3?: (message: unknown, key: unknown) => WordArray;
}

const ROTATION_OFFSETS: number[] = [];
const PI_LANE_OFFSETS: number[] = [];
const ROUND_CONSTANTS: Word64[] = [];

function initializeRotationOffsets(): void {
  let x = 1;
  let y = 0;
  
  for (let t = 0; t < 24; t++) {
    ROTATION_OFFSETS[x + 5 * y] = ((t + 1) * (t + 2) / 2) % 64;
    const newX = y % 5;
    y = (2 * x + 3 * y) % 5;
    x = newX;
  }
}

function initializePiLaneOffsets(): void {
  for (let x = 0; x < 5; x++) {
    for (let y = 0; y < 5; y++) {
      PI_LANE_OFFSETS[x + 5 * y] = y + ((2 * x + 3 * y) % 5) * 5;
    }
  }
}

function initializeRoundConstants(Word: { create(high: number, low: number): Word64 }): void {
  let lfsr = 1;
  
  for (let round = 0; round < 24; round++) {
    let roundConstantHigh = 0;
    let roundConstantLow = 0;
    
    for (let bitPosition = 0; bitPosition < 7; bitPosition++) {
      if (lfsr & 1) {
        const bitIndex = (1 << bitPosition) - 1;
        if (bitIndex < 32) {
          roundConstantLow ^= 1 << bitIndex;
        } else {
          roundConstantHigh ^= 1 << (bitIndex - 32);
        }
      }
      
      if (lfsr & 128) {
        lfsr = (lfsr << 1) ^ 113;
      } else {
        lfsr <<= 1;
      }
    }
    
    ROUND_CONSTANTS[round] = Word.create(roundConstantHigh, roundConstantLow);
  }
}

const STATE_TEMP_ARRAY: Word64[] = [];

function initializeStateTempArray(Word: { create(high: number, low: number): Word64 }): void {
  for (let i = 0; i < 25; i++) {
    STATE_TEMP_ARRAY[i] = Word.create(0, 0);
  }
}

class SHA3 {
  public cfg: SHA3Config;
  public blockSize: number;
  private _state: Word64[];
  private _data!: WordArray;
  private _nDataBytes!: number;

  constructor(
    private readonly Word: { create(high: number, low: number): Word64; init(): Word64 },
    private readonly WordArrayConstructor: { init(words: number[], sigBytes: number): WordArray },
    private readonly HasherBase: Hasher
  ) {
    this.cfg = { outputLength: 512 };
    this._state = [];
    this.blockSize = 0;
    this._doReset();
  }

  private _doReset(): void {
    this._state = [];
    for (let i = 0; i < 25; i++) {
      this._state[i] = this.Word.init();
    }
    this.blockSize = (1600 - 2 * this.cfg.outputLength) / 32;
  }

  private _doProcessBlock(words: number[], offset: number): void {
    const state = this._state;
    const blockSizeHalf = this.blockSize / 2;

    for (let i = 0; i < blockSizeHalf; i++) {
      let wordLow = words[offset + 2 * i];
      let wordHigh = words[offset + 2 * i + 1];

      wordLow = ((wordLow << 8) | (wordLow >>> 24)) & 0x00ff00ff | ((wordLow << 24) | (wordLow >>> 8)) & 0xff00ff00;
      wordHigh = ((wordHigh << 8) | (wordHigh >>> 24)) & 0x00ff00ff | ((wordHigh << 24) | (wordHigh >>> 8)) & 0xff00ff00;

      const lane = state[i];
      lane.high ^= wordHigh;
      lane.low ^= wordLow;
    }

    for (let round = 0; round < 24; round++) {
      // Theta step
      for (let x = 0; x < 5; x++) {
        let columnParityHigh = 0;
        let columnParityLow = 0;
        
        for (let y = 0; y < 5; y++) {
          const lane = state[x + 5 * y];
          columnParityHigh ^= lane.high;
          columnParityLow ^= lane.low;
        }
        
        const tempLane = STATE_TEMP_ARRAY[x];
        tempLane.high = columnParityHigh;
        tempLane.low = columnParityLow;
      }

      for (let x = 0; x < 5; x++) {
        const leftColumn = STATE_TEMP_ARRAY[(x + 4) % 5];
        const rightColumn = STATE_TEMP_ARRAY[(x + 1) % 5];
        const rightColumnHigh = rightColumn.high;
        const rightColumnLow = rightColumn.low;

        const thetaHigh = leftColumn.high ^ ((rightColumnHigh << 1) | (rightColumnLow >>> 31));
        const thetaLow = leftColumn.low ^ ((rightColumnLow << 1) | (rightColumnHigh >>> 31));

        for (let y = 0; y < 5; y++) {
          const lane = state[x + 5 * y];
          lane.high ^= thetaHigh;
          lane.low ^= thetaLow;
        }
      }

      // Rho and Pi steps
      for (let laneIndex = 1; laneIndex < 25; laneIndex++) {
        const lane = state[laneIndex];
        const laneHigh = lane.high;
        const laneLow = lane.low;
        const rotationOffset = ROTATION_OFFSETS[laneIndex];

        let rotatedHigh: number;
        let rotatedLow: number;

        if (rotationOffset < 32) {
          rotatedHigh = (laneHigh << rotationOffset) | (laneLow >>> (32 - rotationOffset));
          rotatedLow = (laneLow << rotationOffset) | (laneHigh >>> (32 - rotationOffset));
        } else {
          rotatedHigh = (laneLow << (rotationOffset - 32)) | (laneHigh >>> (64 - rotationOffset));
          rotatedLow = (laneHigh << (rotationOffset - 32)) | (laneLow >>> (64 - rotationOffset));
        }

        const targetLane = STATE_TEMP_ARRAY[PI_LANE_OFFSETS[laneIndex]];
        targetLane.high = rotatedHigh;
        targetLane.low = rotatedLow;
      }

      const zeroLane = STATE_TEMP_ARRAY[0];
      const stateZeroLane = state[0];
      zeroLane.high = stateZeroLane.high;
      zeroLane.low = stateZeroLane.low;

      // Chi step
      for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 5; y++) {
          const laneIndex = x + 5 * y;
          const lane = state[laneIndex];
          const currentLane = STATE_TEMP_ARRAY[laneIndex];
          const nextLane = STATE_TEMP_ARRAY[((x + 1) % 5) + 5 * y];
          const afterNextLane = STATE_TEMP_ARRAY[((x + 2) % 5) + 5 * y];

          lane.high = currentLane.high ^ (~nextLane.high & afterNextLane.high);
          lane.low = currentLane.low ^ (~nextLane.low & afterNextLane.low);
        }
      }

      // Iota step
      const zeroStateLane = state[0];
      const roundConstant = ROUND_CONSTANTS[round];
      zeroStateLane.high ^= roundConstant.high;
      zeroStateLane.low ^= roundConstant.low;
    }
  }

  private _doFinalize(): WordArray {
    const data = this._data;
    const dataWords = data.words;
    const nBitsTotal = 8 * data.sigBytes;
    const blockSizeBits = 32 * this.blockSize;

    dataWords[nBitsTotal >>> 5] |= 1 << (24 - (nBitsTotal % 32));
    dataWords[(Math.ceil((nBitsTotal + 1) / blockSizeBits) * blockSizeBits >>> 5) - 1] |= 0x80;
    data.sigBytes = 4 * dataWords.length;

    this._process();

    const state = this._state;
    const outputLengthBytes = this.cfg.outputLength / 8;
    const outputLengthWords = outputLengthBytes / 8;
    const hashWords: number[] = [];

    for (let i = 0; i < outputLengthWords; i++) {
      const lane = state[i];
      let laneHigh = lane.high;
      let laneLow = lane.low;

      laneHigh = ((laneHigh << 8) | (laneHigh >>> 24)) & 0x00ff00ff | ((laneHigh << 24) | (laneHigh >>> 8)) & 0xff00ff00;
      laneLow = ((laneLow << 8) | (laneLow >>> 24)) & 0x00ff00ff | ((laneLow << 24) | (laneLow >>> 8)) & 0xff00ff00;

      hashWords.push(laneLow);
      hashWords.push(laneHigh);
    }

    return this.WordArrayConstructor.init(hashWords, outputLengthBytes);
  }

  private _process(): void {
    // Implementation stub - should process pending data blocks
  }

  public clone(): SHA3 {
    const cloned = Object.create(Object.getPrototypeOf(this)) as SHA3;
    cloned.cfg = { ...this.cfg };
    cloned._state = this._state.map(word => word.clone());
    cloned.blockSize = this.blockSize;
    return cloned;
  }
}

export function createSHA3(cryptoLib: CryptoLib): (message: unknown, config?: SHA3Config) => WordArray {
  const Word = cryptoLib.x64.Word;
  const WordArrayConstructor = cryptoLib.lib.WordArray;
  const HasherBase = cryptoLib.lib.Hasher;

  initializeRotationOffsets();
  initializePiLaneOffsets();
  initializeRoundConstants(Word);
  initializeStateTempArray(Word);

  const sha3Instance = new SHA3(Word, WordArrayConstructor, HasherBase);
  
  cryptoLib.SHA3 = HasherBase._createHelper(SHA3);
  cryptoLib.HmacSHA3 = HasherBase._createHmacHelper(SHA3);

  return cryptoLib.SHA3!;
}