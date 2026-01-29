const isCallable = (value: unknown): value is (...args: any[]) => any => {
  return typeof value === 'function';
};

const functionApply = <T, A extends any[], R>(
  target: (this: T, ...args: A) => R,
  thisArg: T,
  args: A
): R => {
  if (typeof Reflect === 'object' && Reflect.apply) {
    return Reflect.apply(target, thisArg, args);
  }
  
  return Function.prototype.call.apply(
    Function.prototype.apply,
    [target, thisArg, args] as [typeof target, T, A]
  );
};

export default functionApply;