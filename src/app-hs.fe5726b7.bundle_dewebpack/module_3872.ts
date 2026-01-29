function isKeyable(value: unknown): boolean {
  const type = typeof value;
  return type === 'string' || type === 'number' || type === 'symbol' || type === 'boolean'
    ? value !== '__proto__'
    : value === null;
}

interface MapCacheData {
  hash: Map<string | number | symbol | boolean, unknown>;
  map: Map<unknown, unknown>;
  string: Map<string, unknown>;
}

interface MapCache {
  __data__: MapCacheData;
}

function getMapData(mapCache: MapCache, key: unknown): Map<unknown, unknown> {
  const data = mapCache.__data__;
  return isKeyable(key) 
    ? data[typeof key === 'string' ? 'string' : 'hash'] 
    : data.map;
}

export default getMapData;