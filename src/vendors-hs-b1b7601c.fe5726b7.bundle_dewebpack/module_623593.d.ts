/**
 * TypedArray 内存池模块
 * 提供高性能的类型化数组分配和回收功能，通过对象池模式减少内存分配开销
 */

/**
 * 类型化数组池的类型定义
 */
interface TypedArrayPool {
  /** Uint8Array 对象池 */
  UINT8: ArrayBuffer[][];
  /** Uint16Array 对象池 */
  UINT16: ArrayBuffer[][];
  /** Uint32Array 对象池 */
  UINT32: ArrayBuffer[][];
  /** BigUint64Array 对象池 */
  BIGUINT64: ArrayBuffer[][];
  /** Int8Array 对象池 */
  INT8: ArrayBuffer[][];
  /** Int16Array 对象池 */
  INT16: ArrayBuffer[][];
  /** Int32Array 对象池 */
  INT32: ArrayBuffer[][];
  /** BigInt64Array 对象池 */
  BIGINT64: ArrayBuffer[][];
  /** Float32Array 对象池 */
  FLOAT: ArrayBuffer[][];
  /** Float64Array 对象池 */
  DOUBLE: ArrayBuffer[][];
  /** 通用 ArrayBuffer 数据池 */
  DATA: ArrayBuffer[][];
  /** Uint8ClampedArray 对象池 */
  UINT8C: ArrayBuffer[][];
  /** Buffer 对象池 */
  BUFFER: Buffer[][];
}

/**
 * 全局变量扩展
 */
declare global {
  var __TYPEDARRAY_POOL: TypedArrayPool;
}

/**
 * 支持的类型化数组类型字符串
 */
type TypedArrayType =
  | 'arraybuffer'
  | 'uint8'
  | 'uint16'
  | 'uint32'
  | 'int8'
  | 'int16'
  | 'int32'
  | 'float'
  | 'float32'
  | 'double'
  | 'float64'
  | 'uint8_clamped'
  | 'bigint64'
  | 'biguint64'
  | 'buffer'
  | 'data'
  | 'dataview';

/**
 * malloc 函数的返回类型映射
 */
type MallocReturnType<T extends TypedArrayType | undefined> =
  T extends 'arraybuffer' | undefined ? ArrayBuffer :
  T extends 'uint8' ? Uint8Array :
  T extends 'uint16' ? Uint16Array :
  T extends 'uint32' ? Uint32Array :
  T extends 'int8' ? Int8Array :
  T extends 'int16' ? Int16Array :
  T extends 'int32' ? Int32Array :
  T extends 'float' | 'float32' ? Float32Array :
  T extends 'double' | 'float64' ? Float64Array :
  T extends 'uint8_clamped' ? Uint8ClampedArray :
  T extends 'bigint64' ? BigInt64Array | null :
  T extends 'biguint64' ? BigUint64Array | null :
  T extends 'buffer' ? Buffer :
  T extends 'data' | 'dataview' ? DataView :
  null;

/**
 * 释放 TypedArray 或 ArrayBuffer 回池中
 * @param buffer - 要释放的类型化数组或 ArrayBuffer
 */
export function free(buffer: ArrayBufferView | ArrayBuffer | Buffer): void;

/**
 * 释放 Uint8Array 回池中
 * @param array - 要释放的 Uint8Array
 */
export function freeUint8(array: Uint8Array): void;

/**
 * 释放 Uint16Array 回池中
 * @param array - 要释放的 Uint16Array
 */
export function freeUint16(array: Uint16Array): void;

/**
 * 释放 Uint32Array 回池中
 * @param array - 要释放的 Uint32Array
 */
export function freeUint32(array: Uint32Array): void;

/**
 * 释放 BigUint64Array 回池中
 * @param array - 要释放的 BigUint64Array
 */
export function freeBigUint64(array: BigUint64Array): void;

/**
 * 释放 Int8Array 回池中
 * @param array - 要释放的 Int8Array
 */
export function freeInt8(array: Int8Array): void;

/**
 * 释放 Int16Array 回池中
 * @param array - 要释放的 Int16Array
 */
export function freeInt16(array: Int16Array): void;

/**
 * 释放 Int32Array 回池中
 * @param array - 要释放的 Int32Array
 */
export function freeInt32(array: Int32Array): void;

/**
 * 释放 BigInt64Array 回池中
 * @param array - 要释放的 BigInt64Array
 */
export function freeBigInt64(array: BigInt64Array): void;

/**
 * 释放 Float32Array 回池中
 * @param array - 要释放的 Float32Array
 */
export function freeFloat32(array: Float32Array): void;

