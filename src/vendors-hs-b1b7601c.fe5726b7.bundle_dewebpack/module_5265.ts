import { getMapData } from './module_5050';

export function mapSet<K, V>(this: Map<K, V>, key: K, value: V): Map<K, V> {
  const data = getMapData(this, key);
  const previousSize = data.size;
  
  data.set(key, value);
  this.size += data.size === previousSize ? 0 : 1;
  
  return this;
}