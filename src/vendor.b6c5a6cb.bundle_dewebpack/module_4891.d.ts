/**
 * CryptoJS RabbitLegacy 流加密算法类型定义
 * 
 * RabbitLegacy 是 Rabbit 流加密算法的传统版本实现，
 * 使用 128 位密钥和可选的 64 位初始化向量（IV）。
 * 
 * @module RabbitLegacy
 */

declare module 'crypto-js' {
  namespace lib {
    /**
     * 流加密算法基类
     */
    interface StreamCipher extends BlockCipher {
      /** 块大小（32位字） */
      blockSize: number;
      /** 初始化向量大小（32位字） */
      ivSize: number;
    }
  }

  namespace algo {
    /**
     * RabbitLegacy 算法配置选项
     */
    interface RabbitLegacyConfig extends CipherOption {
      /** 初始化向量（64位 / 2个32位字） */
      iv?: lib.WordArray;
    }

    /**
     * RabbitLegacy 流加密算法实现
     * 
     * 基于 Rabbit 算法的传统版本，提供快速的流加密功能。
     * 使用 8 个 32 位状态变量和 8 个 32 位计数器。
     * 
     * @example
     *