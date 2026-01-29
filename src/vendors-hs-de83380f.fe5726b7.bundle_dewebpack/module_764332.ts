interface PropertyDescriptor {
  enumerable?: boolean;
  configurable?: boolean;
  writable?: boolean;
  value?: unknown;
}

function mergeObjects<T extends Record<string, unknown>>(
  target: T,
  ...sources: Array<Record<string, unknown>>
): T {
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i] ?? {};
    const keys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      const symbols = Object.getOwnPropertySymbols(source).filter((symbol) => {
        const descriptor = Object.getOwnPropertyDescriptor(source, symbol);
        return descriptor?.enumerable ?? false;
      });
      keys.push(...(symbols as unknown as string[]));
    }

    keys.forEach((key) => {
      target[key] = source[key];
    });
  }

  return target;
}

export default mergeObjects;