function copyArray<T>(
  source: T[],
  sourceIndex: number,
  count: number,
  destination: T[],
  destinationIndex: number
): void {
  for (let i = 0; i < count; i++) {
    destination[destinationIndex + i] = source[sourceIndex + i];
  }
}