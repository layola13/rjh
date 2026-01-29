function hasOwn(target: unknown, property: PropertyKey): boolean {
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const targetObject = Object(target);
  return hasOwnProperty.call(targetObject, property);
}

export default Object.hasOwn || hasOwn;