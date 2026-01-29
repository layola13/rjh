function parseModule(input: string): [number] {
  const parsed = this.parse(input);
  this.currentPos = parsed[0];
  return [parsed[0]];
}