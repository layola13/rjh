export function get<T>(target: T, key: keyof T): T[keyof T] {
  return target[key];
}