export function getObjectType(value: unknown): string {
  return Object.prototype.toString.call(value);
}