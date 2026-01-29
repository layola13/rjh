function deleteMapEntry<K, V>(this: Map<K, V>, key: K): boolean {
  const wasDeleted = Map.prototype.delete.call(this, key);
  
  if (wasDeleted) {
    this.size -= 1;
  }
  
  return wasDeleted;
}

export default deleteMapEntry;