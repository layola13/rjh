/**
 * UTF-8 字符串编解码工具模块
 * 提供字符串与 Uint8Array 之间的相互转换功能
 */

/** 检测是否支持快速字符串转换（String.fromCharCode.apply with typed arrays） */
let supportsFastStringConversion = true;
try {
  String.fromCharCode.apply(null, new Uint8Array(1) as unknown as number[]);
} catch {
  supportsFastStringConversion = false;
}

/** UTF-8 字节序列长度查找表：根据首字节确定该字符的字节长度 */
const UTF8_BYTE_LENGTH_TABLE = new Uint8Array(256);
for (let byteValue = 0; byteValue < 256; byteValue++) {
  UTF8_BYTE_LENGTH_TABLE[byteValue] =
    byteValue >= 252 ? 6 :
    byteValue >= 248 ? 5 :
    byteValue >= 240 ? 4 :
    byteValue >= 224 ? 3 :
    byteValue >= 192 ? 2 : 1;
}
// 修正无效字节标记
UTF8_BYTE_LENGTH_TABLE[254] = 1;
UTF8_BYTE_LENGTH_TABLE[255] = 1;

/** 高代理对（High Surrogate）掩码 */
const HIGH_SURROGATE_MASK = 0xFC00;
/** 高代理对起始值 */
const HIGH_SURROGATE_START = 0xD800;
/** 低代理对（Low Surrogate）起始值 */
const LOW_SURROGATE_START = 0xDC00;
/** Unicode 补充平面起始值 */
const SUPPLEMENTARY_PLANE_OFFSET = 0x10000;
/** 代理对偏移量 */
const SURROGATE_OFFSET = 0x10000;

/** UTF-8 单字节字符最大码点 */
const UTF8_1_BYTE_MAX = 128;
/** UTF-8 双字节字符最大码点 */
const UTF8_2_BYTE_MAX = 2048;
/** UTF-8 三字节字符最大码点 */
const UTF8_3_BYTE_MAX = 65536;

/** Unicode 替换字符（用于表示解码错误） */
const REPLACEMENT_CHAR = 0xFFFD;
/** 基本多文种平面最大码点 */
const BMP_MAX = 65536;

/**
 * 将 JavaScript 字符串编码为 UTF-8 字节数组
 * @param input - 要编码的字符串
 * @returns UTF-8 编码的字节数组
 */
export function string2buf(input: string): Uint8Array {
  // 优先使用原生 TextEncoder API
  if (typeof TextEncoder === 'function' && TextEncoder.prototype.encode) {
    return new TextEncoder().encode(input);
  }

  const length = input.length;
  let byteLength = 0;
  let codePoint: number;
  let nextCharCode: number;

  // 第一遍：计算所需字节长度
  for (let i = 0; i < length; i++) {
    codePoint = input.charCodeAt(i);

    // 处理 UTF-16 代理对（Surrogate Pairs）
    if ((codePoint & HIGH_SURROGATE_MASK) === HIGH_SURROGATE_START && i + 1 < length) {
      nextCharCode = input.charCodeAt(i + 1);
      if ((nextCharCode & HIGH_SURROGATE_MASK) === LOW_SURROGATE_START) {
        codePoint = SURROGATE_OFFSET + ((codePoint - HIGH_SURROGATE_START) << 10) + (nextCharCode - LOW_SURROGATE_START);
        i++;
      }
    }

    byteLength += codePoint < UTF8_1_BYTE_MAX ? 1 :
                  codePoint < UTF8_2_BYTE_MAX ? 2 :
                  codePoint < UTF8_3_BYTE_MAX ? 3 : 4;
  }

  // 第二遍：实际编码
  const buffer = new Uint8Array(byteLength);
  let bufferIndex = 0;

  for (let i = 0; i < length; i++) {
    codePoint = input.charCodeAt(i);

    // 再次处理代理对
    if ((codePoint & HIGH_SURROGATE_MASK) === HIGH_SURROGATE_START && i + 1 < length) {
      nextCharCode = input.charCodeAt(i + 1);
      if ((nextCharCode & HIGH_SURROGATE_MASK) === LOW_SURROGATE_START) {
        codePoint = SURROGATE_OFFSET + ((codePoint - HIGH_SURROGATE_START) << 10) + (nextCharCode - LOW_SURROGATE_START);
        i++;
      }
    }

    if (codePoint < UTF8_1_BYTE_MAX) {
      buffer[bufferIndex++] = codePoint;
    } else if (codePoint < UTF8_2_BYTE_MAX) {
      buffer[bufferIndex++] = 0xC0 | (codePoint >>> 6);
      buffer[bufferIndex++] = 0x80 | (codePoint & 0x3F);
    } else if (codePoint < UTF8_3_BYTE_MAX) {
      buffer[bufferIndex++] = 0xE0 | (codePoint >>> 12);
      buffer[bufferIndex++] = 0x80 | ((codePoint >>> 6) & 0x3F);
      buffer[bufferIndex++] = 0x80 | (codePoint & 0x3F);
    } else {
      buffer[bufferIndex++] = 0xF0 | (codePoint >>> 18);
      buffer[bufferIndex++] = 0x80 | ((codePoint >>> 12) & 0x3F);
      buffer[bufferIndex++] = 0x80 | ((codePoint >>> 6) & 0x3F);
      buffer[bufferIndex++] = 0x80 | (codePoint & 0x3F);
    }
  }

  return buffer;
}

