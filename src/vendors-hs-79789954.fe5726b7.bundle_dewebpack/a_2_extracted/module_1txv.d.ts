/**
 * IEEE 754 浮点数读写工具模块
 * 用于在字节数组中读写符合 IEEE 754 标准的浮点数
 */

/**
 * 从字节数组中读取 IEEE 754 浮点数
 * 
 * @param buffer - 源字节数组
 * @param offset - 读取起始偏移量
 * @param isLittleEndian - 是否为小端字节序
 * @param mantissaBits - 尾数位数
 * @param totalBytes - 总字节数
 * @returns 解析后的浮点数值
 * 
 * @example
 * // 读取 32 位浮点数 (Float32)
 * const value = read(buffer, 0, true, 23, 4);
 * 
 * @example
 * // 读取 64 位浮点数 (Float64)
 * const value = read(buffer, 0, true, 52, 8);
 */
export function read(
  buffer: number[] | Uint8Array,
  offset: number,
  isLittleEndian: boolean,
  mantissaBits: number,
  totalBytes: number
): number {
  let exponent: number;
  let mantissa: number;
  
  const exponentBits = 8 * totalBytes - mantissaBits - 1;
  const exponentMax = (1 << exponentBits) - 1;
  const exponentBias = exponentMax >> 1;
  
  let bitShift = -7;
  let byteIndex = isLittleEndian ? totalBytes - 1 : 0;
  const indexStep = isLittleEndian ? -1 : 1;
  
  let currentByte = buffer[offset + byteIndex];
  
  // 提取指数部分
  byteIndex += indexStep;
  exponent = currentByte & ((1 << -bitShift) - 1);
  currentByte >>= -bitShift;
  bitShift += exponentBits;
  
  while (bitShift > 0) {
    exponent = 256 * exponent + buffer[offset + byteIndex];
    byteIndex += indexStep;
    bitShift -= 8;
  }
  
  // 提取尾数部分
  mantissa = exponent & ((1 << -bitShift) - 1);
  exponent >>= -bitShift;
  bitShift += mantissaBits;
  
  while (bitShift > 0) {
    mantissa = 256 * mantissa + buffer[offset + byteIndex];
    byteIndex += indexStep;
    bitShift -= 8;
  }
  
  // 处理特殊值
  if (exponent === 0) {
    // 非规格化数
    exponent = 1 - exponentBias;
  } else if (exponent === exponentMax) {
    // 无穷大或 NaN
    return mantissa ? NaN : Infinity * (currentByte ? -1 : 1);
  } else {
    // 规格化数
    mantissa += Math.pow(2, mantissaBits);
    exponent -= exponentBias;
  }
  
  return (currentByte ? -1 : 1) * mantissa * Math.pow(2, exponent - mantissaBits);
}

/**
 * 将浮点数写入字节数组（遵循 IEEE 754 标准）
 * 
 * @param buffer - 目标字节数组
 * @param value - 要写入的浮点数值
 * @param offset - 写入起始偏移量
 * @param isLittleEndian - 是否为小端字节序
 * @param mantissaBits - 尾数位数
 * @param totalBytes - 总字节数
 * 
 * @example
 * // 写入 32 位浮点数
 * const buffer = new Uint8Array(4);
 * write(buffer, 3.14, 0, true, 23, 4);
 * 
 * @example
 * // 写入 64 位浮点数
 * const buffer = new Uint8Array(8);
 * write(buffer, 3.141592653589793, 0, true, 52, 8);
 */
export function write(
  buffer: number[] | Uint8Array,
  value: number,
  offset: number,
  isLittleEndian: boolean,
  mantissaBits: number,
  totalBytes: number
): void {
  let exponent: number;
  let mantissa: number;
  let roundingError: number;
  
  const exponentBits = 8 * totalBytes - mantissaBits - 1;
  const exponentMax = (1 << exponentBits) - 1;
  const exponentBias = exponentMax >> 1;
  
  // 计算舍入误差（用于精度调整）
  const FLOAT32_ROUNDING = 23 === mantissaBits 
    ? Math.pow(2, -24) - Math.pow(2, -77) 
    : 0;
  
  let byteIndex = isLittleEndian ? 0 : totalBytes - 1;
  const indexStep = isLittleEndian ? 1 : -1;
  
  // 提取符号位
  const signBit = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;
  
  value = Math.abs(value);
  
  // 处理特殊值和正常值
  if (isNaN(value) || value === Infinity) {
    mantissa = isNaN(value) ? 1 : 0;
    exponent = exponentMax;
  } else {
    // 计算指数
    exponent = Math.floor(Math.log(value) / Math.LN2);
    roundingError = Math.pow(2, -exponent);
    
    if (value * roundingError < 1) {
      exponent--;
      roundingError *= 2;
    }
    
    // 应用舍入误差
    if (exponent + exponentBias >= 1) {
      value += FLOAT32_ROUNDING / roundingError;
    } else {
      value += FLOAT32_ROUNDING * Math.pow(2, 1 - exponentBias);
    }
    
    if (value * roundingError >= 2) {
      exponent++;
      roundingError /= 2;
    }
    
    // 计算最终的指数和尾数
    if (exponent + exponentBias >= exponentMax) {
      // 溢出：表示为无穷大
      mantissa = 0;
      exponent = exponentMax;
    } else if (exponent + exponentBias >= 1) {
      // 规格化数
      mantissa = (value * roundingError - 1) * Math.pow(2, mantissaBits);
      exponent += exponentBias;
    } else {
      // 非规格化数
      mantissa = value * Math.pow(2, exponentBias - 1) * Math.pow(2, mantissaBits);
      exponent = 0;
    }
  }
  
  // 写入尾数字节
  let remainingMantissaBits = mantissaBits;
  while (remainingMantissaBits >= 8) {
    buffer[offset + byteIndex] = mantissa & 0xff;
    byteIndex += indexStep;
    mantissa /= 256;
    remainingMantissaBits -= 8;
  }
  
  // 合并指数和剩余尾数
  exponent = (exponent << remainingMantissaBits) | mantissa;
  let remainingExponentBits = exponentBits + remainingMantissaBits;
  
  // 写入指数字节
  while (remainingExponentBits > 0) {
    buffer[offset + byteIndex] = exponent & 0xff;
    byteIndex += indexStep;
    exponent /= 256;
    remainingExponentBits -= 8;
  }
  
  // 写入符号位
  buffer[offset + byteIndex - indexStep] |= signBit * 128;
}