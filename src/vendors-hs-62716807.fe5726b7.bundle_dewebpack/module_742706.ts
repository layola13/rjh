function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

function requireObjectCoercible(value: unknown): object {
  if (isObject(value)) {
    return value;
  }
  throw new TypeError(String(value) + " is not an object");
}

export default requireObjectCoercible;