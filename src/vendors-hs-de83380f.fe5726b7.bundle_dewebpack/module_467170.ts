type AsyncIteratorMethod = 'next' | 'throw' | 'return';

interface WrappedValue<T> {
  v: T;
}

interface IteratorResult<T> {
  value: T;
  done?: boolean;
}

function asyncGeneratorStep<T>(
  generator: AsyncGenerator<T>,
  resolve: (value: unknown) => Promise<unknown>,
  method: AsyncIteratorMethod,
  arg: unknown,
  onFulfilled: (result: IteratorResult<T>) => void,
  onRejected: (error: unknown) => void
): void {
  try {
    const generatorMethod = generator[method] as (arg?: unknown) => IteratorResult<T>;
    const result = generatorMethod.call(generator, arg);
    const resultValue = result.value;

    if (isWrappedValue(resultValue)) {
      resolve(resultValue.v).then(
        (unwrappedValue: unknown) => {
          asyncGeneratorStep(generator, resolve, 'next', unwrappedValue, onFulfilled, onRejected);
        },
        (error: unknown) => {
          asyncGeneratorStep(generator, resolve, 'throw', error, onFulfilled, onRejected);
        }
      );
    } else {
      resolve(resultValue).then(
        (resolvedValue: unknown) => {
          result.value = resolvedValue as T;
          onFulfilled(result);
        },
        (error: unknown) => {
          asyncGeneratorStep(generator, resolve, 'throw', error, onFulfilled, onRejected);
        }
      );
    }
  } catch (error) {
    onRejected(error);
  }
}

function isWrappedValue<T>(value: unknown): value is WrappedValue<T> {
  return typeof value === 'object' && value !== null && 'v' in value;
}

function defineProperty<T extends object>(
  target: T,
  key: PropertyKey,
  value: unknown,
  enumerable: boolean = false
): void {
  Object.defineProperty(target, key, {
    value,
    enumerable,
    writable: true,
    configurable: true
  });
}

export default function asyncToGenerator<T>(
  generator: AsyncGenerator<T>,
  PromiseConstructor: PromiseConstructor
): AsyncGenerator<T> {
  let previousPromise: Promise<unknown> | undefined;

  function invokeMethod(
    method: AsyncIteratorMethod,
    arg: unknown,
    isInitialCall: boolean
  ): Promise<IteratorResult<T>> {
    function createPromise(): Promise<IteratorResult<T>> {
      return new PromiseConstructor((onFulfilled, onRejected) => {
        asyncGeneratorStep(generator, PromiseConstructor.resolve.bind(PromiseConstructor), method, arg, onFulfilled, onRejected);
      });
    }

    previousPromise = previousPromise 
      ? previousPromise.then(createPromise, createPromise) 
      : createPromise();

    return previousPromise as Promise<IteratorResult<T>>;
  }

  if (!generator.next) {
    defineProperty(generator, Symbol.asyncIterator ?? '@asyncIterator', function (this: AsyncGenerator<T>) {
      return this;
    });
  }

  defineProperty(generator, '_invoke', invokeMethod, true);

  return generator;
}