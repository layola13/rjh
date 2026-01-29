export function toArray<T>(value: Iterable<T>): T[] | undefined {
  if (typeof Symbol !== "undefined" && value[Symbol.iterator] != null || value["@@iterator" as keyof typeof value] != null) {
    return Array.from(value);
  }
  return undefined;
}