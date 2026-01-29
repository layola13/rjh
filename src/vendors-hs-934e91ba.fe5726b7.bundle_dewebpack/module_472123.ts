export function convertToString(value: unknown): string {
  return value == null ? "" : String(value);
}