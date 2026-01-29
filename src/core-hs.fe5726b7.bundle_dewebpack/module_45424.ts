export function mergeObject<T extends object, U extends object>(
  first: T,
  second: U
): T & U {
  return Object.assign(Object.assign({}, first), second);
}