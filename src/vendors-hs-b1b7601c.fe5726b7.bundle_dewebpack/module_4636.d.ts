/**
 * 获取对象的可枚举属性键名数组，支持类数组对象和类型化数组的特殊处理
 * 
 * @param value - 要检查的值，可以是数组、类数组对象、Buffer或类型化数组
 * @param includeInherited - 是否包含继承的属性（非自有属性）
 * @returns 属性键名组成的字符串数组
 * 
 * @remarks
 * 此函数会过滤掉以下属性：
 * - 类数组对象的 "length" 属性
 * - Buffer 的 "offset" 和 "parent" 属性
 * - 类型化数组的 "buffer"、"byteLength" 和 "byteOffset" 属性
 * - 类似数组索引的属性（当对象具有 length 属性时）
 */
export function getOwnEnumerablePropertyKeys(
  value: unknown,
  includeInherited?: boolean
): string[];

/**
 * 内部工具：根据长度生成字符串数组（通常用于生成索引键）
 * @internal
 */
declare function baseTimes(length: number, iteratee: typeof String): string[];

/**
 * 检查值是否为类数组对象（arguments 对象）
 * @internal
 */
declare function isArguments(value: unknown): value is IArguments;

/**
 * 检查值是否为数组
 * @internal
 */
declare function isArray(value: unknown): value is unknown[];

/**
 * 检查值是否为 Buffer 对象
 * @internal
 */
declare function isBuffer(value: unknown): value is Buffer;

/**
 * 检查值是否为类型化数组
 * @internal
 */
declare function isTypedArray(value: unknown): value is 
  | Int8Array 
  | Uint8Array 
  | Uint8ClampedArray 
  | Int16Array 
  | Uint16Array 
  | Int32Array 
  | Uint32Array 
  | Float32Array 
  | Float64Array 
  | BigInt64Array 
  | BigUint64Array;

/**
 * 检查给定的键是否为有效的数组索引
 * @internal
 */
declare function isIndex(key: string, length: number): boolean;