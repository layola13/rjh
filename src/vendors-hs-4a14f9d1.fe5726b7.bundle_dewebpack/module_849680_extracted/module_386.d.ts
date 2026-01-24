/**
 * MD5哈希算法的TypeScript类型定义
 * 支持多种输出格式和HMAC模式
 */

/**
 * 支持的输入类型
 */
type HashInput = string | number[] | Uint8Array | ArrayBuffer;

/**
 * 支持的输出格式类型
 */
type OutputFormat = 'hex' | 'array' | 'digest' | 'buffer' | 'arrayBuffer' | 'base64';

/**
 * MD5哈希结果（数组格式）
 */
type MD5Array = number[];

/**
 * MD5实例接口
 */
interface MD5Instance {
  /**
   * 更新哈希数据
   * @param input - 要哈希的数据
   * @returns 当前实例（支持链式调用）
   */
  update(input: HashInput): this;

  /**
   * 完成哈希计算并返回十六进制字符串
   * @returns 32字符的十六进制MD5哈希值
   */
  hex(): string;

  /**
   * 完成哈希计算并返回十六进制字符串（hex的别名）
   * @returns 32字符的十六进制MD5哈希值
   */
  toString(): string;

  /**
   * 完成哈希计算并返回字节数组
   * @returns 16字节的数组
   */
  digest(): MD5Array;

  /**
   * 完成哈希计算并返回字节数组（digest的别名）
   * @returns 16字节的数组
   */
  array(): MD5Array;

  /**
   * 完成哈希计算并返回ArrayBuffer
   * @returns 16字节的ArrayBuffer
   */
  arrayBuffer(): ArrayBuffer;

  /**
   * 完成哈希计算并返回ArrayBuffer（arrayBuffer的别名）
   * @returns 16字节的ArrayBuffer
   */
  buffer(): ArrayBuffer;

  /**
   * 完成哈希计算并返回Base64编码字符串
   * @returns Base64编码的哈希值
   */
  base64(): string;
}

/**
 * HMAC-MD5实例接口
 * 扩展自MD5Instance，支持带密钥的消息认证码
 */
interface HMACMD5Instance extends MD5Instance {}

/**
 * MD5哈希函数签名
 */
interface MD5HashFunction {
  /**
   * 计算输入数据的MD5哈希值（返回十六进制字符串）
   * @param input - 要哈希的数据
   * @returns 32字符的十六进制MD5哈希值
   */
  (input: HashInput): string;

  /**
   * 创建新的MD5实例
   * @returns MD5实例
   */
  create(): MD5Instance;

  /**
   * 创建MD5实例并更新数据（便捷方法）
   * @param input - 要哈希的数据
   * @returns MD5实例
   */
  update(input: HashInput): MD5Instance;

  /**
   * 计算并返回十六进制格式
   * @param input - 要哈希的数据
   * @returns 32字符的十六进制MD5哈希值
   */
  hex(input: HashInput): string;

  /**
   * 计算并返回字节数组
   * @param input - 要哈希的数据
   * @returns 16字节的数组
   */
  array(input: HashInput): MD5Array;

  /**
   * 计算并返回字节数组（array的别名）
   * @param input - 要哈希的数据
   * @returns 16字节的数组
   */
  digest(input: HashInput): MD5Array;

  /**
   * 计算并返回ArrayBuffer
   * @param input - 要哈希的数据
   * @returns 16字节的ArrayBuffer
   */
  buffer(input: HashInput): ArrayBuffer;

  /**
   * 计算并返回ArrayBuffer（buffer的别名）
   * @param input - 要哈希的数据
   * @returns 16字节的ArrayBuffer
   */
  arrayBuffer(input: HashInput): ArrayBuffer;

  /**
   * 计算并返回Base64编码字符串
   * @param input - 要哈希的数据
   * @returns Base64编码的哈希值
   */
  base64(input: HashInput): string;
}

/**
 * HMAC-MD5函数签名
 */
interface HMACMD5Function {
  /**
   * 计算HMAC-MD5值（返回十六进制字符串）
   * @param key - HMAC密钥
   * @param message - 要认证的消息
   * @returns 32字符的十六进制HMAC-MD5值
   */
  (key: HashInput, message: HashInput): string;

  /**
   * 创建新的HMAC-MD5实例
   * @param key - HMAC密钥
   * @returns HMAC-MD5实例
   */
  create(key: HashInput): HMACMD5Instance;

  /**
   * 创建HMAC-MD5实例并更新消息（便捷方法）
   * @param key - HMAC密钥
   * @param message - 要认证的消息
   * @returns HMAC-MD5实例
   */
  update(key: HashInput, message: HashInput): HMACMD5Instance;

  /**
   * 计算并返回十六进制格式
   * @param key - HMAC密钥
   * @param message - 要认证的消息
   * @returns 32字符的十六进制HMAC-MD5值
   */
  hex(key: HashInput, message: HashInput): string;

  /**
   * 计算并返回字节数组
   * @param key - HMAC密钥
   * @param message - 要认证的消息
   * @returns 16字节的数组
   */
  array(key: HashInput, message: HashInput): MD5Array;

  /**
   * 计算并返回字节数组（array的别名）
   * @param key - HMAC密钥
   * @param message - 要认证的消息
   * @returns 16字节的数组
   */
  digest(key: HashInput, message: HashInput): MD5Array;

  /**
   * 计算并返回ArrayBuffer
   * @param key - HMAC密钥
   * @param message - 要认证的消息
   * @returns 16字节的ArrayBuffer
   */
  buffer(key: HashInput, message: HashInput): ArrayBuffer;

  /**
   * 计算并返回ArrayBuffer（buffer的别名）
   * @param key - HMAC密钥
   * @param message - 要认证的消息
   * @returns 16字节的ArrayBuffer
   */
  arrayBuffer(key: HashInput, message: HashInput): ArrayBuffer;

  /**
   * 计算并返回Base64编码字符串
   * @param key - HMAC密钥
   * @param message - 要认证的消息
   * @returns Base64编码的HMAC-MD5值
   */
  base64(key: HashInput, message: HashInput): string;
}

/**
 * MD5模块主接口
 */
interface MD5Module extends MD5HashFunction {
  /**
   * MD5哈希函数（与模块本身相同）
   */
  md5: MD5HashFunction;

  /**
   * HMAC-MD5命名空间
   */
  hmac: HMACMD5Function;
}

/**
 * MD5哈希算法模块
 * 
 * @example
 *