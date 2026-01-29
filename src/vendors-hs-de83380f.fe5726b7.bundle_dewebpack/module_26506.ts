async function asyncToGenerator<T>(
  generatorFunction: (...args: any[]) => Generator<any, T, any>
): Promise<T> {
  return function (this: any, ...args: any[]): Promise<T> {
    const generator = generatorFunction.apply(this, args);

    function handleNext(value?: any): Promise<T> {
      return handle(generator, "next", value);
    }

    function handleThrow(error: any): Promise<T> {
      return handle(generator, "throw", error);
    }

    function handle(
      gen: Generator<any, T, any>,
      method: "next" | "throw",
      arg: any
    ): Promise<T> {
      try {
        const result = gen[method](arg);
        const value = result.value;

        if (result.done) {
          return Promise.resolve(value);
        }

        return Promise.resolve(value).then(handleNext, handleThrow);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    return handleNext(undefined);
  } as any;
}

export default asyncToGenerator;