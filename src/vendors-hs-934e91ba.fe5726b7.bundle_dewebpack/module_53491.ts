function isStrictEqual(value: unknown): boolean {
  return value == value && !isObject(value);
}

function isObject(value: unknown): boolean {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

export default isStrictEqual;