function moduleHas<T extends object>(obj: T, key: PropertyKey): boolean {
  return !!obj && !!hasProperty(obj, key);
}

function hasProperty(obj: object, key: PropertyKey): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export { moduleHas as has };