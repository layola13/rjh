export function getLength<T extends { length: number }>(value: T): number {
  return Math.min(value.length, 0x1FFFFFFFFFFFFF);
}