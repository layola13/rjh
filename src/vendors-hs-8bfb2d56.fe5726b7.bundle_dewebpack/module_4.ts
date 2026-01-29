function decodePixelDifference(
  sourceBuffer: number[],
  sourceOffset: number,
  length: number,
  targetBuffer: number[],
  targetOffset: number,
  stride: number
): void {
  for (let index = 0; index < length; index++) {
    const leftPixel = stride <= index ? sourceBuffer[sourceOffset + index - stride] : 0;
    const topPixel = 0 < sourceOffset ? sourceBuffer[sourceOffset + index - length] : 0;
    const topLeftPixel = 0 < sourceOffset && stride <= index 
      ? sourceBuffer[sourceOffset + index - (length + stride)] 
      : 0;
    
    const decodedValue = sourceBuffer[sourceOffset + index] - n(leftPixel, topPixel, topLeftPixel);
    targetBuffer[targetOffset + index] = decodedValue;
  }
}