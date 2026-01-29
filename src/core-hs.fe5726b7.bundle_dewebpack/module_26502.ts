export function makeObj<T extends object, U extends object>(
  e: T,
  t: U
): T & U {
  return Object.assign(Object.assign({}, e), t);
}