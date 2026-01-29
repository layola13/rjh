export interface WordArray {
  words: number[];
  sigBytes: number;
  concat(wordArray: WordArray): this;
  slice(start: number, end: number): WordArray;
  toString(encoder?: Encoder): string;
}

export interface Encoder {
  stringify(data: unknown): string;
  parse(data: string): unknown;
}

export interface Base {
  extend(overrides?: Record<string, unknown>): this;
  create(...args: unknown[]): this;
  mixIn(properties: Record<string, unknown>): this;
}

export interface BufferedBlockAlgorithm extends Base {
  reset(): void;
  _append(data: unknown): void;
  _process(doFlush?: boolean): WordArray;
}

export interface CipherConfig {
  mode?: BlockCipherMode;
  padding?: Padding;
  iv?: WordArray;
  format?: Format;
  kdf?: KDF;
}

export interface Cipher extends BufferedBlockAlgorithm {
  cfg: CipherConfig;
  keySize: number;
  ivSize: number;
  blockSize: number;
  _ENC_XFORM_MODE: 1;
  _DEC_XFORM_MODE: 2;
  _xformMode: number;
  _key: WordArray;
  
  createEncryptor(key: WordArray, cfg?: CipherConfig): Cipher;
  createDecryptor(key: WordArray, cfg?: CipherConfig): Cipher;
  init(xformMode: number, key: WordArray, cfg?: CipherConfig): void;
  reset(): void;
  process(data: string | WordArray): WordArray;
  finalize(data?: string | WordArray): WordArray;
  _doReset(): void;
  _doFinalize(): WordArray;
}

export interface StreamCipher extends Cipher {
  _doFinalize(): WordArray;
  blockSize: 1;
}

export interface BlockCipherMode extends Base {
  Encryptor: BlockCipherMode;
  Decryptor: BlockCipherMode;
  _cipher: Cipher;
  _iv?: WordArray;
  _prevBlock?: number[];
  __creator?: (cipher: Cipher, iv?: number[]) => BlockCipherMode;
  
  createEncryptor(cipher: Cipher, iv?: WordArray): BlockCipherMode;
  createDecryptor(cipher: Cipher, iv?: WordArray): BlockCipherMode;
  init(cipher: Cipher, iv?: WordArray): void;
  processBlock(words: number[], offset: number): void;
}

export interface Padding {
  pad(data: WordArray, blockSize: number): void;
  unpad(data: WordArray): void;
}

export interface CipherParams {
  ciphertext: WordArray;
  key?: WordArray;
  iv?: WordArray;
  salt?: WordArray;
  algorithm?: Cipher;
  mode?: BlockCipherMode;
  padding?: Padding;
  blockSize?: number;
  formatter?: Format;
  
  mixIn(properties: Record<string, unknown>): void;
  toString(formatter?: Format): string;
}

export interface Format {
  stringify(cipherParams: CipherParams): string;
  parse(data: string): CipherParams;
}

export interface KDF {
  execute(password: string | WordArray, keySize: number, ivSize: number, salt?: WordArray): CipherParams;
}

export interface CryptoLib {
  lib: {
    Base: Base;
    WordArray: WordArray;
    BufferedBlockAlgorithm: BufferedBlockAlgorithm;
    Cipher?: Cipher;
    StreamCipher?: StreamCipher;
    BlockCipherMode?: BlockCipherMode;
    BlockCipher?: Cipher;
    CipherParams?: CipherParams;
    SerializableCipher?: SerializableCipher;
    PasswordBasedCipher?: PasswordBasedCipher;
  };
  enc: {
    Utf8: Encoder;
    Base64: Encoder;
  };
  algo: {
    EvpKDF: KDF;
  };
  mode: Record<string, BlockCipherMode>;
  pad: Record<string, Padding>;
  format: Record<string, Format>;
  kdf: Record<string, KDF>;
}

export interface SerializableCipher extends Base {
  cfg: CipherConfig;
  
  encrypt(cipher: Cipher, message: string | WordArray, key: WordArray, cfg?: CipherConfig): CipherParams;
  decrypt(cipher: Cipher, ciphertext: CipherParams | string, key: WordArray, cfg?: CipherConfig): WordArray;
  _parse(data: CipherParams | string, format: Format): CipherParams;
}