/**
 * 将 UTF-8 字节数组解码为 JavaScript 字符串
 * @param buffer - UTF-8 编码的字节数组
 * @param maxLength - 可选，要解码的最大字节数（默认为整个数组）
 * @returns 解码后的字符串
 */
export function buf2string(buffer: Uint8Array, maxLength?: number): string {
  const length = maxLength ?? buffer.length;

  // 优先使用原生 TextDecoder API
  if (typeof TextDecoder === 'function' && TextDecoder.prototype.decode) {
    return new TextDecoder().decode(buffer.subarray(0, maxLength));
  }

  const charCodes = new Array<number>(2 * length);
  let charIndex = 0;
  let bufferIndex = 0;

  while (bufferIndex < length) {
    let codePoint = buffer[bufferIndex++];

    // ASCII 快速路径
    if (codePoint < 128) {
      charCodes[charIndex++] = codePoint;
      continue;
    }

    const sequenceLength = UTF8_BYTE_LENGTH_TABLE[codePoint];

    // 无效序列长度
    if (sequenceLength > 4) {
      charCodes[charIndex++] = REPLACEMENT_CHAR;
      bufferIndex += sequenceLength - 1;
      continue;
    }

    // 提取初始位
    codePoint &= sequenceLength === 2 ? 0x1F :
                 sequenceLength === 3 ? 0x0F : 0x07;

    // 读取后续字节
    let remainingBytes = sequenceLength;
    while (remainingBytes > 1 && bufferIndex < length) {
      codePoint = (codePoint << 6) | (buffer[bufferIndex++] & 0x3F);
      remainingBytes--;
    }

    // 序列不完整
    if (remainingBytes > 1) {
      charCodes[charIndex++] = REPLACEMENT_CHAR;
    } else if (codePoint < BMP_MAX) {
      charCodes[charIndex++] = codePoint;
    } else {
      // 编码为 UTF-16 代理对
      codePoint -= BMP_MAX;
      charCodes[charIndex++] = 0xD800 | ((codePoint >> 10) & 0x3FF);
      charCodes[charIndex++] = 0xDC00 | (codePoint & 0x3FF);
    }
  }

  return convertCharCodesToString(charCodes, charIndex);
}

/**
 * 将字符代码数组转换为字符串
 * @param charCodes - 字符代码数组
 * @param length - 有效字符代码数量
 * @returns 转换后的字符串
 */
function convertCharCodesToString(charCodes: number[], length: number): string {
  // 使用快速方法（如果支持）
  if (length < 65534 && (charCodes as unknown as Uint8Array).subarray && supportsFastStringConversion) {
    const typedArray = charCodes as unknown as Uint8Array;
    return String.fromCharCode.apply(
      null,
      (typedArray.length === length ? typedArray : typedArray.subarray(0, length)) as unknown as number[]
    );
  }

  // 回退到逐字符拼接
  let result = '';
  for (let i = 0; i < length; i++) {
    result += String.fromCharCode(charCodes[i]);
  }
  return result;
}

/**
 * 找到 UTF-8 字节数组中安全的截断位置
 * 确保不会在多字节字符中间截断
 * @param buffer - UTF-8 字节数组
 * @param maxLength - 期望的最大长度
 * @returns 安全的截断位置（字节索引）
 */
export function utf8border(buffer: Uint8Array, maxLength?: number): number {
  let length = maxLength ?? buffer.length;
  if (length > buffer.length) {
    length = buffer.length;
  }

  let position = length - 1;

  // 向前查找，跳过所有后续字节（10xxxxxx 格式）
  while (position >= 0 && (buffer[position] & 0xC0) === 0x80) {
    position--;
  }

  // 如果没有找到起始字节，或者已经到达开头
  if (position < 0 || position === 0) {
    return length;
  }

  // 检查当前字符是否会超出边界
  const expectedEnd = position + UTF8_BYTE_LENGTH_TABLE[buffer[position]];
  return expectedEnd > length ? position : length;
}