const MAX_HEAP_SIZE = 2147483648;
const HEAP_PADDING = 100663296;
const ALIGNMENT = 65536;

function resizeMemory(requestedSize: number): boolean {
  const currentLength = g.length;
  
  requestedSize >>>= 0;
  
  if (requestedSize > MAX_HEAP_SIZE) {
    return false;
  }
  
  const alignToMultiple = (value: number, alignment: number): number => {
    return value + (alignment - value % alignment) % alignment;
  };
  
  for (let multiplier = 1; multiplier <= 4; multiplier *= 2) {
    const growthFactor = currentLength * (1 + 0.2 / multiplier);
    const targetSize = Math.min(growthFactor, requestedSize + HEAP_PADDING);
    const alignedSize = Math.min(
      MAX_HEAP_SIZE,
      alignToMultiple(Math.max(requestedSize, targetSize), ALIGNMENT)
    );
    
    if (z(alignedSize)) {
      return true;
    }
  }
  
  return false;
}