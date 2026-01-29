export function toArray<T>(value: unknown, maxLength?: number): T[] | undefined {
  if (!value) {
    return undefined;
  }

  if (typeof value === "string") {
    return arrayLikeToArray(value, maxLength) as T[];
  }

  const objectType = Object.prototype.toString.call(value).slice(8, -1);
  
  let typeName = objectType;
  if (objectType === "Object" && value.constructor) {
    typeName = value.constructor.name;
  }

  if (typeName === "Map" || typeName === "Set") {
    return Array.from(value as Iterable<T>);
  }

  const isTypedArray = /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(typeName);
  if (typeName === "Arguments" || isTypedArray) {
    return arrayLikeToArray(value, maxLength) as T[];
  }

  return undefined;
}

function arrayLikeToArray<T>(arrayLike: ArrayLike<T> | string, maxLength?: number): T[] | string[] {
  const length = maxLength == null || maxLength > arrayLike.length 
    ? arrayLike.length 
    : maxLength;
  
  const result = new Array(length);
  
  for (let i = 0; i < length; i++) {
    result[i] = arrayLike[i];
  }
  
  return result;
}