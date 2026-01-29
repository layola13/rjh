export function isLength(value: unknown): value is number {
  return typeof value === 'number' && value > -1 && value % 1 === 0 && value <= 9007199254740991;
}