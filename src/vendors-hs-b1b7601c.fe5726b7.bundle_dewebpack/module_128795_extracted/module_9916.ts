function has<K>(this: Map<K, unknown>, key: K): boolean {
  return this.has(key);
}

export default has;