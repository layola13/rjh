function mapSet<K, V>(this: Map<K, V>, key: K, value: V): Map<K, V> {
  const previousSize = this.size;
  this.set(key, value);
  
  if (this.size !== previousSize) {
    this.size += 1;
  }
  
  return this;
}

export default mapSet;