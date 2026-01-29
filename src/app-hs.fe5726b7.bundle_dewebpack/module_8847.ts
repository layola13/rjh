function isSymbol(value: unknown): value is symbol {
  const getTag = (val: unknown): string => {
    return Object.prototype.toString.call(val);
  };

  const isObjectLike = (val: unknown): val is object {
    return val !== null && typeof val === 'object';
  };

  return typeof value === 'symbol' || (isObjectLike(value) && getTag(value) === '[object Symbol]');
}

export default isSymbol;