/**
 * 释放 Float32Array 回池中（别名）
 * @param array - 要释放的 Float32Array
 */
export function freeFloat(array: Float32Array): void;

/**
 * 释放 Float64Array 回池中
 * @param array - 要释放的 Float64Array
 */
export function freeFloat64(array: Float64Array): void;

/**
 * 释放 Float64Array 回池中（别名）
 * @param array - 要释放的 Float64Array
 */
export function freeDouble(array: Float64Array): void;

/**
 * 释放 Uint8ClampedArray 回池中
 * @param array - 要释放的 Uint8ClampedArray
 */
export function freeUint8Clamped(array: Uint8ClampedArray): void;

/**
 * 释放 DataView 回池中
 * @param view - 要释放的 DataView
 */
export function freeDataView(view: DataView): void;

/**
 * 释放 ArrayBuffer 回池中
 * @param buffer - 要释放的 ArrayBuffer
 */
export function freeArrayBuffer(buffer: ArrayBuffer): void;

/**
 * 释放 Buffer 回池中
 * @param buffer - 要释放的 Buffer
 */
export function freeBuffer(buffer: Buffer): void;

/**
 * 从池中分配指定大小和类型的类型化数组
 * @param size - 数组元素数量
 * @param type - 数组类型，默认为 'arraybuffer'
 * @returns 分配的类型化数组或 ArrayBuffer
 */
export function malloc<T extends TypedArrayType | undefined = undefined>(
  size: number,
  type?: T
): MallocReturnType<T>;

/**
 * 分配 ArrayBuffer
 * @param size - 字节大小
 * @returns ArrayBuffer 实例
 */
export function mallocArrayBuffer(size: number): ArrayBuffer;

/**
 * 分配 Uint8Array
 * @param size - 数组元素数量
 * @returns Uint8Array 实例
 */
export function mallocUint8(size: number): Uint8Array;

/**
 * 分配 Uint16Array
 * @param size - 数组元素数量
 * @returns Uint16Array 实例
 */
export function mallocUint16(size: number): Uint16Array;

/**
 * 分配 Uint32Array
 * @param size - 数组元素数量
 * @returns Uint32Array 实例
 */
export function mallocUint32(size: number): Uint32Array;

/**
 * 分配 Int8Array
 * @param size - 数组元素数量
 * @returns Int8Array 实例
 */
export function mallocInt8(size: number): Int8Array;

/**
 * 分配 Int16Array
 * @param size - 数组元素数量
 * @returns Int16Array 实例
 */
export function mallocInt16(size: number): Int16Array;

/**
 * 分配 Int32Array
 * @param size - 数组元素数量
 * @returns Int32Array 实例
 */
export function mallocInt32(size: number): Int32Array;

/**
 * 分配 Float32Array
 * @param size - 数组元素数量
 * @returns Float32Array 实例
 */
export function mallocFloat32(size: number): Float32Array;

/**
 * 分配 Float32Array（别名）
 * @param size - 数组元素数量
 * @returns Float32Array 实例
 */
export function mallocFloat(size: number): Float32Array;

/**
 * 分配 Float64Array
 * @param size - 数组元素数量
 * @returns Float64Array 实例
 */
export function mallocFloat64(size: number): Float64Array;

/**
 * 分配 Float64Array（别名）
 * @param size - 数组元素数量
 * @returns Float64Array 实例
 */
export function mallocDouble(size: number): Float64Array;

/**
 * 分配 Uint8ClampedArray
 * @param size - 数组元素数量
 * @returns Uint8ClampedArray 实例（如果不支持则返回 Uint8Array）
 */
export function mallocUint8Clamped(size: number): Uint8ClampedArray | Uint8Array;

/**
 * 分配 BigUint64Array
 * @param size - 数组元素数量
 * @returns BigUint64Array 实例，如果运行时不支持则返回 null
 */
export function mallocBigUint64(size: number): BigUint64Array | null;

/**
 * 分配 BigInt64Array
 * @param size - 数组元素数量
 * @returns BigInt64Array 实例，如果运行时不支持则返回 null
 */
export function mallocBigInt64(size: number): BigInt64Array | null;

/**
 * 分配 DataView
 * @param size - 字节大小
 * @returns DataView 实例
 */
export function mallocDataView(size: number): DataView;

/**
 * 分配 Buffer
 * @param size - 字节大小
 * @returns Buffer 实例
 */
export function mallocBuffer(size: number): Buffer;

/**
 * 清空所有对象池缓存
 * 释放池中所有缓存的数组，用于内存清理
 */
export function clearCache(): void;