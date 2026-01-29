function arrayLikeToArray(array: ArrayLike<unknown>, length?: number): unknown[] {
  if (length == null || length > array.length) {
    length = array.length;
  }
  const result: unknown[] = new Array(length);
  for (let i = 0; i < length; i++) {
    result[i] = array[i];
  }
  return result;
}

export default function unsupportedIterableToArray<T>(
  iterable: Iterable<T> | ArrayLike<T> | null | undefined,
  maxLength?: number
): T[] | undefined {
  if (!iterable) {
    return undefined;
  }

  if (typeof iterable === "string") {
    return arrayLikeToArray(iterable, maxLength) as T[];
  }

  const objectType = Object.prototype.toString.call(iterable).slice(8, -1);
  let type = objectType;

  if (type === "Object" && iterable.constructor) {
    type = iterable.constructor.name;
  }

  if (type === "Map" || type === "Set") {
    return Array.from(iterable as Iterable<T>);
  }

  if (
    type === "Arguments" ||
    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(type)
  ) {
    return arrayLikeToArray(iterable as ArrayLike<T>, maxLength) as T[];
  }

  return undefined;
}