import defineProperty from './797560';

interface PropertyDescriptorMap {
  [key: string]: PropertyDescriptor;
}

interface AnyObject {
  [key: string]: any;
}

function getOwnPropertySymbolsFiltered(source: object, enumerable: boolean): symbol[] {
  const symbols = Object.getOwnPropertySymbols(source);
  
  if (enumerable) {
    return symbols.filter((symbol) => {
      const descriptor = Object.getOwnPropertyDescriptor(source, symbol);
      return descriptor?.enumerable ?? false;
    });
  }
  
  return symbols;
}

function getAllKeys(source: object, enumerableOnly: boolean): Array<string | symbol> {
  const keys: Array<string | symbol> = Object.keys(source);
  
  if (Object.getOwnPropertySymbols) {
    const symbols = getOwnPropertySymbolsFiltered(source, enumerableOnly);
    keys.push(...symbols);
  }
  
  return keys;
}

function objectSpread<T extends AnyObject>(target: T, ...sources: Array<Partial<T> | null | undefined>): T {
  for (let i = 0; i < sources.length; i++) {
    const source = sources[i] ?? {};
    
    if (i % 2 === 1) {
      const keys = getAllKeys(Object(source), true);
      keys.forEach((key) => {
        defineProperty(target, key as string, (source as AnyObject)[key as string]);
      });
    } else {
      if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        const keys = getAllKeys(Object(source), false);
        keys.forEach((key) => {
          const descriptor = Object.getOwnPropertyDescriptor(source, key);
          if (descriptor) {
            Object.defineProperty(target, key, descriptor);
          }
        });
      }
    }
  }
  
  return target;
}

export default objectSpread;