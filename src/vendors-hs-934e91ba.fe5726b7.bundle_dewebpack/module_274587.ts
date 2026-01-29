function cloneBuffer<T extends Buffer>(buffer: T, isDeep: boolean): T {
  if (isDeep) {
    return buffer.slice() as T;
  }
  
  const length = buffer.length;
  const result = Buffer.allocUnsafe 
    ? Buffer.allocUnsafe(length) 
    : new buffer.constructor(length);
  
  buffer.copy(result);
  return result as T;
}

export default cloneBuffer;