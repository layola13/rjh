/**
 * Module: module_D
 * Original ID: D
 * 
 * Memory growth/allocation function that attempts to expand WebAssembly memory buffer.
 * Calculates the required memory size and attempts to grow the buffer accordingly.
 */

/**
 * Attempts to allocate memory by growing the WebAssembly memory buffer to accommodate
 * the requested size. Uses a doubling or 3/4 growth strategy based on current size.
 * 
 * @param requestedSize - The target memory size in bytes to allocate
 * @returns `true` if memory allocation succeeded, `false` if the requested size exceeds limits
 * 
 * @remarks
 * - Maximum allocatable size is 2,147,418,112 bytes (~2GB)
 * - Minimum initial size is 16,777,216 bytes (16MB)
 * - Growth strategy:
 *   - For sizes ≤ 536,870,912 bytes: doubles the current size
 *   - For larger sizes: grows by 75% of current size
 * - All sizes are aligned to 65,536-byte (64KB) page boundaries
 */
declare function allocateMemory(requestedSize: number): boolean;

/**
 * Internal helper: Attempts to grow WebAssembly memory and update the buffer reference.
 * 
 * @param targetSize - The target memory size in bytes
 * @returns `1` if growth succeeded, `undefined` if growth failed
 * 
 * @internal
 */
declare function growMemoryBuffer(targetSize: number): 1 | undefined;

/**
 * Aligns a value up to the nearest multiple of the specified alignment.
 * 
 * @param value - The value to align
 * @param alignment - The alignment boundary (must be power of 2)
 * @returns The aligned value
 * 
 * @internal
 */
declare function alignUp(value: number, alignment: number): number;

/**
 * Updates the internal buffer reference after memory growth.
 * 
 * @param newBuffer - The new ArrayBuffer after memory growth
 * 
 * @internal
 */
declare function updateBufferReference(newBuffer: ArrayBuffer): void;

/**
 * WebAssembly memory instance.
 * @internal
 */
declare const wasmMemory: WebAssembly.Memory;

/**
 * Current WebAssembly memory buffer.
 * @internal
 */
declare const memoryBuffer: ArrayBuffer;

/**
 * Current array/view backed by WebAssembly memory.
 * @internal
 */
declare const memoryView: Uint8Array | Int8Array | DataView;

/** Maximum allocatable memory size in bytes (2GB - 64KB) */
declare const MAX_MEMORY_SIZE = 2147418112;

/** Minimum initial memory size in bytes (16MB) */
declare const MIN_MEMORY_SIZE = 16777216;

/** Memory growth threshold for doubling strategy (512MB) */
declare const GROWTH_THRESHOLD = 536870912;

/** WebAssembly page size in bytes (64KB) */
declare const WASM_PAGE_SIZE = 65536;