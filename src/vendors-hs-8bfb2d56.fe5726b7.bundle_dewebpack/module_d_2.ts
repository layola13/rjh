const INITIAL_MEMORY_SIZE = 16777216; // 16MB
const MAX_MEMORY_SIZE = 2147418112; // ~2GB
const ALIGNMENT = 65536; // 64KB
const GROW_THRESHOLD = 536870912; // 512MB
const PAGE_SIZE = 65535;

interface WebAssemblyMemory {
  buffer: ArrayBuffer;
  grow(delta: number): number;
}

let wasmMemory: WebAssemblyMemory;
let memoryBuffer: ArrayBuffer;
let currentMemoryLength: number;

function alignMemorySize(size: number, alignment: number): number {
  return Math.ceil(size / alignment) * alignment;
}

function tryGrowMemory(targetSize: number): boolean {
  try {
    const bytesNeeded = targetSize - memoryBuffer.byteLength;
    const pagesNeeded = (bytesNeeded + PAGE_SIZE) >> 16;
    wasmMemory.grow(pagesNeeded);
    memoryBuffer = wasmMemory.buffer;
    return true;
  } catch {
    return false;
  }
}

function ensureMemoryCapacity(requiredSize: number): boolean {
  if (requiredSize > MAX_MEMORY_SIZE) {
    return false;
  }

  let newSize = Math.max(currentMemoryLength, INITIAL_MEMORY_SIZE);

  while (newSize < requiredSize) {
    if (newSize <= GROW_THRESHOLD) {
      newSize = alignMemorySize(2 * newSize, ALIGNMENT);
    } else {
      const calculatedSize = Math.floor((3 * newSize + 2147483648) / 4);
      newSize = Math.min(alignMemorySize(calculatedSize, ALIGNMENT), MAX_MEMORY_SIZE);
    }
  }

  return tryGrowMemory(newSize);
}