/**
 * 解密模块配置接口
 */
interface DecryptConfig {
  /** 密钥派生函数 */
  kdf: KeyDerivationFunction;
  /** 初始化向量 */
  iv?: Uint8Array | null;
  /** 数据格式化器 */
  format: DataFormatter;
}

/**
 * 密钥派生函数接口
 */
interface KeyDerivationFunction {
  /**
   * 执行密钥派生
   * @param password - 密码
   * @param keySize - 密钥大小（字节）
   * @param ivSize - 初始化向量大小（字节）
   * @param salt - 盐值
   * @returns 派生的密钥和IV
   */
  execute(
    password: string | Uint8Array,
    keySize: number,
    ivSize: number,
    salt?: Uint8Array | null
  ): KeyDerivationResult;
}

/**
 * 密钥派生结果
 */
interface KeyDerivationResult {
  /** 派生的密钥 */
  key: Uint8Array;
  /** 派生的初始化向量 */
  iv: Uint8Array;
}

/**
 * 数据格式化器接口
 */
interface DataFormatter {
  /**
   * 解析加密数据
   * @param ciphertext - 密文
   * @returns 解析后的密文对象
   */
  parse(ciphertext: string | Uint8Array): CipherParams;
  
  /**
   * 格式化密文对象
   * @param cipherParams - 密文参数
   * @returns 格式化后的字符串
   */
  stringify(cipherParams: CipherParams): string;
}

/**
 * 密文参数接口
 */
interface CipherParams {
  /** 密文数据 */
  ciphertext: Uint8Array;
  /** 盐值（可选） */
  salt?: Uint8Array | null;
  /** 初始化向量（可选） */
  iv?: Uint8Array | null;
  /** 算法名称（可选） */
  algorithm?: string;
}

/**
 * 加密算法接口
 */
interface CipherAlgorithm {
  /** 密钥大小（字节） */
  keySize: number;
  /** 初始化向量大小（字节） */
  ivSize: number;
}

/**
 * 解密器配置扩展接口
 */
interface ConfigExtendable {
  /**
   * 扩展配置
   * @param config - 要合并的配置
   * @returns 扩展后的配置
   */
  extend(config: Partial<DecryptConfig>): DecryptConfig;
}

/**
 * 解密器上下文接口
 */
interface DecryptorContext {
  /** 配置对象 */
  cfg: ConfigExtendable;
  
  /**
   * 解析密文数据
   * @param data - 原始数据
   * @param formatter - 数据格式化器
   * @returns 解析后的密文参数
   */
  _parse(data: string | Uint8Array, formatter: DataFormatter): CipherParams;
}

/**
 * 底层解密方法接口
 */
interface CoreDecryptor {
  /**
   * 执行解密操作
   * @param algorithm - 加密算法
   * @param cipherParams - 密文参数
   * @param key - 解密密钥
   * @param config - 解密配置
   * @returns 解密后的明文
   */
  decrypt(
    algorithm: CipherAlgorithm,
    cipherParams: CipherParams,
    key: Uint8Array,
    config: DecryptConfig
  ): Uint8Array | string;
}

/**
 * 解密函数
 * @param this - 解密器上下文
 * @param algorithm - 加密算法实例
 * @param ciphertext - 密文数据
 * @param password - 解密密码
 * @param config - 解密配置（可选）
 * @returns 解密后的明文数据
 */
declare function decrypt(
  this: DecryptorContext,
  algorithm: CipherAlgorithm,
  ciphertext: string | Uint8Array,
  password: string | Uint8Array,
  config?: Partial<DecryptConfig>
): Uint8Array | string;