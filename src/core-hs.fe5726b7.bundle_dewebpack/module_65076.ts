function assertCorrectInvocation<T extends object>(instance: unknown, constructor: T): unknown {
  const isInstanceOf = (obj: unknown, ctor: object): boolean => {
    if (obj == null || typeof obj !== 'object') return false;
    let proto = Object.getPrototypeOf(obj);
    while (proto !== null) {
      if (proto === ctor.prototype) return true;
      proto = Object.getPrototypeOf(proto);
    }
    return false;
  };

  if (isInstanceOf(instance, constructor)) {
    return instance;
  }
  
  throw new TypeError("Incorrect invocation");
}

export default assertCorrectInvocation;