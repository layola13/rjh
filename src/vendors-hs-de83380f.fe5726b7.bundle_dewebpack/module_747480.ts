export function readOnlyError(propertyName: string): never {
  throw new TypeError(`"${propertyName}" is read-only`);
}

export default readOnlyError;