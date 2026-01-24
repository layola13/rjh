/**
 * Attempts to grow memory to accommodate the requested size.
 * Uses a heuristic growth strategy with multiple attempts at different growth rates.
 * 
 * @param requestedSize - The requested memory size in bytes (will be converted to unsigned 32-bit integer)
 * @returns True if memory was successfully grown to meet the request, false otherwise
 */
declare function growMemory(requestedSize: number): boolean;

/**
 * Maximum allowed memory size (2GB for 32-bit addressing)
 */
declare const MAX_MEMORY_SIZE = 2147483648;

/**
 * Memory page alignment size (64KB)
 */
declare const PAGE_SIZE = 65536;

/**
 * Maximum additional padding for memory growth (96MB)
 */
declare const MAX_PADDING = 100663296;

/**
 * Current length of the memory buffer N
 */
declare const N: ArrayLike<unknown>;

/**
 * Internal function to attempt memory allocation
 * @param size - Target size in bytes to allocate
 * @returns True if allocation succeeded, false otherwise
 */
declare function Mt(size: number): boolean;