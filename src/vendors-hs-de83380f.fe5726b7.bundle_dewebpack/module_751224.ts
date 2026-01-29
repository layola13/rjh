function asyncGeneratorStep<T>(
  generator: Iterator<T>,
  resolve: (value: T) => void,
  reject: (error: unknown) => void,
  next: (value?: unknown) => void,
  throwError: (error: unknown) => void,
  key: 'next' | 'throw',
  arg?: unknown
): void {
  try {
    const info = generator[key](arg);
    const value = info.value;

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(next, throwError);
    }
  } catch (error) {
    reject(error);
  }
}

export default function asyncToGenerator<T extends (...args: any[]) => Iterator<any>>(
  generatorFunction: T
): (...args: Parameters<T>) => Promise<any> {
  return function (this: unknown, ...args: Parameters<T>): Promise<any> {
    return new Promise((resolve, reject) => {
      const generator = generatorFunction.apply(this, args);

      function next(value?: unknown): void {
        asyncGeneratorStep(generator, resolve, reject, next, throwError, 'next', value);
      }

      function throwError(error: unknown): void {
        asyncGeneratorStep(generator, resolve, reject, next, throwError, 'throw', error);
      }

      next(undefined);
    });
  };
}