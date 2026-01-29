function moduleB(inputValue: number): number {
  inputValue |= 0;
  
  const stackTop: number = j - 16 | 0;
  j = stackTop;
  
  a[stackTop + 12 >> 2] = inputValue;
  
  const tempOffset: number = j - 16 | 0;
  a[tempOffset + 8 >> 2] = a[stackTop + 12 >> 2];
  a[tempOffset + 12 >> 2] = a[a[tempOffset + 8 >> 2] + 4 >> 2];
  
  let result: number = 0;
  const sourcePointer: number = a[tempOffset + 12 >> 2];
  const length: number = rt(sourcePointer) + 1 | 0;
  const allocatedMemory: number = q(length);
  
  if (allocatedMemory) {
    result = SA(allocatedMemory, sourcePointer, length);
  }
  
  j = stackTop + 16 | 0;
  
  return result | 0;
}