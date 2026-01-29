function getTag(value: unknown): string {
  if (value == null) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }
  
  const hasToStringTag = typeof Symbol !== 'undefined' && Symbol.toStringTag;
  
  if (hasToStringTag && Symbol.toStringTag in Object(value)) {
    return getRawTag(value);
  }
  
  return objectToString(value);
}

function getRawTag(value: unknown): string {
  const isOwn = Object.prototype.hasOwnProperty.call(value, Symbol.toStringTag);
  const tag = (value as any)[Symbol.toStringTag];
  
  try {
    (value as any)[Symbol.toStringTag] = undefined;
  } catch (e) {}
  
  const result = Object.prototype.toString.call(value);
  
  if (isOwn) {
    (value as any)[Symbol.toStringTag] = tag;
  } else {
    delete (value as any)[Symbol.toStringTag];
  }
  
  return result;
}

function objectToString(value: unknown): string {
  return Object.prototype.toString.call(value);
}

export default getTag;