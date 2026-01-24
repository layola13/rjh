/**
 * UUID v7 生成器
 * 
 * UUID v7 使用时间戳和随机数生成，格式如下：
 * - 时间戳（48位）：毫秒级Unix时间戳
 * - 序列号（12位）：单调递增的序列计数器
 * - 随机数（42位）：加密安全的随机数
 * - 版本号（4位）：固定为7
 * - 变体（2位）：RFC 4122变体
 */

import { unsafeStringify } from './stringify';
import rng from './rng';

/**
 * UUID v7 生成选项
 */
interface UUIDv7Options {
  /**
   * 随机数生成器，返回16字节的随机数组
   */
  random?: Uint8Array;
  
  /**
   * 随机数生成函数（fallback）
   */
  rng?: () => Uint8Array;
  
  /**
   * 自定义时间戳（毫秒）
   * @default Date.now()
   */
  msecs?: number;
  
  /**
   * 自定义序列号（用于时间戳相同时保证单调递增）
   * @default null（自动生成）
   */
  seq?: number | null;
}

/**
 * 上次生成UUID的时间戳（毫秒）
 */
let lastTimestamp: number | null = null;

/**
 * 上次生成UUID的序列号（12位，范围0-4095）
 */
let lastSequenceHigh: number | null = null;

/**
 * 上次生成UUID的随机数部分（19位，范围0-524287）
 */
let lastSequenceLow: number | null = null;

/**
 * 当前时间戳的基准值，用于检测时钟回拨
 */
let timestampBase = 0;

/**
 * 时间戳最大增量阈值（10秒）
 */
const MAX_TIMESTAMP_INCREMENT = 10000;

/**
 * 序列号低位最大值（2^19 - 1）
 */
const MAX_SEQUENCE_LOW = 524287;

/**
 * 序列号高位最大值（2^12 - 1）
 */
const MAX_SEQUENCE_HIGH = 4095;

/**
 * 序列号高位最大值（用于截断超出范围的输入）
 */
const MAX_SEQ_INPUT = 2147483647;

/**
 * 生成UUID v7
 * 
 * @param options - 生成选项
 * @param buffer - 可选的输出缓冲区（16字节）
 * @param offset - 缓冲区写入起始偏移量
 * @returns 返回UUID字符串（无buffer）或传入的buffer
 * 
 * @example
 *