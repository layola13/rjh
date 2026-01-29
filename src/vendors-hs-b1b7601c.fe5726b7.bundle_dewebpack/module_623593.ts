interface TypedArrayPool {
  UINT8: Array<Array<Uint8Array>>;
  UINT16: Array<Array<Uint16Array>>;
  UINT32: Array<Array<Uint32Array>>;
  BIGUINT64: Array<Array<BigUint64Array | null>>;
  INT8: Array<Array<Int8Array>>;
  INT16: Array<Array<Int16Array>>;
  INT32: Array<Array<Int32Array>>;
  BIGINT64: Array<Array<BigInt64Array | null>>;
  FLOAT: Array<Array<Float32Array>>;
  DOUBLE: Array<Array<Float64Array>>;
  DATA: Array<Array<ArrayBuffer>>;
  UINT8C: Array<Array<Uint8ClampedArray>>;
  BUFFER: Array<Array<Buffer>>;
}

declare global {
  var __TYPEDARRAY_POOL: TypedArrayPool | undefined;
}

type TypedArrayType =
  | "uint8"
  | "uint16"
  | "uint32"
  | "int8"
  | "int16"
  | "int32"
  | "float"
  | "float32"
  | "double"
  | "float64"
  | "uint8_clamped"
  | "bigint64"
  | "biguint64"
  | "buffer"
  | "data"
  | "dataview"
  | "arraybuffer";

const HAS_UINT8_CLAMPED = typeof Uint8ClampedArray !== "undefined";
const HAS_BIGUINT64 = typeof BigUint64Array !== "undefined";
const HAS_BIGINT64 = typeof BigInt64Array !== "undefined";

function log2(value: number): number {
  return Math.log2(value) | 0;
}

function nextPow2(value: number): number {
  value--;
  value |= value >> 1;
  value |= value >> 2;
  value |= value >> 4;
  value |= value >> 8;
  value |= value >> 16;
  return value + 1;
}

function createPoolArray(size: number, depth: number): Array<Array<any>> {
  const result: Array<Array<any>> = [];
  for (let i = 0; i < size; i++) {
    result.push([]);
  }
  return result;
}

function isBuffer(obj: any): obj is Buffer {
  return obj != null && obj.constructor != null && 
    typeof obj.constructor.isBuffer === "function" && 
    obj.constructor.isBuffer(obj);
}

if (!globalThis.__TYPEDARRAY_POOL) {
  globalThis.__TYPEDARRAY_POOL = {
    UINT8: createPoolArray(32, 0),
    UINT16: createPoolArray(32, 0),
    UINT32: createPoolArray(32, 0),
    BIGUINT64: createPoolArray(32, 0),
    INT8: createPoolArray(32, 0),
    INT16: createPoolArray(32, 0),
    INT32: createPoolArray(32, 0),
    BIGINT64: createPoolArray(32, 0),
    FLOAT: createPoolArray(32, 0),
    DOUBLE: createPoolArray(32, 0),
    DATA: createPoolArray(32, 0),
    UINT8C: createPoolArray(32, 0),
    BUFFER: createPoolArray(32, 0)
  };
}

const pool = globalThis.__TYPEDARRAY_POOL;
pool.UINT8C ||= createPoolArray(32, 0);
pool.BIGUINT64 ||= createPoolArray(32, 0);
pool.BIGINT64 ||= createPoolArray(32, 0);
pool.BUFFER ||= createPoolArray(32, 0);

const dataPool = pool.DATA;
const bufferPool = pool.BUFFER;

function freeArrayBuffer(buffer: ArrayBuffer | null | undefined): void {
  if (buffer) {
    const size = buffer.byteLength;
    const index = log2(size);
    dataPool[index].push(buffer);
  }
}

function mallocArrayBuffer(size: number): ArrayBuffer {
  const allocSize = nextPow2(size);
  const index = log2(allocSize);
  const cache = dataPool[index];
  return cache.length > 0 ? cache.pop()! : new ArrayBuffer(allocSize);
}

function mallocUint8(size: number): Uint8Array {
  return new Uint8Array(mallocArrayBuffer(size), 0, size);
}

function mallocUint16(size: number): Uint16Array {
  return new Uint16Array(mallocArrayBuffer(2 * size), 0, size);
}

function mallocUint32(size: number): Uint32Array {
  return new Uint32Array(mallocArrayBuffer(4 * size), 0, size);
}

function mallocInt8(size: number): Int8Array {
  return new Int8Array(mallocArrayBuffer(size), 0, size);
}

function mallocInt16(size: number): Int16Array {
  return new Int16Array(mallocArrayBuffer(2 * size), 0, size);
}

function mallocInt32(size: number): Int32Array {
  return new Int32Array(mallocArrayBuffer(4 * size), 0, size);
}

function mallocFloat32(size: number): Float32Array {
  return new Float32Array(mallocArrayBuffer(4 * size), 0, size);
}

function mallocFloat64(size: number): Float64Array {
  return new Float64Array(mallocArrayBuffer(8 * size), 0, size);
}

