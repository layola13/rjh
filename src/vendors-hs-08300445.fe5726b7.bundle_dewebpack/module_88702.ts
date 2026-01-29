export default function compose<T>(...funcs: Array<(arg: T) => T>): (arg: T) => T {
  if (funcs.length === 0) {
    return (arg: T) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  const lastFunc = funcs[funcs.length - 1];
  const restFuncs = funcs.slice(0, -1);

  return (...args: any[]) => {
    return restFuncs.reduceRight(
      (composed, func) => func(composed),
      lastFunc(...args)
    );
  };
}