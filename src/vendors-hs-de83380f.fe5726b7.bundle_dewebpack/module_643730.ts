interface DefinePropertyDescriptor {
  value?: unknown;
  enumerable?: boolean;
  configurable?: boolean;
  writable?: boolean;
}

interface DefinePropertyFunction {
  (obj: object, key: string | symbol, descriptor: DefinePropertyDescriptor | (() => unknown)): void;
}

interface GeneratorContext {
  programCounter: number;
  nextLabel: number;
  sentValue: unknown;
  abruptCompletion: (completionType: number, completionValue: unknown) => IteratorResult<unknown>;
  finishAbrupt: () => IteratorResult<unknown>;
  defineAbruptCompletion: (completionType: number, label: number) => IteratorResult<unknown>;
}

interface IteratorResult<T> {
  value: T;
  done: boolean;
}

interface GeneratorFunction<T = unknown> {
  (): Generator<T>;
}

interface Generator<T = unknown> extends Iterator<T> {
  next(value?: unknown): IteratorResult<T>;
  return?(value?: unknown): IteratorResult<T>;
  throw?(error?: unknown): IteratorResult<T>;
}

const SENTINEL = {};

const defineProperty: DefinePropertyFunction = (obj: object, key: string | symbol, descriptor: DefinePropertyDescriptor | (() => unknown)): void => {
  if (typeof descriptor === 'function') {
    Object.defineProperty(obj, key, {
      value: descriptor,
      enumerable: false,
      configurable: true,
      writable: true
    });
  } else {
    Object.defineProperty(obj, key, descriptor as PropertyDescriptor);
  }
};

