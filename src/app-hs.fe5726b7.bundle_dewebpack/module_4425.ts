export function isEqual(value: unknown, other: unknown): boolean {
  return value === other || (value !== value && other !== other);
}