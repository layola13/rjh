function getEnumerableSymbols(obj: any): symbol[] {
  if (obj == null) {
    return [];
  }
  
  const objectValue = Object(obj);
  const symbols = Object.getOwnPropertySymbols(objectValue);
  const propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
  
  return symbols.filter((symbol: symbol) => {
    return propertyIsEnumerable.call(objectValue, symbol);
  });
}

export default getEnumerableSymbols;