export default function createReverseIterator<T extends Record<string, unknown>>(obj: T): () => IteratorResult<keyof T> {
  const target = Object(obj);
  const keys: (keyof T)[] = [];
  
  for (const key in target) {
    keys.unshift(key);
  }
  
  return function iterator(): IteratorResult<keyof T> {
    if (keys.length > 0) {
      const currentKey = keys.pop()!;
      
      if (currentKey in target) {
        return {
          value: currentKey,
          done: false
        };
      }
    }
    
    return {
      value: undefined as unknown as keyof T,
      done: true
    };
  };
}