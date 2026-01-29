export default function objectWithoutPropertiesLoose<T extends Record<string | symbol, any>>(
  source: T | null | undefined,
  excluded: Array<string | symbol>
): Partial<T> {
  if (source == null) {
    return {};
  }

  const target: Partial<T> = {} as Partial<T>;
  const sourceKeys = Object.keys(source);

  for (const key of sourceKeys) {
    if (excluded.indexOf(key) === -1) {
      target[key as keyof T] = source[key as keyof T];
    }
  }

  if (Object.getOwnPropertySymbols) {
    const symbols = Object.getOwnPropertySymbols(source);
    
    for (const symbol of symbols) {
      if (
        excluded.indexOf(symbol) === -1 &&
        Object.prototype.propertyIsEnumerable.call(source, symbol)
      ) {
        target[symbol as keyof T] = source[symbol as keyof T];
      }
    }
  }

  return target;
}