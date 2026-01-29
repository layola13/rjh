function getPropertyDescriptor(obj: object, key: PropertyKey): PropertyDescriptor | undefined {
  let current: object | null = obj;
  
  while (current) {
    const descriptor = Object.getOwnPropertyDescriptor(current, key);
    if (descriptor) {
      return descriptor;
    }
    current = Object.getPrototypeOf(current);
  }
  
  return undefined;
}

function get<T = unknown>(
  target: object,
  propertyKey: PropertyKey,
  receiver?: unknown
): T {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    return Reflect.get(target, propertyKey, receiver) as T;
  }

  const descriptor = getPropertyDescriptor(target, propertyKey);
  
  if (!descriptor) {
    return undefined as T;
  }

  if (descriptor.get) {
    const context = arguments.length < 3 ? target : receiver;
    return descriptor.get.call(context) as T;
  }

  return descriptor.value as T;
}

export default get;