function getEnumerablePropertySymbols(obj: unknown): symbol[] {
  if (obj == null) {
    return [];
  }
  
  const object = Object(obj);
  const symbols = Object.getOwnPropertySymbols(object);
  
  return symbols.filter((symbol: symbol) => 
    Object.prototype.propertyIsEnumerable.call(object, symbol)
  );
}

export default getEnumerablePropertySymbols;