function defineProperties(target: any, descriptors: PropertyDescriptor[]): void {
  for (const descriptor of descriptors) {
    descriptor.enumerable = descriptor.enumerable ?? false;
    descriptor.configurable = true;
    
    if ("value" in descriptor) {
      descriptor.writable = true;
    }
    
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

export default function createClass<T extends new (...args: any[]) => any>(
  constructor: T,
  protoProps?: PropertyDescriptor[],
  staticProps?: PropertyDescriptor[]
): T {
  if (protoProps) {
    defineProperties(constructor.prototype, protoProps);
  }
  
  if (staticProps) {
    defineProperties(constructor, staticProps);
  }
  
  Object.defineProperty(constructor, "prototype", {
    writable: false
  });
  
  return constructor;
}