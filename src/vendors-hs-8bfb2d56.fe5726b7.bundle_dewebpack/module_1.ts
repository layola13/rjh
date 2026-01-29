function subtractWithOffset(
  source: number[],
  sourceIndex: number,
  length: number,
  destination: number[],
  destinationIndex: number,
  offset: number
): void {
  for (let i = 0; i < length; i++) {
    const previousValue = offset <= i ? source[sourceIndex + i - offset] : 0;
    const difference = source[sourceIndex + i] - previousValue;
    destination[destinationIndex + i] = difference;
  }
}