export interface PasswordBasedCipher extends SerializableCipher {
  encrypt(cipher: Cipher, message: string | WordArray, password: string, cfg?: CipherConfig): CipherParams;
  decrypt(cipher: Cipher, ciphertext: CipherParams | string, password: string, cfg?: CipherConfig): WordArray;
}

const SALTED_MAGIC_WORD_1 = 1398893684;
const SALTED_MAGIC_WORD_2 = 1701076831;
const WORD_SIZE = 4;
const ENC_XFORM_MODE = 1;
const DEC_XFORM_MODE = 2;

function initializeCipher(CryptoJS: CryptoLib): void {
  if (CryptoJS.lib.Cipher) {
    return;
  }

  const lib = CryptoJS.lib;
  const Base = lib.Base;
  const WordArray = lib.WordArray;
  const BufferedBlockAlgorithm = lib.BufferedBlockAlgorithm;
  const Utf8Encoder = CryptoJS.enc.Utf8;
  const Base64Encoder = CryptoJS.enc.Base64;
  const EvpKDF = CryptoJS.algo.EvpKDF;

  const Cipher = lib.Cipher = BufferedBlockAlgorithm.extend({
    cfg: Base.extend(),

    createEncryptor(key: WordArray, cfg?: CipherConfig): Cipher {
      return this.create(ENC_XFORM_MODE, key, cfg);
    },

    createDecryptor(key: WordArray, cfg?: CipherConfig): Cipher {
      return this.create(DEC_XFORM_MODE, key, cfg);
    },

    init(xformMode: number, key: WordArray, cfg?: CipherConfig): void {
      this.cfg = this.cfg.extend(cfg);
      this._xformMode = xformMode;
      this._key = key;
      this.reset();
    },

    reset(): void {
      BufferedBlockAlgorithm.reset.call(this);
      this._doReset();
    },

    process(data: string | WordArray): WordArray {
      this._append(data);
      return this._process();
    },

    finalize(data?: string | WordArray): WordArray {
      if (data) {
        this._append(data);
      }
      return this._doFinalize();
    },

    keySize: 4,
    ivSize: 4,
    _ENC_XFORM_MODE: ENC_XFORM_MODE,
    _DEC_XFORM_MODE: DEC_XFORM_MODE,

    _createHelper(): (cipher: Cipher) => {
      encrypt: (message: string | WordArray, key: string | WordArray, cfg?: CipherConfig) => CipherParams;
      decrypt: (ciphertext: CipherParams | string, key: string | WordArray, cfg?: CipherConfig) => WordArray;
    } {
      function selectCipherHelper(key: string | WordArray): PasswordBasedCipher | SerializableCipher {
        return typeof key === "string" ? PasswordBasedCipher : SerializableCipher;
      }

      return function(cipher: Cipher) {
        return {
          encrypt(message: string | WordArray, key: string | WordArray, cfg?: CipherConfig): CipherParams {
            return selectCipherHelper(key).encrypt(cipher, message, key, cfg);
          },

          decrypt(ciphertext: CipherParams | string, key: string | WordArray, cfg?: CipherConfig): WordArray {
            return selectCipherHelper(key).decrypt(cipher, ciphertext, key, cfg);
          }
        };
      };
    }
  }) as Cipher;

  lib.StreamCipher = Cipher.extend({
    _doFinalize(): WordArray {
      return this._process(true);
    },

    blockSize: 1
  }) as StreamCipher;

  const modeNamespace = CryptoJS.mode = {} as Record<string, BlockCipherMode>;

  const BlockCipherMode = lib.BlockCipherMode = Base.extend({
    createEncryptor(cipher: Cipher, iv?: WordArray): BlockCipherMode {
      return this.Encryptor.create(cipher, iv);
    },

    createDecryptor(cipher: Cipher, iv?: WordArray): BlockCipherMode {
      return this.Decryptor.create(cipher, iv);
    },

    init(cipher: Cipher, iv?: WordArray): void {
      this._cipher = cipher;
      this._iv = iv;
    }
  }) as BlockCipherMode;

  const CBCMode = modeNamespace.CBC = (function() {
    const CBC = BlockCipherMode.extend({}) as BlockCipherMode;

    function xorBlock(words: number[], offset: number, blockSize: number): void {
      const iv = this._iv;
      let xorBlock: WordArray | number[];

      if (iv) {
        xorBlock = iv;
        this._iv = undefined;
      } else {
        xorBlock = this._prevBlock;
      }

      for (let i = 0; i < blockSize; i++) {
        words[offset + i] ^= xorBlock[i];
      }
    }

    CBC.Encryptor = CBC.extend({
      processBlock(words: number[], offset: number): void {
        const cipher = this._cipher;
        const blockSize = cipher.blockSize;

        xorBlock.call(this, words, offset, blockSize);
        cipher.encryptBlock(words, offset);
        this._prevBlock = words.slice(offset, offset + blockSize);
      }
    }) as BlockCipherMode;

    CBC.Decryptor = CBC.extend({
      processBlock(words: number[], offset: number): void {
        const cipher = this._cipher;
        const blockSize = cipher.blockSize;
        const prevBlock = words.slice(offset, offset + blockSize);

        cipher.decryptBlock(words, offset);
        xorBlock.call(this, words, offset, blockSize);
        this._prevBlock = prevBlock;
      }
    }) as BlockCipherMode;

    return CBC;
  })();

  const Pkcs7Padding = (CryptoJS.pad = {} as Record<string, Padding>).Pkcs7 = {
    pad(data: WordArray, blockSize: number): void {
      const blockSizeBytes = WORD_SIZE * blockSize;
      const paddingLength = blockSizeBytes - data.sigBytes % blockSizeBytes;
      const paddingWord = (paddingLength << 24) | (paddingLength << 16) | (paddingLength << 8) | paddingLength;
      const paddingWords: number[] = [];

      for (let i = 0; i < paddingLength; i += WORD_SIZE) {
        paddingWords.push(paddingWord);
      }

      const padding = WordArray.create(paddingWords, paddingLength);
      data.concat(padding);
    },

    unpad(data: WordArray): void {
      const paddingLength = data.words[(data.sigBytes - 1) >>> 2] & 0xff;
      data.sigBytes -= paddingLength;
    }
  };

  lib.BlockCipher = Cipher.extend({
    cfg: Cipher.cfg.extend({
      mode: CBCMode,
      padding: Pkcs7Padding
    }),

    reset(): void {
      Cipher.reset.call(this);

      const cfg = this.cfg;
      const iv = cfg.iv;
      const mode = cfg.mode;

      let modeCreator: (cipher: Cipher, iv?: number[]) => BlockCipherMode;

      if (this._xformMode === ENC_XFORM_MODE) {
        modeCreator = mode.createEncryptor;
      } else {
        modeCreator = mode.createDecryptor;
        this._minBufferSize = 1;
      }

      if (this._mode && this._mode.__creator === modeCreator) {
        this._mode.init(this, iv?.words);
      } else {
        this._mode = modeCreator.call(mode, this, iv?.words);
        this._mode.__creator = modeCreator;
      }
    },

    _doProcessBlock(words: number[], offset: number): void {
      this._mode.processBlock(words, offset);
    },

    _doFinalize(): WordArray {
      const padding = this.cfg.padding;
      let finalProcessedBlocks: WordArray;

      if (this._xformMode === ENC_XFORM_MODE) {
        padding.pad(this._data, this.blockSize);
        finalProcessedBlocks = this._process(true);
      } else {
        finalProcessedBlocks = this._process(true);
        padding.unpad(finalProcessedBlocks);
      }

      return finalProcessedBlocks;
    },

    blockSize: 4
  }) as Cipher;

  const CipherParams = lib.CipherParams = Base.extend({
    init(cipherParams: Partial<CipherParams>): void {
      this.mixIn(cipherParams);
    },

    toString(formatter?: Format): string {
      return (formatter || this.formatter).stringify(this);
    }
  }) as unknown as CipherParams;

  const OpenSSLFormatter = (CryptoJS.format = {} as Record<string, Format>).OpenSSL = {
    stringify(cipherParams: CipherParams): string {
      const ciphertext = cipherParams.ciphertext;
      const salt = cipherParams.salt;
      let result: WordArray;

      if (salt) {
        result = WordArray.create([SALTED_MAGIC_WORD_1, SALTED_MAGIC_WORD_2]).concat(salt).concat(ciphertext);
      } else {
        result = ciphertext;
      }

      return result.toString(Base64Encoder);
    },

    parse(ciphertextStr: string): CipherParams {
      const ciphertext = Base64Encoder.parse(ciphertextStr);
      const ciphertextWords = ciphertext.words;
      let salt: WordArray | undefined;

      if (ciphertextWords[0] === SALTED_MAGIC_WORD_1 && ciphertextWords[1] === SALTED_MAGIC_WORD_2) {
        salt = WordArray.create(ciphertextWords.slice(2, 4));
        ciphertextWords.splice(0, 4);
        ciphertext.sigBytes -= 16;
      }

      return CipherParams.create({
        ciphertext: ciphertext,
        salt: salt
      });
    }
  };

  const SerializableCipher = lib.SerializableCipher = Base.extend({
    cfg: Base.extend({
      format: OpenSSLFormatter
    }),

    encrypt(cipher: Cipher, message: string | WordArray, key: WordArray, cfg?: CipherConfig): CipherParams {
      cfg = this.cfg.extend(cfg);

      const encryptor = cipher.createEncryptor(key, cfg);
      const ciphertext = encryptor.finalize(message);
      const cipherCfg = encryptor.cfg;

      return CipherParams.create({
        ciphertext: ciphertext,
        key: key,
        iv: cipherCfg.iv,
        algorithm: cipher,
        mode: cipherCfg.mode,
        padding: cipherCfg.padding,
        blockSize: cipher.blockSize,
        formatter: cfg.format
      });
    },

    decrypt(cipher: Cipher, ciphertext: CipherParams | string, key: WordArray, cfg?: CipherConfig): WordArray {
      cfg = this.cfg.extend(cfg);
      ciphertext = this._parse(ciphertext, cfg.format);

      return cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);
    },

    _parse(data: CipherParams | string, format: Format): CipherParams {
      return typeof data === "string" ? format.parse(data, this) : data;
    }
  }) as SerializableCipher;

  const OpenSSLKDF = (CryptoJS.kdf = {} as Record<string, KDF>).OpenSSL = {
    execute(password: string | WordArray, keySize: number, ivSize: number, salt?: WordArray): CipherParams {
      if (!salt) {
        salt = WordArray.random(8);
      }

      const key = EvpKDF.create({
        keySize: keySize + ivSize
      }).compute(password, salt);

      const iv = WordArray.create(key.words.slice(keySize), WORD_SIZE * ivSize);
      key.sigBytes = WORD_SIZE * keySize;

      return CipherParams.create({
        key: key,
        iv: iv,
        salt: salt
      });
    }
  };

  const PasswordBasedCipher = lib.PasswordBasedCipher = SerializableCipher.extend({
    cfg: SerializableCipher.cfg.extend({
      kdf: OpenSSLKDF
    }),

    encrypt(cipher: Cipher, message: string | WordArray, password: string, cfg?: CipherConfig): CipherParams {
      cfg = this.cfg.extend(cfg);

      const derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);
      cfg.iv = derivedParams.iv;

      const ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);
      ciphertext.mixIn(derivedParams);

      return ciphertext;
    },

    decrypt(cipher: Cipher, ciphertext: CipherParams | string, password: string, cfg?: CipherConfig): WordArray {
      cfg = this.cfg.extend(cfg);
      ciphertext = this._parse(ciphertext, cfg.format);

      const derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);
      cfg.iv = derivedParams.iv;

      return SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);
    }
  }) as PasswordBasedCipher;
}

export function initializeCryptoJS(CryptoJS: CryptoLib): CryptoLib {
  initializeCipher(CryptoJS);
  return CryptoJS;
}