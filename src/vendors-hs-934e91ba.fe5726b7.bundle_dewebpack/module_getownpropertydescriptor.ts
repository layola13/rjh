function getOwnPropertyDescriptor<T extends object>(
  target: T,
  propertyKey: PropertyKey
): PropertyDescriptor | undefined {
  const resolvedTarget = B(target);
  const descriptor = Reflect.getOwnPropertyDescriptor(resolvedTarget, propertyKey);
  
  return descriptor
    ? {
        writable: true,
        configurable: target.t !== 1 || propertyKey !== "length",
        enumerable: descriptor.enumerable,
        value: resolvedTarget[propertyKey as keyof typeof resolvedTarget]
      }
    : descriptor;
}