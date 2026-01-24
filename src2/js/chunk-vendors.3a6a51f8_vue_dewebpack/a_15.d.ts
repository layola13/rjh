/**
 * Async/await helper module
 * Provides runtime support for async function transformation
 */

/**
 * Handles the execution of a single step in an async generator
 * @template T - The type of value yielded by the generator
 * @param generator - The generator object to step through
 * @param resolve - Promise resolve callback for successful completion
 * @param reject - Promise reject callback for errors
 * @param nextStep - Callback to advance to next step
 * @param throwStep - Callback to throw an error into the generator
 * @param method - The generator method to call ('next' or 'throw')
 * @param value - The value to pass to the generator method
 */
function asyncGeneratorStep<T>(
  generator: Generator<unknown, T, unknown>,
  resolve: (value: T) => void,
  reject: (reason?: unknown) => void,
  nextStep: (value: unknown) => void,
  throwStep: (error: unknown) => void,
  method: 'next' | 'throw',
  value: unknown
): void {
  try {
    const result = generator[method](value);
    const resultValue = result.value;

    if (result.done) {
      resolve(resultValue as T);
    } else {
      Promise.resolve(resultValue).then(nextStep, throwStep);
    }
  } catch (error) {
    reject(error);
  }
}

/**
 * Wraps a generator function to provide async/await functionality
 * Transforms generator-based async code into Promise-returning functions
 * @template TArgs - Tuple type of function arguments
 * @template TReturn - The return type of the async function
 * @param generatorFn - Generator function to wrap
 * @returns Async function that returns a Promise
 */
export function asyncToGenerator<TArgs extends unknown[], TReturn>(
  generatorFn: (...args: TArgs) => Generator<unknown, TReturn, unknown>
): (...args: TArgs) => Promise<TReturn> {
  return function (this: unknown, ...args: TArgs): Promise<TReturn> {
    const context = this;

    return new Promise<TReturn>((resolve, reject) => {
      const generator = generatorFn.apply(context, args);

      function handleNext(value: unknown): void {
        asyncGeneratorStep(generator, resolve, reject, handleNext, handleThrow, 'next', value);
      }

      function handleThrow(error: unknown): void {
        asyncGeneratorStep(generator, resolve, reject, handleNext, handleThrow, 'throw', error);
      }

      handleNext(undefined);
    });
  };
}