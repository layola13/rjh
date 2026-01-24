/**
 * CryptoJS UTF-16 编码器模块
 * 提供 UTF-16 BE（大端）和 UTF-16 LE（小端）编码/解码功能
 */

declare module 'crypto-js/enc-utf16' {
  import { lib, enc } from 'crypto-js';

  /**
   * 字节数组，CryptoJS 核心数据结构
   */
  export interface WordArray {
    /** 32位字数组 */
    words: number[];
    /** 有效字节数 */
    sigBytes: number;
  }

  /**
   * 编码器接口
   */
  export interface Encoder {
    /**
     * 将 WordArray 转换为字符串
     * @param wordArray - 要转换的字节数组
     * @returns 编码后的字符串
     */
    stringify(wordArray: WordArray): string;

    /**
     * 将字符串解析为 WordArray
     * @param str - 要解析的字符串
     * @returns 解析后的字节数组
     */
    parse(str: string): WordArray;
  }

  /**
   * UTF-16 大端序编码器（Big Endian）
   * 默认的 UTF-16 编码方式
   */
  export const Utf16BE: Encoder;

  /**
   * UTF-16 编码器（默认为大端序）
   * 别名：Utf16BE
   */
  export const Utf16: Encoder;

  /**
   * UTF-16 小端序编码器（Little Endian）
   */
  export const Utf16LE: Encoder;

  /**
   * 编码命名空间扩展
   */
  export interface EncStatic {
    /** UTF-16 大端序编码器 */
    Utf16BE: Encoder;
    /** UTF-16 编码器（默认大端序） */
    Utf16: Encoder;
    /** UTF-16 小端序编码器 */
    Utf16LE: Encoder;
  }
}

declare module 'crypto-js' {
  export namespace enc {
    /**
     * UTF-16 大端序编码器
     * 高字节在前，低字节在后
     */
    const Utf16BE: {
      stringify(wordArray: lib.WordArray): string;
      parse(str: string): lib.WordArray;
    };

    /**
     * UTF-16 编码器（默认大端序）
     */
    const Utf16: {
      stringify(wordArray: lib.WordArray): string;
      parse(str: string): lib.WordArray;
    };

    /**
     * UTF-16 小端序编码器
     * 低字节在前，高字节在后
     */
    const Utf16LE: {
      stringify(wordArray: lib.WordArray): string;
      parse(str: string): lib.WordArray;
    };
  }
}

export {};