export function assertThisInitialized<T>(instance: T, fieldName: string): T {
  if (!Object.prototype.hasOwnProperty.call(instance, fieldName)) {
    throw new TypeError("attempted to use private field on non-instance");
  }
  return instance;
}

export default assertThisInitialized;