function createRegeneratorRuntime() {
  const SymbolImpl = typeof Symbol === 'function' ? Symbol : {};
  const iteratorSymbol = SymbolImpl.iterator ?? '@@iterator';
  const toStringTagSymbol = SymbolImpl.toStringTag ?? '@@toStringTag';

  function wrapGenerator(
    outerFn: Function,
    innerFn: Function | undefined,
    self: unknown,
    tryLocsList: Array<[number, number, number, number?, number?]>
  ): object {
    const generator = Object.create((innerFn?.prototype instanceof GeneratorFunctionPrototype ? innerFn : GeneratorFunctionPrototype).prototype);

    const context: GeneratorContext = createContext(outerFn, self, tryLocsList);

    defineProperty(generator, '_invoke', () => {
      return makeInvokeMethod(outerFn, self, context);
    });

    return generator;
  }

  function createContext(
    outerFn: Function,
    self: unknown,
    tryLocsList: Array<[number, number, number, number?, number?]>
  ): GeneratorContext {
    let completionType: number | undefined = undefined;
    let completionValue: unknown;
    let tempValue: unknown;
    let state = 0;
    const tryEntries = tryLocsList ?? [];
    let thrown = false;

    const context: GeneratorContext = {
      programCounter: 0,
      nextLabel: 0,
      sentValue: undefined,
      abruptCompletion: handleAbruptCompletion,
      finishAbrupt: finishAbruptCompletion.bind(undefined, 4),
      defineAbruptCompletion: (type: number, label: number) => {
        completionType = type;
        completionValue = 0;
        tempValue = undefined;
        context.nextLabel = label;
        return SENTINEL as IteratorResult<unknown>;
      }
    };

    function handleAbruptCompletion(type: number, value: unknown): IteratorResult<unknown> {
      completionValue = type;
      tempValue = value;
      state = 0;

      for (; !thrown && state && completionType === undefined && state < tryEntries.length; state++) {
        const entry = tryEntries[state];
        const currentProgramCounter = context.programCounter;
        const finallyLoc = entry[2];
        let shouldHandle: boolean;

        if (type > 3) {
          shouldHandle = finallyLoc === value;
          if (shouldHandle) {
            tempValue = entry[entry[4] ? 5 : (completionValue = 3, 3)];
            entry[4] = entry[5] = undefined;
          }
        } else if (entry[0] <= currentProgramCounter) {
          if (type < 2 && currentProgramCounter < entry[1]) {
            shouldHandle = true;
            completionValue = 0;
            context.sentValue = value;
            context.nextLabel = entry[1];
          } else if (currentProgramCounter < finallyLoc) {
            shouldHandle = type < 3 || entry[0] > value || (value as number) > finallyLoc;
            if (shouldHandle) {
              entry[4] = type;
              entry[5] = value;
              context.nextLabel = finallyLoc;
              completionValue = 0;
            }
          }
        }
      }

      if (completionType !== undefined || type > 1) {
        return SENTINEL as IteratorResult<unknown>;
      }

      thrown = true;
      throw value;
    }

    function finishAbruptCompletion(): IteratorResult<unknown> {
      throw new TypeError('Generator is already running');
    }

    return context;
  }

  function makeInvokeMethod(
    outerFn: Function,
    self: unknown,
    context: GeneratorContext
  ): (method: string, arg: unknown, sync?: boolean) => IteratorResult<unknown> {
    let executing = 1;

    return function invoke(method: string, arg: unknown, sync?: boolean): IteratorResult<unknown> {
      if (executing > 1) {
        throw new TypeError('Generator is already running');
      }

      if (thrown && method === 1) {
        handleAbruptCompletion(method, arg);
      }

      completionValue = method;
      tempValue = arg;

      while ((state = completionValue < 2 ? undefined : tempValue) || !thrown) {
        if (!completionType) {
          if (completionValue) {
            if (completionValue < 3) {
              if (completionValue > 1) {
                context.nextLabel = -1;
              }
              handleAbruptCompletion(completionValue, tempValue);
            } else {
              context.nextLabel = tempValue as number;
            }
          } else {
            context.sentValue = tempValue;
          }
        }

        try {
          executing = 2;

          if (completionType) {
            if (!completionValue) {
              method = 'next';
            }

            state = (completionType as any)[method];

            if (state) {
              const result = state.call(completionType, tempValue);

              if (!result || typeof result !== 'object') {
                throw new TypeError('iterator result is not an object');
              }

              if (!result.done) {
                return result;
              }

              tempValue = result.value;
              
              if (completionValue < 2) {
                completionValue = 0;
              }
            } else if (completionValue === 1 && (state = (completionType as any).return)) {
              state.call(completionType);
            }

            if (completionValue < 2) {
              tempValue = new TypeError(`The iterator does not provide a '${method}' method`);
              completionValue = 1;
            }

            completionType = undefined;
          } else {
            const isDone = context.nextLabel < 0;
            const result = isDone ? tempValue : outerFn.call(self, context);

            if (result !== SENTINEL) {
              break;
            }
          }
        } catch (error) {
          completionType = undefined;
          completionValue = 1;
          tempValue = error;
        } finally {
          executing = 1;
        }
      }

      return {
        value: state,
        done: thrown
      };
    };
  }

  function GeneratorFunctionPrototype() {}
  function GeneratorFunction() {}
  function ContextPrototype() {}

  const getPrototypeOf = Object.getPrototypeOf;
  const iteratorPrototype = (Array.prototype as any)[iteratorSymbol]
    ? getPrototypeOf(getPrototypeOf((Array.prototype as any)[iteratorSymbol]()))
    : (() => {
        const proto = {};
        defineProperty(proto, iteratorSymbol, function() {
          return this;
        });
        return proto;
      })();

  const generatorPrototype = Object.create(iteratorPrototype);

  ContextPrototype.prototype = GeneratorFunctionPrototype.prototype = generatorPrototype;

  function markGeneratorFunction(genFun: Function): Function {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, ContextPrototype);
    } else {
      (genFun as any).__proto__ = ContextPrototype;
      defineProperty(genFun, toStringTagSymbol, 'GeneratorFunction');
    }

    genFun.prototype = Object.create(generatorPrototype);
    return genFun;
  }

  GeneratorFunction.prototype = ContextPrototype;
  defineProperty(generatorPrototype, 'constructor', ContextPrototype);
  defineProperty(ContextPrototype, 'constructor', GeneratorFunction);
  GeneratorFunction.displayName = 'GeneratorFunction';

  defineProperty(ContextPrototype, toStringTagSymbol, 'GeneratorFunction');
  defineProperty(generatorPrototype, toStringTagSymbol, 'Generator');
  defineProperty(generatorPrototype, iteratorSymbol, function() {
    return this;
  });
  defineProperty(generatorPrototype, 'toString', function() {
    return '[object Generator]';
  });

  return {
    w: wrapGenerator,
    m: markGeneratorFunction
  };
}

export default createRegeneratorRuntime;
export { createRegeneratorRuntime };