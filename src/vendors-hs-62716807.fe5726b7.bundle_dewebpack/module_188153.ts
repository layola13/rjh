function getDescriptorValue(
  obj: object,
  prop: PropertyKey,
  key: 'value' | 'get' | 'set' | 'writable' | 'enumerable' | 'configurable'
): any {
  try {
    const descriptor = Object.getOwnPropertyDescriptor(obj, prop);
    if (!descriptor) {
      return undefined;
    }
    const value = descriptor[key];
    return value;
  } catch (error) {
    return undefined;
  }
}

export default getDescriptorValue;