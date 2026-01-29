/**
 * Gets the enumerable symbol properties of an object.
 * 
 * @param value - The object to query
 * @returns An array of enumerable symbol properties
 */
export function getSymbols(value: any): symbol[] {
  if (value == null) {
    return [];
  }
  
  const obj = Object(value);
  const allSymbols = Object.getOwnPropertySymbols(obj);
  const propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
  
  return allSymbols.filter((symbol: symbol) => {
    return propertyIsEnumerable.call(obj, symbol);
  });
}

export default getSymbols;