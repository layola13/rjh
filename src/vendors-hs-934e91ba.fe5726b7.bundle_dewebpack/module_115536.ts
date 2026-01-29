function applyFunction<T, R>(
  fn: (...args: unknown[]) => R,
  context: T,
  args: unknown[]
): R {
  switch (args.length) {
    case 0:
      return fn.call(context);
    case 1:
      return fn.call(context, args[0]);
    case 2:
      return fn.call(context, args[0], args[1]);
    case 3:
      return fn.call(context, args[0], args[1], args[2]);
  }
  return fn.apply(context, args);
}

export default applyFunction;