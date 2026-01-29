export function getLength(value: { length: number }): number {
  return Math.min(value.length, 0x1fffffffffffff);
}