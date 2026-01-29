function getMapData<K, V>(map: Map<K, V> | WeakMap<object, V>, key: K): Map<K, V> | WeakMap<object, V> {
  const data = map.__data__;
  return isKeyable(key) 
    ? data[typeof key === "string" ? "string" : "hash"] 
    : data.map;
}

function isKeyable(value: unknown): boolean {
  const type = typeof value;
  return type === "string" || 
         type === "number" || 
         type === "symbol" || 
         type === "boolean"
    ? value !== "__proto__"
    : value === null;
}

export { getMapData };