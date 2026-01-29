function getCurrentPosition(input: unknown): [number] {
  const result = r(input);
  this.currentPos = result[0];
  return [result[0]];
}