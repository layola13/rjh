function subtractAveragedPrediction(
  data: number[],
  targetIndex: number,
  length: number,
  output: number[],
  outputIndex: number,
  offset: number
): void {
  for (let index = 0; index < length; index++) {
    const horizontalSample = offset <= index ? data[targetIndex + index - offset] : 0;
    const verticalSample = 0 < targetIndex ? data[targetIndex + index - length] : 0;
    const prediction = (horizontalSample + verticalSample) >> 1;
    const difference = data[targetIndex + index] - prediction;
    output[outputIndex + index] = difference;
  }
}