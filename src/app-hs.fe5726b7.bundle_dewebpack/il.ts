interface TypedArrayPool {
  UINT8: Array<Uint8Array[]>;
  UINT16: Array<Uint16Array[]>;
  UINT32: Array<Uint32Array[]>;
  BIGUINT64: Array<BigUint64Array[]>;
  INT8: Array<Int8Array[]>;
  INT16: Array<Int16Array[]>;
  INT32: Array<Int32Array[]>;
  BIGINT64: Array<BigInt64Array[]>;
  FLOAT: Array<Float32Array[]>;
  DOUBLE: Array<Float64Array[]>;
  DATA: Array<ArrayBuffer[]>;
  UINT8C: Array<Uint8ClampedArray[]>;
  BUFFER: Array<ArrayBuffer[]>;
}

declare global {
  interface Window {
    __TYPEDARRAY_POOL?: TypedArrayPool;
  }
  var __TYPEDARRAY_POOL: TypedArrayPool | undefined;
}

const POOL_SIZE = 32;
const POOL_INITIAL_BUCKETS = 0;

function createPoolBuckets(size: number, initialBuckets: number): Array<any[]> {
  return Array.from({ length: size }, () => new Array(initialBuckets));
}

if (!globalThis.__TYPEDARRAY_POOL) {
  globalThis.__TYPEDARRAY_POOL = {
    UINT8: createPoolBuckets(POOL_SIZE, POOL_INITIAL_BUCKETS),
    UINT16: createPoolBuckets(POOL_SIZE, POOL_INITIAL_BUCKETS),
    UINT32: createPoolBuckets(POOL_SIZE, POOL_INITIAL_BUCKETS),
    BIGUINT64: createPoolBuckets(POOL_SIZE, POOL_INITIAL_BUCKETS),
    INT8: createPoolBuckets(POOL_SIZE, POOL_INITIAL_BUCKETS),
    INT16: createPoolBuckets(POOL_SIZE, POOL_INITIAL_BUCKETS),
    INT32: createPoolBuckets(POOL_SIZE, POOL_INITIAL_BUCKETS),
    BIGINT64: createPoolBuckets(POOL_SIZE, POOL_INITIAL_BUCKETS),
    FLOAT: createPoolBuckets(POOL_SIZE, POOL_INITIAL_BUCKETS),
    DOUBLE: createPoolBuckets(POOL_SIZE, POOL_INITIAL_BUCKETS),
    DATA: createPoolBuckets(POOL_SIZE, POOL_INITIAL_BUCKETS),
    UINT8C: createPoolBuckets(POOL_SIZE, POOL_INITIAL_BUCKETS),
    BUFFER: createPoolBuckets(POOL_SIZE, POOL_INITIAL_BUCKETS)
  };
}

const typedArrayPool = globalThis.__TYPEDARRAY_POOL;

typedArrayPool.UINT8C ??= createPoolBuckets(POOL_SIZE, POOL_INITIAL_BUCKETS);
typedArrayPool.BIGUINT64 ??= createPoolBuckets(POOL_SIZE, POOL_INITIAL_BUCKETS);
typedArrayPool.BIGINT64 ??= createPoolBuckets(POOL_SIZE, POOL_INITIAL_BUCKETS);
typedArrayPool.BUFFER ??= createPoolBuckets(POOL_SIZE, POOL_INITIAL_BUCKETS);

const dataPool = typedArrayPool.DATA;
const bufferPool = typedArrayPool.BUFFER;

/**
 * Clears all typed array pools by resetting their lengths to zero.
 * This effectively releases all pooled arrays for garbage collection.
 */
export function clearTypedArrayPools(): void {
  for (let bucketIndex = 0; bucketIndex < POOL_SIZE; ++bucketIndex) {
    typedArrayPool.UINT8[bucketIndex].length = 0;
    typedArrayPool.UINT16[bucketIndex].length = 0;
    typedArrayPool.UINT32[bucketIndex].length = 0;
    typedArrayPool.INT8[bucketIndex].length = 0;
    typedArrayPool.INT16[bucketIndex].length = 0;
    typedArrayPool.INT32[bucketIndex].length = 0;
    typedArrayPool.FLOAT[bucketIndex].length = 0;
    typedArrayPool.DOUBLE[bucketIndex].length = 0;
    typedArrayPool.BIGUINT64[bucketIndex].length = 0;
    typedArrayPool.BIGINT64[bucketIndex].length = 0;
    typedArrayPool.UINT8C[bucketIndex].length = 0;
    dataPool[bucketIndex].length = 0;
    bufferPool[bucketIndex].length = 0;
  }
}