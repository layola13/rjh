/**
 * MD5 哈希算法实现
 * 基于 CryptoJS 库的 MD5 算法
 */

/**
 * WordArray 类型 - 表示一个32位字的数组
 */
interface WordArray {
  /** 32位整数数组 */
  words: number[];
  /** 有效字节数 */
  sigBytes: number;
  /** 初始化方法 */
  init(words: number[]): WordArray;
  /** 克隆方法 */
  clone(): WordArray;
}

/**
 * Hasher 基类接口
 */
interface Hasher {
  /** 数据缓冲区 */
  _data: WordArray;
  /** 已处理的字节数 */
  _nDataBytes: number;
  /** 哈希值 */
  _hash: WordArray;
  /** 重置哈希状态 */
  _doReset(): void;
  /** 处理数据块 */
  _doProcessBlock(words: number[], offset: number): void;
  /** 完成哈希计算 */
  _doFinalize(): WordArray;
  /** 处理数据 */
  _process(): void;
  /** 克隆实例 */
  clone(): this;
  /** 扩展类 */
  extend(overrides: Partial<Hasher>): typeof MD5Hasher;
}

/**
 * MD5 哈希器类
 */
declare class MD5Hasher implements Hasher {
  _data: WordArray;
  _nDataBytes: number;
  _hash: WordArray;

  /**
   * 重置哈希状态，初始化 MD5 的初始向量
   * IV: [0x67452301, 0xEFCDAB89, 0x98BADCFE, 0x10325476]
   */
  _doReset(): void;

  /**
   * 处理一个 512 位(16个32位字)的数据块
   * @param words - 数据字数组
   * @param offset - 当前处理块的偏移量
   */
  _doProcessBlock(words: number[], offset: number): void;

  /**
   * 完成哈希计算，添加填充和长度信息
   * @returns 计算得到的 MD5 哈希值
   */
  _doFinalize(): WordArray;

  /**
   * 克隆当前哈希器实例
   * @returns 新的哈希器实例
   */
  clone(): MD5Hasher;

  _process(): void;
}

/**
 * CryptoJS 库结构
 */
interface CryptoJS {
  lib: {
    WordArray: WordArray;
    Hasher: Hasher;
  };
  algo: {
    MD5: typeof MD5Hasher;
  };
  /**
   * 计算 MD5 哈希值的便捷方法
   * @param message - 要哈希的消息
   * @returns MD5 哈希值
   */
  MD5(message: string | WordArray): WordArray;
  /**
   * 计算 HMAC-MD5 的便捷方法
   * @param message - 要哈希的消息
   * @param key - HMAC 密钥
   * @returns HMAC-MD5 值
   */
  HmacMD5(message: string | WordArray, key: string | WordArray): WordArray;
}

/**
 * MD5 算法中使用的正弦表常量
 * T[i] = floor(2^32 * abs(sin(i))), i 从 1 到 64
 */
declare const SINE_TABLE: ReadonlyArray<number>;

/**
 * MD5 轮函数 F: (b & c) | (~b & d)
 * @param a - 累加器
 * @param b - 第一个操作数
 * @param c - 第二个操作数
 * @param d - 第三个操作数
 * @param x - 消息分组
 * @param s - 循环左移位数
 * @param t - 加法常数(正弦表值)
 * @returns 轮函数计算结果
 */
declare function roundF(
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number
): number;

/**
 * MD5 轮函数 G: (b & d) | (c & ~d)
 * @param a - 累加器
 * @param b - 第一个操作数
 * @param c - 第二个操作数
 * @param d - 第三个操作数
 * @param x - 消息分组
 * @param s - 循环左移位数
 * @param t - 加法常数(正弦表值)
 * @returns 轮函数计算结果
 */
declare function roundG(
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number
): number;

/**
 * MD5 轮函数 H: b ^ c ^ d
 * @param a - 累加器
 * @param b - 第一个操作数
 * @param c - 第二个操作数
 * @param d - 第三个操作数
 * @param x - 消息分组
 * @param s - 循环左移位数
 * @param t - 加法常数(正弦表值)
 * @returns 轮函数计算结果
 */
declare function roundH(
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number
): number;

/**
 * MD5 轮函数 I: c ^ (b | ~d)
 * @param a - 累加器
 * @param b - 第一个操作数
 * @param c - 第二个操作数
 * @param d - 第三个操作数
 * @param x - 消息分组
 * @param s - 循环左移位数
 * @param t - 加法常数(正弦表值)
 * @returns 轮函数计算结果
 */
declare function roundI(
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  s: number,
  t: number
): number;

export { MD5Hasher, CryptoJS, WordArray, Hasher };
export default CryptoJS;