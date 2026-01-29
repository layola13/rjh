const HEAP_SIZE_LIMIT = 2147483648;
const ALIGNMENT_SIZE = 65536;
const BUFFER_SIZE = 100663296;

function resizeMemory(requestedSize: number): boolean {
  const currentLength = N.length;
  const maxHeapSize = HEAP_SIZE_LIMIT;

  requestedSize >>>= 0;
  
  if (requestedSize > maxHeapSize) {
    return false;
  }

  for (let multiplier = 1; multiplier <= 4; multiplier *= 2) {
    let overGrownHeapSize = currentLength * (1 + 0.2 / multiplier);
    overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + BUFFER_SIZE);

    const alignedSize = Math.max(requestedSize, overGrownHeapSize);
    const remainder = alignedSize % ALIGNMENT_SIZE;
    const newSize = remainder > 0 ? alignedSize + ALIGNMENT_SIZE - remainder : alignedSize;
    const clampedSize = Math.min(maxHeapSize, newSize);

    if (Mt(clampedSize)) {
      return true;
    }
  }

  return false;
}