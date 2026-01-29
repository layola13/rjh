type AnyFunction = (...args: any[]) => any;

interface ApplyFunction {
  (func: AnyFunction, thisArg: any, args: any[]): any;
}

const apply: ApplyFunction = (func, thisArg, args) => {
  return func.apply(thisArg, args);
};

export function overRest<T extends AnyFunction>(
  func: T,
  start: number = func.length - 1,
  transform: (args: any[]) => any
): (...args: any[]) => any {
  const startIndex = Math.max(start === undefined ? func.length - 1 : start, 0);

  return function (this: any): any {
    const args = arguments;
    let index = -1;
    const restLength = Math.max(args.length - startIndex, 0);
    const rest = Array(restLength);

    while (++index < restLength) {
      rest[index] = args[startIndex + index];
    }

    index = -1;
    const finalArgs = Array(startIndex + 1);

    while (++index < startIndex) {
      finalArgs[index] = args[index];
    }

    finalArgs[startIndex] = transform(rest);

    return apply(func, this, finalArgs);
  };
}