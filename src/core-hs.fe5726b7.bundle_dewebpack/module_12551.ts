function getPropertyFunction(
  obj: object,
  propertyKey: string | symbol,
  descriptorKey: 'get' | 'set' | 'value'
): Function | undefined {
  try {
    const descriptor = Object.getOwnPropertyDescriptor(obj, propertyKey);
    if (!descriptor) {
      return undefined;
    }
    
    const fn = descriptor[descriptorKey];
    
    if (typeof fn !== 'function') {
      return undefined;
    }
    
    return fn;
  } catch (error) {
    return undefined;
  }
}

export default getPropertyFunction;