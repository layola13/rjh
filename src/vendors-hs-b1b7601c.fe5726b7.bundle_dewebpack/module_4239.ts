function getTag(value: unknown): string {
  if (value == null) {
    return value === undefined ? "[object Undefined]" : "[object Null]";
  }
  
  const hasToStringTag = Symbol.toStringTag && Symbol.toStringTag in Object(value);
  
  if (hasToStringTag) {
    return getRawTag(value);
  }
  
  return objectToString(value);
}

function getRawTag(value: unknown): string {
  const isOwn = Object.prototype.hasOwnProperty.call(value, Symbol.toStringTag);
  const tag = (value as Record<symbol, unknown>)[Symbol.toStringTag];
  
  try {
    (value as Record<symbol, unknown>)[Symbol.toStringTag] = undefined;
  } catch (e) {
    // Ignore error
  }
  
  const result = Object.prototype.toString.call(value);
  
  if (isOwn) {
    (value as Record<symbol, unknown>)[Symbol.toStringTag] = tag;
  } else {
    delete (value as Record<symbol, unknown>)[Symbol.toStringTag];
  }
  
  return result;
}

function objectToString(value: unknown): string {
  return Object.prototype.toString.call(value);
}

export default getTag;