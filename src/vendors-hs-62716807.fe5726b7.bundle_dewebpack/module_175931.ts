export function createPropertyDescriptor(
  flags: number,
  value: unknown
): PropertyDescriptor {
  return {
    enumerable: !(flags & 1),
    configurable: !(flags & 2),
    writable: !(flags & 4),
    value: value
  };
}