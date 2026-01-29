function getEnumerableSymbols(obj: unknown): symbol[] {
  if (obj == null) {
    return [];
  }
  
  const object = Object(obj);
  const symbols = Object.getOwnPropertySymbols(object);
  const propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
  
  return symbols.filter((symbol: symbol) => {
    return propertyIsEnumerable.call(object, symbol);
  });
}

export default getEnumerableSymbols;