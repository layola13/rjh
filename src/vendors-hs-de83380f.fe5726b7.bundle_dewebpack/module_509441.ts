function setPrototypeOf<T extends object, U extends object>(target: T, proto: U): T & U {
  if (Object.setPrototypeOf) {
    return Object.setPrototypeOf(target, proto) as T & U;
  }
  
  (target as any).__proto__ = proto;
  return target as T & U;
}

export default setPrototypeOf;