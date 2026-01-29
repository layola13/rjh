interface PropertyDescriptor {
  [key: string | symbol]: unknown;
}

function omitWithSymbols<T extends Record<string | symbol, unknown>>(
  source: T | null | undefined,
  keysToOmit: Array<string | symbol>
): Partial<T> {
  if (source == null) {
    return {};
  }

  const result: PropertyDescriptor = omitBasicProperties(source, keysToOmit);

  if (Object.getOwnPropertySymbols) {
    const symbols = Object.getOwnPropertySymbols(source);
    
    for (let index = 0; index < symbols.length; index++) {
      const symbol = symbols[index];
      
      if (
        keysToOmit.indexOf(symbol) === -1 &&
        Object.prototype.propertyIsEnumerable.call(source, symbol)
      ) {
        result[symbol] = source[symbol];
      }
    }
  }

  return result as Partial<T>;
}

function omitBasicProperties<T extends Record<string | symbol, unknown>>(
  source: T,
  keysToOmit: Array<string | symbol>
): Partial<T> {
  const result: PropertyDescriptor = {};
  
  for (const key in source) {
    if (
      Object.prototype.hasOwnProperty.call(source, key) &&
      keysToOmit.indexOf(key) === -1
    ) {
      result[key] = source[key];
    }
  }
  
  return result as Partial<T>;
}

export default omitWithSymbols;