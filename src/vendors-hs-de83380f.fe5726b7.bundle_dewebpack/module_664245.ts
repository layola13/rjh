function isNativeReflectConstruct(): boolean {
  try {
    return !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function() {})
    );
  } catch (e) {
    return false;
  }
}

type Constructor<T = any> = new (...args: any[]) => T;

export default function createSuper<T extends Constructor>(
  DerivedClass: T
): (...args: any[]) => InstanceType<T> {
  const hasNativeReflectConstruct = isNativeReflectConstruct();

  return function createSuperInternal(
    this: InstanceType<T>,
    ...args: any[]
  ): InstanceType<T> {
    const Super = Object.getPrototypeOf(DerivedClass) as Constructor;

    let instance: InstanceType<T>;

    if (hasNativeReflectConstruct) {
      const NewTarget = Object.getPrototypeOf(this).constructor as Constructor;
      instance = Reflect.construct(Super, args, NewTarget) as InstanceType<T>;
    } else {
      instance = Super.apply(this, args) as InstanceType<T>;
    }

    return instance && (typeof instance === 'object' || typeof instance === 'function')
      ? instance
      : this;
  };
}