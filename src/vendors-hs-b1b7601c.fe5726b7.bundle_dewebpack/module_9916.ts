export default function has<K>(this: Map<K, unknown>, key: K): boolean {
  return this.get(key) !== undefined && this.has(key);
}