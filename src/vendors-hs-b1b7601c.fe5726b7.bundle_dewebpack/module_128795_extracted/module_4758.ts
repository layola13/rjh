export default function has<T>(key: T): boolean {
  return this.__data__.has(key);
}