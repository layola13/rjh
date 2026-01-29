function mapDelete<K, V>(this: Map<K, V>, key: K): boolean {
  const data = this.get(key);
  const result = data !== undefined && this.delete(key);
  this.size -= result ? 1 : 0;
  return result;
}

export default mapDelete;