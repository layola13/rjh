export function pluck<T, K extends keyof T>(...properties: string[]): (obj: T) => unknown {
  const propertyCount = properties.length;
  
  if (propertyCount === 0) {
    throw new Error("list of properties cannot be empty.");
  }
  
  return map<T, unknown>((item: T) => {
    let current: unknown = item;
    
    for (let i = 0; i < propertyCount; i++) {
      const value = current != null ? (current as Record<string, unknown>)[properties[i]] : undefined;
      
      if (value === undefined) {
        return undefined;
      }
      
      current = value;
    }
    
    return current;
  });
}

function map<T, R>(mapper: (item: T) => R): (source: T) => R {
  return (source: T) => mapper(source);
}