function checkInvocation<T>(instance: T, constructor: Function): T {
  if (isPrototypeOf(constructor, instance)) {
    return instance;
  }
  throw new TypeError("Incorrect invocation");
}

function isPrototypeOf(constructor: Function, instance: unknown): boolean {
  // Implementation depends on module 862730
  // Placeholder for the actual prototype check logic
  if (constructor?.prototype && instance != null) {
    return constructor.prototype.isPrototypeOf(instance);
  }
  return false;
}

export default checkInvocation;