function deleteFromMap<K, V>(this: Map<K, V>, key: K): boolean {
  const hasKey = this.has(key);
  const deleted = this.delete(key);
  
  if (deleted) {
    this.size -= 1;
  }
  
  return deleted;
}

export default deleteFromMap;