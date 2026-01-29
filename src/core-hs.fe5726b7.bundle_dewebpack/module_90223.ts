const isExtensible = (obj: object): boolean => {
  return Object.isExtensible(obj);
};

const defineProperty = <T extends object>(
  obj: T,
  prop: PropertyKey,
  descriptor: PropertyDescriptor
): void => {
  Object.defineProperty(obj, prop, descriptor);
};

const testArrayBufferExtensibility = (): boolean => {
  if (typeof ArrayBuffer !== "function") {
    return false;
  }

  const buffer = new ArrayBuffer(8);
  
  if (!isExtensible(buffer)) {
    return false;
  }

  try {
    defineProperty(buffer, "a", {
      value: 8
    });
    return true;
  } catch {
    return false;
  }
};

export default testArrayBufferExtensibility;