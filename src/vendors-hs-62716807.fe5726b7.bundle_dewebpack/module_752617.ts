function getObjectType(value: unknown): string {
  const toString = Object.prototype.toString;
  const typeString = toString.call(value);
  return typeString.slice(8, -1);
}

export default getObjectType;