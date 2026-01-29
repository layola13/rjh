interface WordArrayConfig {
  words?: number[];
  sigBytes?: number;
}

interface HasherConfig {
  [key: string]: unknown;
}

interface Encoder {
  stringify(wordArray: WordArray): string;
  parse(str: string): WordArray;
}

interface BaseObject {
  extend(overrides?: Record<string, unknown>): BaseObject;
  create(...args: unknown[]): BaseObject;
  init(...args: unknown[]): void;
  mixIn(properties: Record<string, unknown>): void;
  clone(): BaseObject;
  $super?: BaseObject;
}

class WordArray {
  words: number[];
  sigBytes: number;

  constructor(words?: number[], sigBytes?: number) {
    this.words = words || [];
    this.sigBytes = sigBytes != null ? sigBytes : 4 * this.words.length;
  }

  toString(encoder?: Encoder): string {
    return (encoder || Hex).stringify(this);
  }

  concat(wordArray: WordArray): this {
    const thisWords = this.words;
    const thatWords = wordArray.words;
    const thisSigBytes = this.sigBytes;
    const thatSigBytes = wordArray.sigBytes;

    this.clamp();

    if (thisSigBytes % 4) {
      for (let i = 0; i < thatSigBytes; i++) {
        const thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
        thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
      }
    } else {
      for (let i = 0; i < thatSigBytes; i += 4) {
        thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
      }
    }

    this.sigBytes += thatSigBytes;
    return this;
  }

  clamp(): void {
    const words = this.words;
    const sigBytes = this.sigBytes;

    words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
    words.length = Math.ceil(sigBytes / 4);
  }

  clone(): WordArray {
    const cloned = new WordArray();
    cloned.words = this.words.slice(0);
    cloned.sigBytes = this.sigBytes;
    return cloned;
  }

  static random(nBytes: number): WordArray {
    const words: number[] = [];

    const randomWordGenerator = (seed: number): (() => number) => {
      let x = 987654321;
      const m = 4294967295;

      return () => {
        x = ((36969 * (x & 0xffff) + (x >> 16)) & m);
        seed = ((18000 * (seed & 0xffff) + (seed >> 16)) & m);
        let result = ((x << 16) + seed) & m;
        result /= 4294967296;
        result += 0.5;
        return result * (Math.random() > 0.5 ? 1 : -1);
      };
    };

    let randomSeed: number | undefined;

    for (let i = 0; i < nBytes; i += 4) {
      const randomGen = randomWordGenerator((randomSeed || Math.random()) * 4294967296);
      randomSeed = 987654071 * randomGen();
      words.push((4294967296 * randomGen()) | 0);
    }

    return new WordArray(words, nBytes);
  }
}

const Hex: Encoder = {
  stringify(wordArray: WordArray): string {
    const words = wordArray.words;
    const sigBytes = wordArray.sigBytes;
    const hexChars: string[] = [];

    for (let i = 0; i < sigBytes; i++) {
      const byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
      hexChars.push((byte >>> 4).toString(16));
      hexChars.push((byte & 0x0f).toString(16));
    }

    return hexChars.join('');
  },

  parse(hexStr: string): WordArray {
    const hexStrLength = hexStr.length;
    const words: number[] = [];

    for (let i = 0; i < hexStrLength; i += 2) {
      words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
    }

    return new WordArray(words, hexStrLength / 2);
  }
};

const Latin1: Encoder = {
  stringify(wordArray: WordArray): string {
    const words = wordArray.words;
    const sigBytes = wordArray.sigBytes;
    const latin1Chars: string[] = [];

    for (let i = 0; i < sigBytes; i++) {
      const byte = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
      latin1Chars.push(String.fromCharCode(byte));
    }

    return latin1Chars.join('');
  },

  parse(latin1Str: string): WordArray {
    const latin1StrLength = latin1Str.length;
    const words: number[] = [];

    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
    }

    return new WordArray(words, latin1StrLength);
  }
};

const Utf8: Encoder = {
  stringify(wordArray: WordArray): string {
    try {
      return decodeURIComponent(escape(Latin1.stringify(wordArray)));
    } catch {
      throw new Error('Malformed UTF-8 data');
    }
  },

  parse(utf8Str: string): WordArray {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};

abstract class BufferedBlockAlgorithm {
  protected _data!: WordArray;
  protected _nDataBytes!: number;
  abstract blockSize: number;
  protected _minBufferSize: number = 0;

  reset(): void {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }

  protected _append(data: string | WordArray): void {
    if (typeof data === 'string') {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }

  protected _process(doFlush?: boolean): WordArray | undefined {
    const data = this._data;
    const dataWords = data.words;
    const dataSigBytes = data.sigBytes;
    const blockSize = this.blockSize;
    const blockSizeBytes = blockSize * 4;

    let nBlocksReady = dataSigBytes / blockSizeBytes;
    nBlocksReady = doFlush ? Math.ceil(nBlocksReady) : Math.max((nBlocksReady | 0) - this._minBufferSize, 0);

    const nWordsReady = nBlocksReady * blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += blockSize) {
        this._doProcessBlock(dataWords, offset);
      }

      const processedWords = dataWords.splice(0, nWordsReady);
      data.sigBytes -= nBytesReady;

      return new WordArray(processedWords, nBytesReady);
    }

    return undefined;
  }

  protected abstract _doProcessBlock(words: number[], offset: number): void;

  clone(): BufferedBlockAlgorithm {
    const clone = Object.create(Object.getPrototypeOf(this));
    Object.assign(clone, this);
    clone._data = this._data.clone();
    return clone;
  }
}

abstract class Hasher extends BufferedBlockAlgorithm {
  blockSize: number = 16;
  cfg: HasherConfig;

  constructor(cfg?: HasherConfig) {
    super();
    this.cfg = { ...cfg };
    this.reset();
  }

  reset(): void {
    super.reset();
    this._doReset();
  }

  update(messageUpdate: string | WordArray): this {
    this._append(messageUpdate);
    this._process();
    return this;
  }

  finalize(messageUpdate?: string | WordArray): WordArray {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
    return this._doFinalize();
  }

  protected abstract _doReset(): void;
  protected abstract _doFinalize(): WordArray;

  static _createHelper(hasherConstructor: new (cfg?: HasherConfig) => Hasher): (message: string | WordArray, cfg?: HasherConfig) => WordArray {
    return (message: string | WordArray, cfg?: HasherConfig): WordArray => {
      return new hasherConstructor(cfg).finalize(message);
    };
  }

  static _createHmacHelper(hasherConstructor: new (cfg?: HasherConfig) => Hasher): (message: string | WordArray, key: string | WordArray) => WordArray {
    return (message: string | WordArray, key: string | WordArray): WordArray => {
      return new HMAC(hasherConstructor, key).finalize(message);
    };
  }
}

class HMAC {
  constructor(hasher: new (cfg?: HasherConfig) => Hasher, key: string | WordArray) {
    // HMAC implementation placeholder
  }

  finalize(message: string | WordArray): WordArray {
    // HMAC finalize placeholder
    return new WordArray();
  }
}

export { WordArray, Hex, Latin1, Utf8, BufferedBlockAlgorithm, Hasher, HMAC };
export type { Encoder, HasherConfig, WordArrayConfig };