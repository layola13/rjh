/**
 * 加密密钥派生结果接口
 * @description KDF (Key Derivation Function) 执行后的返回结果
 */
interface KdfResult {
  /** 派生的加密密钥 */
  key: WordArray;
  /** 初始化向量 (Initialization Vector) */
  iv: WordArray;
  /** 使用的盐值 */
  salt?: WordArray;
}

/**
 * 密码器配置接口
 * @description 用于配置加密/解密操作的参数
 */
interface CipherConfig {
  /** 密钥派生函数 */
  kdf: KeyDerivationFunction;
  /** 初始化向量 */
  iv?: WordArray;
  /** 填充方案 */
  padding?: Padding;
  /** 加密模式 */
  mode?: Mode;
  /** 格式化器 */
  format?: Format;
  [key: string]: unknown;
}

/**
 * 密钥派生函数接口
 * @description 负责从密码生成加密密钥
 */
interface KeyDerivationFunction {
  /**
   * 执行密钥派生
   * @param password - 原始密码/密钥材料
   * @param keySize - 密钥大小(以32位字为单位)
   * @param ivSize - 初始化向量大小(以32位字为单位)
   * @param salt - 可选的盐值
   * @returns 包含派生密钥和IV的对象
   */
  execute(
    password: string | WordArray,
    keySize: number,
    ivSize: number,
    salt?: WordArray
  ): KdfResult;
}

/**
 * 密码器参数接口
 * @description 定义密码算法的基本参数
 */
interface CipherParams {
  /** 密钥大小(以32位字为单位) */
  keySize: number;
  /** 初始化向量大小(以32位字为单位) */
  ivSize: number;
  /** 块大小(以32位字为单位) */
  blockSize?: number;
}

/**
 * 加密结果接口
 * @description 加密操作返回的密文对象
 */
interface CipherResult {
  /**
   * 混入其他对象的属性
   * @param source - 要混入的源对象
   * @returns 当前对象(支持链式调用)
   */
  mixIn(source: Partial<KdfResult>): this;
  
  /** 密文数据 */
  ciphertext: WordArray;
  /** 使用的密钥 */
  key?: WordArray;
  /** 使用的初始化向量 */
  iv?: WordArray;
  /** 使用的盐值 */
  salt?: WordArray;
  /** 算法名称 */
  algorithm?: string;
  /** 加密模式 */
  mode?: Mode;
  /** 填充方案 */
  padding?: Padding;
  /** 块大小 */
  blockSize?: number;
  /** 格式化器 */
  formatter?: Format;
}

/**
 * 字节数组包装类
 * @description 表示加密库中的字节序列
 */
interface WordArray {
  /** 32位字数组 */
  words: number[];
  /** 有效字节数 */
  sigBytes: number;
}

/**
 * 填充方案接口
 */
interface Padding {
  pad(data: WordArray, blockSize: number): void;
  unpad(data: WordArray): void;
}

/**
 * 加密模式接口
 */
interface Mode {
  Encryptor: unknown;
  Decryptor: unknown;
}

/**
 * 格式化器接口
 */
interface Format {
  stringify(cipherParams: CipherResult): string;
  parse(str: string): CipherResult;
}

/**
 * 基础密码器接口
 * @description 定义加密操作的基础方法
 */
interface BaseCipher {
  /**
   * 加密数据
   * @param cipherParams - 密码器参数(算法配置)
   * @param message - 要加密的消息
   * @param key - 加密密钥
   * @param config - 加密配置选项
   * @returns 加密结果对象
   */
  encrypt(
    cipherParams: CipherParams,
    message: string | WordArray,
    key: WordArray,
    config?: Partial<CipherConfig>
  ): CipherResult;
}

/**
 * 加密器配置扩展接口
 */
interface ConfigExtendable {
  /**
   * 扩展配置对象
   * @param config - 要扩展的配置
   * @returns 扩展后的新配置对象
   */
  extend(config?: Partial<CipherConfig>): CipherConfig;
}

/**
 * 模块加密函数
 * @description 使用密钥派生函数执行加密操作
 * 
 * @param this - 当前密码器上下文,包含cfg配置对象
 * @param cipherParams - 密码器参数(包含keySize和ivSize)
 * @param message - 要加密的消息(字符串或WordArray)
 * @param password - 密码或密钥材料
 * @param options - 可选的加密配置参数
 * 
 * @returns 加密结果,包含密文以及混入的KDF派生参数(key, iv, salt等)
 * 
 * @example
 *