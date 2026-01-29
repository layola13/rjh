function identity<T>(value: T): T {
  return value;
}

function baseRest<T extends (...args: any[]) => any>(
  func: T,
  start: number,
  transform: (args: any[]) => any
): (...args: any[]) => ReturnType<T> {
  return function(this: any, ...args: any[]): ReturnType<T> {
    const restArgs = args.slice(start);
    const transformedArgs = transform(restArgs);
    return func.apply(this, [...args.slice(0, start), transformedArgs]);
  };
}

function setToString<T extends Function>(func: T, name: string): T {
  Object.defineProperty(func, 'name', {
    value: name,
    configurable: true
  });
  return func;
}

export function overRest<T extends (...args: any[]) => any>(
  func: T,
  transform: (args: any[]) => any
): (...args: any[]) => ReturnType<T> {
  return setToString(baseRest(func, func.length - 1, transform), func.name);
}