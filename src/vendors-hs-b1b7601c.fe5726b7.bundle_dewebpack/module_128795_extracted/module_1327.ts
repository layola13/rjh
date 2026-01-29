const nativeMap = typeof Map !== 'undefined' ? Map : null;

function hasHashKey(this: { __data__: Record<string, unknown> }, key: string): boolean {
  const data = this.__data__;
  return nativeMap 
    ? data[key] !== undefined 
    : Object.prototype.hasOwnProperty.call(data, key);
}

export default hasHashKey;