/**
 * CryptoJS CTR (Counter) 加密模式模块
 * CTR模式是一种流密码模式，通过加密计数器值来生成密钥流
 */

declare module 'crypto-js/mode-ctr' {
  import { BlockCipherMode, BlockCipher, WordArray } from 'crypto-js';

  export interface CTRModeEncryptor {
    /**
     * 处理数据块的方法
     * @param words - 要处理的数据字数组
     * @param offset - 数组中的起始偏移量
     */
    processBlock(words: number[], offset: number): void;

    /**
     * 当前使用的密码器实例
     * @internal
     */
    readonly _cipher: BlockCipher;

    /**
     * 初始化向量（IV）
     * 仅在首次处理块时使用，之后会被清除
     * @internal
     */
    _iv?: WordArray;

    /**
     * 计数器
     * 用于CTR模式的计数器，每处理一个块后递增
     * @internal
     */
    _counter?: WordArray;
  }

  export interface CTRModeDecryptor extends CTRModeEncryptor {
    // CTR模式的解密器与加密器使用相同的逻辑
  }

  /**
   * CTR (Counter) 加密模式
   * 
   * CTR模式将块密码转换为流密码，通过加密递增的计数器值来生成密钥流。
   * 每个块的计数器值都会被加密，然后与明文进行异或操作。
   * 
   * 特点：
   * - 加密和解密使用相同的操作
   * - 支持随机访问
   * - 可并行处理
   * - 不需要填充
   * 
   * @example
   *