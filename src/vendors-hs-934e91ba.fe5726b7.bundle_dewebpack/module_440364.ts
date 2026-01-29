const nativeMap = typeof Map !== 'undefined' ? Map : null;

function hasMapData(this: { __data__: Map<unknown, unknown> | Record<string, unknown> }, key: string): boolean {
  const data = this.__data__;
  
  if (nativeMap && data instanceof Map) {
    return data.has(key);
  }
  
  return Object.prototype.hasOwnProperty.call(data, key);
}

export default hasMapData;