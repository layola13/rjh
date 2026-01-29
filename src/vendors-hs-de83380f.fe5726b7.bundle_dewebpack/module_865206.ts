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
  
  const objProto = Object.prototype.toString.call(value).slice(8, -1);
  if (objProto === "Object" && value.constructor) {
    const constructorName = value.constructor.name;
    if (constructorName) {
      if (constructorName === "Map" || constructorName === "Set") {
        return Array.from(value as Iterable<T>);
      }
    }
  }
  
  if (objProto === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(objProto)) {
    return arrayLikeToArray(value as ArrayLike<T>);
  }
}

function nonIterableSpread(): never {
  throw new TypeError(
    "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

export default function toConsumableArray<T>(value: ArrayLike<T> | Iterable<T>): T[] {
  return (
    arrayLikeToArray(value as ArrayLike<T>) ||
    iterableToArray(value as Iterable<T>) ||
    unsupportedIterableToArray(value) ||
    nonIterableSpread()
  );
}