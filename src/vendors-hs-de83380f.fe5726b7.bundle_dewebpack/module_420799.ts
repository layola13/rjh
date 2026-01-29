function arrayLikeToArray<T>(arr: ArrayLike<T>): T[] {
  const length = arr.length;
  const result = new Array<T>(length);
  for (let i = 0; i < length; i++) {
    result[i] = arr[i];
  }
  return result;
}

function iterableToArray<T>(iterable: Iterable<T>): T[] {
  if (typeof Symbol !== "undefined" && iterable[Symbol.iterator] != null) {
    return Array.from(iterable);
  }
  return [];
}

function unsupportedIterableToArray<T>(value: ArrayLike<T> | Iterable<T>, minLen?: number): T[] | undefined {
  if (!value) return;
  if (typeof value === "string") return arrayLikeToArray(value as unknown as ArrayLike<T>);
  
  const type = Object.prototype.toString.call(value).slice(8, -1);
  if (type === "Object" && value.constructor) {
    type = value.constructor.name;
  }
  
  if (type === "Map" || type === "Set") {
    return Array.from(value as Iterable<T>);
  }
  
  if (type === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(type)) {
    return arrayLikeToArray(value as ArrayLike<T>);
  }
}

function nonIterableSpread(): never {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\n" +
    "In order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

/**
 * Converts an iterable or array-like value to an array.
 * Throws if the value is not iterable and cannot be converted.
 */
export default function toConsumableArray<T>(value: Iterable<T> | ArrayLike<T>): T[] {
  return (
    arrayLikeToArray(value as ArrayLike<T>) ||
    iterableToArray(value as Iterable<T>) ||
    unsupportedIterableToArray(value) ||
    nonIterableSpread()
  );
}