function mallocUint8Clamped(size: number): Uint8ClampedArray | Uint8Array {
  return HAS_UINT8_CLAMPED
    ? new Uint8ClampedArray(mallocArrayBuffer(size), 0, size)
    : mallocUint8(size);
}

function mallocBigUint64(size: number): BigUint64Array | null {
  return HAS_BIGUINT64
    ? new BigUint64Array(mallocArrayBuffer(8 * size), 0, size)
    : null;
}

function mallocBigInt64(size: number): BigInt64Array | null {
  return HAS_BIGINT64
    ? new BigInt64Array(mallocArrayBuffer(8 * size), 0, size)
    : null;
}

function mallocDataView(size: number): DataView {
  return new DataView(mallocArrayBuffer(size), 0, size);
}

function mallocBuffer(size: number): Buffer {
  const allocSize = nextPow2(size);
  const index = log2(allocSize);
  const cache = bufferPool[index];
  return cache.length > 0 ? cache.pop()! : Buffer.allocUnsafe(allocSize);
}

export function free(array: ArrayBuffer | ArrayBufferView | Buffer | null | undefined): void {
  if (!array) return;

  if (isBuffer(array)) {
    bufferPool[log2(array.length)].push(array);
  } else {
    const buffer = (array as ArrayBufferView).buffer ?? (array as ArrayBuffer);
    if (!buffer) return;

    const size = buffer.byteLength;
    const index = log2(size) | 0;
    dataPool[index].push(buffer);
  }
}

export const freeUint8 = (array: Uint8Array): void => freeArrayBuffer(array.buffer);
export const freeUint16 = (array: Uint16Array): void => freeArrayBuffer(array.buffer);
export const freeUint32 = (array: Uint32Array): void => freeArrayBuffer(array.buffer);
export const freeBigUint64 = (array: BigUint64Array): void => freeArrayBuffer(array.buffer);
export const freeInt8 = (array: Int8Array): void => freeArrayBuffer(array.buffer);
export const freeInt16 = (array: Int16Array): void => freeArrayBuffer(array.buffer);
export const freeInt32 = (array: Int32Array): void => freeArrayBuffer(array.buffer);
export const freeBigInt64 = (array: BigInt64Array): void => freeArrayBuffer(array.buffer);
export const freeFloat32 = (array: Float32Array): void => freeArrayBuffer(array.buffer);
export const freeFloat = freeFloat32;
export const freeFloat64 = (array: Float64Array): void => freeArrayBuffer(array.buffer);
export const freeDouble = freeFloat64;
export const freeUint8Clamped = (array: Uint8ClampedArray): void => freeArrayBuffer(array.buffer);
export const freeDataView = (view: DataView): void => freeArrayBuffer(view.buffer);

export { freeArrayBuffer };

export function freeBuffer(buffer: Buffer): void {
  bufferPool[log2(buffer.length)].push(buffer);
}

export function malloc(size: number, type?: TypedArrayType): ArrayBuffer | TypedArray | Buffer | DataView | null {
  if (type === undefined || type === "arraybuffer") {
    return mallocArrayBuffer(size);
  }

  switch (type) {
    case "uint8":
      return mallocUint8(size);
    case "uint16":
      return mallocUint16(size);
    case "uint32":
      return mallocUint32(size);
    case "int8":
      return mallocInt8(size);
    case "int16":
      return mallocInt16(size);
    case "int32":
      return mallocInt32(size);
    case "float":
    case "float32":
      return mallocFloat32(size);
    case "double":
    case "float64":
      return mallocFloat64(size);
    case "uint8_clamped":
      return mallocUint8Clamped(size);
    case "bigint64":
      return mallocBigInt64(size);
    case "biguint64":
      return mallocBigUint64(size);
    case "buffer":
      return mallocBuffer(size);
    case "data":
    case "dataview":
      return mallocDataView(size);
    default:
      return null;
  }
}

export { mallocArrayBuffer };
export { mallocUint8 };
export { mallocUint16 };
export { mallocUint32 };
export { mallocInt8 };
export { mallocInt16 };
export { mallocInt32 };
export { mallocFloat32 };
export const mallocFloat = mallocFloat32;
export { mallocFloat64 };
export const mallocDouble = mallocFloat64;
export { mallocUint8Clamped };
export { mallocBigUint64 };
export { mallocBigInt64 };
export { mallocDataView };
export { mallocBuffer };

export function clearCache(): void {
  const POOL_SIZE = 32;

  for (let i = 0; i < POOL_SIZE; ++i) {
    pool.UINT8[i].length = 0;
    pool.UINT16[i].length = 0;
    pool.UINT32[i].length = 0;
    pool.INT8[i].length = 0;
    pool.INT16[i].length = 0;
    pool.INT32[i].length = 0;
    pool.FLOAT[i].length = 0;
    pool.DOUBLE[i].length = 0;
    pool.BIGUINT64[i].length = 0;
    pool.BIGINT64[i].length = 0;
    pool.UINT8C[i].length = 0;
    dataPool[i].length = 0;
    bufferPool[i].length = 0;
  }
}