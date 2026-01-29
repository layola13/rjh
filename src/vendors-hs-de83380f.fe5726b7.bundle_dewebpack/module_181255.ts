function getPrototypeOf(obj: any): any {
  return Object.getPrototypeOf(obj);
}

function isNativeReflectConstruct(): boolean {
  if (typeof Reflect === 'undefined' || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === 'function') return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], () => {}));
    return true;
  } catch (e) {
    return false;
  }
}

function possibleConstructorReturn(self: any, call: any): any {
  if (call && (typeof call === 'object' || typeof call === 'function')) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError('Derived constructors may only return object or undefined');
  }
  return assertThisInitialized(self);
}

function assertThisInitialized(self: any): any {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

export default function createSuper<T extends new (...args: any[]) => any>(
  Derived: T
): (...args: any[]) => InstanceType<T> {
  const hasNativeReflectConstruct = isNativeReflectConstruct();
  
  return function constructorWrapper(this: any): InstanceType<T> {
    const Super = getPrototypeOf(Derived);
    let result: any;
    
    if (hasNativeReflectConstruct) {
      const NewTarget = getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    
    return possibleConstructorReturn(this, result);
  };
}