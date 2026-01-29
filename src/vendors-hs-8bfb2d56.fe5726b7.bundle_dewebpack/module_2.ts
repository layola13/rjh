function calculateDifference(
  sourceArray: number[],
  baseIndex: number,
  length: number,
  targetArray: number[],
  targetIndex: number
): void {
  for (let offset = 0; offset < length; offset++) {
    const previousValue = 0 < baseIndex ? sourceArray[baseIndex + offset - length] : 0;
    const difference = sourceArray[baseIndex + offset] - previousValue;
    targetArray[targetIndex + offset] = difference;
  }
}