function toArray<T>(value: T, length?: number): T extends ArrayLike<infer U> ? U[] : T[] {
  if (Array.isArray(value)) {
    return value;
  }
  
  if (typeof length !== 'undefined' && value != null && typeof (value as any)[Symbol.iterator] === 'function') {
    const result: any[] = [];
    const iterator = (value as any)[Symbol.iterator]();
    let step = iterator.next();
    let index = 0;
    
    while (!step.done && index < length) {
      result.push(step.value);
      step = iterator.next();
      index++;
    }
    
    return result;
  }
  
  if (value != null && typeof value === 'object' && typeof (value as any).length === 'number') {
    return Array.from(value as ArrayLike<any>);
  }
  
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

export default toArray;