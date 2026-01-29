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

export function createClass(
  constructor: Function,
  protoProps?: PropertyDescriptor[],
  staticProps?: PropertyDescriptor[]
): Function {
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

export default createClass;