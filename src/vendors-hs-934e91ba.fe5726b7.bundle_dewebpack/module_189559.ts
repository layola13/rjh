/**
 * Checks if a value exists at a given key/index in an object/array and equals the target value.
 * @param targetValue - The value to compare against
 * @param key - The property key or array index to check
 * @param collection - The object or array to search in
 * @returns True if the key exists and its value equals the target value
 */
export default function isMatchingValue(
  targetValue: unknown,
  key: PropertyKey,
  collection: unknown
): boolean {
  if (!isObject(collection)) {
    return false;
  }

  const keyType = typeof key;
  const hasValidKey =
    keyType === "number"
      ? isArrayLike(collection) && isValidIndex(key as number, collection.length)
      : keyType === "string" && key in (collection as object);

  return hasValidKey && isEqual((collection as Record<PropertyKey, unknown>)[key], targetValue);
}

function isObject(value: unknown): value is object {
  const type = typeof value;
  return value != null && (type === "object" || type === "function");
}

function isArrayLike(value: unknown): value is ArrayLike<unknown> {
  return (
    value != null &&
    typeof value !== "function" &&
    typeof (value as { length?: unknown }).length === "number" &&
    (value as { length: number }).length >= 0 &&
    (value as { length: number }).length <= Number.MAX_SAFE_INTEGER
  );
}

function isValidIndex(index: number, length: number): boolean {
  const maxIndex = length - 1;
  return index >= -length && index <= maxIndex;
}

function isEqual(value: unknown, other: unknown): boolean {
  return value === other || (value !== value && other !== other);
}